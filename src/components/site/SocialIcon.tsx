/**
 * The channel marks, drawn inline.
 *
 * The site carries no icon library and makes no external request: the marks
 * are inline SVG, they inherit the colour of the text they sit in, and they
 * cost nothing to load.
 *
 * They are drawn as one set - the same weight, the same optical size, the
 * same round joins - because five marks drawn five ways look like a mistake.
 * The Xiaohongshu mark is the exception: its identity is the red square, so
 * it brings its own colour and its own weight.
 */
export type SocialIconName = 'xiaohongshu' | 'linkedin' | 'youtube' | 'whatsapp' | 'instagram';

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
  const line = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  if (name === 'instagram') {
    return (
      <svg {...common} {...line}>
        <rect x="3" y="3" width="18" height="18" rx="5.2" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17" cy="7" r="1.05" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (name === 'youtube') {
    return (
      <svg {...common} {...line}>
        <rect x="2.4" y="5.4" width="19.2" height="13.2" rx="4.2" />
        <path d="M10.4 9.4 15 12l-4.6 2.6V9.4Z" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (name === 'linkedin') {
    return (
      <svg {...common} {...line} strokeWidth={1.7}>
        <path d="M5.1 9.6V20" />
        <circle cx="5.1" cy="5.9" r="1.35" fill="currentColor" stroke="none" />
        <path d="M10.4 20v-5.6a3.3 3.3 0 0 1 6.6 0V20" />
      </svg>
    );
  }

  if (name === 'whatsapp') {
    return (
      <svg {...common} {...line}>
        <path d="M12 2.9a9.1 9.1 0 0 0-7.85 13.66L2.9 21.1l4.66-1.2A9.1 9.1 0 1 0 12 2.9Z" />
        <path
          d="M8.6 6.9c-.3-.3-.8-.4-1.2-.2l-1.1.4c-.4.2-.7.5-.8 1-.3 2 .2 4 1.5 5.5 1.5 1.4 3.4 2.2 5.4 2.5.4.1.8-.1 1-.5l.4-1.1c.2-.4 0-.9-.4-1.1l-.9-.7c-.3-.2-.7-.2-1 .1l-.5.4c-.2.1-.3.2-.5.1-.7-.4-1.3-.9-1.8-1.5-.3-.4-.7-.8-1-1.3-.1-.2 0-.4.1-.5l.4-.4c.3-.2.4-.6.2-1l-.6-1c-.2-.4-.7-.6-1.1-.4l-1.1.4c-.4.1-.8 0-1-.3Z"
          fill="currentColor"
          stroke="none"
        />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <rect width="24" height="24" rx="5.2" fill="#FF2442" />
      <text
        x="12"
        y="15.4"
        textAnchor="middle"
        fontFamily="'PingFang SC','Hiragino Sans GB','Microsoft YaHei','Noto Sans SC',sans-serif"
        fontSize="8.2"
        fontWeight="800"
        letterSpacing="-0.8"
        fill="#ffffff"
      >
        小红书
      </text>
    </svg>
  );
}