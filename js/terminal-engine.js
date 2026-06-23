// 💻 terminal-engine.js - Practice Logic
// Handles the interactive command line

document.addEventListener("DOMContentLoaded", () => {
    // Only run if on command.html
    const termOutput = document.getElementById('terminalOutput');
    if (!termOutput) return;

    const termInput = document.getElementById('terminalInput');
    const btnClear = document.getElementById('btnClear');
    const btnRandom = document.getElementById('btnRandom');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const suggestList = document.getElementById('suggestedCommands');

    // 🗺️ Terminal Responses Mapping (20+)
    const TERMINAL_RESPONSES = new Map([
        ["git init", "Initialized empty Git repository in /home/user/project/.git/"],
        ["git clone", "fatal: You must specify a repository to clone."],
        ["git status", "On branch main\nYour branch is up to date with 'origin/main'.\nnothing to commit, working tree clean"],
        ["git add .", "Staged all untracked and modified files."],
        ["git commit -m", "error: switch `m' requires a value"],
        ["git commit", "[main 7f2a1b3] Update project structure\n 3 files changed, 45 insertions(+), 2 deletions(-)"],
        ["git branch", "* main\n  feature-auth\n  hotfix-css"],
        ["git checkout", "fatal: not a git repository (or any of the parent directories): .git"],
        ["git checkout main", "Switched to branch 'main'\nYour branch is up to date with 'origin/main'."],
        ["git checkout -b new-branch", "Switched to a new branch 'new-branch'"],
        ["git switch main", "Switched to branch 'main'"],
        ["git merge feature-auth", "Updating 7f2a1b3..9a4c2f1\nFast-forward\n src/auth.js | 120 +++++++++++++++++++++++++\n 1 file changed, 120 insertions(+)"],
        ["git rebase main", "Successfully rebased and updated refs/heads/feature-auth."],
        ["git remote -v", "origin  https://github.com/user/project.git (fetch)\norigin  https://github.com/user/project.git (push)"],
        ["git push", "Enumerating objects: 5, done.\nWriting objects: 100% (5/5), 450 bytes | 450.00 KiB/s, done.\nTo https://github.com/user/project.git\n   7f2a1b3..9a4c2f1  main -> main"],
        ["git pull", "Already up to date."],
        ["git fetch", "Fetching origin\nFrom https://github.com/user/project\n * [new branch]      feature-api -> origin/feature-api"],
        ["git log --oneline", "9a4c2f1 Add auth\n7f2a1b3 Init project\n5e2d1a0 First commit"],
        ["git show", "commit 9a4c2f1...\nAuthor: User <user@example.com>\nDate:   Tue Jun 23 12:00:00 2026 +0000\n\n    Add auth"],
        ["git diff", "diff --git a/index.html b/index.html\nindex 1234567..890abcd 100644\n--- a/index.html\n+++ b/index.html\n@@ -1,3 +1,4 @@\n+<p>Added line</p>"],
        ["git reset", "Unstaged changes after reset:\nM\tindex.html"],
        ["git stash", "Saved working directory and index state WIP on main: 9a4c2f1 Add auth"]
    ]);

    const mappedKeys = Array.from(TERMINAL_RESPONSES.keys());
    const totalMappedCommands = mappedKeys.length;
    let masteredSet = new Set();

    // 📐 Levenshtein Distance for fuzzy matching
    const levenshtein = (a, b) => {
        const matrix = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
        for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
        for (let j = 0; j <= b.length; j++) matrix[0][j] = j;
        for (let i = 1; i <= a.length; i++) {
            for (let j = 1; j <= b.length; j++) {
                const cost = a[i - 1] === b[j - 1] ? 0 : 1;
                matrix[i][j] = Math.min(
                    matrix[i - 1][j] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j - 1] + cost
                );
            }
        }
        return matrix[a.length][b.length];
    };

    // 📊 Progress Logic
    const updateProgress = () => {
        const percentage = (masteredSet.size / totalMappedCommands) * 100;
        progressFill.style.width = `${percentage}%`;
        progressText.innerText = `${masteredSet.size}/${totalMappedCommands} mastered`;
        
        if (masteredSet.size === totalMappedCommands) {
            progressText.innerText += " 🏆 Mastered!";
            progressText.style.color = "var(--success)";
        }
    };

    // 🖥️ UI Actions
    const appendOutput = (text, type = 'normal') => {
        const div = document.createElement('div');
        div.className = `line ${type}`;
        // Convert newlines to breaks
        div.innerHTML = text.replace(/\n/g, '<br>').replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
        
        // Colors based on type
        if(type === 'success') div.style.color = 'var(--success)';
        if(type === 'warning') div.style.color = 'var(--warning)';
        if(type === 'danger') div.style.color = 'var(--danger)';

        termOutput.appendChild(div);
        termOutput.scrollTop = termOutput.scrollHeight;
    };

    const processCommand = (input) => {
        const cmd = input.trim();
        if (!cmd) return;

        // Echo command
        appendOutput(`$ ${cmd}`, 'normal');

        // Check Exact Match
        if (TERMINAL_RESPONSES.has(cmd)) {
            appendOutput(TERMINAL_RESPONSES.get(cmd), 'success');
            masteredSet.add(cmd);
            updateProgress();
            return;
        }

        // Fuzzy Match logic
        let closestMatch = null;
        let minDistance = Infinity;

        for (const validCmd of mappedKeys) {
            const dist = levenshtein(cmd, validCmd);
            if (dist < minDistance) {
                minDistance = dist;
                closestMatch = validCmd;
            }
        }

        // Tolerance of 2 characters typo
        if (minDistance > 0 && minDistance <= 2) {
            appendOutput(`⚠️ Command not recognised. Did you mean <strong style="color:var(--accent)">'${closestMatch}'</strong>?`, 'warning');
        } else {
            appendOutput(`⚠️ Command not recognised. Try 'git status' or 'git init'.`, 'warning');
        }
    };

    // 🎧 Event Listeners
    termInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            processCommand(termInput.value);
            termInput.value = ''; // clear input
        }
    });

    btnClear.addEventListener('click', () => {
        termOutput.innerHTML = '';
        termInput.focus();
    });

    btnRandom.addEventListener('click', () => {
        const randomCmd = mappedKeys[Math.floor(Math.random() * mappedKeys.length)];
        termInput.value = randomCmd;
        termInput.focus();
    });

    // 💡 Populate suggestions
    const renderSuggestions = () => {
        // Pick 5 random from mapped
        const shuffled = [...mappedKeys].sort(() => 0.5 - Math.random()).slice(0, 5);
        suggestList.innerHTML = '';
        shuffled.forEach(c => {
            const li = document.createElement('li');
            li.innerHTML = `<code>${c}</code>`;
            li.style.cursor = "pointer"; // Even though cursor hidden, semantically good
            li.addEventListener('click', () => {
                termInput.value = c;
                termInput.focus();
            });
            suggestList.appendChild(li);
        });
    };

    // Keep focus on terminal when clicking terminal background
    document.querySelector('.terminal-panel').addEventListener('click', () => {
        termInput.focus();
    });

    // Init
    updateProgress();
    renderSuggestions();
    console.log("🖥️ Terminal Engine Initialized.");
});