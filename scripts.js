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
