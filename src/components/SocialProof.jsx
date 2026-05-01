import { useSiteData } from "../hooks/useSiteData";

export default function SocialProof() {
  const FALLBACK_IMGS = ["/images/meetup1.png", "/images/meetup2.png", "/images/meetup3.png"];

  const { data } = useSiteData();
  const stats = data?.stats ?? { members: "1000+" };
  const links = data?.links ?? {};

  // Use Firestore images, fall back to local if not uploaded yet
  const communityImgs = [0, 1, 2].map(
    (i) => data?.images?.community?.[i] || FALLBACK_IMGS[i]
  );
  return (
     <section className="bg-[#f9fafb] py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">

        <p className="text-sm font-semibold uppercase tracking-widest text-orange-500">
          Community in Action
        </p>

        <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-black">
          {stats.members} Members and Growing
        </h2>

        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed">
          Curated sessions. Real conversations. A growing network of founders.
        </p>

        {/* CTA — client spec: Join WhatsApp, remove Reserve Your Spot */}
        <div className="mt-6">
          
            <a href={links.whatsapp ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-orange-600 hover:shadow-lg"
          >
            Join WhatsApp Community
          </a>
        </div>

        {/* IMAGE GRID */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {communityImgs.map((src, index) => (
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