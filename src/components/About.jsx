import { useSiteData } from "../hooks/useSiteData";

const memberBenefits = [
  {
    icon: "🤝",
    number: "01",
    title: "Exclusive Founder Meetups",
    description:
      "Exclusive sessions with the right founders, designed for meaningful conversations and strong visibility within the community.",
  },
  {
    icon: "💼",
    number: "02",
    title: "Access to Investors",
    description:
      "Qualified founders get direct opportunities to connect with investors through curated sessions and warm introductions.",
  },
  {
    icon: "🎯",
    number: "03",
    title: "Expert Mentorship",
    description:
      "Get access to join sessions led by experienced founders and industry experts , offering practical insights and relevant guidance.",
  },
];

export default function About() {
  const { data } = useSiteData();
  const links = data?.links ?? {};

  return (
    <section id="about" className="bg-[#f9fafb] py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* TOP HEADER — centered */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-500">
            What We Do
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-black">
            What is Founders Roof?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 leading-relaxed">
            A curated, community-driven space where founders come together to
            share perspectives and engage in real conversations.
          </p>
        </div>

        {/* BECOME A MEMBER BLOCK */}
        <div className="mt-20">
          {/* Section label */}
          <div className="text-center mb-10">
            <span className="inline-block rounded-full border border-orange-200 bg-orange-50 px-5 py-1.5 text-xs font-semibold uppercase tracking-widest text-orange-600">
              Membership Benefits
            </span>
            <h3 className="mt-4 text-2xl sm:text-3xl font-extrabold text-black">
              Become a Member. Get Access To.
            </h3>
            <p className="mt-2 text-gray-500 text-base">
              This isn't just a meetup. It's your unfair advantage.
            </p>
          </div>

          {/* CARDS */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {memberBenefits.map((item) => (
              <div
                key={item.title}
                className="group relative rounded-2xl bg-white p-8 shadow-sm border border-gray-100 text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-orange-200"
              >
                {/* Number — top right */}
                <span className="absolute top-6 right-6 text-xs font-bold text-orange-200 select-none">
                  {item.number}
                </span>

                {/* Icon bubble */}
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-orange-50 text-2xl mb-6 transition-transform duration-300 group-hover:scale-110">
                  {item.icon}
                </div>

                {/* Orange accent line */}
                <div className="w-8 h-0.5 bg-orange-400 mb-4 rounded-full" />

                <h3 className="text-base font-bold text-black leading-snug">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* CTA — identity based, not action based */}
          <div className="mt-14 text-center">
            {/* Social proof line above button */}
            <p className="text-sm text-gray-400 mb-4">
              Be part of Vijayawada's most active founder community —{" "}
              <span className="font-semibold text-gray-700">
                where the right people show up
              </span>
            </p>

            <a
              href={links.whatsapp ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-10 py-4 text-base font-bold text-white shadow-lg  transition-all duration-300 hover:-translate-y-1 hover:bg-orange-600 hover:shadow-xl"
            >
              Become a Member
              <span className="text-lg">→</span>
            </a>

            <p className="mt-3 text-xs text-gray-400 ">
              Real founders · Real conversations · Real opportunities
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
