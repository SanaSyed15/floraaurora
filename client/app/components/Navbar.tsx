"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const [customerName, setCustomerName] = useState("");

  useEffect(() => {
    const customer_id = localStorage.getItem("customer_id");
    const name = localStorage.getItem("customer_name");

    if (name) setCustomerName(name);

    if (customer_id) {
      fetch(`http://localhost:5001/api/cart/${customer_id}`)
        .then(res => res.json())
        .then(data => setCartCount(data.length));
    }
  }, []);

  return (
    <nav className="navbar">

      <div className="nav-left">
        <Link href="/shop" className="logo">
          FloraAurora 🌸
        </Link>
      </div>

      <div className="nav-right">
        <span className="welcome">
          Hi, {customerName}
        </span>

        <Link href="/cart" className="cart-icon">
          🛒
          {cartCount > 0 && (
            <span className="cart-count">
              {cartCount}
            </span>
          )}
        </Link>
      </div>

    </nav>
  );
}