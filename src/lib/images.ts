/**
 * Image URL helpers — Unsplash-aware responsive sources.
 * Keeps bandwidth low on mobile; serves sharper assets on large screens.
 */

const WIDTHS = [400, 640, 960, 1280, 1600, 1920] as const;

/** Rewrite Unsplash (or any URL with w=/q=) for a target width. */
export function imgUrl(
  src: string,
  width: number,
  opts?: { height?: number; quality?: number },
): string {
  if (!src) return src;
  const q = opts?.quality ?? 72;
  try {
    const u = new URL(src);
    if (u.hostname.includes("unsplash.com") || u.hostname.includes("images.unsplash")) {
      u.searchParams.set("auto", "format");
      u.searchParams.set("fit", "crop");
      u.searchParams.set("w", String(width));
      if (opts?.height) u.searchParams.set("h", String(opts.height));
      else u.searchParams.delete("h");
      u.searchParams.set("q", String(q));
      // Prefer modern formats when supported by Unsplash CDN
      u.searchParams.set("fm", "webp");
      return u.toString();
    }
  } catch {
    /* non-URL string */
  }
  return src;
}

/** Build srcset from a base Unsplash URL. */
export function imgSrcSet(
  src: string,
  widths: readonly number[] = WIDTHS,
  quality = 72,
): string {
  return widths.map((w) => `${imgUrl(src, w, { quality })} ${w}w`).join(", ");
}

/** Common sizes attributes by layout role. */
export const SIZES = {
  hero: "100vw",
  full: "100vw",
  card: "(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 360px",
  featured: "(max-width: 768px) 100vw, 50vw",
  detail: "(max-width: 768px) 100vw, 70vw",
  thumb: "64px",
} as const;

export type ImageRole = keyof typeof SIZES;
