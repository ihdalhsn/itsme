document.addEventListener("DOMContentLoaded", () => {
  window.IhdaI18n.initI18n();
  initNav();
  initHeaderScroll();
  initReveal();
  initSmoothCloseNav();
});

function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    nav.classList.toggle("is-open", !open);
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
    });
  });
}

function initSmoothCloseNav() {
  // Keep focus sensible when resizing past mobile breakpoint
  const mq = window.matchMedia("(min-width: 761px)");
  const sync = () => {
    if (mq.matches) {
      const toggle = document.querySelector(".nav-toggle");
      const nav = document.getElementById("site-nav");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
      if (nav) nav.classList.remove("is-open");
    }
  };
  mq.addEventListener("change", sync);
}

function initHeaderScroll() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function initReveal() {
  const nodes = document.querySelectorAll(".reveal");
  if (!nodes.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    nodes.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  nodes.forEach((el) => observer.observe(el));
}
