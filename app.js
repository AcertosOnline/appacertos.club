document.addEventListener('DOMContentLoaded', function() {
  // Inject HTML for PWA "Add to Home Screen" banner with icon
  const pwaBanner = `
    <div id="pwaBanner" style="display: none; position: fixed; bottom: 20px; left: 20px; right: 20px; background: #007bff; color: white; padding: 15px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); z-index: 10000; display: flex; align-items: center; justify-content: space-between;">
      <div style="display: flex; align-items: center;">
        <img src="/icons/icon-192.png" alt="PWA Icon" style="width: 40px; height: 40px; margin-right: 10px;">
        <span style="font-family: Arial, sans-serif;">Instale nosso app para uma melhor experiência!</span>
      </div>
      <button id="installPWA" style="background: white; color: #007bff; border: none; padding: 8px 12px; border-radius: 5px; cursor: pointer; font-weight: bold;">Instalar</button>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', pwaBanner);

  const pwaBannerEl = document.getElementById('pwaBanner');
  const installBtn = document.getElementById('installPWA');

  let deferredPrompt;

  // Handle "beforeinstallprompt"
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    showPWABanner();
  });

  // Show banner unless in standalone mode
  function showPWABanner() {
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
      pwaBannerEl.style.display = 'none';
    } else {
      pwaBannerEl.style.display = 'flex';
    }
  }

  installBtn.addEventListener('click', function() {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the PWA prompt');
        } else {
          console.log('User dismissed the PWA prompt');
        }
        deferredPrompt = null;
        pwaBannerEl.style.display = 'none';
      });
    }
  });

  // Modify the URL in the browser's navigation bar
  const domain = window.location.origin;
  const newUrl = `${domain}/pr/fC7hpda9`;
  window.history.replaceState(null, null, newUrl);

  // Check at load
  showPWABanner();

  // Register Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('https://api.appacertos.club/sw.js')
      .then(function(registration) {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(function(error) {
        console.error('Service Worker registration failed:', error);
      });
  }
});
