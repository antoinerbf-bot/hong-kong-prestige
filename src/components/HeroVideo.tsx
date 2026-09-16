import { useEffect, useRef, useState } from "react";
import { HERO_IMAGES, HERO_VIDEO, HERO_VIDEO_MOBILE } from "@/lib/services";
import { imgUrl } from "@/lib/images";
import { cn } from "@/lib/utils";

type Mode = "poster" | "loading" | "playing" | "failed";

function prefersStatic(): boolean {
  if (typeof window === "undefined") return true;
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
    // @ts-expect-error NetworkInformation
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (conn?.saveData) return true;
    if (conn?.effectiveType === "slow-2g" || conn?.effectiveType === "2g") return true;
  } catch {
    /* ignore */
  }
  return false;
}

function isNarrow(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(max-width: 768px)").matches;
}

/**
 * Cinematic hero video — LCP-safe poster first, deferred video load,
 * pause off-screen / hidden tab, skip on data-saver & reduced-motion.
 */
export function HeroVideo() {
  const boxRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mode, setMode] = useState<Mode>("poster");
  const [src, setSrc] = useState<string | null>(null);

  const poster = imgUrl(HERO_IMAGES[0]!, 1400, { quality: 78 });

  useEffect(() => {
    if (prefersStatic()) {
      setMode("failed"); // stay on poster
      return;
    }

    const box = boxRef.current;
    if (!box) return;

    let cancelled = false;
    let loaded = false;

    const pickSrc = () => (isNarrow() ? HERO_VIDEO_MOBILE : HERO_VIDEO);

    const attachAndPlay = async () => {
      if (cancelled || loaded) return;
      loaded = true;
      setMode("loading");
      setSrc(pickSrc());

      // Wait a frame so <video> mounts with src
      requestAnimationFrame(async () => {
        const v = videoRef.current;
        if (!v || cancelled) return;
        try {
          v.muted = true;
          v.defaultMuted = true;
          v.playsInline = true;
          // Play when enough data
          const play = async () => {
            try {
              await v.play();
              if (!cancelled) setMode("playing");
            } catch {
              if (!cancelled) setMode("failed");
            }
          };
          if (v.readyState >= 3) play();
          else {
            v.addEventListener("canplay", play, { once: true });
            v.addEventListener(
              "error",
              () => {
                if (!cancelled) setMode("failed");
              },
              { once: true },
            );
          }
        } catch {
          if (!cancelled) setMode("failed");
        }
      });
    };

    // Defer until browser is idle + hero is in view
    const startWhenIdle = () => {
      const run = () => {
        if (cancelled) return;
        attachAndPlay();
      };
      if ("requestIdleCallback" in window) {
        (window as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback(
          run,
          { timeout: 1800 },
        );
      } else {
        window.setTimeout(run, 400);
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        const v = videoRef.current;
        if (!entry?.isIntersecting) {
          v?.pause();
          return;
        }
        if (!loaded) startWhenIdle();
        else if (v && mode !== "failed") {
          v.play().catch(() => undefined);
        }
      },
      { root: null, threshold: 0.15 },
    );
    io.observe(box);

    const onVis = () => {
      const v = videoRef.current;
      if (!v) return;
      if (document.hidden) v.pause();
      else if (loaded && mode !== "failed") v.play().catch(() => undefined);
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelled = true;
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      const v = videoRef.current;
      if (v) {
        v.pause();
        v.removeAttribute("src");
        v.load();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showVideo = mode === "playing" || mode === "loading";

  return (
    <div ref={boxRef} className="absolute inset-0 overflow-hidden bg-muted">
      {/* LCP poster — always first paint */}
      <img
        src={poster}
        alt=""
        width={1400}
        height={900}
        className={cn(
          "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
          mode === "playing" ? "opacity-0" : "opacity-100",
        )}
        fetchPriority="high"
        decoding="sync"
        sizes="100vw"
      />

      {src && showVideo && (
        <video
          ref={videoRef}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
            mode === "playing" ? "opacity-100" : "opacity-0",
          )}
          muted
          playsInline
          loop
          preload="none"
          disablePictureInPicture
          disableRemotePlayback
          // @ts-expect-error non-standard but widely supported
          webkit-playsinline="true"
        >
          <source src={src} type="video/mp4" />
        </video>
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/20" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/85 via-background/35 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,oklch(0.12_0.02_60_/_0.35)_100%)]" />
    </div>
  );
}
