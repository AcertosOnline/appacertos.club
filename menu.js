document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const menuModal = document.getElementById('menuModal');
    const closeModal = document.getElementById('closeModal');
    const installOption = document.getElementById('installOption');
    let deferredPrompt;

    // Initialize position and offsets
    let xOffset = 0;
    let yOffset = 0;

    // Load saved position from localStorage or set to default
    const savedPosition = localStorage.getItem('hamburgerMenuPosition');
    if (savedPosition) {
        const { left, top } = JSON.parse(savedPosition);
        hamburgerMenu.style.left = `${left}px`;
        hamburgerMenu.style.top = `${top}px`;
        xOffset = left;
        yOffset = top;
    } else {
        // Default position (bottom-right)
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const menuSize = 50; // Button size
        xOffset = vw - menuSize - 20; // 20px margin from right
        yOffset = vh - menuSize - 20; // 20px margin from bottom
        hamburgerMenu.style.left = `${xOffset}px`;
        hamburgerMenu.style.top = `${yOffset}px`;
    }

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

    // Touch events for mobile
    hamburgerMenu.addEventListener('touchstart', dragStart);
    hamburgerMenu.addEventListener('touchend', dragEnd);
    hamburgerMenu.addEventListener('touchmove', drag);

    // Mouse events for desktop
    hamburgerMenu.addEventListener('mousedown', dragStart);
    document.addEventListener('mouseup', dragEnd);
    document.addEventListener('mousemove', drag);

    function dragStart(e) {
        // Get current position of the button
        const rect = hamburgerMenu.getBoundingClientRect();
        xOffset = rect.left;
        yOffset = rect.top;

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
        // Save position to localStorage
        localStorage.setItem('hamburgerMenuPosition', JSON.stringify({
            left: currentX,
            top: currentY
        }));
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

            // Get viewport dimensions
            const vw = window.innerWidth;
            const vh = window.innerHeight;
            const menuSize = hamburgerMenu.offsetWidth; // Assuming width = height (50px)

            // Constrain position within viewport boundaries
            currentX = Math.max(0, Math.min(currentX, vw - menuSize));
            currentY = Math.max(0, Math.min(currentY, vh - menuSize));

            xOffset = currentX;
            yOffset = currentY;

            // Update position using left and top
            hamburgerMenu.style.left = `${currentX}px`;
            hamburgerMenu.style.top = `${currentY}px`;
        }
    }

    // Check PWA status at load
    showInstallOption();

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
