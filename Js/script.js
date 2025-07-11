document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DO MENU MOBILE ---
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    if (mobileNavToggle && mainNav) {
        mobileNavToggle.addEventListener('click', () => {
            mainNav.classList.toggle('nav-active');
        });
    }

    // --- LÓGICA DO MODAL DE CANDIDATURA ---
    const applyButtons = document.querySelectorAll('.apply-btn');
    const modalOverlay = document.getElementById('application-modal');
    const closeModalBtn = document.querySelector('.close-modal-btn');
    const jobTitleModal = document.getElementById('job-title-modal');
    const jobTitleHiddenInput = document.getElementById('job-title-hidden');

    if (modalOverlay) {
        applyButtons.forEach(button => {
            button.addEventListener('click', () => {
                const jobCard = button.closest('.job-card');
                const jobTitle = jobCard.querySelector('h3').textContent;
                jobTitleModal.textContent = jobTitle;
                jobTitleHiddenInput.value = jobTitle;
                modalOverlay.classList.add('active');
            });
        });

        const closeModal = () => {
            modalOverlay.classList.remove('active');
        }

        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', closeModal);
        }
        modalOverlay.addEventListener('click', (event) => {
            if (event.target === modalOverlay) {
                closeModal();
            }
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

    // --- EFEITO 3: ESFERA DE DADOS INTERATIVA (PARA network-installation.html) ---
    const globalNetworkCanvas = document.getElementById('global-network-canvas');
    if (globalNetworkCanvas) {
        const ctx = globalNetworkCanvas.getContext('2d');
        let sphereCenterX, sphereCenterY;
        const sphereRadius = 120;
        const numNodes = 100;
        let nodes = [];
        let mouse = { x: 0, y: 0 };
        const setCanvasSize = () => { globalNetworkCanvas.width = globalNetworkCanvas.offsetWidth; globalNetworkCanvas.height = globalNetworkCanvas.offsetHeight; sphereCenterX = globalNetworkCanvas.width * 0.75; sphereCenterY = globalNetworkCanvas.height / 2; };
        class Node {
            constructor() { this.theta = Math.random() * 2 * Math.PI; this.phi = Math.acos((Math.random() * 2) - 1); this.x = 0; this.y = 0; this.z = 0; this.speed = 0.002 + Math.random() * 0.003; }
            project(angleX, angleY) { const sinX = Math.sin(angleX); const cosX = Math.cos(angleX); const sinY = Math.sin(angleY); const cosY = Math.cos(angleY); const rotX = this.x * cosY + this.z * sinY; const rotZ = -this.x * sinY + this.z * cosY; const rotY = this.y * cosX - rotZ * sinX; const finalZ = this.y * sinX + rotZ * cosX; const scale = 500 / (500 + finalZ); const projX = (rotX * scale) + sphereCenterX; const projY = (rotY * scale) + sphereCenterY; return { x: projX, y: projY, scale: scale }; }
        }
        class DataParticle {
            constructor(startNode, endNode) { this.start = startNode; this.end = endNode; this.progress = 0; }
            update() { this.progress += 0.02; }
            draw(angleX, angleY) { const p1 = this.start.project(angleX, angleY); const p2 = this.end.project(angleX, angleY); const x = p1.x + (p2.x - p1.x) * this.progress; const y = p1.y + (p2.y - p1.y) * this.progress; ctx.beginPath(); ctx.arc(x, y, 1.5 * p1.scale, 0, Math.PI * 2); ctx.fillStyle = `rgba(255, 255, 255, ${1 - this.progress})`; ctx.fill(); }
        }
        let dataParticles = [];
        function initSphere() { nodes = []; for (let i = 0; i < numNodes; i++) { const node = new Node(); node.x = sphereRadius * Math.sin(node.phi) * Math.cos(node.theta); node.y = sphereRadius * Math.sin(node.phi) * Math.sin(node.theta); node.z = sphereRadius * Math.cos(node.phi); nodes.push(node); } }
        let rotationX = 0; let rotationY = 0; let time = 0;
        function animate() { ctx.clearRect(0, 0, globalNetworkCanvas.width, globalNetworkCanvas.height); time++; rotationX += (mouse.y / globalNetworkCanvas.height - 0.5) * 0.01; rotationY += (mouse.x / globalNetworkCanvas.width - 0.5) * 0.01; rotationY *= 0.99; rotationX *= 0.99; const projectedNodes = nodes.map(node => node.project(rotationX, rotationY)); for (let i = 0; i < projectedNodes.length; i++) { for (let j = i + 1; j < projectedNodes.length; j++) { const p1 = projectedNodes[i]; const p2 = projectedNodes[j]; const dist = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)); if (dist < 100) { ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.strokeStyle = `rgba(0, 123, 255, ${0.4 * (1 - dist / 100)})`; ctx.stroke(); } } }
        projectedNodes.forEach(p => { ctx.beginPath(); ctx.arc(p.x, p.y, 1.5 * p.scale, 0, Math.PI * 2); ctx.fillStyle = `rgba(255, 255, 255, ${p.scale * 0.9})`; ctx.fill(); }); if (dataParticles.length < 50 && time % 10 === 0) { const startNode = nodes[Math.floor(Math.random() * numNodes)]; const endNode = nodes[Math.floor(Math.random() * numNodes)]; dataParticles.push(new DataParticle(startNode, endNode)); } for (let i = dataParticles.length - 1; i >= 0; i--) { const p = dataParticles[i]; p.update(); p.draw(rotationX, rotationY); if (p.progress >= 1) { dataParticles.splice(i, 1); } }
        const pulse = Math.sin(time * 0.05) * 5 + 15; const gradient = ctx.createRadialGradient(sphereCenterX, sphereCenterY, 0, sphereCenterX, sphereCenterY, pulse); gradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)'); gradient.addColorStop(1, 'rgba(0, 123, 255, 0)'); ctx.fillStyle = gradient; ctx.beginPath(); ctx.arc(sphereCenterX, sphereCenterY, pulse, 0, Math.PI * 2); ctx.fill(); requestAnimationFrame(animate); }
        globalNetworkCanvas.addEventListener('mousemove', e => { const rect = globalNetworkCanvas.getBoundingClientRect(); mouse.x = e.clientX - rect.left; mouse.y = e.clientY - rect.top; });
        setCanvasSize(); initSphere(); animate(); window.addEventListener('resize', () => { setCanvasSize(); initSphere(); });
    }

    // --- EFEITO 4: SCANNER DIGITAL (PARA site-surveys.html) ---
    const scannerCanvas = document.getElementById('scanner-canvas');
    if (scannerCanvas) {
        const ctx = scannerCanvas.getContext('2d');
        const setCanvasSize = () => { scannerCanvas.width = scannerCanvas.offsetWidth; scannerCanvas.height = scannerCanvas.offsetHeight; };
        let scanY = 0;
        let scanSpeed = 1;
        let points = [];
        const gridSize = 40;
        function initPoints() {
            points = [];
            for (let x = 0; x < scannerCanvas.width; x += gridSize) {
                for (let y = 0; y < scannerCanvas.height; y += gridSize) {
                    if (Math.random() > 0.85) {
                        points.push({ x: x + Math.random() * 20 - 10, y: y + Math.random() * 20 - 10, size: Math.random() * 2 + 1 });
                    }
                }
            }
        }
        function animateScanner() {
            ctx.clearRect(0, 0, scannerCanvas.width, scannerCanvas.height);
            for (let x = 0; x <= scannerCanvas.width; x += gridSize) {
                ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, scannerCanvas.height);
                ctx.strokeStyle = 'rgba(0, 123, 255, 0.05)'; ctx.stroke();
            }
            for (let y = 0; y <= scannerCanvas.height; y += gridSize) {
                ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(scannerCanvas.width, y);
                ctx.stroke();
            }
            scanY += scanSpeed;
            if (scanY > scannerCanvas.height || scanY < 0) { scanSpeed *= -1; }
            const gradient = ctx.createLinearGradient(0, scanY - 20, 0, scanY);
            gradient.addColorStop(0, 'rgba(0, 123, 255, 0)');
            gradient.addColorStop(1, 'rgba(0, 123, 255, 0.8)');
            ctx.strokeStyle = gradient; ctx.lineWidth = 2;
            ctx.beginPath(); ctx.moveTo(0, scanY); ctx.lineTo(scannerCanvas.width, scanY); ctx.stroke();
            points.forEach(p => {
                if ((scanSpeed > 0 && p.y < scanY) || (scanSpeed < 0 && p.y > scanY)) {
                    ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(0, 123, 255, 0.7)'; ctx.fill();
                }
            });
            requestAnimationFrame(animateScanner);
        }
        setCanvasSize(); initPoints(); animateScanner(); window.addEventListener('resize', () => { setCanvasSize(); initPoints(); });
    }
    
    // --- EFEITO 5: FEIXES DE LUZ (PARA fibre-optics.html) ---
    const fibreOpticCanvas = document.getElementById('fibre-optic-canvas');
    if (fibreOpticCanvas) {
        const ctx = fibreOpticCanvas.getContext('2d');
        const setCanvasSize = () => { fibreOpticCanvas.width = fibreOpticCanvas.offsetWidth; fibreOpticCanvas.height = fibreOpticCanvas.offsetHeight; };
        let lightBeams = [];
        const beamCount = 50;
        class LightBeam {
            constructor() {
                this.y = Math.random() * fibreOpticCanvas.height;
                this.x = -200;
                this.speed = 2 + Math.random() * 5;
                this.length = 100 + Math.random() * 100;
                this.opacity = 0.1 + Math.random() * 0.5;
            }
            update() { this.x += this.speed; }
            draw() { const gradient = ctx.createLinearGradient(this.x, this.y, this.x + this.length, this.y); gradient.addColorStop(0, `rgba(0, 123, 255, 0)`); gradient.addColorStop(0.5, `rgba(0, 123, 255, ${this.opacity})`); gradient.addColorStop(1, `rgba(0, 123, 255, 0)`); ctx.beginPath(); ctx.moveTo(this.x, this.y); ctx.lineTo(this.x + this.length, this.y); ctx.strokeStyle = gradient; ctx.lineWidth = 1.5; ctx.stroke(); }
        }
        function initBeams() { lightBeams = []; for (let i = 0; i < beamCount; i++) { lightBeams.push(new LightBeam()); } }
        function animateBeams() {
            ctx.clearRect(0, 0, fibreOpticCanvas.width, fibreOpticCanvas.height);
            lightBeams.forEach((beam, index) => {
                beam.update();
                beam.draw();
                if (beam.x > fibreOpticCanvas.width) { lightBeams[index] = new LightBeam(); }
            });
            requestAnimationFrame(animateBeams);
        }
        setCanvasSize(); initBeams(); animateBeams(); window.addEventListener('resize', () => { setCanvasSize(); initBeams(); });
    }

    // --- EFEITO 6: ONDAS WI-FI (PARA wireless-solutions.html) ---
    const wifiCanvas = document.getElementById('wifi-canvas');
    if (wifiCanvas) {
        const ctx = wifiCanvas.getContext('2d');
        const setCanvasSize = () => { wifiCanvas.width = wifiCanvas.offsetWidth; wifiCanvas.height = wifiCanvas.offsetHeight; };
        let waves = [];
        class Wave {
            constructor(speed, opacity, thickness) { this.x = wifiCanvas.width / 2; this.y = wifiCanvas.height / 2; this.radius = 0; this.opacity = opacity; this.speed = speed; this.thickness = thickness; }
            update() { this.radius += this.speed; if (this.opacity > 0) { this.opacity -= 0.008; } }
            draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); ctx.strokeStyle = `rgba(0, 123, 255, ${this.opacity})`; ctx.lineWidth = this.thickness; ctx.stroke(); }
        }
        function animateWaves() {
            ctx.clearRect(0, 0, wifiCanvas.width, wifiCanvas.height);
            if (Math.random() < 0.08) { waves.push(new Wave(1.5, 1, 2.5)); }
            if (Math.random() < 0.03) { waves.push(new Wave(1, 0.7, 1)); }
            waves.forEach((wave, index) => { wave.update(); wave.draw(); if (wave.opacity <= 0 && wave.radius > wifiCanvas.width * 0.7) { waves.splice(index, 1); } });
            requestAnimationFrame(animateWaves);
        }
        setCanvasSize(); animateWaves(); window.addEventListener('resize', setCanvasSize);
    }

    // --- EFEITO 7: REDE NEURAL / PLEXUS (PARA about-us.html) ---
    const aboutUsCanvas = document.getElementById('about-us-canvas');
    if (aboutUsCanvas) {
        const ctx = aboutUsCanvas.getContext('2d');
        const setCanvasSize = () => { aboutUsCanvas.width = aboutUsCanvas.offsetWidth; aboutUsCanvas.height = aboutUsCanvas.offsetHeight; };
        let plexusNodes = [];
        const plexusNodeCount = 100;
        class PlexusNode {
            constructor() {
                this.x = Math.random() * aboutUsCanvas.width;
                this.y = Math.random() * aboutUsCanvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = 1 + Math.random() * 2;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > aboutUsCanvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > aboutUsCanvas.height) this.vy *= -1;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0, 123, 255, 0.7)';
                ctx.fill();
            }
        }
        function initPlexus() {
            plexusNodes = [];
            for (let i = 0; i < plexusNodeCount; i++) {
                plexusNodes.push(new PlexusNode());
            }
        }
        function animatePlexus() {
            ctx.clearRect(0, 0, aboutUsCanvas.width, aboutUsCanvas.height);
            plexusNodes.forEach(node => {
                node.update();
                node.draw();
            });
            for (let i = 0; i < plexusNodes.length; i++) {
                for (let j = i + 1; j < plexusNodes.length; j++) {
                    const dist = Math.sqrt(Math.pow(plexusNodes[i].x - plexusNodes[j].x, 2) + Math.pow(plexusNodes[i].y - plexusNodes[j].y, 2));
                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.moveTo(plexusNodes[i].x, plexusNodes[i].y);
                        ctx.lineTo(plexusNodes[j].x, plexusNodes[j].y);
                        ctx.strokeStyle = `rgba(0, 123, 255, ${0.5 * (1 - dist / 150)})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animatePlexus);
        }
        setCanvasSize();
        initPlexus();
        animatePlexus();
        window.addEventListener('resize', () => {
            setCanvasSize();
            initPlexus();
        });
    }

    // --- EFEITO 8: PULSOS ELÉTRICOS (PARA electrical-surveys.html) ---
    const electricalCanvas = document.getElementById('electrical-canvas');
    if(electricalCanvas) {
        const ctx = electricalCanvas.getContext('2d');
        const setCanvasSize = () => { electricalCanvas.width = electricalCanvas.offsetWidth; electricalCanvas.height = electricalCanvas.offsetHeight; };
        let nodes = [];
        const nodeCount = 20;
        class ElectricalNode {
            constructor() {
                this.x = Math.random() * electricalCanvas.width;
                this.y = Math.random() * electricalCanvas.height;
                this.radius = Math.random() * 5 + 5;
                this.pulse = 0;
                this.pulseSpeed = 0.05;
            }
            update() {
                this.pulse += this.pulseSpeed;
            }
            draw() {
                const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * Math.abs(Math.sin(this.pulse)));
                gradient.addColorStop(0, 'rgba(0, 123, 255, 0.5)');
                gradient.addColorStop(1, 'rgba(0, 123, 255, 0)');
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius * Math.abs(Math.sin(this.pulse)), 0, Math.PI * 2);
                ctx.fill();
            }
        }
        function initElectricalNodes() {
            nodes = [];
            for(let i = 0; i < nodeCount; i++) {
                nodes.push(new ElectricalNode());
            }
        }
        function animateElectrical() {
            ctx.clearRect(0, 0, electricalCanvas.width, electricalCanvas.height);
            nodes.forEach(node => {
                node.update();
                node.draw();
            });
            for(let i = 0; i < 5; i++) {
                const node1 = nodes[Math.floor(Math.random() * nodeCount)];
                const node2 = nodes[Math.floor(Math.random() * nodeCount)];
                ctx.beginPath();
                ctx.moveTo(node1.x, node1.y);
                ctx.quadraticCurveTo(
                    Math.random() * electricalCanvas.width, Math.random() * electricalCanvas.height,
                    node2.x, node2.y
                );
                ctx.strokeStyle = `rgba(0, 123, 255, ${Math.random() * 0.5})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
            requestAnimationFrame(animateElectrical);
        }
        setCanvasSize();
        initElectricalNodes();
        animateElectrical();
        window.addEventListener('resize', () => {
            setCanvasSize();
            initElectricalNodes();
        });
    }

    // --- EFEITO 9: PIXELS DIGITAIS (PARA epos.html) ---
    const eposCanvas = document.getElementById('epos-canvas');
    if (eposCanvas) {
        const ctx = eposCanvas.getContext('2d');
        const setCanvasSize = () => { eposCanvas.width = eposCanvas.offsetWidth; eposCanvas.height = eposCanvas.offsetHeight; };
        let pixels = [];
        const pixelSize = 10;
        let cols, rows;
        class Pixel {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.opacity = 0;
                this.targetOpacity = 0;
                this.speed = 0.05;
            }
            update() {
                this.opacity += (this.targetOpacity - this.opacity) * this.speed;
                if (Math.random() < 0.01) {
                    this.targetOpacity = Math.random() * 0.7;
                }
            }
            draw() {
                if(this.opacity > 0.01) {
                    ctx.fillStyle = `rgba(0, 123, 255, ${this.opacity})`;
                    ctx.fillRect(this.x * pixelSize, this.y * pixelSize, pixelSize, pixelSize);
                }
            }
        }
        function initPixels() {
            pixels = [];
            cols = Math.floor(eposCanvas.width / pixelSize);
            rows = Math.floor(eposCanvas.height / pixelSize);
            for (let y = 0; y < rows; y++) {
                pixels[y] = [];
                for (let x = 0; x < cols; x++) {
                    pixels[y][x] = new Pixel(x, y);
                }
            }
        }
        function animatePixels() {
            ctx.clearRect(0, 0, eposCanvas.width, eposCanvas.height);
            for (let y = 0; y < rows; y++) {
                for (let x = 0; x < cols; x++) {
                    pixels[y][x].update();
                    pixels[y][x].draw();
                }
            }
            requestAnimationFrame(animatePixels);
        }
        setCanvasSize();
        initPixels();
        animatePixels();
        window.addEventListener('resize', () => {
            setCanvasSize();
            initPixels();
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