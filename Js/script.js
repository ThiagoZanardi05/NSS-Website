document.addEventListener('DOMContentLoaded', () => {

    // Lógica para o menu mobile (pode manter se quiser usar no futuro)
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', () => {
            alert('Menu mobile a ser implementado!');
        });
    }

    // NOVO: Lógica para animar elementos ao rolar a página
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // Se o elemento está visível na tela
                if (entry.isIntersecting) {
                    // Adiciona a classe 'visible' para ativar a animação
                    entry.target.classList.add('visible');
                    // Para de observar o elemento para a animação não repetir
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1 // A animação começa quando 10% do elemento estiver visível
        });

        // Pede ao observer para observar cada um dos elementos marcados
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
});