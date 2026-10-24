/**
 * Cloudflare binding declarations.
 *
 * `@opennextjs/cloudflare` ships the ambient `CloudflareEnv` interface for the
 * bindings it manages itself. Project-specific bindings are declared here so
 * `getCloudflareContext().env` stays type-safe.
 *
 * UNSUBSCRIBE_KV — a KV namespace holding one-click unsubscribe records.
 * Create it with:
 *   npx wrangler kv namespace create UNSUBSCRIBE_KV
 * then add the returned id to `kv_namespaces` in wrangler.jsonc.
 */
declare global {
  interface CloudflareEnv {
    /** Key-value store used to record one-click unsubscribe requests. */
    UNSUBSCRIBE_KV?: KVNamespace;
  }
}

export {};
