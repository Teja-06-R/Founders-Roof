import { COMMUNITY, IMAGES } from "../data/siteData";

export default function SocialProof() {
  return (
    <section className="bg-[#f9fafb] py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">

        {/* TOP TEXT */}
        <p className="text-sm font-semibold uppercase tracking-widest text-orange-500">
          Community in Action
        </p>

        <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-black">
          {COMMUNITY.memberCount}+ Members & Growing Every Week
        </h2>

        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed">
          Weekly meetups, every single Sunday. No breaks. Just builders
          connecting with builders.
        </p>

        {/* CTA */}
        <div className="mt-6">
          <a
            href="#register"
            className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-orange-600 hover:shadow-lg"
          >
            Reserve Your Spot →
          </a>
        </div>

        {/* IMAGE GRID */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {IMAGES.meetup.map((src, index) => (
            <div
              key={index}
              className="group overflow-hidden rounded-2xl shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <img
                src={src}
                alt={`Founders Roof meetup ${index + 1}`}
                className="h-[220px] w-full object-cover sm:h-[260px] lg:h-[280px] transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}