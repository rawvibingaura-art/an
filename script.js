// ================= HERO TYPING =================
const text = "AYUSH NANDI";
const afterText = ", a video editor";

function typeEffect() {
  const typingEl = document.querySelector(".typing");
  const afterEl  = document.querySelector(".after-text");

  if (!typingEl || !afterEl || typingEl.dataset.done) return;

  let index = 0, afterIndex = 0;

  function type() {
    if (index < text.length) {
      typingEl.textContent += text.charAt(index++);
      setTimeout(type, 80);
    } else if (afterIndex < afterText.length) {
      afterEl.textContent += afterText.charAt(afterIndex++);
      setTimeout(type, 60);
    } else {
      typingEl.dataset.done = "true";
    }
  }
  type();
}

// ================= MAP HEADING =================
function mapTypingEffect() {
  const el = document.querySelector(".map-typing");
  if (!el || el.dataset.done) return;

  const mapText = "Connecting Clients Across The World 🌍";
  let i = 0;

  function type() {
    if (i < mapText.length) {
      el.textContent += mapText.charAt(i++);
      setTimeout(type, 70);
    } else {
      el.dataset.done = "true";
    }
  }
  type();
}

// ================= SCROLL REVEAL =================
function revealOnScroll() {
  document.querySelectorAll(".reveal").forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 100) {
      el.classList.add("active");
    }
  });
}

let ticking = false;
window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      revealOnScroll();
      ticking = false;
    });
    ticking = true;
  }
});

// ================= RIPPLE =================
function addRipple(e) {
  const target = e.currentTarget;
  const ripple = document.createElement("span");
  const size   = Math.max(target.offsetWidth, target.offsetHeight);
  const rect   = target.getBoundingClientRect();

  ripple.classList.add("ripple");
  ripple.style.width  = ripple.style.height = size + "px";
  ripple.style.left   = e.clientX - rect.left - size / 2 + "px";
  ripple.style.top    = e.clientY - rect.top  - size / 2 + "px";

  target.appendChild(ripple);
  ripple.addEventListener("animationend", () => ripple.remove());
}

// ================= NAV ACTIVE =================
function setActiveNavLink() {
  const current = location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-links a").forEach(link => {
    if (link.getAttribute("href") === current) {
      link.classList.add("active");
    }

    // ✅ Guard: attach ripple only once
    if (!link.dataset.rippleAttached) {
      link.addEventListener("click", addRipple);
      link.dataset.rippleAttached = "true";
    }
  });
}

// ================= MAP =================
function initMap() {
  const mapEl = document.getElementById("map");
  if (!mapEl || typeof L === "undefined" || mapEl._leaflet_id) return;

  const myLocation = [26.50, 89.52];

  const map = L.map("map", {
    zoomControl: false,
    attributionControl: false
  }).setView(myLocation, 3);

  L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png").addTo(map);

  L.marker(myLocation).addTo(map)
    .bindPopup("Ayush Nandi 📍")
    .openPopup();

  const clients = [
    { name: "Delhi",  coords: [28.61,  77.23] },
    { name: "Mumbai", coords: [19.07,  72.87] },
    { name: "Dubai",  coords: [25.20,  55.27] },
    { name: "London", coords: [51.50,  -0.12] }
  ];

  clients.forEach(client => {
    L.marker(client.coords).addTo(map)
      .bindPopup(`Client: ${client.name}`);

    if (L.polyline.antPath) {
      L.polyline.antPath([myLocation, client.coords], {
        color: "#00f5ff", weight: 3, opacity: 0.8,
        dashArray: [10, 20], delay: 1000, pulseColor: "#ffffff"
      }).addTo(map);
    }
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const userLocation = [position.coords.latitude, position.coords.longitude];

      const userIcon = L.icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
        iconSize: [30, 30]
      });

      L.marker(userLocation, { icon: userIcon }).addTo(map)
        .bindPopup("You are here 📍");

      map.setView(userLocation, 5);

      L.polyline([userLocation, myLocation], {
        color: "#00f5ff", weight: 2, dashArray: "5,10"
      }).addTo(map);
    });
  }

  let zoomLevel = 3;
  setInterval(() => {
    zoomLevel = zoomLevel === 3 ? 4 : 3;
    map.setZoom(zoomLevel);
  }, 4000);
}

// ================= INIT =================
document.addEventListener("DOMContentLoaded", () => {
  typeEffect();
  mapTypingEffect();
  revealOnScroll();
  setActiveNavLink();
  initMap();

  document.querySelectorAll(".reveal").forEach((el, i) => {
    setTimeout(() => el.classList.add("active"), i * 120);
  });
});

// ================= WHATSAPP BUTTON =================
document.querySelectorAll(".get-touch-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const message = encodeURIComponent("Hi Ayush, I want to work with you!");
    window.open(`https://wa.me/919563316500?text=${message}`, "_blank");
  });
});