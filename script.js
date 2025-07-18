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

// Listen to dropdown change
themeSelect.addEventListener('change', (e) => {
  const mode = e.target.value;
  localStorage.setItem('theme', mode);
  applyTheme(mode);
});

// Initialize theme on load
const savedTheme = localStorage.getItem('theme') || 'auto';
themeSelect.value = savedTheme;
applyTheme(savedTheme);

// Update theme if OS preference changes (when in auto mode)
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  if (themeSelect.value === 'auto') applyTheme('auto');
});



