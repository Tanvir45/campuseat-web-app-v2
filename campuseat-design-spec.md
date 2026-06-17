# CampusEat — Complete UI/UX Design Specification
### Web App Prototype · Page-by-Page Reference · v1.0

> **Platform:** Web App (Mobile-First, Responsive up to 1440px)
> **Audience:** Students (Consumer + Delivery Partner) at INTI International University
> **Design Philosophy:** Speed · Trust · Campus Precision

---

## Table of Contents

1. [Design Tokens](#1-design-tokens)
2. [Typography System](#2-typography-system)
3. [Spacing & Grid System](#3-spacing--grid-system)
4. [Elevation & Shadow System](#4-elevation--shadow-system)
5. [Animation & Motion](#5-animation--motion)
6. [Global Component Library](#6-global-component-library)
7. [Page 01 — Landing](#7-page-01--landing)
8. [Page 02 — Auth & Onboarding](#8-page-02--auth--onboarding)
9. [Page 03 — Consumer Home (Discovery)](#9-page-03--consumer-home-discovery)
10. [Page 04 — Restaurant Menu & Cart](#10-page-04--restaurant-menu--cart)
11. [Page 05 — Active Order Tracking](#11-page-05--active-order-tracking)
12. [Page 06 — Delivery Partner Hub](#12-page-06--delivery-partner-hub)
13. [Page 07 — Profile & Campus Settings](#13-page-07--profile--campus-settings)
14. [Consistency Rules & Do / Don't](#14-consistency-rules--do--dont)
15. [Responsive Breakpoints](#15-responsive-breakpoints)

---

## 1. Design Tokens

### 1.1 Color Palette

| Token | Hex | Usage |
|---|---|---|
| `--color-primary` | `#FF6B35` | CTAs, active states, brand highlight |
| `--color-primary-dark` | `#E0531F` | Button hover / pressed state |
| `--color-primary-alpha-10` | `rgba(255,107,53,0.10)` | Icon backgrounds, soft chip fills |
| `--color-primary-alpha-20` | `rgba(255,107,53,0.20)` | Focus rings, card selection glow |
| `--color-dark` | `#1A2A3A` | Deep Indigo — headings, nav bg, cart bar |
| `--color-dark-alpha-06` | `rgba(26,42,58,0.06)` | Hover state on white surfaces |
| `--color-bg` | `#F7F9FC` | App background, input fill |
| `--color-white` | `#FFFFFF` | Card surfaces, modal bg |
| `--color-border` | `#E0E6ED` | Dividers, input default border |
| `--color-text-secondary` | `#64748B` | Body copy, captions |
| `--color-muted` | `#A0AEC0` | Placeholders, disabled text, inactive icons |
| `--color-green` | `#22C55E` | Success, Halal badge, online status |
| `--color-green-alpha` | `rgba(34,197,94,0.12)` | Halal badge bg, Accept Job bg |
| `--color-red` | `#EF4444` | Error, countdown urgency, countdown bar |
| `--color-yellow` | `#FFD700` | Star ratings only |

> **Rule:** Never use `--color-primary` on dark (`#1A2A3A`) backgrounds — use white text on orange instead. Use `--color-primary-alpha-10` for icon containers on white cards.

---

### 1.2 Semantic Color Map

| Context | Background | Text | Border |
|---|---|---|---|
| Primary action (button) | `#FF6B35` | `#FFFFFF` | — |
| Secondary action (outline) | `transparent` | `#1A2A3A` | `#1A2A3A` 1.5px |
| Destructive action | `transparent` | `#EF4444` | `rgba(239,68,68,0.3)` |
| Success badge | `rgba(34,197,94,0.12)` | `#22C55E` | — |
| Warning (expiring timer) | — | `#EF4444` | — |
| Info card | `#F7F9FC` | `#64748B` | `#E0E6ED` |
| Driver header | `#1A2A3A` | `#FFFFFF` | — |
| Input default | `#FFFFFF` | `#1A2A3A` | `1px #E0E6ED` |
| Input focused | `#FFFFFF` | `#1A2A3A` | `1.5px #FF6B35` + glow |
| Input disabled | `#F7F9FC` | `#A0AEC0` | `1px #E0E6ED` |

---

## 2. Typography System

### 2.1 Font Families

```css
--font-display: 'Poppins', sans-serif;   /* Headings, brand name, price, CTA labels */
--font-body:    'Inter',   sans-serif;   /* Body copy, captions, labels, inputs */
```

> **Import:**
> ```html
> <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet"/>
> ```

---

### 2.2 Type Scale

| Name | Font | Weight | Size | Line Height | Usage |
|---|---|---|---|---|---|
| `display-xl` | Poppins | 800 | 32px | 1.2 | Hero headline (Landing) |
| `display-lg` | Poppins | 800 | 28px | 1.2 | Section headline (Landing mobile) |
| `display-md` | Poppins | 800 | 22px | 1.3 | Page titles (Auth steps) |
| `heading-lg` | Poppins | 700 | 20px | 1.3 | Restaurant name hero |
| `heading-md` | Poppins | 700 | 18px | 1.35 | Cart modal title |
| `heading-sm` | Poppins | 700 | 16px | 1.4 | Section label (Home) |
| `heading-xs` | Poppins | 700 | 14px | 1.4 | Card title, nav label |
| `title-md` | Poppins | 600 | 15px | 1.4 | Driver header, profile name |
| `title-sm` | Poppins | 600 | 13px | 1.4 | Menu item name, card name |
| `price-lg` | Poppins | 800 | 15–17px | 1 | Prices in cart |
| `eta-display` | Poppins | 900 | 42px | 1 | ETA number (Tracking) |
| `earnings-display` | Poppins | 900 | 28px | 1 | Driver earnings |
| `body-md` | Inter | 400 | 14px | 1.65 | Description text, onboarding body |
| `body-sm` | Inter | 400 | 13px | 1.55 | Menu item description |
| `body-xs` | Inter | 400 | 12px | 1.5 | Sub-labels, timestamps |
| `label-md` | Inter | 500 | 13–14px | 1.4 | Form labels, filter chips |
| `label-sm` | Inter | 500 | 11–12px | 1.4 | Badges, walk time |
| `caption` | Inter | 400 | 10–11px | 1.4 | Nav labels, meta info |
| `overline` | Inter | 600 | 10px | 1 | Section eyebrows (e.g. "LIMITED TIME") |

> **Rules:**
> - Minimum font size in the app: **10px** (nav labels only)
> - All monetary values use `Poppins` at weight 700 or 800 minimum
> - Never mix Poppins and Inter on the same line unless it's price (Poppins) + unit label (Inter)

---

## 3. Spacing & Grid System

### 3.1 Base Unit

All spacing is derived from an **8px base unit**.

```
4px  — xs   (inline gaps between small items, icon + label)
8px  — sm   (inner card padding base, chip gaps)
12px — md   (list item padding, badge padding vertical)
16px — lg   (card padding, section horizontal gutter)
20px — xl   (page horizontal padding — mobile)
24px — 2xl  (section vertical breathing room)
28px — 3xl  (hero vertical padding)
32px — 4xl  (page section gap)
48px — 5xl  (hero large padding, CTA vertical space)
```

### 3.2 Component-Level Spacing

| Component | Padding | Gap |
|---|---|---|
| Page horizontal gutter | `0 20px` | — |
| Card (restaurant list) | `12px 14px` | — |
| Card (menu item) | `14px` | — |
| Card (job board) | `14px` | — |
| Section header row | `18px 16px 0` | — |
| Bottom nav item | `8px 0` | 2px (icon → dot → label) |
| Primary button | `0 24px` | — |
| Chip / filter pill | `8px 16px` | — |
| Cart row | `12px 0` | — |
| Settings row | `13px 16px` | — |
| Profile header | `18px 18px 28px` | — |

### 3.3 Border Radius System

| Token | Value | Usage |
|---|---|---|
| `--radius-xs` | 6px | Small badge backgrounds |
| `--radius-sm` | 8px | Small buttons, icon containers |
| `--radius-md` | 10–12px | Standard buttons, chips |
| `--radius-lg` | 14px | Cart bar, input fields |
| `--radius-xl` | 16px | Cards (restaurant, menu, job board) |
| `--radius-2xl` | 20px | Filter chips, pill badges |
| `--radius-3xl` | 22px | Cart modal top corners |
| `--radius-phone` | 46px | Phone frame mockup |
| `--radius-circle` | 50% | Avatars, status dots, radio indicators |
| `--radius-toggle` | 17px | Online/Offline toggle track |

---

## 4. Elevation & Shadow System

| Token | Value | Usage |
|---|---|---|
| `--shadow-1` | `0 2px 8px rgba(26,42,58,0.07)` | Resting cards, nav bar |
| `--shadow-2` | `0 4px 20px rgba(26,42,58,0.11)` | Hovered cards, modals |
| `--shadow-3` | `0 8px 32px rgba(26,42,58,0.16)` | Phone frame, drawer open state |
| `--shadow-search` | `0 10px 28px rgba(0,0,0,0.25)` | Hero search bar on dark bg |
| `--shadow-focus-ring` | `0 0 0 3px rgba(255,107,53,0.12)` | Input focus state |
| `--shadow-btn-primary` | `0 4px 12px rgba(255,107,53,0.3)` | Active filter chip |
| `--shadow-driver-toggle` | `0 2px 6px rgba(0,0,0,0.2)` | Toggle knob |

> **Rule:** Shadows always use `rgba(26,42,58,...)` (deep indigo tint) on white/light surfaces, and `rgba(0,0,0,...)` on dark/hero surfaces. Never use pure black box shadows on card components.

---

## 5. Animation & Motion

### 5.1 Keyframes

```css
/* Page entrance — every page component */
@keyframes pageIn {
  from { opacity: 0; transform: translateY(5px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Cart / bottom-sheet slide up */
@keyframes slideUp {
  from { transform: translateY(100%); }
  to   { transform: translateY(0); }
}

/* "Open Now" / "Live" blinking dot */
@keyframes blinkDot {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.25; }
}

/* Driver location ping on map */
@keyframes driverPing {
  0%   { transform: scale(1); opacity: 0.7; }
  100% { transform: scale(2.4); opacity: 0; }
}
```

### 5.2 Transition Standards

| Interaction | Property | Duration | Easing |
|---|---|---|---|
| Button press | `background`, `transform` | 150ms | `ease` |
| Filter chip toggle | `background`, `box-shadow` | 150ms | `ease` |
| Input focus | `border-color`, `box-shadow` | 200ms | `ease` |
| Role/campus selection | `border-color`, `box-shadow` | 200ms | `ease` |
| Cart drawer open | `transform` | 280ms | `ease` |
| Progress bar steps | `background`, `box-shadow` | 400ms | `ease` |
| Driver toggle knob | `left` | 300ms | `ease` |
| Driver toggle track | `background` | 300ms | `ease` |
| Page entrance | `opacity`, `transform` | 200ms | `ease both` |
| Countdown bar | `width` | 1000ms | `linear` |
| Timeline spine fill | `background` | 400ms | `ease` |

---

## 6. Global Component Library

### 6.1 Buttons

#### Primary Button
```
Height:          48px (default) / 40px (sm)
Border-radius:   12px
Background:      #FF6B35
Text:            #FFFFFF, Inter 600, 15px (default) / 13px (sm)
Padding:         0 24px
Hover:           background → #E0531F, transition 150ms
Active/Press:    transform: scale(0.98)
Disabled:        background #E0E6ED, text #A0AEC0, cursor not-allowed
Full-width:      width: 100%
```

#### Outline Button
```
Height:          48px
Border-radius:   12px
Background:      transparent
Border:          1.5px solid #1A2A3A
Text:            #1A2A3A, Inter 600, 15px
Hover:           background rgba(26,42,58,0.05)
```

#### Destructive Button
```
Height:          48px (or padding 14px for full-width)
Border-radius:   12px
Background:      transparent
Border:          1.5px solid rgba(239,68,68,0.3)
Text:            #EF4444, Inter 600, 14px
Hover:           border-color rgba(239,68,68,0.6)
```

#### Icon Button (circle)
```
Size:            36×36px (default) / 34×34px (sm) / 42×42px (driver header)
Border-radius:   10px
Background:      rgba(255,255,255,0.18) on dark bg / --color-primary-alpha-10 on light bg
Border:          none
Icon size:       18px (default) / 17px (sm)
```

#### Accept Job Button (Driver)
```
Height:          44px
Border-radius:   12px
Background:      #22C55E
Text:            #FFFFFF, Poppins 700, 14px
Width:           100%
```

---

### 6.2 Input Fields

#### Smart Input (default)
```
Height:          52px
Border-radius:   14px
Background:      #FFFFFF
Border:          1px solid #E0E6ED
Padding:         0 16px
Gap (icon→text): 10px
Font:            Inter 400, 14px, #1A2A3A
Placeholder:     Inter 400, 14px, #A0AEC0
```
**Focus state:**
```
Border:          1.5px solid #FF6B35
Box-shadow:      0 0 0 3px rgba(255,107,53,0.12)
Transition:      200ms ease
```

#### Hero Search Bar
```
Container:       background #FFFFFF, border-radius 16px
Inner padding:   7px 7px 7px 16px
Box-shadow:      0 10px 28px rgba(0,0,0,0.25)   ← dark hero variant
Layout:          flex row, icon + input flex:1 + button
Button:          background #FF6B35, border-radius 10px, padding 10px 16px
```

#### Form Field Label
```
Font:      Inter 500, 13px, #64748B
Margin-bottom: 8px
Display:   block
```

---

### 6.3 Filter Chips

```
Padding:         8px 16px
Border-radius:   20px (pill)
Border:          none
Font:            Inter 500, 13px

INACTIVE state:
  Background:    #FFFFFF
  Text:          #64748B
  Box-shadow:    0 2px 8px rgba(26,42,58,0.07)

ACTIVE state:
  Background:    #FF6B35
  Text:          #FFFFFF
  Box-shadow:    0 4px 12px rgba(255,107,53,0.30)

Transition:      all 150ms ease
```

---

### 6.4 Cards

#### Restaurant List Card (Home Page)
```
Layout:          flex row
Border-radius:   16px
Background:      #FFFFFF
Box-shadow:      --shadow-1
Margin-bottom:   10px
Overflow:        hidden

IMAGE ZONE (left):
  Width:         88px
  Height:        auto (stretch)
  Background:    restaurant brand color (flat)
  Content:       centered emoji, 34px

INFO ZONE (right):
  Padding:       12px 14px
  Name:          Poppins 700, 13px, #1A2A3A
  Cuisine tag:   Inter 400, 11px, #64748B, margin-bottom 8px
  Meta row:      StarRow + dot + WalkBadge + dot + price range + Halal badge
                 gap 8px, items center
  Closed state:  opacity 0.6, "Closed" badge top-right
```

#### Discovery Card (Horizontal scroll — Landing / Home)
```
Min-width:       158px (prevents collapse in horizontal scroll)
Flex-shrink:     0
Border-radius:   16px
Background:      #FFFFFF
Box-shadow:      --shadow-2
Overflow:        hidden

IMAGE ZONE (top 60%):
  Height:        90px
  Background:    restaurant color (flat)
  Content:       emoji centered, 40px
  Rating badge:  absolute top-right, rgba(0,0,0,0.45) bg, padding 3px 8px,
                 border-radius 20px, Star 10px + Inter 600 10px white

INFO ZONE (bottom 40%):
  Padding:       10px 12px 12px
  Name:          Poppins 600, 12px, #1A2A3A, margin-bottom 2px
  Cuisine:       Inter 400, 11px, #64748B, margin-bottom 8px
  Walk badge:    WalkBadge component
```

#### Menu Item Card (Restaurant Page)
```
Layout:          flex row, items center, space-between
Padding:         14px
Border-radius:   16px
Background:      #FFFFFF
Box-shadow:      --shadow-1
Margin-bottom:   10px

LEFT (text):
  flex: 1, padding-right 12px
  Name row:     Poppins 600, 13px + "🔥 Popular" badge (inline, flex wrap)
  Description:  Inter 400, 11px, #64748B, line-height 1.55, margin-bottom 8px
  Price:        Poppins 800, 15px, #FF6B35

RIGHT (image + qty):
  Image box:    58×58px, border-radius 12px, background primaryAlpha, emoji 30px
  Margin-bottom between image and qty: 8px
  Add button (no items): 30×30px, radius 9px, orange bg, Plus icon 16px
  Qty controls (has items): flex row gap 6px
    - Minus btn: 26×26px, radius 7px, primaryAlpha bg, Minus 13px orange
    - Count:     Inter 700, 14px, min-width 14px, center
    - Plus btn:  26×26px, radius 7px, orange bg, Plus 13px white
```

#### Job Board Card (Driver Page)
```
Border-radius:   16px
Background:      #FFFFFF
Box-shadow:      --shadow-2
Margin-bottom:   12px
Overflow:        hidden

TIMER BAR (top of card):
  Height:        4px
  Track:         #E0E6ED
  Fill:          #FF6B35 (>40% time) or #EF4444 (<40% time)
  Width:         dynamic (seconds/30 * 100%)
  Transition:    width 1s linear

CARD BODY:
  Padding:       14px

  TOP ROW (flex row, space-between):
    Left:   emoji icon box (44×44px, radius 12px, primaryAlpha) +
            pickup name (Poppins 700, 13px) + item count + distance (Inter 400, 11px)
    Right:  Payout badge (Poppins 800, 15px, white on orange bg, radius 10px, padding 6px 12px)

  DROP ROW:
    Background:  #F7F9FC, border-radius 10px, padding 10px 12px
    Content:     MapPin icon (14px, orange) + "Drop: {address}" (Inter 400, 12px)
    Margin-bottom: 12px

  EXPIRES ROW:
    "Expires in" (Inter 400, 12px, textSec) + "{N}s" (Poppins 700, 13px)
    Color:  orange if >10s, red if ≤10s
    Margin-bottom: 10px

  ACCEPT BUTTON:
    See Accept Job Button spec above
```

---

### 6.5 Badges

#### Rating Badge (inline)
```
Content:    Star (11px, #FFD700 filled) + rating text (Inter 600, 11px, dark) + count (Inter 400, 10px, muted)
Gap:        4px
```

#### Rating Badge (on card image — overlay)
```
Background: rgba(0,0,0,0.45)
Padding:    3px 8px
Radius:     20px
Content:    Star (10px, gold) + rating (Inter 600, 10px, white)
Position:   absolute top-right, 8px inset
```

#### Walk Badge
```
Background: rgba(255,107,53,0.12)
Padding:    3px 8px
Radius:     20px
Content:    🚶 emoji (11px) + "{N} walk" (Inter 600, 11px, #FF6B35)
Display:    inline-flex
```

#### Halal Badge
```
Background: rgba(34,197,94,0.12)
Padding:    1px 6px
Radius:     20px
Content:    "✦ Halal" (Inter 600, 9px, #22C55E)
```

#### Popular Badge (menu item)
```
Background: rgba(255,107,53,0.12)
Padding:    2px 7px
Radius:     20px
Content:    "🔥 Popular" (Inter 600, 10px, #FF6B35)
```

#### "Open Now" Live Badge
```
Background: rgba(34,197,94,0.12)
Padding:    4px 10px
Radius:     20px
Content:    blinking dot (6×6px, #22C55E, animation: blinkDot 1.5s infinite) + "Open Now" (Inter 600, 10px, #22C55E)
Gap:        5px
```

#### "LIVE" Map Badge
```
Same as "Open Now" but text "LIVE", blink interval 1s
```

#### Payout Badge (job card)
```
Background: #FF6B35
Padding:    6px 12px
Radius:     10px
Content:    Poppins 800, 15px, white
```

#### Campus Tag (landing)
```
Background: rgba(255,107,53,0.18)
Padding:    4px 14px
Radius:     20px
Content:    Inter 600, 12px, #FF6B35
Display:    inline-flex
```

#### Step Progress Badge (Auth)
```
Content:    "Step N of 3" (Inter 400, 11px, #A0AEC0)
Text-align: center
Margin-top: 10px
```

---

### 6.6 Navigation

#### Bottom Navigation Bar (Consumer)
```
Height:      66px
Background:  #FFFFFF
Border-top:  1px solid #E0E6ED
Layout:      flex row, space-around
Flex-shrink: 0

ITEM (each tab):
  Layout:      flex column, center, gap 2px
  Icon:        22px, color #A0AEC0 (inactive) / #FF6B35 (active)
  Active dot:  4×4px circle, #FF6B35, margin-bottom -2px (between icon and label)
  Label:       Inter, 10px
    Inactive:  weight 400, #A0AEC0, margin-top 4px
    Active:    weight 600, #FF6B35, margin-top 0px

TABS: Home · Discover · Orders · Profile
```

#### Driver Top Header
```
Background:  #1A2A3A
Padding:     44px 18px 18px   ← 44px top = status bar clearance
Flex-shrink: 0

LAYOUT (top row):
  Left:  Avatar (42×42px, radius 11px, orange bg) with status dot (12px, green/muted)
         + greeting text (Inter 400, 10px, rgba(255,255,255,0.55))
         + name (Poppins 700, 14px, white)
  Right: Bell icon button (34×34px, radius 10px, rgba(255,255,255,0.1))

EARNINGS ROW:
  Background:   rgba(255,255,255,0.08)
  Border-radius: 14px
  Padding:      14px
  Left:  "Today's Earnings" label + RM value (Poppins 900, 28px, white) + delta text (green)
  Right: "Deliveries" label + number (Poppins 800, 26px, white)
  Margin-bottom: 14px

TOGGLE ROW:
  Background:   rgba(255,255,255,0.06)
  Border-radius: 14px
  Padding:      14px
  Left:  status text (Poppins 700, 14px, white) + description (Inter 400, 11px)
  Right: toggle control (see Toggle spec below)
```

#### Toggle Control (Online/Offline)
```
Track:
  Width:       68px
  Height:      34px
  Radius:      17px
  OFFLINE bg:  rgba(255,255,255,0.15)
  ONLINE bg:   #22C55E
  Transition:  background 300ms ease

Knob:
  Size:        26×26px
  Radius:      50%
  Background:  #FFFFFF
  Box-shadow:  0 2px 6px rgba(0,0,0,0.2)
  OFFLINE pos: left 4px
  ONLINE pos:  left 38px
  Transition:  left 300ms ease
```

---

### 6.7 Status Bar (Simulated)

```
Height:      44px
Padding:     0 20px
Layout:      flex row, space-between, center

Left:   "9:41" — Inter 600, 13px
Right:  Signal bars (4 bars, widths 3px, heights [8,11,14,17]px, border-radius 1px)
        + "100%" — Inter 600, 12px
        Gap between signal + text: 6px

DARK variant (on colored/dark backgrounds):
  Background:  #1A2A3A (or matches hero bg)
  Text/bars:   white (bars at 80% opacity)

LIGHT variant (on white/bg surfaces):
  Background:  #FFFFFF
  Text/bars:   #1A2A3A (bars solid)
```

---

### 6.8 Progress Stepper (Auth / Order Tracking)

#### Auth Step Progress Bar
```
Layout:       flex row, gap 6px
Each segment: height 4px, border-radius 2px
  PAST step:    flex 2, background #FF6B35
  CURRENT step: flex 3, background #FF6B35
  FUTURE step:  flex 1, background #E0E6ED
Transition:   flex, background 300ms ease
```

#### Order Timeline (Tracking Page)
```
Layout:      flex column (each step = flex row, gap 12px)

CONNECTOR (left):
  Icon container: 20×20px circle
    DONE:    background #FF6B35, CheckCircle icon 12px white
    ACTIVE:  background #FF6B35, box-shadow 0 0 0 4px rgba(255,107,53,0.12)
    PENDING: background #E0E6ED (empty)
  Spine line below (i < 3):
    Width:     2px, height 34px
    DONE:      background #FF6B35
    NOT YET:   background #E0E6ED
    Transition: 400ms ease

TEXT (right):
  Name row:    Inter, 13px
    DONE:      weight 600, #1A2A3A
    PENDING:   weight 400, #A0AEC0
  Timestamp:   Inter 400, 10px, #A0AEC0 (only shown when done)
  Sub-text:    Inter 400, 11px, line-height 1.45
    DONE:      #64748B
    PENDING:   #A0AEC0
  Margin-bottom (if not last): 14px
```

---

### 6.9 Cart Drawer (Bottom Sheet)

```
OVERLAY:
  Background:  rgba(0,0,0,0.52)
  Position:    absolute inset 0
  Z-index:     200

SHEET:
  Background:     #FFFFFF
  Border-radius:  22px 22px 0 0
  Padding:        20px
  Max-height:     70%
  Overflow-y:     auto (hide scrollbar)
  Animation:      slideUp 280ms ease

HANDLE:
  Width:       40px, height 4px, radius 2px
  Background:  #E0E6ED
  Margin:      0 auto 18px

HEADER ROW:
  Left:   "Your Order" Poppins 800, 17px
  Right:  X button (30×30px, radius 8px, bg #F7F9FC)
  Margin-bottom: 16px

DELIVERY LABEL:
  Background:    #F7F9FC, radius 10px, padding 10px 12px
  Content:       MapPin 13px orange + "Deliver to: [bold location]" Inter 12px
  Margin-bottom: 14px

CART ITEM ROW:
  Border-bottom: 1px solid #E0E6ED, padding 12px 0
  Left:    emoji (22px) + item name (Inter 600, 13px) + unit price × qty (Inter 400, 12px, orange)
  Right:   Minus ctrl (24×24px) + count (Inter 700, 13px) + Plus ctrl (24×24px)

PRICE SUMMARY:
  Each row: Inter 13px textSec label + Inter 600 13px value, space-between
  Total row: Poppins 700 15px + Poppins 800 17px orange, margin-top 4px
  Border-bottom: 1px solid #E0E6ED, margin-bottom 14px

CTA BUTTON:
  Full-width, height 50px, border-radius 13px
  Background: #FF6B35, Poppins 700, 15px, white
  Label: "Place Order · RM {total}"
```

---

### 6.10 Floating Cart Bar (Restaurant Page)

```
Position:    in-flow (not fixed), below scroll area
Padding:     10px 14px 16px

BUTTON:
  Width:       100%
  Background:  #1A2A3A
  Border-radius: 14px
  Padding:     14px 18px
  Layout:      flex row, space-between

  LEFT:
    Badge: background #FF6B35, radius 8px, 26×26px, Inter 800 12px white (item count)
    Label: Inter 600, 14px, white — "View Cart"
    Gap:   12px

  RIGHT:
    Poppins 800, 15px, #FF6B35 — total price

Visibility:  only when cart has ≥1 item
```

---

### 6.11 Campus Map SVG

```
ViewBox:     0 0 340 170
Background:  #EEF2F7 (light grey-blue)

PATHWAYS:
  Vertical:    x=100, width=18, full height, fill #D5DDE8
  Horizontal:  y=84, height=18, full width, fill #D5DDE8

GREEN AREAS (parkland):
  2 ellipses with fill #C8E6C9, opacity 0.75

BUILDINGS:
  Rect elements, fill #C0CFDC (default) / #B8CBDB (destination highlight)
  Border-radius: 5 (rx attr)
  Labels: fontSize 8, fontWeight 700, #1A2A3A + sub-label fontSize 7, #64748B

DELIVERY ROUTE:
  SVG path: stroke #FF6B35, strokeWidth 3, strokeDasharray "7,4", strokeLinecap round

DESTINATION PIN:
  Outer circle:  r=11, fill rgba(255,107,53,0.22)
  Inner circle:  r=6.5, fill #FF6B35
  Center dot:    r=2.5, fill white

DRIVER MARKER:
  Ping ring:     r=16, fill rgba(255,107,53,0.15), animation: driverPing 2s ease-out infinite, transform-origin at center
  Driver circle: r=10, fill #FF6B35, stroke white, strokeWidth 2.5
  Emoji label:   🛵, fontSize 9, fill white, text-anchor middle
```

---

### 6.12 Settings List Item

```
Padding:       13px 16px
Border-bottom: 1px solid #E0E6ED (except last)
Layout:        flex row, center, space-between
Cursor:        pointer

LEFT:
  Emoji (fontSize 20px, width 24px, text-align center) +
  Label (Inter 500, 13px, #1A2A3A) +
  Sub-label (Inter 400, 11px, #A0AEC0, margin-top 1px)
  Gap: 10px

RIGHT:
  ChevronRight (16px, #A0AEC0)
```

---

### 6.13 Saved Location Item

```
Padding:       13px 16px
Border-bottom: 1px solid #E0E6ED
Layout:        flex row, center, space-between

LEFT:
  Icon box: 36×36px, radius 10px, primaryAlpha bg, emoji 18px
  Name:     Inter 600, 13px, #1A2A3A
  Detail:   Inter 400, 11px, #64748B, margin-top 2px
  Gap:      10px

RIGHT:
  ChevronRight (16px, #A0AEC0)
```

### 6.14 Payment Method Item

```
Same layout as Settings List Item, with:

LEFT:
  Icon box: 36×36px, radius 10px, bg #F7F9FC, border 1px #E0E6ED, emoji 18px
  Name row: Inter 600, 13px + Primary badge (rgba(34,197,94,0.12) bg, Inter 700, 9px, green)
  Detail:   Inter 400, 11px, #64748B
```

---

## 7. Page 01 — Landing

### Purpose
First impression. Convert visitors to sign-ups. Surface social proof (real campus restaurant data). Establish brand identity.

### Layout Structure

```
┌─────────────────────────────────────┐
│  StatusBar (dark, H:44)             │
├─────────────────────────────────────┤
│                                     │
│  HERO SECTION (bg: #1A2A3A)         │
│  ┌────────────────────────────────┐ │
│  │  Logo row                      │ │
│  │  Campus tag pill               │ │
│  │  H1 headline (3 lines)         │ │
│  │  Subheading body text          │ │
│  │  ┌──────────────────────────┐  │ │
│  │  │ MapPin  [search input]  [Btn]│ │
│  │  └──────────────────────────┘  │ │
│  │  Quick location chips (HScroll)│ │
│  └────────────────────────────────┘ │
│                                     │
│  VALUE PROPS (bg: white, 3-col grid)│
│                                     │
│  TRENDING TODAY (bg: #F7F9FC)       │
│  Section header + horizontal cards  │
│                                     │
│  CTA BLOCK                          │
│  [Primary btn] + [Sign in link]     │
│                                     │
└─────────────────────────────────────┘
```

### Component Inventory

| Zone | Component | Spec |
|---|---|---|
| Top | StatusBar | `dark` variant |
| Hero | Logo mark | 36×36px orange box (radius 10px) + CampusEat logotype |
| Hero | Campus tag | See CampusTag badge spec |
| Hero | H1 | `display-lg` — Poppins 800, 28px, white, line-height 1.22 |
| Hero | Subheading | `body-md` — Inter 400, 14px, rgba(255,255,255,0.62), line-height 1.65 |
| Hero | Search bar | Hero Search Bar spec |
| Hero | Quick chips | 4 pills — rgba(255,255,255,0.11) bg, white text, 12px Inter |
| Hero | BG blobs | 2 circles — top-right 240px, bottom-left 180px, rgba(255,107,53,0.12/0.07) |
| Value props | 3-col grid | emoji (28px) + heading (Poppins 700, 11px) + caption (Inter 400, 10px) |
| Trending | Section header | heading-sm (Poppins 700, 16px) + "See all →" (Inter 600, 12px, orange) |
| Trending | Cards | 3× Discovery Cards (horizontal scroll) |
| CTA | Primary button | "Get Started — It's Free" full-width |
| CTA | Ghost link | "Already have an account? Sign in" — textSec + orange "Sign in" |

### Interaction Patterns

| Trigger | Action |
|---|---|
| Type in search + tap "Find Food" | Navigate → Home (Page 03) |
| Tap any quick chip | Navigate → Home (Page 03) |
| Tap any Trending card | Navigate → Restaurant (Page 04) |
| Tap "Get Started" | Navigate → Auth (Page 02) |
| Tap "Sign in" | Navigate → Auth (Page 02) |

### Hero Decorative Blobs
```
Blob 1: position absolute, top -50px, right -50px, 240×240px circle,
        background rgba(255,107,53,0.12), pointer-events none
Blob 2: position absolute, bottom -60px, left -30px, 180×180px circle,
        background rgba(255,107,53,0.07), pointer-events none
Parent: position relative, overflow hidden
```

### Spacing Detail
```
Hero padding:       28px 22px 48px
Logo margin-bottom: 24px
Campus tag margin-bottom: 16px
H1 margin-bottom:   12px
Body margin-bottom: 28px
Search bar ← 0px margin (sits at bottom of hero space)
Quick chips margin-top: 12px

Value props padding: 26px 22px
3-col grid gap:      8px

Trending padding:   22px 20px
Section header margin-bottom: 14px
Cards gap:          12px

CTA padding:        4px 20px 36px
Buttons gap:        10px
```

---

## 8. Page 02 — Auth & Onboarding

### Purpose
Low-friction sign-up. Dual-role selection. Campus localisation in 3 guided steps.

### Layout Structure

```
┌─────────────────────────────────────┐
│  StatusBar (light, H:44)            │
├─────────────────────────────────────┤
│  HEADER BAR (bg: white)             │
│  Logo centered                      │
│  3-segment progress bar             │
│  "Step N of 3" caption              │
├─────────────────────────────────────┤
│                                     │
│  STEP CONTENT AREA (scrollable)     │
│  Padding: 24px                      │
│                                     │
│  ─ STEP 1: Email entry              │
│    H2 + body                        │
│    Email input field                │
│    Divider "or sign in with"        │
│    University email SSO button      │
│    Primary "Send Code" button       │
│                                     │
│  ─ STEP 2: Role selector            │
│    H2 + body                        │
│    2× Role option cards             │
│    Primary "Continue" button        │
│                                     │
│  ─ STEP 3: Campus picker            │
│    H2 + body                        │
│    5× Campus selection rows         │
│    Primary "Start Exploring" button │
│                                     │
└─────────────────────────────────────┘
```

### Step Progress Bar Detail

```
Container:  flex row, gap 6px, full width
3 segments, each: height 4px, border-radius 2px

Past steps:    flex: 2, background #FF6B35
Current step:  flex: 3, background #FF6B35
Future steps:  flex: 1, background #E0E6ED

All transitions: flex 300ms ease, background 300ms ease
```

### Role Option Card

```
Background:    #FFFFFF
Border-radius: 16px
Padding:       18px
Margin-bottom: 12px

UNSELECTED:
  border: 2px solid #E0E6ED
  box-shadow: --shadow-1

SELECTED:
  border: 2px solid #FF6B35
  box-shadow: 0 4px 16px rgba(255,107,53,0.18)

INNER LAYOUT: flex row, gap 14px
  Left:   Emoji 36px (flex-shrink 0)
  Center: flex 1
    Title:    Poppins 700, 15px, #1A2A3A, margin-bottom 5px
    Desc:     Inter 400, 12px, #64748B, line-height 1.5
  Right:  Radio circle
    Size:     22×22px, border-radius 50%
    UNSEL:    border 2px solid #E0E6ED, bg transparent
    SEL:      border 2px solid #FF6B35, bg #FF6B35
    Inner dot (selected): 7×7px white circle

Transition: border-color, box-shadow 200ms ease
```

### Campus Row

```
Background:    #FFFFFF
Border-radius: 12px
Padding:       14px 16px
Margin-bottom: 10px

UNSELECTED: border 1.5px solid #E0E6ED, box-shadow --shadow-1
SELECTED:   border 1.5px solid #FF6B35, box-shadow 0 4px 12px rgba(255,107,53,0.14)

INNER: flex row, center, space-between
  Left: 🏫 emoji (20px) + name (Inter 500, 14px, #1A2A3A), gap 12px
  Right: Radio indicator (20×20px — same pattern as Role card but smaller)

Transition: border-color, box-shadow 200ms ease
```

### Interaction Patterns

| Trigger | Action |
|---|---|
| Tap "Send Verification Code" | Go to Step 2 |
| Tap "Continue with University Email" button | Go to Step 2 |
| Toggle role card | setRole state, visual update |
| Tap "Continue" (Step 2) | Go to Step 3 |
| Tap campus row | setCampus state, visual update |
| Tap "Start Exploring 🚀" | Navigate → Home |

### Form Validation Note
- Email input: controlled state; border + glow activates when value is non-empty
- Campus: CTA button should be disabled-styled if no campus is selected (prototype: allow click anyway)

---

## 9. Page 03 — Consumer Home (Discovery)

### Purpose
Central discovery surface. Quick access to categories, promotions, and live nearby restaurants.

### Layout Structure

```
┌─────────────────────────────────────┐
│  StatusBar (light, H:44)            │
├─────────────────────────────────────┤
│  TOP BAR (bg: white, border-bottom) │
│  [Loc label + "Engineering Lab 3" ↓]│
│  [Bell btn]  [Avatar]               │
│  [Search bar full-width]            │
├─────────────────────────────────────┤
│  FILTER CHIPS (H:scroll, pad 14px)  │
├─────────────────────────────────────┤
│                                     │
│  PROMO BANNER (orange, radius 16)   │
│  margin: 14px 16px 0                │
│                                     │
│  CATEGORY GRID (4 cols, pad 18px)   │
│  8 category tiles                   │
│                                     │
│  LIVE NEAR YOU (list, pad 18px)     │
│  Section header + Open Now badge    │
│  4× Restaurant List Cards           │
│                                     │
│  [height 16px spacer]               │
│                                     │
├─────────────────────────────────────┤
│  BOTTOM NAV (H:66)                  │
│  Home · Discover · Orders · Profile │
└─────────────────────────────────────┘
```

### Top Bar Detail
```
Padding:       10px 18px 16px
Background:    #FFFFFF
Border-bottom: 1px solid #E0E6ED

TOP ROW (flex row, space-between):
  Left:
    "Delivering to" — Inter 400, 11px, #64748B, margin-bottom 2px
    Location row:   MapPin (14px, orange) + "Engineering Lab 3" (Poppins 700, 14px) + ChevronDown (14px, orange)
    Gap:            4px

  Right (gap 8px):
    Bell button:  36×36px, radius 10px, primaryAlpha bg
                  + notification dot (7×7px, red, border 1.5px white)
    Avatar:       36×36px, radius 10px, orange bg, 👤 emoji 18px

SEARCH BAR:
  background #F7F9FC, radius 12px, border 1px #E0E6ED
  Height: 44px, padding 0 14px
  Content: Search icon (16px, muted) + placeholder (Inter 400, 14px)
  Margin-top: 12px
```

### Promo Banner
```
Margin:        14px 16px 0
Border-radius: 16px
Background:    #FF6B35 (flat)
Padding:       18px
Overflow:      hidden (for decorative emoji)

Decorative: large 🎁 emoji, absolute right -8px top -8px, fontSize 64px, opacity 0.2

Overline:  Inter 600, 10px, rgba(255,255,255,0.75), letter-spacing 0.5px, margin-bottom 5px
Headline:  Poppins 800, 18px, white, margin-bottom 5px
Body:      Inter 400, 12px, rgba(255,255,255,0.82), margin-bottom 14px
Button:    rgba(255,255,255,0.18) bg, 1px solid rgba(255,255,255,0.35) border,
           radius 8px, padding 6px 14px, Inter 600, 12px, white
```

### Category Grid
```
Padding:               18px 16px 0
Section label:         Poppins 700, 14px, margin-bottom 12px
Grid:                  4 columns, gap 8px

CATEGORY TILE:
  Background:    #FFFFFF
  Border-radius: 12px
  Padding:       12px 6px
  Box-shadow:    --shadow-1
  Layout:        flex column, center, gap 6px
  Emoji:         24px
  Label:         Inter 500, 10px, #64748B
  Cursor:        pointer
  On click:      → Restaurant (Page 04)
```

### Live Near You Section
```
Padding:     18px 16px 0
Header row:  Poppins 700, 14px + "Open Now" live badge, space-between
Cards:       4× Restaurant List Card, margin-bottom 10px
```

### Filter Chips Scroll

```
Padding:     14px 16px 0
Overflow-x:  auto (hide scrollbar)
Gap:         8px, no-wrap
Chips:       ["All", "🥩 Halal", "💸 < RM10", "☕ Coffee", "🍟 Fast Food", "🥗 Healthy"]
Active:      1 chip at a time (single-select)
Default:     "All" active
```

### Interaction Patterns

| Trigger | Action |
|---|---|
| Tap filter chip | Switch active filter (visual only in prototype) |
| Tap category tile | Navigate → Restaurant (Page 04) |
| Tap "Claim Now" | Visual feedback only (prototype) |
| Tap restaurant card | Navigate → Restaurant (Page 04) |
| Tap Orders (bottom nav) | Navigate → Tracking (Page 05) |
| Tap Profile (bottom nav) | Navigate → Profile (Page 07) |

---

## 10. Page 04 — Restaurant Menu & Cart

### Purpose
Browse menu, add items, review cart, place order. The primary transaction surface.

### Layout Structure

```
┌─────────────────────────────────────┐
│  StatusBar (H:44, z-index below hero)│
├─────────────────────────────────────┤
│  RESTAURANT HERO (bg: #D97706)      │
│  Back btn [←]     [🔍] [❤️] btns   │
│  Restaurant logo box (60×60)        │
│  Name + cuisine tag + meta row      │
├─────────────────────────────────────┤
│  CATEGORY TABS (sticky, bg white)   │
│  Mains · Sides · Drinks · Combos   │
├─────────────────────────────────────┤
│  MENU ITEMS (scrollable)            │
│  N× Menu Item Cards                 │
│  [height spacer when cart active]   │
├─────────────────────────────────────┤
│  [FLOATING CART BAR — in flow]      │
│  Shown only when cart has items     │
└─────────────────────────────────────┘

── CART MODAL (position absolute) ──
│  OVERLAY (rgba(0,0,0,0.52))         │
│  BOTTOM SHEET slides up             │
│  Handle pill                        │
│  "Your Order" header + X btn        │
│  Delivery location row              │
│  Cart item rows (with ± controls)   │
│  Price summary table                │
│  "Place Order" CTA                  │
└─────────────────────────────────────┘
```

### Restaurant Hero Detail

```
Background:    #D97706 (Warung Pak Din's brand color — flat, no gradient)
Padding:       14px 18px 22px

TOP ROW: flex row, space-between
  Back btn:    rgba(255,255,255,0.2) bg, radius 10px, 36×36px, ArrowLeft 18px white
  Right btns:  2× icon buttons — 🔍 and ❤️ — same styling as Back btn
  Gap:         8px

INFO ROW: flex row, gap 14px
  Logo box:    60×60px, radius 14px, rgba(255,255,255,0.18) bg, centered 🍛 32px emoji
  Info:
    Name:      Poppins 800, 18px, white, margin-bottom 3px
    Cuisine:   Inter 400, 12px, rgba(255,255,255,0.78), margin-bottom 7px
    Meta row:  StarRow (white text) · separator dot · Walk text · pill tag
      Walk:    Inter 400, 11px, rgba(255,255,255,0.85)
      Pill:    Inter 400, 10px, rgba(255,255,255,0.70), bg rgba(255,255,255,0.15), radius 20, padding 2px 8px
```

### Category Tabs

```
Background:    #FFFFFF
Border-bottom: 1px solid #E0E6ED
Layout:        flex row, overflow-x auto (hide scrollbar)
Flex-shrink:   0 (sticky, does not scroll away)

TAB BUTTON:
  Padding:     13px 18px
  Background:  none
  Border:      none
  Font:        Inter, 13px
  Cursor:      pointer
  Whitespace:  nowrap

  INACTIVE: weight 400, color #64748B, border-bottom 2.5px transparent
  ACTIVE:   weight 600, color #FF6B35, border-bottom 2.5px #FF6B35
  Transition: all 150ms ease

TABS: ["Mains", "Sides", "Drinks", "Combos"]
```

### Qty Control States

```
NO ITEMS IN CART:
  Single Add button — 30×30px, radius 9px, orange bg, Plus 16px white

ITEMS IN CART:
  Minus btn | count | Plus btn — inline flex, gap 6px
  Minus: 26×26px, radius 7px, primaryAlpha bg, Minus 13px orange
  Count: Inter 700, 14px, dark, min-width 14px, text-center
  Plus:  26×26px, radius 7px, orange bg, Plus 13px white
```

### Interaction Patterns

| Trigger | Action |
|---|---|
| Tap back [←] | Navigate → Home (Page 03) |
| Tap category tab | Switch active tab, show filtered menu items |
| Tap [+] on item (no cart) | Set item qty to 1, show qty controls |
| Tap [+] on qty control | Increment qty |
| Tap [−] on qty control | Decrement qty (remove if reaches 0) |
| Cart bar appears | When totalQty > 0 |
| Tap "View Cart" | Open cart modal (slideUp animation) |
| Tap overlay | Close cart modal |
| Tap X | Close cart modal |
| Adjust qty inside modal | Updates totals in real time |
| Tap "Place Order" | Close modal, Navigate → Tracking (Page 05) |

### Price Calculation
```
Subtotal:     sum of (item.price × item.qty) for all items
Delivery fee: "FREE" always (prototype)
Platform fee: "RM 0.00" always (prototype)
Total:        = Subtotal (since fees are zero)

Cart bar:  shows totalQty badge + totalPrice
Modal CTA: "Place Order · RM {totalPrice.toFixed(2)}"
```

---

## 11. Page 05 — Active Order Tracking

### Purpose
The USP page. Real-time campus-specific tracking. Community trust through driver identity.

### Layout Structure

```
┌─────────────────────────────────────┐
│  StatusBar (light, H:44)            │
├─────────────────────────────────────┤
│  HEADER BAR (bg: white)             │
│  [←]   "Live Tracking" + order ID  [Phone icon]│
├─────────────────────────────────────┤
│  ETA BANNER (bg: #FF6B35)           │
│  ETA minutes (big) + delivery dest  │
├─────────────────────────────────────┤
│  [SCROLLABLE CONTENT]               │
│                                     │
│  CAMPUS MAP (card, margin 14px)     │
│  "Campus Map" label + LIVE badge    │
│  SVG map illustration               │
│                                     │
│  DRIVER CARD (margin 0 14px)        │
│  Avatar + name + course + rating    │
│  Phone button                       │
│                                     │
│  TIMELINE CARD (margin 14px)        │
│  "Order Progress" label             │
│  4 step rows                        │
│                                     │
│  [height 20px spacer]               │
└─────────────────────────────────────┘
```

### Header Bar

```
Background:    #FFFFFF
Padding:       12px 18px 14px
Border-bottom: 1px solid #E0E6ED
Layout:        flex row, space-between, center

Left:    ArrowLeft button (bg none, no border, cursor pointer), ArrowLeft 20px dark
Center:
  "Live Tracking" — Poppins 700, 14px, #1A2A3A
  "#CE-2024-8841" — Inter 400, 11px, #A0AEC0
Right:   Phone icon button, Phone 20px orange
```

### ETA Banner

```
Background:  #FF6B35 (flat)
Padding:     20px

LEFT:
  "Estimated arrival" — Inter 400, 11px, rgba(255,255,255,0.7), margin-bottom 3px
  ETA number — Poppins 900, 42px, white, line-height 1
  "minutes" — Inter 400, 13px, rgba(255,255,255,0.8)

RIGHT:
  "Delivering to" — Inter 400, 10px, rgba(255,255,255,0.65), margin-bottom 4px
  Location — Poppins 700, 13px, white
  Sub-location — Inter 400, 11px, rgba(255,255,255,0.65)

ETA progression (auto-advancing every 4s):
  Step 0 → 20 min
  Step 1 → 14 min
  Step 2 → 8 min
  Step 3 → 2 min
```

### Campus Map Card

```
Margin:        14px
Border-radius: 16px
Background:    #FFFFFF
Box-shadow:    --shadow-2
Overflow:      hidden

CARD HEADER:
  Padding:     12px 14px 10px
  Left:  "Campus Map" — Poppins 600, 13px, #1A2A3A
  Right: LIVE badge (see badge spec)

SVG MAP:
  Width:  100%, height 170px, display block
  (See SVG spec in Section 6.11)
```

### Driver Card

```
Margin:        0 14px
Background:    #FFFFFF
Border-radius: 16px
Padding:       14px
Box-shadow:    --shadow-1
Layout:        flex row, center, space-between

LEFT (gap 12px):
  AVATAR (position relative):
    50×50px, radius 13px, orange bg, 👨‍🎓 26px emoji
    Status dot: 13×13px, radius 50%, green bg, border 2px white, absolute bottom-right

  INFO:
    Name:   Poppins 700, 14px, #1A2A3A
    Course: Inter 400, 11px, #64748B, margin-top 2px — "2nd Year · Computer Science 🎓"
    Rating: StarRow, margin-top 5px — "4.95" + "(187 rides)"

RIGHT:
  Phone button: 42×42px, radius 11px, greenAlpha bg, 1.5px green border, Phone 17px green
```

### Order Timeline

```
(See Section 6.8 Order Timeline for full spec)

STEP LABELS:
  Step 0: "Order Confirmed"  / "Warung Pak Din received your order"
  Step 1: "Being Prepared"   / "Your Nasi Lemak is being cooked fresh"
  Step 2: "Picked Up"        / "Ali is heading your way!"
  Step 3: "Arriving Soon"    / "2 min away · Approaching Engineering Lab"

AUTO-ADVANCE:
  Starting at step 2
  setTimeout 4000ms → advance to step 3
  Stops at step 3 (final state)
```

---

## 12. Page 06 — Delivery Partner Hub

### Purpose
Student courier's workspace. Toggle availability. Accept time-sensitive jobs. Track earnings gamification.

### Layout Structure

```
┌─────────────────────────────────────┐
│  DRIVER TOP HEADER (bg: #1A2A3A)    │
│  [no StatusBar — header starts at 0]│
│  Padding-top: 44px (status bar safe)│
│  Avatar + name / Bell icon          │
│  Earnings row                       │
│  Online/Offline toggle row          │
├─────────────────────────────────────┤
│  [SCROLLABLE CONTENT]               │
│                                     │
│  ── ONLINE STATE ──                 │
│  Section header "Available Jobs"    │
│  + "N nearby" chip                  │
│  3× Job Board Cards (with timers)   │
│                                     │
│  ── OFFLINE STATE ──                │
│  😴 Illustration                    │
│  "You're offline" heading + body    │
│  "Go Online Now" green button       │
│                                     │
│  STATS ROW (3 tiles, always visible)│
│  💰 RM 124 / 📦 34 / ⭐ 4.95       │
│                                     │
│  [height 16px spacer]               │
└─────────────────────────────────────┘
```

### Offline Empty State

```
Padding:    48px 32px
Text-align: center

Emoji:    😴, font-size 64px, margin-bottom 16px
Heading:  Poppins 700, 18px, #1A2A3A, margin-bottom 8px
Body:     Inter 400, 14px, #64748B, line-height 1.6, margin-bottom 28px
CTA:      green bg, #FFFFFF text, Poppins 700, 15px, radius 12px, padding 14px 32px
```

### Stats Tile

```
Grid:          3 columns, gap 10px, padding 0 14px 14px

TILE:
  Background:    #FFFFFF
  Border-radius: 12px
  Padding:       14px 8px
  Text-align:    center
  Box-shadow:    --shadow-1

  Emoji:  20px, margin-bottom 6px
  Value:  Poppins 700, 16px, #1A2A3A
  Label:  Inter 400, 10px, #64748B, margin-top 2px
```

### Job Timer Logic

```
State:    { 1: 28, 2: 12, 3: 7 }   ← initial seconds
Interval: 1000ms (runs only when online)
On tick:  each key: value > 0 ? value - 1 : 30   (resets to 30 on expire)

TIMER BAR COLOR:
  > 40% remaining:  #FF6B35
  ≤ 40% remaining:  #EF4444

EXPIRES TEXT COLOR:
  > 10s:  #FF6B35
  ≤ 10s:  #EF4444
```

### Interaction Patterns

| Trigger | Action |
|---|---|
| Tap toggle (offline) | setOnline(true), start interval, show job board |
| Tap toggle (online) | setOnline(false), clear interval, show empty state |
| Tap "Go Online Now" | Same as toggle tap (online) |
| Tap "Accept Job" | Visual feedback only (prototype) |

---

## 13. Page 07 — Profile & Campus Settings

### Purpose
Personal hub. Micro-location management. Payment control. Role switching. Settings access.

### Layout Structure

```
┌─────────────────────────────────────┐
│  StatusBar (light, H:44)            │
├─────────────────────────────────────┤
│  PROFILE HEADER (bg: #1A2A3A)       │
│  "My Profile" + Settings icon btn   │
│  Avatar (68×68) + name + email      │
│  + campus/year tag                  │
│  Stats grid (3×1 — Orders/Deliveries/Saved)│
├─────────────────────────────────────┤
│  [SCROLLABLE CONTENT]               │
│                                     │
│  ROLE SWITCHER CARD                 │
│  (margin 14px, orange-tinted border)│
│                                     │
│  SAVED LOCATIONS CARD               │
│  (margin 0 14px, white card)        │
│  3 location rows + "+ Add" action   │
│                                     │
│  PAYMENT HUB CARD                   │
│  (margin 0 14px 12px)               │
│  3 payment rows + "Add" dashed btn  │
│                                     │
│  SETTINGS LIST CARD                 │
│  (margin 0 14px 12px)               │
│  5 settings rows                    │
│                                     │
│  SIGN OUT BUTTON                    │
│  (margin 0 14px 28px)               │
│                                     │
├─────────────────────────────────────┤
│  BOTTOM NAV (H:66) active: Profile  │
└─────────────────────────────────────┘
```

### Profile Header Detail

```
Background:  #1A2A3A
Padding:     18px 18px 28px

TOP ROW:
  "My Profile" — Poppins 700, 15px, white
  Settings button — 34×34px, radius 10px, rgba(255,255,255,0.1) bg, Settings 17px 80%-white

AVATAR + INFO ROW: flex row, gap 14px
  Avatar block (position relative):
    68×68px, radius 18px, orange bg, 👨‍🎓 34px emoji
    Verified badge: 20×20px green circle, border 3px dark bg, "✓" text 9px white
  Info:
    Name:   Poppins 800, 19px, white, margin-bottom 3px
    Email:  Inter 400, 12px, rgba(255,255,255,0.7), margin-bottom 8px
    Campus tag: rgba(255,107,53,0.22) bg, radius 20px, padding 4px 12px
               Inter 600, 11px, #FF6B35 — "🎓 INTI · CS Year 2"

STATS GRID (3 cols, gap 10px, margin-top 18px):
  Each tile: rgba(255,255,255,0.10) bg, radius 12px, padding 12px, text-center
    Emoji:  16px, margin-bottom 4px
    Value:  Poppins 800, 17px, white
    Label:  Inter 400, 10px, rgba(255,255,255,0.6)
```

### Role Switcher Card

```
Margin:        14px
Background:    rgba(255,107,53,0.08)
Border-radius: 16px
Padding:       14px
Border:        1.5px solid rgba(255,107,53,0.25)
Layout:        flex row, center, space-between

LEFT (gap 10px):
  Icon box:  40×40px, radius 11px, primaryAlpha bg, 🛵 22px emoji
  Title:     Poppins 700, 13px, #1A2A3A
  Sub:       Inter 400, 11px, #64748B, margin-top 2px

RIGHT:
  "Switch" button: orange bg, white text, Inter 700, 12px, radius 10px, padding 8px 16px
  On tap: Navigate → Driver (Page 06)
```

### Micro-Location Manager Card

```
Margin:        0 14px (margin-bottom 12px)
Background:    #FFFFFF
Border-radius: 16px
Box-shadow:    --shadow-1
Overflow:      hidden

CARD HEADER: padding 14px 16px 12px, border-bottom 1px #E0E6ED, flex space-between
  Left:  "📍 Saved Locations" — Poppins 700, 13px
  Right: "+ Add" — Inter 600, 12px, #FF6B35, cursor pointer

3 LOCATION ROWS: (see Saved Location Item spec, Section 6.13)
  Engineering Lab 3  / Block B, Level 2 — Seat 14  / 🔬
  Library Study Spot / Level 3, East Wing Table 7   / 📚
  Hostel Room D-211  / Block D, Room D-211           / 🏠
```

### Payment Hub Card

```
Margin:        0 14px (margin-bottom 12px)
Same structure as Settings List card

CARD HEADER: "💳 Payment Methods" — Poppins 700, 13px

3 PAYMENT ROWS: (see Payment Method Item spec, Section 6.14)
  Touch 'n Go eWallet / •••• 3821  / 📱 / "Primary" badge
  Maybank2u           / •••• 9402  / 🏦 / no badge
  Cash on Delivery    / Pay when food arrives / 💵 / no badge

ADD BUTTON ROW: padding 13px 16px, centered
  Dashed outline button: border 1.5px dashed #E0E6ED, radius 10px, padding 10px 20px
  Text: Inter 600, 13px, #FF6B35 — "+ Add Payment Method"
```

### Settings List Card
```
5 rows (see Settings List Item spec):
  🔔 Notifications     / All alerts enabled
  🌐 Language          / Bahasa Malaysia / English
  🔒 Privacy & Security / Face ID · 2FA on
  ⭐ Rate the App      / Share feedback with us
  ❓ Help & Support    / FAQs · Live chat
```

### Sign Out Button
```
Width:         100% (inside padding 0 14px 28px container)
Background:    transparent
Border:        1.5px solid rgba(239,68,68,0.30)
Border-radius: 12px
Padding:       14px
Font:          Inter 600, 14px, #EF4444
```

---

## 14. Consistency Rules & Do / Don't

### 14.1 Color Rules

| ✅ DO | ❌ DON'T |
|---|---|
| Use `#FF6B35` for primary actions only | Use orange for decorative elements with no action |
| Use `#1A2A3A` for nav bars & structural elements | Mix indigo and orange text on the same line |
| Use `rgba(255,107,53,0.12)` for icon containers on white | Use full orange as card background in consumer views |
| Use `#22C55E` and green-alpha only for success/Halal | Use green for CTAs outside the Driver "Accept" context |
| Keep destructive buttons (Sign Out) as outline only | Use red as background on any button |
| Use muted `#A0AEC0` for inactive icons & placeholders | Use dark `#1A2A3A` for secondary/disabled text |

### 14.2 Typography Rules

| ✅ DO | ❌ DON'T |
|---|---|
| Use Poppins for all headings, prices, earnings, CTA button labels | Use Poppins for body text or descriptions |
| Use Inter for all body, labels, captions, badges | Use Inter for headings or section titles |
| Use weight 800+ for all monetary values | Use weight 400 on any price or amount |
| Keep body text at Inter 400, 13–14px minimum | Go below 10px for any visible UI text |
| Match font weight to semantic importance | Use bold decoratively without semantic meaning |

### 14.3 Spacing Rules

| ✅ DO | ❌ DON'T |
|---|---|
| Use 16px as the standard horizontal card gutter | Use inconsistent paddings across similar section types |
| Use 14px padding for all card interiors | Mix 12px and 16px padding in the same card type |
| Maintain 10–12px gap between list items | Let cards touch each other (always margin-bottom 10–12px) |
| Keep page horizontal padding at 20px for hero sections | Nest padding inside already-padded containers |
| Use 14px margin for full-width cards | Use `margin: auto` on single-column card groups |

### 14.4 Component Rules

| ✅ DO | ❌ DON'T |
|---|---|
| Always show Halal badge for halal restaurants | Display Halal badge on non-halal certified places |
| Always include WalkBadge on restaurant/discovery cards | Show only distance without walk time on campus |
| Use StarRow consistently (icon + rating + count) | Show rating number without the star icon |
| Keep cart bar in-flow (not position fixed) | Use `position: fixed` for cart bar (breaks on iOS) |
| Use `position: absolute` for cart modal within page container | Use `position: fixed` for overlays in the prototype |
| Keep all cards at `border-radius: 16px` | Mix 12px and 16px radius in the same card list |
| Keep all primary buttons at `height: 48px` | Use varying heights for the same button type |
| Use `box-shadow: --shadow-1` for resting cards | Use colored shadows (except on chips/buttons with active state) |

### 14.5 Interaction Rules

| ✅ DO | ❌ DON'T |
|---|---|
| Use 150ms transition for hover/tap states | Use transitions slower than 300ms for simple hover |
| Use 280ms `ease` for cart drawer slide-up | Snap overlays without animation |
| Animate timeline steps at 400ms | Instantly jump timeline steps |
| Persist cart state across tab switches on Page 04 | Reset cart on tab/category change |
| Reset page entrance animation (`pageIn`) on every page mount | Skip entrance animation on navigation |
| Auto-advance tracking steps via `setTimeout` | Use `setInterval` for single-fire step advances |

### 14.6 Icon Rules

| Context | Icon | Size | Color |
|---|---|---|---|
| Bottom nav (inactive) | Home/Search/Package/User | 22px | `#A0AEC0` |
| Bottom nav (active) | — | 22px | `#FF6B35` |
| Location (all) | MapPin | 13–16px | `#FF6B35` |
| Back navigation | ArrowLeft | 18–20px | white (on hero) / `#1A2A3A` (on white) |
| Notification bell | Bell | 17–18px | `#FF6B35` (consumer) / rgba(255,255,255,0.75) (driver) |
| Star rating | Star | 10–12px | `#FFD700` filled |
| Phone/Call | Phone | 17–20px | `#22C55E` (driver card) / `#FF6B35` (tracking header) |
| Close modal | X | 15px | `#64748B` |
| Settings | Settings | 17px | rgba(255,255,255,0.8) |
| Chevrons (nav list) | ChevronRight | 16px | `#A0AEC0` |
| Location dropdown | ChevronDown | 14px | `#FF6B35` |
| Zap (job count) | Zap | 11px | `#FF6B35` |
| CheckCircle (timeline) | CheckCircle | 12px | `#FFFFFF` |
| Plus/Minus (cart) | Plus/Minus | 11–16px | white (Plus) / `#FF6B35` (Minus) |

---

## 15. Responsive Breakpoints

> The prototype is built **Mobile-First** at 390px. Below are expansion rules for tablet and desktop.

| Breakpoint | Width | Layout Change |
|---|---|---|
| `xs` (default) | 390px | Single column, phone-frame prototype |
| `sm` | 480px | Max-width 480px, centred, same layout |
| `md` | 768px | 2-column restaurant grid on Home; sidebar filter on left |
| `lg` | 1024px | 3-column restaurant grid; cart as persistent right panel (Restaurant page) |
| `xl` | 1280px | Tracking page: map left 55% / details right 45% split |
| `2xl` | 1440px | Max content width 1200px, outer padding increases |

### Key Responsive Adaptations

**Home Page (md+):**
- Filter chips move to left sidebar
- Restaurant cards expand to 2-column grid
- Category grid becomes 8-column single row

**Restaurant Page (lg+):**
- Cart becomes persistent right panel (320px wide), no floating bar
- Menu categories become left sidebar
- Menu items fill center column

**Tracking Page (xl+):**
- Campus map fills left 55% of screen (tall, rich version)
- Driver card + timeline stack in right 45%
- ETA banner becomes top strip across full width

**Driver Hub (md+):**
- Job cards arrange in 2-column grid
- Earnings + stats display as top dashboard row
- Toggle becomes header bar toggle on the right

**General Rules:**
- Touch targets stay minimum 44×44px at all breakpoints
- Font sizes do not scale below mobile spec at any breakpoint
- Horizontal scroll containers (chips, discovery cards) become grid at md+
- Bottom nav hides at lg+ and is replaced by left sidebar navigation

---

*CampusEat Design Specification · v1.0 · 2026*
*INTI International University · GoGlobal Innovators Challenge 2026*
*Design: Tangerine Orange (#FF6B35) · Deep Indigo (#1A2A3A) · Off-White (#F7F9FC)*
