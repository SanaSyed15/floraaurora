"use client";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import Link from "next/link";

/* ================= TYPES ================= */

type CartItem = {
  id: number;
  flower_id: number;
  name: string;
  image_url: string;
  price: number;
  quantity: number;
};

export default function CartPage() {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [customerName, setCustomerName] = useState("");

  useEffect(() => {
    const customer_id = localStorage.getItem("customer_id");
    const name = localStorage.getItem("customer_name");

    if (!customer_id) {
      window.location.href = "/login";
      return;
    }

    if (name) setCustomerName(name);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/${customer_id}`)
      .then(res => res.json())
      .then(data => {
        setItems(data);
        calculateTotal(data);
      });
  }, []);

  const calculateTotal = (data: CartItem[]) => {
    const sum = data.reduce(
      (acc, item) => acc + Number(item.price) * item.quantity,
      0
    );
    setTotal(sum);
  };

  const removeItem = async (id: number) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/remove/${id}`, {
      method: "DELETE",
    });

    const updated = items.filter(item => item.id !== id);
    setItems(updated);
    calculateTotal(updated);
  };

  const updateQuantity = async (id: number, qty: number) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: qty }),
    });

    const updated = items.map(item =>
      item.id === id ? { ...item, quantity: qty } : item
    );

    setItems(updated);
    calculateTotal(updated);
  };

  return (
    <div className="cart-wrapper">

      <div className="cart-header">
  <h1>Your Cart</h1>

  {items.length > 0 && (
    <p>Review your selected arrangements</p>
  )}

</div>

      {items.length === 0 ? (
        <div className="empty-cart-wrapper">

  <div className="empty-card">

    <div className="empty-icon">
      <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#CDB4DB" strokeWidth="1.5">
        <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1 5h12l-1-5M9 21a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z"/>
      </svg>
    </div>

    <h2>Your cart is empty</h2>

    <p>
      Looks like you haven’t added any arrangements yet.
      Discover handcrafted bouquets made with elegance.
    </p>

    <button
      className="continue-shopping-btn"
      onClick={() => window.location.href = "/shop"}
    >
      Explore Collection
    </button>

  </div>

</div>
      ) : (
        <div className="cart-layout">

          <div className="cart-items">
            {items.map(item => (
              <div key={item.id} className="cart-item">

                <img src={item.image_url} alt={item.name} />

                <div className="cart-details">
                  <h3>{item.name}</h3>
                  <p>₹ {item.price}</p>

                  <div className="quantity-row">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, Math.max(1, item.quantity - 1))
                      }
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>

                <div className="item-total">
                  ₹ {Number(item.price) * item.quantity}
                </div>

              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Total</span>
              <span>₹ {total}</span>
            </div>

            <button
  className="checkout-btn"
  onClick={() => router.push("/checkout")}
>
  Proceed to Checkout
</button>
          </div>

        </div>
      )}
    </div>
  );
}