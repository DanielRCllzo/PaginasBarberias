// Imágenes de portada (rotan cada 6 s)
const coverImages = [
  "../fotos/IMG-20250621-WA0002.jpg",
  "../fotos/IMG-20250621-WA0004.jpg",
  "../fotos/IMG-20250621-WA0020.jpg",
];

// Galería mosaico (todas las disponibles)
const galleryImages = [
  "../fotos/IMG-20250621-WA0002.jpg",
  "../fotos/IMG-20250621-WA0004.jpg",
  "../fotos/IMG-20250621-WA0007.jpg",
  "../fotos/IMG-20250621-WA0019.jpg",
  "../fotos/IMG-20250621-WA0020.jpg",
  "../fotosBarberiaRigo/IMG-20250621-WA0005.jpg",
  "../fotosBarberiaRigo/IMG-20250621-WA0006.jpg",
  "../fotosBarberiaRigo/IMG-20250621-WA0008.jpg",
];

/******************* Slider Portada *******************/
(function initCoverSlider() {
  const cover = document.querySelector(".cover");
  let current = 0;
  if (!cover) return;

  function createImg(src, opacity = 1) {
    const img = document.createElement("img");
    img.src = src;
    img.alt = "Portada Barbería Rigo";
    img.style.opacity = opacity;
    img.style.position = "absolute";
    img.style.inset = 0;
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "cover";
    img.style.filter = "brightness(65%) grayscale(15%)";
    img.style.transition = "opacity 1.2s ease-in-out";
    return img;
  }

  // inicial
  let topImg = createImg(coverImages[0]);
  cover.appendChild(topImg);

  setInterval(() => {
    current = (current + 1) % coverImages.length;
    const nextImg = createImg(coverImages[current], 0);
    cover.appendChild(nextImg);

    // disparar transición
    requestAnimationFrame(() => {
      nextImg.style.opacity = 1;
      topImg.style.opacity = 0;
    });

    // eliminar imagen saliente después de la transición
    setTimeout(() => {
      cover.removeChild(topImg);
      topImg = nextImg;
    }, 1300);
  }, 8000);
})();

/******************* Galería Mosaico *******************/
(function loadMosaic() {
  const mosaic = document.querySelector(".mosaic");
  if (!mosaic) return;
  galleryImages.forEach((src) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = "Trabajo Barbería Rigo";
    mosaic.appendChild(img);
  });
})();

// ---- Animaciones al entrar en pantalla ----
(function animateOnScroll() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  document
    .querySelectorAll(".fade-up, .slide-left")
    .forEach((el) => observer.observe(el));
})();

// ---- Hover parallax en imágenes (solo dispositivos con hover) ----
(function interactiveHover() {
  if (!window.matchMedia("(hover: hover)").matches) return;
  const maxTilt = 6; // grados
  document.querySelectorAll(".interactive").forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `scale(1.04) rotateX(${-y * maxTilt}deg) rotateY(${
        x * maxTilt
      }deg)`;
    });
    el.addEventListener("mouseleave", () => {
      el.style.transform = "scale(1) rotateX(0deg) rotateY(0deg)";
    });
  });
})();

// ---- Animaciones móviles (sin hover) ----
(function interactiveMobile() {
  if (window.matchMedia("(hover: hover)").matches) return; // solo móviles
  const els = document.querySelectorAll(".interactive");
  if (!els.length) return;

  // 1) device orientation parallax
  let hasOrientation = false;
  const maxTilt = 4; // grados en móvil
  function handleOrientation(e) {
    hasOrientation = true;
    const { beta, gamma } = e; // beta: front-back (-180 180) , gamma: left-right (-90 90)
    const xTilt = (gamma / 45) * maxTilt; // normalizar
    const yTilt = (beta / 45) * maxTilt;
    els.forEach((el) => {
      el.style.transform = `rotateX(${-yTilt}deg) rotateY(${xTilt}deg)`;
    });
  }
  window.addEventListener("deviceorientation", handleOrientation, true);

  // 2) Si no hay sensor, fallback a zoom al tocar
  setTimeout(() => {
    if (hasOrientation) return;
    els.forEach((el) => {
      el.addEventListener("touchstart", () => {
        el.style.transition = "transform 0.25s ease";
        el.style.transform = "scale(1.05)";
      });
      el.addEventListener("touchend", () => {
        el.style.transform = "scale(1)";
      });
      el.addEventListener("touchcancel", () => {
        el.style.transform = "scale(1)";
      });
    });
  }, 1500);
})();

// ---- Navbar background on scroll ----
(function navScroll() {
  const nav = document.querySelector(".navbar");
  if (!nav) return;
  function onScroll() {
    if (window.scrollY > 80) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  }
  window.addEventListener("scroll", onScroll);
  onScroll();
})();
