import { useEffect, useRef, useState } from "react";

export interface GeoPoint {
  lat: number;
  lon: number;
  label: string;
}

interface Props {
  id: string;
  value: string;
  onChange: (val: string) => void;
  onSelect: (point: GeoPoint | null) => void;
  placeholder?: string;
  className?: string;
  dataVeld?: string;
}

export default function AddressAutocomplete({
  id,
  value,
  onChange,
  onSelect,
  placeholder,
  className,
  dataVeld,
}: Props) {
  const [suggestions, setSuggestions] = useState<GeoPoint[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fout, setFout] = useState(false);
  const debounceRef = useRef<number | undefined>(undefined);
  const requestId = useRef(0);
  const boxRef = useRef<HTMLDivElement>(null);
  const lastSelectedLabel = useRef<string>("");

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function parseFeature(f: any): GeoPoint | null {
    const p = f.properties ?? {};
    const [lon, lat] = f.geometry?.coordinates ?? [];
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;

    const straatregel = [p.street ?? p.name, p.housenumber].filter(Boolean).join(" ");
    const plaatsregel = [p.postcode, p.city ?? p.county].filter(Boolean).join(" ");
    const label = [straatregel || p.name, plaatsregel].filter(Boolean).join(", ");
    if (!label) return null;

    return { lat, lon, label };
  }

  function handleInput(v: string) {
    onChange(v);

    if (v !== lastSelectedLabel.current) onSelect(null);

    window.clearTimeout(debounceRef.current);

    if (v.trim().length < 3) {
      setSuggestions([]);
      setOpen(false);
      setFout(false);
      return;
    }

    debounceRef.current = window.setTimeout(async () => {
      const myRequest = ++requestId.current;
      setLoading(true);
      setFout(false);
      setOpen(true); 

      try {

        const params = new URLSearchParams({
          q: v,
          limit: "5",
          lat: "51.09",
          lon: "4.24",
        });
        const res = await fetch(
          `https://photon.komoot.io/api/?${params.toString()}&bbox=2.3,49.4,6.5,51.6`
        );
        if (!res.ok) throw new Error(`Photon gaf status ${res.status}`);
        const data = await res.json();
        if (myRequest !== requestId.current) return;

        const points = (data.features ?? [])
          .map(parseFeature)
          .filter((p: GeoPoint | null): p is GeoPoint => p !== null);

        setSuggestions(points);
      } catch (err) {
        if (myRequest === requestId.current) {
          console.error("Adres-opzoeking via Photon mislukt:", err);
          setSuggestions([]);
          setFout(true);
        }
      } finally {
        if (myRequest === requestId.current) setLoading(false);
      }
    }, 350);
  }

  function handleSelect(point: GeoPoint) {
    lastSelectedLabel.current = point.label;
    onChange(point.label);
    onSelect(point);
    setOpen(false);
    setSuggestions([]);
  }

  return (
    <div className="relative" ref={boxRef}>
      <input
        id={id}
        data-veld={dataVeld}
        autoComplete="off"
        className={className}
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleInput(e.target.value)}
        onFocus={() => suggestions.length > 0 && setOpen(true)}
      />
      {open && (
        <div className="absolute left-0 right-0 top-[calc(100%+4px)] z-20 overflow-hidden rounded-[14px] border border-[#e5e5e5] bg-white shadow-lg">
          {suggestions.map((s, i) => (
            <button
              type="button"
              key={`${s.lat}-${s.lon}-${i}`}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleSelect(s)}
              className="block w-full border-b border-[#f0f0f0] px-4 py-2.5 text-left text-sm text-[#181818] last:border-b-0 hover:bg-[#f4f4f4]"
            >
              {s.label}
            </button>
          ))}
          {loading && (
            <div className="px-4 py-2 text-xs text-[#9b9b9b]">Zoeken…</div>
          )}
          {!loading && fout && (
            <div className="px-4 py-2 text-xs text-[#d4183d]">
              Kon geen adressen ophalen. Typ gewoon verder — dit veld blijft gewoon werken.
            </div>
          )}
          {!loading && !fout && suggestions.length === 0 && (
            <div className="px-4 py-2 text-xs text-[#9b9b9b]">Geen adressen gevonden.</div>
          )}
        </div>
      )}
    </div>
  );
}