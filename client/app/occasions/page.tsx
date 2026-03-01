"use client";

import { useRouter } from "next/navigation";

export default function OccasionsPage() {
  const router = useRouter();

  const occasions = [
    {
      name: "Birthday",
      desc: "Bright blooms for joyful celebrations.",
      image: "/birthday.jpg",
      collection: "Celebration",
    },
    {
      name: "Anniversary",
      desc: "Romantic florals for timeless love.",
      image: "/anniversary.jpg",
      collection: "Romantic",
    },
    {
      name: "Wedding",
      desc: "Elegant arrangements for your special day.",
      image: "/wedding.jpg",
      collection: "Luxury",
    },
    {
      name: "Congratulations",
      desc: "Vibrant florals for proud moments.",
      image: "/celebrate.jpg",
      collection: "Bright",
    },
    {
      name: "Just Because",
      desc: "Simple gestures, beautiful emotions.",
      image: "/pastel1.jpg",
      collection: "Pastel",
    },
  ];

  return (
    <div className="occasions-wrapper">
      <div className="occasions-header">
        <h1>Celebrate Every Occasion</h1>
        <p>Thoughtfully curated florals for life’s meaningful moments.</p>
      </div>

      <div className="occasions-grid">
        {occasions.map((item, index) => (
          <div
            key={index}
            className="occasion-card"
            onClick={() =>
              router.push(`/shop?collection=${item.collection}`)
            }
          >
            <img src={item.image} alt={item.name} />
            <div className="occasion-overlay">
              <h3>{item.name}</h3>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}