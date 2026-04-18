import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { EVENT } from "../data/siteData";

export default function UpcomingEvent() {
  return (
    <section id="event" className="bg-[#f9fafb] py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border-2 border-orange-500/80 bg-white p-10 shadow-xl"
        >
          {/* subtle glow */}
          <div className="absolute -top-20 -right-20 h-64 w-64 bg-orange-200/30 blur-3xl rounded-full" />

          <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">

            {/* LEFT */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-orange-500">
                Upcoming Event
              </p>

              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-black">
                Next Sunday Meetup
              </h2>

              <p className="mt-3 text-gray-600 text-lg">
                Limited spots — reserve yours today!
              </p>

              {/* INFO GRID */}
              <div className="mt-8 grid gap-6 sm:grid-cols-2">

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100">
                    <Calendar className="text-orange-500" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-semibold text-black">{EVENT.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100">
                    <Clock className="text-orange-500" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Time</p>
                    <p className="font-semibold text-black">{EVENT.time}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100">
                    <MapPin className="text-orange-500" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-semibold text-black">{EVENT.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100">
                    <Users className="text-orange-500" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Entry</p>
                    <p className="font-semibold text-black">Free Forever</p>
                  </div>
                </div>

              </div>
            </div>

            {/* RIGHT CTA */}
            <div className="flex justify-center lg:justify-end">
              <button
                onClick={() =>
                  document
                    .getElementById("register")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="rounded-full bg-orange-500 px-10 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-orange-600 hover:shadow-xl"
              >
                Reserve Your Spot
              </button>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}