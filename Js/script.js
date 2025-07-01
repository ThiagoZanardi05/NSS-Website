document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DO MENU MOBILE ---
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (mobileNavToggle && mainNav) {
        mobileNavToggle.addEventListener('click', () => {
            // Adiciona ou remove a classe 'nav-active' para mostrar/esconder o menu
            mainNav.classList.toggle('nav-active');
        });
    }


    // --- LÓGICA DO EFEITO DE PARTÍCULAS ---
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        
        const setCanvasSize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
            }
            update() {
                if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
                if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
                this.x += this.speedX;
                this.y += this.speedY;
            }
            draw() {
                ctx.fillStyle = 'rgba(0, 123, 255, 0.6)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            let numberOfParticles = (canvas.width * canvas.height) / 9000;
            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle());
            }
        }

        function connectParticles() {
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    const distance = Math.sqrt(
                        Math.pow(particles[a].x - particles[b].x, 2) +
                        Math.pow(particles[a].y - particles[b].y, 2)
                    );
                    if (distance < 120) {
                        ctx.strokeStyle = `rgba(0, 123, 255, ${1 - distance / 120})`;
                        ctx.lineWidth = 0.3;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            connectParticles();
            requestAnimationFrame(animate);
        }

        setCanvasSize();
        initParticles();
        animate();

        window.addEventListener('resize', () => {
            setCanvasSize();
            initParticles();
        });
    }


    // --- LÓGICA DAS ANIMAÇÕES DE SCROLL ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
});