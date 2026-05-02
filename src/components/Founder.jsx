import { CONTACT } from "../data/siteData";
import { useSiteData } from "../hooks/useSiteData";
import ShimmerImage from "./ShimmerImage";

export default function Founder() {
  const { data } = useSiteData();
  const links = data?.links ?? {};
  const founderImg = data?.images?.founder || "";
  return (
    <section className="bg-[#f9fafb] py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* LEFT CONTENT */}
          <div>
            {/* Label */}
            <p className="text-sm font-semibold uppercase tracking-widest text-orange-500">
              FROM THE FOUNDER
            </p>

            {/* Headline (BIG upgrade) */}
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black leading-tight">
              Vishnu Vanapala
            </h2>

            {/* Story (NOT boring description) */}
            <p className="mt-6 text-gray-600 leading-relaxed text-base">
              I started Founders Roof with a simple belief that real
              conversations move things forward.
            </p>

            <p className="mt-4 text-gray-600 leading-relaxed text-base">
              What began in Vijayawada has grown into a 2000+ member founder
              community.
            </p>

            <p className="mt-4 text-gray-600 leading-relaxed text-base">
              I saw a gap where people were meeting often, but not really
              connecting in a meaningful way. Founders Roof was built to change
              that by bringing the right people into the same room.
            </p>

            <p className="mt-4 text-gray-600 leading-relaxed text-base">
              What drives me is the idea of building a space where ambitious
              individuals can think clearly, share openly, and grow through real
              interactions.
            </p>
            <p className="mt-4 text-gray-600 leading-relaxed text-base">
              This is just the beginning.
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={links.instagram ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-orange-500 px-7 py-3 text-base font-semibold text-white shadow-lg hover:bg-orange-600 transition"
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
              <div className="relative overflow-hidden rounded-3xl shadow-xl h-[320px] sm:h-[420px] lg:h-[460px]">
                <ShimmerImage
                  src={founderImg}
                  alt="Vishnu Vanapala"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
