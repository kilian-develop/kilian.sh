import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function staggerClass(i: number) {
  return `stagger-${Math.min(i + 1, 8)}` as const;
}
