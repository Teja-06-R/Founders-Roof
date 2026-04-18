import { useState, useEffect } from "react";

const links = [
  { label: "About", href: "#about" },
  { label: "Why join", href: "#why" },
  { label: "Who it's for", href: "#who" },
  { label: "Next meetup", href: "#event" },
  { label: "Register", href: "#register" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // 🔥 Navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔥 Smooth scroll handler
  const handleScrollTo = (id) => {
    const el = document.querySelector(id);
    el?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 shadow-md backdrop-blur"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">

        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-3 group"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-orange-400 text-white shadow-sm">
            FR
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
              className="relative hover:text-orange-600 transition"
            >
              {link.label}

              {/* 🔥 underline animation */}
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
        </nav>

        {/* CTA + Mobile */}
        <div className="flex items-center gap-3">

          {/* Desktop CTA */}
          <button
            onClick={() => handleScrollTo("#register")}
            className="hidden sm:inline-flex items-center justify-center rounded-full bg-orange-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-orange-200 transition-all hover:-translate-y-0.5 hover:bg-orange-600"
          >
            Register
          </button>

          {/* Mobile CTA */}
          <button
            onClick={() => handleScrollTo("#register")}
            className="sm:hidden inline-flex items-center justify-center rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white"
          >
            Join
          </button>

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
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
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

          <button
            onClick={() => handleScrollTo("#register")}
            className="w-full bg-orange-500 text-white py-2 rounded-full mt-2"
          >
            Register Now
          </button>
        </div>
      </div>
    </header>
  );
}