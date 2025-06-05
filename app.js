
document.addEventListener('DOMContentLoaded', function() {
    // Create modal elements
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 1000;
        display: none;
        backdrop-filter: blur(5px);
    `;

    const modal = document.createElement('div');
    modal.className = 'modal-content';
    modal.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 20px;
        border-radius: 8px;
        max-width: 400px;
        width: 90%;
        text-align: center;
        z-index: 1001;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    `;

    const closeButton = document.createElement('button');
    closeButton.innerHTML = '&times;';
    closeButton.style.cssText = `
        position: absolute;
        top: 10px;
        right: 10px;
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
    `;

    const message = document.createElement('p');
    message.innerHTML = 'Para jogar no cassino, abra o menu <span style="font-size: 1.2em;">&#9776;</span> e escolha a opção "Jogar cassino"';
    message.style.cssText = `
        margin: 20px 0;
        font-size: 16px;
        line-height: 1.5;
    `;

    // Append elements
    modal.appendChild(closeButton);
    modal.appendChild(message);
    modalOverlay.appendChild(modal);
    document.body.appendChild(modalOverlay);

    // Show modal
    function showModal() {
        modalOverlay.style.display = 'flex';
    }

    // Hide modal
    function hideModal() {
        modalOverlay.style.display = 'none';
    }

    // Event listeners
    closeButton.addEventListener('click', hideModal);
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            hideModal();
        }
    });

    // Show modal on page load
    showModal();
});
