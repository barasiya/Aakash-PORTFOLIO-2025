// Initialize 3D Tilt Effect
VanillaTilt.init(document.querySelectorAll(".project-box"), {
  max: 15,
  speed: 400,
  glare: true,
  "max-glare": 0.3,
  gyroscope: true,
  reverse: false
});

// 3D Tilt Effect
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.setProperty('--rotate-x', `${-rotateX}deg`);
    card.style.setProperty('--rotate-y', `${rotateY}deg`);
    card.classList.add('tilt');
  });

  card.addEventListener('mouseleave', () => {
    card.classList.remove('tilt');
    card.style.setProperty('--rotate-x', `0deg`);
    card.style.setProperty('--rotate-y', `0deg`);
  });
});
