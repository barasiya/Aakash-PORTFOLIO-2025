// =================== THEME TOGGLING ===================
const themeSelect = document.getElementById('theme-select');

function applyTheme(mode) {
  if (mode === 'auto') {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.body.classList.toggle('dark', isDark);
  } else {
    document.body.classList.toggle('dark', mode === 'dark');
  }
}

themeSelect.addEventListener('change', (e) => {
  const mode = e.target.value;
  localStorage.setItem('theme', mode);
  applyTheme(mode);
});

const savedTheme = localStorage.getItem('theme') || 'auto';
themeSelect.value = savedTheme;
applyTheme(savedTheme);

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  if (themeSelect.value === 'auto') applyTheme('auto');
});

// =================== STICKY HEADER ===================
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  header.classList.toggle('sticky', window.scrollY > 50);
});

// =================== NAV ACTIVE LINK HIGHLIGHT ===================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-container nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

// =================== CERTIFICATE TILT EFFECT ===================
document.querySelectorAll('.cert-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = -(y - centerY) / 20;
    const rotateY = (x - centerX) / 20;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
  });
});

// =================== SCROLLREVEAL FOR PROJECT BOXES ===================
document.addEventListener('DOMContentLoaded', () => {
  if (typeof ScrollReveal !== "undefined") {
    ScrollReveal().reveal('.project-box', {
      origin: 'bottom',
      distance: '30px',
      duration: 1000,
      easing: 'ease-in-out',
      interval: 150,
      reset: false
    });
  }
});
