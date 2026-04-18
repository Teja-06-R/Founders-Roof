import { useMemo, useState } from "react";
import { Check } from "lucide-react";
import { EVENT } from "../data/siteData";

const categories = [
  "Founder",
  "Aspiring entrepreneur",
  "Freelancer",
  "Business owner",
  "Professional",
  "Student",
];

const initialValues = {
  name: "",
  email: "",
  phone: "",
  category: "",
};

export default function RegistrationForm() {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle");

  const errors = useMemo(() => {
    const e = {};
    if (!values.name.trim()) e.name = "Name is required";
    if (!values.email.trim()) e.email = "Email is required";
    if (!values.phone.trim()) e.phone = "Phone is required";
    if (!values.category) e.category = "Select category";
    return e;
  }, [values]);

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;

    setStatus("submitting");
    setTimeout(() => setStatus("success"), 800);
  };

  return (
    <section id="register" className="bg-[#f9fafb] py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-16 items-center">

        {/* LEFT SIDE (THIS IS WHAT WAS MISSING 🔥) */}
        <div className="flex-1">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-500">
            Register Now
          </p>

          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black leading-tight">
            Grab Your Spot This Sunday
          </h2>

          <p className="mt-4 text-gray-600 text-lg">
            Takes 30 seconds. No fees, no spam. Just show up and connect.
          </p>

          {/* BENEFITS */}
          <div className="mt-6 space-y-3">

            <div className="flex items-center gap-3">
              <div className="bg-orange-100 p-2 rounded-full">
                <Check size={16} className="text-orange-500" />
              </div>
              <p className="text-gray-700">100% free — always</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-orange-100 p-2 rounded-full">
                <Check size={16} className="text-orange-500" />
              </div>
              <p className="text-gray-700">Meet 50+ entrepreneurs weekly</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-orange-100 p-2 rounded-full">
                <Check size={16} className="text-orange-500" />
              </div>
              <p className="text-gray-700">Limited spots per meetup</p>
            </div>

          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="w-full max-w-md">
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl bg-white p-8 shadow-xl border border-gray-100"
          >
            <h3 className="text-xl font-semibold text-black">
              Reserve your spot
            </h3>

            <div className="mt-6 space-y-4">

              <input
                type="text"
                placeholder="Full Name"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-orange-100 focus:border-orange-400 outline-none"
                onChange={(e) => setValues({ ...values, name: e.target.value })}
              />

              <input
                type="email"
                placeholder="Email"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-orange-100 focus:border-orange-400 outline-none"
                onChange={(e) => setValues({ ...values, email: e.target.value })}
              />

              <input
                type="tel"
                placeholder="+91 98765 43210"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-orange-100 focus:border-orange-400 outline-none"
                onChange={(e) => setValues({ ...values, phone: e.target.value })}
              />

              <select
                className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-orange-100 focus:border-orange-400 outline-none"
                onChange={(e) => setValues({ ...values, category: e.target.value })}
              >
                <option value="">I am a...</option>
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>

            </div>

            {/* CTA */}
            <button
              type="submit"
              className="mt-6 w-full rounded-full bg-orange-500 py-4 text-white font-semibold text-lg shadow-lg hover:bg-orange-600 transition"
            >
              {status === "success"
                ? "Registered Successfully 🎉"
                : "Register Now — It's Free"}
            </button>

          </form>
        </div>

      </div>
    </section>
  );
}