// ==========================================
// KrishiSetu - Farmer Marketplace
// ==========================================

// Sample marketplace listings
const sampleListings = [
    {
        id: 1,
        crop: "Arecanut",
        quantity: 5,
        unit: "quintals",
        location: "Karkala",
        ask: 46000,
        reference: 46200,
        emoji: "🌰",
        farmer: "Local farmer"
    },
    {
        id: 2,
        crop: "Coconut",
        quantity: 200,
        unit: "pieces",
        location: "Udupi",
        ask: 35,
        reference: 38,
        emoji: "🥥",
        farmer: "Coastal farm"
    },
    {
        id: 3,
        crop: "Paddy",
        quantity: 10,
        unit: "quintals",
        location: "Kundapura",
        ask: 2400,
        reference: 2500,
        emoji: "🌾",
        farmer: "Green Fields"
    },
    {
        id: 4,
        crop: "Cashew",
        quantity: 3,
        unit: "quintals",
        location: "DK",
        ask: 8200,
        reference: 7800,
        emoji: "🥜",
        farmer: "Hillview farm"
    },
    {
        id: 5,
        crop: "Pepper",
        quantity: 2,
        unit: "quintals",
        location: "Karkala",
        ask: 61000,
        reference: 60000,
        emoji: "🫚",
        farmer: "Malnad growers"
    }
];

// Crop emoji mapping
const emojiMap = {
    Arecanut: "🌰",
    Coconut: "🥥",
    Paddy: "🌾",
    Cashew: "🥜",
    Pepper: "🫚"
};

// Load saved listings and offers
let listings =
    JSON.parse(localStorage.getItem("krishisetuListings") || "null")
    || sampleListings;

let offers =
    JSON.parse(localStorage.getItem("krishisetuOffers") || "[]");

// Format currency using Indian numbering
const money = n =>
    "₹" + Number(n).toLocaleString("en-IN");

// ==========================================
// FAIR PRICE INDEX
// ==========================================

// Calculate Fair Price Index
function getFpi(item) {
    return Number(item.ask) / Number(item.reference);
}

// Determine price status
function statusFor(fpi) {
    if (!Number.isFinite(fpi)) {
        return {
            text: "PRICE UNAVAILABLE",
            cls: "below"
        };
    }

    if (fpi < 0.9) {
        return {
            text: "BELOW MARKET",
            cls: "below"
        };
    }

    if (fpi > 1.1) {
        return {
            text: "ABOVE MARKET",
            cls: "above"
        };
    }

    return {
        text: "FAIR PRICE",
        cls: "fair"
    };
}

// ==========================================
// SAVE DATA
// ==========================================

function save() {
    localStorage.setItem(
        "krishisetuListings",
        JSON.stringify(listings)
    );

    localStorage.setItem(
        "krishisetuOffers",
        JSON.stringify(offers)
    );
}

// ==========================================
// RENDER MARKETPLACE
// ==========================================

