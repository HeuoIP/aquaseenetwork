/**
 * Unsubscribe store.
 *
 * The marketing pipeline (`E:\拓客\send_promo_emails.py`) reads a local
 * blacklist file. This module provides the server-side half of the loop so a
 * one-click unsubscribe stops future sends even when the send script runs on
 * a different machine.
 *
 * Two independent channels, either of which is sufficient:
 *   1. Cloudflare KV  — authoritative, checked synchronously before sending.
 *   2. Mailbox notice — an email to the sender address, so the address can be
 *      added to the local `_inbox/blacklist.txt` by the running pipeline.
 *
 * If neither channel is configured, `isSuppressed` returns false and the
 * caller is expected to report the gap rather than silently claim success.
 */

export type UnsubscribeResult = {
  ok: boolean;
  /** True when the address was recorded in at least one durable channel. */
  recorded: boolean;
  /** Human-readable description of what happened, for the API response. */
  detail: string;
};

const KV_KEY_PREFIX = 'unsubscribe:email:';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function normaliseEmail(raw: string): string {
  return raw.trim().toLowerCase();
}

export function isValidEmail(raw: string): boolean {
  return EMAIL_RE.test(normaliseEmail(raw));
}

type KvLike = {
  get(key: string): Promise<string | null>;
  put(key: string, value: string): Promise<void>;
};

type EnvLike = {
  UNSUBSCRIBE_KV?: KvLike;
};
function kvKey(email: string): string {
  return KV_KEY_PREFIX + normaliseEmail(email);
}

/**
 * Check whether an address has previously unsubscribed.
 *
 * A KV read failure is treated as "not suppressed" rather than the reverse:
 * failing closed would silently stop all outreach, failing open risks one
 * unwanted email. The caller logs the failure so it is visible.
 */
export async function isSuppressed(
  env: EnvLike,
  email: string,
): Promise<{ suppressed: boolean; error?: string }> {
  const kv = env.UNSUBSCRIBE_KV;
  if (!kv) return { suppressed: false, error: 'no_kv_binding' };

  try {
    const value = await kv.get(kvKey(email));
    return { suppressed: value !== null };
  } catch (error) {
    return {
      suppressed: false,
      error: error instanceof Error ? error.message : 'kv_read_failed',
    };
  }
}

/**
 * Record an unsubscribe request.
 *
 * @param env      Worker environment (may or may not expose KV).
 * @param email    The address to suppress.
 * @param notify   Optional callback used to deliver the mailbox notice.
 *                 Returns true when the notice was accepted for delivery.
 */
export async function recordUnsubscribe(
  env: EnvLike,
  email: string,
  notify?: (email: string) => Promise<boolean>,
): Promise<UnsubscribeResult> {
  const address = normaliseEmail(email);
  if (!isValidEmail(address)) {
    return { ok: false, recorded: false, detail: 'invalid_email' };
  }

  const channels: string[] = [];

  if (env.UNSUBSCRIBE_KV) {
    try {
      await env.UNSUBSCRIBE_KV.put(
        kvKey(address),
        JSON.stringify({
          email: address,
          source: 'one-click-unsubscribe',
          at: new Date().toISOString(),
        }),
      );
      channels.push('kv');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'kv_write_failed';
      if (notify) {
        const sent = await notify(address).catch(() => false);
        if (sent) channels.push('mail');
        return {
          ok: sent,
          recorded: sent,
          detail: sent ? `kv_write_failed:${message}` : `kv_write_failed:${message}`,
        };
      }
      return { ok: false, recorded: false, detail: `kv_write_failed:${message}` };
    }
  }

  if (notify) {
    const sent = await notify(address).catch(() => false);
    if (sent) channels.push('mail');
  }

  if (channels.length === 0) {
    return {
      ok: false,
      recorded: false,
      detail: 'no_delivery_channel_configured',
    };
  }

  return {
    ok: true,
    recorded: true,
    detail: channels.join('+'),
  };
}
