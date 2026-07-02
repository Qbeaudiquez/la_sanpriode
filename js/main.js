// La San-Priode — interactions du prototype
document.addEventListener("DOMContentLoaded", () => {
  // --- Menu mobile ---
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // --- Filtres d'actualités (visuel uniquement) ---
  const filters = document.querySelectorAll(".tag-filter");
  filters.forEach((btn) => {
    btn.addEventListener("click", () => {
      filters.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const target = btn.dataset.filter;
      document.querySelectorAll("[data-category]").forEach((card) => {
        const show = target === "tous" || card.dataset.category === target;
        card.style.display = show ? "" : "none";
      });
    });
  });

  // --- Formulaires : simulation d'envoi (prototype, pas de backend branché) ---
  document.querySelectorAll("form[data-simulate]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const success = form.querySelector(".form-success");
      if (success) {
        success.classList.add("visible");
        success.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
      form.reset();
    });
  });

  // --- Apparition au scroll ---
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

  // --- Partage : copie du lien ---
  document.querySelectorAll("[data-copy-link]").forEach((btn) => {
    btn.addEventListener("click", () => {
      navigator.clipboard?.writeText(window.location.href).then(() => {
        const original = btn.getAttribute("title");
        btn.setAttribute("title", "Lien copié !");
        setTimeout(() => btn.setAttribute("title", original || ""), 1500);
      });
    });
  });
});
