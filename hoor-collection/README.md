# Hoor Collection — Ultra-Luxury Pakistani Fashion Platform

Category-defining luxury digital flagship for **Hoor Collection**, featuring pure organic silks, hand-finished appliqué embroidery, fluid kaftans, and bespoke bridal wear.

---

## Quick Start

Simply open `index.html` in any modern web browser (Google Chrome, Microsoft Edge, Safari, Firefox):

```bash
# Direct file path:
c:\Users\dell\Desktop\Hoor Collection Main\hoor-collection\index.html
```

- **Zero dependencies**: No Node.js server, npm installs, or build scripts needed.
- **Instant load time**: Fast client-side rendering with persistent localStorage.

---

## Real Product Inventory

| # | Dress | Fabric & Silhouette | Price (PKR / USD / AED / GBP) | Assets |
|---|---|---|---|---|
| **1** | **Premium Viscose Kaftan** *(Ethnic Edition)* | Pure Viscose with heavy embroidery & premium appliqué | Rs. 15,990 / $58 / AED 212 / £46 | 6 photos |
| **2** | **Raw Silk 2PC Set** *(Kaftan & Trouser)* | Premium Raw Silk, minimalist luxury 52" silhouette | Rs. 12,990 / $47 / AED 172 / £37 | 4 photos |
| **3** | **Viscose Long Shirt & Plazo 2PC** | Pure Viscose shirt with embroidered Raw Silk Plazo | Rs. 14,990 / $54 / AED 199 / £43 | 5 photos + Video |
| **4** | **Premium Viscose Kaftan** *(Signature)* | Pure Viscose signature edition with heavy embroidery | Rs. 15,990 / $58 / AED 212 / £46 | 13 photos + Video |
| **5** | **Khuda Baksh Silk Chunnari 3PC** *(Bridal)* | Pure Silk Chunnari, Kora Dabka & crushed silk sharara | Rs. 31,590 / $114 / AED 418 / £91 | 3 photos + Video |

---

## Configuring Your WhatsApp Business Number

1. Open `js/data.js` in your editor.
2. Locate line 156:
   ```javascript
   const CONFIG = {
     whatsappNumber: '923001234567', // <-- Replace with your WhatsApp number (no '+' or spaces)
   ```
3. Save the file. All **"Order via WhatsApp"**, **"Inquire with Atelier"**, and **Cart Checkout** buttons will automatically route to your WhatsApp number with pre-filled order payloads.

---

## Directory & File Structure

```
hoor-collection/
├── index.html                     # Main application entry point & shell
├── README.md                      # Documentation & configuration guide
├── styles/
│   └── main.css                   # Complete luxury design system (2,100+ lines)
├── js/
│   ├── data.js                    # Product database, state, cart, & WhatsApp logic
│   └── app.js                     # SPA router, PDP gallery, modals, & animations
└── images/
    └── products/
        ├── dress-1/               # 6 high-res photos
        ├── dress-2/               # 4 high-res photos
        ├── dress-3/               # 5 high-res photos + video.mp4
        ├── dress-4/               # 13 high-res photos + video.mp4
        └── dress-5/               # 3 high-res photos + video.mp4
```

---

## Core Features & Luxury Engineering

1. **SPA Routing**: Seamless instant navigation between `#home`, `#listing`, `#product/[slug]`, `#lookbook`, `#about`, and `#contact`.
2. **Dual-Layer Custom Cursor**: Outer trailing gold ring + inner precision dot that reacts dynamically to interactive elements.
3. **Interactive Stitching Matrix**: Allows clients to select *Ready-to-Wear* (with standard S/M/L/XL sizing and size chart modal) or *Custom Tailoring* with 6 custom body measurements (**Bust**, **Waist**, **Hips**, **Shirt Length**, **Sleeves**, **Shoulder**).
4. **WhatsApp Order Generator**: Encodes SKU, title, tailoring preference, custom dimensions, quantity, customer details, and total price into formatted WhatsApp payloads.
5. **Multi-Currency System**: Instant switching between **PKR (Rs.)**, **USD ($)**, **AED**, and **GBP (£)** across the entire catalog and cart.
6. **3D Card Perspective Tilt**: Smooth physics-based tilt and hover transitions on all product cards.
7. **Runway Video Previews**: Embedded HD fashion clips for dresses with live runway movement.
