const testimonials = [
  {
    quote: "Met amazing founders here. The energy is real and actionable.",
    name: "Srinivas P.",
    role: "SaaS founder",
  },
  {
    quote: "Best networking in Vijayawada. Every meetup sparks new ideas.",
    name: "Ananya R.",
    role: "Product designer",
  },
  {
    quote: "Genuine conversations without fluff. Found my first mentor here.",
    name: "Karthik V.",
    role: "Aspiring entrepreneur",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-gray-50 py-16 lg:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-orange-500">
              Community vibes
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-gray-900 sm:text-4xl">
              What members say about Founders Roof
            </h2>
          </div>
          <a
            href="#register"
            className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-200 transition hover:-translate-y-0.5 hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-200"
          >
            Register for Next Meetup
          </a>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <p className="text-base text-gray-700">"{testimonial.quote}"</p>
              <div className="mt-5">
                <p className="text-sm font-semibold text-gray-900">
                  {testimonial.name}
                </p>
                <p className="text-xs text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
