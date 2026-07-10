// La Misión - configuración rápida
// Cuando tengas el número real, escríbelo aquí sin +, espacios ni guiones.
// Ejemplo Chile: "56912345678"
const WHATSAPP_NUMBER = "";

const WHATSAPP_MESSAGE = `Hola, quiero hacer un pedido de agua purificada La Misión.

Cantidad de recargas:
Cantidad de bidones completos:
Dirección:
Forma de pago:`;

document.querySelectorAll("[data-whatsapp]").forEach((button) => {
  button.addEventListener("click", (event) => {
    if (!WHATSAPP_NUMBER) {
      event.preventDefault();
      alert("Falta agregar el número de WhatsApp en script.js");
      return;
    }

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
    button.setAttribute("href", url);
  });
});

const copyButton = document.querySelector("[data-copy-address]");
if (copyButton) {
  copyButton.addEventListener("click", async () => {
    const address = "Villa Las Acacias, Pasaje Los Acacios 126, San Felipe";

    try {
      await navigator.clipboard.writeText(address);
      copyButton.textContent = "Dirección copiada";
      setTimeout(() => {
        copyButton.textContent = "Copiar dirección";
      }, 1800);
    } catch (error) {
      alert(address);
    }
  });
}

// ===== ANIMACIONES SUAVES AL HACER SCROLL =====

const revealElements = document.querySelectorAll(`
  .section-heading,
  .price-card,
  .step-card,
  .delivery-card,
  .gallery-featured,
  .gallery-cards figure,
  .location-info-card,
  .map-preview,
  .contact-main,
  .contact-summary
`);

revealElements.forEach((element, index) => {
  element.classList.add("reveal");

  const delayClass = `reveal-delay-${(index % 4) + 1}`;
  element.classList.add(delayClass);
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -60px 0px",
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

// ===== MENÚ HAMBURGUESA =====

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector("#navLinks");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");

    navToggle.classList.toggle("is-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      navToggle.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Abrir menú");
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      navLinks.classList.remove("is-open");
      navToggle.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Abrir menú");
    }
  });
}
