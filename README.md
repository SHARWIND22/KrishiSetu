<div align="center">

# 🌾 KrishiSetu
### Bridging Farmers to Fairer Markets

**A farmer-first marketplace prototype for coastal Karnataka**

[Marketplace](#marketplace) · [Judge Walkthrough](#judge-walkthrough) · [Roadmap](#roadmap)

<br>

> **Built around one simple idea:** farmers deserve clearer price information, more direct buyer connections, and greater control over how they sell their produce.

</div>

---

## 🌱 The Idea

KrishiSetu is a front-end MVP exploring how a digital marketplace could help farmers showcase produce, compare asking prices against a reference price, and interact with potential buyers.

This edition is designed for a quick, hands-on demonstration. It shows the core experience today while clearly separating working prototype features from planned future development.

<a id="marketplace"></a>

## ✨ What You Can Explore

| Feature | What it demonstrates |
|---|---|
| 🧺 **Crop marketplace** | Browse produce listings in a responsive interface. |
| 🔎 **Crop & location filters** | Narrow the marketplace to relevant listings. |
| ➕ **Add a produce listing** | Enter produce details and display a new listing. |
| 📊 **Fair Price Index (FPI)** | See a price-status badge based on an asking price and reference price. |
| 🧮 **Interactive price calculator** | Change the reference and asking prices and observe the FPI status update. |
| 🤝 **Demo buyer offer** | Try the offer interaction on a listing. |
| 💾 **Browser-local persistence** | Listings can persist in the same browser through local storage. |

> **Prototype note:** These features demonstrate a local front-end flow. They do not represent a connected, production marketplace.

<a id="judge-walkthrough"></a>

## 🎤 90-Second Judge Walkthrough

1. **Explore the marketplace** — search for **Arecanut**.
2. **Show price intelligence** — use ₹46,200 as the illustrative reference price and ₹55,000 as the asking price. Explain how the FPI and status change.
3. **Create a listing** — add a sample produce listing and show it in the marketplace.
4. **Try a buyer offer** — choose **Make offer** on a listing and submit a demo offer.
5. **Close with the roadmap** — explain how verified accounts, a shared backend, and dated local market-price data would move the concept toward real-world use.

## 📈 Fair Price Index (FPI)

The prototype uses this simple comparison:

**FPI = Farmer's asking price ÷ Reference market price**

| FPI value | Prototype interpretation |
|---:|---|
| **Below 0.90** | Below reference range |
| **0.90–1.10** | Fair range |
| **Above 1.10** | Above reference range |

**Example:** ₹55,000 ÷ ₹46,200 ≈ **1.19** — above the reference range.

The FPI is an indicative comparison, not a guarantee of the price a farmer should receive. The reference values in this prototype are illustrative and are not live market quotations.

<a id="roadmap"></a>

## 🛣️ What’s Next — Planned Future Modifications

The current website **does not include a login or account system**. The following are proposed enhancements, not features available in this version.

### 🔐 1. Farmer & Buyer Login
- Sign-up and login for farmers and buyers.
- OTP-based phone verification.
- Separate farmer and buyer profiles.
- Verified-user indicators and basic account management.

### ☁️ 2. Shared Backend & Database
- Store listings and offers centrally rather than only in one browser.
- Allow users to access their data across devices.
- Add listing management, validation, and appropriate access controls.

### 📅 3. Local Market-Price Integration
- Integrate dated, location-specific market-price data, such as suitable Agmarknet data where available.
- Show the source, date, market, unit, and crop for reference prices.
- Refresh the FPI using the selected reference data instead of fixed demo values.

### 💬 4. Buyer–Farmer Communication
- Real offer and counter-offer workflows.
- Notifications for new offers and listing updates.
- Potential SMS or messaging integration.

### 🌐 5. Local-Language Experience
- Add a working Kannada interface and review translations with fluent speakers.
- Improve usability for farmers with different levels of digital experience.

### 🧾 6. Trust & Transaction Support
- Stronger listing verification and reporting.
- Clear transaction records and dispute-support workflows.
- Explore secure payment integration only after the backend and user-verification foundations are in place.

## ⚠️ Current Scope & Limitations

To keep the demonstration transparent, please note:

- **No login yet:** authentication, OTP, and user profiles are not implemented.
- **Front-end MVP:** there is no production backend or shared database.
- **Illustrative prices:** reference values are demo values, not live Agmarknet data.
- **Browser-local data:** listings and demo interactions are not shared across devices; persistence depends on the same browser and its local storage.
- **Demo offers only:** offers do not contact a real seller or create a real transaction.
- **Kannada toggle:** the language control is currently a placeholder, not a working translation feature.
- **Not production-ready:** verification, security hardening, live notifications, and payment/transaction processing are not implemented.

## ▶️ Run the Prototype

1. Download or clone this project.
2. Open `index.html` in a modern browser.
3. No installation or build step is required for this front-end demonstration.

## 👥 Team

- **Sharwin Dsilva**
- **Prathik Rodrigues**
- **Sannidhi Shetty**
- **Sanjana Jayaram**

**Mangalore Institute of Technology and Engineering (MITE)**

---

<div align="center">

### 🌾 KrishiSetu
*Making price information clearer. Exploring a more connected marketplace for farmers.*

**Prototype today · Stronger connections tomorrow**

</div>
1. **Explore the marketplace** — search for **Arecanut**.
2. **Show price intelligence** — use ₹46,200 as the illustrative reference price and ₹55,000 as the asking price. Explain how the FPI and status change.
3. **Create a listing** — add a sample produce listing and show it in the marketplace.
4. **Try a buyer offer** — choose **Make offer** on a listing and submit a demo offer.
5. **Close with the roadmap** — explain how verified accounts, a shared backend, and dated local market-price data would move the concept toward real-world use.

## 📈 Fair Price Index (FPI)

The prototype uses this simple comparison:

**FPI = Farmer's asking price ÷ Reference market price**

| FPI value | Prototype interpretation |
|---:|---|
| **Below 0.90** | Below reference range |
| **0.90–1.10** | Fair range |
| **Above 1.10** | Above reference range |

**Example:** ₹55,000 ÷ ₹46,200 ≈ **1.19** — above the reference range.

The FPI is an indicative comparison, not a guarantee of the price a farmer should receive. The reference values in this prototype are illustrative and are not live market quotations.

## 🛣️ What's Next — Planned Future Modifications

The current website **does not include a login or account system**. The following are proposed enhancements, not features available in this version.

### 🔐 1. Farmer & Buyer Login
- Sign-up and login for farmers and buyers.
- OTP-based phone verification.
- Separate farmer and buyer profiles.
- Verified-user indicators and basic account management.

### ☁️ 2. Shared Backend & Database
- Store listings and offers centrally rather than only in one browser.
- Allow users to access their data across devices.
- Add listing management, validation, and appropriate access controls.

### 📅 3. Local Market-Price Integration
- Integrate dated, location-specific market-price data, such as suitable Agmarknet data where available.
- Show the source, date, market, unit, and crop for reference prices.
- Refresh the FPI using the selected reference data instead of fixed demo values.

### 💬 4. Buyer–Farmer Communication
- Real offer and counter-offer workflows.
- Notifications for new offers and listing updates.
- Potential SMS or messaging integration.

### 🌐 5. Local-Language Experience
- Add a working Kannada interface and review translations with fluent speakers.
- Improve usability for farmers with different levels of digital experience.

### 🧾 6. Trust & Transaction Support
- Stronger listing verification and reporting.
- Clear transaction records and dispute-support workflows.
- Explore secure payment integration only after the backend and user-verification foundations are in place.

## ⚠️ Current Scope & Limitations

To keep the demonstration transparent, please note:

- **No login yet:** authentication, OTP, and user profiles are not implemented.
- **Front-end MVP:** there is no production backend or shared database.
- **Illustrative prices:** reference values are demo values, not live Agmarknet data.
- **Browser-local data:** listings and demo interactions are not shared across devices; persistence depends on the same browser and its local storage.
- **Demo offers only:** offers do not contact a real seller or create a real transaction.
- **Kannada toggle:** the language control is currently a placeholder, not a working translation feature.
- **Not production-ready:** verification, security hardening, live notifications, and payment/transaction processing are not implemented.

## ▶️ Run the Prototype

1. Download or clone this project.
2. Open `index.html` in a modern browser.
3. No installation or build step is required for this front-end demonstration.

## 👥 Team

- **Sharwin Dsilva**
- **Prathik Rodrigues**
- **Sannidhi Shetty**
- **Sanjana Jayaram**

**Mangalore Institute of Technology and Engineering (MITE)**

---

<div align="center">

### 🌾 KrishiSetu
*Making price information clearer. Exploring a more connected marketplace for farmers.*

**Prototype today · Stronger connections tomorrow**

</div>
