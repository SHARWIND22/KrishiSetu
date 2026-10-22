# KrishiSetu — Judge Edition 🌾

A farmer-first marketplace prototype inspired by the KrishiSetu solution proposal for coastal Karnataka.

## What works
- Responsive marketplace with crop and location filters
- Add produce listing
- Fair Price Index (FPI) badge on each listing
- Interactive FPI calculator for judges
- Demo buyer offer interaction
- Browser-local storage for listing persistence
- Transparent roadmap separating working features from proposed capabilities

## 60–90 second judge walkthrough
1. Search for Arecanut in the marketplace.
2. Scroll to **Price intelligence**. Keep reference price at ₹46,200 and change asking price to ₹55,000; show the FPI/status update.
3. Add a produce listing and show it appear in the marketplace.
4. Click **Make offer** on a listing and enter a demo offer.
5. Explain the next step: integrate dated local Agmarknet prices and build a shared backend for real users.

## Fair Price Index
`FPI = farmer asking price / reference market price`
- FPI < 0.90: below market
- 0.90–1.10: fair range
- FPI > 1.10: above market

## Important limitations
This is a front-end MVP, not a production marketplace. Reference prices are illustrative, not live Agmarknet data. Listings/offers are local to the current browser; they are not shared across devices. OTP authentication, backend, live data integration, SMS, verified users, and actual transactions are not implemented. The Kannada toggle is a placeholder.

## Run
Open `index.html` in a modern browser. No installation is needed.

## Team
- Sannidhi Shetty
- Sharwin Dsilva
- Prathik Rodrigues
- Sanjana Jayaram

Mangalore Institute of Technology and Engineering
