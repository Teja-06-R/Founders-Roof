import { motion } from "framer-motion";
import { useSiteData } from "../hooks/useSiteData";
import ShimmerImage from "./ShimmerImage";

// Fallback images if admin hasn't uploaded yet

export default function Hero() {
  const { data, loading } = useSiteData();

  const event = data?.event ?? null;
  const links = data?.links ?? {};
  const stats = data?.stats ?? { members: "1000+", meetups: "10+" };
  const heroImg = data?.images?.hero || "";

  // Badge
  const badgeText = (() => {
    if (loading) return "Loading...";
    if (!event?.date) return "New meetup coming soon.";
    const d = new Date(event.date);
    const day = d.toLocaleDateString("en-IN", { weekday: "long" });
    const date = d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
    });
    const time = `${event.time.hour}:${String(event.time.minute).padStart(2, "0")} ${event.time.period}`;
    return `${day} · ${time} · ${event.location}`;
  })();

  // Floating badge inside image
  const floatingBadge = (() => {
    if (!event?.date) return " coming soon.";
    const d = new Date(event.date);
    const date = d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
    });
    return `${date} · ${event.time.hour}:${String(event.time.minute).padStart(2, "0")} ${event.time.period}`;
  })();

  return (
    <section id="top" className="relative overflow-hidden bg-[#f6e9dc]">
      <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-orange-300/30 blur-3xl" />

      <div className="mx-auto max-w-6xl px-4 pt-28 pb-20 sm:px-6 lg:flex lg:items-center lg:gap-16 lg:px-8 lg:pt-32 lg:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-xs font-semibold text-orange-700">
            <span
              className={`h-2 w-2 rounded-full ${event?.date ? "bg-orange-500" : "bg-gray-400"}`}
            />
            {badgeText}
          </div>

          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight text-black">
            Vijayawada's <br />
            <span className="text-orange-500">Fastest Growing</span> <br />
            Startup <br />
            Community
          </h1>

          <p className="mt-6 max-w-xl text-lg text-gray-600 leading-relaxed">
            A curated space for founders to connect and share perspectives. No
            stage. No fluff. Just real conversations.
          </p>

          {/* CTAs — Register removed, WhatsApp is now primary */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href={links.whatsapp ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-orange-500 px-7 py-3 text-base font-semibold text-white shadow-md transition-all hover:-translate-y-1 hover:bg-orange-600"
            >
              Join WhatsApp Community
            </a>
          </div>

          {/* Urgency line — only shown if event exists */}
          {event?.date && (
            <p className="mt-4 text-sm font-medium text-orange-700">
              {event.entry === "Free"
                ? "⚡ Free to attend — spots fill up fast. Don't miss out."
                : "🎟️ Limited seats available — secure yours before it's full."}
            </p>
          )}

          {/* Stats */}
          <div className="mt-10 flex items-center gap-8 text-sm text-gray-600">
            <div>
              <p className="text-2xl font-bold text-black">{stats.members}</p>
              <p>Members</p>
            </div>
            <div className="h-8 w-px bg-orange-200" />
            <div>
              <p className="text-2xl font-bold text-black">{stats.meetups}</p>
              <p>Meetups</p>
            </div>
            {/* Free Entry stat removed — entry varies per event */}
          </div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mt-12 flex-1 lg:mt-0 flex justify-center"
        >
          <div className="relative w-full max-w-[520px]">
            <div className="overflow-hidden rounded-2xl shadow-xl h-[250px] sm:h-[380px] lg:h-[420px]">
              <ShimmerImage
                src={heroImg}
                alt="Founders Roof meetup"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 left-6 rounded-xl bg-white px-4 py-2 shadow-lg">
              <p className="text-sm font-semibold text-gray-900">
                🔥 Next Meetup
              </p>
              <p className="text-xs text-gray-600">{floatingBadge}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
