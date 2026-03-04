/* ═══════════════════════════════════════════════
   ANIMATIONS.JS — Scroll, Parallax, Nav, Foam
═══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. Nav: stagger links on load ────────── */
  document.querySelectorAll('.nav-links a').forEach((a, i) => {
    a.style.opacity   = '0';
    a.style.transform = 'translateY(-8px)';
    setTimeout(() => {
      a.style.transition = 'opacity 0.5s ease, transform 0.5s ease, color 0.3s';
      a.style.opacity    = '';
      a.style.transform  = '';
    }, 900 + i * 110);
  });

  /* ── 2. Nav: add .scrolled class on scroll ── */
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);

    // Active section highlight
    const sections = document.querySelectorAll('section[id]');
    const links    = document.querySelectorAll('.nav-links a');
    let current    = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    links.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }, { passive: true });

  /* ── 3. Scroll reveal (IntersectionObserver) ── */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const delay = parseInt(entry.target.dataset.delay || 0);
      setTimeout(() => entry.target.classList.add('visible'), delay);
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Project cards stagger
  document.querySelectorAll('.project-card').forEach((card, i) => {
    card.dataset.delay = i * 110;
    observer.observe(card);
  });

  /* ── 4. Hero parallax on mouse move ────────── */
  const hero      = document.getElementById('hero');
  const gridLines = document.querySelector('.hero-grid-lines');
  const heroBg    = document.querySelector('.hero-bg');

  if (hero && gridLines) {
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth  - 0.5) * 18;
      const y = (e.clientY / window.innerHeight - 0.5) * 18;
      gridLines.style.transform = `translate(${x}px, ${y}px)`;
      if (heroBg) heroBg.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    }, { passive: true });
  }

  /* ── 5. Ocean foam particles ─────────────── */
  if (hero) {
    for (let i = 0; i < 20; i++) {
      const p = document.createElement('div');
      p.className = 'foam-particle';
      const size = Math.random() * 9 + 3;
      Object.assign(p.style, {
        width:                  size + 'px',
        height:                 size + 'px',
        left:                   Math.random() * 100 + '%',
        bottom:                 Math.random() * 30 + '%',
        animationDuration:      (Math.random() * 4 + 3) + 's',
        animationDelay:         (Math.random() * 8) + 's',
      });
      hero.appendChild(p);
    }
  }

  /* ── 6. Smooth scroll for anchor links ─────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

});
