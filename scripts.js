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
    if (!section) {
        console.warn(`Section with ID "${sectionId}" not found.`);
        return;
    }
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
    const sections = ['cotacoes', 'bonus', 'beneficios'];
    sections.forEach(sectionId => {
        const section = document.querySelector(`#${sectionId}`);
        console.log(`Section ${sectionId}:`, section ? 'Found' : 'Not found');
        document.addEventListener('scroll', () => handleSectionVisibility(sectionId));
        window.addEventListener('load', () => handleSectionVisibility(sectionId));
    });
}

/* Initialize on Page Load */
document.addEventListener('DOMContentLoaded', () => {
    setupSectionAnimations();
});
