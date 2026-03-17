# Restaurant ProMax - Multi-Tenant White-Label SaaS

Production-oriented monorepo implementing a multi-restaurant SaaS platform.

## Architecture
- `apps/api`: Express + MongoDB backend with JWT, RBAC, tenant isolation, orders, menu, reservations, settings, offers, analytics, QR generation, and notification pipelines.
- `apps/web`: Next.js + Tailwind + Framer Motion frontend for:
  - Dynamic tenant websites (`[tenant]`)
  - Mobile scan-and-order flow
  - Super-admin control center
  - Restaurant admin panel modules

## Core Features Delivered
- Multi-tenant restaurant provisioning
- Super-admin dashboard and tenant management
- Tenant storefront pages and menu
- QR code menu endpoint and table-aware URLs
- Online order flow, status updates, and automatic invoice HTML generation
- Notification pipeline (email + WhatsApp queue event)
- Settings-driven theme, sections, payment and invoice preferences
- Analytics aggregation endpoints
- Role-based and tenant-scoped API access control

## Quick Start
1. Install dependencies
   ```bash
   npm install
   ```
2. Configure `.env` using `.env.example`.
3. Run both services
   ```bash
   npm run dev
   ```

## API Surface
- `POST /api/auth/login`
- `GET /api/public/restaurant/:subdomain`
- `GET /api/public/qr/:subdomain?table=A1`
- Super admin:
  - `GET /api/super/dashboard`
  - `POST /api/super/restaurants`
  - `PATCH /api/super/restaurants/:id/status`
- Tenant-scoped:
  - `/api/menu`
  - `/api/orders`
  - `/api/reservations`
  - `/api/offers`
  - `/api/settings`
  - `/api/analytics`

## Production Notes
- Add Redis + queue workers for notification retries and background jobs.
- Wire Stripe/Razorpay intents in payment service.
- Render invoice HTML to PDF using Puppeteer/Playwright worker.
- Add monitoring, audit logs, and full integration tests.
