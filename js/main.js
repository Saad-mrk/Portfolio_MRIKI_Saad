/* ══════════════════════════════════════════════
   SAAD MRIKI — PORTFOLIO · main.js
   ══════════════════════════════════════════════ */

(function () {
  "use strict";

  /* ── Navbar: shadow on scroll ── */
  const nav = document.getElementById("nav");
  const onScroll = () => {
    nav.classList.toggle("scrolled", window.scrollY > 30);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ── Mobile menu ── */
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");

  toggle.addEventListener("click", () => {
    toggle.classList.toggle("open");
    links.classList.toggle("open");
  });

  links.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      toggle.classList.remove("open");
      links.classList.remove("open");
    });
  });

  /* ── Scroll reveal ── */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("visible"));
  }

  /* ── Typing effect ── */
  const typed = document.getElementById("typed");
  const roles = [
    "Développeur Full-Stack",
    "Laravel · ASP.NET Core",
    "React · Flutter",
    "API REST sécurisées",
  ];

  if (typed) {
    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const type = () => {
      const current = roles[roleIndex];
      typed.textContent = current.slice(0, charIndex);

      if (!deleting) {
        charIndex++;
        if (charIndex > current.length) {
          deleting = true;
          setTimeout(type, 1600);
          return;
        }
      } else {
        charIndex--;
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }

      setTimeout(type, deleting ? 45 : 90);
    };

    type();
  }

  /* ── Active nav link on scroll ── */
  const sections = ["about", "skills", "experience", "projects", "contact"];
  const navAnchors = {};
  document.querySelectorAll(".nav-links a").forEach((a) => {
    navAnchors[a.getAttribute("href").slice(1)] = a;
  });

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.id;
        if (entry.isIntersecting && navAnchors[id]) {
          Object.values(navAnchors).forEach((a) => (a.style.color = ""));
          navAnchors[id].style.color = "var(--blue)";
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach((id) => {
    const el = document.getElementById(id);
    if (el) spy.observe(el);
  });
})();