function render() {
    const q = document
        .getElementById("searchInput")
        .value.toLowerCase()
        .trim();

    const crop = document
        .getElementById("cropFilter")
        .value;

    const location = document
        .getElementById("locationFilter")
        .value;

    const filtered = listings.filter(x =>
        (
            !q ||
            (x.crop + " " + x.location)
                .toLowerCase()
                .includes(q)
        ) &&
        (!crop || x.crop === crop) &&
        (!location || x.location === location)
    );

    document.getElementById("listingGrid").innerHTML =
        filtered.map(x => {
            const fpi = getFpi(x);
            const status = statusFor(fpi);
            const diff = (fpi - 1) * 100;

            return `
                <article class="listing-card">

                    <div class="crop-art">
                        ${x.emoji || emojiMap[x.crop] || "🌱"}
                        <span>${x.location.toUpperCase()}</span>
                    </div>

                    <div class="listing-content">

                        <div class="listing-title">
                            <div>
                                <h3>${x.crop}</h3>
                                <p>
                                    📍 ${x.location} ·
                                    ${x.farmer || "Community farmer"}
                                </p>
                            </div>

                            <span class="pill ${status.cls}">
                                ${status.text}
                            </span>
                        </div>

                        <div class="price-main">
                            ${money(x.ask)}
                            <span class="price-unit">
                                / ${
                                    x.unit === "pieces"
                                        ? "piece"
                                        : x.unit === "kg"
                                            ? "kg"
                                            : "quintal"
                                }
                            </span>
                        </div>

                        <div class="price-unit">
                            Reference: ${money(x.reference)}
                            per same unit
                        </div>

                        <div class="listing-meta">
                            <span>
                                📦 ${x.quantity} ${x.unit}
                            </span>
                            <span>Price check ✓</span>
                        </div>

                        <div class="fpi-line">
                            <span>Fair Price Index</span>
                            <strong>
                                ${fpi.toFixed(3)}
                                (${diff > 0 ? "+" : ""}${diff.toFixed(2)}%)
                            </strong>
                        </div>

                        <div class="card-actions">
                            <button onclick="showPrice(${x.id})">
                                Price details
                            </button>

                            <button
                                class="offer-btn"
                                onclick="sendOffer(${x.id})"
                            >
                                Make offer ↗
                            </button>
                        </div>

                    </div>
                </article>
            `;
        }).join("");

    document.getElementById("emptyState").hidden =
        filtered.length !== 0;

    document.getElementById("activeCount").textContent =
        listings.length;

    document.getElementById("offerCount").textContent =
        2 + offers.length;

    document.getElementById("priceCount").textContent =
        listings.length;
}

// ==========================================
// NOTIFICATION MESSAGE
// ==========================================

function toast(message) {
    const t = document.getElementById("toast");

    t.textContent = message;
    t.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(() => {
        t.classList.remove("show");
    }, 2600);
}

// ==========================================
// IMPROVED FARMER PRICE ANALYSIS
// ==========================================

function showPrice(id) {
    const x = listings.find(a => a.id === id);

    if (!x) return;

    const fpi = getFpi(x);
    const s = statusFor(fpi);

    // Validate the prices and quantity.
    if (
        !Number.isFinite(fpi) ||
        !Number.isFinite(Number(x.quantity)) ||
        Number(x.quantity) <= 0 ||
        Number(x.ask) <= 0 ||
        Number(x.reference) <= 0
    ) {
        alert("Price analysis is unavailable because the listing contains invalid values.");
        return;
    }

    // Calculate the estimated value of the entire crop lot.
    const expectedRevenue =
        Number(x.quantity) * Number(x.ask);

    const referenceValue =
        Number(x.quantity) * Number(x.reference);

    const difference =
        expectedRevenue - referenceValue;

    const differencePercent =
        (fpi - 1) * 100;

    let recommendation;

    if (fpi < 0.9) {
        recommendation =
            "Your asking price is substantially below the reference price. Consider comparing offers from other buyers before accepting.";
    } else if (fpi > 1.1) {
        recommendation =
            "Your asking price is above the reference price. Check buyer demand and compare competing prices before finalizing.";
    } else {
        recommendation =
            "Your asking price is within the prototype's fair-price range. Compare buyer offers and consider quality, transport costs, and demand before deciding.";
    }

    const priceUnit =
        x.unit === "pieces"
            ? "piece"
            : x.unit === "kg"
                ? "kg"
                : "quintal";

    const report =
        `${x.crop} — FARMER PRICE ANALYSIS\n\n` +

        `Location: ${x.location}\n` +
        `Quantity: ${x.quantity} ${x.unit}\n\n` +

        `ASKING PRICE DETAILS\n` +
        `Asking price: ${money(x.ask)} per ${priceUnit}\n` +
        `Reference price: ${money(x.reference)} per ${priceUnit}\n` +
        `Fair Price Index: ${fpi.toFixed(3)}\n` +
        `Price difference: ${differencePercent >= 0 ? "+" : ""}${differencePercent.toFixed(2)}%\n` +
        `Price status: ${s.text}\n\n` +

        `ESTIMATED CROP LOT VALUE\n` +
        `At asking price: ${money(expectedRevenue)}\n` +
        `At reference price: ${money(referenceValue)}\n` +
        `Difference: ${difference >= 0 ? "+" : "-"}${money(Math.abs(difference))}\n\n` +

        `FARMER RECOMMENDATION\n` +
        `${recommendation}\n\n` +

        `IMPORTANT DISCLAIMER\n` +
        `Reference prices are illustrative demo data, not live market prices. These figures are estimated sale values, not guaranteed earnings or profit. Actual results may vary.`;

    alert(report);
}

