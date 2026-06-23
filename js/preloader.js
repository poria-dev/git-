// ⚡ preloader.js - The Master Preloader & Cursor
// 📌 Note: Runs immediately to overlay the page

(function initPreloaderAndCursor() {
    // 💨 1. Inject Preloader HTML
    const preloaderHTML = `
    <div id="git-preloader">
        <svg width="120" height="120" viewBox="0 0 100 100">
            <path id="path-left" d="M 20,80 Q 50,50 50,20" stroke="var(--accent)" fill="none" stroke-width="4" stroke-dasharray="100" stroke-dashoffset="100"/>
            <path id="path-right" d="M 80,80 Q 50,50 50,20" stroke="var(--success)" fill="none" stroke-width="4" stroke-dasharray="100" stroke-dashoffset="100"/>
            <circle cx="50" cy="20" r="0" fill="var(--warning)" id="merge-node"/>
        </svg>
        <div id="preloader-term"></div>
        <div class="flex-row" style="width: 60%; gap: 1rem; max-width: 400px;">
            <div style="flex-grow: 1; height: 8px; background: var(--border); border-radius: 4px; overflow: hidden;">
                <div id="preloader-fill" style="width: 0%; height: 100%; background: var(--text-primary); transition: width 0.1s linear;"></div>
            </div>
            <span id="preloader-count" style="font-family: var(--font-mono); font-size: 0.9rem;">0%</span>
        </div>
    </div>
    <div class="custom-cursor" id="customCursor">$<span class="blink">_</span></div>
    `;
    
    document.body.insertAdjacentHTML('afterbegin', preloaderHTML);

    const preloader = document.getElementById('git-preloader');
    const term = document.getElementById('preloader-term');
    const fill = document.getElementById('preloader-fill');
    const count = document.getElementById('preloader-count');
    const pathL = document.getElementById('path-left');
    const pathR = document.getElementById('path-right');
    const node = document.getElementById('merge-node');

    let isSvgDone = false, isTypingDone = false, isCounterDone = false;
    const checkCompletion = () => {
        if (isSvgDone && isTypingDone && isCounterDone) {
            setTimeout(() => {
                preloader.style.opacity = '0';
                preloader.style.pointerEvents = 'none';
                setTimeout(() => preloader.remove(), 500);
            }, 200); // Slight buffer
        }
    };

    // ⏱️ Total sequence is ~3.5 seconds
    const startTime = Date.now();
    const duration = 3000; // 3 seconds core animation

    // 🌟 Effect 1: SVG Merge Animation
    const animateSVG = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / 2000, 1); // paths draw in 2s
        const offset = 100 - (progress * 100);
        pathL.style.strokeDashoffset = offset;
        pathR.style.strokeDashoffset = offset;

        if (progress >= 1) {
            node.setAttribute('r', '8');
            node.style.transition = 'r 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            isSvgDone = true;
            checkCompletion();
        } else {
            requestAnimationFrame(animateSVG);
        }
    };
    requestAnimationFrame(animateSVG);

    // 🌟 Effect 2: Progress Counter
    const counterInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const percent = Math.floor(progress * 100);
        fill.style.width = `${percent}%`;
        count.innerText = `${percent}%`;

        if (progress >= 1) {
            clearInterval(counterInterval);
            isCounterDone = true;
            checkCompletion();
        }
    }, 30);

    // 🌟 Effect 3: Terminal Typing
    const textToType = "Loading GitSphere... ⚡";
    let charIndex = 0;
    setTimeout(() => {
        const typeInterval = setInterval(() => {
            term.innerText += textToType.charAt(charIndex);
            charIndex++;
            if (charIndex >= textToType.length) {
                clearInterval(typeInterval);
                isTypingDone = true;
                checkCompletion();
            }
        }, 60); // Speed
    }, 500); // 500ms delay as requested

    // 🖱️ Cursor Lerp Implementation
    const cursor = document.getElementById('customCursor');
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    const animateCursor = () => {
        // Lerp factor 0.2 for smooth slight delay
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        requestAnimationFrame(animateCursor);
    };
    animateCursor();

})();