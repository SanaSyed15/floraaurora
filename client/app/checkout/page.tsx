"use client";

import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const [items, setItems] = useState<any[]>([]);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("10 AM - 1 PM");

  const [isGift, setIsGift] = useState(false);
  const [recipientName, setRecipientName] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");

  const [wrapping, setWrapping] = useState("Classic Wrap");
  const [colorTheme, setColorTheme] = useState("Pastel");
  const [messageCard, setMessageCard] = useState("");
  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  const customer_id =
    typeof window !== "undefined"
      ? localStorage.getItem("customer_id")
      : null;

  useEffect(() => {
    if (!customer_id) return;

    fetch(`http://localhost:5001/api/cart/${customer_id}`)
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  const subtotal = items.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const deliveryFee = 50;
  const total = subtotal + deliveryFee;

  const handleCheckout = async () => {
    const res = await fetch("http://localhost:5001/api/cart/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer_id,
        address,
        city,
        pincode,
        delivery_date: deliveryDate,
        time_slot: timeSlot,
        recipient_name: isGift ? recipientName : null,
        recipient_phone: isGift ? recipientPhone : null,
        wrapping,
        color_theme: colorTheme,
        message_card: messageCard,
        note,
        payment_method: paymentMethod
      })
    });

    const data = await res.json();
    if (data.success) window.location.href = "/success";
  };

  return (
    <div className="structured-bg">
      <div className="structured-container">

        <div className="structured-header">
          <h1>Complete Your Order</h1>
          <p>You're one step away from turning emotion into elegance.</p>
        </div>

        <div className="structured-body">

          {/* STEP 1 */}
          <div className="step-card">
            <div className="step-title">
              <span className="step-number">01</span>
              <h3>Delivery Details</h3>
            </div>

            <textarea
              placeholder="Full Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <div className="row">
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <input
                type="text"
                placeholder="Pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
            </div>

            <div className="row">
              <input
                type="date"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
              />
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
              >
                <option>10 AM - 1 PM</option>
                <option>1 PM - 4 PM</option>
                <option>4 PM - 7 PM</option>
              </select>
            </div>
          </div>

          {/* STEP 2 */}
          <div className="step-card">
            <div className="step-title">
              <span className="step-number">02</span>
              <h3>Gift & Customization</h3>
            </div>

            <div className="gift-toggle-row">
  <label className="gift-toggle">
    <input
      type="checkbox"
      checked={isGift}
      onChange={() => setIsGift(!isGift)}
    />
    <span className="custom-check"></span>
    <span className="gift-label">Send as a gift</span>
  </label>
</div>

            {isGift && (
              <div className="row">
                <input
                  type="text"
                  placeholder="Recipient Name"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                />
                <input
                  type="tel"
                  placeholder="Recipient Phone"
                  value={recipientPhone}
                  onChange={(e) => setRecipientPhone(e.target.value)}
                />
              </div>
            )}

            <div className="row">
              <select
                value={wrapping}
                onChange={(e) => setWrapping(e.target.value)}
              >
                <option>Classic Wrap</option>
                <option>Luxury Wrap</option>
                <option>Eco Wrap</option>
              </select>

              <select
                value={colorTheme}
                onChange={(e) => setColorTheme(e.target.value)}
              >
                <option>Pastel</option>
                <option>Red & White</option>
                <option>Bright Mix</option>
              </select>
            </div>

            <input
              type="text"
              placeholder="Message for card"
              value={messageCard}
              onChange={(e) => setMessageCard(e.target.value)}
            />

            <textarea
              placeholder="Special instructions"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          {/* STEP 3 */}
          <div className="step-card">
            <div className="step-title">
              <span className="step-number">03</span>
              <h3>Payment Method</h3>
            </div>

            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option>Cash on Delivery</option>
              <option>UPI</option>
              <option>Credit / Debit Card</option>
            </select>
          </div>

          {/* SUMMARY */}
          <div className="summary-card">
            <h3>Order Summary</h3>

            {items.map(item => (
              <div key={item.id} className="summary-item">
                <span>{item.name} × {item.quantity}</span>
                <span>₹ {Number(item.price) * item.quantity}</span>
              </div>
            ))}

            <div className="divider" />

            <div className="summary-item">
              <span>Delivery</span>
              <span>₹ 50</span>
            </div>

            <div className="summary-total">
              <span>Total</span>
              <span>₹ {total}</span>
            </div>
          </div>

          <button className="final-btn" onClick={handleCheckout}>
            Place Order
          </button>

        </div>
      </div>
    </div>
  );
}