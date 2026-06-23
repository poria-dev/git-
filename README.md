# 🪐 GitSphere — V2 Modular Git Manual & Terminal Simulator

> *"Learn. Practice. Master. One Command at a Time."* 🚀

Welcome to **GitSphere**, an interactive, ultra-fast, frontend-only developer reference tool and terminal simulator. Built with architectural purity in mind, GitSphere bypasses modern build tool bloat to deliver a responsive, component-driven user experience using nothing but vanilla web technologies.

---

## 🎯 Key Features

* **📚 40+ Git Command Reference:** Categorized from basic `Setup` to elite `Advanced` workflows (`rebase -i`, `cherry-pick`, `bisect`, `worktree`).
* **💻 Interactive Terminal Simulator:** Practice typing real Git commands with instantaneous mock terminal feedback, terminal history management, and a random command generator.
* **🧠 Intelligent Fuzzy Matching:** Built-in Levenshtein distance algorithm handles minor typos or trailing spaces and intelligently suggests the correct syntax.
* **⚡ Combined Master Preloader:** A synchronized, 3.5-second loading sequence blending an animated Git-merge SVG, a numeric counter, and a simulated terminal typing effect.
* **🖱️ Custom Terminal Cursor:** A smooth, lag-compensated (`requestAnimationFrame`) mouse-tracking cursor styled as a blinking green `$ _` prompt.
* **📱 Extreme Mobile-First UI:** Fully responsive design utilizing CSS Grid, Flexbox, and fluid typography (`clamp()`) ensuring gorgeous rendering from 360px mobile viewports up to 4K monitors.

---

## 📁 Repository Structure

The architecture is explicitly decoupled into independent layout, styling, data, and logic modules:

```text
git_manual_website/
│
├── index.html                  # 📘 Main catalog and search dashboard
├── command.html                # 💻 Terminal training arena
│
├── components/
│   ├── header.html            # 🧩 Global navigation bar fragment
│   └── footer.html            # 🧩 Global copyright & branding fragment
│
├── css/
│   ├── style.css              # 🎨 Core resets, design tokens & typography
│   ├── layout.css             # 🏗️ Flexbox / Grid scaffolding utilities
│   ├── components.css         # 🃏 UI modules (navbar, flipping cards, terminal)
│   ├── responsive.css         # 📱 Breakpoints & fluid text rules (mobile-first)
│   └── cursor-styles.css      # 🖱️ Mouse-tracking prompt styling & blinking animations
│
├── js/
│   ├── loader.js              # 🚚 Dynamic component injector (async fetch)
│   ├── git-commands.js        # 🗂️ Central data registry (40+ deep command structures)
│   ├── terminal-engine.js     # 🖥️ Input evaluation, fuzzy logic & progress state
│   ├── main.js                # 🔍 Filtering engine, interactive cards & clipboard copy
│   └── preloader.js           # ⚡ Synchronization hub for initialization effects
│
└── assets/
    ├── icons/                 # 🪐 Houses the favicon.svg icon asset
    └── fonts/                 # (Optional) Local typography 
```

## 🛠️ Architecture & Core Logic

### 🧩 Component Loading (`loader.js`)

To avoid repetitive structural HTML, structural fragments (`header.html`, `footer.html`) are isolated within the `components/` directory. On `DOMContentLoaded`, native asynchronous `fetch()` cycles inject these elements seamlessly into structural DOM placeholders.

### 🧠 The Fuzzy Matching Engine (`terminal-engine.js`)

If a user commits an error while practicing in the simulator, GitSphere doesn't just error out. It processes the input via a lightweight vanilla Levenshtein Distance matrix calculation:

* **$Distance \le 2$:** Triggers a helpful warning line: *“⚠️ Command not recognized. Did you mean 'git status'?”*
* **$Distance > 2$:** Safely falls back to the default system help context.

### 🛑 Motion Profiles (`responsive.css`)

To remain respectful of accessibility guidelines, all 3D card flips, transitions, and loading transformations honor the user's operating system preferences via explicit media queries:

```css
@media (prefers-reduced-motion: reduce) {
    /* 🛑 Instantly disables hardware-accelerated animations */
}
```

## 🚀 Quick Start

Because GitSphere depends strictly on native **ECMAScript modules** and native **CSS**, there are no dependencies, no `npm install`, and no build configurations.

### Option A: Local Browsing (Quickest)

Simply open `index.html` directly inside any modern web browser.

> [!WARNING]
> **CORS Notice:** Because `loader.js` uses native `fetch()` to grab HTML fragments locally, security models in certain browsers (like Google Chrome) may block local file reads (`file://`), triggering an intentional `⚠️ Failed to load component` alert in the console.

### Option B: Local Static Server (Recommended)

To enable the dynamic component loader flawlessly, serve the folder through any basic HTTP engine.

* **Via Python:**

```
    python3 -m http.server 8080
```

* **Via Node.js (VS Code Live Server alternate):**

```
    npx serve 
```

Navigate your browser to `http://localhost:8080` (or your indicated terminal port) to view GitSphere running in pristine environment conditions! 🪐

---

## 🎨 Theme Matrix

GitSphere adheres perfectly to a tailored, high-contrast dark scheme derived from modern open-source version control interfaces:

| Token Name | Hex Value | Application Context |
| :--- | :--- | :--- |
| `--bg-primary` | `#0d1117` | Canvas Backdrop |
| `--bg-card` | `#161b22` | Cards & Structured Panels |
| `--accent` | `#58a6ff` | Functional Anchors & Commands |
| `--success` | `#3fb950` | Valid Executions & Terminal Prompt |
| `--border` | `#30363d` | Fine Lines & Structural Seams |

---

## 📜 License

This project is open-source and the software architecture is licensed under the **MIT License**. Feel free to fork, expand, customize, and deploy your own customized manuals to the edge! 🌎✨

# MADE BY AFFAN ADIL

```
Junior Developer
Email: affanadil119@gmail.com
