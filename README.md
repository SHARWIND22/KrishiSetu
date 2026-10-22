# KrishiSetu 🌾
### Direct Market Access Platform for Farmers

KrishiSetu is a hackathon MVP concept designed to connect smallholder farmers directly with buyers and improve transparency in agricultural pricing, inspired by the KrishiSetu solution proposal.

## Problem
Smallholder farmers can have limited access to buyers, locally relevant price information, and trust signals during produce transactions.

## Solution
KrishiSetu presents a simple marketplace where farmers can publish produce listings, compare asking prices with reference prices, and receive offers from buyers.

## Prototype features
- Farmer dashboard and sample produce listings
- Add produce listing form
- Buyer marketplace with crop and location filters
- Fair Price Index (FPI) calculation
- Below-market, fair-price, and above-market indicators
- Buyer offer submission flow
- Browser Local Storage for listings and offers
- Responsive desktop and mobile layout

## Fair Price Index
`FPI = farmer asking price / reference market price`

The demo uses configurable thresholds:
- FPI < 0.90: below market
- 0.90 ≤ FPI ≤ 1.10: fair price
- FPI > 1.10: above market

All reference prices shown in this prototype are illustrative demo values, not live Agmarknet prices.

## Run locally
1. Download or clone this repository.
2. Open `index.html` in a modern browser.
3. Add a listing, search the marketplace, and test the offer button.

No server or package installation is needed.

## Important limitations
This is a front-end prototype. Listings and offers are stored only in the current browser. It does not implement real OTP authentication, shared multi-user data, live Agmarknet integration, real SMS notifications, or actual transactions. The Kannada toggle is a placeholder for future localization.

## Proposed future development
- React + Vite Progressive Web App
- Node.js + Express API
- PostgreSQL + PostGIS
- Agmarknet data integration and scheduled price updates
- Kannada localization and voice input
- Offline support and secure authentication
- Verified identities, ratings, and transaction notifications

## Team
- Sannidhi Shetty
- Sharwin Dsilva
- Prathik Rodrigues
- Sanjana Jayaram

**Institution:** Mangalore Institute of Technology and Engineering  
**Project:** KrishiSetu