// ==========================================
// BUYER MAKE-OFFER FEATURE
// ==========================================

function sendOffer(id) {
    const x = listings.find(a => a.id === id);

    if (!x) return;

    const raw = prompt(
        `Make an offer for ${x.crop}\n` +
        `Asking price: ${money(x.ask)} per ${x.unit}\n` +
        `Enter your offer price in ₹:`
    );

    if (raw === null) return;

    const amount = Number(raw);

    if (!Number.isFinite(amount) || amount <= 0) {
        toast("Enter a valid offer amount.");
        return;
    }

    offers.push({
        id: Date.now(),
        listingId: id,
        crop: x.crop,
        amount: amount,
        created: new Date().toISOString(),
        status: "Pending"
    });

    save();
    render();

    toast(`Offer of ${money(amount)} submitted (demo).`);
}

// ==========================================
// ADD NEW FARMER LISTING
// ==========================================

document
    .getElementById("listingForm")
    .addEventListener("submit", e => {
        e.preventDefault();

        const crop =
            document.getElementById("cropName").value;

        const location =
            document.getElementById("location").value;

        const quantity =
            Number(document.getElementById("quantity").value);

        const unit =
            document.getElementById("unit").value;

        const ask =
            Number(document.getElementById("askPrice").value);

        // Illustrative reference prices.
        const refs = {
            Arecanut: 46200,
            Coconut: 38,
            Paddy: 2500,
            Cashew: 7800,
            Pepper: 60000
        };

        const message =
            document.getElementById("formMessage");

        if (
            !crop ||
            !location ||
            !Number.isFinite(quantity) ||
            quantity <= 0 ||
            !Number.isFinite(ask) ||
            ask <= 0 ||
            !refs[crop]
        ) {
            message.textContent =
                "Please complete all fields with valid values.";

            return;
        }

        listings.unshift({
            id: Date.now(),
            crop: crop,
            location: location,
            quantity: quantity,
            unit: unit,
            ask: ask,
            reference: refs[crop],
            emoji: emojiMap[crop],
            farmer: "You"
        });

        save();
        render();

        e.target.reset();

        message.textContent =
            "Listing published in this browser. Reference price is sample data.";

        document
            .getElementById("marketplace")
            .scrollIntoView({
                behavior: "smooth"
            });

        toast("Your produce listing has been published.");
    });

// ==========================================
// SEARCH AND FILTERS
// ==========================================

[
    "searchInput",
    "cropFilter",
    "locationFilter"
].forEach(id => {
    const element = document.getElementById(id);

    element.addEventListener(
        id === "searchInput" ? "input" : "change",
        render
    );
});

// ==========================================
// LANGUAGE BUTTON
// ==========================================

document
    .getElementById("langBtn")
    .addEventListener("click", () => {
        toast(
            "Kannada interface is planned; this prototype is currently in English."
        );
    });

// ==========================================
// INTERACTIVE FAIR PRICE INDEX CALCULATOR
// ==========================================

