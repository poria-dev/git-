// 🧩 loader.js - Component Injection
// Fetches and injects header/footer

document.addEventListener("DOMContentLoaded", () => {
    // 🚚 Helper to fetch and inject
    const loadComponent = (id, path) => {
        const el = document.getElementById(id);
        if (!el) return;

        fetch(path)
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                return response.text();
            })
            .then(html => {
                el.innerHTML = html;
                // Highlight active nav link based on current path
                const pathName = window.location.pathname;
                if(pathName.includes('command.html')) {
                    document.getElementById('navPractice')?.classList.add('active');
                } else {
                    document.getElementById('navHome')?.classList.add('active');
                }
            })
            .catch(err => {
                console.warn(`⚠️ Failed to load component: ${path} - `, err);
                // 🛑 Fallback content if file:// fetch fails
                if (id === 'header') {
                    el.innerHTML = `<header class="navbar flex-row" style="background:#0d1117"><div class="logo"><a>🪐 <strong>GitSphere (Local Fallback)</strong></a></div><nav><ul class="flex-row"><li><a href="index.html">Learn</a></li><li><a href="command.html">Practice</a></li></ul></nav></header>`;
                }
            });
    };

    loadComponent('header', 'components/header.html');
    loadComponent('footer', 'components/footer.html');
});