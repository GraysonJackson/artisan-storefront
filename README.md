# Atelier Handmade

A warm brutalist e-commerce storefront for handcrafted goods. Raw 1px borders paired with soft, rounded product cards -- the tension between hard structure and tactile warmth drives the whole design.

[Live Demo](https://graysonjackson.github.io/artisan-storefront/)

## What It Does

Browse a catalog of handcrafted ceramics. Click into any product to see color variants; a live swatch picker swaps the product image in real time. Add items to a slide-in cart drawer animated with spring physics. Check out through a Stripe test-mode form.

## Design Decisions

The site is meant to feel like a physical shop. The clay accent color was pulled from product photography to keep the palette cohesive. Product cards use masonry-style variable heights based on image aspect ratio, which reads more organic than a uniform grid.

The cart drawer slides in from the right using spring physics instead of a linear ease. This small detail makes the interaction feel physical rather than digital. The swatch picker on the product detail page swaps the displayed image without a page reload, keeping the browsing experience fluid.

## Tech Stack

- **Next.js 14** -- App Router, server and client components
- **Tailwind CSS** -- Custom clay/sand palette, Playfair Display serif + Inter sans
- **Zustand** -- Lightweight cart state management
- **Framer Motion** -- Cart drawer spring animations and backdrop fade
- **Lucide React** -- Minimal icon set
- **Stripe** -- Test-mode checkout (simulated)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start