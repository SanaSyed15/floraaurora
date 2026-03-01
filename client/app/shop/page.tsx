"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/* ================= TYPES ================= */

type Flower = {
  id: number;
  name: string;
  price: number;
  description: string;
  image_url: string;
  stock: number;
  is_featured: boolean;
};

type CartItem = {
  id: number;
};

/* ================= PRODUCT CARD ================= */

function ProductCard({
  flower,
  onAddToCart,
  onOpen,
}: {
  flower: Flower;
  onAddToCart: (flower: Flower, qty: number) => void;
  onOpen: (flower: Flower) => void;
}) {
  const [qty, setQty] = useState(1);

  return (
    <div className="product-card">
      <div
        className="product-image"
        onClick={() => onOpen(flower)}
        style={{ cursor: "pointer" }}
      >
        <img src={flower.image_url} alt={flower.name} />

        {flower.is_featured && (
          <span className="badge featured">Featured</span>
        )}

        {flower.stock === 0 && (
          <span className="badge out">Out of Stock</span>
        )}
      </div>

      <div className="product-content">
        <h3>{flower.name}</h3>

        <p className="description">
          {flower.description?.slice(0, 70)}...
        </p>

        {/* Rating */}
        <div className="rating-row">
          <div className="stars">
            {[...Array(4)].map((_, i) => (
              <svg key={i} viewBox="0 0 24 24" className="star">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01z" />
              </svg>
            ))}
          </div>
          <span className="review-count">(124 reviews)</span>
        </div>

        <div className="price">₹ {flower.price}</div>

        {/* Delivery */}
        <div className="delivery-row">
          <svg viewBox="0 0 24 24" className="delivery-icon">
            <path d="M3 3h13v13H3zM16 8h4l1 3v5h-5z" />
          </svg>
          <span>Same Day Delivery</span>
        </div>

        {/* Stock */}
        {flower.stock > 0 && flower.stock <= 5 && (
          <p className="stock-warning">
            Only {flower.stock} left in stock
          </p>
        )}

        {flower.stock > 5 && (
          <p className="stock-ok">In stock</p>
        )}

        {flower.stock === 0 && (
          <p className="stock-out">Out of stock</p>
        )}

        {flower.stock > 0 && (
          <>
            <div className="quantity-row">
              <button onClick={() => setQty(prev => Math.max(1, prev - 1))}>
                -
              </button>
              <span>{qty}</span>
              <button onClick={() => setQty(prev => prev + 1)}>
                +
              </button>
            </div>

            <button
              className="add-btn"
              onClick={() => onAddToCart(flower, qty)}
            >
              Add to Cart
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function ModalContent({
  flower,
  onAddToCart,
}: {
  flower: Flower;
  onAddToCart: (flower: Flower, qty: number) => void;
}) {
  const [qty, setQty] = useState(1);

  return (
    <>
      <div className="modal-left">
        <img src={flower.image_url} alt={flower.name} />
      </div>

      <div className="modal-right">

        <h2>{flower.name}</h2>

        {/* Rating */}
        <div className="rating-row">
          {[...Array(4)].map((_, i) => (
            <svg key={i} viewBox="0 0 24 24" className="star">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01z" />
            </svg>
          ))}
          <span className="review-count">(124 reviews)</span>
        </div>

        <p className="modal-description">
          {flower.description}
        </p>

        <div className="modal-price">
          ₹ {flower.price}
        </div>

        {/* Delivery */}
        <div className="delivery-row">
          <svg viewBox="0 0 24 24" className="delivery-icon">
            <path d="M3 3h13v13H3zM16 8h4l1 3v5h-5z" />
          </svg>
          <span>Same Day Delivery</span>
        </div>

        {/* Stock */}
        {flower.stock > 0 && flower.stock <= 5 && (
          <p className="stock-warning">
            Only {flower.stock} left in stock
          </p>
        )}

        {flower.stock > 5 && (
          <p className="stock-ok">In stock</p>
        )}

        {flower.stock === 0 && (
          <p className="stock-out">Out of stock</p>
        )}

        {/* Quantity */}
        {flower.stock > 0 && (
          <>
            <div className="quantity-row">
              <button
                onClick={() => setQty(prev => Math.max(1, prev - 1))}
              >
                -
              </button>
              <span>{qty}</span>
              <button
                onClick={() => setQty(prev => prev + 1)}
              >
                +
              </button>
            </div>

            <button
              className="add-btn"
              onClick={() => onAddToCart(flower, qty)}
            >
              Add to Cart
            </button>
          </>
        )}
      </div>
    </>
  );
}
/* ================= SHOP PAGE ================= */

export default function ShopPage() {
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const [filtered, setFiltered] = useState<Flower[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [customerName, setCustomerName] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [stockOnly, setStockOnly] = useState(false);
  const [selectedFlower, setSelectedFlower] = useState<Flower | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  /* ================= LOAD DATA ================= */

  useEffect(() => {
    const customer_id = localStorage.getItem("customer_id");
    const name = localStorage.getItem("customer_name");

    if (!customer_id) {
      window.location.href = "/login";
      return;
    }

    if (name) setCustomerName(name);

    const params = new URLSearchParams(window.location.search);
const collection = params.get("collection");

let url = "http://localhost:5001/api/flowers";

if (collection) {
  url += `?collection=${collection}`;
}

fetch(url)
  .then(res => res.json())
  .then(data => {
    setFlowers(data);
  });

    fetch(`http://localhost:5001/api/cart/${customer_id}`)
      .then(res => res.json())
      .then((data: CartItem[]) => setCartCount(data.length));
  }, []);

  /* ================= FILTER ================= */

  useEffect(() => {
    let result = [...flowers];

    if (search) {
      result = result.filter(f =>
        f.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (featuredOnly) {
      result = result.filter(f => f.is_featured);
    }

    if (stockOnly) {
      result = result.filter(f => f.stock > 0);
    }

    if (sort === "low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      result.sort((a, b) => b.price - a.price);
    }

    setFiltered(result);
  }, [search, sort, featuredOnly, stockOnly, flowers]);

  /* ================= ADD TO CART ================= */

  const addToCart = async (flower: Flower, quantity: number) => {
  const customer_id = localStorage.getItem("customer_id");

  try {
    const response = await fetch("http://localhost:5001/api/cart/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer_id,
        flower_id: flower.id,
        quantity
      })
    });

    if (!response.ok) throw new Error("Error");

    setCartCount(prev => prev + quantity);

    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);

  } catch (error) {
    console.error(error);
  }
};

  /* ================= UI ================= */

return (
  <div className="shop-wrapper">

    {/* NAVBAR */}
    <nav className="shop-navbar">

      {/* LEFT */}
      <div className="nav-left">
        <h2 className="brand-logo">FloraAurora</h2>
      </div>

      {/* CENTER LINKS */}
      <div className={`nav-center ${menuOpen ? "open" : ""}`}>
        <Link href="/shop" className="nav-link active">
          Shop
        </Link>

        <Link href="/collections" className="nav-link">
          Collections
        </Link>

        <Link href="/occasions" className="nav-link">
          Occasions
        </Link>
      </div>

      {/* RIGHT SIDE */}
      <div className="nav-right">
        <div className="user-pill">
          Hi, {customerName}
        </div>

        <Link href="/cart" className="cart-btn">
          <svg viewBox="0 0 24 24" className="cart-icon">
            <path d="M7 4h-2l-1 2h2l3.6 7.59-1.35 2.45C7.89 16.37 8.48 17 9.22 17H19v-2H9.42c-.14 0-.25-.11-.25-.25l.03-.12L10.1 13h6.45c.75 0 1.41-.41 1.75-1.03L21 6H7z"/>
          </svg>

          {cartCount > 0 && (
            <span className="cart-count">{cartCount}</span>
          )}
        </Link>

        <button
          className="logout-btn"
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </div>

      {/* MOBILE MENU BUTTON */}
      <button
        className="mobile-menu-btn"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

    </nav>

    {/* TOAST OUTSIDE NAV */}
    {showToast && (
      <div className="floral-toast">
        Added to cart successfully
      </div>
    )}


      {/* HEADER */}
      <div className="shop-header">
        <h1>Our Collections</h1>
        <p>Handcrafted florals designed for life’s special moments</p>
      </div>

      <div className="shop-layout">

        <aside className="shop-sidebar">
          <h3>Filters</h3>

          <input
            type="text"
            placeholder="Search flowers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select onChange={(e) => setSort(e.target.value)}>
            <option value="">Sort by</option>
            <option value="low">Price: Low → High</option>
            <option value="high">Price: High → Low</option>
          </select>

          <label className="filter-checkbox">
            <input
              type="checkbox"
              checked={featuredOnly}
              onChange={() => setFeaturedOnly(!featuredOnly)}
            />
            Featured only
          </label>

          <label className="filter-checkbox">
            <input
              type="checkbox"
              checked={stockOnly}
              onChange={() => setStockOnly(!stockOnly)}
            />
            In stock only
          </label>
        </aside>

        <div className="shop-grid">
          {filtered.map(flower => (
            <ProductCard
              key={flower.id}
              flower={flower}
              onAddToCart={addToCart}
              onOpen={setSelectedFlower}
            />
          ))}
        </div>
      </div>

      {/* MODAL */}
      {selectedFlower && (
  <div
    className="modal-overlay"
    onClick={() => setSelectedFlower(null)}
  >
    <div
      className="modal-content"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="modal-close"
        onClick={() => setSelectedFlower(null)}
      >
        ×
      </button>

      <ModalContent
        flower={selectedFlower}
        onAddToCart={addToCart}
      />
    </div>
  </div>
)}
    </div>
  );
}
