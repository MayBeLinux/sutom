type IconProps = {
  size?: number;
};

export function StatsIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="5" y1="20" x2="5" y2="11" strokeLinecap="round" />
      <line x1="12" y1="20" x2="12" y2="4" strokeLinecap="round" />
      <line x1="19" y1="20" x2="19" y2="14" strokeLinecap="round" />
    </svg>
  );
}

export function HelpIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.9.4-1.5 1-1.5 2.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="17.2" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function CloseIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="5" y1="5" x2="19" y2="19" strokeLinecap="round" />
      <line x1="19" y1="5" x2="5" y2="19" strokeLinecap="round" />
    </svg>
  );
}

export function BackspaceIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 5h11a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H9l-6-7z" strokeLinejoin="round" />
      <line x1="12" y1="10" x2="17" y2="15" strokeLinecap="round" />
      <line x1="17" y1="10" x2="12" y2="15" strokeLinecap="round" />
    </svg>
  );
}
