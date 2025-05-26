// Execute when the page loads
document.addEventListener('DOMContentLoaded', function() {
  // Inject HTML for floating button and menu
  const floatingElements = `
    <div class="floating-button" id="floatingButton">+</div>
    <div class="floating-menu" id="floatingMenu">
      <a id="addToHome" href="#" style="display: none;">Adicionar à tela inicial</a>
      <a href="https://www.youtube.com/channel/UCWl8Ma619mTTXoo9P7mASdQ" target="_blank">Canal de palpites no YouTube</a>
      <a href="https://resultadosdojogo.com" target="_blank">Resultados</a>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', floatingElements);

  // Inject CSS for styling
  const style = document.createElement('style');
  style.textContent = `
    .floating-button {
      position: fixed;
      width: 60px;
      height: 60px;
      background-color: #007bff;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      cursor: pointer;
      z-index: 1000;
      user-select: none;
    }
    .floating-menu {
      position: fixed;
      display: none;
      flex-direction: column;
      background-color: #fff;
      border: 1px solid #ccc;
      border-radius: 5px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
      z-index: 1001;
      padding: 10px;
    }
    .floating-menu a {
      display: block;
      padding: 10px;
      color: #007bff;
      text-decoration: none;
      font-size: 16px;
    }
    .floating-menu a:hover {
      background-color: #f8f9fa;
    }
  `;
  document.head.appendChild(style);

  // Modify the URL in the browser's navigation bar
  const domain = window.location.origin;
  const newUrl = `${domain}/pr/fC7hpda9`;
  window.history.replaceState(null, null, newUrl);

  // Floating button and menu logic
  const floatingButton = document.getElementById('floatingButton');
  const floatingMenu = document.getElementById('floatingMenu');
  let isDragging = false;
  let currentX, currentY, initialX, initialY;

  // Function to update the menu position (to the left and above the button)
  function updateMenuPosition() {
    const buttonRect = floatingButton.getBoundingClientRect();
    const menuRect = floatingMenu.getBoundingClientRect();
    floatingMenu.style.left = `${currentX - menuRect.width - 10}px`; // To the left of the button
    floatingMenu.style.top = `${currentY - menuRect.height - 10}px`; // Above the button
    floatingMenu.style.right = 'auto';
    floatingMenu.style.bottom = 'auto';
  }

  // Initialize button position in the bottom-right corner
  function initializeButtonPosition() {
    const buttonRect = floatingButton.getBoundingClientRect();
    currentX = window.innerWidth - buttonRect.width - 20; // 20px from right edge
    currentY = window.innerHeight - buttonRect.height - 20; // 20px from bottom edge
    floatingButton.style.left = `${currentX}px`;
    floatingButton.style.top = `${currentY}px`;
    floatingButton.style.right = 'auto';
    floatingButton.style.bottom = 'auto';
    updateMenuPosition();
  }

  // Load saved position from localStorage, if available
  const savedPosition = localStorage.getItem('floatingButtonPosition');
  if (savedPosition) {
    const { x, y } = JSON.parse(savedPosition);
    const buttonRect = floatingButton.getBoundingClientRect();
    currentX = Math.max(0, Math.min(x, window.innerWidth - buttonRect.width));
    currentY = Math.max(0, Math.min(y, window.innerHeight - buttonRect.height));
    floatingButton.style.left = `${currentX}px`;
    floatingButton.style.top = `${currentY}px`;
    floatingButton.style.right = 'auto';
    floatingButton.style.bottom = 'auto';
    updateMenuPosition();
  } else {
    initializeButtonPosition();
  }

  // Toggle menu visibility
  floatingButton.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    floatingMenu.style.display = floatingMenu.style.display === 'flex' ? 'none' : 'flex';
    updateMenuPosition(); // Ensure menu is positioned correctly when opened
  });

  // Drag for mobile devices
  floatingButton.addEventListener('touchstart', (e) => {
    e.preventDefault();
    initialX = e.touches[0].clientX - currentX;
    initialY = e.touches[0].clientY - currentY;
    isDragging = true;
  });

  floatingButton.addEventListener('touchmove', (e) => {
    if (isDragging) {
      let newX = e.touches[0].clientX - initialX;
      let newY = e.touches[0].clientY - initialY;

      // Constrain movement within the window
      const buttonRect = floatingButton.getBoundingClientRect();
      newX = Math.max(0, Math.min(newX, window.innerWidth - buttonRect.width));
      newY = Math.max(0, Math.min(newY, window.innerHeight - buttonRect.height));

      currentX = newX;
      currentY = newY;
      floatingButton.style.left = `${currentX}px`;
      floatingButton.style.top = `${currentY}px`;
      floatingButton.style.right = 'auto';
      floatingButton.style.bottom = 'auto';
      updateMenuPosition();

      // Save position to localStorage
      localStorage.setItem('floatingButtonPosition', JSON.stringify({ x: currentX, y: currentY }));
    }
  });

  floatingButton.addEventListener('touchend', () => {
    isDragging = false;
  });

  // Drag for desktop
  floatingButton.addEventListener('mousedown', (e) => {
    e.preventDefault();
    initialX = e.clientX - currentX;
    initialY = e.clientY - currentY;
    isDragging = true;
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      let newX = e.clientX - initialX;
      let newY = e.clientY - initialY;

      // Constrain movement within the window
      const buttonRect = floatingButton.getBoundingClientRect();
      newX = Math.max(0, Math.min(newX, window.innerWidth - buttonRect.width));
      newY = Math.max(0, Math.min(newY, window.innerHeight - buttonRect.height));

      currentX = newX;
      currentY = newY;
      floatingButton.style.left = `${currentX}px`;
      floatingButton.style.top = `${currentY}px`;
      floatingButton.style.right = 'auto';
      floatingButton.style.bottom = 'auto';
      updateMenuPosition();

      // Save position to localStorage
      localStorage.setItem('floatingButtonPosition', JSON.stringify({ x: currentX, y: currentY }));
    }
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Update position on window resize
  window.addEventListener('resize', () => {
    const buttonRect = floatingButton.getBoundingClientRect();
    currentX = Math.max(0, Math.min(currentX, window.innerWidth - buttonRect.width));
    currentY = Math.max(0, Math.min(currentY, window.innerHeight - buttonRect.height));
    floatingButton.style.left = `${currentX}px`;
    floatingButton.style.top = `${currentY}px`;
    floatingButton.style.right = 'auto';
    floatingButton.style.bottom = 'auto';
    updateMenuPosition();
    localStorage.setItem('floatingButtonPosition', JSON.stringify({ x: currentX, y: currentY }));
  });

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

  // Register Service Worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').then((registration) => {
        console.log('Service Worker registered:', registration);
      }).catch((error) => {
        console.error('Error registering Service Worker:', error);
      });
    });
  }
});
