const root = document.documentElement;
try { root.dataset.theme = localStorage.getItem('datano-home-theme') === 'light' ? 'light' : 'dark'; } catch { /* Tema inicial funciona sem armazenamento. */ }
document.querySelector('#theme-toggle').addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  try { localStorage.setItem('datano-home-theme', root.dataset.theme); } catch { /* Preferência apenas na sessão. */ }
});