(function () {
    const refs = {
        Arecanut: 46200,
        Coconut: 38,
        Paddy: 2500,
        Cashew: 7800,
        Pepper: 60000
    };

    const crop =
        document.getElementById("judgeCrop");

    const ask =
        document.getElementById("judgeAsk");

    const ref =
        document.getElementById("judgeReference");

    // Skip the calculator if its HTML elements are absent.
    if (!crop || !ask || !ref) return;

    function update() {
        const a = Number(ask.value);
        const r = Number(ref.value);

        const fpi =
            document.getElementById("judgeFpi");

        const badge =
            document.getElementById("judgeBadge");

        const explain =
            document.getElementById("judgeExplanation");

        const meter =
            document.getElementById("judgeMeter");

        if (
            ask.value.trim() === "" ||
            ref.value.trim() === "" ||
            !Number.isFinite(a) ||
            !Number.isFinite(r) ||
            a <= 0 ||
            r <= 0
        ) {
            fpi.textContent = "—";

            explain.textContent =
                "Enter positive values for both prices.";

            badge.className = "pill below";
            badge.textContent = "CHECK VALUES";

            meter.style.left = "2%";

            return;
        }

        const v = a / r;
        const d = (v - 1) * 100;

        fpi.textContent = v.toFixed(3);

        let label;
        let cls;

        if (v < 0.9) {
            label = "BELOW MARKET";
            cls = "below";
        } else if (v > 1.1) {
            label = "ABOVE MARKET";
            cls = "above";
        } else {
            label = "FAIR PRICE";
            cls = "fair";
        }

        badge.className = "pill " + cls;
        badge.textContent = label;

        explain.textContent =
            "The asking price is " +
            Math.abs(d).toFixed(2) +
            "% " +
            (
                d < 0
                    ? "below"
                    : d > 0
                        ? "above"
                        : "equal to"
            ) +
            " the reference price.";

        meter.style.left =
            Math.max(2, Math.min(98, v / 1.5 * 100)) + "%";
    }

    crop.addEventListener("change", () => {
        if (refs[crop.value]) {
            ref.value = refs[crop.value];
        }

        update();
    });

    ask.addEventListener("input", update);
    ref.addEventListener("input", update);

    update();
})();

// ==========================================
// INITIALIZE APPLICATION
// ==========================================

