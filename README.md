# Sidequest Supply

Tabletop accessory shop demonstration built with Next.js 14 static export (`output: "export"`, `basePath: "/artisan-storefront"`), featuring a warm brutalist tavern aesthetic, authentic handcrafted SVG product illustrations, integer-cents calculations, and persistent localStorage cart state.

[Live Demo](https://graysonjackson.github.io/artisan-storefront/)

## Overview

Sidequest Supply is a demonstration of client-side engineering rigor and distinctive visual character. It presents four tabletop accessory goods:
- **Hardwood Dice Vault**: Precision-milled hardwood case with neodymium magnetic closure (Walnut, Cherry, Ebony).
- **Full-Grain Leather Mat**: Heirloom 24"x36" combat surface with embossed 1-inch tactical squares (Cognac Tan, Raven Black).
- **Solid Oak DM Screen**: Three-panel master screen with antiqued brass piano hinges (Rustic Oak, Charcoal Stained).
- **Precision Solid Metal 7-Set**: Balanced zinc-brass alloy dice set with dragon font numerals (Weathered Bronze, Ancient Copper, Obsidian Silver).

## Key Features

1. **Warm Brutalist Tavern Aesthetic**: Handcrafted typography (Cinzel, Plus Jakarta Sans, Space Mono), rich wood and brass tokens, raw dark parchment containers, and zero AI imagery (mathematically authored SVG assets).
2. **Synchronous Variant Selection**: Changing variant finishes synchronously updates SVG rendering, variant label, and integer-cents pricing.
3. **Integer-Cents Financial Math**: All unit prices, multipliers, and cart subtotals are tracked and computed strictly in integer cents (e.g. 6400 cents = $64.00).
4. **Persistent Cart**: Cart state persists in `localStorage` under `sidequest-supply.cart.v1` conforming to `{ items: CartItem[], subtotalInCents: number }`.
5. **Accessible Modal Cart Drawer**: Follows WAI-ARIA dialog semantics (`role="dialog"`, `aria-modal="true"`, focus trap, and Escape key dismiss).
6. **Simulated Checkout & Demo Receipt**: Checkout immediately clears the cart and issues an itemized demo receipt explicitly stating: *"No card was charged and no confirmation email was sent."*
7. **Static Export**: Pre-rendered to `out/` with `basePath: "/artisan-storefront"` for GitHub Pages deployment.

## Tech Stack

- **Next.js 14** (App Router, static HTML export)
- **TypeScript 5**
- **Tailwind CSS 3**
- **Zustand 4** (persistent client store)
- **Vector SVGs** (handcrafted authentic media)

## Building & Verifying

```bash
npm install
npm run build
```
Static files will be exported to `out/`.
