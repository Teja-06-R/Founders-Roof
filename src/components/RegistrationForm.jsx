import { motion } from "framer-motion";
import { ExternalLink, Users, Zap, Shield } from "lucide-react";
import { useSiteData } from "../hooks/useSiteData";

const perks = [
  { icon: Zap,     text: "Takes 30 seconds to register" },
  { icon: Users,   text: "Meet 100+ founders at every meetup" },
  { icon: Shield,  text: "Limited spots — first come first served" },
];

export default function RegistrationForm() {
  const { data, loading } = useSiteData();
  const event = data?.event ?? null;
  const registrationLink = data?.registrationLink ?? "";

  // Hide if no event scheduled
  if (loading || !event?.date) return null;

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric", month: "long",
    });

  return (
    <section id="register" className="bg-white py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-orange-100 bg-[#fff8f3] p-10 shadow-xl text-center"
        >
          {/* Label */}
          <span className="inline-block rounded-full border border-orange-200 bg-white px-5 py-1.5 text-xs font-semibold uppercase tracking-widest text-orange-600">
            Register Now
          </span>

          {/* Headline */}
          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black leading-tight">
            Grab Your Spot for{" "}
            <span className="text-orange-500">{formatDate(event.date)}</span>
          </h2>

          <p className="mt-4 text-gray-500 text-lg max-w-lg mx-auto">
            One click. Fill the form. Show up. That's it.
          </p>

          {/* Perks */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
            {perks.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-sm text-gray-600">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-100">
                  <Icon size={14} className="text-orange-500" />
                </div>
                {text}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="mt-10">
            {registrationLink ? (
              
              <a  href={registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-12 py-4 text-lg font-bold text-white shadow-lg shadow-orange-200 transition-all duration-300 hover:-translate-y-1 hover:bg-orange-600 hover:shadow-xl"
              >
                Register Now
                <ExternalLink size={18} />
              </a>
            ) : (
              <p className="text-sm text-gray-400 italic">
                Registration link coming soon.
              </p>
            )}
          </div>

          <p className="mt-4 text-xs text-gray-400">
            You'll be redirected to a Google Form — takes under 30 seconds
          </p>
        </motion.div>
      </div>
    </section>
  );
}