document.addEventListener('DOMContentLoaded', function() {
  // Inject HTML for PWA "Add to Home Screen" banner with icon and install SVG
const pwaBanner = `
    <div id="pwaBanner" style="display: none; position: fixed; bottom: 20px; left: 10px; right: 10px; background: #ffffff; padding: 10px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.15); z-index: 10000; display: flex; align-items: center; justify-content: center; cursor: pointer;">
      <img src="https://api.appacertos.club/pwa/512.png" alt="PWA Icon" style="width: 40px; height: 40px; border-radius: 8px; margin-right: 10px;">
      <span style="font-family: Arial, sans-serif; color: #202020; font-size: 16px; font-weight: bold;">Instalar</span>
      <img src="https://api.appacertos.club/pwa/install.svg" alt="Install Icon" style="width: 24px; height: 24px; margin-left: 10px; filter: invert(20%) sepia(10%) saturate(1000%) hue-rotate(190deg) brightness(20%);">
    </div>
`;
  document.body.insertAdjacentHTML('beforeend', pwaBanner);

  const pwaBannerEl = document.getElementById('pwaBanner');

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

  // Make entire banner clickable
  pwaBannerEl.addEventListener('click', function() {
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

  // Check at load
  showPWABanner();

  // Register Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(function(registration) {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(function(error) {
        console.error('Service Worker registration failed:', error);
      });
  }
});
