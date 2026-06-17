import { useState, useEffect } from "react";
import {
  Search as SearchIcon, MapPin, Star, Bell, ChevronDown, CheckCircle,
  Eye, EyeOff, Lock, Mail, AlertCircle, Check,
  TrendingUp, ChevronRight, Plus, Minus, X, Clock,
  ShoppingCart, User, ArrowLeft, Home, Package, ShieldCheck, CreditCard
} from "lucide-react";
import CheckoutModal from "./components/CheckoutModal";
import TrackingPage from "./components/TrackingPage";

// ═══ TOKENS ════════════════════════════════════════════════════════
const C = {
  primary: "#FF6B35",
  pD: "#E0531F",
  pA: "rgba(255,107,53,0.12)",
  pA20: "rgba(255,107,53,0.22)",
  dark: "#1A2A3A",
  bg: "#F7F9FC",
  white: "#FFFFFF",
  border: "#E0E6ED",
  textSec: "#64748B",
  muted: "#A0AEC0",
  green: "#22C55E",
  greenA: "rgba(34,197,94,0.12)",
  red: "#EF4444",
  redA: "rgba(239,68,68,0.10)",
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
  { id: 1, name: "Warung Pak Din",  cuisine: "Malay Home Cooking",      rating: 4.9, reviews: 284, walk: 4,  price: "RM 6–12",  open: true,  until: "9 PM",    halal: true,  emoji: "🍛", bg: "#D97706", tags: ["Halal", "Budget", "Malay"] },
  { id: 2, name: "Mamak Corner",    cuisine: "Indian Muslim · 24 hrs",  rating: 4.8, reviews: 412, walk: 6,  price: "RM 4–9",   open: true,  until: "24 hrs",  halal: true,  emoji: "🫕", bg: "#B91C1C", tags: ["Halal", "Budget", "Coffee", "Indian"] },
  { id: 3, name: "Kafe Murni",      cuisine: "Chinese · Kopitiam",      rating: 4.7, reviews: 198, walk: 8,  price: "RM 3–8",   open: true,  until: "8:30 PM", halal: false, emoji: "☕", bg: "#1D4ED8", tags: ["Coffee", "Budget", "Chinese"] },
  { id: 4, name: "The Grill House", cuisine: "Western · Burgers",       rating: 4.5, reviews: 156, walk: 11, price: "RM 10–18", open: false, until: "Closed",  halal: false, emoji: "🍔", bg: "#15803D", tags: ["Fast Food", "Western"] },
  { id: 5, name: "Sushi Yume",      cuisine: "Japanese · Sushi",        rating: 4.6, reviews: 92,  walk: 9,  price: "RM 12–25", open: true,  until: "8 PM",    halal: false, emoji: "🍣", bg: "#7C3AED", tags: ["Healthy", "Japanese"] },
  { id: 6, name: "Ayam Penyet Hub", cuisine: "Indonesian · Fusion",     rating: 4.7, reviews: 204, walk: 7,  price: "RM 8–14",  open: true,  until: "10 PM",   halal: true,  emoji: "🍗", bg: "#D97706", tags: ["Halal", "Indonesian", "Budget"] },
];

const MENU = {
  Mains: [
    { id: 101, name: "Nasi Lemak Ayam Berempah", desc: "Fragrant coconut rice with spiced chicken, sambal, boiled egg & crispy anchovies", price: 8.90, popular: true, emoji: "🍛" },
    { id: 102, name: "Mee Goreng Mamak",        desc: "Wok-fried yellow noodles with egg, tofu, bean sprouts & fresh lime",           price: 6.50, popular: false, emoji: "🍜" },
    { id: 103, name: "Char Kuey Teow",          desc: "Flat rice noodles stir-fried with prawns, egg, bean sprouts & dark soy sauce", price: 9.90, popular: true, emoji: "🍝" },
    { id: 104, name: "Nasi Campur",             desc: "White rice with 3 fresh side dishes of the day — served daily",                price: 7.50, popular: false, emoji: "🍚" },
  ],
  Sides: [
    { id: 105, name: "Roti Canai",      desc: "Crispy layered flatbread served with dhal curry dipping sauce",   price: 2.50, popular: true, emoji: "🫓" },
    { id: 106, name: "Karipap (3 pcs)", desc: "Golden curry puffs filled with spiced potato and chicken",        price: 3.00, popular: false, emoji: "🥟" },
  ],
  Drinks: [
    { id: 107, name: "Teh Tarik",   desc: "Classic pulled milk tea — served hot or iced",                  price: 2.50, popular: true, emoji: "🧋" },
    { id: 108, name: "Milo Ais",    desc: "Cold chocolate malt drink — a beloved Malaysian staple",        price: 2.80, popular: false, emoji: "🥤" },
    { id: 109, name: "Air Bandung", desc: "Sweet rose-flavoured milk drink served over ice",               price: 2.20, popular: false, emoji: "🍹" },
  ],
  Combos: [
    { id: 110, name: "Student Saver Set", desc: "Nasi Lemak + Teh Tarik + Karipap — best campus value meal", price: 12.90, popular: true, emoji: "🎓" },
  ],
};
const ALL_MENU = Object.values(MENU).flat();

const SEARCH_ITEMS = [
  { id: 101, name: "Nasi Lemak Ayam Berempah",  cat: "Mains", price: 8.90, restaurant: "Warung Pak Din", walk: 4, emoji: "🍛" },
  { id: 102, name: "Mee Goreng Mamak",           cat: "Mains", price: 6.50, restaurant: "Warung Pak Din", walk: 4, emoji: "🍜" },
  { id: 103, name: "Char Kuey Teow",             cat: "Mains", price: 9.90, restaurant: "Warung Pak Din", walk: 4, emoji: "🍝" },
  { id: 105, name: "Roti Canai",                 cat: "Sides", price: 2.50, restaurant: "Warung Pak Din", walk: 4, emoji: "🫓" },
  { id: 107, name: "Teh Tarik",                  cat: "Drinks", price: 2.50, restaurant: "Warung Pak Din", walk: 4, emoji: "🧋" },
  { id: 201, name: "Roti Canai Special",         cat: "Mains", price: 3.50, restaurant: "Mamak Corner",   walk: 6, emoji: "🫓" },
  { id: 202, name: "Teh Tarik Harum",            cat: "Drinks", price: 2.80, restaurant: "Mamak Corner",   walk: 6, emoji: "🧋" },
  { id: 203, name: "Murtabak Daging",            cat: "Mains", price: 9.00, restaurant: "Mamak Corner",   walk: 6, emoji: "🥙" },
  { id: 204, name: "Maggi Goreng",               cat: "Mains", price: 5.50, restaurant: "Mamak Corner",   walk: 6, emoji: "🍜" },
  { id: 301, name: "Char Kuey Teow Special",     cat: "Mains", price: 10.90, restaurant: "Kafe Murni",     walk: 8, emoji: "🍝" },
  { id: 302, name: "Kopi O Ais",                 cat: "Drinks", price: 2.00, restaurant: "Kafe Murni",     walk: 8, emoji: "☕" },
  { id: 303, name: "Nasi Lemak",                 cat: "Mains", price: 6.00, restaurant: "Kafe Murni",     walk: 8, emoji: "🍛" },
  { id: 401, name: "Classic Cheeseburger",       cat: "Mains", price: 14.90, restaurant: "The Grill House", walk: 11, emoji: "🍔" },
  { id: 402, name: "Chicken Wings (6 pcs)",      cat: "Sides", price: 12.00, restaurant: "The Grill House", walk: 11, emoji: "🍗" },
  { id: 501, name: "Salmon Maki (8 pcs)",        cat: "Mains", price: 18.90, restaurant: "Sushi Yume",     walk: 9, emoji: "🍣" },
  { id: 502, name: "Edamame",                    cat: "Sides", price: 5.00, restaurant: "Sushi Yume",     walk: 9, emoji: "🌱" },
  { id: 503, name: "Matcha Latte",               cat: "Drinks", price: 8.50, restaurant: "Sushi Yume",     walk: 9, emoji: "🍵" },
];
const POPULAR = ["Nasi Lemak", "Teh Tarik", "Roti Canai", "Mee Goreng", "Chicken Wings"];

