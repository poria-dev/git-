// 🏠 main.js - Home Page Controller (Cards, Search, Filters)

document.addEventListener("DOMContentLoaded", () => {
    // Only run if on index.html
    const grid = document.getElementById('commandGrid');
    if (!grid) return;

    const commands = window.GIT_COMMANDS;
    const searchInput = document.getElementById('searchInput');
    const pillsContainer = document.getElementById('categoryPills');
    const countDisplay = document.getElementById('commandCount');
    
    let currentCategory = "All";
    let currentSearch = "";

    // 🗂️ Render Cards logic
    const renderCards = (data) => {
        grid.innerHTML = ""; // Clear existing
        countDisplay.innerText = data.length;

        data.forEach(cmd => {
            const card = document.createElement('div');
            card.className = 'card';
            
            // Front & Back construction
            const tagsHTML = cmd.tags.map(t => `<span class="tag">#${t}</span>`).join('');
            
            card.innerHTML = `
                <div class="card-inner">
                    <div class="card-front">
                        <div class="cmd-title">${cmd.command}</div>
                        <div class="cmd-desc">${cmd.shortDesc}</div>
                        <div class="card-tags">${tagsHTML}</div>
                    </div>
                    <div class="card-back">
                        <div class="cmd-title">${cmd.command}</div>
                        <div class="cmd-desc">${cmd.longDesc}</div>
                        <div style="margin-top: 8px; font-size: 0.85rem;">
                            <strong>Example:</strong><br>
                            <code style="background:var(--bg-primary); padding:2px 4px; border-radius:4px;">${cmd.example.replace(/\n/g, '<br>')}</code>
                        </div>
                        <div style="margin-top: 8px; font-size: 0.8rem; color: var(--warning);">
                            💡 <em>${cmd.tip}</em>
                        </div>
                        <button class="copy-btn" data-cmd="${cmd.command}">📋 Copy</button>
                    </div>
                </div>
            `;

            // Flip interactions
            card.addEventListener('click', (e) => {
                // Don't flip back if clicking copy
                if(e.target.classList.contains('copy-btn')) return;
                card.classList.toggle('is-flipped');
            });

            grid.appendChild(card);
        });

        // 📋 Copy to Clipboard Event Delegation
        const copyBtns = grid.querySelectorAll('.copy-btn');
        copyBtns.forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const text = e.target.getAttribute('data-cmd');
                try {
                    await navigator.clipboard.writeText(text);
                    const originalText = e.target.innerText;
                    e.target.innerText = "✅ Copied!";
                    e.target.style.borderColor = "var(--success)";
                    setTimeout(() => {
                        e.target.innerText = originalText;
                        e.target.style.borderColor = "var(--border)";
                    }, 1500);
                } catch (err) {
                    console.error("📋 Copy failed", err);
                }
            });
        });
    };

    // 🔍 Filter Logic
    const filterCommands = () => {
        const filtered = commands.filter(cmd => {
            const matchesCategory = currentCategory === "All" || cmd.category === currentCategory;
            const searchLower = currentSearch.toLowerCase();
            const matchesSearch = 
                cmd.command.toLowerCase().includes(searchLower) ||
                cmd.shortDesc.toLowerCase().includes(searchLower) ||
                cmd.tags.some(t => t.toLowerCase().includes(searchLower));
            
            return matchesCategory && matchesSearch;
        });
        renderCards(filtered);
    };

    // 🎧 Event Listeners
    searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value;
        filterCommands();
    });

    pillsContainer.addEventListener('click', (e) => {
        if(e.target.classList.contains('pill')) {
            // Update active state
            document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
            e.target.classList.add('active');
            
            currentCategory = e.target.getAttribute('data-category');
            filterCommands();
        }
    });

    // 🚀 Initial Render
    renderCards(commands);
    console.log("✅ Main UI Loaded. Ready to rock! 🎸");
});