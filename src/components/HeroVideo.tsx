import { useEffect, useRef, useState } from "react";
import { HERO_IMAGES, HERO_VIDEO } from "@/lib/services";
import { imgUrl } from "@/lib/images";
import { cn } from "@/lib/utils";

/**
 * Full-bleed cinematic hero background.
 * Video loops muted; falls back to still if autoplay blocked or network fails.
 */
export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const poster = imgUrl(HERO_IMAGES[0]!, 1600, { quality: 82 });

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const tryPlay = async () => {
      try {
        v.muted = true;
        await v.play();
        setReady(true);
      } catch {
        setFailed(true);
      }
    };

    if (v.readyState >= 2) tryPlay();
    else v.addEventListener("loadeddata", tryPlay, { once: true });

    const onVis = () => {
      if (document.hidden) v.pause();
      else tryPlay();
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-muted">
      {/* Still poster — always present for LCP / fallback */}
      <img
        src={poster}
        alt=""
        className={cn(
          "absolute inset-0 h-full w-full object-cover transition-opacity duration-1000",
          ready && !failed ? "opacity-0" : "opacity-100",
        )}
        fetchPriority="high"
        decoding="sync"
      />

      {!failed && (
        <video
          ref={videoRef}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-1000",
            ready ? "opacity-100" : "opacity-0",
          )}
          poster={poster}
          muted
          playsInline
          loop
          autoPlay
          preload="metadata"
          onError={() => setFailed(true)}
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
      )}

      {/* Cinematic overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/20" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/85 via-background/35 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,oklch(0.12_0.02_60_/_0.35)_100%)]" />
    </div>
  );
}