// Initial configuration variables (integrated from M3 profile data)
const INITIAL_LOCATIONS = [
  { id: 1, name: "Engineering Lab 3",   detail: "Block B, Level 2 — Seat 14",       icon: "🔬", primary: true },
  { id: 2, name: "Library Study Spot",  detail: "Level 3, East Wing — Table 7",     icon: "📚", primary: false },
  { id: 3, name: "Hostel Room D-211",   detail: "Block D, Floor 2 — Room D-211",    icon: "🏠", primary: false },
  { id: 4, name: "Lecture Hall A101",   detail: "Block A, Level 1 — Front Row",     icon: "🎓", primary: false },
];

const INITIAL_PAYMENTS = [
  { id: "tng", name: "Touch 'n Go eWallet", detail: "•••• 3821", icon: "📱", primary: true, type: "ewallet" },
  { id: "maybank", name: "Maybank2u",           detail: "•••• 9402", icon: "🏦", primary: false, type: "bank" },
  { id: "cod", name: "Cash on Delivery",    detail: "Pay when food arrives", icon: "💵", primary: false, type: "cash" },
];

const INITIAL_HISTORY = [
  { id: "#CE-8841", restaurant: "Warung Pak Din", items: [{ emoji: "🍛", name: "Nasi Lemak Ayam Berempah", qty: 1, price: 8.90 }, { emoji: "🧋", name: "Teh Tarik", qty: 1, price: 2.50 }], total: 11.40, date: "16 Jun 2026, 2:14 PM", status: "delivered", emoji: "🍛", paymentMethod: { emoji: "📱", name: "Touch 'n Go eWallet" } },
  { id: "#CE-8836", restaurant: "Mamak Corner",     items: [{ emoji: "🫓", name: "Roti Canai Special", qty: 1, price: 3.50 }, { emoji: "🧋", name: "Teh Tarik Harum", qty: 1, price: 2.80 }], total: 6.30,  date: "15 Jun 2026, 1:05 PM", status: "delivered", emoji: "🫕", paymentMethod: { emoji: "🏦", name: "Maybank2u" } },
];

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
function Navbar({ page, go, loggedIn, cartCount }) {
  return (
    <nav style={{
      height: 68, background: C.white, borderBottom: `1px solid ${C.border}`,
      position: "sticky", top: 0, zIndex: 100, ...fl("row", "center", "space-between"),
      padding: "0 48px", boxShadow: "0 1px 0 #E0E6ED"
    }}>

      {/* Brand */}
      <div onClick={() => go("landing")} style={{ ...fl("row", "center", "flex-start", 10), cursor: "pointer" }}>
        <img src="/logo-icon.png" alt="CampusEat" style={{ width: 44, height: 44, objectFit: "contain", borderRadius: 10 }} />
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
            <span className="nav-link" onClick={() => go("tracking")}
              style={{
                ...I, fontSize: 14, fontWeight: page === "tracking" ? 600 : 400, color: page === "tracking" ? C.primary : C.textSec,
                borderBottom: page === "tracking" ? `2px solid ${C.primary}` : "2px solid transparent", paddingBottom: 2
              }}>
              Track Order
            </span>
            <span className="nav-link" onClick={() => go("profile")}
              style={{
                ...I, fontSize: 14, fontWeight: page === "profile" ? 600 : 400, color: page === "profile" ? C.primary : C.textSec,
                borderBottom: page === "profile" ? `2px solid ${C.primary}` : "2px solid transparent", paddingBottom: 2
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
          <button className="icon-btn" onClick={() => go("restaurant")} style={{ position: "relative", background: C.pA, border: "none", borderRadius: 11, width: 44, height: 44, cursor: "pointer", ...fl("row", "center", "center") }}>
            <ShoppingCart size={20} color={C.primary} />
            {cartCount > 0 && <div style={{ position: "absolute", top: -4, right: -4, background: C.primary, borderRadius: "50%", width: 19, height: 19, ...fl("row", "center", "center") }}>
              <span style={{ ...I, fontSize: 10, fontWeight: 700, color: "#fff" }}>{cartCount}</span>
            </div>}
          </button>
          <div style={{ width: 1, height: 32, background: C.border }} />
          <div onClick={() => go("profile")} style={{ ...fl("row", "center", "flex-start", 8), cursor: "pointer" }}>
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
function LandingPage({ go }) {
  const [loc, setLoc] = useState("");

  return (
    <div className="pg">
      <section style={{ background: `linear-gradient(135deg, ${C.dark} 0%, #253C55 100%)`, padding: "96px 0 80px" }}>
        <div style={{ ...MAX, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
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

            <div style={{ ...fl("row", "center", "flex-start", 8) }}>
              {["📍 Block A", "📚 Library", "🔬 Eng Lab", "🏠 Hostel B"].map(l => (
                <button key={l} onClick={() => go("home")} style={{ background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.2)", borderRadius: 20, padding: "6px 14px", ...I, fontSize: 13, color: "#fff", cursor: "pointer" }}>{l}</button>
              ))}
            </div>

            <div style={{ ...fl("row", "center", "flex-start", 40), marginTop: 36, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,.12)" }}>
              {[["500+", "Menu items"], ["20+", "Restaurants"], ["2,000+", "Students served"]].map(([n, l]) => (
                <div key={l}>
                  <div style={{ ...P, fontWeight: 800, fontSize: 28, color: "#fff" }}>{n}</div>
                  <div style={{ ...I, fontSize: 13, color: "rgba(255,255,255,.6)", marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ position: "relative", height: 480, ...fl("row", "center", "center") }}>
            <div style={{ position: "absolute", width: 360, height: 360, borderRadius: "50%", background: "rgba(255,107,53,.12)", filter: "blur(50px)" }} />

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
          </div>
        </div>
      </section>

      <section style={{ padding: "80px 0", background: C.white }}>
        <div style={{ ...MAX }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <h2 style={{ ...P, fontWeight: 800, fontSize: 36, color: C.dark, marginBottom: 12 }}>How CampusEat Works</h2>
            <p style={{ ...I, fontSize: 16, color: C.textSec, maxWidth: 500, margin: "0 auto" }}>Order your favourite campus food in 4 simple steps</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
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
      <div style={{ background: `linear-gradient(135deg,${C.dark},#253C55)`, padding: "80px 64px", ...fl("column", "flex-start", "center") }}>
        <img src="/logo.jpg" alt="CampusEat" style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 18, marginBottom: 24 }} />
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

          <button className="btn-primary" onClick={login} disabled={loading}
            style={{ width: "100%", height: 52, border: "none", borderRadius: 12, background: loading ? "rgba(255,107,53,.65)" : C.primary, color: "#fff", fontSize: 15, fontWeight: 700, ...P, cursor: loading ? "default" : "pointer" }}>
            {loading ? "Signing in…" : "Sign In"}
          </button>

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
      <div style={{ background: `linear-gradient(135deg,${C.dark},#253C55)`, padding: "80px 64px", ...fl("column", "flex-start", "center") }}>
        <img src="/logo.jpg" alt="CampusEat" style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 18, marginBottom: 24 }} />
        <h1 style={{ ...P, fontWeight: 800, fontSize: 36, color: "#fff", lineHeight: 1.2, marginBottom: 16 }}>
          Join <span style={{ color: C.primary }}>CampusEat</span><br />today
        </h1>
        <p style={{ ...I, fontSize: 16, color: "rgba(255,255,255,.65)", lineHeight: 1.7, marginBottom: 40, maxWidth: 360 }}>
          Create your free account in under 2 minutes. Use your university email to get verified campus access.
        </p>

        {[{ n: 1, l: "Account" }, { n: 2, l: "Details" }, { n: 3, l: "Campus & Role" }].map(s => (
          <div key={s.n} style={{ ...fl("row", "center", "flex-start", 14), marginBottom: 14, opacity: step >= s.n ? 1 : .45 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: step >= s.n ? C.primary : "rgba(255,255,255,.15)", ...fl("row", "center", "center"), flexShrink: 0, border: step >= s.n ? "none" : "1px solid rgba(255,255,255,.25)" }}>
              {step > s.n ? <Check size={16} color="#fff" /> : <span style={{ ...I, fontWeight: 700, fontSize: 14, color: "#fff" }}>{s.n}</span>}
            </div>
            <span style={{ ...I, fontSize: 14, fontWeight: step === s.n ? 600 : 400, color: "#fff" }}>{s.l}</span>
          </div>
        ))}
      </div>

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
              <div style={{ ...fl("row", "center", "space-between", 12), marginTop: 24 }}>
                <OBtn label="Back" onClick={() => setStep(1)} outline full sm />
                <OBtn label="Continue" onClick={() => { if (v2()) setStep(3); }} full sm />
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 style={{ ...P, fontWeight: 800, fontSize: 26, color: C.dark, marginBottom: 6 }}>Campus & Role</h2>
              <p style={{ ...I, fontSize: 14, color: C.textSec, marginBottom: 28 }}>Complete your profile settings to finish registration.</p>

              <FieldBlock label="Campus Location">
                <InputField icon={<span style={{ fontSize: 16, lineHeight: 0 }}>🏫</span>} value={d.campus} onChange={v => set("campus", v)} placeholder="University Campus" />
              </FieldBlock>

              <div style={{ marginBottom: 20 }}>
                <label style={{ ...I, display: "block", fontSize: 13, fontWeight: 500, color: C.textSec, marginBottom: 10 }}>Select Role</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div onClick={() => set("role", "student")} style={{
                    padding: 16, borderRadius: 12, border: `1.5px solid ${d.role === "student" ? C.primary : C.border}`,
                    background: d.role === "student" ? C.pA : C.white, cursor: "pointer", ...fl("column", "center", "center", 8)
                  }}>
                    <span style={{ fontSize: 28 }}>🍔</span>
                    <span style={{ ...I, fontSize: 14, fontWeight: 600, color: C.dark }}>Order Food</span>
                  </div>
                  <div onClick={() => set("role", "driver")} style={{
                    padding: 16, borderRadius: 12, border: `1.5px solid ${d.role === "driver" ? C.primary : C.border}`,
                    background: d.role === "driver" ? C.pA : C.white, cursor: "pointer", ...fl("column", "center", "center", 8)
                  }}>
                    <span style={{ fontSize: 28 }}>🛵</span>
                    <span style={{ ...I, fontSize: 14, fontWeight: 600, color: C.dark }}>Deliver Food</span>
                  </div>
                </div>
              </div>

              <div style={{ ...fl("row", "center", "space-between", 12), marginTop: 32 }}>
                <OBtn label="Back" onClick={() => setStep(2)} outline full sm />
                <OBtn label="Register Account" onClick={() => onLogin()} full sm />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ═══ BROWSE / HOME PAGE ══════════════════════════════════════
function BrowsePage({ go, cart, setCart }) {
  const [filter, setFilter] = useState("All");
  const [q, setQ] = useState("");

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  const shown = RESTAURANTS.filter(r => {
    const mQ = r.name.toLowerCase().includes(q.toLowerCase()) || r.cuisine.toLowerCase().includes(q.toLowerCase());
    const mF = filter === "All" || r.tags.includes(filter);
    return mQ && mF;
  });

  return (
    <div className="pg" style={{ minHeight: "calc(100vh - 68px)", background: C.bg, paddingTop: 36, paddingBottom: 48 }}>
      <div style={{ ...MAX, display: "grid", gridTemplateColumns: "260px 1fr", gap: 32 }}>

        {/* Sidebar filters */}
        <div style={{ background: C.white, borderRadius: 20, padding: 24, border: `1px solid ${C.border}`, boxShadow: sh(1), position: "sticky", top: 92 }}>
          <div style={{ ...fl("row", "center", "space-between"), marginBottom: 18 }}>
            <span style={{ ...P, fontWeight: 800, fontSize: 16, color: C.dark }}>Explore</span>
            <span style={{ fontSize: 18 }}>🍔</span>
          </div>

          {/* Search bar inside sidebar */}
          <div style={{ background: C.bg, borderRadius: 10, border: `1px solid ${C.border}`, ...fl("row", "center", "flex-start", 8), padding: "0 12px", height: 44, marginBottom: 20 }}>
            <SearchIcon size={15} color={C.muted} />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search canteen..."
              style={{ border: "none", outline: "none", fontSize: 13, color: C.dark, flex: 1, ...I, background: "transparent" }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {["All", "Halal", "Budget", "Coffee", "Fast Food", "Healthy"].map(f => (
              <div key={f} className="sidebar-chip" onClick={() => setFilter(f)} style={{
                padding: "10px 12px", borderRadius: 10, border: `1.5px solid ${filter === f ? C.primary : C.border}`,
                background: filter === f ? C.pA : C.white,
                color: filter === f ? C.primary : C.textSec, ...I, fontSize: 14, fontWeight: filter === f ? 600 : 400,
                ...fl("row", "center", "space-between")
              }}>
                <span>
                  {({ "All": "🍽️", "Halal": "🥩", "Budget": "💸", "Coffee": "☕", "Fast Food": "🍟", "Healthy": "🥗" }[f])} {f}
                </span>
                <span style={{ background: filter === f ? C.primary : "rgba(100,116,139,.12)", color: filter === f ? "#fff" : C.muted, ...I, fontSize: 11, fontWeight: 600, borderRadius: 20, padding: "1px 7px" }}>
                  {f === "All" ? RESTAURANTS.length : RESTAURANTS.filter(r => r.tags.includes(f)).length}
                </span>
              </div>
            ))}
          </div>

          {cartCount > 0 && (
            <button onClick={() => go("restaurant")} className="btn-primary" style={{ width: "100%", background: C.primary, color: "#fff", border: "none", borderRadius: 12, padding: "12px", ...fl("row", "center", "center", 8), cursor: "pointer", marginTop: 20 }}>
              <ShoppingCart size={16} color="#fff" />
              <span style={{ ...I, fontSize: 14, fontWeight: 600 }}>View Cart ({cartCount})</span>
            </button>
          )}
        </div>

        {/* Canteen Listings Grid */}
        <div>
          <div style={{ ...fl("row", "center", "space-between"), marginBottom: 20 }}>
            <span style={{ ...P, fontWeight: 600, fontSize: 16, color: C.dark }}>
              {shown.length} {shown.length === 1 ? "Restaurant" : "Restaurants"} {filter !== "All" ? `· ${filter}` : ""}
            </span>
          </div>

          {shown.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>🔍</div>
              <div style={{ ...P, fontWeight: 700, fontSize: 20, color: C.dark, marginBottom: 8 }}>No canteens found</div>
              <div style={{ ...I, fontSize: 15, color: C.textSec }}>Try a different filter or query</div>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 20 }}>
              {shown.map(r => (
                <div key={r.id} className="rest-card" onClick={() => go("restaurant")}
                  style={{ background: C.white, borderRadius: 20, overflow: "hidden", cursor: "pointer", boxShadow: sh(1), border: `1px solid ${C.border}` }}>
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
function RestaurantPage({ go, cart, setCart, onPlaceOrderTrigger }) {
  const [tab, setTab] = useState("Mains");
  const items = MENU[tab] || [];
  const qty = id => cart[id] || 0;
  const add = id => setCart(c => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const rem = id => setCart(c => { const n = { ...c }; n[id] > 1 ? n[id]-- : delete n[id]; return n; });
  const totalQty = Object.values(cart).reduce((a, b) => a + b, 0);
  const totalPrice = Object.entries(cart).reduce((s, [id, q]) => {
    const it = ALL_MENU.find(i => i.id === +id); return s + (it ? it.price * q : 0);
  }, 0);

  return (
    <div className="pg" style={{ minHeight: "calc(100vh - 68px)", background: C.bg }}>
      <div style={{ background: "#D97706", padding: "36px 0" }}>
        <div style={{ ...MAX }}>
          <button onClick={() => go("home")} style={{ ...fl("row", "center", "flex-start", 6), background: "rgba(255,255,255,.2)", border: "none", borderRadius: 10, padding: "8px 16px", cursor: "pointer", ...I, fontSize: 13, fontWeight: 600, color: "#fff", marginBottom: 24 }}>
            <ArrowLeft size={16} color="#fff" /> Back to Browse
          </button>
          <div style={{ ...fl("row", "flex-start", "space-between") }}>
            <div style={{ ...fl("row", "flex-start", "flex-start", 20) }}>
              <div style={{ width: 80, height: 80, borderRadius: 20, background: "rgba(255,255,255,.2)", ...fl("row", "center", "center"), flexShrink: 0 }}>
                <span style={{ fontSize: 44 }}>🍛</span>
              </div>
              <div>
                <div style={{ ...P, fontWeight: 800, fontSize: 28, color: "#fff", marginBottom: 4 }}>Warung Pak Din</div>
                <div style={{ ...I, fontSize: 15, color: "rgba(255,255,255,.78)", marginBottom: 10 }}>Malay Home Cooking · Halal Certified</div>
                <div style={{ ...fl("row", "center", "flex-start", 16) }}>
                  <StarRow rating="4.9" reviews="284" />
                  <span style={{ color: "rgba(255,255,255,.3)" }}>·</span>
                  <span style={{ ...I, fontSize: 14, color: "rgba(255,255,255,.85)" }}>🚶 4 min walk</span>
                  <span style={{ color: "rgba(255,255,255,.3)" }}>·</span>
                  <span style={{ ...I, fontSize: 13, background: "rgba(255,255,255,.2)", padding: "3px 10px", borderRadius: 20, color: "rgba(255,255,255,.9)" }}>Open until 9 PM</span>
                  <HalalBadge />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ background: C.white, borderBottom: `1px solid ${C.border}`, position: "sticky", top: 68, zIndex: 50 }}>
        <div style={{ ...MAX, ...fl("row", "center", "flex-start") }}>
          {Object.keys(MENU).map(t => (
            <button key={t} className="tab-btn" onClick={() => setTab(t)} style={{ padding: "16px 24px", border: "none", background: "none", cursor: "pointer", ...I, fontSize: 14, fontWeight: tab === t ? 600 : 400, color: tab === t ? C.primary : C.textSec, borderBottom: `3px solid ${tab === t ? C.primary : "transparent"}`, transition: "all .15s" }}>
              {t}
              <span style={{ marginLeft: 6, fontSize: 12, color: tab === t ? C.primary : C.muted, background: tab === t ? C.pA : "rgba(100,116,139,.1)", borderRadius: 20, padding: "1px 7px" }}>
                {MENU[t].length}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div style={{ ...MAX, display: "grid", gridTemplateColumns: "1fr 360px", gap: 32, paddingTop: 32, paddingBottom: 48, alignItems: "flex-start" }}>
        <div>
          <div style={{ ...P, fontWeight: 700, fontSize: 18, color: C.dark, marginBottom: 20 }}>{tab}</div>
          {items.map(item => (
            <div key={item.id} className="menu-row" style={{ background: C.white, borderRadius: 16, marginBottom: 12, padding: "20px 22px", ...fl("row", "center", "space-between"), boxShadow: sh(1), border: `1px solid ${C.border}` }}>
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

        {/* Cart Sidebar */}
        <div style={{ background: C.white, borderRadius: 20, boxShadow: sh(2), position: "sticky", top: 136, overflow: "hidden", border: `1px solid ${C.border}` }}>
          <div style={{ background: `linear-gradient(135deg,${C.dark},#253C55)`, padding: "20px 22px", ...fl("row", "center", "space-between") }}>
            <div style={{ ...fl("row", "center", "flex-start", 8) }}>
              <ShoppingCart size={18} color="#fff" />
              <span style={{ ...P, fontWeight: 700, fontSize: 16, color: "#fff" }}>Your Cart</span>
            </div>
            {totalQty > 0 && <div style={{ background: C.primary, borderRadius: 20, padding: "3px 10px" }}><span style={{ ...I, fontSize: 12, color: "#fff", fontWeight: 600 }}>{totalQty} items</span></div>}
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
                <button className="btn-primary" onClick={onPlaceOrderTrigger} style={{ width: "100%", background: C.primary, color: "#fff", border: "none", borderRadius: 12, height: 50, ...P, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
                  Place Order · RM {totalPrice.toFixed(2)}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ═══ SEARCH PAGE ════════════════════════════════════════════
function SearchPage({ go, cart, setCart }) {
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
    <div className="pg" style={{ minHeight: "calc(100vh - 68px)", background: C.bg, paddingTop: 32, paddingBottom: 48 }}>
      <div style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: "20px 0", marginTop: -32, marginBottom: 32 }}>
        <div style={{ ...MAX }}>
          <div style={{ ...fl("row", "center", "flex-start", 16), marginBottom: 16 }}>
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
              <SearchIcon size={18} color={q ? C.primary : C.muted} />
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

      <div style={{ ...MAX, display: "grid", gridTemplateColumns: "240px 1fr", gap: 32 }}>
        <div style={{ background: C.white, borderRadius: 16, padding: "22px", boxShadow: sh(1), border: `1px solid ${C.border}`, position: "sticky", top: 92 }}>
          <div style={{ ...P, fontWeight: 700, fontSize: 14, color: C.dark, marginBottom: 16 }}>Quick Filters</div>
          {[{ icon: "🥩", label: "Halal Only" }, { icon: "💸", label: "Under RM10" }, { icon: "⭐", label: "Top Rated" }].map(f => (
            <div key={f.label} className="sidebar-chip" style={{ ...fl("row", "center", "flex-start", 10), padding: "10px 12px", borderRadius: 10, marginBottom: 6, border: `1px solid ${C.border}`, cursor: "pointer" }}>
              <span style={{ fontSize: 16 }}>{f.icon}</span>
              <span style={{ ...I, fontSize: 13, color: C.textSec }}>{f.label}</span>
            </div>
          ))}
        </div>

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
            </>
          ) : (
            <div>
              {results.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px 0" }}>
                  <div style={{ fontSize: 56, marginBottom: 16 }}>🍽️</div>
                  <div style={{ ...P, fontWeight: 700, fontSize: 20, color: C.dark, marginBottom: 8 }}>Nothing found</div>
                  <div style={{ ...I, fontSize: 15, color: C.textSec }}>Try searching for another dish</div>
                </div>
              ) : (
                results.map(item => (
                  <div key={item.id} className="result-row" onClick={() => go("restaurant")}
                    style={{ background: C.white, borderRadius: 16, marginBottom: 12, padding: "18px 22px", ...fl("row", "center", "space-between"), boxShadow: sh(1), border: `1px solid ${C.border}` }}>
                    <div style={{ ...fl("row", "center", "flex-start", 16) }}>
                      <div style={{ width: 60, height: 60, borderRadius: 14, background: C.pA, ...fl("row", "center", "center"), flexShrink: 0 }}>
                        <span style={{ fontSize: 32 }}>{item.emoji}</span>
                      </div>
                      <div>
                        <div style={{ ...P, fontWeight: 700, fontSize: 16, color: C.dark, marginBottom: 3 }}>{item.name}</div>
                        <div style={{ ...I, fontSize: 13, color: C.textSec, marginBottom: 8 }}>{item.restaurant}</div>
                        <div style={{ ...fl("row", "center", "flex-start", 10) }}>
                          <WalkBadge min={item.walk} />
                        </div>
                      </div>
                    </div>
                    <div style={{ ...fl("row", "center", "center", 16) }}>
                      <span style={{ ...P, fontSize: 18, fontWeight: 800, color: C.primary }}>RM {item.price.toFixed(2)}</span>
                      <button onClick={e => { e.stopPropagation(); go("restaurant"); }} style={{ ...fl("row", "center", "center", 6), background: C.primary, color: "#fff", border: "none", borderRadius: 10, padding: "9px 18px", cursor: "pointer", ...I, fontSize: 13, fontWeight: 600 }}>
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
function ProfilePage({ go, onLogout, orderHistory, locations, payments, setLocations, setPayments }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [editMode, setEditMode] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState(null);

  // Modals for Desktop Locations / Payments management (M3 Task)
  const [showAddLoc, setShowAddLoc] = useState(false);
  const [showAddPay, setShowAddPay] = useState(false);

  // Form hooks
  const [newLocName, setNewLocName] = useState("");
  const [newLocDetail, setNewLocDetail] = useState("");
  const [newLocIcon, setNewLocIcon] = useState("🔬");

  const [newPayName, setNewPayName] = useState("");
  const [newPayDetail, setNewPayDetail] = useState("");
  const [newPayIcon, setNewPayIcon] = useState("💳");

  const [profileData, setProfileData] = useState({ name: "Farid", email: "farid@intimal.edu.my", sid: "I-220403-F", faculty: "BSc Computer Science (Hons)", campus: "INTI International University", year: "2nd Year" });

  const TABS = [
    { id: "overview",  label: "Overview",        icon: "👤" },
    { id: "orders",    label: "Order History",   icon: "📦" },
    { id: "locations", label: "Saved Locations", icon: "📍" },
    { id: "payment",   label: "Payment Methods", icon: "💳" },
    { id: "settings",  label: "Settings",        icon: "⚙️" },
  ];

  const statusColor = { delivered: C.green, processing: C.primary, cancelled: C.red };
  const statusBg = { delivered: C.greenA, processing: C.pA, cancelled: C.redA };
  const statusLabel = { delivered: "Delivered", processing: "In Progress", cancelled: "Cancelled" };

  const handleAddLocationSubmit = (e) => {
    e.preventDefault();
    if (!newLocName || !newLocDetail) return;
    const newLoc = {
      id: Date.now(),
      name: newLocName,
      detail: newLocDetail,
      icon: newLocIcon,
      primary: false
    };
    setLocations([...locations, newLoc]);
    setNewLocName("");
    setNewLocDetail("");
    setNewLocIcon("🔬");
    setShowAddLoc(false);
  };

  const handleAddPaymentSubmit = (e) => {
    e.preventDefault();
    if (!newPayName || !newPayDetail) return;
    const newPay = {
      id: Date.now().toString(),
      name: newPayName,
      detail: newPayDetail,
      icon: newPayIcon,
      primary: false
    };
    setPayments([...payments, newPay]);
    setNewPayName("");
    setNewPayDetail("");
    setNewPayIcon("💳");
    setShowAddPay(false);
  };

  return (
    <div className="pg" style={{ minHeight: "calc(100vh - 68px)", background: C.bg }}>
      <div style={{ background: `linear-gradient(135deg, ${C.dark} 0%, #253C55 100%)`, padding: "48px 0 0" }}>
        <div style={{ ...MAX }}>
          <div style={{ ...fl("row", "flex-end", "space-between"), paddingBottom: 32 }}>
            <div style={{ ...fl("row", "flex-end", "flex-start", 24) }}>
              <div style={{ position: "relative" }}>
                <div style={{ width: 96, height: 96, borderRadius: 24, background: `linear-gradient(135deg,${C.primary},${C.pD})`, ...fl("row", "center", "center"), border: `4px solid ${C.dark}`, boxShadow: "0 8px 24px rgba(0,0,0,.3)" }}>
                  <span style={{ fontSize: 48 }}>👨‍🎓</span>
                </div>
              </div>
              <div>
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
                  <span style={{ ...I, fontSize: 13, color: "rgba(255,255,255,.55)" }}>🏫 {profileData.campus}</span>
                </div>
              </div>
            </div>

            <div style={{ ...fl("row", "flex-end", "flex-end", 12) }}>
              {[
                { val: orderHistory.length, label: "Total Orders", icon: "📦" },
                { val: `RM ${orderHistory.reduce((s, o) => s + o.total, 0).toFixed(2)}`, label: "Spent", icon: "💰" }
              ].map(s => (
                <div key={s.label} style={{ background: "rgba(255,255,255,.1)", borderRadius: 16, padding: "16px 20px", textAlign: "center", minWidth: 110 }}>
                  <div style={{ fontSize: 20, marginBottom: 6 }}>{s.icon}</div>
                  <div style={{ ...P, fontWeight: 800, fontSize: 20, color: "#fff", marginBottom: 3 }}>{s.val}</div>
                  <div style={{ ...I, fontSize: 11, color: "rgba(255,255,255,.55)" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

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
          </div>
        </div>
      </div>

      <div style={{ ...MAX, paddingTop: 40, paddingBottom: 60 }}>
        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
            <div style={{ background: C.white, borderRadius: 20, boxShadow: sh(1), border: `1px solid ${C.border}`, overflow: "hidden" }}>
              <div style={{ ...fl("row", "center", "space-between"), padding: "20px 24px", borderBottom: `1px solid ${C.border}` }}>
                <div style={{ ...P, fontWeight: 700, fontSize: 16, color: C.dark }}>👤 Profile details</div>
              </div>
              <div style={{ padding: "20px 24px" }}>
                {[
                  { label: "Full Name", key: "name", icon: "👤" },
                  { label: "University Email", key: "email", icon: "📧" },
                  { label: "Student ID", key: "sid", icon: "🪪" },
                  { label: "Programme", key: "faculty", icon: "📚" }
                ].map(field => (
                  <div key={field.key} style={{ ...fl("row", "center", "space-between"), padding: "12px 0", borderBottom: `1px solid ${C.border}` }}>
                    <div style={{ ...fl("row", "center", "flex-start", 10) }}>
                      <span style={{ fontSize: 16, width: 22, textAlign: "center" }}>{field.icon}</span>
                      <div>
                        <div style={{ ...I, fontSize: 11, color: C.muted, marginBottom: 3 }}>{field.label}</div>
                        <div style={{ ...I, fontSize: 14, fontWeight: 500, color: C.dark }}>{profileData[field.key] || "BSc Computer Science"}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div style={{ background: C.white, borderRadius: 20, boxShadow: sh(1), border: `1px solid ${C.border}`, overflow: "hidden", marginBottom: 20 }}>
                <div style={{ ...fl("row", "center", "space-between"), padding: "20px 24px", borderBottom: `1px solid ${C.border}` }}>
                  <div style={{ ...P, fontWeight: 700, fontSize: 16, color: C.dark }}>📦 Recent Orders</div>
                  <button onClick={() => setActiveTab("orders")} style={{ background: "none", border: "none", cursor: "pointer", ...I, fontSize: 13, color: C.primary, fontWeight: 600 }}>View All →</button>
                </div>
                {orderHistory.slice(0, 2).map(order => (
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
                      <div style={{ background: statusBg[order.status || "delivered"], borderRadius: 20, padding: "2px 10px" }}>
                        <span style={{ ...I, fontSize: 11, color: statusColor[order.status || "delivered"], fontWeight: 600 }}>{statusLabel[order.status || "delivered"]}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ORDER HISTORY TAB */}
        {activeTab === "orders" && (
          <div>
            <div style={{ marginBottom: 24 }}>
              <h2 style={{ ...P, fontWeight: 700, fontSize: 22, color: C.dark, marginBottom: 4 }}>Order History</h2>
              <span style={{ ...I, fontSize: 14, color: C.textSec }}>{orderHistory.length} orders total</span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
              {orderHistory.map(order => {
                const isExpanded = expandedOrder === order.id;
                return (
                  <div key={order.id} style={{ background: C.white, borderRadius: 18, border: `1px solid ${C.border}`, boxShadow: sh(1), overflow: "hidden" }}>
                    <div 
                      onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                      style={{ padding: "22px 28px", ...fl("row", "center", "space-between"), cursor: "pointer" }}
                    >
                      <div style={{ ...fl("row", "center", "flex-start", 18) }}>
                        <div style={{ width: 60, height: 60, borderRadius: 16, background: C.pA, ...fl("row", "center", "center"), flexShrink: 0 }}>
                          <span style={{ fontSize: 32 }}>{order.emoji || "🍛"}</span>
                        </div>
                        <div>
                          <div style={{ ...fl("row", "center", "flex-start", 10), marginBottom: 5 }}>
                            <span style={{ ...P, fontWeight: 700, fontSize: 16, color: C.dark }}>{order.restaurant}</span>
                            <span style={{ ...I, fontSize: 12, color: C.muted }}>·</span>
                            <span style={{ ...I, fontSize: 13, color: C.muted }}>{order.id}</span>
                          </div>
                          <div style={{ ...I, fontSize: 13, color: C.textSec, marginBottom: 6 }}>
                            {order.items.map(i => i.name).join(" · ")}
                          </div>
                          <div style={{ ...I, fontSize: 12, color: C.muted }}>{order.date}</div>
                        </div>
                      </div>
                      <div style={{ ...fl("row", "center", "center", 20), flexShrink: 0 }}>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ ...P, fontWeight: 800, fontSize: 18, color: C.dark, marginBottom: 6 }}>RM {order.total.toFixed(2)}</div>
                          <div style={{ background: statusBg[order.status || "delivered"], borderRadius: 20, padding: "4px 14px", display: "inline-flex" }}>
                            <span style={{ ...I, fontSize: 12, color: statusColor[order.status || "delivered"], fontWeight: 600 }}>{statusLabel[order.status || "delivered"]}</span>
                          </div>
                        </div>
                        <ChevronDown size={20} color={C.muted} style={{ transform: isExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="history-expand-receipt">
                        <div style={{ borderBottom: `1px dashed ${C.border}`, paddingBottom: 12, marginBottom: 12 }}>
                          <h5 style={{ fontSize: 12, fontWeight: 700, color: C.dark, letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 10 }}>Receipt Summary</h5>
                          {order.items.map((item, idx) => (
                            <div key={idx} className="receipt-item-row-desk">
                              <span>{item.emoji} {item.name} (×{item.qty})</span>
                              <span style={{ fontWeight: 600, color: C.dark }}>RM {(item.price * item.qty).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                        <div className="receipt-item-row-desk">
                          <span>Payment Method</span>
                          <span style={{ fontWeight: 600, color: C.dark }}>{order.paymentMethod ? `${order.paymentMethod.emoji} ${order.paymentMethod.name}` : "Touch 'n Go eWallet"}</span>
                        </div>
                        <div className="receipt-item-row-desk">
                          <span>Delivery Address</span>
                          <span style={{ fontWeight: 600, color: C.dark }}>{order.location ? `${order.location.name} (${order.location.detail})` : "Engineering Lab 3"}</span>
                        </div>
                        <div className="receipt-item-row-desk bold">
                          <span>Total Paid</span>
                          <span>RM {order.total.toFixed(2)}</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SAVED LOCATIONS TAB */}
        {activeTab === "locations" && (
          <div style={{ maxWidth: 760 }}>
            <div style={{ ...fl("row", "center", "space-between"), marginBottom: 24 }}>
              <div>
                <h2 style={{ ...P, fontWeight: 700, fontSize: 22, color: C.dark, marginBottom: 4 }}>Saved Locations</h2>
                <span style={{ ...I, fontSize: 14, color: C.textSec }}>Drop-off spots for fast campus delivery</span>
              </div>
              <button onClick={() => setShowAddLoc(true)} className="btn-primary" style={{ height: 40, padding: "0 18px", borderRadius: 10, background: C.primary, color: "#fff", border: "none", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
                + Add Location
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {locations.map(loc => (
                <div key={loc.id} style={{ background: C.white, borderRadius: 18, border: `1px solid ${C.border}`, padding: "20px 24px", ...fl("row", "center", "space-between"), boxShadow: sh(1) }}>
                  <div style={{ ...fl("row", "center", "flex-start", 14) }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: C.pA, ...fl("row", "center", "center"), fontSize: 22 }}>
                      {loc.icon}
                    </div>
                    <div style={{ textAlign: "left" }}>
                      <div style={{ ...I, fontSize: 14, fontWeight: 700, color: C.dark }}>{loc.name}</div>
                      <div style={{ ...I, fontSize: 12, color: C.textSec, marginTop: 3 }}>{loc.detail}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PAYMENT METHODS TAB */}
        {activeTab === "payment" && (
          <div style={{ maxWidth: 760 }}>
            <div style={{ ...fl("row", "center", "space-between"), marginBottom: 24 }}>
              <div>
                <h2 style={{ ...P, fontWeight: 700, fontSize: 22, color: C.dark, marginBottom: 4 }}>Payment Methods</h2>
                <span style={{ ...I, fontSize: 14, color: C.textSec }}>Manage your campus payment cards and wallets</span>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {payments.map(pay => (
                <div key={pay.id} style={{ background: C.white, borderRadius: 18, border: `1px solid ${C.border}`, padding: "20px 24px", ...fl("row", "center", "space-between"), boxShadow: sh(1) }}>
                  <div style={{ ...fl("row", "center", "flex-start", 14) }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: C.pA, ...fl("row", "center", "center"), fontSize: 22 }}>
                      {pay.icon}
                    </div>
                    <div style={{ textAlign: "left" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ ...I, fontSize: 14, fontWeight: 700, color: C.dark }}>{pay.name}</span>
                        {pay.primary && <span style={{ background: C.greenA, color: C.green, fontSize: 10, fontWeight: 700, padding: "1px 6px", borderRadius: 10 }}>Primary</span>}
                      </div>
                      <div style={{ ...I, fontSize: 12, color: C.textSec, marginTop: 3 }}>{pay.detail}</div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Add Payment Method Dashed Card (FR10) */}
              <div 
                onClick={() => setShowAddPay(true)}
                style={{ 
                  background: 'transparent', 
                  borderRadius: 18, 
                  border: `1.5px dashed ${C.border}`, 
                  padding: "20px 24px", 
                  ...fl("row", "center", "center", 10), 
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  minHeight: 88
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = C.primary;
                  e.currentTarget.style.background = C.pA;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = C.border;
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <Plus size={18} color={C.primary} />
                <span style={{ ...I, fontSize: 14, fontWeight: 600, color: C.primary }}>Add Payment Method</span>
              </div>
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === "settings" && (
          <div style={{ maxWidth: 700 }}>
            <h2 style={{ ...P, fontWeight: 700, fontSize: 22, color: C.dark, marginBottom: 24 }}>Settings & Preferences</h2>
            <div style={{ background: C.white, borderRadius: 20, boxShadow: sh(1), border: `1px solid ${C.border}`, overflow: "hidden", marginBottom: 20 }}>
              <div style={{ padding: "20px 24px", borderBottom: `1px solid ${C.border}` }}>
                <div style={{ ...P, fontWeight: 700, fontSize: 15, color: C.dark }}>🔒 Account & Security</div>
              </div>
              <div style={{ padding: "16px 24px", ...fl("row", "center", "space-between") }}>
                <div>
                  <div style={{ ...I, fontSize: 14, fontWeight: 500, color: C.dark, marginBottom: 2 }}>Sign Out</div>
                  <div style={{ ...I, fontSize: 12, color: C.muted }}>Sign out from this session</div>
                </div>
                <button onClick={onLogout} style={{ background: C.redA, border: `1px solid rgba(239,68,68,.3)`, borderRadius: 9, padding: "6px 16px", cursor: "pointer", ...I, fontSize: 12, fontWeight: 600, color: C.red }}>Logout</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ================= MODALS ================= */}

      {/* Add Location Modal */}
      {showAddLoc && (
        <div className="desktop-modal-overlay" onClick={() => setShowAddLoc(false)}>
          <div className="desktop-modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header-desk">
              <h4 className="modal-title-desk">Add Saved Spot</h4>
              <button className="modal-close-btn-desk" onClick={() => setShowAddLoc(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleAddLocationSubmit} style={{ padding: "24px 28px" }}>
              <FieldBlock label="Location Spot Name">
                <InputField icon={<MapPin size={16} color={C.primary} />} value={newLocName} onChange={setNewLocName} placeholder="e.g. Engineering Lab 3" />
              </FieldBlock>
              <FieldBlock label="Specific Details (Seat / Floor / Block)">
                <InputField icon={<span style={{ fontSize: 15 }}>🛋️</span>} value={newLocDetail} onChange={setNewLocDetail} placeholder="e.g. Block B, Level 2 — Table 4" />
              </FieldBlock>
              <div style={{ marginBottom: 20 }}>
                <label style={{ ...I, display: "block", fontSize: 13, fontWeight: 500, color: C.textSec, marginBottom: 8 }}>Select Icon</label>
                <div style={{ ...fl("row", "center", "flex-start", 10) }}>
                  {["🔬", "📚", "🏠", "🏫", "☕", "🛋️"].map(emoji => (
                    <button
                      type="button"
                      key={emoji}
                      onClick={() => setNewLocIcon(emoji)}
                      style={{
                        width: 44, height: 44, borderRadius: 10, border: `1.5px solid ${newLocIcon === emoji ? C.primary : C.border}`,
                        background: newLocIcon === emoji ? C.pA : C.white, fontSize: 20, cursor: "pointer"
                      }}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
              <button className="btn-primary" type="submit" style={{ width: "100%", height: 50, border: "none", borderRadius: 12, background: C.primary, color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
                Save Location
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Payment Modal */}
      {showAddPay && (
        <div className="desktop-modal-overlay" onClick={() => setShowAddPay(false)}>
          <div className="desktop-modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header-desk">
              <h4 className="modal-title-desk">Add Payment Method</h4>
              <button className="modal-close-btn-desk" onClick={() => setShowAddPay(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleAddPaymentSubmit} style={{ padding: "24px 28px" }}>
              <FieldBlock label="Method Name (Bank / Wallet / Card)">
                <InputField icon={<CreditCard size={16} color={C.primary} />} value={newPayName} onChange={setNewPayName} placeholder="e.g. Maybank2u, GrabPay" />
              </FieldBlock>
              <FieldBlock label="Account Description (Number / Username)">
                <InputField icon={<span style={{ fontSize: 15 }}>🔑</span>} value={newPayDetail} onChange={setNewPayDetail} placeholder="e.g. •••• 9402, user@bank" />
              </FieldBlock>
              <div style={{ marginBottom: 20 }}>
                <label style={{ ...I, display: "block", fontSize: 13, fontWeight: 500, color: C.textSec, marginBottom: 8 }}>Select Icon</label>
                <div style={{ ...fl("row", "center", "flex-start", 10) }}>
                  {["💳", "📱", "🏦", "💵"].map(emoji => (
                    <button
                      type="button"
                      key={emoji}
                      onClick={() => setNewPayIcon(emoji)}
                      style={{
                        width: 44, height: 44, borderRadius: 10, border: `1.5px solid ${newPayIcon === emoji ? C.primary : C.border}`,
                        background: newPayIcon === emoji ? C.pA : C.white, fontSize: 20, cursor: "pointer"
                      }}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
              <button className="btn-primary" type="submit" style={{ width: "100%", height: 50, border: "none", borderRadius: 12, background: C.primary, color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
                Save Payment Method
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ═══ APP ROOT ════════════════════════════════════════════════
export default function App() {
  const [page, setPage] = useState("landing");
  const [loggedIn, setLoggedIn] = useState(false);
  const [cart, setCart] = useState({});

  // Central state variables (synchronized, satisfying FR6-FR10 on desktop)
  const [locations, setLocations] = useState(INITIAL_LOCATIONS);
  const [payments, setPayments] = useState(INITIAL_PAYMENTS);
  const [orderHistory, setOrderHistory] = useState(INITIAL_HISTORY);
  const [activeOrder, setActiveOrder] = useState(null);

  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const go = (p) => { setPage(p); window.scrollTo(0, 0); };
  const onLogin = () => { setLoggedIn(true); go("home"); };
  const onLogout = () => { setLoggedIn(false); setCart({}); go("landing"); };
  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  // Cart helper quantities
  const totalQty = Object.values(cart).reduce((a, b) => a + b, 0);
  const totalPrice = Object.entries(cart).reduce((s, [id, q]) => {
    const it = ALL_MENU.find(i => i.id === +id); return s + (it ? it.price * q : 0);
  }, 0);

  // Place Order Action Handler
  const handlePlaceOrder = ({ location, payment, total }) => {
    const orderItems = Object.entries(cart).map(([id, qty]) => {
      const it = ALL_MENU.find(i => i.id === +id);
      return it ? { ...it, qty } : null;
    }).filter(Boolean);

    const newOrder = {
      id: `#CE-${Math.floor(8000 + Math.random() * 999)}`,
      restaurant: "Warung Pak Din",
      items: orderItems,
      total: total,
      date: new Date().toLocaleString('en-US', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true }),
      status: "processing",
      emoji: "🍛",
      paymentMethod: payment,
      location: location,
      currentStep: 2 // Picked Up
    };

    setActiveOrder(newOrder);
    setCart({}); // Empty cart
    go("tracking");
  };

  const advanceOrderStep = (step) => {
    setActiveOrder(prev => prev ? { ...prev, currentStep: step } : null);
  };

  const completeOrder = () => {
    if (!activeOrder) return;
    const completed = { ...activeOrder, status: "delivered" };
    setOrderHistory(prev => [completed, ...prev]);
    setActiveOrder(null);
    go("profile");
  };

  return (
    <div style={{ minHeight: "100vh", fontFamily: "Inter, sans-serif" }}>
      <Navbar page={page} go={go} loggedIn={loggedIn} cartCount={cartCount} />
      
      {page === "landing"    && <LandingPage go={go} />}
      {page === "login"      && <LoginPage go={go} onLogin={onLogin} />}
      {page === "register"   && <RegisterPage go={go} onLogin={onLogin} />}
      {page === "home"       && <BrowsePage go={go} cart={cart} setCart={setCart} />}
      {page === "restaurant" && <RestaurantPage go={go} cart={cart} setCart={setCart} onPlaceOrderTrigger={() => setCheckoutOpen(true)} />}
      {page === "search"     && <SearchPage go={go} cart={cart} setCart={setCart} />}
      {page === "tracking"   && <TrackingPage activeOrder={activeOrder} advanceOrderStep={advanceOrderStep} completeOrder={completeOrder} />}
      {page === "profile"    && (
        <ProfilePage 
          go={go} 
          onLogout={onLogout} 
          orderHistory={orderHistory} 
          locations={locations} 
          payments={payments}
          setLocations={setLocations}
          setPayments={setPayments}
        />
      )}

      {/* Checkout Desktop Overlay Modal */}
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        cart={cart}
        menuItems={ALL_MENU}
        locations={locations}
        payments={payments}
        onPlaceOrder={handlePlaceOrder}
      />
    </div>
  );
}
