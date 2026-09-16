import { useEffect, useRef, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  className?: string;
  /** Intensity 0–1 */
  intensity?: number;
};

/** Subtle scroll parallax on service imagery. Respects reduced-motion. */
export function ParallaxImage({ src, alt, className, intensity = 0.18 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const el = ref.current;
    const img = imgRef.current;
    if (!el || !img) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const viewH = window.innerHeight;
        const progress = (viewH / 2 - (rect.top + rect.height / 2)) / viewH;
        const y = progress * intensity * 80;
        img.style.transform = `translate3d(0, ${y}px, 0) scale(1.12)`;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [intensity]);

  const style: CSSProperties = {
    transform: "translate3d(0,0,0) scale(1.12)",
    willChange: "transform",
  };

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        style={style}
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
    </div>
  );
}
