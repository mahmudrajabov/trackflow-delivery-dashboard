# TrackFlow — Delivery Dashboard

A modern, responsive delivery-tracking dashboard built with React + Vite + Tailwind CSS.
Fully standalone: demo data (orders & couriers) is seeded into `localStorage` on first run —
no backend or external service is required.

## Live Demo

[Open the live website](https://mahmud-track.netlify.app/)

## Pages

| Route           | Page          | Features                                                                 |
| --------------- | ------------- | ------------------------------------------------------------------------ |
| `/`             | Dashboard     | Stat cards (total / delivered / pending / cancelled), 7-day area chart, status donut, recent orders |
| `/orders`       | Orders        | Search, status filter, table, Create / Edit / Delete (with confirmation) |
| `/orders/:id`   | Order Details | Full details, status stepper, live status change, edit & delete          |
| `/couriers`     | Couriers      | Courier cards, add / edit / delete with confirmation                     |
| `/settings`     | Settings      | Store profile (persisted), notification toggles                          |

## Local development (VS Code)

```bash
npm install
npm run dev      # http://localhost:5173
```

## Production build

```bash
npm run build    # outputs to dist/
npm run preview  # serve the build locally
```

## Deploy to Vercel

1. Push this project to a GitHub repository (or use `vercel` CLI from the project root).
2. In Vercel: **Add New → Project → Import** the repo. Framework preset **Vite** is detected automatically.
3. Deploy — no environment variables are needed. `vercel.json` already contains the SPA
   rewrite so client-side routes (`/orders/…`) work on refresh.

CLI alternative:

```bash
npm i -g vercel
vercel        # preview deploy
vercel --prod # production deploy
```

## Data notes

- Orders and couriers are stored in the browser's `localStorage` (key `trackflow_mock_db_v1`).
- Each visitor gets the seeded demo data; changes (create/edit/delete) persist per browser.
- To reset the demo data, clear the site's storage or remove the key above.
