"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [code, setCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim()) {
      alert("Please fill all fields");
      return;
    }

    const fullPhone = code + phone;
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/customers/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone: fullPhone,
        }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("customer_id", data.customer_id);
        localStorage.setItem("customer_name", data.name);

        router.push("/shop"); // ✅ Proper navigation
      } else {
        alert("Login failed");
      }
    } catch (err) {
      alert("Server not responding");
    }

    setLoading(false);
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">

        <h1 className="login-brand">FloraAurora</h1>
        <p className="login-tag">Where flowers meet elegance.</p>

        <form className="login-form" onSubmit={handleSubmit}>

          <div className="field">
            <label>Your name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label>Mobile number</label>

            <div className="phone-field">
              <select
                value={code}
                onChange={(e) => setCode(e.target.value)}
              >
                <option value="+91">🇮🇳 +91</option>
                <option value="+971">🇦🇪 +971</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
              </select>

              <input
                type="tel"
                placeholder="9876543210"
                value={phone}
                maxLength={10}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="continue-btn"
            disabled={loading}
          >
            {loading ? "Please wait..." : "Continue"}
          </button>

        </form>

      </div>
    </div>
  );
}