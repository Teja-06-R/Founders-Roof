import { motion } from "framer-motion";
import { CONTACT, EVENT } from "../data/siteData";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-[#f6e9dc]">
      {/* subtle background glow */}
      <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-orange-300/30 blur-3xl" />

      <div className="mx-auto max-w-6xl px-4 pt-28 pb-20 sm:px-6 lg:flex lg:items-center lg:gap-16 lg:px-8 lg:pt-32 lg:pb-24">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-xs font-semibold text-orange-700">
            <span className="h-2 w-2 rounded-full bg-orange-500" />
            Every Sunday · {EVENT.time} · {EVENT.location}
          </div>

          {/* 🔥 HEADLINE */}
          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight text-black">
            Vijayawada’s <br />
            <span className="text-orange-500">Fastest Growing</span> <br />
            Startup <br />
            Community
          </h1>

          {/* Subtext */}
          <p className="mt-6 max-w-xl text-lg text-gray-600 leading-relaxed">
            Connect with founders, builders, and entrepreneurs every Sunday
            morning. No stage, no fluff — just real conversations.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            {/* Primary CTA */}
            <button
              onClick={() =>
                document
                  .getElementById("register")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="inline-flex items-center justify-center rounded-full bg-orange-500 px-7 py-3 text-base font-semibold text-white shadow-md transition-all hover:-translate-y-1 hover:bg-orange-600"
            >
              Register for Next Meetup →
            </button>

            {/* Secondary CTA */}
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-orange-200 bg-white px-7 py-3 text-base font-semibold text-orange-700 transition hover:-translate-y-1 hover:border-orange-300"
            >
              Join WhatsApp
            </a>
          </div>

          {/* Urgency */}
          <p className="mt-4 text-sm font-medium text-orange-700">
            Limited spots available for {EVENT.date}. Reserve early.
          </p>

          {/* Stats */}
          <div className="mt-10 flex items-center gap-8 text-sm text-gray-600">
            <div>
              <p className="text-2xl font-bold text-black">2000+</p>
              <p>Members</p>
            </div>

            <div className="h-8 w-px bg-orange-200" />

            <div>
              <p className="text-2xl font-bold text-black">100+</p>
              <p>Meetups</p>
            </div>

            <div className="h-8 w-px bg-orange-200" />

            <div>
              <p className="text-2xl font-bold text-black">Free</p>
              <p>Entry</p>
            </div>
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
            {/* IMAGE CARD */}
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <img
                src="/images/hero.png"
                alt="Founders Roof meetup"
                className="h-[250px] w-full object-cover sm:h-[380px] lg:h-[420px]"
              />
            </div>

            {/* FLOATING BADGE (outside image like design) */}
            <div className="absolute -bottom-6 left-6 rounded-xl bg-white px-4 py-2 shadow-lg">
              <p className="text-sm font-semibold text-gray-900">
                🔥 Next Meetup
              </p>
              <p className="text-xs text-gray-600">April 19 · 7:00 AM</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
