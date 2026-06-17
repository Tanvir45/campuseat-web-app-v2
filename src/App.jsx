import { useState, useEffect } from "react";
import {
  Search, MapPin, Star, Bell, ChevronDown, CheckCircle,
  Eye, EyeOff, Lock, Mail, AlertCircle, Check,
  TrendingUp, ChevronRight, Plus, Minus, X, Clock,
  ShoppingCart, User, ArrowLeft, Home, Package, Phone, Zap
} from "lucide-react";

const LOGO_SRC = "/logo.jpg";
const LOGO_SM = "/logo-icon.png";

// ═══ TOKENS ════════════════════════════════════════════════════════
const C = {
  primary: "#FF6B35", pD: "#E0531F",
  pA: "rgba(255,107,53,0.12)", pA20: "rgba(255,107,53,0.22)",
  dark: "#1A2A3A", bg: "#F7F9FC", white: "#FFFFFF", border: "#E0E6ED",
  textSec: "#64748B", muted: "#A0AEC0",
  green: "#22C55E", greenA: "rgba(34,197,94,0.12)",
  red: "#EF4444", redA: "rgba(239,68,68,0.10)",
};
const P = { fontFamily: "Poppins, sans-serif" };
const I = { fontFamily: "Inter, sans-serif" };
const fl = (d = "row", a = "center", j = "flex-start", g = 0) =>
  ({ display: "flex", flexDirection: d, alignItems: a, justifyContent: j, gap: g });
const sh = (l = 1) =>
  l === 1 ? "0 2px 8px rgba(26,42,58,0.07)" :
    l === 2 ? "0 4px 20px rgba(26,42,58,0.11)" :
      "0 16px 48px rgba(26,42,58,0.16)";
const MAX = { maxWidth: 1280, margin: "0 auto", padding: "0 48px" };

// ═══ DATA ══════════════════════════════════════════════════════════
const RESTAURANTS = [
  { id: 1, name: "Warung Pak Din", cuisine: "Malay Home Cooking", rating: 4.9, reviews: 284, walk: 4, price: "RM 6–12", open: true, until: "9 PM", halal: true, emoji: "🍛", bg: "#D97706", tags: ["Halal", "Budget", "Malay"] },
  { id: 2, name: "Mamak Corner", cuisine: "Indian Muslim · 24 hrs", rating: 4.8, reviews: 412, walk: 6, price: "RM 4–9", open: true, until: "24 hrs", halal: true, emoji: "🫕", bg: "#B91C1C", tags: ["Halal", "Budget", "Coffee", "Indian"] },
  { id: 3, name: "Kafe Murni", cuisine: "Chinese · Kopitiam", rating: 4.7, reviews: 198, walk: 8, price: "RM 3–8", open: true, until: "8:30 PM", halal: false, emoji: "☕", bg: "#1D4ED8", tags: ["Coffee", "Budget", "Chinese"] },
  { id: 4, name: "The Grill House", cuisine: "Western · Burgers", rating: 4.5, reviews: 156, walk: 11, price: "RM 10–18", open: false, until: "Closed", halal: false, emoji: "🍔", bg: "#15803D", tags: ["Fast Food", "Western"] },
  { id: 5, name: "Sushi Yume", cuisine: "Japanese · Sushi", rating: 4.6, reviews: 92, walk: 9, price: "RM 12–25", open: true, until: "8 PM", halal: false, emoji: "🍣", bg: "#7C3AED", tags: ["Healthy", "Japanese"] },
  { id: 6, name: "Ayam Penyet Hub", cuisine: "Indonesian · Fusion", rating: 4.7, reviews: 204, walk: 7, price: "RM 8–14", open: true, until: "10 PM", halal: true, emoji: "🍗", bg: "#D97706", tags: ["Halal", "Indonesian", "Budget"] },
];

const RESTAURANT_MENUS = {
  1: {
    Mains: [
      { id: 101, name: "Nasi Lemak Ayam Berempah", desc: "Fragrant coconut rice with spiced chicken, sambal, boiled egg & crispy anchovies", price: 8.90, popular: true, emoji: "🍛" },
      { id: 102, name: "Mee Goreng Mamak", desc: "Wok-fried yellow noodles with egg, tofu, bean sprouts & fresh lime", price: 6.50, popular: false, emoji: "🍜" },
      { id: 103, name: "Char Kuey Teow", desc: "Flat rice noodles stir-fried with prawns, egg, bean sprouts & dark soy sauce", price: 9.90, popular: true, emoji: "🍝" },
      { id: 104, name: "Nasi Campur", desc: "White rice with 3 fresh side dishes of the day — served daily", price: 7.50, popular: false, emoji: "🍚" },
    ],
    Sides: [
      { id: 105, name: "Roti Canai", desc: "Crispy layered flatbread served with dhal curry dipping sauce", price: 2.50, popular: true, emoji: "🫓" },
      { id: 106, name: "Karipap (3 pcs)", desc: "Golden curry puffs filled with spiced potato and chicken", price: 3.00, popular: false, emoji: "🥟" },
    ],
    Drinks: [
      { id: 107, name: "Teh Tarik", desc: "Classic pulled milk tea — served hot or iced", price: 2.50, popular: true, emoji: "🧋" },
      { id: 108, name: "Milo Ais", desc: "Cold chocolate malt drink — a beloved Malaysian staple", price: 2.80, popular: false, emoji: "🥤" },
      { id: 109, name: "Air Bandung", desc: "Sweet rose-flavoured milk drink served over ice", price: 2.20, popular: false, emoji: "🍹" },
    ],
    Combos: [
      { id: 110, name: "Student Saver Set", desc: "Nasi Lemak + Teh Tarik + Karipap — best campus value meal", price: 12.90, popular: true, emoji: "🎓" },
    ],
  },
  2: {
    Mains: [
      { id: 201, name: "Roti Canai Special", desc: "Fresh crispy flatbread served with rich dhal and chicken curry", price: 3.50, popular: true, emoji: "🫓" },
      { id: 203, name: "Murtabak Daging", desc: "Pan-fried folded bread stuffed with minced beef, eggs, and onions", price: 9.00, popular: true, emoji: "🇲🇾" },
      { id: 204, name: "Maggi Goreng", desc: "Stir-fried instant noodles with veggies, tofu, and egg", price: 5.50, popular: false, emoji: "🍜" },
      { id: 205, name: "Nasi Kandar", desc: "Steamed rice served with choice of curries and side dishes", price: 8.50, popular: true, emoji: "🍛" },
    ],
    Sides: [
      { id: 206, name: "Samosa (3 pcs)", desc: "Deep-fried pastry filled with spiced potatoes and peas", price: 4.50, popular: false, emoji: "🥟" },
      { id: 207, name: "Roti Tisu", desc: "Thin, crispy sweet flatbread shaped like a cone", price: 4.00, popular: false, emoji: "🗼" },
    ],
    Drinks: [
      { id: 202, name: "Teh Tarik Harum", desc: "Aromatic frothy pulled black tea with sweet condensed milk", price: 2.80, popular: true, emoji: "🧋" },
      { id: 208, name: "Limau Ais", desc: "Refreshing iced lime juice", price: 2.00, popular: false, emoji: "🍋" },
    ],
    Combos: [
      { id: 209, name: "Mamak Supper Set", desc: "Maggi Goreng + Teh Tarik Harum — perfect for late night study", price: 7.80, popular: true, emoji: "🦉" },
    ],
  },
  3: {
    Mains: [
      { id: 301, name: "Char Kuey Teow Special", desc: "Stir-fried flat rice noodles with cockles, prawns, Chinese sausage & chives", price: 10.90, popular: true, emoji: "🍝" },
      { id: 303, name: "Nasi Lemak", desc: "Fragrant coconut rice served with sweet-spicy sambal, egg & fried chicken", price: 6.00, popular: true, emoji: "🍛" },
      { id: 304, name: "Chicken Rice", desc: "Steamed chicken served with fragrant seasoned rice and soup", price: 7.50, popular: false, emoji: "🍚" },
    ],
    Sides: [
      { id: 305, name: "Wonton Soup", desc: "Warm clear broth with savory pork/chicken wonton dumplings", price: 5.00, popular: false, emoji: "🥣" },
      { id: 306, name: "Kaya Toast", desc: "Toasted bread with coconut jam and cold butter slices", price: 3.00, popular: true, emoji: "🍞" },
    ],
    Drinks: [
      { id: 302, name: "Kopi O Ais", desc: "Classic Malaysian black coffee served iced and sweetened", price: 2.00, popular: true, emoji: "☕" },
      { id: 307, name: "Cham Ais", desc: "Delicious iced blend of local coffee and tea", price: 2.50, popular: false, emoji: "🥛" },
    ],
    Combos: [
      { id: 308, name: "Kopitiam Breakfast Set", desc: "Kaya Toast + 2 Half-Boiled Eggs + Kopi O Ais", price: 6.50, popular: true, emoji: "🍳" },
    ],
  },
  4: {
    Mains: [
      { id: 401, name: "Classic Cheeseburger", desc: "Flame-grilled beef patty with melted cheddar, lettuce, tomato & house sauce", price: 14.90, popular: true, emoji: "🍔" },
      { id: 403, name: "Grilled Chicken Chop", desc: "Juicy grilled chicken thigh served with black pepper sauce, fries & coleslaw", price: 16.90, popular: true, emoji: "🥩" },
      { id: 404, name: "Fish & Chips", desc: "Crispy battered fish fillets served with golden fries and tartar sauce", price: 15.90, popular: false, emoji: "🐟" },
    ],
    Sides: [
      { id: 402, name: "Chicken Wings (6 pcs)", desc: "Crispy fried chicken wings tossed in BBQ sauce", price: 12.00, popular: true, emoji: "🍗" },
      { id: 405, name: "Onion Rings", desc: "Deep-fried breaded onion rings served with mayo", price: 6.00, popular: false, emoji: "🧅" },
    ],
    Drinks: [
      { id: 406, name: "Iced Lemon Tea", desc: "Chilled brewed black tea with lemon juice and sugar", price: 3.50, popular: false, emoji: "🍹" },
      { id: 407, name: "Vanilla Milkshake", desc: "Creamy vanilla ice cream blended with fresh milk", price: 6.50, popular: false, emoji: "🥤" },
    ],
    Combos: [
      { id: 408, name: "Burger Buddy Combo", desc: "Classic Cheeseburger + Fries + Iced Lemon Tea", price: 19.90, popular: true, emoji: "🥤" },
    ],
  },
  5: {
    Mains: [
      { id: 501, name: "Salmon Maki (8 pcs)", desc: "Fresh salmon rolled with seasoned sushi rice and seaweed nori", price: 18.90, popular: true, emoji: "🍣" },
      { id: 504, name: "Chicken Katsu Curry", desc: "Crispy breaded chicken cutlet with Japanese curry sauce over rice", price: 15.90, popular: true, emoji: "🍛" },
      { id: 505, name: "Tempura Udon", desc: "Thick wheat noodles in hot broth served with crispy shrimp tempura", price: 14.90, popular: false, emoji: "🍜" },
    ],
    Sides: [
      { id: 502, name: "Edamame", desc: "Steamed young soybeans sprinkled with sea salt", price: 5.00, popular: false, emoji: "🌱" },
      { id: 506, name: "Gyoza (5 pcs)", desc: "Pan-fried Japanese dumplings filled with minced chicken and cabbage", price: 9.00, popular: true, emoji: "🥟" },
    ],
    Drinks: [
      { id: 503, name: "Matcha Latte", desc: "Premium Japanese green tea powder whisked with hot or iced milk", price: 8.50, popular: true, emoji: "🍵" },
      { id: 507, name: "Ocha (Green Tea)", desc: "Traditional Japanese hot green tea, unsweetened", price: 2.00, popular: false, emoji: "🍵" },
    ],
    Combos: [
      { id: 508, name: "Sushi Bento Set", desc: "Salmon Maki + Edamame + Gyoza (3 pcs) + Hot Ocha", price: 26.90, popular: true, emoji: "🍱" },
    ],
  },
  6: {
    Mains: [
      { id: 601, name: "Ayam Penyet Special", desc: "Crispy smashed fried chicken served with fiery sambal, tofu, tempeh & cabbage", price: 10.90, popular: true, emoji: "🍗" },
      { id: 602, name: "Nasi Ayam Bakar", desc: "Sweet-savory grilled chicken served with rice, sambal and cucumber slices", price: 11.50, popular: true, emoji: "🍛" },
      { id: 603, name: "Gado-Gado", desc: "Indonesian salad of boiled vegetables, hard-boiled egg, tofu & tempeh in peanut sauce", price: 8.50, popular: false, emoji: "🥗" },
    ],
    Sides: [
      { id: 604, name: "Tempeh & Tahu Goreng", desc: "Fried fermented soybean cakes and tofu served with sweet soy sauce", price: 4.00, popular: false, emoji: "🍢" },
      { id: 605, name: "Bakso Soup", desc: "Savory beef meatball soup with glass noodles and scallions", price: 6.00, popular: false, emoji: "🥣" },
    ],
    Drinks: [
      { id: 606, name: "Soda Gembira", desc: "Fizzy drink made of condensed milk, rose syrup, and club soda", price: 3.50, popular: true, emoji: "🍹" },
      { id: 607, name: "Teh Botol Sosro", desc: "Famous sweet jasmine tea in a bottle, served chilled", price: 3.00, popular: false, emoji: "🧋" },
    ],
    Combos: [
      { id: 608, name: "Penyet Saver Combo", desc: "Ayam Penyet Special + Teh Botol Sosro", price: 13.00, popular: true, emoji: "🎓" },
    ],
  }
};

const ALL_MENU = RESTAURANTS.flatMap(r => {
  const menu = RESTAURANT_MENUS[r.id] || {};
  return Object.entries(menu).flatMap(([cat, items]) =>
    items.map(item => ({
      ...item,
      cat,
      restaurant: r.name,
      restaurantId: r.id,
      walk: r.walk
    }))
  );
});

const SEARCH_ITEMS = ALL_MENU;

const POPULAR = ["Nasi Lemak", "Teh Tarik", "Roti Canai", "Mee Goreng", "Chicken Wings"];

