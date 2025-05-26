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
      z-index: 10000; /* Increased z-index to ensure visibility */
      user-select: none;
      touch-action: none; /* Prevent default touch behaviors */
    }
    .floating-menu {
      position: fixed;
      display: none;
      flex-direction: column;
      background-color: #fff;
      border: 1px solid #ccc;
      border-radius: 5px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
      z-index: 10001; /* Higher than button */
      padding: 10px;
      min-width: 150px; /* Ensure menu is wide enough */
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
    @media (max-width: 600px) {
      .floating-menu {
        min-width: 120px; /* Smaller width for mobile */
        font-size: 14px; /* Slightly smaller text */
      }
      .floating-button {
        width: 50px; /* Slightly smaller button for mobile */
        height: 50px;
        font-size: 20px;
      }
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
    // Ensure menu stays within viewport
    let menuX = currentX - menuRect.width - 10;
    let menuY = currentY - menuRect.height - 10;
    // Adjust if menu goes off-screen
    if (menuX < 0) menuX = currentX + buttonRect.width + 10; // Move to right if no space on left
    if (menuY < 0) menuY = currentY + 10; // Move below if no space above
    floatingMenu.style.left = `${menuX}px`;
    floatingMenu.style.top = `${menuY}px`;
    floatingMenu.style.right = 'auto';
    floatingMenu.style.bottom = 'auto';
  }

  // Initialize button position in the bottom-right corner
  function initializeButtonPosition() {
    const buttonRect = floatingButton.getBoundingClientRect();
    currentX = window.innerWidth - buttonRect.width - 20;
    currentY = window.innerHeight - buttonRect.height - 20;
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

  // Toggle menu visibility with touch and click support
  floatingButton.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Button clicked, toggling menu'); // Debug log
    floatingMenu.style.display = floatingMenu.style.display === 'flex' ? 'none' : 'flex';
    if (floatingMenu.style.display === 'flex') {
      updateMenuPosition();
      console.log('Menu displayed at:', floatingMenu.style.left, floatingMenu.style.top); // Debug log
    }
  });

  // Handle touch events for dragging
  floatingButton.addEventListener('touchstart', (e) => {
    e.preventDefault();
    initialX = e.touches[0].clientX - currentX;
    initialY = e.touches[0].clientY - currentY;
    isDragging = true;
    console.log('Touchstart, dragging started'); // Debug log
  });

  floatingButton.addEventListener('touchmove', (e) => {
    if (isDragging) {
      let newX = e.touches[0].clientX - initialX;
      let newY = e.touches[0].clientY - initialY;
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
      localStorage.setItem('floatingButtonPosition', JSON.stringify({ x: currentX, y: currentY }));
      console.log('Touchmove, button at:', currentX, currentY); // Debug log
    }
  });

  floatingButton.addEventListener('touchend', () => {
    isDragging = false;
    console.log('Touchend, dragging stopped'); // Debug log
  });

  // Handle mouse events for dragging
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

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!floatingButton.contains(e.target) && !floatingMenu.contains(e.target)) {
      floatingMenu.style.display = 'none';
      console.log('Clicked outside, menu closed'); // Debug log
    }
  });
});
