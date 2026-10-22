# Proposed System Architecture

This is the proposed target architecture, not the current prototype implementation.

```text
Farmer PWA / Buyer PWA / Admin
            |
       API Gateway
            |
    Node.js / Express API
      |      |      |
  Listings Offers Price Service
      |      |      |
  PostgreSQL + PostGIS -- Redis cache
            |
      Daily price import
            |
   Agmarknet / data.gov.in
```

Production concerns: validate data server-side; date and source every price; display stale-data warnings; implement authentication and privacy controls before exposing contact details; test price methodology with farmers and local market experts.
