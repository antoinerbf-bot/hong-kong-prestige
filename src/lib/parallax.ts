/**
 * Shared parallax engine — one scroll listener for the whole page.
 * Only updates elements currently intersecting the viewport.
 */

type Entry = {
  el: HTMLElement;
  /** Apply transform; y is in px (already intensity-scaled). */
  apply: (y: number) => void;
  intensity: number;
  active: boolean;
};

const entries = new Set<Entry>();
let raf = 0;
let listening = false;
let reduceMotion = false;

function tick() {
  raf = 0;
  const viewH = window.innerHeight || 1;
  for (const e of entries) {
    if (!e.active) continue;
    const rect = e.el.getBoundingClientRect();
    // Skip if fully off-screen (extra safety beyond IO)
    if (rect.bottom < -40 || rect.top > viewH + 40) continue;
    const progress = (viewH / 2 - (rect.top + rect.height / 2)) / viewH;
    const y = progress * e.intensity * 64;
    e.apply(y);
  }
}

function onScroll() {
  if (raf) return;
  raf = requestAnimationFrame(tick);
}

function ensureListener() {
  if (listening || reduceMotion) return;
  listening = true;
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
}

function teardownIfEmpty() {
  if (entries.size > 0) return;
  if (!listening) return;
  listening = false;
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("resize", onScroll);
  if (raf) {
    cancelAnimationFrame(raf);
    raf = 0;
  }
}

export function registerParallax(
  el: HTMLElement,
  apply: (y: number) => void,
  intensity = 0.18,
): () => void {
  if (typeof window === "undefined") return () => {};

  reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return () => {};

  const entry: Entry = { el, apply, intensity, active: false };
  entries.add(entry);
  ensureListener();

  const io = new IntersectionObserver(
    ([obs]) => {
      entry.active = Boolean(obs?.isIntersecting);
      if (entry.active) onScroll();
    },
    { root: null, rootMargin: "12% 0px", threshold: 0 },
  );
  io.observe(el);

  // Initial paint
  onScroll();

  return () => {
    io.disconnect();
    entries.delete(entry);
    teardownIfEmpty();
  };
}
