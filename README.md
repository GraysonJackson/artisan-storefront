# Atelier Handmade — Artisan Storefront

A warm brutalist e-commerce storefront for handcrafted goods. The design pairs raw 1px borders with soft, rounded product cards — the tension between hard structure and tactile warmth is the whole point.

## What It Does

Browse a catalog of handcrafted ceramics. Click into any product to see color variants with a live swatch picker that swaps the product image in real time. Add items to a slide-in cart drawer animated with Framer Motion spring physics. Check out through a Stripe test-mode form.

## Tech Stack

- **Next.js 14** — App Router, server and client components
- **Tailwind CSS** — Custom clay/sand palette, Playfair Display serif + Inter sans
- **Zustand** — Lightweight cart state management
- **Framer Motion** — Cart drawer spring animations and backdrop fade
- **Lucide React** — Minimal icon set (cart, plus, minus, close)
- **Stripe** — Test-mode checkout (simulated, no backend required)

## Design Decisions

I wanted the site to feel like a physical shop — warm colors, generous whitespace, and real typographic hierarchy rather than generic card layouts. The clay accent color was pulled from the product photography to keep the palette cohesive. Product cards use masonry-style variable heights based on image aspect ratio, which reads as more organic than a uniform grid.

The cart drawer slides in from the right with spring physics instead of a linear ease. This small detail makes the interaction feel physical rather than digital. The swatch picker on the product detail page swaps the displayed image without a page reload, keeping the browsing experience fluid.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## About This Project

Atelier Handmade is a fully functional e-commerce storefront built as a portfolio piece to demonstrate product-focused web design. I created this project to explore the intersection of raw structural elements (hard borders, clean grid layouts) with warm, organic aesthetics (clay color palette, serif typography, generous whitespace). The goal was to make a small-product catalog feel like a curated shop rather than a generic template — every visual decision was made to build a feeling of intentionality and craft.

## Build and Run

```bash
npm run build
npm start
```

---

## Presentation Guidelines

### Case Study Summary

This project demonstrates visual design sensibility applied to a commercial context. The core challenge was making a small-product e-commerce site feel crafted rather than templated — using restrained color, intentional typography, and physical-feeling interactions to communicate brand quality.

### What to Highlight in an Interview

- **The tension between structure and warmth.** Hard 1px borders with rounded corners and earthy tones create visual interest without relying on gradients or shadows.
- **The swatch picker.** A simple CSS/image swap that reads as high-craft interaction design. It required no animation library — just thoughtful state management.
- **Cart drawer physics.** Framer Motion spring animations make a standard UI pattern feel deliberate and physical.
- **Typography choices.** Playfair Display for product names, Inter for UI chrome. Serif headings signal craft; sans-serif body text keeps things scannable.

### Design Problem

How do you make a four-product catalog feel like a curated shop instead of a demo? Every visual decision — color, type scale, spacing, interaction — was made to build that feeling of intentionality.

### Constraint

I deliberately avoided product photography and used placeholder images. The design had to work without relying on beautiful photography to carry the visual weight — the layout, type, and color needed to do that work on their own.