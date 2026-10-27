/**
 * The channel marks, drawn inline.
 *
 * The site carries no icon library and makes no external request: the marks
 * are inline SVG, they inherit the colour of the text they sit in, and they
 * cost nothing to load. The Xiaohongshu mark brings its own colour, because
 * its identity *is* the red square.
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

  if (name === 'instagram') {
    return (
      <svg {...common} fill="none" stroke="currentColor" strokeWidth={1.7}>
        <rect x="2.6" y="2.6" width="18.8" height="18.8" rx="5.4" />
        <circle cx="12" cy="12" r="4.1" />
        <circle cx="17.3" cy="6.7" r="1.15" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (name === 'linkedin') {
    return (
      <svg {...common} fill="currentColor">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
      </svg>
    );
  }

  if (name === 'youtube') {
    return (
      <svg {...common} fill="currentColor">
        <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14c.5-1.88.5-5.81.5-5.81s0-3.93-.5-5.81ZM9.55 15.57V8.43L15.82 12l-6.27 3.57Z" />
      </svg>
    );
  }

  if (name === 'whatsapp') {
    return (
      <svg {...common} fill="currentColor" fillRule="evenodd">
        <path d="M12 1.9C6.5 1.9 2.1 6.3 2.1 11.8c0 1.7.4 3.3 1.2 4.7L2 22.6l6.2-1.2c1.3.7 2.8 1.1 4.3 1.1 5.5 0 9.9-4.4 9.9-9.9S17.5 1.9 12 1.9Zm.3 16.9c-1.6 0-3.1-.5-4.4-1.3l-.3-.2-3.7.9.9-3.6-.2-.3a7.7 7.7 0 0 1-1.2-4.1c0-4.2 3.5-7.7 7.8-7.7 2.1 0 4 .8 5.5 2.3 1.5 1.5 2.3 3.4 2.3 5.5 0 4.3-3.5 7.8-7.7 7.8Zm4.2-5.8c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.6.1l-.7.8c-.1.1-.3.2-.4.1-.2-.1-.7-.3-1.4-.8-.5-.5-.9-1-.9-1.1 0-.2 0-.3.1-.4l.4-.5.3-.4c.1-.1 0-.3 0-.4l-.7-1.6c-.2-.4-.4-.4-.5-.4h-.6c-.2 0-.4.1-.6.3-1.9 1.9-1.9 4.7 0 6.6 1 1 2.1 2.5 3.3 2.7.5.2 1 .2 1.3.1.1-.1.4-.3.5l-.6.6c-.2.2-.4.2-.6.1-.2-.1-.8-.4-1.6-.9-1-.8-1.4-1.4-1.6-1.6-.2-.2 0-.4.1-.6l.5-.6c.1-.2.2-.4.1-.6l-.9-2.2c-.1-.3-.3-.3-.5-.4l-.3-.1Z" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <rect width="24" height="24" rx="5.4" fill="#FF2442" />
      <text
        x="12"
        y="16.4"
        textAnchor="middle"
        fontFamily="'PingFang SC','Hiragino Sans GB','Microsoft YaHei','Noto Sans SC',sans-serif"
        fontSize="8.2"
        fontWeight="700"
        letterSpacing="-0.4"
        fill="#ffffff"
      >
        小红书
      </text>
    </svg>
  );
}