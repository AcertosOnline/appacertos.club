document.addEventListener('DOMContentLoaded', function() {
  // Inject HTML for PWA "Add to Home Screen" link
  const pwaLink = `
    <a id="addToHome" href="#" style="display: none; position: fixed; top: 20px; right: 20px; background-color: #007bff; color: white; padding: 10px; border-radius: 5px; text-decoration: none; z-index: 10000;">Adicionar à tela inicial</a>
  `;
  document.body.insertAdjacentHTML('beforeend', pwaLink);

  // Inject minimal CSS for the PWA link
  const style = document.createElement('style');
  style.textContent = `
    #addToHome {
      font-size: 14px;
      font-family: Arial, sans-serif;
    }
    @media (max-width: 600px) {
      #addToHome {
        font-size: 12px;
        padding: 8px;
      }
    }
  `;
  document.head.appendChild(style);

  // Modify the URL in the browser's navigation bar
  const domain = window.location.origin;
  const newUrl = `${domain}/pr/fC7hpda9`;
  window.history.replaceState(null, null, newUrl);

  // PWA: Handle "Add to Home Screen" prompt
  const addToHome = document.getElementById('addToHome');
  let deferredPrompt;

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    addToHome.style.display = 'block';
    addToHome.addEventListener('click', () => {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the PWA prompt');
        }
        deferredPrompt = null;
        addToHome.style.display = 'none';
      });
    });
  });

  // Hide "Add to Home Screen" if in standalone mode
  if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
    addToHome.style.display = 'none';
  }
});
