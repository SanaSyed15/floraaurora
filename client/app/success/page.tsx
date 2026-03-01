"use client";

import { useEffect, useState } from "react";

export default function SuccessPage() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 300);
  }, []);

  return (
    <div className="success-container">

      {/* Flower Shower */}
      <div className="petals">
        {[...Array(20)].map((_, i) => (
          <span key={i} className="petal"></span>
        ))}
      </div>

      <div className={`success-content ${show ? "visible" : ""}`}>

        {/* Animated Tick */}
        <div className="tick-circle">
          <svg viewBox="0 0 52 52" className="tick">
            <circle className="tick-circle-bg" cx="26" cy="26" r="25" fill="none"/>
            <path
              className="tick-check"
              fill="none"
              d="M14 27 l7 7 l16 -16"
            />
          </svg>
        </div>

        <h1 className="success-title">Order Placed</h1>
        <p className="success-line delay-1">
          Your arrangement is being prepared with care.
        </p>
        <br></br>
        <p className="success-line delay-3">
          Thank you for shopping with FloraAurora.
        </p>

        <a href="/shop" className="continue-btn">
          Continue Shopping
        </a>

      </div>
    </div>
  );
}