import { useSiteData } from "../hooks/useSiteData";

export default function WhatsAppFloating() {
  const { data } = useSiteData();
  const whatsappLink = data?.links?.whatsapp ?? "#";

  return (
    
    <a  href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Join Founders Roof on WhatsApp"
      className="fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg shadow-green-200 transition hover:-translate-y-1 hover:bg-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-200"
    >
      <svg aria-hidden="true" viewBox="0 0 32 32" className="h-7 w-7 fill-current">
        <path d="M16 5.3a10.7 10.7 0 0 0-9.2 16.1L5.1 27l5.8-1.5A10.7 10.7 0 1 0 16 5.3Zm0 19.5c-1.7 0-3.4-.5-4.8-1.4l-.4-.2-3.4.9.9-3.3-.2-.4a8.5 8.5 0 1 1 7.9 4.4Zm4.7-6.3c-.3-.2-1.7-.8-2-1-.2-.1-.4-.2-.6.2-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6 0-.3-.2-1.2-.4-2.2-1.4-.8-.7-1.4-1.7-1.5-2-.2-.3 0-.4.1-.5l.4-.5c.2-.2.3-.3.4-.6.1-.2 0-.4 0-.6 0-.2-.6-1.5-.8-2.1-.2-.6-.5-.5-.6-.5h-.5c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.6s1.1 3 1.2 3.3c.1.2 2.2 3.4 5.3 4.7.7.3 1.2.4 1.6.5.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.1-1.4-.1-.1-.2-.2-.5-.3Z" />
      </svg>
    </a>
  );
}