import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Lightweight cn helper — keep this module free of heavy deps. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
