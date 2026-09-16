import { useState, type ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { imgUrl, imgSrcSet, SIZES, type ImageRole } from "@/lib/images";

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet" | "sizes"> & {
  src: string;
  alt: string;
  /** Layout role → correct sizes attribute */
  role?: ImageRole;
  /** Override sizes if needed */
  sizes?: string;
  /** Max width for default src (fallback) */
  width?: number;
  /** Quality 1–100 */
  quality?: number;
  /** Soft fade-in when loaded */
  fade?: boolean;
};

/**
 * Responsive image with Unsplash srcset, lazy by default, async decode,
 * and optional fade-in to avoid flash of empty box.
 */
export function OptimizedImage({
  src,
  alt,
  role = "card",
  sizes,
  width = 960,
  quality = 72,
  fade = true,
  className,
  loading = "lazy",
  decoding = "async",
  fetchPriority,
  ...rest
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const sizesAttr = sizes ?? SIZES[role];
  const defaultSrc = imgUrl(src, width, { quality });
  const srcSet = imgSrcSet(src, undefined, quality);

  return (
    <img
      src={defaultSrc}
      srcSet={srcSet}
      sizes={sizesAttr}
      alt={alt}
      loading={loading}
      decoding={decoding}
      fetchPriority={fetchPriority}
      onLoad={() => setLoaded(true)}
      className={cn(
        fade && "transition-opacity duration-500 ease-out",
        fade && (loaded ? "opacity-100" : "opacity-0"),
        className,
      )}
      {...rest}
    />
  );
}
