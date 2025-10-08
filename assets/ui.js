// Shared UI helpers for the site
// - Persistent dark mode
// - Simple hamburger animation helper
// - Small utilities (focus search shortcut)

(function(){
  // Persistent dark mode
  const html = document.documentElement;
  const themeKey = 'upsc_theme';

  function applyTheme(theme) {
    if (theme === 'dark') html.classList.add('dark');
    else html.classList.remove('dark');
  }

  // Load saved or system preference
  const saved = localStorage.getItem(themeKey);
  if (saved) applyTheme(saved);
  else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) applyTheme('dark');

  // Expose toggle function
  window.upscUI = {
    toggleTheme() {
      const isDark = html.classList.toggle('dark');
      localStorage.setItem(themeKey, isDark ? 'dark' : 'light');
      return isDark ? 'dark' : 'light';
    },
    setTheme(t) { applyTheme(t); localStorage.setItem(themeKey, t); }
  };

  // Keep document.body classes in sync for pages that use body.dark-mode / sepia-mode
  function syncBodyTheme() {
    try {
      if (html.classList.contains('dark')) {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('sepia-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
    } catch (e) {
      // ignore in non-browser environments
    }
  }

  // Run once now
  syncBodyTheme();

  // Observe changes to <html> class attribute and sync
  try {
    const mo = new MutationObserver(syncBodyTheme);
    mo.observe(html, { attributes: true, attributeFilter: ['class'] });
  } catch (e) {}

  // Keyboard shortcut: / to focus first input (search)
  window.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
      const input = document.querySelector('input[type=search], input[id=search], input[placeholder]');
      if (input) { e.preventDefault(); input.focus(); }
    }
  });

  // Simple mobile menu toggle data-attribute helper
  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-mobile-toggle]');
    if (!t) return;
    const target = document.querySelector(t.getAttribute('data-mobile-toggle'));
    if (!target) return;
    const open = target.getAttribute('data-open') === 'true';
    target.setAttribute('data-open', String(!open));
    if (!open) {
      target.classList.remove('scale-y-0','opacity-0');
      target.style.transform = 'scaleY(1)';
      target.style.opacity = '1';
    } else {
      target.style.transform = 'scaleY(0)';
      target.style.opacity = '0';
    }
  });

  // Auto-wire theme toggle buttons present on pages (#themeToggle or .theme-toggle)
  try {
    document.addEventListener('DOMContentLoaded', () => {
      const toggles = Array.from(document.querySelectorAll('#themeToggle, .theme-toggle'));
      toggles.forEach(btn => {
        // avoid double-binding
        if (btn.__upsc_wired) return;
        btn.__upsc_wired = true;
        btn.addEventListener('click', (e) => {
          try { btn.classList.add('pressed'); setTimeout(()=>btn.classList.remove('pressed'),120); } catch (ex) {}
          if (window.upscUI && typeof window.upscUI.toggleTheme === 'function') {
            const newTheme = window.upscUI.toggleTheme();
            // pages that use body.dark-mode / sepia-mode rely on body class
            if (document.documentElement.classList.contains('dark')) {
              document.body.classList.add('dark-mode');
              document.body.classList.remove('sepia-mode');
            } else {
              document.body.classList.remove('dark-mode');
              // keep sepia untouched (site can set separately)
            }
            return;
          }
          // fallback: toggle html.dark and persist
          document.documentElement.classList.toggle('dark');
          try { localStorage.setItem(themeKey, document.documentElement.classList.contains('dark') ? 'dark' : 'light'); } catch(e){}
          if (document.documentElement.classList.contains('dark')) {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('sepia-mode');
          } else {
            document.body.classList.remove('dark-mode');
          }
        });
      });
    });
  } catch (e) {}
})();
