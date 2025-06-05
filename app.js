document.addEventListener('DOMContentLoaded', function() {
  // Inject HTML for draggable hamburger menu icon and modal
  const menuHtml = `
    <div id="hamburgerMenu" style="position: fixed; bottom: 20px; right: 20px; width: 50px; height: 50px; background: #ffffff; border-radius: 50%; box-shadow: 0 4px 8px rgba(0,0,0,0.15); z-index: 10001; cursor: pointer; display: flex; align-items: center; justify-content: center; touch-action: none;">
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#202020" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
    </div>
    <div id="menuModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); backdrop-filter: blur(5px); z-index: 10000; justify-content: center; align-items: center;">
      <div style="background: #ffffff; width: 80%; max-width: 400px; border-radius: 8px; padding: 20px; position: relative;">
        <button id="closeModal" style="position: absolute; top: 10px; right: 10px; background: none; border: none; font-size: 24px; cursor: pointer;">×</button>
        <ul style="list-style: none; padding: 0; margin: 0;">
          <li id="installOption" style="padding: 15px; border-bottom: 1px solid #eee; cursor: pointer; font-family: Arial, sans-serif; font-size: 16px; color: #202020;">Instalar</li>
          <li style="padding: 15px; border-bottom: 1px solid #eee; cursor: pointer; font-family: Arial, sans-serif; font-size: 16px; color: #202020;">
            <a href="https://app.acertos.club/pr/fC7hpda9" style="text-decoration: none; color: #202020;">Jogar cassino</a>
          </li>
          <li style="padding: 15px; border-bottom: 1px solid #eee; cursor: pointer; font-family: Arial, sans-serif; font-size: 16px; color: #202020;">
            <a href="https://www.youtube.com/channel/UCWl8Ma619mTTXoo9P7mASdQ" style="text-decoration: none; color: #202020;">Palpites JB</a>
          </li>
          <li style="padding: 15px; border-bottom: 1px solid #eee; cursor: pointer; font-family: Arial, sans-serif; font-size: 16px; color: #202020;">
            <a href="https://wa.me/+5583993708505" style="text-decoration: none; color: #202020;">Suporte</a>
          </li>
          <li style="padding: 15px; cursor: pointer; font-family: Arial, sans-serif; font-size: 16px; color: #202020;">
            <a href="https://resultadosdojogo.com/" style="text-decoration: none; color: #202020;">Resultados</a>
          </li>
        </ul>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', menuHtml);

  const hamburgerMenu = document.getElementById('hamburgerMenu');
  const menuModal = document.getElementById('menuModal');
  const closeModal = document.getElementById('closeModal');
  const installOption = document.getElementById('installOption');
  let deferredPrompt;

  // Handle "beforeinstallprompt" for PWA
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    showInstallOption();
  });

  // Show or hide install option based on PWA status
  function showInstallOption() {
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
      installOption.style.display = 'none';
    } else {
      installOption.style.display = 'block';
    }
  }

  // Open modal and hide hamburger icon
  hamburgerMenu.addEventListener('click', function(e) {
    e.preventDefault();
    menuModal.style.display = 'flex';
    hamburgerMenu.style.display = 'none';
  });

  // Close modal and show hamburger icon
  function closeModalFunc() {
    menuModal.style.display = 'none';
    hamburgerMenu.style.display = 'flex';
  }

  closeModal.addEventListener('click', closeModalFunc);

  // Close modal when clicking outside
  menuModal.addEventListener('click', function(e) {
    if (e.target === menuModal) {
      closeModalFunc();
    }
  });

  // Handle PWA install
  installOption.addEventListener('click', function() {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the PWA prompt');
        } else {
          console.log('User dismissed the PWA prompt');
        }
        deferredPrompt = null;
        installOption.style.display = 'none';
      });
    }
  });

  // Draggable hamburger menu
  let isDragging = false;
  let currentX;
  let currentY;
  let initialX;
  let initialY;
  let xOffset = 0;
  let yOffset = 0;

  // Touch events for mobile
  hamburgerMenu.addEventListener('touchstart', dragStart);
  hamburgerMenu.addEventListener('touchend', dragEnd);
  hamburgerMenu.addEventListener('touchmove', drag);

  // Mouse events for desktop
  hamburgerMenu.addEventListener('mousedown', dragStart);
  document.addEventListener('mouseup', dragEnd);
  document.addEventListener('mousemove', drag);

  function dragStart(e) {
    if (e.type === 'touchstart') {
      initialX = e.touches[0].clientX - xOffset;
      initialY = e.touches[0].clientY - yOffset;
    } else {
      initialX = e.clientX - xOffset;
      initialY = e.clientY - yOffset;
    }
    isDragging = true;
  }

  function dragEnd(e) {
    initialX = currentX;
    initialY = currentY;
    isDragging = false;
  }

  function drag(e) {
    if (isDragging) {
      e.preventDefault();
      if (e.type === 'touchmove') {
        currentX = e.touches[0].clientX - initialX;
        currentY = e.touches[0].clientY - initialY;
      } else {
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;
      }
      xOffset = currentX;
      yOffset = currentY;

      // Ensure the icon stays within the viewport
      const rect = hamburgerMenu.getBoundingClientRect();
      const maxX = window.innerWidth - rect.width;
      const maxY = window.innerHeight - rect.height;
      currentX = Math.max(0, Math.min(currentX, maxX));
      currentY = Math.max(0, Math.min(currentY, maxY));

      hamburgerMenu.style.transform = `translate(${currentX}px, ${currentY}px)`;
    }
  }

  // Check PWA status at load
  showInstallOption();

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
