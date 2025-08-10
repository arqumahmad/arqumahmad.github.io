// scripts.js
// ====== Render helpers ======
function h(html) { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstChild; }

function renderExperience() {
  const wrap = document.getElementById('experienceList');
  experience.forEach(exp => {
    const card = h(`<article class="glass p-6 md:p-7">
        <h3 class="text-lg font-semibold">${exp.role}</h3>
        <p class="text-white/70 mt-1">${exp.org} • ${exp.location}</p>
        <p class="text-white/60 text-sm">${exp.period}</p>
        <ul class="mt-4 list-disc list-inside space-y-2 text-white/80 text-sm">${exp.bullets.map(b => `<li>${b}</li>`).join('')}</ul>
      </article>`);
    wrap.appendChild(card);
  });
}

function renderEvents() {
  const now = new Date();
  const upcoming = events.filter(e => new Date(e.date) >= now).sort((a,b)=> new Date(a.date)-new Date(b.date));
  const past = events.filter(e => new Date(e.date) < now).sort((a,b)=> new Date(b.date)-new Date(a.date));
  const u = document.getElementById('upcomingEvents');
  const p = document.getElementById('pastEvents');
  const card = (e) => `<div class="flex items-start gap-4">
      <div class="min-w-[4.5rem] text-right">
        <div class="text-sm text-white/60">${new Date(e.date).toLocaleString(undefined,{month:'short', year:'numeric'})}</div>
        <div class="text-xs text-white/50">${e.range}</div>
      </div>
      <div class="flex-1">
        <div class="font-semibold">${e.title}</div>
        <div class="text-sm text-white/70">${e.city}</div>
        <div class="text-xs text-white/60 mt-1">${e.role}</div>
      </div>
    </div>`;
  u.innerHTML = upcoming.length ? upcoming.map(card).join('') : '<p class="text-white/60 text-sm">No upcoming events listed yet.</p>';
  p.innerHTML = past.map(card).join('');
}

function renderArticles() {
  const g = document.getElementById('articleGrid');
  g.innerHTML = '';
  articles.forEach(a => {
    g.appendChild(h(`<a class="glass p-6 block hover:opacity-90" href="${a.url || '#'}" target="_blank">
      <div class="mt-2 font-semibold">${a.title}</div>
      <div class="mt-3 text-sm text-white/80">${a.description}</div>
      <div class="mt-3 text-sm underline">${a.url ? 'Read →' : ''}</div>
    </a>`));
  });
}

// Interactions
document.getElementById('menuBtn').addEventListener('click', () => {
  const el = document.getElementById('mobileMenu');
  el.classList.toggle('hidden');
});

// Scroll reveal
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('show'); });
}, { threshold: .08 });
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// Init
renderExperience();
renderEvents();
renderArticles();
document.getElementById('year').textContent = new Date().getFullYear();

document.addEventListener('DOMContentLoaded', function () {
  // Render Projects
  if (typeof projects !== 'undefined' && Array.isArray(projects)) {
    const projectsGrid = document.getElementById('projectsGrid');
    if (projectsGrid) {
      projectsGrid.innerHTML = projects.map(project => `
        <div class="glass p-8 flex flex-col gap-3">
          <h3 class="text-lg font-semibold mb-2">${project.title}</h3>
          <p>${project.description}</p>
        </div>
      `).join('');
    }
  }
});
