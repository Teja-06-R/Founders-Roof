import { CONTACT } from "../data/siteData";

const highlights = [
  {
    title: "No Stage, No Fluff",
    description:
      "Skip the boring presentations. Dive straight into meaningful conversations.",
  },
  {
    title: "Real Conversations",
    description:
      "Meet founders, freelancers, and builders who are actually doing the work.",
  },
  {
    title: "Genuine Connections",
    description:
      "Build relationships that last beyond a single meetup. Your tribe awaits.",
  },
];

export default function About() {
  return (
    <section id="about" className="bg-[#f9fafb] py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">

        {/* HEADER */}
        <p className="text-sm font-semibold uppercase tracking-widest text-orange-500">
          What We Do
        </p>

        <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-black">
          What is Founders Roof?
        </h2>

        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed">
          A free, community-driven space where entrepreneurs meet every Sunday
          morning in Vijayawada to share ideas, solve problems, and grow together.
        </p>

        {/* CARDS */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl bg-white p-7 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <h3 className="text-lg font-bold text-black">
                {item.title}
              </h3>

              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <a
            href="#register"
            className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-orange-600 hover:shadow-lg"
          >
            Register for Next Meetup →
          </a>

          <a
            href={CONTACT.whatsapp}
            className="inline-flex items-center justify-center rounded-full border border-orange-200 bg-white px-6 py-3 text-sm font-semibold text-orange-700 transition hover:-translate-y-1 hover:border-orange-300"
          >
            Join WhatsApp Community
          </a>
        </div>

      </div>
    </section>
  );
}