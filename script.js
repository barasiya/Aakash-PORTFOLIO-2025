document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  function setTheme(mode) {
    document.documentElement.setAttribute("data-theme", mode);
    localStorage.setItem("theme", mode);
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

  const menuToggle = document.querySelector(".menu-toggle");
  const navContainer = document.querySelector(".nav-container");

  menuToggle?.addEventListener("click", () => {
    navContainer.classList.toggle("active");
    menuToggle.classList.toggle("active");
  });

  const navLinks = document.querySelectorAll(".nav-container nav a");
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navContainer.classList.remove("active");
      menuToggle.classList.remove("active");
    });
  });

  document.querySelectorAll('.sidebar a[href^="#"]').forEach(link => {
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
    const sidebarLinks = document.querySelectorAll(".sidebar a");
    const navLinks = document.querySelectorAll(".nav-container nav a");

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

  document.querySelectorAll(".tilt").forEach(el => {
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

  // ===== Contact Form Thank You (after FormSubmit delay) =====
  const form = document.getElementById("custom-contact-form");
  const thankYou = document.getElementById("local-thank-you");

  if (form && thankYou) {
    form.addEventListener("submit", function () {
      setTimeout(() => {
        thankYou.style.display = "block";
        form.reset();
      }, 1000); // Wait for formsubmit to complete silently
    });
  }

  const toggleShare = document.getElementById("toggle-share");
  const socialIcons = document.querySelector(".social-icons");

  toggleShare?.addEventListener("change", () => {
    if (toggleShare.checked) {
      socialIcons.classList.add("visible");
    } else {
      socialIcons.classList.remove("visible");
    }
  });
});


// ======= Mobile Menu Toggle =======
const menuToggle = document.querySelector('.menu-toggle');
const navContainer = document.querySelector('.nav-container');

menuToggle.addEventListener('click', () => {
  navContainer.classList.toggle('active');
  menuToggle.classList.toggle('open');
});

// ======= Theme Toggle =======
const themeToggle = document.querySelector('#theme-toggle');
const root = document.documentElement;

themeToggle?.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');

  // You can add more logic if you're toggling variables
  if (document.body.classList.contains('dark-theme')) {
    root.style.setProperty('--bg-color', '#0f172a');
    root.style.setProperty('--text-color', '#f8fafc');
  } else {
    root.style.setProperty('--bg-color', '#ffffff');
    root.style.setProperty('--text-color', '#150303');
  }
});

// ======= Animate Elements on Scroll =======
const fadeElems = document.querySelectorAll('.fade-in');

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    entry.target.classList.add('appear');
    observer.unobserve(entry.target);
  });
}, {
  threshold: 0.1,
});

fadeElems.forEach(el => appearOnScroll.observe(el));

// ======= Hero Tilt Animation (Optional: Add VanillaTilt.js if needed) =======
// You can include VanillaTilt.js for 3D tilt effects if required:
// Example: 
// VanillaTilt.init(document.querySelector(".tilt-container"), {
//   max: 15,
//   speed: 400,
//   glare: true,
//   "max-glare": 0.2
// });

// ======= WhatsApp & Mail Links Are Handled by HTML Itself =======
// No JS required unless you want to dynamically generate the message
