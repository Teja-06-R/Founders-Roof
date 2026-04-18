import { CONTACT } from "../data/siteData";

export default function Founder() {
  return (
    <section className="bg-[#f9fafb] py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

          {/* LEFT CONTENT */}
          <div>

            {/* Label */}
            <p className="text-sm font-semibold uppercase tracking-widest text-orange-500">
              The person behind it
            </p>

            {/* Headline (BIG upgrade) */}
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black leading-tight">
              Meet Vishnu Vanapala
            </h2>

            {/* Story (NOT boring description) */}
            <p className="mt-6 text-gray-600 leading-relaxed text-base">
              Vishnu started Founders Roof with a simple belief: the best ideas
              happen through real conversations, not behind screens.
            </p>

            <p className="mt-4 text-gray-600 leading-relaxed text-base">
              What began as a small Sunday meetup in Vijayawada has grown into a
              2000+ member community that shows up every single week to build,
              connect, and take action.
            </p>

            <p className="mt-4 text-gray-600 leading-relaxed text-base">
              His mission is simple — make entrepreneurship accessible,
              community-driven, and focused on execution.
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap gap-4">

              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-orange-500 px-7 py-3 text-base font-semibold text-white shadow-lg hover:bg-orange-600 transition"
              >
                Message on WhatsApp
              </a>

              <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-orange-200 bg-white px-7 py-3 text-base font-semibold text-orange-700 hover:border-orange-300 transition"
              >
                Follow on Instagram
              </a>

            </div>

          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-center lg:justify-end">

            <div className="relative">

              {/* Glow background (subtle premium feel) */}
              <div className="absolute -inset-4 bg-orange-200/30 blur-2xl rounded-3xl"></div>

              {/* Image */}
              <div className="relative overflow-hidden rounded-3xl shadow-xl">
                <img
                  src="/images/founder.png"   // 👈 put your image in public folder
                  alt="Vishnu Vanapala"
                  className="h-[320px] w-full object-cover sm:h-[420px] lg:h-[460px]"
                />
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}