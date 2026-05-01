import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { useSiteData } from "../hooks/useSiteData";

export default function UpcomingEvent() {
  const { data, loading } = useSiteData();
  const event = data?.event ?? null;

  // Hide entire section if no event scheduled
  if (loading || !event?.date) return null;

  const formatTime = (time) => {
    if (!time) return "";
    return `${time.hour}:${String(time.minute).padStart(2, "0")} ${time.period}`;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric", month: "long", year: "numeric",
    });
  };

  const getDayName = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", { weekday: "long" });

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
          <div className="absolute -top-20 -right-20 h-64 w-64 bg-orange-200/30 blur-3xl rounded-full" />

          <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            {/* LEFT */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-orange-500">
                Upcoming Event
              </p>
              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-black">
                Next Meetup this {getDayName(event.date)}
              </h2>
              <p className="mt-3 text-gray-600 text-lg">
                {event.entry === "Free"
                  ? "Free to attend — spots fill up fast."
                  : "Limited seats — secure yours before it's full."}
              </p>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {[
                  { icon: Calendar, label: "Date", value: formatDate(event.date) },
                  { icon: Clock,    label: "Time", value: formatTime(event.time) },
                  { icon: MapPin,   label: "Location", value: event.location },
                  { icon: Users,    label: "Entry", value: event.entry },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100">
                      <Icon className="text-orange-500" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{label}</p>
                      <p className="font-semibold text-black">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT CTA */}
            <div className="flex flex-col items-center gap-3 lg:justify-end">
              
               <a href="#register"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("register")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="rounded-full bg-orange-500 px-10 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-orange-600 hover:shadow-xl"
              >
                Reserve Your Spot →
              </a>
              <p className="text-xs text-gray-400">Takes 30 seconds</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}