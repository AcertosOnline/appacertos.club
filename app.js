document.addEventListener('DOMContentLoaded', function() {
    // Check if modal has been shown before
    if (!localStorage.getItem('welcomeModalShown')) {
        // Create modal elements
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'welcome-modal-overlay';
        modalOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 10002;
            display: none;
            backdrop-filter: blur(5px);
        `;

        const modal = document.createElement('div');
        modal.className = 'welcome-modal-content';
        modal.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            max-width: 400px;
            width: 90%;
            text-align: center;
            z-index: 10003;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        `;

        const message = document.createElement('p');
        message.innerHTML = 'Para jogar no cassino, abra o menu <span style="font-size: 1.2em;">☰</span> e escolha a opção "Jogar cassino"';
        message.style.cssText = `
            margin: 20px 0;
            font-size: 16px;
            line-height: 1.5;
            color: #202020;
            font-family: Arial, sans-serif;
        `;

        const okButton = document.createElement('button');
        okButton.innerHTML = 'OK';
        okButton.style.cssText = `
            background: #007bff;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            margin-top: 10px;
            font-family: Arial, sans-serif;
        `;

        // Append elements
        modal.appendChild(message);
        modal.appendChild(okButton);
        modalOverlay.appendChild(modal);
        document.body.appendChild(modalOverlay);

        // Show modal
        function showModal() {
            modalOverlay.style.display = 'flex';
        }

        // Hide modal and set localStorage
        function hideModal() {
            modalOverlay.style.display = 'none';
            localStorage.setItem('welcomeModalShown', 'true');
        }

        // Event listeners
        okButton.addEventListener('click', hideModal);

        // Show modal when page is fully loaded
        window.addEventListener('load', showModal);
    }
});
