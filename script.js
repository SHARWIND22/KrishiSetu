const sampleListings = [
  {id:1,crop:"Arecanut",quantity:5,unit:"quintals",location:"Karkala",ask:46000,reference:46200,emoji:"🌰",farmer:"Local farmer"},
  {id:2,crop:"Coconut",quantity:200,unit:"pieces",location:"Udupi",ask:35,reference:38,emoji:"🥥",farmer:"Coastal farm"},
  {id:3,crop:"Paddy",quantity:10,unit:"quintals",location:"Kundapura",ask:2400,reference:2500,emoji:"🌾",farmer:"Green Fields"},
  {id:4,crop:"Cashew",quantity:3,unit:"quintals",location:"DK",ask:8200,reference:7800,emoji:"🥜",farmer:"Hillview farm"},
  {id:5,crop:"Pepper",quantity:2,unit:"quintals",location:"Karkala",ask:61000,reference:60000,emoji:"🫚",farmer:"Malnad growers"}
];
const emojiMap={Arecanut:"🌰",Coconut:"🥥",Paddy:"🌾",Cashew:"🥜",Pepper:"🫚"};
let listings = JSON.parse(localStorage.getItem("krishisetuListings") || "null") || sampleListings;
let offers = JSON.parse(localStorage.getItem("krishisetuOffers") || "[]");
const money = n => "₹" + Number(n).toLocaleString("en-IN");
function getFpi(item){return Number(item.ask)/Number(item.reference)}
function statusFor(fpi){if(fpi<0.9)return {text:"BELOW MARKET",cls:"below"};if(fpi>1.1)return {text:"ABOVE MARKET",cls:"above"};return {text:"FAIR PRICE",cls:"fair"}}
function save(){localStorage.setItem("krishisetuListings",JSON.stringify(listings));localStorage.setItem("krishisetuOffers",JSON.stringify(offers))}
function render(){
 const q=document.getElementById("searchInput").value.toLowerCase().trim(), crop=document.getElementById("cropFilter").value, location=document.getElementById("locationFilter").value;
 const filtered=listings.filter(x=>(!q||(x.crop+" "+x.location).toLowerCase().includes(q))&&(!crop||x.crop===crop)&&(!location||x.location===location));
 document.getElementById("listingGrid").innerHTML=filtered.map(x=>{
  const fpi=getFpi(x), status=statusFor(fpi), diff=((fpi-1)*100);
  return `<article class="listing-card"><div class="crop-art">${x.emoji||emojiMap[x.crop]||"🌱"}<span>${x.location.toUpperCase()}</span></div><div class="listing-content"><div class="listing-title"><div><h3>${x.crop}</h3><p>📍 ${x.location} · ${x.farmer||"Community farmer"}</p></div><span class="pill ${status.cls}">${status.text}</span></div><div class="price-main">${money(x.ask)}<span class="price-unit"> / ${x.unit==="pieces"?"piece":x.unit==="kg"?"kg":"quintal"}</span></div><div class="price-unit">Reference: ${money(x.reference)} per same unit</div><div class="listing-meta"><span>📦 ${x.quantity} ${x.unit}</span><span>Price check ✓</span></div><div class="fpi-line"><span>Fair Price Index</span><strong>${fpi.toFixed(3)} (${diff>0?"+":""}${diff.toFixed(2)}%)</strong></div><div class="card-actions"><button onclick="showPrice(${x.id})">Price details</button><button class="offer-btn" onclick="sendOffer(${x.id})">Make offer ↗</button></div></div></article>`
 }).join("");
 document.getElementById("emptyState").hidden=filtered.length!==0;
 document.getElementById("activeCount").textContent=listings.length;
 document.getElementById("offerCount").textContent=2+offers.length;
 document.getElementById("priceCount").textContent=listings.length;
}
function toast(message){const t=document.getElementById("toast");t.textContent=message;t.classList.add("show");clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>t.classList.remove("show"),2600)}
function showPrice(id){const x=listings.find(a=>a.id===id);if(!x)return;const fpi=getFpi(x),s=statusFor(fpi);alert(`${x.crop} — Fair Price Check\\n\\nFarmer asking price: ${money(x.ask)}\\nReference price: ${money(x.reference)}\\nFPI: ${fpi.toFixed(3)}\\nStatus: ${s.text}\\n\\nReference prices are illustrative demo data, not live market prices.`)}
function sendOffer(id){const x=listings.find(a=>a.id===id);if(!x)return;const raw=prompt(`Make an offer for ${x.crop}\\nAsking price: ${money(x.ask)} per ${x.unit}\\nEnter your offer price in ₹:`);if(raw===null)return;const amount=Number(raw);if(!Number.isFinite(amount)||amount<=0){toast("Enter a valid offer amount.");return}offers.push({id:Date.now(),listingId:id,crop:x.crop,amount,created:new Date().toISOString(),status:"Pending"});save();render();toast(`Offer of ${money(amount)} submitted (demo).`)}
document.getElementById("listingForm").addEventListener("submit",e=>{
 e.preventDefault();
 const crop=document.getElementById("cropName").value, location=document.getElementById("location").value, quantity=Number(document.getElementById("quantity").value), unit=document.getElementById("unit").value, ask=Number(document.getElementById("askPrice").value);
 const refs={Arecanut:46200,Coconut:38,Paddy:2500,Cashew:7800,Pepper:60000};
 if(!crop||!location||quantity<=0||ask<=0){document.getElementById("formMessage").textContent="Please complete all fields with valid values.";return}
 listings.unshift({id:Date.now(),crop,location,quantity,unit,ask,reference:refs[crop],emoji:emojiMap[crop],farmer:"You"});
 save();render();e.target.reset();document.getElementById("formMessage").textContent="Listing published in this browser. Reference price is sample data.";document.getElementById("marketplace").scrollIntoView({behavior:"smooth"});toast("Your produce listing has been published.");
});
["searchInput","cropFilter","locationFilter"].forEach(id=>document.getElementById(id).addEventListener(id==="searchInput"?"input":"change",render));
document.getElementById("langBtn").addEventListener("click",()=>toast("Kannada interface is planned; this prototype is currently in English."));
render();


