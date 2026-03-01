"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function CollectionsPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const collections = [
    { name: "Romantic", desc: "Deep red expressions of love", image: "/romantic.jpg" },
    { name: "Pastel", desc: "Soft and elegant arrangements", image: "/pastel.jpg" },
    { name: "Celebration", desc: "Bright blooms for joyful moments", image: "/celebration.jpg" },
    { name: "Luxury", desc: "Premium signature bouquets", image: "/luxury.jpg" }
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      if (!isHovering) {
        container.scrollBy({ left: 320, behavior: "smooth" });

        if (
          container.scrollLeft + container.clientWidth >=
          container.scrollWidth - 10
        ) {
          container.scrollTo({ left: 0, behavior: "smooth" });
        }
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [isHovering]);

  return (
    <div className="collections-wrapper">
      <div className="collections-header">
        <h1>Curated Floral Collections</h1>
        <p>Crafted for every emotion.</p>
      </div>

      <div
        className="collections-carousel"
        ref={containerRef}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {collections.map((col, i) => (
          <div
            key={i}
            className="collection-card"
            onClick={() => router.push(`/shop?collection=${col.name}`)}
          >
            <img src={col.image} alt={col.name} />
            <div className="overlay">
              <h3>{col.name}</h3>
              <p>{col.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}