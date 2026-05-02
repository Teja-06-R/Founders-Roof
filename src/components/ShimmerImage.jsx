import { useState } from "react";

export default function ShimmerImage({ src, alt, className }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Shimmer always shows until image is fully loaded */}
      {!loaded && (
        <div className="absolute inset-0 animate-shimmer rounded-inherit" />
      )}

      {src ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`w-full h-full transition-opacity duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          } ${className ?? ""}`}
        />
      ) : (
        // No src at all — keep showing shimmer permanently
        <div className="absolute inset-0 animate-shimmer" />
      )}
    </div>
  );
}