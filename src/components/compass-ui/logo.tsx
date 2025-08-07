import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width="40"
      height="40"
      {...props}
    >
      <g>
        {/* Top bar */}
        <rect x="20" y="30" width="60" height="8" rx="4" fill="hsl(var(--foreground))" />
        {/* Bottom bar */}
        <rect x="20" y="50" width="60" height="8" rx="4" fill="hsl(var(--foreground))" />
        {/* Red Dot */}
        <circle cx="50" cy="40" r="6" fill="hsl(var(--destructive))" />
        {/* Blue Crescent */}
        <path d="M 65 25 A 15 15 0 0 0 58 28 A 12 12 0 0 1 65 25 Z" fill="hsl(var(--primary))" />
      </g>
    </svg>
  );
}
