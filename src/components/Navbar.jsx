import { useState, useEffect } from "react";
import { useSiteData } from "../hooks/useSiteData";

const FALLBACK_LOGO_IMG = "/images/logo.jpeg";

const baseLinks = [
  { label: "About", href: "#about" },
  { label: "Why join", href: "#who" },
];

const eventLinks = [
  { label: "Next meetup", href: "#event" },
  { label: "Register", href: "#register" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data } = useSiteData();

  const hasEvent = !!data?.event?.date;
  const whatsappLink = data?.links?.whatsapp ?? "#";
  const links = hasEvent ? [...baseLinks, ...eventLinks] : baseLinks;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 shadow-md backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-3 group"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white shadow-sm overflow-hidden">
            <img src={FALLBACK_LOGO_IMG} alt="Founders Roof" className="h-full w-full object-contain" />
          </span>
          <span className="text-lg font-semibold text-gray-900 group-hover:text-orange-500 transition">
            Founders <span className="text-orange-500">Roof</span>
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-700">
          {links.map((link) => (
            <button
              key={link.href}
              onClick={() => handleScrollTo(link.href)}
              className="hover:text-orange-600 transition"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* CTAs */}
        <div className="flex items-center gap-3">
          {/* If event exists — show Register */}
          {hasEvent && (
            <button
              onClick={() => handleScrollTo("#register")}
              className="hidden sm:inline-flex items-center justify-center rounded-full border border-orange-300 px-5 py-2 text-sm font-semibold text-orange-600 transition hover:bg-orange-50"
            >
              Register
            </button>
          )}

          {/* Always show Join — WhatsApp */}
          
          <a  href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-orange-500 px-5 py-2 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-orange-600"
          >
            Join Community
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden flex items-center justify-center rounded-full border border-orange-200 p-2 text-orange-600 transition"
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden transition-all duration-300 overflow-hidden ${isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="bg-white shadow-md px-4 py-4 space-y-3">
          {links.map((link) => (
            <button
              key={link.href}
              onClick={() => handleScrollTo(link.href)}
              className="block w-full text-left text-gray-700 hover:text-orange-600 transition"
            >
              {link.label}
            </button>
          ))}
          
          <a href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-orange-500 text-white py-2 rounded-full mt-2 font-semibold"
          >
            Join Community
          </a>
        </div>
      </div>
    </header>
  );
}