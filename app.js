    // Configuração do botão flutuante
    const floatingButton = document.getElementById('floatingButton');
    const floatingMenu = document.getElementById('floatingMenu');
    let isDragging = false;
    let currentX, currentY, initialX, initialY;
    
    // Função para atualizar a posição do menu (à esquerda e acima do botão)
    function updateMenuPosition() {
      const buttonRect = floatingButton.getBoundingClientRect();
      const menuRect = floatingMenu.getBoundingClientRect();
      floatingMenu.style.left = `${currentX - menuRect.width - 10}px`; // À esquerda do botão
      floatingMenu.style.top = `${currentY - menuRect.height - 10}px`; // Acima do botão
      floatingMenu.style.right = 'auto';
      floatingMenu.style.bottom = 'auto';
    }
    
    // Inicializar posição do botão no canto inferior direito
    function initializeButtonPosition() {
      const buttonRect = floatingButton.getBoundingClientRect();
      currentX = window.innerWidth - buttonRect.width - 20; // 20px do canto direito
      currentY = window.innerHeight - buttonRect.height - 20; // 20px do canto inferior
      floatingButton.style.left = `${currentX}px`;
      floatingButton.style.top = `${currentY}px`;
      floatingButton.style.right = 'auto';
      floatingButton.style.bottom = 'auto';
      updateMenuPosition();
    }
    
    // Carregar posição salva do localStorage, se existir
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
    
    // Função para alternar o menu
    floatingButton.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      floatingMenu.style.display = floatingMenu.style.display === 'flex' ? 'none' : 'flex';
      updateMenuPosition(); // Garantir que o menu esteja na posição correta ao abrir
    });
    
    // Drag para dispositivos móveis
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
        
        // Limitar movimento dentro da tela
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
        
        // Salvar posição no localStorage
        localStorage.setItem('floatingButtonPosition', JSON.stringify({ x: currentX, y: currentY }));
      }
    });
    
    floatingButton.addEventListener('touchend', () => {
      isDragging = false;
    });
    
    // Drag para computadores
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
        
        // Limitar movimento dentro da tela
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
        
        // Salvar posição no localStorage
        localStorage.setItem('floatingButtonPosition', JSON.stringify({ x: currentX, y: currentY }));
      }
    });
    
    document.addEventListener('mouseup', () => {
      isDragging = false;
    });
    
    // Atualizar posição do botão e menu ao redimensionar a janela
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
    
    // PWA: Verificar se o app está instalado e mostrar "Adicionar à tela inicial"
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
            console.log('Usuário aceitou instalar o PWA');
          }
          deferredPrompt = null;
          addToHome.style.display = 'none';
        });
      });
    });
    
    // Verificar se está em modo standalone (PWA instalado)
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
      addToHome.style.display = 'none';
    }
    
    // Registrar o Service Worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then((registration) => {
          console.log('Service Worker registrado:', registration);
        }).catch((error) => {
          console.error('Erro ao registrar Service Worker:', error);
        });
      });
    }
