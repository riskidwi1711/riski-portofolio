import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseDate(dateStr) {
  if (dateStr === 'Present') return dateStr;
  const date = new Date(dateStr);
  const formatted = date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric"
  });

  return formatted
}

