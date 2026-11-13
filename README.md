# Wigs by Jade — storefront preview

A responsive, mobile-first storefront concept using the agreed blush, rose, ivory, bronze and plum palette with vibrant pink accents.

## Current preview status
- Product discovery, category filters, search, product detail preview, wishlist and a local demo bag are implemented.
- Product names, images and prices are placeholders. No actual inventory, ratings or prices are represented as verified business information.
- Checkout, payments, customer accounts, order tracking, live delivery, enquiry delivery and admin product management are not connected yet.
- No orders are being accepted by this preview.

## Firebase backend foundation
The `feature/firebase-backend-foundation` branch contains the initial Firebase configuration and security-rule foundation:
- Firebase project configuration in `firebase.json`
- Firestore access rules in `firestore.rules`
- Storage access rules in `storage.rules`
- Firestore index configuration in `firestore.indexes.json`
- Architecture, collection design, security boundaries and rollout plan in `docs/firebase-architecture.md`

**This is a foundation, not a live backend.** It is not connected to a Firebase project yet. Authentication, image uploads, checkout, payments and order tracking are not active. Review the architecture and cost gates before deploying. Cloud Functions require Blaze, and Cloud Storage bucket billing requirements must be checked before enabling uploads.

## Before launch
1. Get owner approval and verified brand assets, product images, descriptions, prices, lengths, density, stock and policies.
2. Create a dedicated Firebase project and register the website as a web app.
3. Enable Email/Password Authentication, deploy and test Firestore rules, and securely provision the first admin.
4. Connect and test customer authentication and the admin product manager.
5. Confirm Storage and Cloud Functions billing requirements before enabling uploads or server-side checkout.
6. Configure Ghana payment provider credentials and delivery rates only after the merchant account and business policies are confirmed.
7. Test the full customer and admin journeys, add privacy/returns/delivery terms, then deploy and verify the live URL.

## Deployment
The current preview can continue on GitHub Pages. Enable GitHub Pages in **Settings → Pages**, select **Deploy from a branch**, choose **main** and **/(root)**, then save. The Firebase foundation is on its own feature branch and has not been merged into the live site.
