import React from 'react';
import { cn } from '@/lib/utils';
interface LogoProps {
  className?: string;
  size?: number | string;
}
export function Logo({ className, size = 32 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("drop-shadow-[0_0_8px_rgba(0,255,136,0.5)]", className)}
    >
      <path
        d="M50 10L90 90H10L50 10Z"
        fill="#00ff88"
        fillOpacity="0.8"
        stroke="#004d20"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <circle cx="50" cy="55" r="8" fill="white" />
    </svg>
  );
}