// Responsieve varianten van de hero-afbeeldingen. De kleinere bestanden
// (-480.webp, -800.webp) staan naast het origineel in public/.
const NATIVE_WIDTH: Record<string, number> = {
  "/car.webp": 900,
  "/dienst-luchthaven.webp": 1000,
  "/dienst-zakelijk.webp": 1000,
  "/dienst-prive.webp": 1000,
  "/dienst-lange-afstand.webp": 1000,
};

// Hero-kolom: volle breedte op mobiel, halve max-w-7xl vanaf lg.
export const HERO_SIZES = "(min-width: 1024px) 576px, calc(100vw - 32px)";

export function heroSrcSet(src: string): string | undefined {
  const width = NATIVE_WIDTH[src];
  if (!width) return undefined;
  const base = src.replace(/\.webp$/, "");
  return `${base}-480.webp 480w, ${base}-800.webp 800w, ${src} ${width}w`;
}
