import { Camera, MessageCircle } from "lucide-react";
import { useSiteData } from "../hooks/useSiteData";

export default function Footer() {
  const { data } = useSiteData();
  const hasEvent = !!data?.event?.date;
  const whatsappLink = data?.links?.whatsapp ?? "#";
  const instagramLink = data?.links?.instagram ?? "#";

  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3 lg:items-start">

          {/* BRAND */}
          <div>
            <h3 className="text-2xl font-bold tracking-tight">
              Founders <span className="text-orange-500">Roof</span>
            </h3>
            <p className="mt-4 max-w-sm text-gray-400 text-sm leading-relaxed">
              Vijayawada's fastest growing startup community where builders meet,
              connect, and take action.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
              Quick Links
            </p>
            <div className="mt-4 flex flex-col gap-3 text-sm">
              <a href="#about" className="hover:text-orange-400 transition">About</a>
              <a href="#who" className="hover:text-orange-400 transition">Who it's for</a>
              {/* Only show if event is live */}
              {hasEvent && (
                <>
                  <a href="#event" className="hover:text-orange-400 transition">Next Meetup</a>
                  <a href="#register" className="hover:text-orange-400 transition">Register</a>
                </>
              )}
            </div>
          </div>

          {/* CONNECT */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
              Connect
            </p>
            <div className="mt-4 flex flex-col gap-4 text-sm">
              
              <a  href={instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-orange-400 transition"
              >
                <Camera size={16} />
                Instagram
              </a>
              
              <a  href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-orange-400 transition"
              >
                <MessageCircle size={16} />
                WhatsApp Community
              </a>
            </div>

            {/* CTA — always Join WhatsApp, Register only if event */}
            <div className="mt-6 flex flex-col gap-3">
              {hasEvent && (
                
                <a  href="#register"
                  className="inline-flex items-center justify-center rounded-full border border-orange-500 px-6 py-2.5 text-sm font-semibold text-orange-400 hover:bg-orange-500 hover:text-white transition"
                >
                  Register for Meetup →
                </a>
              )}
              
              <a  href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-orange-600 transition"
              >
                Join Community →
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Founders Roof. Built for builders.
        </div>
      </div>
    </footer>
  );
}