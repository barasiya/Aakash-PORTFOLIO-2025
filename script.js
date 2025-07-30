document.addEventListener("DOMContentLoaded", () => {
  // ===== Theme Toggle =====
  const themeToggle = document.getElementById("theme-toggle");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const root = document.documentElement;

  function setTheme(mode) {
    root.setAttribute("data-theme", mode);
    localStorage.setItem("theme", mode);
    if (mode === "dark") {
      root.style.setProperty('--bg-color', '#0f172a');
      root.style.setProperty('--text-color', '#f8fafc');
    } else {
      root.style.setProperty('--bg-color', '#ffffff');
      root.style.setProperty('--text-color', '#150303');
    }
  }

  function applySavedTheme() {
    const savedTheme = localStorage.getItem("theme") || "auto";
    if (themeToggle) themeToggle.value = savedTheme;
    setTheme(savedTheme === "auto" ? (prefersDark ? "dark" : "light") : savedTheme);
  }

  if (themeToggle) {
    themeToggle.addEventListener("change", () => {
      const selected = themeToggle.value;
      setTheme(selected === "auto" ? (prefersDark ? "dark" : "light") : selected);
    });
  }

  applySavedTheme();

  // ===== Mobile Menu Toggle =====
  const menuToggle = document.getElementById("menu-toggle") || document.querySelector(".menu-toggle");
  const navContainer = document.getElementById("navbar") || document.querySelector(".nav-container");
  const openIcon = document.getElementById("open-icon");
  const closeIcon = document.getElementById("close-icon");

  if (menuToggle && navContainer) {
    menuToggle.addEventListener("click", () => {
      navContainer.classList.toggle("show");
      menuToggle.classList.toggle("open");

      const isVisible = navContainer.classList.contains("show");
      if (openIcon && closeIcon) {
        openIcon.style.display = isVisible ? "none" : "inline-block";
        closeIcon.style.display = isVisible ? "inline-block" : "none";
      }
    });
  }

  const navLinks = document.querySelectorAll(".nav-container a");
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navContainer?.classList.remove("show");
      menuToggle?.classList.remove("open");
      if (openIcon && closeIcon) {
        openIcon.style.display = "inline-block";
        closeIcon.style.display = "none";
      }
    });
  });

  // ===== Scroll Animations =====
  const fadeElems = document.querySelectorAll(".fade-in");
  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("appear");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  fadeElems.forEach(el => fadeObserver.observe(el));

  const revealElems = document.querySelectorAll(".reveal");
  function handleReveal() {
    revealElems.forEach(el => {
      const top = el.getBoundingClientRect().top;
      if (top < window.innerHeight - 100) {
        el.classList.add("visible");
      }
    });
  }

  // ===== Scroll-Based Nav Highlight =====
  const sidebarLinks = document.querySelectorAll('.sidebar a[href^="#"]');
  window.addEventListener("scroll", () => {
    handleReveal();

    const scrollY = window.scrollY;
    const sections = document.querySelectorAll("section[id]");
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    [...sidebarLinks, ...navLinks].forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });

    // Education Cards Scroll Effect
    document.querySelectorAll(".education-card").forEach(card => {
      const rect = card.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        card.style.opacity = 1;
        card.style.animationPlayState = "running";
      }
    });
  });

  // ===== Smooth Scroll for All Anchors =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ===== Hero Tilt Effect =====
  document.querySelectorAll(".tilt-container").forEach(el => {
    el.addEventListener("mousemove", e => {
      const { width, height, left, top } = el.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      const rotateX = ((y / height) - 0.5) * 10;
      const rotateY = ((x / width) - 0.5) * -10;
      el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    el.addEventListener("mouseleave", () => {
      el.style.transform = `rotateX(0deg) rotateY(0deg)`;
    });
  });

  // ===== Contact Form Thank You Message =====
  const form = document.getElementById("custom-contact-form");
  const thankYou = document.getElementById("local-thank-you");
  if (form && thankYou) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      setTimeout(() => {
        thankYou.style.display = "block";
        form.reset();
      }, 1000);
    });
  }

  // ===== Toggle Share Icons =====
  const toggleShare = document.getElementById("toggle-share");
  const socialIcons = document.querySelector(".social-icons");
  if (toggleShare && socialIcons) {
    toggleShare.addEventListener("change", () => {
      socialIcons.classList.toggle("visible", toggleShare.checked);
    });
  }

  // ===== Button Glow Effect (optional) =====
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((btn) => {
    btn.addEventListener("mouseenter", () => btn.classList.add("glow"));
    btn.addEventListener("mouseleave", () => btn.classList.remove("glow"));
  });

  // Trigger initial reveal
  handleReveal();
});
