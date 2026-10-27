/**
 * The channel marks, drawn inline.
 *
 * The site carries no icon library and makes no external request: the marks
 * are inline SVG and they cost nothing to load.
 *
 * Every mark is the channel's own app icon - the red square of Xiaohongshu,
 * the red screen of YouTube, the green bubble of WhatsApp - because a
 * visitor recognises a channel by its colour and its shape before they read
 * the label. The circle that holds them stays neutral, so the row reads as
 * one set instead of five different buttons.
 */
export type SocialIconName = 'xiaohongshu' | 'linkedin' | 'youtube' | 'whatsapp' | 'instagram';

/**
 * The WhatsApp handset, drawn once and reused inside the green bubble.
 */
const HANDSET =
  'M8.6 6.9c-.3-.3-.8-.4-1.2-.2l-1.1.4c-.4.2-.7.5-.8 1-.3 2 .2 4 1.5 5.5 1.5 1.4 3.4 2.2 5.4 2.5.4.1.8-.1 1-.5l.4-1.1c.2-.4 0-.9-.4-1.1l-.9-.7c-.3-.2-.7-.2-1 .1l-.5.4c-.2.1-.3.2-.5.1-.7-.4-1.3-.9-1.8-1.5-.3-.4-.7-.8-1-1.3-.1-.2 0-.4.1-.5l.4-.4c.3-.2.4-.6.2-1l-.6-1c-.2-.4-.7-.6-1.1-.4l-1.1.4c-.4.1-.8 0-1-.3Z';

export function SocialIcon({
  name,
  className,
}: {
  name: SocialIconName;
  className?: string;
}) {
  const common = {
    viewBox: '0 0 24 24',
    className,
    'aria-hidden': true as const,
    focusable: false as const,
  };

  if (name === 'xiaohongshu') {
    return (
      <svg {...common}>
        <rect x="0.6" y="0.6" width="22.8" height="22.8" rx="5.8" fill="#FF2442" />
        <text
          x="12"
          y="16"
          textAnchor="middle"
          fontFamily="'PingFang SC','Hiragino Sans GB','Microsoft YaHei','Noto Sans SC',sans-serif"
          fontSize="8"
          fontWeight="800"
          letterSpacing="-1"
          fill="#ffffff"
        >
          小红书
        </text>
      </svg>
    );
  }

  if (name === 'youtube') {
    return (
      <svg {...common}>
        <rect x="1.2" y="5.2" width="21.6" height="13.6" rx="4.4" fill="#FF0000" />
        <path d="M9.4 8.6 15 12l-5.6 3.4V8.6Z" fill="#ffffff" />
      </svg>
    );
  }

  if (name === 'whatsapp') {
    return (
      <svg {...common}>
        <g transform="translate(12 12) scale(1.14) translate(-12 -12)">
          <path
            d="M12 3.6a8.4 8.4 0 0 0-7.26 12.59L3.55 20.1l4.03-1.04A8.4 8.4 0 1 0 12 3.6Z"
            fill="#25D366"
          />
          <path d={HANDSET} fill="#ffffff" />
        </g>
      </svg>
    );
  }

  if (name === 'linkedin') {
    return (
      <svg {...common}>
        <rect x="0.6" y="0.6" width="22.8" height="22.8" rx="5.8" fill="#0A66C2" />
        <path
          d="M7.4 10.6V18"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="7.4" cy="7.4" r="1.5" fill="#ffffff" />
        <path
          d="M11.6 18v-4.1a2.9 2.9 0 0 1 5.8 0V18"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    );
  }

  /**
   * Instagram is the one mark left in line: its identity is a gradient the
   * eye reads as a photograph, and a flat colour would be a worse guess than
   * the outline. Give it the gradient when the account exists.
   */
  return (
    <svg
      {...common}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="5.2" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="1.05" fill="currentColor" stroke="none" />
    </svg>
  );
}
