import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Met amazing founders who are now my co-founders. This community changed my life.",
    name: "Rahul K.",
    role: "Startup Founder",
  },
  {
    quote:
      "Best networking in Vijayawada, hands down. Every Sunday is packed with energy.",
    name: "Priya S.",
    role: "Freelance Designer",
  },
  {
    quote:
      "I came as a student and left with a business idea and two mentors. Incredible.",
    name: "Arjun M.",
    role: "Engineering Student",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[#f9fafb] py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* CENTERED HEADER (IMPORTANT CHANGE) */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-500">
            Community Love
          </p>

          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black">
            What Members Say
          </h2>
        </div>

        {/* CARDS */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-3xl bg-white p-8 shadow-md border border-gray-100 hover:shadow-xl transition"
            >

              {/* QUOTE ICON 🔥 */}
              <div className="text-orange-300">
                <Quote size={28} />
              </div>

              {/* TEXT */}
              <p className="mt-5 text-gray-700 leading-relaxed text-base">
                {t.quote}
              </p>

              {/* DIVIDER */}
              <div className="mt-6 h-px w-full bg-gray-200" />

              {/* NAME */}
              <div className="mt-4">
                <p className="font-semibold text-black">{t.name}</p>
                <p className="text-sm text-gray-500">{t.role}</p>
              </div>

            </div>
          ))}
        </div>

        {/* CTA (CENTERED, NOT SIDE) */}
        <div className="mt-14 text-center">
          <a
            href="#register"
            className="inline-flex items-center justify-center rounded-full bg-orange-500 px-8 py-4 text-white font-semibold text-lg shadow-lg hover:bg-orange-600 transition"
          >
            Register for Next Meetup →
          </a>
        </div>

      </div>
    </section>
  );
}