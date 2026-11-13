# Wigs by Jade — Firebase backend plan

## Project boundary

Create a dedicated Firebase project named **Wigs by Jade**. Do not connect this website to the Firebase projects or databases used by any other brand or project.

## Initial services

- Firebase Authentication: email/password customer sign-up, sign-in and password reset.
- Cloud Firestore: profiles, products, order requests and confirmed orders.
- Firebase Security Rules: public catalogue reads, owner-only profile access, admin-only catalogue management and restricted order access.
- Firebase Storage: product photos, once the project's billing eligibility and storage bucket requirements have been checked.
- Firebase App Check: enable after the web app is registered and tested.

## Firestore collections

### profiles/{uid}
Customer-owned profile fields: displayName, email, createdAt and updatedAt. Customers may update only their display name. They cannot assign themselves an admin role.

### admins/{uid}
An allow-list of administrator accounts. Documents must be provisioned by a trusted project owner in the Firebase console or through a trusted Admin SDK environment. Client-side writes are denied.

### products/{productId}
Catalogue fields: name, slug, description, category, price, currency (GHS), images, variants, stock, active, featured, createdAt and updatedAt. Public visitors can read active products. Only admins can create, update, archive or delete products.

### orderRequests/{requestId}
A signed-in customer may submit a request containing product IDs/options and a note. This is only an enquiry/request basket, not a confirmed order, price quote or payment. Admins can review it.

### orders/{orderId}
Reserved for confirmed orders created by trusted server-side code or an admin. Customers can read only their own orders. Client-side creation is blocked so users cannot forge payment status, totals or order confirmation.

## Admin security

Never expose a Firebase service-account key or Admin SDK credentials in website JavaScript, GitHub, or public repository files. Never allow a customer to edit the admins collection or their own role. Start with one owner-admin UID provisioned from a trusted environment, then test that ordinary customer accounts cannot access admin actions.

## Ghana storefront requirements

- Store all prices as integer pesewas (for example, GH₵125.50 is 12550) to avoid floating-point rounding errors.
- Display prices in GH₵.
- Do not hard-code delivery fees or supported regions until the business owner confirms them.
- Do not integrate a payment provider until the merchant account and approved provider credentials are available.
- Do not display a payment-success screen until the provider has verified the transaction server-side.

## Cost and deployment gates

- Firebase Spark includes no-cost quotas for services such as Authentication and Firestore, but quotas and feature restrictions apply.
- Cloud Functions require the Blaze billing plan.
- Confirm the current billing requirements for the project's Cloud Storage bucket before enabling owner image uploads. If billing is required, do not upgrade or attach a billing account without the account owner's explicit approval.
- Firestore rules and indexes can be deployed independently using the Firebase CLI after the project is created and selected.
- GitHub Pages can continue serving the current preview while backend configuration is being completed.

## Build phases

1. Create the dedicated Firebase project and register its web app.
2. Enable Email/Password Authentication and configure authorised domains.
3. Deploy Firestore rules and create the first admin membership securely.
4. Connect the website to Firebase using the public web-app configuration.
5. Build and test customer registration, login, logout and password reset.
6. Build the admin product manager; test admin/customer permission boundaries.
7. Enable image uploads only after Storage billing is confirmed.
8. Implement validated order creation and payment verification only after selecting a Ghana-supported merchant payment provider and approving any required billing plan.
9. Test the complete customer and admin journeys before enabling real orders.

## Current implementation status

This repository contains the initial Firebase configuration and security-rule foundation. It is not connected to a Firebase project yet. No live authentication, uploads, checkout, payments or order tracking should be advertised until those integrations are deployed and tested.
