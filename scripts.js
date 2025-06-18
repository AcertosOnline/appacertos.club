/* Toggle Cotacoes Section */
function toggleCotacoes() {
    const text = document.querySelector('.cotacoes-text');
    const title = document.querySelector('#expandable-title');
    text.classList.toggle('active');
    title.textContent = text.classList.contains('active') ? 'Ocultar cotações' : 'Mostrar cotações';
}

/* Scroll and Load Animations for Section Elements */
function handleSectionVisibility(sectionId) {
    const section = document.querySelector(`#${sectionId}`);
    const fadeElements = section.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight - 100) {
            element.classList.add('visible');
        }
    });
}

function setupSectionAnimations() {
    const sections = ['cotacoes', 'bonus', 'beneficios', 'responsabilidade'];
    sections.forEach(sectionId => {
        document.addEventListener('scroll', () => handleSectionVisibility(sectionId));
        window.addEventListener('load', () => handleSectionVisibility(sectionId));
    });
}

/* Update WhatsApp and Register Button Links */
function updateLinks() {
    const whatsappLink = document.getElementById('whatsapp-link');
    const registerButton = document.getElementById('register-button');
    
    const defaultValues = {
        whatsapp: '5583993708505',
        promoterCode: 'XIx8p5TQ'
    };
    
    const nonGoogleValues = {
        whatsapp: '5583991607943',
        promoterCode: 'wd9DTgj0'
    };
    
    // Check if referrer is from Google
    const isGoogleReferrer = document.referrer.includes('google.com');
    
    // Select values based on referrer
    const finalWhatsapp = isGoogleReferrer ? defaultValues.whatsapp : nonGoogleValues.whatsapp;
    const finalPromoterCode = isGoogleReferrer ? defaultValues.promoterCode : nonGoogleValues.promoterCode;
    
    // Remove '+' from WhatsApp number if present
    const cleanWhatsapp = finalWhatsapp.replace('+', '');
    
    const defaultMessage = encodeURIComponent('Olá, quero saber mais sobre o VaiDarBoa!');
    whatsappLink.href = `https://wa.me/${cleanWhatsapp}?text=${defaultMessage}`;
    registerButton.onclick = function() {
        window.location.href = `https://app.77xbrasil.com.br/pr/${finalPromoterCode}`;
    };
}

/* Footer Section Toggling */
function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');
}

/* Initialize on Page Load */
document.addEventListener('DOMContentLoaded', () => {
    updateLinks();
    setupSectionAnimations();
});