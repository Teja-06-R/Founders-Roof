import { motion } from "framer-motion";
import { useSiteData } from "../hooks/useSiteData";
import { Rocket, PenTool, GraduationCap, Briefcase } from "lucide-react";

const audiences = [
  {
    icon: Rocket,
    title: "Founders",
    description: "Building something? Meet others on the same journey.",
  },
  {
    icon: PenTool,
    title: "Freelancers",
    description: "Find collaborators, clients, and a support system.",
  },
  {
    icon: GraduationCap,
    title: "Students",
    description: "Get inspired and start before you graduate.",
  },
  {
    icon: Briefcase,
    title: "Professionals",
    description: "Expand your network and explore new ideas.",
  },
];

export default function WhoShouldJoin() {
  // Add this inside the component, before return:
  const { data } = useSiteData();
  const whatsappLink = data?.links?.whatsapp ?? "#";
  return (
    <section id="who" className="bg-[#f9fafb] py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
        {/* HEADER */}
        <p className="text-sm font-semibold uppercase tracking-widest text-orange-500">
          Who's it for
        </p>

        <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-black">
          Built For Builders Like You
        </h2>

        {/* CARDS */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-white p-7 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* ICON */}
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100">
                <item.icon size={22} className="text-orange-500" />
              </div>

              {/* TITLE */}
              <h3 className="mt-4 text-lg font-bold text-black">
                {item.title}
              </h3>

              {/* DESC */}
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-orange-500 px-8 py-3 text-base font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-orange-600 hover:shadow-lg"
          >
            Join WhatsApp Community →
          </a>
        </div>
      </div>
    </section>
  );
}
