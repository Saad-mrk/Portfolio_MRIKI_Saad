/* ═══════════════════════════════════════════════
   TOOLTIPS.JS — Tooltip Data & Injection
   
   To add a new tooltip:
   1. Add an entry in TOOLTIPS below
   2. Add data-tooltip="key" on any element in HTML
═══════════════════════════════════════════════ */

const TOOLTIPS = {
  ensa: {
    icon:  '🎓',
    iconBg: 'rgba(0,82,204,0.18)',
    title:  'ENSA Fès',
    cat:    'Engineering School · Morocco',
    desc:   'École Nationale des Sciences Appliquées de Fès — a prestigious public engineering school in Morocco, offering a 5-year Computer Engineering degree.',
    bar:    { label: 'Top school', value: 82 },
    link:   { text: 'Visit website →', href: 'https://ensaf.ac.ma/' },
  },

  dotnet: {
    icon:   '⚙️',
    iconBg: 'rgba(81,43,212,0.18)',
    title:  'Microsoft .NET',
    cat:    'Backend Framework · C#',
    desc:   "Microsoft's cross-platform framework for building web APIs, desktop apps and microservices with C# and ASP.NET Core for high-performance systems.",
    bar:    { label: 'Mastery', value: 85 },
  },

  laravel: {
    icon:   '🔴',
    iconBg: 'rgba(255,45,32,0.14)',
    title:  'Laravel',
    cat:    'PHP Framework · Web',
    desc:   'Elegant PHP framework with expressive syntax, built-in ORM (Eloquent), routing, and authentication — ideal for full-stack web applications.',
    bar:    { label: 'Mastery', value: 80 },
  },

  aspnet: {
    icon:   '⚙️',
    iconBg: 'rgba(81,43,212,0.18)',
    title:  'ASP.NET Core',
    cat:    'Backend Framework · C#',
    desc:   "Microsoft's cross-platform, high-performance framework for building modern, cloud-based web APIs and Internet-connected applications with C#.",
    bar:    { label: 'Mastery', value: 83 },
  },
};

/* ── Build tooltip HTML from config ─────────── */
function buildTooltip(key) {
  const t = TOOLTIPS[key];
  if (!t) return '';

  const bar = t.bar ? `
    <div class="tb-bar-row">
      <div class="tb-bar-label">${t.bar.label}</div>
      <div class="tb-bar-bg">
        <div class="tb-bar-fill" style="width:${t.bar.value}%"></div>
      </div>
    </div>` : '';

  const link = t.link ? `
    <a class="tb-link" href="${t.link.href}" target="_blank" rel="noopener">
      ${t.link.text}
    </a>` : '';

  return `
    <div class="tb">
      <div class="tb-head">
        <div class="tb-icon" style="background:${t.iconBg}">${t.icon}</div>
        <div>
          <div class="tb-title">${t.title}</div>
          <div class="tb-cat">${t.cat}</div>
        </div>
      </div>
      <div class="tb-desc">${t.desc}</div>
      ${bar}
      ${link}
    </div>`;
}

/* ── Inject tooltips on load ─────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-tooltip]').forEach(el => {
    const key = el.dataset.tooltip;
    const html = buildTooltip(key);
    if (!html) return;

    // Wrap element
    const wrap = document.createElement('span');
    wrap.className = 'tw';
    el.parentNode.insertBefore(wrap, el);
    wrap.appendChild(el);
    wrap.insertAdjacentHTML('beforeend', html);
  });
});
