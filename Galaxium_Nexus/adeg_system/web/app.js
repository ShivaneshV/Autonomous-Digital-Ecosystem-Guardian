document.addEventListener('DOMContentLoaded', () => {
    initQuantumVisualizer();
    initEventHandlers();
    initNavigation();
    startSystemLoop();
    initTerminal();
});

// --- Navigation System ---
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all
            navItems.forEach(nav => nav.classList.remove('active'));
            // Add to clicked
            item.classList.add('active');

            const target = item.dataset.target;
            handleNavigation(target);
        });
    });
}

function handleNavigation(target) {
    if (target === 'dashboard' || target === 'settings') {
        document.querySelector('.main-content').scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }

    const element = document.querySelector(`.module-card.${target}`);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Visual feedback
        const originalBorder = element.style.borderColor;
        element.style.transition = 'all 0.3s ease';
        element.style.borderColor = 'var(--neon-blue)';
        element.style.boxShadow = '0 0 30px rgba(0, 243, 255, 0.2)';

        setTimeout(() => {
            element.style.borderColor = originalBorder;
            element.style.boxShadow = '';
        }, 1500);
    }
}

// --- Terminal System ---
const terminalQueue = [];
let isTyping = false;

function log(message, type = 'info') {
    terminalQueue.push({ message, type });
    processTerminalQueue();
}

function processTerminalQueue() {
    if (isTyping || terminalQueue.length === 0) return;

    isTyping = true;
    const { message, type } = terminalQueue.shift();
    const terminal = document.getElementById('terminal-output');
    const line = document.createElement('div');
    line.className = 'log-line';

    const now = new Date();
    const timeString = now.toLocaleTimeString('en-GB', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit', fractionalSecondDigits: 3 });

    // Typewriter effect for the message
    let i = 0;
    const prefix = `<span class="timestamp">[${timeString}]</span> <span class="log-${type}">`;
    const suffix = `</span>`;

    line.innerHTML = prefix + suffix;
    terminal.appendChild(line);

    const typeInterval = setInterval(() => {
        line.innerHTML = prefix + message.substring(0, i) + '█' + suffix;
        i++;
        terminal.scrollTop = terminal.scrollHeight;

        if (i > message.length) {
            clearInterval(typeInterval);
            line.innerHTML = prefix + message + suffix; // Remove cursor
            isTyping = false;
            setTimeout(processTerminalQueue, 50); // Small delay between lines
        }
    }, 5); // Fast typing speed
}

function initTerminal() {
    log('ADEG V2.0 KERNEL INITIALIZED...', 'info');
    setTimeout(() => log('LOADING QUANTUM TELEMETRY DRIVERS...', 'info'), 500);
    setTimeout(() => log('CONNECTING TO NEURAL FABRIC...', 'info'), 1200);
    setTimeout(() => log('SYSTEM ONLINE. WAITING FOR INPUT.', 'success'), 2000);
}

// --- Event Handlers ---
function initEventHandlers() {
    const synthesizeBtn = document.getElementById('synthesize-btn');
    const inputArea = document.getElementById('intent-input');
    const clearBtn = document.querySelector('.clear-logs');

    if (synthesizeBtn) {
        synthesizeBtn.addEventListener('click', () => {
            const intent = inputArea.value.trim();
            if (!intent) {
                log('ERROR: INPUT BUFFER EMPTY. ABORTING.', 'error');
                return;
            }

            log(`INTENT RECEIVED: "${intent.substring(0, 40)}..."`, 'info');
            processIntent(intent);
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            document.getElementById('terminal-output').innerHTML = '';
            log('TERMINAL BUFFER FLUSHED.', 'warn');
        });
    }
}

// --- Logic Simulation ---
async function processIntent(intent) {
    const thoughtStream = document.getElementById('thought-stream');
    thoughtStream.innerHTML = '';

    const addThought = (text, delay) => {
        return new Promise(resolve => {
            setTimeout(() => {
                const div = document.createElement('div');
                div.className = 'thought-entry';
                div.innerText = `> ${text}`;
                thoughtStream.appendChild(div);
                thoughtStream.scrollTop = thoughtStream.scrollHeight;
                resolve();
            }, delay);
        });
    };

    // UI Updates
    document.getElementById('status-gen').innerText = 'PROCESSING';
    document.getElementById('status-gen').style.color = 'var(--neon-amber)';

    log('COGNITIVE INTENT PARSER: ACTIVATED', 'warn');
    await addThought('Parsing natural language input...', 400);
    await addThought('Extracting semantic intent vectors...', 800);
    await addThought('Mapping to system architecture...', 600);

    if (intent.toLowerCase().includes('error') || intent.toLowerCase().includes('fix')) {
        await addThought('Intent classified: BUG_FIX', 500);
        log('DIAGNOSIS AGENT: ROOT CAUSE ANALYSIS STARTED', 'info');
    } else {
        await addThought('Intent classified: FEATURE_REQUEST', 500);
        log('GENERATIVE FIX AGENT: DRAFTING MODULES', 'info');
    }

    await addThought('Synthesizing code structure...', 1000);
    document.getElementById('status-gen').innerText = 'COMPLETE';
    document.getElementById('status-gen').style.color = 'var(--neon-green)';

    log('CODE SYNTHESIS COMPLETE. INITIATING SANDBOX VALIDATION.', 'success');
    simulateValidation();
}

function simulateValidation() {
    const progressBar = document.getElementById('validation-bar');
    const statusVal = document.getElementById('status-val');

    statusVal.innerText = 'RUNNING';
    statusVal.style.color = 'var(--neon-blue)';

    let width = 0;
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            statusVal.innerText = 'PASSED';
            statusVal.style.color = 'var(--neon-green)';
            log('VALIDATION SUCCESSFUL. TESTS PASSED (12/12).', 'success');
            log('DEPLOYMENT PIPELINE TRIGGERED.', 'info');

            setTimeout(() => {
                document.getElementById('status-dep').innerText = 'DEPLOYED';
                document.getElementById('status-dep').style.color = 'var(--neon-green)';
                log('PATCH APPLIED SUCCESSFULLY.', 'success');
            }, 1000);
        } else {
            width += 2;
            progressBar.style.width = width + '%';
            // Randomly log test outputs
            if (Math.random() > 0.9) {
                log(`Running Test Suite ${Math.floor(width / 10)}... OK`, 'info');
            }
        }
    }, 50);
}

