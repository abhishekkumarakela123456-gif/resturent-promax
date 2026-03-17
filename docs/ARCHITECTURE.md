# Production Architecture Blueprint

## Multi-Tenancy
- Every operational collection contains `restaurantId` (tenant key).
- Super admin can access all records; restaurant admins are scoped through `tenantScope` middleware.
- Dynamic subdomain routing in Next middleware rewrites `tenant.domain.com` to `/[tenant]` storefront route.

## Data Model
- Users
- Restaurants
- MenuItems
- Orders
- Reservations
- Offers
- Settings
- Notifications

## Security
- JWT access tokens
- Password hashing with bcrypt
- RBAC (`super_admin`, `restaurant_admin`)
- Tenant isolation enforcement middleware

## Order Lifecycle
1. Customer places order from mobile/table/web.
2. API computes taxes and totals.
3. Order persisted with unique order number.
4. Invoice HTML is generated instantly.
5. Email/WhatsApp notifications are dispatched/queued.
6. Admin updates status (`pending`, `preparing`, `delivered`).

## Integrations
- Cloudinary for media storage
- SMTP for emails
- Stripe-ready secret key wiring
- WhatsApp API placeholder for provider adapters

## Scalability Notes
- Add queue worker for notifications and PDF rendering.
- Add caching for menu and settings by subdomain.
- Add replica-set transactions for financial/fulfillment invariants.
