document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DO MENU MOBILE ---
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    if (mobileNavToggle && mainNav) {
        mobileNavToggle.addEventListener('click', () => {
            mainNav.classList.toggle('nav-active');
        });
    }

    // --- EFEITO 1: PARTÍCULAS DE REDE (PARA services.html) ---
    const particleCanvas = document.getElementById('particle-canvas');
    if (particleCanvas) {
        const ctx = particleCanvas.getContext('2d');
        let particles = [];
        const setCanvasSize = () => { particleCanvas.width = particleCanvas.offsetWidth; particleCanvas.height = particleCanvas.offsetHeight; };
        class Particle {
            constructor() { this.x = Math.random() * particleCanvas.width; this.y = Math.random() * particleCanvas.height; this.size = Math.random() * 2 + 1; this.speedX = Math.random() * 0.5 - 0.25; this.speedY = Math.random() * 0.5 - 0.25; }
            update() { if (this.x > particleCanvas.width || this.x < 0) this.speedX = -this.speedX; if (this.y > particleCanvas.height || this.y < 0) this.speedY = -this.speedY; this.x += this.speedX; this.y += this.speedY; }
            draw() { ctx.fillStyle = 'rgba(0, 123, 255, 0.6)'; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill(); }
        }
        function initParticles() { particles = []; let n = (particleCanvas.width * particleCanvas.height) / 9000; for (let i = 0; i < n; i++) particles.push(new Particle()); }
        function connectParticles() { for (let a = 0; a < particles.length; a++) { for (let b = a; b < particles.length; b++) { const dist = Math.sqrt(Math.pow(particles[a].x - particles[b].x, 2) + Math.pow(particles[a].y - particles[b].y, 2)); if (dist < 120) { ctx.strokeStyle = `rgba(0, 123, 255, ${1 - dist / 120})`; ctx.lineWidth = 0.3; ctx.beginPath(); ctx.moveTo(particles[a].x, particles[a].y); ctx.lineTo(particles[b].x, particles[b].y); ctx.stroke(); } } } }
        function animateParticles() { ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height); particles.forEach(p => { p.update(); p.draw(); }); connectParticles(); requestAnimationFrame(animateParticles); }
        setCanvasSize(); initParticles(); animateParticles(); window.addEventListener('resize', () => { setCanvasSize(); initParticles(); });
    }

    // --- EFEITO 2: TRILHAS DE CIRCUITO (PARA data-cabling.html) ---
    const circuitCanvas = document.getElementById('circuit-canvas');
    if (circuitCanvas) {
        const ctx = circuitCanvas.getContext('2d');
        let lines = []; let lineCount = 100;
        const setCanvasSize = () => { circuitCanvas.width = circuitCanvas.offsetWidth; circuitCanvas.height = circuitCanvas.offsetHeight; };
        class Line {
            constructor() { this.x = Math.random() * circuitCanvas.width; this.y = Math.random() * circuitCanvas.height; this.speed = Math.random() * 1 + 0.5; this.life = Math.random() * 200 + 100; this.direction = Math.floor(Math.random() * 4); this.turnCooldown = Math.random() * 50 + 20; }
            update() { this.life--; this.turnCooldown--; if (this.turnCooldown <= 0) { this.direction = Math.floor(Math.random() * 4); this.turnCooldown = Math.random() * 50 + 20; } switch (this.direction) { case 0: this.x += this.speed; break; case 1: this.x -= this.speed; break; case 2: this.y += this.speed; break; case 3: this.y -= this.speed; break; } if (this.x > circuitCanvas.width) this.x = 0; if (this.x < 0) this.x = circuitCanvas.width; if (this.y > circuitCanvas.height) this.y = 0; if (this.y < 0) this.y = circuitCanvas.height; }
            draw() { ctx.strokeStyle = `rgba(0, 123, 255, ${this.life / 300})`; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(this.x, this.y); switch (this.direction) { case 0: ctx.lineTo(this.x - 10, this.y); break; case 1: ctx.lineTo(this.x + 10, this.y); break; case 2: ctx.lineTo(this.x, this.y - 10); break; case 3: ctx.lineTo(this.x, this.y + 10); break; } ctx.stroke(); }
        }
        function initLines() { lines = []; for (let i = 0; i < lineCount; i++) lines.push(new Line()); }
        function animateCircuit() { ctx.fillStyle = 'rgba(13, 44, 74, 0.1)'; ctx.fillRect(0, 0, circuitCanvas.width, circuitCanvas.height); lines.forEach((line, i) => { if (line.life <= 0) lines[i] = new Line(); else { line.update(); line.draw(); } }); requestAnimationFrame(animateCircuit); }
        setCanvasSize(); initLines(); animateCircuit(); window.addEventListener('resize', () => { setCanvasSize(); initLines(); });
    }

    // --- EFEITO 3: ESFERA DE DADOS INTERATIVA (VERSÃO MELHORADA) ---
    const globalNetworkCanvas = document.getElementById('global-network-canvas');
    if (globalNetworkCanvas) {
        const ctx = globalNetworkCanvas.getContext('2d');
        let sphereCenterX, sphereCenterY;
        const sphereRadius = 120;
        const numNodes = 100;
        let nodes = [];
        let mouse = { x: 0, y: 0 };

        const setCanvasSize = () => {
            globalNetworkCanvas.width = globalNetworkCanvas.offsetWidth;
            globalNetworkCanvas.height = globalNetworkCanvas.offsetHeight;
            sphereCenterX = globalNetworkCanvas.width * 0.75;
            sphereCenterY = globalNetworkCanvas.height / 2;
        };

        class Node {
            constructor() {
                this.theta = Math.random() * 2 * Math.PI;
                this.phi = Math.acos((Math.random() * 2) - 1);
                this.x = 0; this.y = 0; this.z = 0;
                this.speed = 0.002 + Math.random() * 0.003;
            }
            project(angleX, angleY) {
                const sinX = Math.sin(angleX); const cosX = Math.cos(angleX);
                const sinY = Math.sin(angleY); const cosY = Math.cos(angleY);
                
                // Rotação 3D
                const rotX = this.x * cosY + this.z * sinY;
                const rotZ = -this.x * sinY + this.z * cosY;
                const rotY = this.y * cosX - rotZ * sinX;
                const finalZ = this.y * sinX + rotZ * cosX;

                // Projeção 2D
                const scale = 500 / (500 + finalZ);
                const projX = (rotX * scale) + sphereCenterX;
                const projY = (rotY * scale) + sphereCenterY;

                return { x: projX, y: projY, scale: scale };
            }
        }

        class DataParticle {
            constructor(startNode, endNode) {
                this.start = startNode;
                this.end = endNode;
                this.progress = 0;
            }
            update() {
                this.progress += 0.02;
            }
            draw(angleX, angleY) {
                const p1 = this.start.project(angleX, angleY);
                const p2 = this.end.project(angleX, angleY);
                
                const x = p1.x + (p2.x - p1.x) * this.progress;
                const y = p1.y + (p2.y - p1.y) * this.progress;
                
                ctx.beginPath();
                ctx.arc(x, y, 1.5 * p1.scale, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${1 - this.progress})`;
                ctx.fill();
            }
        }

        let dataParticles = [];
        
        function initSphere() {
            nodes = [];
            for (let i = 0; i < numNodes; i++) {
                const node = new Node();
                node.x = sphereRadius * Math.sin(node.phi) * Math.cos(node.theta);
                node.y = sphereRadius * Math.sin(node.phi) * Math.sin(node.theta);
                node.z = sphereRadius * Math.cos(node.phi);
                nodes.push(node);
            }
        }

        let rotationX = 0;
        let rotationY = 0;
        let time = 0;

        function animate() {
            ctx.clearRect(0, 0, globalNetworkCanvas.width, globalNetworkCanvas.height);
            time++;

            // Interação com o rato
            rotationX += (mouse.y / globalNetworkCanvas.height - 0.5) * 0.01;
            rotationY += (mouse.x / globalNetworkCanvas.width - 0.5) * 0.01;
            rotationY *= 0.99; // Efeito de suavização
            rotationX *= 0.99;

            const projectedNodes = nodes.map(node => node.project(rotationX, rotationY));

            // Desenha as linhas de conexão
            for (let i = 0; i < projectedNodes.length; i++) {
                for (let j = i + 1; j < projectedNodes.length; j++) {
                    const p1 = projectedNodes[i];
                    const p2 = projectedNodes[j];
                    const dist = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
                    if (dist < 100) {
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(0, 123, 255, ${0.4 * (1 - dist / 100)})`;
                        ctx.stroke();
                    }
                }
            }
            
            // Desenha os nós
            projectedNodes.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, 1.5 * p.scale, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${p.scale * 0.9})`;
                ctx.fill();
            });

            // Cria e anima as partículas de dados
            if (dataParticles.length < 50 && time % 10 === 0) {
                const startNode = nodes[Math.floor(Math.random() * numNodes)];
                const endNode = nodes[Math.floor(Math.random() * numNodes)];
                dataParticles.push(new DataParticle(startNode, endNode));
            }

            for (let i = dataParticles.length - 1; i >= 0; i--) {
                const p = dataParticles[i];
                p.update();
                p.draw(rotationX, rotationY);
                if (p.progress >= 1) {
                    dataParticles.splice(i, 1);
                }
            }
            
            // Núcleo pulsante
            const pulse = Math.sin(time * 0.05) * 5 + 15;
            const gradient = ctx.createRadialGradient(sphereCenterX, sphereCenterY, 0, sphereCenterX, sphereCenterY, pulse);
            gradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
            gradient.addColorStop(1, 'rgba(0, 123, 255, 0)');
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(sphereCenterX, sphereCenterY, pulse, 0, Math.PI * 2);
            ctx.fill();


            requestAnimationFrame(animate);
        }

        globalNetworkCanvas.addEventListener('mousemove', e => {
            const rect = globalNetworkCanvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });

        setCanvasSize();
        initSphere();
        animate();
        window.addEventListener('resize', () => {
            setCanvasSize();
            initSphere();
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
        }, { threshold: 0.1 });
        animatedElements.forEach(element => { observer.observe(element); });
    }
});