// Initialize 3D Tilt Effect
VanillaTilt.init(document.querySelectorAll(".project-box"), {
  max: 15,
  speed: 400,
  glare: true,
  "max-glare": 0.3,
  gyroscope: true,
  reverse: false
});