// ═══ GLOBAL STYLES ═══════════════════════════════════════════════
function GlobalStyles() {
  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');
      *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
      body { font-family:'Inter',sans-serif; background:#F7F9FC; }
      .hs { scrollbar-width:none; -ms-overflow-style:none; }
      .hs::-webkit-scrollbar { display:none; }
      .pg { animation:pgIn .22s ease both; }
      @keyframes pgIn { from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none} }
      @keyframes slideUp { from{transform:translateY(100%)}to{transform:translateY(0)} }
      @keyframes blinkDot { 0%,100%{opacity:1}50%{opacity:.2} }
      @keyframes float { 0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)} }
      input::placeholder { color:#A0AEC0; }
      .rest-card { transition:transform .2s ease,box-shadow .2s ease; }
      .rest-card:hover { transform:translateY(-6px); box-shadow:0 20px 48px rgba(26,42,58,.15)!important; }
      .btn-primary { transition:background .15s,transform .1s; }
      .btn-primary:hover { background:#E0531F!important; }
      .btn-primary:active { transform:scale(.98); }
      .nav-link { transition:color .15s; cursor:pointer; }
      .nav-link:hover { color:#FF6B35!important; }
      .result-row { transition:background .12s; cursor:pointer; }
      .result-row:hover { background:#F7F9FC!important; }
      .tab-btn { transition:all .15s; }
      .tab-btn:hover { color:#FF6B35!important; }
      .sidebar-chip { transition:all .15s; cursor:pointer; }
      .sidebar-chip:hover { border-color:#FF6B35!important; color:#FF6B35!important; }
      .menu-row { transition:background .12s; }
      .menu-row:hover { background:#FFFAF8!important; }
      .icon-btn { transition:background .15s; }
      .icon-btn:hover { background:rgba(255,107,53,.18)!important; }
    `;
    document.head.appendChild(el);
    return () => el.remove();
  }, []);
  return null;
}

// ═══ ATOMS ══════════════════════════════════════════════════════
function StarRow({ rating, reviews }) {
  return (
    <div style={{ ...fl("row", "center", "flex-start", 4) }}>
      <Star size={13} color="#FFD700" fill="#FFD700" />
      <span style={{ ...I, fontSize: 13, fontWeight: 600, color: C.dark }}>{rating}</span>
      {reviews && <span style={{ ...I, fontSize: 12, color: C.muted }}>({reviews})</span>}
    </div>
  );
}
function WalkBadge({ min }) {
  return (
    <div style={{ ...fl("row", "center", "center", 4), background: C.pA, borderRadius: 20, padding: "3px 10px", display: "inline-flex" }}>
      <span style={{ fontSize: 12 }}>🚶</span>
      <span style={{ ...I, fontSize: 12, color: C.primary, fontWeight: 600 }}>{min} min</span>
    </div>
  );
}
function HalalBadge() {
  return <div style={{ background: C.greenA, borderRadius: 20, padding: "3px 8px", display: "inline-flex" }}><span style={{ ...I, fontSize: 11, color: C.green, fontWeight: 700 }}>✦ Halal</span></div>;
}
function OBtn({ label, onClick, full, sm, outline, style: ex = {} }) {
  return (
    <button className="btn-primary" onClick={onClick} style={{
      background: outline ? "transparent" : C.primary, color: outline ? C.dark : "#fff",
      border: outline ? `1.5px solid ${C.dark}` : "none",
      borderRadius: 12, height: sm ? 40 : 48, padding: "0 28px",
      fontSize: sm ? 13 : 15, fontWeight: 600, cursor: "pointer", ...I,
      width: full ? "100%" : "auto", ...ex,
    }}>{label}</button>
  );
}
function FieldBlock({ label, error, children }) {
  return (
    <div style={{ marginBottom: 18 }}>
      {label && <label style={{ ...I, display: "block", fontSize: 13, fontWeight: 500, color: C.textSec, marginBottom: 7 }}>{label}</label>}
      {children}
      {error && <div style={{ ...fl("row", "center", "flex-start", 4), marginTop: 5 }}>
        <AlertCircle size={13} color={C.red} /><span style={{ ...I, fontSize: 12, color: C.red }}>{error}</span>
      </div>}
    </div>
  );
}
function InputField({ icon, value, onChange, placeholder, type = "text", error = false, right = null }) {
  const filled = value && value.length > 0;
  return (
    <div style={{
      background: C.white, borderRadius: 12, border: `1.5px solid ${error ? C.red : filled ? C.primary : C.border}`,
      ...fl("row", "center", "flex-start", 10), padding: "0 16px", height: 52,
      boxShadow: error ? `0 0 0 3px ${C.redA}` : filled ? `0 0 0 3px ${C.pA}` : "none", transition: "all .2s"
    }}>
      {icon && <div style={{ flexShrink: 0, lineHeight: 0 }}>{icon}</div>}
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        style={{ border: "none", outline: "none", fontSize: 14, color: C.dark, flex: 1, ...I, background: "transparent" }} />
      {right}
    </div>
  );
}
function PasswordStrength({ pw }) {
  if (!pw) return null;
  const u = pw.split("").some(c => c >= "A" && c <= "Z");
  const n = pw.split("").some(c => c >= "0" && c <= "9");
  const s = pw.split("").some(c => !((c >= "A" && c <= "Z") || (c >= "a" && c <= "z") || (c >= "0" && c <= "9")));
  const lvl = pw.length < 6 ? 1 : pw.length < 8 ? 2 : u && n && s ? 4 : (u || n || s) ? 3 : 2;
  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  const colors = ["", C.red, "#D97706", "#0891B2", C.green];
  return (
    <div style={{ ...fl("row", "center", "flex-start", 6), marginTop: 8 }}>
      {[1, 2, 3, 4].map(l => <div key={l} style={{ flex: 1, height: 3, borderRadius: 2, background: l <= lvl ? colors[lvl] : C.border, transition: "background .3s" }} />)}
      <span style={{ ...I, fontSize: 11, fontWeight: 600, color: colors[lvl], whiteSpace: "nowrap", minWidth: 36 }}>{labels[lvl]}</span>
    </div>
  );
}

// ═══ NAVBAR ═════════════════════════════════════════════════════
function Navbar({ page, go, goToRestaurant, loggedIn, cartCount, activeOrder, setProfileTab, profileTab }) {
  return (
    <nav style={{
      height: 68, background: C.white, borderBottom: `1px solid ${C.border}`,
      position: "sticky", top: 0, zIndex: 100, ...fl("row", "center", "space-between"),
      padding: "0 48px", boxShadow: "0 1px 0 #E0E6ED"
    }}>

      {/* Brand */}
      <div onClick={() => go("landing")} style={{ ...fl("row", "center", "flex-start", 10), cursor: "pointer" }}>
        <img src={LOGO_SM} alt="CampusEat" style={{ width: 44, height: 44, objectFit: "contain", borderRadius: 10 }} />
        <span style={{ ...P, fontWeight: 800, fontSize: 21, color: C.dark, letterSpacing: -.5 }}>
          Campus<span style={{ color: C.primary }}>Eat</span>
        </span>
      </div>

      {/* Nav links */}
      <div style={{ ...fl("row", "center", "center", 36) }}>
        {loggedIn ? (
          <>
            <span className="nav-link" onClick={() => go("home")}
              style={{
                ...I, fontSize: 14, fontWeight: page === "home" ? 600 : 400, color: page === "home" ? C.primary : C.textSec,
                borderBottom: page === "home" ? `2px solid ${C.primary}` : "2px solid transparent", paddingBottom: 2
              }}>
              Browse
            </span>
            <span className="nav-link" onClick={() => go("search")}
              style={{
                ...I, fontSize: 14, fontWeight: page === "search" ? 600 : 400, color: page === "search" ? C.primary : C.textSec,
                borderBottom: page === "search" ? `2px solid ${C.primary}` : "2px solid transparent", paddingBottom: 2
              }}>
              Search
            </span>
            <span className="nav-link" onClick={() => {
              if (activeOrder) {
                go("tracking");
              } else {
                if (setProfileTab) setProfileTab("orders");
                go("profile");
              }
            }}
              style={{
                ...I, fontSize: 14, fontWeight: (page === "tracking" || (page === "profile" && profileTab === "orders")) ? 600 : 400, color: (page === "tracking" || (page === "profile" && profileTab === "orders")) ? C.primary : C.textSec,
                borderBottom: (page === "tracking" || (page === "profile" && profileTab === "orders")) ? `2px solid ${C.primary}` : "2px solid transparent", paddingBottom: 2
              }}>
              My Orders
            </span>
            <span className="nav-link" onClick={() => {
              if (setProfileTab) setProfileTab("overview");
              go("profile");
            }}
              style={{
                ...I, fontSize: 14, fontWeight: (page === "profile" && profileTab !== "orders") ? 600 : 400, color: (page === "profile" && profileTab !== "orders") ? C.primary : C.textSec,
                borderBottom: (page === "profile" && profileTab !== "orders") ? `2px solid ${C.primary}` : "2px solid transparent", paddingBottom: 2
              }}>
              Profile
            </span>
          </>
        ) : (
          <>
            <span className="nav-link" onClick={() => go("landing")} style={{ ...I, fontSize: 14, fontWeight: 400, color: C.textSec }}>Home</span>
            <span className="nav-link" onClick={() => go("home")} style={{ ...I, fontSize: 14, fontWeight: 400, color: C.textSec }}>Browse</span>
            <span className="nav-link" style={{ ...I, fontSize: 14, fontWeight: 400, color: C.textSec }}>How it Works</span>
          </>
        )}
      </div>

      {/* Right actions */}
      {loggedIn ? (
        <div style={{ ...fl("row", "center", "center", 16) }}>
          <button className="icon-btn" onClick={() => goToRestaurant()} style={{ position: "relative", background: C.pA, border: "none", borderRadius: 11, width: 44, height: 44, cursor: "pointer", ...fl("row", "center", "center") }}>
            <ShoppingCart size={20} color={C.primary} />
            {cartCount > 0 && <div style={{ position: "absolute", top: -4, right: -4, background: C.primary, borderRadius: "50%", width: 19, height: 19, ...fl("row", "center", "center") }}>
              <span style={{ ...I, fontSize: 10, fontWeight: 700, color: "#fff" }}>{cartCount}</span>
            </div>}
          </button>
          <div style={{ width: 1, height: 32, background: C.border }} />
          <div onClick={() => { if (setProfileTab) setProfileTab("overview"); go("profile"); }} style={{ ...fl("row", "center", "flex-start", 8), cursor: "pointer" }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: C.primary, ...fl("row", "center", "center") }}>
              <span style={{ fontSize: 18 }}>👤</span>
            </div>
            <span style={{ ...I, fontSize: 14, fontWeight: 500, color: C.dark }}>Farid</span>
            <ChevronDown size={15} color={C.muted} />
          </div>
        </div>
      ) : (
        <div style={{ ...fl("row", "center", "center", 12) }}>
          <button onClick={() => go("login")} style={{ background: "none", border: "none", cursor: "pointer", ...I, fontSize: 14, fontWeight: 600, color: C.dark, padding: "8px 16px" }}>Sign In</button>
          <button className="btn-primary" onClick={() => go("register")} style={{ background: C.primary, color: "#fff", border: "none", borderRadius: 10, padding: "10px 22px", ...I, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
            Get Started →
          </button>
        </div>
      )}
    </nav>
  );
}

// ═══ LANDING PAGE ════════════════════════════════════════════
function LandingPage({ go, goToRestaurant }) {
  const [loc, setLoc] = useState("");

  return (
    <div className="pg">
      {/* ── Hero ─────────────────────────────────────────── */}
      <section style={{ background: `linear-gradient(135deg, ${C.dark} 0%, #253C55 100%)`, padding: "96px 0 80px" }}>
        <div style={{ ...MAX, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          {/* Left text */}
          <div>
            <div style={{ background: "rgba(255,107,53,.18)", borderRadius: 20, padding: "6px 16px", display: "inline-flex", marginBottom: 20 }}>
              <span style={{ ...I, fontSize: 13, color: C.primary, fontWeight: 600 }}>🎓 INTI International University</span>
            </div>
            <h1 style={{ ...P, fontWeight: 800, fontSize: 56, color: "#fff", lineHeight: 1.12, marginBottom: 20 }}>
              Your Campus<br />
              <span style={{ color: C.primary }}>Favorites</span>,<br />
              Delivered Fast.
            </h1>
            <p style={{ ...I, fontSize: 18, color: "rgba(255,255,255,.68)", lineHeight: 1.7, marginBottom: 36, maxWidth: 480 }}>
              Student-powered food delivery from campus canteens to your lecture hall. No gate passes. No hassle. Real-time tracking.
            </p>

            {/* Search bar */}
            <div style={{ background: "#fff", borderRadius: 16, ...fl("row", "center", "space-between"), padding: "8px 8px 8px 20px", boxShadow: "0 12px 36px rgba(0,0,0,.25)", marginBottom: 16 }}>
              <div style={{ ...fl("row", "center", "flex-start", 10), flex: 1 }}>
                <MapPin size={18} color={C.muted} />
                <input value={loc} onChange={e => setLoc(e.target.value)} placeholder="Enter campus building (e.g. Block A, Library, Lab 3)"
                  style={{ border: "none", outline: "none", fontSize: 15, color: C.dark, flex: 1, ...I, background: "transparent" }} />
              </div>
              <button className="btn-primary" onClick={() => go("home")}
                style={{ background: C.primary, color: "#fff", border: "none", borderRadius: 10, padding: "12px 24px", ...I, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
                Find Food →
              </button>
            </div>

            {/* Quick chips */}
            <div style={{ ...fl("row", "center", "flex-start", 8) }}>
              {["📍 Block A", "📚 Library", "🔬 Eng Lab", "🏠 Hostel B"].map(l => (
                <button key={l} onClick={() => go("home")} style={{ background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.2)", borderRadius: 20, padding: "6px 14px", ...I, fontSize: 13, color: "#fff", cursor: "pointer" }}>{l}</button>
              ))}
            </div>

            {/* Stats */}
            <div style={{ ...fl("row", "center", "flex-start", 40), marginTop: 36, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,.12)" }}>
              {[["500+", "Menu items"], ["20+", "Restaurants"], ["2,000+", "Students served"]].map(([n, l]) => (
                <div key={l}>
                  <div style={{ ...P, fontWeight: 800, fontSize: 28, color: "#fff" }}>{n}</div>
                  <div style={{ ...I, fontSize: 13, color: "rgba(255,255,255,.6)", marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: floating illustration */}
          <div style={{ position: "relative", height: 480, ...fl("row", "center", "center") }}>
            <div style={{ position: "absolute", width: 360, height: 360, borderRadius: "50%", background: "rgba(255,107,53,.12)", filter: "blur(50px)" }} />

            {/* Floating card 1 */}
            <div style={{ position: "absolute", top: 30, left: 0, transform: "rotate(-4deg)", background: "#fff", borderRadius: 20, padding: "16px 18px", boxShadow: "0 20px 48px rgba(0,0,0,.22)", width: 240, animation: "float 4s ease-in-out infinite" }}>
              <div style={{ ...fl("row", "center", "flex-start", 12) }}>
                <div style={{ width: 48, height: 48, background: "#D97706", borderRadius: 12, ...fl("row", "center", "center") }}><span style={{ fontSize: 26 }}>🍛</span></div>
                <div>
                  <div style={{ ...P, fontWeight: 700, fontSize: 14, color: C.dark }}>Warung Pak Din</div>
                  <div style={{ ...fl("row", "center", "flex-start", 6), marginTop: 3 }}>
                    <Star size={11} color="#FFD700" fill="#FFD700" />
                    <span style={{ ...I, fontSize: 12, color: C.textSec }}>4.9 · 4 min walk</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating card 2 */}
            <div style={{ position: "absolute", top: 160, right: -20, transform: "rotate(3deg)", background: "#fff", borderRadius: 20, padding: "16px 18px", boxShadow: "0 20px 48px rgba(0,0,0,.22)", width: 230, animation: "float 5s ease-in-out infinite .8s" }}>
              <div style={{ ...fl("row", "center", "flex-start", 12) }}>
                <div style={{ width: 48, height: 48, background: "#B91C1C", borderRadius: 12, ...fl("row", "center", "center") }}><span style={{ fontSize: 26 }}>🫕</span></div>
                <div>
                  <div style={{ ...P, fontWeight: 700, fontSize: 14, color: C.dark }}>Mamak Corner</div>
                  <div style={{ ...fl("row", "center", "flex-start", 6), marginTop: 3 }}>
                    <span style={{ background: C.greenA, borderRadius: 20, padding: "1px 7px", ...I, fontSize: 11, color: C.green, fontWeight: 600 }}>✦ Halal · 24 hrs</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order status card */}
            <div style={{ position: "absolute", bottom: 40, left: 20, transform: "rotate(-2deg)", background: "#fff", borderRadius: 20, padding: "16px 18px", boxShadow: "0 20px 48px rgba(0,0,0,.22)", width: 260, animation: "float 4.5s ease-in-out infinite .4s" }}>
              <div style={{ ...fl("row", "center", "space-between"), marginBottom: 10 }}>
                <span style={{ ...I, fontSize: 12, fontWeight: 600, color: C.textSec }}>🛵 On the way!</span>
                <span style={{ ...I, fontSize: 12, color: C.primary, fontWeight: 700 }}>4 min</span>
              </div>
              <div style={{ height: 4, background: C.border, borderRadius: 2, overflow: "hidden" }}>
                <div style={{ width: "75%", height: "100%", background: C.primary, borderRadius: 2 }} />
              </div>
              <div style={{ ...I, fontSize: 11, color: C.muted, marginTop: 6 }}>Ali · Block B, Eng Lab 3</div>
            </div>

            {/* Stat badges */}
            <div style={{ position: "absolute", top: 60, right: 30, background: C.primary, borderRadius: 16, padding: "14px 18px", boxShadow: "0 8px 24px rgba(255,107,53,.45)", textAlign: "center" }}>
              <div style={{ ...P, fontWeight: 800, fontSize: 22, color: "#fff" }}>4.9⭐</div>
              <div style={{ ...I, fontSize: 11, color: "rgba(255,255,255,.8)", marginTop: 2 }}>Avg. Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it Works ──────────────────────────────────── */}
      <section style={{ padding: "80px 0", background: C.white }}>
        <div style={{ ...MAX }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <h2 style={{ ...P, fontWeight: 800, fontSize: 36, color: C.dark, marginBottom: 12 }}>How CampusEat Works</h2>
            <p style={{ ...I, fontSize: 16, color: C.textSec, maxWidth: 500, margin: "0 auto" }}>Order your favourite campus food in 4 simple steps</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24, position: "relative" }}>
            {[
              { step: "01", icon: "📍", title: "Set Your Location", desc: "Enter your campus building or lecture hall to get started" },
              { step: "02", icon: "🏪", title: "Browse Restaurants", desc: "Discover nearby open restaurants with real-time availability" },
              { step: "03", icon: "🛒", title: "Add & Order", desc: "Build your cart and place your order in seconds" },
              { step: "04", icon: "🛵", title: "Track & Enjoy", desc: "A fellow student delivers right to your seat" },
            ].map((s, i) => (
              <div key={s.step} style={{ textAlign: "center", padding: "32px 24px", background: C.bg, borderRadius: 20 }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: i === 3 ? C.primary : C.pA, ...fl("row", "center", "center"), margin: "0 auto 16px" }}>
                  <span style={{ fontSize: 28 }}>{s.icon}</span>
                </div>
                <div style={{ ...P, fontWeight: 700, fontSize: 11, color: C.primary, letterSpacing: 1, marginBottom: 8 }}>STEP {s.step}</div>
                <div style={{ ...P, fontWeight: 700, fontSize: 16, color: C.dark, marginBottom: 8 }}>{s.title}</div>
                <div style={{ ...I, fontSize: 14, color: C.textSec, lineHeight: 1.6 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────── */}
      <section style={{ padding: "80px 0", background: C.bg }}>
        <div style={{ ...MAX }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <h2 style={{ ...P, fontWeight: 800, fontSize: 36, color: C.dark, marginBottom: 12 }}>Why Students Choose Us</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {[
              { icon: "🚪", title: "No Gate Hassles", desc: "Campus-only delivery routes — no external vehicle entry permits required" },
              { icon: "🎓", title: "Student Couriers", desc: "Fellow students deliver your food, building real campus community" },
              { icon: "💚", title: "Zero Hidden Fees", desc: "The price you see is exactly what you pay. No surprise charges" },
              { icon: "⚡", title: "20-Minute Delivery", desc: "Average delivery under 20 minutes thanks to our campus proximity" },
              { icon: "📍", title: "Micro-Location Drop", desc: "Drop off to your exact seat in lecture hall, library or hostel room" },
              { icon: "🔍", title: "Real-Time Tracking", desc: "Live campus map tracking shows exactly where your driver is" },
            ].map(f => (
              <div key={f.title} style={{ background: C.white, borderRadius: 20, padding: "28px", boxShadow: sh(1) }}>
                <div style={{ fontSize: 36, marginBottom: 16 }}>{f.icon}</div>
                <div style={{ ...P, fontWeight: 700, fontSize: 17, color: C.dark, marginBottom: 8 }}>{f.title}</div>
                <div style={{ ...I, fontSize: 14, color: C.textSec, lineHeight: 1.65 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Restaurant Preview ────────────────────────────── */}
      <section style={{ padding: "80px 0", background: C.white }}>
        <div style={{ ...MAX }}>
          <div style={{ ...fl("row", "center", "space-between"), marginBottom: 40 }}>
            <div>
              <h2 style={{ ...P, fontWeight: 800, fontSize: 36, color: C.dark, marginBottom: 8 }}>Popular on Campus</h2>
              <p style={{ ...I, fontSize: 16, color: C.textSec }}>Loved by thousands of students</p>
            </div>
            <button onClick={() => go("home")} style={{ background: "none", border: `1.5px solid ${C.primary}`, borderRadius: 10, padding: "10px 22px", ...I, fontSize: 14, fontWeight: 600, color: C.primary, cursor: "pointer" }}>
              View All Restaurants →
            </button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {RESTAURANTS.slice(0, 3).map(r => (
              <div key={r.id} className="rest-card" onClick={() => goToRestaurant(r.id)}
                style={{ background: C.white, borderRadius: 20, overflow: "hidden", cursor: "pointer", boxShadow: sh(2) }}>
                <div style={{ height: 160, background: r.bg, ...fl("row", "center", "center"), position: "relative" }}>
                  <span style={{ fontSize: 72 }}>{r.emoji}</span>
                  {r.open && <div style={{ position: "absolute", top: 12, right: 12, background: C.green, borderRadius: 20, padding: "4px 10px" }}>
                    <span style={{ ...I, fontSize: 11, color: "#fff", fontWeight: 600 }}>Open</span>
                  </div>}
                </div>
                <div style={{ padding: "20px 22px 22px" }}>
                  <div style={{ ...fl("row", "center", "space-between"), marginBottom: 6 }}>
                    <div style={{ ...P, fontWeight: 700, fontSize: 17, color: C.dark }}>{r.name}</div>
                    {r.halal && <HalalBadge />}
                  </div>
                  <div style={{ ...I, fontSize: 13, color: C.textSec, marginBottom: 14 }}>{r.cuisine}</div>
                  <div style={{ ...fl("row", "center", "flex-start", 12) }}>
                    <StarRow rating={r.rating} reviews={r.reviews} />
                    <WalkBadge min={r.walk} />
                    <span style={{ ...I, fontSize: 13, color: C.textSec }}>{r.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section style={{ padding: "80px 0", background: `linear-gradient(135deg,${C.dark},#253C55)` }}>
        <div style={{ ...MAX, textAlign: "center" }}>
          <img src={LOGO_SRC} alt="CampusEat" style={{ width: 72, height: 72, objectFit: "cover", borderRadius: 18, marginBottom: 16 }} />
          <h2 style={{ ...P, fontWeight: 800, fontSize: 40, color: "#fff", marginBottom: 14 }}>Ready to order?</h2>
          <p style={{ ...I, fontSize: 17, color: "rgba(255,255,255,.68)", marginBottom: 36 }}>Join 2,000+ students already eating smarter on campus.</p>
          <div style={{ ...fl("row", "center", "center", 14) }}>
            <button className="btn-primary" onClick={() => go("register")} style={{ background: C.primary, color: "#fff", border: "none", borderRadius: 12, padding: "14px 32px", ...I, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
              Create Free Account
            </button>
            <button onClick={() => go("home")} style={{ background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.25)", borderRadius: 12, padding: "14px 28px", ...I, fontSize: 15, fontWeight: 600, color: "#fff", cursor: "pointer" }}>
              Browse Restaurants
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: C.dark, padding: "28px 48px", ...fl("row", "center", "space-between") }}>
        <div style={{ ...fl("row", "center", "flex-start", 10) }}>
          <img src={LOGO_SM} alt="" style={{ width: 32, height: 32, objectFit: "contain", borderRadius: 8 }} />
          <span style={{ ...P, fontWeight: 700, fontSize: 16, color: "#fff" }}>Campus<span style={{ color: C.primary }}>Eat</span></span>
        </div>
        <span style={{ ...I, fontSize: 13, color: "rgba(255,255,255,.4)" }}>© 2026 CampusEat · INTI International University · GoGlobal Innovators Challenge</span>
      </footer>
    </div>
  );
}

// ═══ LOGIN PAGE ══════════════════════════════════════════════
function LoginPage({ go, onLogin }) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const DEMO = { email: "farid@intimal.edu.my", pw: "Password123#" };

  const login = () => {
    const e = {};
    if (!email) e.email = "Email is required";
    else if (!email.includes("@")) e.email = "Enter a valid email address";
    if (!pw) e.pw = "Password is required";
    setErrors(e);
    if (Object.keys(e).length) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (email === DEMO.email && pw === DEMO.pw) onLogin();
      else setErrors({ general: "Incorrect email or password. Try the demo credentials below." });
    }, 1200);
  };

  return (
    <div className="pg" style={{ minHeight: "calc(100vh - 68px)", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
      {/* Left: Branding */}
      <div style={{ background: `linear-gradient(135deg,${C.dark},#253C55)`, padding: "80px 64px", ...fl("column", "flex-start", "center") }}>
        <img src={LOGO_SRC} alt="CampusEat" style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 18, marginBottom: 24 }} />
        <h1 style={{ ...P, fontWeight: 800, fontSize: 36, color: "#fff", lineHeight: 1.2, marginBottom: 16 }}>
          Welcome back<br />to <span style={{ color: C.primary }}>CampusEat</span>
        </h1>
        <p style={{ ...I, fontSize: 16, color: "rgba(255,255,255,.65)", lineHeight: 1.7, marginBottom: 48, maxWidth: 360 }}>
          Sign in to browse campus restaurants, track your orders, and manage your profile.
        </p>
        {[
          { icon: "🚪", text: "No gate hassles — campus-only routes" },
          { icon: "⚡", text: "Average 20-minute delivery time" },
          { icon: "🎓", text: "Delivered by fellow students" },
        ].map(f => (
          <div key={f.text} style={{ ...fl("row", "center", "flex-start", 12), marginBottom: 16 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(255,107,53,.2)", ...fl("row", "center", "center"), flexShrink: 0 }}>
              <span style={{ fontSize: 18 }}>{f.icon}</span>
            </div>
            <span style={{ ...I, fontSize: 14, color: "rgba(255,255,255,.8)" }}>{f.text}</span>
          </div>
        ))}
      </div>

      {/* Right: Form */}
      <div style={{ background: C.bg, ...fl("column", "center", "center"), padding: "80px 64px" }}>
        <div style={{ width: "100%", maxWidth: 420 }}>
          <div style={{ marginBottom: 36 }}>
            <h2 style={{ ...P, fontWeight: 800, fontSize: 28, color: C.dark, marginBottom: 6 }}>Sign In</h2>
            <p style={{ ...I, fontSize: 14, color: C.textSec }}>
              Don't have an account?{" "}
              <span onClick={() => go("register")} style={{ color: C.primary, fontWeight: 600, cursor: "pointer" }}>Create one</span>
            </p>
          </div>

          {errors.general && (
            <div style={{ background: C.redA, border: `1px solid rgba(239,68,68,.2)`, borderRadius: 12, padding: "12px 16px", ...fl("row", "flex-start", "flex-start", 8), marginBottom: 20 }}>
              <AlertCircle size={16} color={C.red} style={{ flexShrink: 0, marginTop: 1 }} />
              <span style={{ ...I, fontSize: 13, color: C.red, lineHeight: 1.55 }}>{errors.general}</span>
            </div>
          )}

          <FieldBlock label="University Email" error={errors.email}>
            <InputField icon={<Mail size={16} color={errors.email ? C.red : C.muted} />}
              value={email} onChange={setEmail} placeholder="yourname@intimal.edu.my" error={!!errors.email} />
          </FieldBlock>

          <FieldBlock label="Password" error={errors.pw}>
            <InputField icon={<Lock size={16} color={errors.pw ? C.red : C.muted} />}
              value={pw} onChange={setPw} placeholder="Enter your password"
              type={showPw ? "text" : "password"} error={!!errors.pw}
              right={
                <button onClick={() => setShowPw(v => !v)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, lineHeight: 0 }}>
                  {showPw ? <EyeOff size={16} color={C.muted} /> : <Eye size={16} color={C.muted} />}
                </button>
              } />
          </FieldBlock>

          <div style={{ ...fl("row", "center", "space-between"), marginBottom: 24, marginTop: -8 }}>
            <label style={{ ...fl("row", "center", "flex-start", 8), cursor: "pointer" }}>
              <div style={{ width: 16, height: 16, borderRadius: 4, background: C.pA, border: `1.5px solid ${C.primary}`, ...fl("row", "center", "center") }}>
                <Check size={9} color={C.primary} />
              </div>
              <span style={{ ...I, fontSize: 13, color: C.textSec }}>Remember me</span>
            </label>
            <span style={{ ...I, fontSize: 13, color: C.primary, fontWeight: 600, cursor: "pointer" }}>Forgot password?</span>
          </div>

          <button className="btn-primary" onClick={login} disabled={loading}
            style={{ width: "100%", height: 52, border: "none", borderRadius: 12, background: loading ? "rgba(255,107,53,.65)" : C.primary, color: "#fff", fontSize: 15, fontWeight: 700, ...P, cursor: loading ? "default" : "pointer" }}>
            {loading ? "Signing in…" : "Sign In"}
          </button>

          {/* Demo credentials */}
          <div onClick={() => { setEmail(DEMO.email); setPw(DEMO.pw); setErrors({}); }}
            style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: "14px 16px", marginTop: 16, cursor: "pointer" }}>
            <div style={{ ...I, fontSize: 12, fontWeight: 600, color: C.textSec, marginBottom: 6 }}>🧪 Demo Credentials — click to fill</div>
            <div style={{ ...I, fontSize: 12, color: C.dark }}>Email: <strong>farid@intimal.edu.my</strong></div>
            <div style={{ ...I, fontSize: 12, color: C.dark, marginTop: 2 }}>Password: <strong>Password123#</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══ REGISTER PAGE ═══════════════════════════════════════════
function RegisterPage({ go, onLogin }) {
  const [step, setStep] = useState(1);
  const [showPw, setShowPw] = useState(false);
  const [d, setD] = useState({ email: "", pw: "", cpw: "", name: "", sid: "", faculty: "", campus: "INTI International University", role: "student" });
  const [err, setErr] = useState({});

  const set = (k, v) => { setD(p => ({ ...p, [k]: v })); setErr(e => ({ ...e, [k]: "" })); };

  const v1 = () => {
    const e = {};
    if (!d.email) e.email = "Email is required";
    else if (!d.email.includes("@") || !d.email.includes(".edu.my")) e.email = "Must be a university email ending in .edu.my";
    if (!d.pw) e.pw = "Password is required";
    else if (d.pw.length < 8) e.pw = "Minimum 8 characters required";
    if (!d.cpw) e.cpw = "Please confirm your password";
    else if (d.pw !== d.cpw) e.cpw = "Passwords do not match";
    setErr(e); return !Object.keys(e).length;
  };
  const v2 = () => {
    const e = {};
    if (!d.name.trim()) e.name = "Full name is required";
    if (!d.sid.trim()) e.sid = "Student ID is required";
    setErr(e); return !Object.keys(e).length;
  };

  return (
    <div className="pg" style={{ minHeight: "calc(100vh - 68px)", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
      {/* Left */}
      <div style={{ background: `linear-gradient(135deg,${C.dark},#253C55)`, padding: "80px 64px", ...fl("column", "flex-start", "center") }}>
        <img src={LOGO_SRC} alt="CampusEat" style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 18, marginBottom: 24 }} />
        <h1 style={{ ...P, fontWeight: 800, fontSize: 36, color: "#fff", lineHeight: 1.2, marginBottom: 16 }}>
          Join <span style={{ color: C.primary }}>CampusEat</span><br />today
        </h1>
        <p style={{ ...I, fontSize: 16, color: "rgba(255,255,255,.65)", lineHeight: 1.7, marginBottom: 40, maxWidth: 360 }}>
          Create your free account in under 2 minutes. Use your university email to get verified campus access.
        </p>

        {/* Progress pills */}
        {[{ n: 1, l: "Account" }, { n: 2, l: "Details" }, { n: 3, l: "Campus & Role" }].map(s => (
          <div key={s.n} style={{ ...fl("row", "center", "flex-start", 14), marginBottom: 14, opacity: step >= s.n ? 1 : .45 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: step >= s.n ? C.primary : "rgba(255,255,255,.15)", ...fl("row", "center", "center"), flexShrink: 0, border: step >= s.n ? "none" : "1px solid rgba(255,255,255,.25)" }}>
              {step > s.n ? <Check size={16} color="#fff" /> : <span style={{ ...I, fontWeight: 700, fontSize: 14, color: "#fff" }}>{s.n}</span>}
            </div>
            <span style={{ ...I, fontSize: 14, fontWeight: step === s.n ? 600 : 400, color: "#fff" }}>{s.l}</span>
          </div>
        ))}
      </div>

      {/* Right: Steps */}
      <div style={{ background: C.bg, ...fl("column", "center", "center"), padding: "60px 64px" }}>
        <div style={{ width: "100%", maxWidth: 440 }}>
          <div style={{ marginBottom: 32 }}>
            <p style={{ ...I, fontSize: 14, color: C.textSec }}>
              Already have an account?{" "}
              <span onClick={() => go("login")} style={{ color: C.primary, fontWeight: 600, cursor: "pointer" }}>Sign in</span>
            </p>
          </div>

          {step === 1 && (
            <div>
              <h2 style={{ ...P, fontWeight: 800, fontSize: 26, color: C.dark, marginBottom: 6 }}>Create your account</h2>
              <p style={{ ...I, fontSize: 14, color: C.textSec, marginBottom: 28 }}>Use your university email to get started.</p>
              <FieldBlock label="University Email" error={err.email}>
                <InputField icon={<Mail size={16} color={err.email ? C.red : C.muted} />} value={d.email} onChange={v => set("email", v)} placeholder="yourname@intimal.edu.my" error={!!err.email} />
              </FieldBlock>
              <FieldBlock label="Password" error={err.pw}>
                <InputField icon={<Lock size={16} color={err.pw ? C.red : C.muted} />} value={d.pw} onChange={v => set("pw", v)} placeholder="Min. 8 characters" type={showPw ? "text" : "password"} error={!!err.pw}
                  right={<button onClick={() => setShowPw(v => !v)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, lineHeight: 0 }}>{showPw ? <EyeOff size={16} color={C.muted} /> : <Eye size={16} color={C.muted} />}</button>} />
                <PasswordStrength pw={d.pw} />
              </FieldBlock>
              <FieldBlock label="Confirm Password" error={err.cpw}>
                <InputField icon={<Lock size={16} color={err.cpw ? C.red : C.muted} />} value={d.cpw} onChange={v => set("cpw", v)} placeholder="Re-enter your password" type="password" error={!!err.cpw} />
              </FieldBlock>
              <button className="btn-primary" onClick={() => { if (v1()) setStep(2); }} style={{ width: "100%", height: 52, border: "none", borderRadius: 12, background: C.primary, color: "#fff", fontSize: 15, fontWeight: 700, ...P, cursor: "pointer" }}>Continue</button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 style={{ ...P, fontWeight: 800, fontSize: 26, color: C.dark, marginBottom: 6 }}>Tell us about yourself</h2>
              <p style={{ ...I, fontSize: 14, color: C.textSec, marginBottom: 28 }}>Your details verify your campus membership.</p>
              <FieldBlock label="Full Name" error={err.name}>
                <InputField icon={<User size={16} color={err.name ? C.red : C.muted} />} value={d.name} onChange={v => set("name", v)} placeholder="e.g. Muhammad Farid" error={!!err.name} />
              </FieldBlock>
              <FieldBlock label="Student ID" error={err.sid}>
                <InputField icon={<span style={{ fontSize: 16, lineHeight: 0 }}>🪪</span>} value={d.sid} onChange={v => set("sid", v)} placeholder="e.g. I-220403-F" error={!!err.sid} />
              </FieldBlock>
              <FieldBlock label="Programme / Faculty (optional)">
                <InputField icon={<span style={{ fontSize: 16, lineHeight: 0 }}>📚</span>} value={d.faculty} onChange={v => set("faculty", v)} placeholder="e.g. BSc Computer Science" />
              </FieldBlock>
              <div style={{ ...fl("row", "center", "flex-start", 12) }}>
                <button onClick={() => { setStep(1); setErr({}); }} style={{ background: "transparent", border: `1.5px solid ${C.border}`, borderRadius: 12, height: 48, padding: "0 22px", ...I, fontSize: 14, fontWeight: 600, cursor: "pointer", color: C.dark }}>← Back</button>
                <button className="btn-primary" onClick={() => { if (v2()) setStep(3); }} style={{ flex: 1, height: 48, border: "none", borderRadius: 12, background: C.primary, color: "#fff", fontSize: 14, fontWeight: 700, ...P, cursor: "pointer" }}>Continue</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 style={{ ...P, fontWeight: 800, fontSize: 26, color: C.dark, marginBottom: 6 }}>Campus & Role</h2>
              <p style={{ ...I, fontSize: 14, color: C.textSec, marginBottom: 24 }}>Localise your restaurant feed and delivery experience.</p>
              <div style={{ ...I, fontSize: 13, fontWeight: 500, color: C.textSec, marginBottom: 10 }}>Select your campus</div>
              {["INTI International University", "Sunway University", "Taylor's University"].map(c => (
                <div key={c} onClick={() => set("campus", c)} style={{ background: C.white, borderRadius: 12, padding: "13px 16px", border: `1.5px solid ${d.campus === c ? C.primary : C.border}`, marginBottom: 8, cursor: "pointer", ...fl("row", "center", "space-between"), boxShadow: d.campus === c ? `0 4px 12px rgba(255,107,53,.14)` : sh(1), transition: "all .2s" }}>
                  <div style={{ ...fl("row", "center", "flex-start", 10) }}><span style={{ fontSize: 18 }}>🏫</span><span style={{ ...I, fontSize: 14, fontWeight: 500, color: C.dark }}>{c}</span></div>
                  <div style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${d.campus === c ? C.primary : C.border}`, background: d.campus === c ? C.primary : "transparent", ...fl("row", "center", "center") }}>
                    {d.campus === c && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff" }} />}
                  </div>
                </div>
              ))}
              <div style={{ ...I, fontSize: 13, fontWeight: 500, color: C.textSec, margin: "18px 0 10px" }}>I want to</div>
              <div style={{ ...fl("row", "center", "flex-start", 12), marginBottom: 24 }}>
                {[{ id: "student", l: "Order Food", e: "🛍️" }, { id: "driver", l: "Deliver Food", e: "🛵" }].map(r => (
                  <div key={r.id} onClick={() => set("role", r.id)} style={{ flex: 1, background: C.white, borderRadius: 14, padding: "16px", textAlign: "center", border: `2px solid ${d.role === r.id ? C.primary : C.border}`, cursor: "pointer", boxShadow: d.role === r.id ? `0 4px 16px rgba(255,107,53,.18)` : sh(1), transition: "all .2s" }}>
                    <div style={{ fontSize: 28, marginBottom: 8 }}>{r.e}</div>
                    <div style={{ ...I, fontSize: 13, fontWeight: 600, color: d.role === r.id ? C.primary : C.dark }}>{r.l}</div>
                  </div>
                ))}
              </div>
              <div style={{ ...fl("row", "center", "flex-start", 12) }}>
                <button onClick={() => { setStep(2); setErr({}); }} style={{ background: "transparent", border: `1.5px solid ${C.border}`, borderRadius: 12, height: 48, padding: "0 22px", ...I, fontSize: 14, fontWeight: 600, cursor: "pointer", color: C.dark }}>← Back</button>
                <button className="btn-primary" onClick={onLogin} style={{ flex: 1, height: 48, border: "none", borderRadius: 12, background: C.primary, color: "#fff", fontSize: 14, fontWeight: 700, ...P, cursor: "pointer" }}>Create Account 🚀</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ═══ BROWSE PAGE ═════════════════════════════════════════════
function BrowsePage({ go, goToRestaurant, cart, setCart }) {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const TAG_MAP = { "All": null, "Halal": "Halal", "Budget": "Budget", "Coffee": "Coffee", "Fast Food": "Fast Food", "Healthy": "Healthy" };
  const FILTERS = ["All", "Halal", "Budget", "Coffee", "Fast Food", "Healthy"];

  const shown = RESTAURANTS.filter(r => {
    const matchF = filter === "All" || r.tags.includes(TAG_MAP[filter]);
    const matchS = !search || r.name.toLowerCase().includes(search.toLowerCase()) || r.cuisine.toLowerCase().includes(search.toLowerCase());
    return matchF && matchS;
  });

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <div className="pg" style={{ minHeight: "calc(100vh - 68px)", background: C.bg }}>
      {/* Page header */}
      <div style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: "24px 0" }}>
        <div style={{ ...MAX, ...fl("row", "center", "space-between") }}>
          <div>
            <h1 style={{ ...P, fontWeight: 800, fontSize: 28, color: C.dark, marginBottom: 4 }}>Browse Restaurants</h1>
            <div style={{ ...fl("row", "center", "flex-start", 6) }}>
              <MapPin size={14} color={C.primary} />
              <span style={{ ...I, fontSize: 14, color: C.textSec }}>INTI International University</span>
              <ChevronDown size={14} color={C.muted} />
              <span style={{ ...I, fontSize: 13, color: C.muted }}>·</span>
              <span style={{ ...I, fontSize: 13, color: C.textSec }}>Engineering Lab 3</span>
            </div>
          </div>
          <div style={{ ...fl("row", "center", "center", 12) }}>
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, ...fl("row", "center", "flex-start", 10), padding: "0 16px", height: 46, width: 300, boxShadow: sh(1) }}>
              <Search size={15} color={C.muted} />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search restaurants..."
                style={{ border: "none", outline: "none", fontSize: 14, color: C.dark, flex: 1, ...I, background: "transparent" }} />
              {search && <button onClick={() => setSearch("")} style={{ background: "none", border: "none", cursor: "pointer", lineHeight: 0 }}><X size={14} color={C.muted} /></button>}
            </div>
            <button onClick={() => go("search")} style={{ ...fl("row", "center", "center", 8), background: C.primary, color: "#fff", border: "none", borderRadius: 12, padding: "0 18px", height: 46, cursor: "pointer", ...I, fontSize: 14, fontWeight: 600 }}>
              <Search size={15} color="#fff" /> Search Food
            </button>
          </div>
        </div>
      </div>

      <div style={{ ...MAX, display: "grid", gridTemplateColumns: "260px 1fr", gap: 32, paddingTop: 32, paddingBottom: 48 }}>
        {/* Sidebar */}
        <div>
          <div style={{ background: C.white, borderRadius: 16, padding: "24px", boxShadow: sh(1), position: "sticky", top: 92 }}>
            <div style={{ ...P, fontWeight: 700, fontSize: 15, color: C.dark, marginBottom: 16 }}>Filter By</div>

            <div style={{ ...I, fontSize: 12, fontWeight: 600, color: C.muted, letterSpacing: .6, marginBottom: 10 }}>CATEGORY</div>
            {FILTERS.map(f => (
              <div key={f} className="sidebar-chip" onClick={() => setFilter(f)} style={{
                padding: "10px 14px", borderRadius: 10, marginBottom: 6, cursor: "pointer",
                border: `1.5px solid ${filter === f ? C.primary : C.border}`,
                background: filter === f ? C.pA : C.white,
                color: filter === f ? C.primary : C.textSec, ...I, fontSize: 14, fontWeight: filter === f ? 600 : 400,
                ...fl("row", "center", "space-between"), transition: "all .15s",
              }}>
                <span>
                  {{ "All": "🍽️", "Halal": "🥩", "Budget": "💸", "Coffee": "☕", "Fast Food": "🍟", "Healthy": "🥗" }[f]} {f}
                </span>
                <span style={{ background: filter === f ? C.primary : "rgba(100,116,139,.12)", color: filter === f ? "#fff" : C.muted, ...I, fontSize: 11, fontWeight: 600, borderRadius: 20, padding: "1px 7px" }}>
                  {f === "All" ? RESTAURANTS.length : RESTAURANTS.filter(r => r.tags.includes(f)).length}
                </span>
              </div>
            ))}

            <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 20 }}>
              <div style={{ ...I, fontSize: 12, fontWeight: 600, color: C.muted, letterSpacing: .6, marginBottom: 10 }}>STATUS</div>
              <div style={{ ...fl("row", "center", "flex-start", 8), marginBottom: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.green, animation: "blinkDot 1.5s ease-in-out infinite" }} />
                <span style={{ ...I, fontSize: 14, color: C.textSec }}>Open now <strong style={{ color: C.dark }}>{RESTAURANTS.filter(r => r.open).length}</strong></span>
              </div>
              <div style={{ ...fl("row", "center", "flex-start", 8) }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.muted }} />
                <span style={{ ...I, fontSize: 14, color: C.textSec }}>Closed <strong style={{ color: C.dark }}>{RESTAURANTS.filter(r => !r.open).length}</strong></span>
              </div>
            </div>

            {cartCount > 0 && (
              <button onClick={() => goToRestaurant()} className="btn-primary" style={{ width: "100%", background: C.primary, color: "#fff", border: "none", borderRadius: 12, padding: "12px", ...fl("row", "center", "center", 8), cursor: "pointer", marginTop: 20 }}>
                <ShoppingCart size={16} color="#fff" />
                <span style={{ ...I, fontSize: 14, fontWeight: 600 }}>View Cart ({cartCount})</span>
              </button>
            )}
          </div>
        </div>

        {/* Grid */}
        <div>
          <div style={{ ...fl("row", "center", "space-between"), marginBottom: 20 }}>
            <span style={{ ...P, fontWeight: 600, fontSize: 16, color: C.dark }}>
              {shown.length} {shown.length === 1 ? "Restaurant" : "Restaurants"} {filter !== "All" ? `· ${filter}` : ""}
            </span>
            <div style={{ ...fl("row", "center", "center", 8), background: C.greenA, borderRadius: 20, padding: "5px 12px" }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: C.green, animation: "blinkDot 1.5s ease-in-out infinite" }} />
              <span style={{ ...I, fontSize: 12, color: C.green, fontWeight: 600 }}>Live · Updated now</span>
            </div>
          </div>

          {shown.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>🔍</div>
              <div style={{ ...P, fontWeight: 700, fontSize: 20, color: C.dark, marginBottom: 8 }}>No restaurants found</div>
              <div style={{ ...I, fontSize: 15, color: C.textSec }}>Try a different filter or search term</div>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 20 }}>
              {shown.map(r => (
                <div key={r.id} className="rest-card" onClick={() => goToRestaurant(r.id)}
                  style={{ background: C.white, borderRadius: 20, overflow: "hidden", cursor: "pointer", boxShadow: sh(1) }}>
                  <div style={{ height: 150, background: r.bg, ...fl("row", "center", "center"), position: "relative" }}>
                    <span style={{ fontSize: 64 }}>{r.emoji}</span>
                    <div style={{ position: "absolute", top: 12, left: 12, ...fl("row", "center", "center", 6) }}>
                      {r.open
                        ? <div style={{ background: "rgba(34,197,94,.9)", borderRadius: 20, padding: "3px 10px" }}><span style={{ ...I, fontSize: 11, color: "#fff", fontWeight: 600 }}>● Open · {r.until}</span></div>
                        : <div style={{ background: "rgba(0,0,0,.5)", borderRadius: 20, padding: "3px 10px" }}><span style={{ ...I, fontSize: 11, color: "#fff", fontWeight: 600 }}>Closed</span></div>
                      }
                    </div>
                    {r.halal && <div style={{ position: "absolute", top: 12, right: 12 }}><HalalBadge /></div>}
                  </div>
                  <div style={{ padding: "18px 20px 20px" }}>
                    <div style={{ ...P, fontWeight: 700, fontSize: 17, color: C.dark, marginBottom: 4 }}>{r.name}</div>
                    <div style={{ ...I, fontSize: 13, color: C.textSec, marginBottom: 14 }}>{r.cuisine}</div>
                    <div style={{ ...fl("row", "center", "flex-start", 10) }}>
                      <StarRow rating={r.rating} reviews={r.reviews} />
                      <span style={{ color: C.border }}>·</span>
                      <WalkBadge min={r.walk} />
                      <span style={{ color: C.border }}>·</span>
                      <span style={{ ...I, fontSize: 13, color: C.textSec }}>{r.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ═══ RESTAURANT / MENU PAGE ══════════════════════════════════
function RestaurantPage({ restaurantId, go, cart, setCart, onCheckout }) {
  const restaurant = RESTAURANTS.find(r => r.id === restaurantId) || RESTAURANTS[0];
  const restaurantMenu = RESTAURANT_MENUS[restaurant.id] || {};
  const categories = Object.keys(restaurantMenu);

  const [tab, setTab] = useState("Mains");
  const activeTab = categories.includes(tab) ? tab : (categories[0] || "Mains");
  const items = restaurantMenu[activeTab] || [];
  const qty = id => cart[id] || 0;
  const add = id => setCart(c => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const rem = id => setCart(c => { const n = { ...c }; n[id] > 1 ? n[id]-- : delete n[id]; return n; });
  const totalQty = Object.values(cart).reduce((a, b) => a + b, 0);
  const totalPrice = Object.entries(cart).reduce((s, [id, q]) => {
    const it = ALL_MENU.find(i => i.id === +id); return s + (it ? it.price * q : 0);
  }, 0);

  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const isMobile = width < 1024;
  const [showMobileCart, setShowMobileCart] = useState(false);

  return (
    <div className="pg" style={{ minHeight: "calc(100vh - 68px)", background: C.bg }}>
      {/* Restaurant banner */}
      <div style={{ background: restaurant.bg || "#D97706", padding: "36px 0" }}>
        <div style={{ ...MAX }}>
          <button onClick={() => go("home")} style={{ ...fl("row", "center", "flex-start", 6), background: "rgba(255,255,255,.2)", border: "none", borderRadius: 10, padding: "8px 16px", cursor: "pointer", ...I, fontSize: 13, fontWeight: 600, color: "#fff", marginBottom: 24 }}>
            <ArrowLeft size={16} color="#fff" /> Back to Browse
          </button>
          <div style={{ ...fl("row", "flex-start", "space-between") }}>
            <div style={{ ...fl("row", "flex-start", "flex-start", 20) }}>
              <div style={{ width: 80, height: 80, borderRadius: 20, background: "rgba(255,255,255,.2)", ...fl("row", "center", "center"), flexShrink: 0 }}>
                <span style={{ fontSize: 44 }}>{restaurant.emoji || "🍛"}</span>
              </div>
              <div>
                <div style={{ ...P, fontWeight: 800, fontSize: 28, color: "#fff", marginBottom: 4 }}>{restaurant.name}</div>
                <div style={{ ...I, fontSize: 15, color: "rgba(255,255,255,.78)", marginBottom: 10 }}>{restaurant.cuisine}{restaurant.halal ? " · Halal Certified" : ""}</div>
                <div style={{ ...fl("row", "center", "flex-start", 16) }}>
                  <StarRow rating={restaurant.rating} reviews={restaurant.reviews} />
                  <span style={{ color: "rgba(255,255,255,.3)" }}>·</span>
                  <span style={{ ...I, fontSize: 14, color: "rgba(255,255,255,.85)" }}>🚶 {restaurant.walk} min walk</span>
                  <span style={{ color: "rgba(255,255,255,.3)" }}>·</span>
                  <span style={{ ...I, fontSize: 13, background: "rgba(255,255,255,.2)", padding: "3px 10px", borderRadius: 20, color: "rgba(255,255,255,.9)" }}>Open until {restaurant.until}</span>
                  {restaurant.halal && <HalalBadge />}
                </div>
              </div>
            </div>
            <div style={{ ...fl("row", "center", "center", 12) }}>
              {["🔍", "❤️", "📤"].map(ic => (
                <button key={ic} style={{ background: "rgba(255,255,255,.2)", border: "none", borderRadius: 10, width: 42, height: 42, cursor: "pointer", ...fl("row", "center", "center"), fontSize: 18 }}>{ic}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Category tabs */}
      <div style={{ background: C.white, borderBottom: `1px solid ${C.border}`, position: "sticky", top: 68, zIndex: 50 }}>
        <div style={{ ...MAX, ...fl("row", "center", "flex-start") }}>
          {categories.map(t => (
            <button key={t} className="tab-btn" onClick={() => setTab(t)} style={{ padding: "16px 24px", border: "none", background: "none", cursor: "pointer", ...I, fontSize: 14, fontWeight: activeTab === t ? 600 : 400, color: activeTab === t ? C.primary : C.textSec, borderBottom: `3px solid ${activeTab === t ? C.primary : "transparent"}`, transition: "all .15s" }}>
              {t}
              <span style={{ marginLeft: 6, fontSize: 12, color: activeTab === t ? C.primary : C.muted, background: activeTab === t ? C.pA : "rgba(100,116,139,.1)", borderRadius: 20, padding: "1px 7px" }}>
                {restaurantMenu[t].length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Content: Menu + Cart sidebar */}
      <div style={{ ...MAX, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 360px", gap: 32, paddingTop: 32, paddingBottom: isMobile ? 100 : 48, alignItems: "flex-start" }}>
        {/* Menu items */}
        <div>
          <div style={{ ...P, fontWeight: 700, fontSize: 18, color: C.dark, marginBottom: 20 }}>{activeTab}</div>
          {items.map(item => (
            <div key={item.id} className="menu-row" style={{ background: C.white, borderRadius: 16, marginBottom: 12, padding: "20px 22px", ...fl("row", "center", "space-between"), boxShadow: sh(1) }}>
              <div style={{ flex: 1, paddingRight: 24 }}>
                <div style={{ ...fl("row", "center", "flex-start", 10), marginBottom: 6 }}>
                  <span style={{ ...P, fontWeight: 600, fontSize: 16, color: C.dark }}>{item.name}</span>
                  {item.popular && <div style={{ background: C.pA, borderRadius: 20, padding: "2px 10px", flexShrink: 0 }}><span style={{ ...I, fontSize: 11, color: C.primary, fontWeight: 600 }}>🔥 Popular</span></div>}
                </div>
                <div style={{ ...I, fontSize: 13, color: C.textSec, lineHeight: 1.6, marginBottom: 10 }}>{item.desc}</div>
                <div style={{ ...P, fontWeight: 800, fontSize: 18, color: C.primary }}>RM {item.price.toFixed(2)}</div>
              </div>
              <div style={{ ...fl("column", "center", "flex-end"), flexShrink: 0 }}>
                <div style={{ width: 80, height: 80, borderRadius: 16, background: C.pA, ...fl("row", "center", "center"), marginBottom: 12 }}>
                  <span style={{ fontSize: 44 }}>{item.emoji}</span>
                </div>
                {qty(item.id) ? (
                  <div style={{ ...fl("row", "center", "center", 10) }}>
                    <button onClick={() => rem(item.id)} style={{ width: 32, height: 32, borderRadius: 8, background: C.pA, border: "none", cursor: "pointer", ...fl("row", "center", "center") }}><Minus size={15} color={C.primary} /></button>
                    <span style={{ ...I, fontSize: 16, fontWeight: 700, color: C.dark, minWidth: 18, textAlign: "center" }}>{qty(item.id)}</span>
                    <button onClick={() => add(item.id)} style={{ width: 32, height: 32, borderRadius: 8, background: C.primary, border: "none", cursor: "pointer", ...fl("row", "center", "center") }}><Plus size={15} color="#fff" /></button>
                  </div>
                ) : (
                  <button onClick={() => add(item.id)} style={{ ...fl("row", "center", "center", 6), background: C.primary, color: "#fff", border: "none", borderRadius: 10, padding: "9px 18px", cursor: "pointer", ...I, fontSize: 13, fontWeight: 600 }}>
                    <Plus size={14} color="#fff" /> Add
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Cart sidebar (Desktop only) */}
        {!isMobile && (
          <div style={{ background: C.white, borderRadius: 20, boxShadow: sh(2), position: "sticky", top: 136, overflow: "hidden" }}>
            <div style={{ background: `linear-gradient(135deg,${C.dark},#253C55)`, padding: "20px 22px", ...fl("row", "center", "space-between") }}>
              <div style={{ ...fl("row", "center", "flex-start", 8) }}>
                <ShoppingCart size={18} color="#fff" />
                <span style={{ ...P, fontWeight: 700, fontSize: 16, color: "#fff" }}>Your Cart</span>
              </div>
              {totalQty > 0 && <div style={{ background: C.primary, borderRadius: 20, padding: "3px 10px" }}><span style={{ ...I, fontSize: 12, color: "#fff", fontWeight: 600 }}>{totalQty} item{totalQty > 1 ? "s" : ""}</span></div>}
            </div>

            {totalQty === 0 ? (
              <div style={{ padding: "48px 24px", textAlign: "center" }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>🛒</div>
                <div style={{ ...P, fontWeight: 600, fontSize: 15, color: C.dark, marginBottom: 6 }}>Your cart is empty</div>
                <div style={{ ...I, fontSize: 13, color: C.textSec, lineHeight: 1.6 }}>Add items from the menu to get started</div>
              </div>
            ) : (
              <div>
                <div style={{ padding: "16px 22px", maxHeight: 320, overflowY: "auto" }} className="hs">
                  {Object.entries(cart).map(([id, q]) => {
                    const it = ALL_MENU.find(i => i.id === +id); if (!it) return null;
                    return (
                      <div key={id} style={{ ...fl("row", "center", "space-between"), padding: "11px 0", borderBottom: `1px solid ${C.border}` }}>
                        <div style={{ ...fl("row", "center", "flex-start", 10) }}>
                          <div style={{ width: 40, height: 40, background: C.pA, borderRadius: 10, ...fl("row", "center", "center"), flexShrink: 0 }}><span style={{ fontSize: 22 }}>{it.emoji}</span></div>
                          <div>
                            <div style={{ ...I, fontSize: 13, fontWeight: 600, color: C.dark, lineHeight: 1.3 }}>{it.name}</div>
                            <div style={{ ...I, fontSize: 12, color: C.primary, marginTop: 2 }}>RM {it.price.toFixed(2)} × {q}</div>
                          </div>
                        </div>
                        <div style={{ ...fl("row", "center", "center", 6) }}>
                          <button onClick={() => rem(+id)} style={{ width: 26, height: 26, borderRadius: 6, background: C.pA, border: "none", cursor: "pointer", ...fl("row", "center", "center") }}><Minus size={11} color={C.primary} /></button>
                          <span style={{ ...I, fontSize: 13, fontWeight: 700, color: C.dark }}>{q}</span>
                          <button onClick={() => add(+id)} style={{ width: 26, height: 26, borderRadius: 6, background: C.primary, border: "none", cursor: "pointer", ...fl("row", "center", "center") }}><Plus size={11} color="#fff" /></button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div style={{ padding: "16px 22px", background: C.bg, borderTop: `1px solid ${C.border}` }}>
                  <div style={{ ...fl("row", "center", "flex-start", 8), marginBottom: 12, background: C.white, borderRadius: 10, padding: "10px 12px", border: `1px solid ${C.border}` }}>
                    <MapPin size={13} color={C.primary} />
                    <span style={{ ...I, fontSize: 12, color: C.textSec }}>Deliver to: <strong style={{ color: C.dark }}>Engineering Lab 3</strong></span>
                  </div>
                  {[["Subtotal", `RM ${totalPrice.toFixed(2)}`, C.dark], ["Delivery Fee", "FREE", C.green], ["Platform Fee", "RM 0.00", C.dark]].map(([l, v, col]) => (
                    <div key={l} style={{ ...fl("row", "center", "space-between"), marginBottom: 8 }}>
                      <span style={{ ...I, fontSize: 13, color: C.textSec }}>{l}</span>
                      <span style={{ ...I, fontSize: 13, color: col, fontWeight: 600 }}>{v}</span>
                    </div>
                  ))}
                  <div style={{ ...fl("row", "center", "space-between"), padding: "12px 0", borderTop: `1px solid ${C.border}`, marginTop: 4, marginBottom: 16 }}>
                    <span style={{ ...P, fontWeight: 700, fontSize: 16, color: C.dark }}>Total</span>
                    <span style={{ ...P, fontWeight: 800, fontSize: 18, color: C.primary }}>RM {totalPrice.toFixed(2)}</span>
                  </div>
                  <button className="btn-primary" onClick={onCheckout} style={{ width: "100%", background: C.primary, color: "#fff", border: "none", borderRadius: 12, height: 50, ...P, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
                    Place Order · RM {totalPrice.toFixed(2)}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Floating Bottom Cart Bar (Mobile only) */}
      {totalQty > 0 && isMobile && (
        <div style={{ position: "fixed", bottom: 16, left: 16, right: 16, zIndex: 150 }}>
          <button onClick={() => setShowMobileCart(true)}
            style={{ width: "100%", background: C.dark, borderRadius: 14, padding: "14px 18px", ...fl("row", "center", "space-between"), boxShadow: sh(3), border: "none", cursor: "pointer" }}>
            <div style={{ ...fl("row", "center", "flex-start", 12) }}>
              <div style={{ background: C.primary, borderRadius: 8, width: 26, height: 26, ...fl("row", "center", "center") }}>
                <span style={{ ...I, fontSize: 12, fontWeight: 800, color: "#fff" }}>{totalQty}</span>
              </div>
              <span style={{ ...I, fontSize: 14, fontWeight: 600, color: "#fff" }}>View Cart</span>
            </div>
            <span style={{ ...P, fontWeight: 800, fontSize: 15, color: C.primary }}>RM {totalPrice.toFixed(2)}</span>
          </button>
        </div>
      )}

      {/* Mobile Cart Drawer (Bottom Sheet) */}
      {showMobileCart && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.52)", ...fl("row", "flex-end", "center") }}>
          <div style={{ position: "absolute", inset: 0 }} onClick={() => setShowMobileCart(false)} />

          <div className="pg" style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: C.white, borderRadius: "22px 22px 0 0", padding: 20, maxHeight: "80%", overflowY: "auto", animation: "slideUp 280ms ease", boxShadow: sh(3) }}>
            <div style={{ width: 40, height: 4, borderRadius: 2, background: C.border, margin: "0 auto 18px" }} />

            <div style={{ ...fl("row", "center", "space-between"), marginBottom: 16 }}>
              <span style={{ ...P, fontWeight: 800, fontSize: 17, color: C.dark }}>Your Order</span>
              <button onClick={() => setShowMobileCart(false)} style={{ background: "#F7F9FC", border: "none", borderRadius: 8, width: 30, height: 30, ...fl("row", "center", "center"), cursor: "pointer" }}>
                <X size={15} color={C.textSec} />
              </button>
            </div>

            <div style={{ background: C.bg, borderRadius: 10, padding: "10px 12px", ...fl("row", "center", "flex-start", 8), marginBottom: 14 }}>
              <MapPin size={13} color={C.primary} />
              <span style={{ ...I, fontSize: 12, color: C.textSec }}>Deliver to: <strong style={{ color: C.dark }}>Engineering Lab 3</strong></span>
            </div>

            <div style={{ maxHeight: 240, overflowY: "auto", marginBottom: 16 }} className="hs">
              {Object.entries(cart).map(([id, q]) => {
                const it = ALL_MENU.find(i => i.id === +id); if (!it) return null;
                return (
                  <div key={id} style={{ ...fl("row", "center", "space-between"), padding: "12px 0", borderBottom: `1px solid ${C.border}` }}>
                    <div style={{ ...fl("row", "center", "flex-start", 10) }}>
                      <span style={{ fontSize: 22 }}>{it.emoji}</span>
                      <div>
                        <div style={{ ...I, fontSize: 13, fontWeight: 600, color: C.dark }}>{it.name}</div>
                        <div style={{ ...I, fontSize: 12, color: C.primary, marginTop: 2 }}>RM {it.price.toFixed(2)} × {q}</div>
                      </div>
                    </div>
                    <div style={{ ...fl("row", "center", "center", 6) }}>
                      <button onClick={() => rem(+id)} style={{ width: 24, height: 24, borderRadius: 6, background: C.pA, border: "none", cursor: "pointer", ...fl("row", "center", "center") }}><Minus size={11} color={C.primary} /></button>
                      <span style={{ ...I, fontSize: 13, fontWeight: 700, color: C.dark }}>{q}</span>
                      <button onClick={() => add(+id)} style={{ width: 24, height: 24, borderRadius: 6, background: C.primary, border: "none", cursor: "pointer", ...fl("row", "center", "center") }}><Plus size={11} color="#fff" /></button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ padding: "12px 0", borderTop: `1px solid ${C.border}` }}>
              {[["Subtotal", `RM ${totalPrice.toFixed(2)}`, C.dark], ["Delivery Fee", "FREE", C.green], ["Platform Fee", "RM 0.00", C.dark]].map(([l, v, col]) => (
                <div key={l} style={{ ...fl("row", "center", "space-between"), marginBottom: 8 }}>
                  <span style={{ ...I, fontSize: 13, color: C.textSec }}>{l}</span>
                  <span style={{ ...I, fontSize: 13, color: col, fontWeight: 600 }}>{v}</span>
                </div>
              ))}
              <div style={{ ...fl("row", "center", "space-between"), padding: "12px 0", borderTop: `1px solid ${C.border}`, marginTop: 4, marginBottom: 16 }}>
                <span style={{ ...P, fontWeight: 700, fontSize: 16, color: C.dark }}>Total</span>
                <span style={{ ...P, fontWeight: 800, fontSize: 18, color: C.primary }}>RM {totalPrice.toFixed(2)}</span>
              </div>
              <button className="btn-primary" onClick={() => { setShowMobileCart(false); onCheckout(); }}
                style={{ width: "100%", background: C.primary, color: "#fff", border: "none", borderRadius: 12, height: 50, ...P, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
                Place Order · RM {totalPrice.toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ═══ SEARCH PAGE ════════════════════════════════════════════
function SearchPage({ go, goToRestaurant, cart, setCart }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [recent, setRecent] = useState(["Nasi Lemak", "Teh Tarik", "Roti Canai"]);
  const CATS = ["All", "Mains", "Sides", "Drinks"];

  const results = SEARCH_ITEMS.filter(it => {
    const mQ = !q || it.name.toLowerCase().includes(q.toLowerCase()) || it.restaurant.toLowerCase().includes(q.toLowerCase());
    const mC = cat === "All" || it.cat === cat;
    return mQ && mC;
  });

  const search = (term) => {
    setQ(term);
    if (term && !recent.includes(term)) setRecent(r => [term, ...r].slice(0, 5));
  };

  const totalQty = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <div className="pg" style={{ minHeight: "calc(100vh - 68px)", background: C.bg }}>
      {/* Search header */}
      <div style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: "32px 0" }}>
        <div style={{ ...MAX }}>
          <div style={{ ...fl("row", "center", "flex-start", 16), marginBottom: 20 }}>
            <button onClick={() => go("home")} style={{ ...fl("row", "center", "center", 6), background: "none", border: "none", cursor: "pointer", ...I, fontSize: 14, fontWeight: 600, color: C.textSec }}>
              <ArrowLeft size={18} color={C.textSec} /> Back
            </button>
            <h1 style={{ ...P, fontWeight: 800, fontSize: 22, color: C.dark }}>Search Food</h1>
          </div>

          <div style={{ ...fl("row", "center", "flex-start", 16) }}>
            <div style={{
              flex: 1, background: C.bg, borderRadius: 14, border: `1.5px solid ${q ? C.primary : C.border}`, ...fl("row", "center", "flex-start", 12), padding: "0 18px", height: 56,
              boxShadow: q ? `0 0 0 3px ${C.pA}` : "none", transition: "all .2s", maxWidth: 640
            }}>
              <Search size={18} color={q ? C.primary : C.muted} />
              <input value={q} onChange={e => setQ(e.target.value)} autoFocus
                placeholder="Search for food items, dishes or restaurants…"
                style={{ border: "none", outline: "none", fontSize: 15, color: C.dark, flex: 1, ...I, background: "transparent" }} />
              {q && <button onClick={() => setQ("")} style={{ background: "none", border: "none", cursor: "pointer", lineHeight: 0 }}><X size={16} color={C.muted} /></button>}
            </div>
            <div style={{ ...fl("row", "center", "center", 8) }}>
              {CATS.map(c => (
                <button key={c} onClick={() => setCat(c)} style={{
                  padding: "12px 18px", borderRadius: 10, border: `1.5px solid ${cat === c ? C.primary : C.border}`,
                  background: cat === c ? C.pA : C.white, color: cat === c ? C.primary : C.textSec, ...I, fontSize: 13, fontWeight: cat === c ? 600 : 400, cursor: "pointer", transition: "all .15s"
                }}>{c}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ ...MAX, display: "grid", gridTemplateColumns: "240px 1fr", gap: 32, paddingTop: 32, paddingBottom: 48, alignItems: "flex-start" }}>
        {/* Sidebar */}
        <div style={{ background: C.white, borderRadius: 16, padding: "22px", boxShadow: sh(1), position: "sticky", top: 92 }}>
          <div style={{ ...P, fontWeight: 700, fontSize: 14, color: C.dark, marginBottom: 16 }}>Quick Filters</div>
          {[{ icon: "🥩", label: "Halal Only" }, { icon: "💸", label: "Under RM10" }, { icon: "⭐", label: "Top Rated" }, { icon: "🚶", label: "Nearest First" }].map(f => (
            <div key={f.label} className="sidebar-chip" style={{ ...fl("row", "center", "flex-start", 10), padding: "10px 12px", borderRadius: 10, marginBottom: 6, border: `1px solid ${C.border}`, cursor: "pointer" }}>
              <span style={{ fontSize: 16 }}>{f.icon}</span>
              <span style={{ ...I, fontSize: 13, color: C.textSec }}>{f.label}</span>
            </div>
          ))}

          {totalQty > 0 && (
            <>
              <div style={{ borderTop: `1px solid ${C.border}`, marginTop: 16, paddingTop: 16 }}>
                <button onClick={() => goToRestaurant()} style={{ width: "100%", background: C.dark, color: "#fff", border: "none", borderRadius: 12, padding: "12px", ...fl("row", "center", "center", 8), cursor: "pointer" }}>
                  <ShoppingCart size={16} color="#fff" />
                  <span style={{ ...I, fontSize: 13, fontWeight: 600 }}>Cart ({totalQty})</span>
                </button>
              </div>
            </>
          )}
        </div>

        {/* Results */}
        <div>
          {!q ? (
            <>
              {recent.length > 0 && (
                <div style={{ marginBottom: 36 }}>
                  <div style={{ ...P, fontWeight: 700, fontSize: 16, color: C.dark, marginBottom: 16 }}>🕒 Recent Searches</div>
                  <div style={{ ...fl("row", "center", "flex-start", 10), flexWrap: "wrap", gap: 10 }}>
                    {recent.map(r => (
                      <div key={r} onClick={() => search(r)} style={{ ...fl("row", "center", "center", 7), background: C.white, border: `1px solid ${C.border}`, borderRadius: 20, padding: "8px 16px", cursor: "pointer", boxShadow: sh(1) }}>
                        <Clock size={13} color={C.muted} />
                        <span style={{ ...I, fontSize: 13, color: C.textSec }}>{r}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <div style={{ ...P, fontWeight: 700, fontSize: 16, color: C.dark, marginBottom: 16 }}>🔥 Popular Right Now</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 12 }}>
                  {POPULAR.map(s => (
                    <div key={s} onClick={() => search(s)} style={{ background: C.white, borderRadius: 14, padding: "16px 18px", ...fl("row", "center", "space-between"), boxShadow: sh(1), cursor: "pointer" }}>
                      <div style={{ ...fl("row", "center", "flex-start", 12) }}>
                        <div style={{ width: 40, height: 40, borderRadius: 10, background: C.pA, ...fl("row", "center", "center") }}><TrendingUp size={17} color={C.primary} /></div>
                        <span style={{ ...I, fontSize: 14, fontWeight: 500, color: C.dark }}>{s}</span>
                      </div>
                      <ChevronRight size={16} color={C.muted} />
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div>
              <div style={{ ...fl("row", "center", "space-between"), marginBottom: 20 }}>
                <span style={{ ...I, fontSize: 15, color: C.textSec }}>
                  {results.length > 0
                    ? <><strong style={{ color: C.dark }}>{results.length} results</strong> for "{q}"</>
                    : <>No results for "<strong>{q}</strong>"</>
                  }
                </span>
              </div>

              {results.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px 0" }}>
                  <div style={{ fontSize: 56, marginBottom: 16 }}>🍽️</div>
                  <div style={{ ...P, fontWeight: 700, fontSize: 20, color: C.dark, marginBottom: 8 }}>Nothing found</div>
                  <div style={{ ...I, fontSize: 15, color: C.textSec }}>Try "Nasi Lemak", "Teh Tarik" or "Roti Canai"</div>
                </div>
              ) : (
                results.map(item => (
                  <div key={item.id} className="result-row" onClick={() => {
                    const r = RESTAURANTS.find(res => res.name === item.restaurant);
                    goToRestaurant(r ? r.id : null);
                  }}
                    style={{ background: C.white, borderRadius: 16, marginBottom: 12, padding: "18px 22px", ...fl("row", "center", "space-between"), boxShadow: sh(1) }}>
                    <div style={{ ...fl("row", "center", "flex-start", 16) }}>
                      <div style={{ width: 60, height: 60, borderRadius: 14, background: C.pA, ...fl("row", "center", "center"), flexShrink: 0 }}>
                        <span style={{ fontSize: 32 }}>{item.emoji}</span>
                      </div>
                      <div>
                        <div style={{ ...P, fontWeight: 700, fontSize: 16, color: C.dark, marginBottom: 3 }}>{item.name}</div>
                        <div style={{ ...I, fontSize: 13, color: C.textSec, marginBottom: 8 }}>{item.restaurant}</div>
                        <div style={{ ...fl("row", "center", "flex-start", 10) }}>
                          <WalkBadge min={item.walk} />
                          <span style={{ ...I, fontSize: 12, color: C.muted, background: "rgba(100,116,139,.1)", borderRadius: 20, padding: "2px 8px" }}>{item.cat}</span>
                        </div>
                      </div>
                    </div>
                    <div style={{ ...fl("row", "center", "center", 16) }}>
                      <span style={{ ...P, fontSize: 18, fontWeight: 800, color: C.primary }}>RM {item.price.toFixed(2)}</span>
                      <button onClick={e => {
                        e.stopPropagation();
                        const r = RESTAURANTS.find(res => res.name === item.restaurant);
                        goToRestaurant(r ? r.id : null);
                      }} style={{ ...fl("row", "center", "center", 6), background: C.primary, color: "#fff", border: "none", borderRadius: 10, padding: "9px 18px", cursor: "pointer", ...I, fontSize: 13, fontWeight: 600 }}>
                        <Plus size={14} color="#fff" /> Add
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


// ═══ PROFILE PAGE ════════════════════════════════════════════
const ORDER_HISTORY = [
  { id: "#CE-8841", restaurant: "Warung Pak Din", items: ["Nasi Lemak Ayam Berempah", "Teh Tarik"], total: 11.40, date: "16 Jun 2026, 2:14 PM", status: "delivered", emoji: "🍛" },
  { id: "#CE-8836", restaurant: "Mamak Corner", items: ["Roti Canai Special", "Teh Tarik Harum"], total: 6.30, date: "15 Jun 2026, 1:05 PM", status: "delivered", emoji: "🫕" },
  { id: "#CE-8821", restaurant: "Kafe Murni", items: ["Char Kuey Teow Special", "Kopi O Ais"], total: 12.90, date: "14 Jun 2026, 12:30 PM", status: "delivered", emoji: "☕" },
  { id: "#CE-8809", restaurant: "Warung Pak Din", items: ["Student Saver Set"], total: 12.90, date: "13 Jun 2026, 11:45 AM", status: "delivered", emoji: "🎓" },
  { id: "#CE-8790", restaurant: "Sushi Yume", items: ["Salmon Maki (8 pcs)", "Matcha Latte"], total: 27.40, date: "12 Jun 2026, 7:20 PM", status: "delivered", emoji: "🍣" },
  { id: "#CE-8775", restaurant: "The Grill House", items: ["Classic Cheeseburger", "Lemonade"], total: 20.40, date: "11 Jun 2026, 6:45 PM", status: "delivered", emoji: "🍔" },
];

const SAVED_LOCATIONS = [
  { id: 1, name: "Engineering Lab 3", detail: "Block B, Level 2 — Seat 14", icon: "🔬", primary: true },
  { id: 2, name: "Library Study Spot", detail: "Level 3, East Wing — Table 7", icon: "📚", primary: false },
  { id: 3, name: "Hostel Room D-211", detail: "Block D, Floor 2 — Room D-211", icon: "🏠", primary: false },
  { id: 4, name: "Lecture Hall A101", detail: "Block A, Level 1 — Front Row", icon: "🎓", primary: false },
];

const PAYMENT_METHODS = [
  { id: 1, name: "Touch 'n Go eWallet", detail: "•••• 3821", icon: "📱", primary: true, type: "ewallet" },
  { id: 2, name: "Maybank2u", detail: "•••• 9402", icon: "🏦", primary: false, type: "bank" },
  { id: 3, name: "Cash on Delivery", detail: "Pay when food arrives", icon: "💵", primary: false, type: "cash" },
];

function ProfilePage({ go, goToRestaurant, onLogout, ordersHistory = ORDER_HISTORY, activeTab: propActiveTab, setActiveTab: propSetActiveTab, locations: propLocations, setLocations: propSetLocations }) {
  const [localActiveTab, setLocalActiveTab] = useState("overview");
  const activeTab = propActiveTab || localActiveTab;
  const setActiveTab = propSetActiveTab || setLocalActiveTab;
  const [editMode, setEditMode] = useState(false);
  const [showAddLoc, setShowAddLoc] = useState(false);
  const [newLocName, setNewLocName] = useState("");
  const [newLocDetail, setNewLocDetail] = useState("");
  const [localLocations, setLocalLocations] = useState(SAVED_LOCATIONS);
  const locations = propLocations || localLocations;
  const setLocations = propSetLocations || setLocalLocations;
  const [payments, setPayments] = useState(PAYMENT_METHODS);
  const [showAddPay, setShowAddPay] = useState(false);
  const [newPayName, setNewPayName] = useState("");
  const [newPayDetail, setNewPayDetail] = useState("");
  const [notif, setNotif] = useState({ orders: true, promos: true, driver: true, sms: false });
  const [profileData, setProfileData] = useState({ name: "Muhammad Farid", email: "farid@intimal.edu.my", sid: "I-220403-F", faculty: "BSc Computer Science (Hons)", campus: "INTI International University", year: "2nd Year" });

  const TABS = [
    { id: "overview", label: "Overview", icon: "👤" },
    { id: "orders", label: "Order History", icon: "📦" },
    { id: "locations", label: "Saved Locations", icon: "📍" },
    { id: "payment", label: "Payment Methods", icon: "💳" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  const statusColor = { delivered: C.green, processing: C.primary, cancelled: C.red };
  const statusBg = { delivered: C.greenA, processing: C.pA, cancelled: C.redA };
  const statusLabel = { delivered: "Delivered", processing: "In Progress", cancelled: "Cancelled" };

  return (
    <div className="pg" style={{ minHeight: "calc(100vh - 68px)", background: C.bg }}>

      {/* ── Profile Hero Banner ─────────────────────────────── */}
      <div style={{ background: `linear-gradient(135deg, ${C.dark} 0%, #253C55 100%)`, padding: "48px 0 0" }}>
        <div style={{ ...MAX }}>
          <div style={{ ...fl("row", "flex-end", "space-between"), paddingBottom: 0 }}>
            {/* Avatar + info */}
            <div style={{ ...fl("row", "flex-end", "flex-start", 24) }}>
              <div style={{ position: "relative", marginBottom: -28 }}>
                <div style={{ width: 96, height: 96, borderRadius: 24, background: `linear-gradient(135deg,${C.primary},${C.pD})`, ...fl("row", "center", "center"), border: `4px solid ${C.dark}`, boxShadow: "0 8px 24px rgba(0,0,0,.3)" }}>
                  <span style={{ fontSize: 48 }}>👨‍🎓</span>
                </div>
                <div style={{ position: "absolute", bottom: 4, right: 4, width: 22, height: 22, borderRadius: "50%", background: C.green, border: `3px solid ${C.dark}`, ...fl("row", "center", "center") }}>
                  <span style={{ fontSize: 10 }}>✓</span>
                </div>
              </div>
              <div style={{ paddingBottom: 32 }}>
                <div style={{ ...fl("row", "center", "flex-start", 10), marginBottom: 4 }}>
                  <span style={{ ...P, fontWeight: 800, fontSize: 26, color: "#fff" }}>{profileData.name}</span>
                  <div style={{ background: "rgba(255,107,53,.25)", borderRadius: 20, padding: "3px 12px" }}>
                    <span style={{ ...I, fontSize: 12, color: C.primary, fontWeight: 600 }}>🎓 {profileData.year}</span>
                  </div>
                </div>
                <div style={{ ...I, fontSize: 14, color: "rgba(255,255,255,.65)", marginBottom: 6 }}>{profileData.email}</div>
                <div style={{ ...fl("row", "center", "flex-start", 12) }}>
                  <span style={{ ...I, fontSize: 13, color: "rgba(255,255,255,.55)" }}>🪪 {profileData.sid}</span>
                  <span style={{ color: "rgba(255,255,255,.25)" }}>·</span>
                  <span style={{ ...I, fontSize: 13, color: "rgba(255,255,255,.55)" }}>📚 {profileData.faculty}</span>
                  <span style={{ color: "rgba(255,255,255,.25)" }}>·</span>
                  <span style={{ ...I, fontSize: 13, color: "rgba(255,255,255,.55)" }}>🏫 {profileData.campus}</span>
                </div>
              </div>
            </div>

            {/* Quick stats */}
            <div style={{ ...fl("row", "flex-end", "flex-end", 12), paddingBottom: 32 }}>
              {[
                { val: ordersHistory.length, label: "Total Orders", icon: "📦" },
                { val: `RM ${ordersHistory.reduce((s, o) => s + o.total, 0).toFixed(0)}`, label: "Total Spent", icon: "💰" },
                { val: "4.9★", label: "Avg Rating", icon: "⭐" },
                { val: "INTI", label: "Campus", icon: "🏫" },
              ].map(s => (
                <div key={s.label} style={{ background: "rgba(255,255,255,.1)", borderRadius: 16, padding: "16px 20px", textAlign: "center", minWidth: 100 }}>
                  <div style={{ fontSize: 20, marginBottom: 6 }}>{s.icon}</div>
                  <div style={{ ...P, fontWeight: 800, fontSize: 20, color: "#fff", marginBottom: 3 }}>{s.val}</div>
                  <div style={{ ...I, fontSize: 11, color: "rgba(255,255,255,.55)" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tab navigation */}
          <div style={{ ...fl("row", "center", "flex-start", 0), marginTop: 8 }}>
            {TABS.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                padding: "14px 22px", border: "none", background: "none", cursor: "pointer",
                ...I, fontSize: 14, fontWeight: activeTab === tab.id ? 600 : 400,
                color: activeTab === tab.id ? "#fff" : "rgba(255,255,255,.5)",
                borderBottom: `3px solid ${activeTab === tab.id ? C.primary : "transparent"}`,
                transition: "all .15s", ...fl("row", "center", "center", 7),
              }}>
                <span>{tab.icon}</span> {tab.label}
              </button>
            ))}
            <button onClick={() => go("driver")} style={{ marginLeft: "auto", ...fl("row", "center", "center", 7), background: "rgba(255,107,53,.2)", border: "1px solid rgba(255,107,53,.4)", borderRadius: 10, padding: "10px 18px", cursor: "pointer", ...I, fontSize: 13, fontWeight: 600, color: C.primary }}>
              🛵 Switch to Driver Mode
            </button>
          </div>
        </div>
      </div>

      {/* ── Tab Content ─────────────────────────────────────── */}
      <div style={{ ...MAX, paddingTop: 40, paddingBottom: 60 }}>

        {/* ─ OVERVIEW ─ */}
        {activeTab === "overview" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
            {/* Personal Info card */}
            <div style={{ background: C.white, borderRadius: 20, boxShadow: sh(1), overflow: "hidden" }}>
              <div style={{ ...fl("row", "center", "space-between"), padding: "20px 24px", borderBottom: `1px solid ${C.border}` }}>
                <div style={{ ...P, fontWeight: 700, fontSize: 16, color: C.dark }}>👤 Personal Information</div>
                <button onClick={() => setEditMode(!editMode)} style={{ background: editMode ? C.pA : "transparent", border: `1.5px solid ${editMode ? C.primary : C.border}`, borderRadius: 9, padding: "6px 16px", cursor: "pointer", ...I, fontSize: 13, fontWeight: 600, color: editMode ? C.primary : C.textSec }}>
                  {editMode ? "Save Changes" : "Edit Profile"}
                </button>
              </div>
              <div style={{ padding: "20px 24px" }}>
                {[
                  { label: "Full Name", key: "name", icon: "👤" },
                  { label: "University Email", key: "email", icon: "📧" },
                  { label: "Student ID", key: "sid", icon: "🪪" },
                  { label: "Programme", key: "faculty", icon: "📚" },
                  { label: "Campus", key: "campus", icon: "🏫" },
                ].map(field => (
                  <div key={field.key} style={{ ...fl("row", "center", "space-between"), padding: "12px 0", borderBottom: `1px solid ${C.border}` }}>
                    <div style={{ ...fl("row", "center", "flex-start", 10) }}>
                      <span style={{ fontSize: 16, width: 22, textAlign: "center" }}>{field.icon}</span>
                      <div>
                        <div style={{ ...I, fontSize: 11, color: C.muted, marginBottom: 3 }}>{field.label}</div>
                        {editMode && field.key !== "email" && field.key !== "campus" ? (
                          <input value={profileData[field.key]} onChange={e => setProfileData(p => ({ ...p, [field.key]: e.target.value }))}
                            style={{ border: `1.5px solid ${C.primary}`, borderRadius: 8, padding: "5px 10px", ...I, fontSize: 14, color: C.dark, background: C.bg, outline: "none" }} />
                        ) : (
                          <div style={{ ...I, fontSize: 14, fontWeight: 500, color: C.dark }}>{profileData[field.key]}</div>
                        )}
                      </div>
                    </div>
                    {(field.key === "email" || field.key === "sid") && (
                      <div style={{ background: C.greenA, borderRadius: 20, padding: "3px 10px" }}>
                        <span style={{ ...I, fontSize: 11, color: C.green, fontWeight: 600 }}>✓ Verified</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Orders */}
            <div>
              <div style={{ background: C.white, borderRadius: 20, boxShadow: sh(1), overflow: "hidden", marginBottom: 20 }}>
                <div style={{ ...fl("row", "center", "space-between"), padding: "20px 24px", borderBottom: `1px solid ${C.border}` }}>
                  <div style={{ ...P, fontWeight: 700, fontSize: 16, color: C.dark }}>📦 Recent Orders</div>
                  <button onClick={() => setActiveTab("orders")} style={{ background: "none", border: "none", cursor: "pointer", ...I, fontSize: 13, color: C.primary, fontWeight: 600 }}>View All →</button>
                </div>
                {ordersHistory.slice(0, 3).map(order => (
                  <div key={order.id} style={{ padding: "14px 24px", borderBottom: `1px solid ${C.border}`, ...fl("row", "center", "space-between") }}>
                    <div style={{ ...fl("row", "center", "flex-start", 12) }}>
                      <div style={{ width: 44, height: 44, borderRadius: 12, background: C.pA, ...fl("row", "center", "center"), flexShrink: 0 }}>
                        <span style={{ fontSize: 24 }}>{order.emoji}</span>
                      </div>
                      <div>
                        <div style={{ ...I, fontSize: 13, fontWeight: 600, color: C.dark }}>{order.restaurant}</div>
                        <div style={{ ...I, fontSize: 11, color: C.muted, marginTop: 2 }}>{order.date}</div>
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ ...P, fontWeight: 700, fontSize: 14, color: C.dark, marginBottom: 4 }}>RM {order.total.toFixed(2)}</div>
                      <div style={{ background: statusBg[order.status], borderRadius: 20, padding: "2px 10px" }}>
                        <span style={{ ...I, fontSize: 11, color: statusColor[order.status], fontWeight: 600 }}>{statusLabel[order.status]}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick actions */}
              <div style={{ background: C.white, borderRadius: 20, boxShadow: sh(1), padding: "20px 24px" }}>
                <div style={{ ...P, fontWeight: 700, fontSize: 16, color: C.dark, marginBottom: 16 }}>⚡ Quick Actions</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {[
                    { icon: "🏪", label: "Browse Restaurants", action: () => go("home"), bg: C.pA, color: C.primary },
                    { icon: "🔍", label: "Search Food", action: () => go("search"), bg: C.pA, color: C.primary },
                    { icon: "📍", label: "My Locations", action: () => setActiveTab("locations"), bg: "rgba(34,197,94,.12)", color: C.green },
                    { icon: "💳", label: "Payment Methods", action: () => setActiveTab("payment"), bg: "rgba(99,102,241,.12)", color: "#6366F1" },
                  ].map(a => (
                    <button key={a.label} onClick={a.action} style={{ ...fl("row", "center", "flex-start", 10), background: a.bg, border: "none", borderRadius: 12, padding: "14px 16px", cursor: "pointer" }}>
                      <span style={{ fontSize: 20 }}>{a.icon}</span>
                      <span style={{ ...I, fontSize: 13, fontWeight: 600, color: a.color }}>{a.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─ ORDER HISTORY ─ */}
        {activeTab === "orders" && (
          <div>
            <div style={{ ...fl("row", "center", "space-between"), marginBottom: 24 }}>
              <div>
                <h2 style={{ ...P, fontWeight: 700, fontSize: 22, color: C.dark, marginBottom: 4 }}>Order History</h2>
                <span style={{ ...I, fontSize: 14, color: C.textSec }}>{ordersHistory.length} orders total</span>
              </div>
              <div style={{ ...fl("row", "center", "center", 10) }}>
                <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 10, ...fl("row", "center", "center", 8), padding: "0 14px", height: 40 }}>
                  <span style={{ fontSize: 14 }}>🗓️</span>
                  <span style={{ ...I, fontSize: 13, color: C.textSec }}>June 2026</span>
                  <ChevronDown size={14} color={C.muted} />
                </div>
                <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 10, ...fl("row", "center", "center", 8), padding: "0 14px", height: 40 }}>
                  <span style={{ fontSize: 14 }}>⚙️</span>
                  <span style={{ ...I, fontSize: 13, color: C.textSec }}>Filter</span>
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
              {ordersHistory.map((order, i) => (
                <div key={order.id} style={{ background: C.white, borderRadius: 18, boxShadow: sh(1), padding: "22px 28px", ...fl("row", "center", "space-between") }}>
                  <div style={{ ...fl("row", "center", "flex-start", 18) }}>
                    <div style={{ width: 60, height: 60, borderRadius: 16, background: C.pA, ...fl("row", "center", "center"), flexShrink: 0 }}>
                      <span style={{ fontSize: 32 }}>{order.emoji}</span>
                    </div>
                    <div>
                      <div style={{ ...fl("row", "center", "flex-start", 10), marginBottom: 5 }}>
                        <span style={{ ...P, fontWeight: 700, fontSize: 16, color: C.dark }}>{order.restaurant}</span>
                        <span style={{ ...I, fontSize: 12, color: C.muted }}>·</span>
                        <span style={{ ...I, fontSize: 13, color: C.muted }}>{order.id}</span>
                      </div>
                      <div style={{ ...I, fontSize: 13, color: C.textSec, marginBottom: 6 }}>
                        {order.items.join(" · ")}
                      </div>
                      <div style={{ ...I, fontSize: 12, color: C.muted }}>{order.date}</div>
                    </div>
                  </div>
                  <div style={{ ...fl("column", "flex-end", "center", 10), flexShrink: 0 }}>
                    <div style={{ ...P, fontWeight: 800, fontSize: 18, color: C.dark, marginBottom: 8 }}>RM {order.total.toFixed(2)}</div>
                    <div style={{ background: statusBg[order.status], borderRadius: 20, padding: "4px 14px", marginBottom: 10 }}>
                      <span style={{ ...I, fontSize: 12, color: statusColor[order.status], fontWeight: 600 }}>{statusLabel[order.status]}</span>
                    </div>
                    <div style={{ ...fl("row", "center", "center", 8) }}>
                      <button onClick={() => {
                        const r = RESTAURANTS.find(res => res.name === order.restaurant);
                        goToRestaurant(r ? r.id : null);
                      }} style={{ background: C.pA, border: "none", borderRadius: 9, padding: "7px 14px", cursor: "pointer", ...I, fontSize: 12, fontWeight: 600, color: C.primary }}>Reorder</button>
                      <button style={{ background: "transparent", border: `1px solid ${C.border}`, borderRadius: 9, padding: "7px 14px", cursor: "pointer", ...I, fontSize: 12, color: C.textSec }}>Details</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─ SAVED LOCATIONS ─ */}
        {activeTab === "locations" && (
          <div style={{ maxWidth: 760 }}>
            <div style={{ ...fl("row", "center", "space-between"), marginBottom: 24 }}>
              <div>
                <h2 style={{ ...P, fontWeight: 700, fontSize: 22, color: C.dark, marginBottom: 4 }}>Saved Locations</h2>
                <span style={{ ...I, fontSize: 14, color: C.textSec }}>Your saved campus delivery spots</span>
              </div>
              <button onClick={() => setShowAddLoc(!showAddLoc)} style={{ ...fl("row", "center", "center", 7), background: C.primary, border: "none", borderRadius: 10, padding: "10px 20px", cursor: "pointer", ...I, fontSize: 14, fontWeight: 600, color: "#fff" }}>
                <span>+</span> Add Location
              </button>
            </div>

            {showAddLoc && (
              <div style={{ background: C.white, borderRadius: 18, boxShadow: sh(2), padding: "24px 28px", marginBottom: 20, border: `1.5px solid ${C.primary}` }}>
                <div style={{ ...P, fontWeight: 700, fontSize: 15, color: C.dark, marginBottom: 16 }}>📍 Add New Location</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                  <div>
                    <label style={{ ...I, fontSize: 12, fontWeight: 500, color: C.textSec, display: "block", marginBottom: 6 }}>Location Name</label>
                    <input value={newLocName} onChange={e => setNewLocName(e.target.value)} placeholder="e.g. Lecture Hall B202"
                      style={{ width: "100%", border: `1.5px solid ${newLocName ? C.primary : C.border}`, borderRadius: 10, padding: "10px 14px", ...I, fontSize: 14, color: C.dark, outline: "none", background: C.bg }} />
                  </div>
                  <div>
                    <label style={{ ...I, fontSize: 12, fontWeight: 500, color: C.textSec, display: "block", marginBottom: 6 }}>Specific Detail</label>
                    <input value={newLocDetail} onChange={e => setNewLocDetail(e.target.value)} placeholder="e.g. Block B, Level 2, Seat 7"
                      style={{ width: "100%", border: `1.5px solid ${newLocDetail ? C.primary : C.border}`, borderRadius: 10, padding: "10px 14px", ...I, fontSize: 14, color: C.dark, outline: "none", background: C.bg }} />
                  </div>
                </div>
                <div style={{ ...fl("row", "center", "flex-start", 10) }}>
                  <button onClick={() => {
                    if (newLocName.trim()) {
                      setLocations(l => [...l, { id: Date.now(), name: newLocName, detail: newLocDetail, icon: "📌", primary: false }]);
                      setNewLocName(""); setNewLocDetail(""); setShowAddLoc(false);
                    }
                  }} style={{ background: C.primary, border: "none", borderRadius: 9, padding: "9px 22px", cursor: "pointer", ...I, fontSize: 13, fontWeight: 600, color: "#fff" }}>
                    Save Location
                  </button>
                  <button onClick={() => { setShowAddLoc(false); setNewLocName(""); setNewLocDetail(""); }} style={{ background: "transparent", border: `1px solid ${C.border}`, borderRadius: 9, padding: "9px 18px", cursor: "pointer", ...I, fontSize: 13, color: C.textSec }}>
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 14 }}>
              {locations.map(loc => (
                <div key={loc.id} style={{ background: C.white, borderRadius: 18, boxShadow: sh(1), padding: "20px 24px", ...fl("row", "center", "space-between") }}>
                  <div style={{ ...fl("row", "center", "flex-start", 16) }}>
                    <div style={{ width: 52, height: 52, borderRadius: 14, background: loc.primary ? C.pA : "rgba(100,116,139,.1)", ...fl("row", "center", "center"), flexShrink: 0 }}>
                      <span style={{ fontSize: 26 }}>{loc.icon}</span>
                    </div>
                    <div>
                      <div style={{ ...fl("row", "center", "flex-start", 10), marginBottom: 4 }}>
                        <span style={{ ...P, fontWeight: 700, fontSize: 15, color: C.dark }}>{loc.name}</span>
                        {loc.primary && <div style={{ background: C.pA, borderRadius: 20, padding: "2px 10px" }}><span style={{ ...I, fontSize: 11, color: C.primary, fontWeight: 600 }}>Default</span></div>}
                      </div>
                      <div style={{ ...I, fontSize: 13, color: C.textSec }}>{loc.detail}</div>
                    </div>
                  </div>
                  <div style={{ ...fl("row", "center", "center", 8) }}>
                    {!loc.primary && <button onClick={() => setLocations(l => l.map(x => ({ ...x, primary: x.id === loc.id })))} style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 9, padding: "7px 14px", cursor: "pointer", ...I, fontSize: 12, color: C.textSec }}>Set Default</button>}
                    <button onClick={() => setLocations(l => l.filter(x => x.id !== loc.id))} style={{ background: C.redA, border: "none", borderRadius: 9, padding: "7px 14px", cursor: "pointer", ...I, fontSize: 12, fontWeight: 600, color: C.red }}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─ PAYMENT METHODS ─ */}
        {activeTab === "payment" && (
          <div style={{ maxWidth: 700 }}>
            <div style={{ ...fl("row", "center", "space-between"), marginBottom: 24 }}>
              <div>
                <h2 style={{ ...P, fontWeight: 700, fontSize: 22, color: C.dark, marginBottom: 4 }}>Payment Methods</h2>
                <span style={{ ...I, fontSize: 14, color: C.textSec }}>Manage your saved payment options</span>
              </div>
              <button onClick={() => setShowAddPay(!showAddPay)} style={{ ...fl("row", "center", "center", 7), background: C.primary, border: "none", borderRadius: 10, padding: "10px 20px", cursor: "pointer", ...I, fontSize: 14, fontWeight: 600, color: "#fff" }}>
                <span>+</span> Add Payment Method
              </button>
            </div>

            {showAddPay && (
              <div style={{ background: C.white, borderRadius: 18, boxShadow: sh(2), padding: "24px 28px", marginBottom: 20, border: `1.5px solid ${C.primary}` }}>
                <div style={{ ...P, fontWeight: 700, fontSize: 15, color: C.dark, marginBottom: 16 }}>💳 Add New Payment Method</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                  <div>
                    <label style={{ ...I, fontSize: 12, fontWeight: 500, color: C.textSec, display: "block", marginBottom: 6 }}>Provider Name</label>
                    <input value={newPayName} onChange={e => setNewPayName(e.target.value)} placeholder="e.g. Visa / Mastercard / eWallet"
                      style={{ width: "100%", border: `1.5px solid ${newPayName ? C.primary : C.border}`, borderRadius: 10, padding: "10px 14px", ...I, fontSize: 14, color: C.dark, outline: "none", background: C.bg }} />
                  </div>
                  <div>
                    <label style={{ ...I, fontSize: 12, fontWeight: 500, color: C.textSec, display: "block", marginBottom: 6 }}>Card / Account Info</label>
                    <input value={newPayDetail} onChange={e => setNewPayDetail(e.target.value)} placeholder="e.g. •••• 1234"
                      style={{ width: "100%", border: `1.5px solid ${newPayDetail ? C.primary : C.border}`, borderRadius: 10, padding: "10px 14px", ...I, fontSize: 14, color: C.dark, outline: "none", background: C.bg }} />
                  </div>
                </div>
                <div style={{ ...fl("row", "center", "flex-start", 10) }}>
                  <button onClick={() => {
                    if (newPayName.trim()) {
                      setPayments(p => [...p, { id: Date.now(), name: newPayName, detail: newPayDetail, icon: "💳", primary: false, type: "card" }]);
                      setNewPayName(""); setNewPayDetail(""); setShowAddPay(false);
                    }
                  }} style={{ background: C.primary, border: "none", borderRadius: 9, padding: "9px 22px", cursor: "pointer", ...I, fontSize: 13, fontWeight: 600, color: "#fff" }}>
                    Save Payment Method
                  </button>
                  <button onClick={() => { setShowAddPay(false); setNewPayName(""); setNewPayDetail(""); }} style={{ background: "transparent", border: `1px solid ${C.border}`, borderRadius: 9, padding: "9px 18px", cursor: "pointer", ...I, fontSize: 13, color: C.textSec }}>
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div style={{ display: "grid", gap: 14, marginBottom: 32 }}>
              {payments.map(pm => (
                <div key={pm.id} style={{ background: C.white, borderRadius: 18, boxShadow: sh(1), padding: "22px 28px", ...fl("row", "center", "space-between"), border: pm.primary ? `1.5px solid ${C.primary}` : `1.5px solid transparent` }}>
                  <div style={{ ...fl("row", "center", "flex-start", 16) }}>
                    <div style={{ width: 56, height: 56, borderRadius: 14, background: pm.primary ? C.pA : C.bg, ...fl("row", "center", "center"), border: `1px solid ${C.border}`, flexShrink: 0 }}>
                      <span style={{ fontSize: 28 }}>{pm.icon}</span>
                    </div>
                    <div>
                      <div style={{ ...fl("row", "center", "flex-start", 10), marginBottom: 4 }}>
                        <span style={{ ...P, fontWeight: 700, fontSize: 15, color: C.dark }}>{pm.name}</span>
                        {pm.primary && <div style={{ background: C.greenA, borderRadius: 20, padding: "2px 10px" }}><span style={{ ...I, fontSize: 11, color: C.green, fontWeight: 700 }}>Primary</span></div>}
                      </div>
                      <div style={{ ...I, fontSize: 13, color: C.textSec }}>{pm.detail}</div>
                    </div>
                  </div>
                  <div style={{ ...fl("row", "center", "center", 10) }}>
                    {!pm.primary && <button onClick={() => setPayments(p => p.map(x => ({ ...x, primary: x.id === pm.id })))} style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 9, padding: "7px 14px", cursor: "pointer", ...I, fontSize: 12, color: C.textSec }}>Set Primary</button>}
                    {pm.type !== "cash" && <button style={{ background: C.pA, border: "none", borderRadius: 9, padding: "7px 14px", cursor: "pointer", ...I, fontSize: 12, fontWeight: 600, color: C.primary }}>Edit</button>}
                    {!pm.primary && pm.type !== "cash" && <button onClick={() => setPayments(p => p.filter(x => x.id !== pm.id))} style={{ background: C.redA, border: "none", borderRadius: 9, padding: "7px 14px", cursor: "pointer", ...I, fontSize: 12, fontWeight: 600, color: C.red }}>Remove</button>}
                  </div>
                </div>
              ))}
            </div>

            {/* Spending summary */}
            <div style={{ background: C.white, borderRadius: 20, boxShadow: sh(1), padding: "24px 28px" }}>
              <div style={{ ...P, fontWeight: 700, fontSize: 16, color: C.dark, marginBottom: 20 }}>💰 Spending Summary — June 2026</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                {[
                  { label: "Total Spent", val: `RM ${ordersHistory.reduce((s, o) => s + o.total, 0).toFixed(2)}`, sub: "This month", color: C.dark },
                  { label: "Orders Made", val: ordersHistory.length, sub: "All time", color: C.dark },
                  { label: "Avg. Order Value", val: ordersHistory.length > 0 ? `RM ${(ordersHistory.reduce((s, o) => s + o.total, 0) / ordersHistory.length).toFixed(2)}` : "RM 0.00", sub: "Per order", color: C.primary },
                ].map(s => (
                  <div key={s.label} style={{ background: C.bg, borderRadius: 14, padding: "18px" }}>
                    <div style={{ ...I, fontSize: 12, color: C.muted, marginBottom: 6 }}>{s.label}</div>
                    <div style={{ ...P, fontWeight: 800, fontSize: 22, color: s.color, marginBottom: 3 }}>{s.val}</div>
                    <div style={{ ...I, fontSize: 11, color: C.muted }}>{s.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─ SETTINGS ─ */}
        {activeTab === "settings" && (
          <div style={{ maxWidth: 700 }}>
            <h2 style={{ ...P, fontWeight: 700, fontSize: 22, color: C.dark, marginBottom: 24 }}>Settings & Preferences</h2>

            {/* Notifications */}
            <div style={{ background: C.white, borderRadius: 20, boxShadow: sh(1), overflow: "hidden", marginBottom: 20 }}>
              <div style={{ padding: "20px 24px", borderBottom: `1px solid ${C.border}` }}>
                <div style={{ ...P, fontWeight: 700, fontSize: 15, color: C.dark }}>🔔 Notifications</div>
              </div>
              {[
                { key: "orders", label: "Order Updates", sub: "Status changes for your orders" },
                { key: "promos", label: "Promotions & Offers", sub: "Exclusive discounts and deals" },
                { key: "driver", label: "Driver Notifications", sub: "Driver location and arrival alerts" },
                { key: "sms", label: "SMS Notifications", sub: "Text messages for critical updates" },
              ].map((n, i) => (
                <div key={n.key} style={{ ...fl("row", "center", "space-between"), padding: "16px 24px", borderBottom: i < 3 ? `1px solid ${C.border}` : "none" }}>
                  <div>
                    <div style={{ ...I, fontSize: 14, fontWeight: 500, color: C.dark, marginBottom: 3 }}>{n.label}</div>
                    <div style={{ ...I, fontSize: 12, color: C.muted }}>{n.sub}</div>
                  </div>
                  <button onClick={() => setNotif(p => ({ ...p, [n.key]: !p[n.key] }))} style={{ width: 52, height: 28, borderRadius: 14, border: "none", cursor: "pointer", background: notif[n.key] ? C.green : "rgba(160,174,192,.3)", position: "relative", transition: "background .25s", flexShrink: 0 }}>
                    <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: notif[n.key] ? 27 : 3, transition: "left .25s", boxShadow: "0 1px 4px rgba(0,0,0,.2)" }} />
                  </button>
                </div>
              ))}
            </div>

            {/* Account & Security */}
            <div style={{ background: C.white, borderRadius: 20, boxShadow: sh(1), overflow: "hidden", marginBottom: 20 }}>
              <div style={{ padding: "20px 24px", borderBottom: `1px solid ${C.border}` }}>
                <div style={{ ...P, fontWeight: 700, fontSize: 15, color: C.dark }}>🔒 Account & Security</div>
              </div>
              {[
                { icon: "🔑", label: "Change Password", sub: "Last changed 30 days ago", action: "Change" },
                { icon: "📱", label: "Two-Factor Authentication", sub: "Enabled · Secured via email", action: "Manage" },
                { icon: "🌐", label: "Language", sub: "English / Bahasa Malaysia", action: "Change" },
                { icon: "🎨", label: "Theme", sub: "Light mode", action: "Toggle" },
              ].map((s, i) => (
                <div key={s.label} style={{ ...fl("row", "center", "space-between"), padding: "16px 24px", borderBottom: i < 3 ? `1px solid ${C.border}` : "none" }}>
                  <div style={{ ...fl("row", "center", "flex-start", 12) }}>
                    <span style={{ fontSize: 20, width: 24, textAlign: "center" }}>{s.icon}</span>
                    <div>
                      <div style={{ ...I, fontSize: 14, fontWeight: 500, color: C.dark, marginBottom: 2 }}>{s.label}</div>
                      <div style={{ ...I, fontSize: 12, color: C.muted }}>{s.sub}</div>
                    </div>
                  </div>
                  <button style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 9, padding: "6px 16px", cursor: "pointer", ...I, fontSize: 12, fontWeight: 600, color: C.textSec }}>{s.action}</button>
                </div>
              ))}
            </div>

            {/* Danger zone */}
            <div style={{ background: C.white, borderRadius: 20, boxShadow: sh(1), padding: "24px", border: `1px solid rgba(239,68,68,.15)` }}>
              <div style={{ ...P, fontWeight: 700, fontSize: 15, color: C.red, marginBottom: 16 }}>⚠️ Danger Zone</div>
              <div style={{ ...fl("row", "center", "flex-start", 12) }}>
                <button onClick={() => onLogout && onLogout()} style={{ background: C.redA, border: `1.5px solid rgba(239,68,68,.3)`, borderRadius: 10, padding: "10px 22px", cursor: "pointer", ...I, fontSize: 14, fontWeight: 600, color: C.red }}>
                  Sign Out
                </button>
                <button style={{ background: "transparent", border: `1.5px solid rgba(239,68,68,.3)`, borderRadius: 10, padding: "10px 22px", cursor: "pointer", ...I, fontSize: 14, fontWeight: 600, color: C.red }}>
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}



// ═══ CHECKOUT MODAL ══════════════════════════════════════════
function CheckoutModal({ cart, totalPrice, locations, payments, onClose, onConfirm }) {
  const [selectedLoc, setSelectedLoc] = useState(() => {
    return locations.find(l => l.primary) || locations[0] || { id: 0, name: "No location selected", detail: "Please add a location", icon: "📌" };
  });
  const [selectedPay, setSelectedPay] = useState(payments.find(p => p.primary) || payments[0]);
  const [showLocSelector, setShowLocSelector] = useState(false);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.52)", ...fl("row", "center", "center"), padding: 20 }}>
      <div className="pg" style={{ background: C.white, borderRadius: 20, width: "100%", maxWidth: 480, padding: 24, boxShadow: sh(3), position: "relative" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 20, right: 20, background: "none", border: "none", cursor: "pointer" }}>
          <X size={18} color={C.textSec} />
        </button>
        <h2 style={{ ...P, fontWeight: 800, fontSize: 20, color: C.dark, marginBottom: 18 }}>Checkout</h2>

        {/* Location selection */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ ...I, fontSize: 12, fontWeight: 600, color: C.muted, letterSpacing: .5, display: "block", marginBottom: 8 }}>DELIVERY DESTINATION</label>
          <div
            style={{
              background: C.bg,
              borderRadius: 12,
              padding: "14px 16px",
              border: `1px solid ${C.border}`,
              ...fl("row", "center", "space-between"),
              cursor: "pointer",
              transition: "all 0.2s"
            }}
            onClick={() => setShowLocSelector(!showLocSelector)}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = C.primary;
              e.currentTarget.style.background = C.white;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = C.border;
              e.currentTarget.style.background = C.bg;
            }}
          >
            <div style={{ ...fl("row", "center", "flex-start", 12) }}>
              <span style={{ fontSize: 22 }}>{selectedLoc.icon || "📌"}</span>
              <div style={{ textAlign: "left" }}>
                <div style={{ ...I, fontSize: 14, fontWeight: 600, color: C.dark }}>{selectedLoc.name}</div>
                <div style={{ ...I, fontSize: 12, color: C.textSec }}>{selectedLoc.detail}</div>
              </div>
            </div>
            <div style={{ ...fl("row", "center", "center", 4) }}>
              <span style={{ ...I, fontSize: 13, fontWeight: 700, color: C.primary }}>Change</span>
              <ChevronDown size={16} color={C.primary} style={{ transform: showLocSelector ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
            </div>
          </div>

          {/* Collapsible Location Selector */}
          {showLocSelector && (
            <div style={{
              background: C.white,
              border: `1px solid ${C.border}`,
              borderRadius: 12,
              padding: "12px 14px",
              marginTop: 8,
              boxShadow: sh(1),
              maxHeight: 220,
              overflowY: "auto"
            }}>
              {locations.map(loc => (
                <div key={loc.id} onClick={() => { setSelectedLoc(loc); setShowLocSelector(false); }}
                  style={{
                    padding: "10px 12px",
                    borderRadius: 10,
                    cursor: "pointer",
                    ...fl("row", "center", "space-between"),
                    background: selectedLoc.id === loc.id ? C.pA : "transparent",
                    transition: "all 0.2s",
                    marginBottom: 4
                  }}
                  onMouseEnter={(e) => { if (selectedLoc.id !== loc.id) e.currentTarget.style.background = C.bg; }}
                  onMouseLeave={(e) => { if (selectedLoc.id !== loc.id) e.currentTarget.style.background = "transparent"; }}
                >
                  <div style={{ ...fl("row", "center", "flex-start", 10), textAlign: "left" }}>
                    <span style={{ fontSize: 18 }}>{loc.icon}</span>
                    <div>
                      <div style={{ ...I, fontSize: 13, fontWeight: 600, color: C.dark }}>{loc.name}</div>
                      <div style={{ ...I, fontSize: 11, color: C.textSec }}>{loc.detail}</div>
                    </div>
                  </div>
                  {selectedLoc.id === loc.id && (
                    <span style={{ color: C.primary, fontSize: 14 }}>✓</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Payment options */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ ...I, fontSize: 12, fontWeight: 600, color: C.muted, letterSpacing: .5, display: "block", marginBottom: 8 }}>SELECT PAYMENT METHOD</label>
          {payments.map(p => (
            <div key={p.id} onClick={() => setSelectedPay(p)}
              style={{ background: C.white, border: `1.5px solid ${selectedPay.id === p.id ? C.primary : C.border}`, borderRadius: 12, padding: "12px 14px", marginBottom: 8, cursor: "pointer", ...fl("row", "center", "space-between"), transition: "all .2s" }}>
              <div style={{ ...fl("row", "center", "flex-start", 10) }}>
                <span style={{ fontSize: 20 }}>{p.icon}</span>
                <div>
                  <div style={{ ...I, fontSize: 13, fontWeight: 600, color: C.dark }}>{p.name}</div>
                  <div style={{ ...I, fontSize: 11, color: C.textSec }}>{p.detail}</div>
                </div>
              </div>
              <div style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${selectedPay.id === p.id ? C.primary : C.border}`, background: selectedPay.id === p.id ? C.primary : "transparent", ...fl("row", "center", "center") }}>
                {selectedPay.id === p.id && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff" }} />}
              </div>
            </div>
          ))}
        </div>

        {/* Total and CTA */}
        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 16 }}>
          <div style={{ ...fl("row", "center", "space-between"), marginBottom: 16 }}>
            <span style={{ ...I, fontSize: 14, color: C.textSec }}>Total to pay</span>
            <span style={{ ...P, fontWeight: 800, fontSize: 20, color: C.primary }}>RM {totalPrice.toFixed(2)}</span>
          </div>
          <button className="btn-primary" onClick={() => onConfirm(selectedLoc, selectedPay)}
            style={{ width: "100%", background: C.primary, color: "#fff", border: "none", borderRadius: 12, height: 50, ...P, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
            Confirm & Pay · RM {totalPrice.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
}

// ═══ PAYMENT PROCESSING MODAL ════════════════════════════════
function PaymentProcessingModal() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 250, background: "rgba(0,0,0,0.65)", ...fl("row", "center", "center") }}>
      <div className="pg" style={{ background: C.white, borderRadius: 20, padding: "32px 24px", textAlign: "center", width: 280, boxShadow: sh(3) }}>
        <div style={{ margin: "0 auto 20px", width: 48, height: 48, borderRadius: "50%", border: `4px solid ${C.border}`, borderTopColor: C.primary, animation: "spin 1s linear infinite" }} />
        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        `}} />
        <h3 style={{ ...P, fontWeight: 700, fontSize: 16, color: C.dark, marginBottom: 6 }}>Processing Payment</h3>
        <p style={{ ...I, fontSize: 13, color: C.textSec }}>Verifying with your provider...</p>
      </div>
    </div>
  );
}

// ═══ ACTIVE ORDER TRACKING PAGE ══════════════════════════════
function ActiveOrderTrackingPage({ go, activeOrder, setActiveOrder, ordersHistory, setOrdersHistory }) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!activeOrder) return;
    const start = activeOrder.createdAt || Date.now();
    const interval = setInterval(() => {
      const diff = Math.floor((Date.now() - start) / 1000);
      setElapsed(diff);

      // Update order status in ordersHistory if it changes
      const currentStep = diff < 4 ? 0 : diff < 8 ? 1 : diff < 12 ? 2 : diff < 16 ? 3 : 4;
      const statusText = currentStep === 4 ? "delivered" : "processing";
      setOrdersHistory(h => h.map(o => o.id === activeOrder.id ? { ...o, status: statusText } : o));
    }, 1000);
    return () => clearInterval(interval);
  }, [activeOrder, setOrdersHistory]);

  if (!activeOrder) return <div style={{ padding: 40, textAlign: "center" }}>No active order found.</div>;

  const currentStep = elapsed < 4 ? 0 : elapsed < 8 ? 1 : elapsed < 12 ? 2 : elapsed < 16 ? 3 : 4;
  const eta = currentStep === 0 ? 20 : currentStep === 1 ? 14 : currentStep === 2 ? 8 : currentStep === 3 ? 2 : 0;

  const firstItemRaw = activeOrder.items[0] || "food";
  const itemName = firstItemRaw.split(" × ")[0] || "food";

  const steps = [
    { title: "Order Confirmed", sub: `${activeOrder.restaurant} received your order` },
    { title: "Being Prepared", sub: `Your ${itemName} is being cooked fresh` },
    { title: "Picked Up", sub: "Ali is heading your way!" },
    { title: "Arriving Soon", sub: `2 min away · Approaching ${activeOrder.location || "Engineering Lab"}` },
    { title: "Delivered", sub: "Enjoy your hot meal! Share your feedback" }
  ];

  const getDriverCoords = () => {
    if (currentStep <= 1) return { x: 75, y: 35 };
    if (currentStep === 2) return { x: 170, y: 90 };
    if (currentStep === 3) return { x: 245, y: 105 };
    return { x: 245, y: 90 }; // Delivered
  };

  const driverPos = getDriverCoords();

  const handleCall = () => {
    alert("Calling driver Ali (+60 12-345 6789)...");
  };

  const handleCancelOrder = () => {
    if (confirm("Are you sure you want to cancel your order?")) {
      setOrdersHistory(h => h.map(o => o.id === activeOrder.id ? { ...o, status: "cancelled" } : o));
      setActiveOrder(null);
      go("home");
    }
  };

  return (
    <div className="pg" style={{ minHeight: "calc(100vh - 68px)", background: C.bg, paddingBottom: 48 }}>
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes driverPing {
          0% { transform: scale(0.6); opacity: 0.8; }
          100% { transform: scale(2.2); opacity: 0; }
        }
      `}} />

      {/* Header bar */}
      <div style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: "16px 0" }}>
        <div style={{ ...MAX, ...fl("row", "center", "space-between") }}>
          <div style={{ ...fl("row", "center", "flex-start", 12) }}>
            <button onClick={() => go("home")} style={{ background: "none", border: "none", cursor: "pointer", lineHeight: 0 }}><ArrowLeft size={20} color={C.dark} /></button>
            <div>
              <h1 style={{ ...P, fontWeight: 700, fontSize: 16, color: C.dark }}>Live Tracking</h1>
              <span style={{ ...I, fontSize: 11, color: C.muted }}>Order {activeOrder.id}</span>
            </div>
          </div>
          <button onClick={handleCall} style={{ background: C.pA, border: "none", borderRadius: 10, width: 42, height: 42, cursor: "pointer", ...fl("row", "center", "center") }}>
            <Phone size={18} color={C.primary} />
          </button>
        </div>
      </div>

      {/* ETA Banner */}
      <div style={{ background: C.primary, padding: "20px 0" }}>
        <div style={{ ...MAX, ...fl("row", "center", "space-between") }}>
          <div>
            {currentStep === 4 ? (
              <div>
                <div style={{ ...I, fontSize: 11, color: "rgba(255,255,255,0.75)", marginBottom: 3 }}>Order Status</div>
                <div style={{ ...fl("row", "baseline", "flex-start", 6) }}>
                  <span style={{ ...P, fontWeight: 900, fontSize: 32, color: "#fff", lineHeight: 1 }}>Delivered!</span>
                  <span style={{ ...I, fontSize: 13, color: "rgba(255,255,255,0.85)", marginLeft: 8 }}>Enjoy your meal ✦</span>
                </div>
              </div>
            ) : (
              <div>
                <div style={{ ...I, fontSize: 11, color: "rgba(255,255,255,0.75)", marginBottom: 3 }}>Estimated arrival</div>
                <div style={{ ...fl("row", "baseline", "flex-start", 6) }}>
                  <span style={{ ...P, fontWeight: 900, fontSize: 42, color: "#fff", lineHeight: 1 }}>{eta}</span>
                  <span style={{ ...I, fontSize: 13, color: "rgba(255,255,255,0.85)" }}>minutes</span>
                </div>
              </div>
            )}
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ ...I, fontSize: 10, color: "rgba(255,255,255,0.65)", marginBottom: 4 }}>Delivering to</div>
            <div style={{ ...P, fontWeight: 700, fontSize: 13, color: "#fff" }}>{activeOrder.location?.name || "Engineering Lab 3"}</div>
            <div style={{ ...I, fontSize: 11, color: "rgba(255,255,255,0.65)" }}>{activeOrder.location?.detail || "Block B, Level 2 — Seat 14"}</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Map left / Info right */}
      <div style={{ ...MAX, display: "grid", gridTemplateColumns: "1fr 400px", gap: 32, paddingTop: 32, alignItems: "flex-start" }} className="hs">

        {/* Campus Map */}
        <div style={{ background: C.white, borderRadius: 16, boxShadow: sh(2), overflow: "hidden" }}>
          <div style={{ padding: "14px 18px", ...fl("row", "center", "space-between"), borderBottom: `1px solid ${C.border}` }}>
            <span style={{ ...P, fontWeight: 600, fontSize: 14, color: C.dark }}>Campus Map</span>
            <div style={{ ...fl("row", "center", "center", 6), background: C.greenA, borderRadius: 20, padding: "4px 10px" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.green, animation: "blinkDot 1.5s infinite" }} />
              <span style={{ ...I, fontSize: 10, color: C.green, fontWeight: 700 }}>LIVE</span>
            </div>
          </div>
          <div style={{ background: "#EEF2F7", position: "relative" }}>
            {/* SVG Map Illustration */}
            <svg viewBox="0 0 340 170" style={{ width: "100%", height: "100%", display: "block" }}>
              {/* Pathways */}
              <rect x="90" y="0" width="18" height="170" fill="#D5DDE8" />
              <rect x="0" y="78" width="340" height="18" fill="#D5DDE8" />

              {/* Green Park Areas */}
              <ellipse cx="40" cy="130" rx="25" ry="18" fill="#C8E6C9" fillOpacity="0.6" />
              <ellipse cx="300" cy="40" rx="30" ry="20" fill="#C8E6C9" fillOpacity="0.6" />

              {/* Buildings */}
              <rect x="25" y="15" rx="5" ry="5" width="55" height="35" fill="#C0CFDC" />
              <text x="52.5" y="30" fontSize="7" fontWeight="700" fill="#1A2A3A" textAnchor="middle">Canteen</text>
              <text x="52.5" y="42" fontSize="5.5" fill="#64748B" textAnchor="middle">Pak Din 🍛</text>

              <rect x="215" y="90" rx="5" ry="5" width="60" height="35" fill="#B8CBDB" />
              <text x="245" y="105" fontSize="7" fontWeight="700" fill="#1A2A3A" textAnchor="middle">Block B</text>
              <text x="245" y="117" fontSize="5.5" fill="#64748B" textAnchor="middle">Lab 3 🔬</text>

              <rect x="250" y="15" rx="5" ry="5" width="45" height="30" fill="#C0CFDC" />
              <text x="272.5" y="32" fontSize="6.5" fill="#64748B" textAnchor="middle">Library 📚</text>

              <rect x="15" y="110" rx="5" ry="5" width="50" height="35" fill="#C0CFDC" />
              <text x="40" y="130" fontSize="6.5" fill="#64748B" textAnchor="middle">Hostels 🏠</text>

              {/* Delivery Path Dashed line */}
              <path d="M 52.5 50 L 52.5 87 L 245 87 L 245 90" fill="none" stroke={C.primary} strokeWidth="2.5" strokeDasharray="5,3" strokeLinecap="round" />

              {/* Destination concentric target */}
              <circle cx="245" cy="90" r="10" fill="rgba(255,107,53,0.2)" />
              <circle cx="245" cy="90" r="5" fill={C.primary} />
              <circle cx="245" cy="90" r="2" fill="white" />

              {/* Driver ping animation */}
              <g transform={`translate(${driverPos.x}, ${driverPos.y})`}>
                <circle cx="0" cy="0" r="14" fill="rgba(255,107,53,0.22)" style={{ transformOrigin: "center", animation: "driverPing 1.8s ease-out infinite" }} />
                <circle cx="0" cy="0" r="8" fill={C.primary} stroke="white" strokeWidth="2" />
                <text x="0" y="2.5" fontSize="7.5" textAnchor="middle">🛵</text>
              </g>
            </svg>
          </div>
        </div>

        {/* Driver Details & Timeline */}
        <div style={{ display: "grid", gap: 20 }}>
          {/* Driver Card */}
          <div style={{ background: C.white, borderRadius: 16, padding: 16, boxShadow: sh(1), ...fl("row", "center", "space-between") }}>
            <div style={{ ...fl("row", "center", "flex-start", 12) }}>
              <div style={{ position: "relative", width: 48, height: 48, borderRadius: 12, background: C.pA, ...fl("row", "center", "center") }}>
                <span style={{ fontSize: 26 }}>👨‍🎓</span>
                <div style={{ position: "absolute", bottom: -3, right: -3, width: 14, height: 14, borderRadius: "50%", background: C.green, border: `2.5px solid ${C.white}` }} />
              </div>
              <div>
                <div style={{ ...P, fontWeight: 700, fontSize: 14, color: C.dark }}>Ali Shazwan</div>
                <div style={{ ...I, fontSize: 11, color: C.textSec, marginTop: 2 }}>2nd Year · Computer Science 🎓</div>
                <div style={{ ...fl("row", "center", "flex-start", 4), marginTop: 4 }}>
                  <Star size={11} color="#FFD700" fill="#FFD700" />
                  <span style={{ ...I, fontSize: 11, fontWeight: 600, color: C.dark }}>4.95</span>
                  <span style={{ ...I, fontSize: 10, color: C.muted }}>(187 trips)</span>
                </div>
              </div>
            </div>
            <button onClick={handleCall} style={{ width: 40, height: 40, borderRadius: 10, background: C.greenA, border: `1.5px solid ${C.green}`, ...fl("row", "center", "center"), cursor: "pointer" }}>
              <Phone size={16} color={C.green} />
            </button>
          </div>

          {/* Timeline Card */}
          <div style={{ background: C.white, borderRadius: 16, padding: 20, boxShadow: sh(1) }}>
            <div style={{ ...P, fontWeight: 700, fontSize: 15, color: C.dark, marginBottom: 18 }}>Order Progress</div>

            <div style={{ ...fl("column", "stretch", "flex-start", 0) }}>
              {steps.map((step, i) => {
                const isDone = i < currentStep;
                const isActive = i === currentStep;
                const isLast = i === steps.length - 1;

                return (
                  <div key={i} style={{ ...fl("row", "flex-start", "flex-start", 12) }}>
                    <div style={{ ...fl("column", "center", "flex-start", 0), width: 20, flexShrink: 0 }}>
                      <div style={{
                        width: 20, height: 20, borderRadius: "50%",
                        background: isDone || isActive ? C.primary : C.border,
                        boxShadow: isActive ? `0 0 0 4px ${C.pA20}` : "none",
                        ...fl("row", "center", "center"), transition: "all .3s"
                      }}>
                        {isDone ? <CheckCircle size={12} color="#fff" /> : <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff" }} />}
                      </div>
                      {!isLast && (
                        <div style={{
                          width: 2, height: 38,
                          background: isDone ? C.primary : C.border,
                          transition: "background .3s", marginTop: 4, marginBottom: 4
                        }} />
                      )}
                    </div>
                    <div>
                      <div style={{ ...I, fontSize: 13, fontWeight: isDone || isActive ? 600 : 400, color: isDone || isActive ? C.dark : C.muted }}>
                        {step.title}
                      </div>
                      <div style={{ ...I, fontSize: 11, color: isDone || isActive ? C.textSec : C.muted, marginTop: 2 }}>
                        {step.sub}
                      </div>
                      {!isLast && <div style={{ height: 14 }} />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Button: Cancel Order (Only in early stages) */}
          {currentStep <= 1 && (
            <button onClick={handleCancelOrder} style={{ width: "100%", background: "transparent", border: `1.5px solid rgba(239,68,68,0.25)`, borderRadius: 12, padding: "12px", ...I, fontSize: 13, fontWeight: 600, color: C.red, cursor: "pointer", textAlign: "center" }}>
              Cancel Order
            </button>
          )}

          {/* Order items summary */}
          <div style={{ background: C.white, borderRadius: 16, padding: 16, boxShadow: sh(1) }}>
            <div style={{ ...P, fontWeight: 700, fontSize: 13, color: C.dark, marginBottom: 10 }}>Items Ordered</div>
            {activeOrder.items?.map((it, idx) => (
              <div key={idx} style={{ ...I, fontSize: 12, color: C.textSec, marginBottom: 4 }}>
                {it}
              </div>
            ))}
            <div style={{ borderTop: `1px solid ${C.border}`, marginTop: 10, paddingTop: 10, ...fl("row", "center", "space-between") }}>
              <span style={{ ...I, fontSize: 12, fontWeight: 600, color: C.dark }}>Amount Paid ({activeOrder.paymentMethod?.name || "TNG"})</span>
              <span style={{ ...P, fontWeight: 800, fontSize: 14, color: C.primary }}>RM {activeOrder.total?.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══ DELIVERY PARTNER HUB PAGE ═══════════════════════════════
function DeliveryPartnerHubPage({ go }) {
  const [online, setOnline] = useState(false);
  const [timers, setTimers] = useState({ 1: 28, 2: 12, 3: 7 });

  useEffect(() => {
    if (!online) return;
    const interval = setInterval(() => {
      setTimers(prev => {
        const next = { ...prev };
        Object.keys(next).forEach(key => {
          next[key] = next[key] > 1 ? next[key] - 1 : 30;
        });
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [online]);

  const jobs = [
    { id: 1, pickup: "Warung Pak Din", drop: "Block B, Room 211", payout: 5.50, items: 3, distance: "0.4 km" },
    { id: 2, pickup: "Mamak Corner", drop: "Block A, Lecture Hall 101", payout: 4.80, items: 2, distance: "0.6 km" },
    { id: 3, pickup: "Kafe Murni", drop: "Library Study Wing", payout: 6.20, items: 4, distance: "0.8 km" }
  ];

  return (
    <div className="pg" style={{ minHeight: "calc(100vh - 68px)", background: C.bg, paddingBottom: 48 }}>
      <div style={{ background: C.dark, padding: "24px 0", color: "#fff" }}>
        <div style={{ ...MAX }}>
          <div style={{ ...fl("row", "center", "space-between"), marginBottom: 24 }}>
            <div style={{ ...fl("row", "center", "flex-start", 12) }}>
              <div style={{ position: "relative", width: 42, height: 42, borderRadius: 10, background: C.primary, ...fl("row", "center", "center") }}>
                <span style={{ fontSize: 22 }}>🛵</span>
                <div style={{ position: "absolute", bottom: -2, right: -2, width: 11, height: 11, borderRadius: "50%", background: online ? C.green : C.muted, border: `2px solid ${C.dark}` }} />
              </div>
              <div>
                <span style={{ ...I, fontSize: 10, color: "rgba(255,255,255,0.55)" }}>INTI Courier Partner</span>
                <h1 style={{ ...P, fontWeight: 700, fontSize: 14, color: "#fff" }}>Farid (Driver Mode)</h1>
              </div>
            </div>
            <button onClick={() => { go("profile"); }} style={{ background: "rgba(255,255,255,0.12)", border: "none", borderRadius: 10, padding: "8px 16px", ...I, fontSize: 13, fontWeight: 600, color: "#fff", cursor: "pointer" }}>
              ← Switch to Student
            </button>
          </div>

          <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 14, padding: 16, marginBottom: 16, ...fl("row", "center", "space-between") }}>
            <div>
              <div style={{ ...I, fontSize: 11, color: "rgba(255,255,255,0.55)", marginBottom: 4 }}>Total Earnings</div>
              <div style={{ ...P, fontWeight: 900, fontSize: 28, color: "#fff" }}>RM 124.50</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ ...I, fontSize: 11, color: "rgba(255,255,255,0.55)", marginBottom: 4 }}>Completed Trips</div>
              <div style={{ ...P, fontWeight: 800, fontSize: 24, color: "#fff" }}>14</div>
            </div>
          </div>

          <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 14, padding: 14, ...fl("row", "center", "space-between") }}>
            <div>
              <div style={{ ...P, fontWeight: 700, fontSize: 13, color: "#fff" }}>{online ? "You are online" : "You are offline"}</div>
              <div style={{ ...I, fontSize: 11, color: "rgba(255,255,255,0.6)" }}>{online ? "Ready to receive orders" : "Toggle online to start earning"}</div>
            </div>
            <button onClick={() => setOnline(o => !o)} style={{ width: 68, height: 34, borderRadius: 17, border: "none", cursor: "pointer", background: online ? C.green : "rgba(255,255,255,0.15)", position: "relative", transition: "background .3s" }}>
              <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#fff", position: "absolute", top: 4, left: online ? 38 : 4, transition: "left .3s", boxShadow: "0 2px 6px rgba(0,0,0,0.2)" }} />
            </button>
          </div>
        </div>
      </div>

      <div style={{ ...MAX, paddingTop: 24 }}>
        {online ? (
          <div>
            <div style={{ ...fl("row", "center", "flex-start", 10), marginBottom: 16 }}>
              <h2 style={{ ...P, fontWeight: 700, fontSize: 16, color: C.dark }}>Available Jobs</h2>
              <div style={{ background: C.pA, borderRadius: 12, padding: "2px 8px" }}><span style={{ ...I, fontSize: 11, fontWeight: 600, color: C.primary }}>{jobs.length} nearby</span></div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: 16 }}>
              {jobs.map(job => {
                const t = timers[job.id] || 30;
                const ratio = t / 30;
                const barColor = ratio > 0.4 ? C.primary : C.red;
                const textColor = t > 10 ? C.primary : C.red;

                return (
                  <div key={job.id} style={{ background: C.white, borderRadius: 16, boxShadow: sh(2), overflow: "hidden", ...fl("column", "stretch", "space-between") }}>
                    <div style={{ height: 4, background: C.border }}>
                      <div style={{ width: `${ratio * 100}%`, height: "100%", background: barColor, transition: "width 1s linear" }} />
                    </div>

                    <div style={{ padding: 16 }}>
                      <div style={{ ...fl("row", "center", "space-between"), marginBottom: 12 }}>
                        <div style={{ ...fl("row", "center", "flex-start", 10) }}>
                          <div style={{ width: 36, height: 36, borderRadius: 8, background: C.pA, ...fl("row", "center", "center") }}>
                            <span style={{ fontSize: 20 }}>🛍️</span>
                          </div>
                          <div>
                            <div style={{ ...P, fontWeight: 700, fontSize: 13, color: C.dark }}>{job.pickup}</div>
                            <div style={{ ...I, fontSize: 11, color: C.textSec }}>{job.items} items · {job.distance}</div>
                          </div>
                        </div>
                        <div style={{ background: C.primary, color: "#fff", borderRadius: 10, padding: "6px 12px", ...P, fontWeight: 800, fontSize: 14 }}>
                          RM {job.payout.toFixed(2)}
                        </div>
                      </div>

                      <div style={{ background: C.bg, borderRadius: 10, padding: "10px 12px", marginBottom: 12, ...fl("row", "center", "flex-start", 8) }}>
                        <span style={{ fontSize: 14 }}>📍</span>
                        <span style={{ ...I, fontSize: 12, color: C.textSec }}>Drop: <strong style={{ color: C.dark }}>{job.drop}</strong></span>
                      </div>

                      <div style={{ ...fl("row", "center", "space-between") }}>
                        <div style={{ ...I, fontSize: 11, color: C.textSec }}>Expires in <span style={{ ...P, fontWeight: 700, color: textColor }}>{t}s</span></div>
                        <button onClick={() => { alert(`Accepted job for ${job.pickup}!`); setOnline(false); }} style={{ background: C.green, color: "#fff", border: "none", borderRadius: 10, padding: "8px 20px", ...P, fontWeight: 700, fontSize: 12, cursor: "pointer" }}>
                          Accept Job
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div style={{ padding: "48px 32px", textAlign: "center", background: C.white, borderRadius: 16, boxShadow: sh(1), maxWidth: 480, margin: "24px auto 0" }}>
            <span style={{ fontSize: 64, display: "block", marginBottom: 16 }}>😴</span>
            <h2 style={{ ...P, fontWeight: 700, fontSize: 18, color: C.dark, marginBottom: 8 }}>You are offline</h2>
            <p style={{ ...I, fontSize: 14, color: C.textSec, lineHeight: 1.6, marginBottom: 24 }}>Toggle availability to start receiving student courier jobs on campus.</p>
            <button className="btn-primary" onClick={() => setOnline(true)} style={{ background: C.green, color: "#fff", border: "none", borderRadius: 12, padding: "14px 32px", ...P, fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
              Go Online Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ═══ APP ROOT ════════════════════════════════════════════════
export default function App() {
  const [page, setPage] = useState("landing");
  const [loggedIn, setLoggedIn] = useState(false);
  const [cart, setCart] = useState({});
  const [ordersHistory, setOrdersHistory] = useState(ORDER_HISTORY);
  const [activeOrder, setActiveOrder] = useState(null);
  const [profileTab, setProfileTab] = useState("overview");
  const [showCheckout, setShowCheckout] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(1);
  const [locations, setLocations] = useState(SAVED_LOCATIONS);

  const go = (p) => { setPage(p); window.scrollTo(0, 0); };
  const onLogin = () => { setLoggedIn(true); go("home"); };
  const onLogout = () => { setLoggedIn(false); setCart({}); setActiveOrder(null); go("landing"); };
  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  const getCartRestaurantId = () => {
    const firstId = Object.keys(cart)[0];
    if (firstId) {
      const item = ALL_MENU.find(i => i.id === +firstId);
      if (item) {
        const res = RESTAURANTS.find(r => r.name === item.restaurant);
        if (res) return res.id;
      }
    }
    return null;
  };

  const goToRestaurant = (id) => {
    const targetId = id || getCartRestaurantId() || selectedRestaurantId;
    setSelectedRestaurantId(targetId);
    go("restaurant");
  };

  const handleConfirmCheckout = (location, paymentMethod) => {
    setShowCheckout(false);
    setProcessingPayment(true);

    setTimeout(() => {
      setProcessingPayment(false);

      const totalPrice = Object.entries(cart).reduce((s, [id, q]) => {
        const it = ALL_MENU.find(i => i.id === +id); return s + (it ? it.price * q : 0);
      }, 0);

      const firstCartItemId = Object.keys(cart)[0];
      const firstCartItem = firstCartItemId ? ALL_MENU.find(i => i.id === +firstCartItemId) : null;
      const orderRestaurant = firstCartItem ? RESTAURANTS.find(r => r.id === firstCartItem.restaurantId) : null;
      const orderRestaurantName = orderRestaurant ? orderRestaurant.name : "Warung Pak Din";
      const orderRestaurantEmoji = orderRestaurant ? orderRestaurant.emoji : "🍛";

      const newOrder = {
        id: `#CE-${Math.floor(1000 + Math.random() * 9000)}`,
        restaurant: orderRestaurantName,
        items: Object.entries(cart).map(([id, q]) => {
          const item = ALL_MENU.find(i => i.id === +id);
          return `${item ? item.name : "Unknown Item"} × ${q}`;
        }),
        total: totalPrice,
        date: new Date().toLocaleString("en-MY", { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        status: "processing",
        emoji: orderRestaurantEmoji,
        location: location,
        paymentMethod: paymentMethod,
        createdAt: Date.now()
      };

      setOrdersHistory(prev => [newOrder, ...prev]);
      setActiveOrder(newOrder);
      setCart({});
      go("tracking");
    }, 1500);
  };

  return (
    <div style={{ minHeight: "100vh", fontFamily: "Inter, sans-serif" }}>
      <GlobalStyles />
      <Navbar page={page} go={go} goToRestaurant={goToRestaurant} loggedIn={loggedIn} cartCount={cartCount} activeOrder={activeOrder} setProfileTab={setProfileTab} profileTab={profileTab} />
      {page === "landing" && <LandingPage go={go} goToRestaurant={goToRestaurant} />}
      {page === "login" && <LoginPage go={go} onLogin={onLogin} />}
      {page === "register" && <RegisterPage go={go} onLogin={onLogin} />}
      {page === "home" && <BrowsePage go={go} goToRestaurant={goToRestaurant} cart={cart} setCart={setCart} />}
      {page === "restaurant" && <RestaurantPage restaurantId={selectedRestaurantId} go={go} cart={cart} setCart={setCart} onCheckout={() => setShowCheckout(true)} />}
      {page === "search" && <SearchPage go={go} goToRestaurant={goToRestaurant} cart={cart} setCart={setCart} />}
      {page === "profile" && <ProfilePage go={go} goToRestaurant={goToRestaurant} onLogout={onLogout} ordersHistory={ordersHistory} activeTab={profileTab} setActiveTab={setProfileTab} locations={locations} setLocations={setLocations} />}
      {page === "tracking" && <ActiveOrderTrackingPage go={go} activeOrder={activeOrder} setActiveOrder={setActiveOrder} ordersHistory={ordersHistory} setOrdersHistory={setOrdersHistory} />}
      {page === "driver" && <DeliveryPartnerHubPage go={go} />}

      {/* Checkout overlay modal */}
      {showCheckout && (
        <CheckoutModal
          cart={cart}
          totalPrice={Object.entries(cart).reduce((s, [id, q]) => {
            const it = ALL_MENU.find(i => i.id === +id); return s + (it ? it.price * q : 0);
          }, 0)}
          locations={locations}
          payments={PAYMENT_METHODS}
          onClose={() => setShowCheckout(false)}
          onConfirm={handleConfirmCheckout}
        />
      )}

      {/* Payment processing spinner */}
      {processingPayment && <PaymentProcessingModal />}
    </div>
  );
}
