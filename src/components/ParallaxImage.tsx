import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { registerParallax } from "@/lib/parallax";

type Props = {
  src: string;
  alt: string;
  className?: string;
  /** Intensity 0–1 (default soft) */
  intensity?: number;
};

/**
 * GPU parallax image — registers with the shared scroll engine.
 * No per-instance window listeners; pauses when off-screen.
 */
export function ParallaxImage({ src, alt, className, intensity = 0.16 }: Props) {
  const boxRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    const img = imgRef.current;
    if (!box || !img) return;

    // Composite layer once; avoid will-change forever on mobile
    img.style.willChange = "transform";
    img.style.transform = "translate3d(0,0,0) scale(1.1)";
    img.style.backfaceVisibility = "hidden";

    const unregister = registerParallax(
      box,
      (y) => {
        img.style.transform = `translate3d(0,${y.toFixed(2)}px,0) scale(1.1)`;
      },
      intensity,
    );

    return () => {
      unregister();
      img.style.willChange = "auto";
    };
  }, [intensity]);

  return (
    <div ref={boxRef} className={cn("relative overflow-hidden", className)}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
        decoding="async"
        fetchPriority="low"
      />
    </div>
  );
}
