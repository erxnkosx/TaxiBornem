import { useState, useEffect } from "react";
import { Phone, MessageCircle, Menu, X } from "lucide-react";
import { PHONE, PHONE_RAW, WHATSAPP_URL, PATHS, type Page } from "../data/site";
import { cn } from "../lib/cn";

export default function Navbar({ currentPath }: { currentPath: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navItems: { label: string; page: Page }[] = [
    { label: "Home", page: "home" },
    { label: "Diensten", page: "diensten" },
    { label: "Tarieven", page: "tarieven" },
    { label: "Over ons", page: "over-ons" },
    { label: "Contact", page: "contact" },
  ];

  return (
    <header
      className={cn(
        "taxi-navbar fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-black/5"
          : "bg-white/80 backdrop-blur-sm"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 group" aria-label="Taxi Bornem Hamid — startpagina">
          <img
            src="/logo.webp"
            alt="Taxi Bornem Hamid"
            className="h-16 w-auto"
            width={320}
            height={160}
          />

        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-0.5">
          {navItems.map((item) => (
            <a
              key={item.page}
              href={PATHS[item.page]}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150",
                currentPath === PATHS[item.page]
                  ? "taxi-nav-active text-[#181818] bg-[#FFC107]/15"
                  : "text-[#6b6b6b] hover:text-[#181818] hover:bg-black/4"
              )}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={`tel:${PHONE_RAW}`}
            className="flex items-center gap-1.5 text-sm text-[#6b6b6b] hover:text-[#181818] transition-colors"
          >
          </a>
          <a
            href="/contact"
            className="taxi-primary-btn px-4 py-2 bg-[#FFC107] text-white text-sm font-semibold rounded-[18px] hover:bg-[#2a2a2a] active:bg-[#111] transition-all shadow-sm"
          >
            Boek een rit
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden p-2 rounded-xl hover:bg-black/5 transition-colors"
          aria-label="Menu"
        >
          {menuOpen ? <X className="w-5 h-5 text-[#181818]" /> : <Menu className="w-5 h-5 text-[#181818]" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-black/5 px-4 pt-2 pb-4 shadow-lg">
          <div className="flex flex-col gap-0.5">
            {navItems.map((item) => (
              <a
                key={item.page}
                href={PATHS[item.page]}
                className={cn(
                  "w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                  currentPath === PATHS[item.page] ? "text-[#181818] bg-black/5" : "text-[#6b6b6b] hover:text-[#181818]"
                )}
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-black/5 flex flex-col gap-2">
            <a
              href={`tel:${PHONE_RAW}`}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-[#6b6b6b] hover:bg-black/4"
            >
              <Phone className="w-4 h-4" />
              {PHONE}
            </a>
            <a
              href="/contact"
              className="block text-center w-full px-4 py-3 bg-[#181818] text-white text-sm font-semibold rounded-[18px]"
            >
              Boek een rit
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#25D366] text-white text-sm font-semibold rounded-[18px]"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Hamid
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