render();
// KrishiSetu AI Crop Selling Assistant
(function () {
    function addSellingAssistant() {
        if (document.getElementById("ai-selling-assistant")) return;

        // Illustrative reference prices aligned with the sample marketplace units.
        const referencePrices = {
            Arecanut: 46200, // per quintal
            Coconut: 38,    // per piece
            Paddy: 2500,    // per quintal
            Cashew: 7800,   // per quintal
            Pepper: 60000   // per quintal
        };

        const cropUnits = {
            Arecanut: "quintal",
            Coconut: "piece",
            Paddy: "quintal",
            Cashew: "quintal",
            Pepper: "quintal"
        };

        const assistant = document.createElement("section");
        assistant.id = "ai-selling-assistant";
        assistant.style.cssText = `
            max-width: 650px;
            margin: 30px auto;
            padding: 24px;
            border-radius: 16px;
            background: #f0fdf4;
            color: #14532d;
            border: 1px solid #bbf7d0;
            font-family: Arial, sans-serif;
            box-sizing: border-box;
        `;

        assistant.innerHTML = `
            <h2>🌾 AI Crop Selling Assistant</h2>
            <p>Get a price-based recommendation before negotiating with buyers.</p>

            <label for="ai-crop">Crop name</label>
            <select id="ai-crop"
                style="width:100%;padding:10px;margin:8px 0 14px;box-sizing:border-box">
                <option value="Arecanut">Arecanut</option>
                <option value="Coconut">Coconut</option>
                <option value="Paddy">Paddy</option>
                <option value="Cashew">Cashew</option>
                <option value="Pepper">Pepper</option>
            </select>

            <label id="ai-asking-label" for="ai-asking">Your asking price (₹ per quintal)</label>
            <input id="ai-asking" type="number" value="46000" min="0" step="any"
                style="width:100%;padding:10px;margin:8px 0 14px;box-sizing:border-box">

            <label id="ai-reference-label" for="ai-reference">Reference price (₹ per quintal)</label>
            <input id="ai-reference" type="number" value="46200" readonly
                style="width:100%;padding:10px;margin:8px 0 14px;box-sizing:border-box;background:#f8fafc">

            <button id="ai-analyze" type="button"
                style="padding:12px 18px;background:#15803d;color:white;border:0;border-radius:8px;cursor:pointer">
                Analyze My Price
            </button>

            <div id="ai-result" aria-live="polite" style="margin-top:18px"></div>

            <p style="font-size:12px;color:#64748b">
                Prototype recommendation using illustrative reference prices, not live market data.
                This is not a guarantee of the best selling price.
            </p>
        `;

        const marketplace = document.querySelector("main") ||
                            document.querySelector(".container") ||
                            document.body;
        marketplace.appendChild(assistant);

        const cropInput = document.getElementById("ai-crop");
        const askingInput = document.getElementById("ai-asking");
        const referenceInput = document.getElementById("ai-reference");
        const result = document.getElementById("ai-result");

        function updateCropReference() {
            const crop = cropInput.value;
            const unit = cropUnits[crop];
            referenceInput.value = referencePrices[crop];
            document.getElementById("ai-asking-label").textContent =
                `Your asking price (₹ per ${unit})`;
            document.getElementById("ai-reference-label").textContent =
                `Reference price (₹ per ${unit})`;

            // Set a sensible starting asking price for the selected crop.
            askingInput.value = referencePrices[crop];
            result.innerHTML = "";
        }

        cropInput.addEventListener("change", updateCropReference);

        document.getElementById("ai-analyze").addEventListener("click", function () {
            const crop = cropInput.value;
            const asking = Number(askingInput.value);
            const reference = Number(referenceInput.value);

            if (!crop || askingInput.value.trim() === "" ||
                !Number.isFinite(asking) || !Number.isFinite(reference) ||
                asking <= 0 || reference <= 0) {
                result.innerHTML = "<p>Please enter a valid positive asking price.</p>";
                return;
            }

            const index = (asking / reference) * 100;
            const difference = asking - reference;
            const formatMoney = value => "₹" + Math.round(value).toLocaleString("en-IN");
            const unit = cropUnits[crop];

            let recommendation;
            if (index < 90) {
                recommendation = "Your asking price is substantially below the reference. Compare buyer offers and consider negotiating before accepting.";
            } else if (index < 100) {
                recommendation = "Your asking price is below the reference. Compare buyer offers and consider negotiating.";
            } else if (index <= 110) {
                recommendation = "Your asking price is within the prototype's fair-price range. Compare offers, crop quality, transport costs and payment terms.";
            } else {
                recommendation = "Your asking price is above the reference. Check buyer demand and compare actual offers before deciding whether to adjust it.";
            }

            result.innerHTML = `
                <div style="background:white;padding:18px;border-radius:12px;border:1px solid #bbf7d0">
                    <h3>📊 ${crop} Price Analysis</h3>
                    <p><b>Fair Price Index:</b> ${index.toFixed(1)}%</p>
                    <p><b>Your asking price:</b> ${formatMoney(asking)} per ${unit}</p>
                    <p><b>Reference price:</b> ${formatMoney(reference)} per ${unit}</p>
                    <p><b>Difference:</b> ${difference >= 0 ? "+" : "−"}${formatMoney(Math.abs(difference))} per ${unit}</p>
                    <hr>
                    <h3>💡 Selling Recommendation</h3>
                    <p>${recommendation}</p>
                </div>
            `;
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", addSellingAssistant);
    } else {
        addSellingAssistant();
    }
})();