function startSystemLoop() {
    // Simulate periodic system checks and metric updates
    setInterval(() => {
        // Randomize decoherence
        const decoVal = (Math.random() * 0.01).toFixed(4);
        const decoEl = document.getElementById('decoherence-val');
        if (decoEl) {
            decoEl.innerText = decoVal + '%';
            if (parseFloat(decoVal) > 0.008) {
                log(`QUANTUM NOISE DETECTED: ${decoVal}%`, 'warn');
                decoEl.style.color = 'var(--neon-red)';
            } else {
                decoEl.style.color = 'var(--neon-purple)';
            }
        }

        // Randomize entropy
        const entropy = Math.random() > 0.5 ? 'LOW' : 'NOMINAL';
        const entropyEl = document.getElementById('entropy-val');
        if (entropyEl) entropyEl.innerText = entropy;

    }, 2000);
}

/* --- Advanced Quantum Visualizer --- */
function initQuantumVisualizer() {
    const canvas = document.getElementById('quantumCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width, height;

    function resize() {
        width = canvas.parentElement.clientWidth;
        height = canvas.parentElement.clientHeight;
        canvas.width = width;
        canvas.height = height;
    }

    window.addEventListener('resize', resize);
    resize();

    const particles = [];
    const particleCount = 60;
    const connectionDistance = 100;

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 1.5;
            this.vy = (Math.random() - 0.5) * 1.5;
            this.size = Math.random() * 2 + 1;
            this.color = Math.random() > 0.5 ? '#00f3ff' : '#bc13fe'; // Blue or Purple
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Trail effect
        ctx.fillRect(0, 0, width, height);

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < connectionDistance) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(188, 19, 254, ${1 - dist / connectionDistance})`; // Purple connections
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }

    animate();
}
