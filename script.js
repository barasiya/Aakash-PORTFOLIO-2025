// script.js

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

    if (savedTheme === "auto") {
      setTheme(prefersDark ? "dark" : "light");
    } else {
      setTheme(savedTheme);
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener("change", () => {
      const selected = themeToggle.value;
      if (selected === "auto") {
        setTheme(prefersDark ? "dark" : "light");
      } else {
        setTheme(selected);
      }
    });
  }

  applySavedTheme();

  // ===== Mobile Menu Toggle =====
  const menuToggle = document.getElementById("menu-toggle");
  const navContainer = document.getElementById("nav-container");

  if (menuToggle && navContainer) {
    menuToggle.addEventListener("click", () => {
      navContainer.classList.toggle("active");
      menuToggle.classList.toggle("open");
    });
  }

  // ===== Close Mobile Nav on Link Click =====
  const navLinks = document.querySelectorAll(".nav-container nav a");
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (navContainer && menuToggle) {
        navContainer.classList.remove("active");
        menuToggle.classList.remove("open");
      }
    });
  });

  // ===== Sidebar Smooth Scroll & Active Highlight =====
  const sidebarLinks = document.querySelectorAll('.sidebar a[href^="#"]');
  sidebarLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const sections = document.querySelectorAll("section[id]");

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        sidebarLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });

        navLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}` || link.getAttribute("href").includes(id)) {
            link.classList.add("active");
          }
        });
      }
    });
  });

  // ===== Hero Tilt Effect (3D Image Movement) =====
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
      e.preventDefault(); // Prevent actual submission if it's client-side only
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

  // ===== Animate on Scroll (Fade-in Elements) =====
  const fadeElems = document.querySelectorAll('.fade-in');
  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('appear');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1 });

  fadeElems.forEach(el => appearOnScroll.observe(el));
});