// Judge Edition: interactive Fair Price Index calculator.
(function(){
  const refs={Arecanut:46200,Coconut:38,Paddy:2500,Cashew:7800,Pepper:60000};
  const crop=document.getElementById("judgeCrop"), ask=document.getElementById("judgeAsk"), ref=document.getElementById("judgeReference");
  if(!crop||!ask||!ref)return;
  function update(){
    const a=Number(ask.value),r=Number(ref.value),fpi=document.getElementById("judgeFpi"),badge=document.getElementById("judgeBadge"),explain=document.getElementById("judgeExplanation"),meter=document.getElementById("judgeMeter");
    if(a<=0||r<=0){fpi.textContent="—";explain.textContent="Enter positive values for both prices.";badge.textContent="CHECK VALUES";return}
    const v=a/r,d=(v-1)*100;
    fpi.textContent=v.toFixed(3);
    let label,cls;
    if(v<.9){label="BELOW MARKET";cls="below"}else if(v>1.1){label="ABOVE MARKET";cls="above"}else{label="FAIR PRICE";cls="fair"}
    badge.className="pill "+cls;badge.textContent=label;
    explain.textContent="The asking price is "+Math.abs(d).toFixed(2)+"% "+(d<0?"below":d>0?"above":"equal to")+" the reference price.";
    meter.style.left=Math.max(2,Math.min(98,v/1.5*100))+"%";
  }
  crop.addEventListener("change",()=>{ref.value=refs[crop.value];update()});
  ask.addEventListener("input",update);ref.addEventListener("input",update);update();
})();
