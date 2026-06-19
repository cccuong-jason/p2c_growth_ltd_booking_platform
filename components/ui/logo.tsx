export function Logo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="p2c-bg" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0b4ec7" />
          <stop offset="100%" stopColor="#0099cc" />
        </linearGradient>
        <linearGradient id="p2c-line" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e2e8f0" />
        </linearGradient>
        <filter id="shadow">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.2" />
        </filter>
      </defs>

      {/* Base App Icon Shape */}
      <rect x="0" y="0" width="100" height="100" rx="28" fill="url(#p2c-bg)" />
      
      {/* Abstract P-2-C Node Connection */}
      <g filter="url(#shadow)">
        {/* Connection Line (Workflow/Growth) */}
        <path 
          d="M 28 65 C 42 65, 45 38, 50 38 C 55 38, 58 50, 72 50" 
          stroke="url(#p2c-line)" 
          strokeWidth="8" 
          strokeLinecap="round" 
        />
        
        {/* Partner Node */}
        <circle cx="28" cy="65" r="9" fill="#ffffff" />
        <circle cx="28" cy="65" r="4" fill="#0b4ec7" />
        
        {/* P2C Hub Node */}
        <circle cx="50" cy="38" r="9" fill="#ffffff" />
        
        {/* Customer Node */}
        <circle cx="72" cy="50" r="9" fill="#ffffff" />
        <circle cx="72" cy="50" r="4" fill="#0099cc" />
      </g>

      {/* Sparkle/Growth Accent */}
      <path 
        d="M 68 25 L 70 30 L 75 32 L 70 34 L 68 39 L 66 34 L 61 32 L 66 30 Z" 
        fill="#ffffff" 
        opacity="0.9"
      />
    </svg>
  );
}
