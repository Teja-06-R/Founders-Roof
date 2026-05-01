import { useCallback, useEffect, useRef, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { query, orderBy } from "firebase/firestore"; 

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────
const GAP = 20;
const AUTO_PLAY_INTERVAL = 3500;

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function TestimonialCard({ testimonial, isActive, width }) {
  return (
    <div
      className={`rounded-2xl border border-orange-100 bg-white p-6 shadow-sm
        transition-all duration-500 ease-in-out
        ${isActive ? "scale-100 opacity-100 shadow-lg" : "scale-95 opacity-40"}`}
      style={{ width, flexShrink: 0 }}
    >
      <p className="text-base leading-relaxed text-gray-700">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <div className="mt-5">
        <p className="text-sm font-semibold text-gray-900">{testimonial.name}</p>
        <p className="text-xs text-gray-500">{testimonial.role}</p>
      </div>
    </div>
  );
}

function SectionHeader() {
  return (
    <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-orange-500">
          Community vibes
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-gray-900 sm:text-4xl">
          What members say about Founders Roof
        </h2>
      </div>
      {/* "Register for Next Meetup" button removed — client spec */}
    </div>
  );
}

function Dots({ count, activeIndex, onDotClick }) {
  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          onClick={() => onDotClick(i)}
          aria-label={`Go to testimonial ${i + 1}`}
          className={`h-2 rounded-full transition-all duration-300
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400
            ${i === activeIndex
              ? "w-6 bg-orange-500"
              : "w-2 bg-gray-300 hover:bg-orange-300"
            }`}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [activeIndex, setActiveIndex]   = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  const roRef       = useRef(null);
  const touchStartX = useRef(null);
  const isPausedRef = useRef(false);

  const count = testimonials.length;

  // ── Firestore listener ───────────────────────────────────────────────────
useEffect(() => {
  const q = query(
    collection(db, "testimonials"),
    orderBy("createdAt", "desc")
  );

  const unsub = onSnapshot(q, (snap) => {
    setTestimonials(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  });

  return unsub;
}, []);

  // ── KEY FIX: Callback ref ────────────────────────────────────────────────
  //
  //  WHY THIS BROKE: When testimonials = [] the component returns null, so
  //  the carousel div never mounts. A plain useRef + useEffect runs once
  //  (finding null) and never re-runs after Firestore loads and the div
  //  finally appears. containerWidth stays 0 → cardWidth 0 → invisible cards.
  //
  //  A callback ref fires every time the node mounts/unmounts, so the
  //  ResizeObserver always attaches at the right moment.
  //
  const viewportCallbackRef = useCallback((node) => {
    if (roRef.current) {
      roRef.current.disconnect();
      roRef.current = null;
    }
    if (!node) return;
    const ro = new ResizeObserver(([entry]) =>
      setContainerWidth(entry.contentRect.width)
    );
    ro.observe(node);
    roRef.current = ro;
  }, []);

  // ── Navigation ───────────────────────────────────────────────────────────
  const goTo   = useCallback((i) => setActiveIndex(i), []);
  const goNext = useCallback(() => setActiveIndex((p) => (p + 1) % count), [count]);
  const goPrev = useCallback(() => setActiveIndex((p) => (p - 1 + count) % count), [count]);

  // ── Auto-play ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (count <= 1) return;
    const id = setInterval(() => {
      if (!isPausedRef.current) goNext();
    }, AUTO_PLAY_INTERVAL);
    return () => clearInterval(id);
  }, [count, goNext]);

  // ── Touch / swipe ────────────────────────────────────────────────────────
  const handleTouchStart = (e) => {
    isPausedRef.current = true;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 48) delta > 0 ? goNext() : goPrev();
    touchStartX.current = null;
    isPausedRef.current = false;
  };

  // ── Card width ────────────────────────────────────────────────────────────
  const cardWidth =
    containerWidth === 0
      ? 0
      : containerWidth < 640
      ? containerWidth * 0.84
      : containerWidth < 1024
      ? containerWidth * 0.56
      : containerWidth * 0.40;

  // ── Centered translateX ───────────────────────────────────────────────────
  const translateX =
    containerWidth / 2 - cardWidth / 2 - activeIndex * (cardWidth + GAP);

  // ── Edge cases ────────────────────────────────────────────────────────────
  if (count === 0) return null;

  if (count === 1) {
    return (
      <section className="bg-gray-50 py-16 lg:py-20">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeader />
          <div className="mt-10 flex justify-center">
            <div className="w-full max-w-lg rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
              <p className="text-base leading-relaxed text-gray-700">
                &ldquo;{testimonials[0].quote}&rdquo;
              </p>
              <div className="mt-5">
                <p className="text-sm font-semibold text-gray-900">{testimonials[0].name}</p>
                <p className="text-xs text-gray-500">{testimonials[0].role}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ── Full carousel (count >= 2) ────────────────────────────────────────────
  return (
    <section className="bg-gray-50 py-16 lg:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader />
      </div>

      <div
        ref={viewportCallbackRef}
        className="relative mt-10 overflow-hidden"
        onMouseEnter={() => (isPausedRef.current = true)}
        onMouseLeave={() => (isPausedRef.current = false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex"
          style={{
            gap: GAP,
            opacity: containerWidth === 0 ? 0 : 1,
            transform: `translateX(${translateX}px)`,
            transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease",
            willChange: "transform",
          }}
        >
          {testimonials.map((t, i) => (
            <TestimonialCard
              key={t.id}
              testimonial={t}
              isActive={i === activeIndex}
              width={cardWidth}
            />
          ))}
        </div>
      </div>

      <Dots count={count} activeIndex={activeIndex} onDotClick={goTo} />
    </section>
  );
}