import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { registerParallax } from "@/lib/parallax";
import { imgUrl, imgSrcSet, SIZES } from "@/lib/images";

type Props = {
  src: string;
  alt: string;
  className?: string;
  intensity?: number;
  /** true for above-the-fold hero-like uses */
  priority?: boolean;
};

/**
 * GPU parallax + responsive srcset.
 * Shared scroll engine; only active when visible.
 */
export function ParallaxImage({
  src,
  alt,
  className,
  intensity = 0.16,
  priority = false,
}: Props) {
  const boxRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const box = boxRef.current;
    const img = imgRef.current;
    if (!box || !img) return;

    img.style.willChange = "transform";
    img.style.transform = "translate3d(0,0,0) scale(1.08)";
    img.style.backfaceVisibility = "hidden";

    const unregister = registerParallax(
      box,
      (y) => {
        img.style.transform = `translate3d(0,${y.toFixed(2)}px,0) scale(1.08)`;
      },
      intensity,
    );

    return () => {
      unregister();
      img.style.willChange = "auto";
    };
  }, [intensity]);

  return (
    <div
      ref={boxRef}
      className={cn("relative overflow-hidden bg-muted", className)}
      style={{ contentVisibility: priority ? undefined : "auto" }}
    >
      <img
        ref={imgRef}
        src={imgUrl(src, priority ? 1280 : 960, { quality: priority ? 78 : 70 })}
        srcSet={imgSrcSet(src, undefined, priority ? 78 : 70)}
        sizes={SIZES.featured}
        alt={alt}
        className={cn(
          "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
          loaded ? "opacity-100" : "opacity-0",
        )}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "low"}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
