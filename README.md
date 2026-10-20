# Sidequest Supply

A fictional tabletop accessory catalog with licensed real photographs, product variants, search/category/sort controls, a persistent cart, and a simulated checkout.

[Visit the shop](https://graysonjackson.github.io/artisan-storefront/)

```sh
npm ci
npm test
npm run lint
npm run build
```

Use Node 24. Next.js exports into `out/` under `/artisan-storefront/`, with directory-index product and checkout routes. Serve the export under that project path to test direct loads. GitHub Actions publishes `out/`; `next start` is not a static-export preview.

Cart persistence stores only product IDs, variant IDs, and bounded integer quantities. Prices come from the current catalog and calculations use cents. New carts start empty. Checkout collects sample details, snapshots the receipt, and clears the cart without contacting a payment or email service. Free delivery, prices, and availability are demonstration values.

See [ASSET_CREDITS.md](ASSET_CREDITS.md) and the public photo-credit page for real image sources, creators, and licenses. No synthetic product artwork or generated photography is included.
