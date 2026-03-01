import Link from "next/link";

export default function Home() {
  return (
    <div className="landing">

      <div className="landing-content">
        <h1 className="brand">FloraAurora</h1>
        <p className="tagline">Where flowers meet elegance.</p>

        <Link href="/login">
          <button className="start-btn">Get Started</button>
        </Link>
      </div>

    </div>
  );
}
