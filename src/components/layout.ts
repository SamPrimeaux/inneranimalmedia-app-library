// Layout components - Header, Footer, Base HTML

export function renderHeader(currentPath: string = '/'): string {
  const isActive = (path: string) => currentPath === path || currentPath.startsWith(path + '/') ? 'active' : '';

  return `
<header class="site-header">
  <div class="header-container">
    <a href="/" class="logo">
      <div class="logo-icon">??</div>
      <span class="logo-text">InnerAnimal<span class="logo-accent">Media</span></span>
    </a>
    
    <nav class="nav-menu">
      <a href="/" class="nav-link ${isActive('/')}">Home</a>
      <a href="/library" class="nav-link ${isActive('/library')}">Library</a>
      <a href="/dashboard" class="nav-link ${isActive('/dashboard')}">Dashboard</a>
    </nav>
    
    <div class="header-actions">
      <button class="icon-btn" id="search-btn" title="Search">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM18 18l-4.35-4.35" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
      <button class="icon-btn" id="theme-toggle" title="Toggle theme">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 3v1m0 12v1m7-7h-1M4 10H3m13.071-5.071l-.707.707M5.636 14.364l-.707.707m11.142 0l-.707-.707M5.636 5.636l-.707-.707" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <circle cx="10" cy="10" r="3" stroke="currentColor" stroke-width="2"/>
        </svg>
      </button>
    </div>
  </div>
</header>
`;
}

export function renderFooter(): string {
  const currentYear = new Date().getFullYear();

  return `
<footer class="site-footer">
  <div class="footer-container">
    <div class="footer-grid">
      <div class="footer-col">
        <h4>InnerAnimal Media</h4>
        <p class="footer-desc">Building the future of enterprise applications with cutting-edge technology.</p>
      </div>
      
      <div class="footer-col">
        <h5>Platform</h5>
        <ul class="footer-links">
          <li><a href="/library">App Library</a></li>
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="https://api.inneranimalmedia.com">API</a></li>
          <li><a href="https://mcp.inneranimalmedia.com">MCP Server</a></li>
        </ul>
      </div>
      
      <div class="footer-col">
        <h5>Resources</h5>
        <ul class="footer-links">
          <li><a href="/docs">Documentation</a></li>
          <li><a href="/support">Support</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="https://github.com/SamPrimeaux/inneranimalmedia-app-library">GitHub</a></li>
        </ul>
      </div>
      
      <div class="footer-col">
        <h5>Connect</h5>
        <ul class="footer-links">
          <li><a href="mailto:sam@inneranimalmedia.com">Contact</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/privacy">Privacy</a></li>
          <li><a href="/terms">Terms</a></li>
        </ul>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p>&copy; ${currentYear} InnerAnimal Media. All rights reserved.</p>
      <div class="footer-badges">
        <span class="badge">Powered by Cloudflare</span>
        <span class="badge">D1 + R2 + Workers</span>
      </div>
    </div>
  </div>
</footer>
`;
}

export function renderBaseHTML(title: string, content: string, styles: string = ''): string {
  return `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="InnerAnimal Media - iOS-quality app library for enterprise applications">
  <title>${title} | InnerAnimal Media</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>${getGlobalStyles()}${styles}</style>
</head>
<body>
  ${renderHeader()}
  <main class="site-main">
    ${content}
  </main>
  ${renderFooter()}
  <script>${getGlobalScripts()}</script>
</body>
</html>`;
}

function getGlobalStyles(): string {
  return `
/* ===== CSS VARIABLES ===== */
:root {
  /* Colors - Dark Base */
  --bg-primary: #0a0e12;
  --bg-secondary: #1a2026;
  --bg-tertiary: #252d35;
  --bg-card: rgba(26, 32, 38, 0.8);
  --bg-glass: rgba(26, 32, 38, 0.7);
  
  /* Teal/Cyan Accent */
  --accent-primary: #60DFDF;
  --accent-secondary: #4ECDC4;
  --accent-dark: #3BA8A8;
  --accent-glow: rgba(96, 223, 223, 0.15);
  --accent-glow-strong: rgba(96, 223, 223, 0.25);
  
  /* Text */
  --text-primary: rgba(255, 255, 255, 0.95);
  --text-secondary: rgba(255, 255, 255, 0.7);
  --text-tertiary: rgba(255, 255, 255, 0.45);
  
  /* Borders */
  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-glass: rgba(96, 223, 223, 0.2);
  
  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;
  
  /* Radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;
  --radius-full: 9999px;
  
  /* Shadows */
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.15);
  --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.2);
  --shadow-glow: 0 0 20px var(--accent-glow);
  
  /* Transitions */
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base: 250ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 350ms cubic-bezier(0.4, 0, 0.2, 1);
}

[data-theme="light"] {
  --bg-primary: #ffffff;
  --bg-secondary: #f5f7fa;
  --bg-tertiary: #e5e9f0;
  --bg-card: rgba(255, 255, 255, 0.9);
  --bg-glass: rgba(255, 255, 255, 0.8);
  --text-primary: rgba(0, 0, 0, 0.9);
  --text-secondary: rgba(0, 0, 0, 0.7);
  --text-tertiary: rgba(0, 0, 0, 0.5);
  --border-subtle: rgba(0, 0, 0, 0.1);
  --border-glass: rgba(96, 223, 223, 0.3);
}

/* ===== BASE STYLES ===== */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  font-size: 16px;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  line-height: 1.6;
  overflow-x: hidden;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  font-family: inherit;
  border: none;
  background: none;
  cursor: pointer;
}

/* ===== HEADER ===== */
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background: rgba(10, 14, 18, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border-subtle);
  z-index: 1000;
}

.header-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 var(--space-xl);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-xl);
}

.logo {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  font-size: 20px;
  font-weight: 700;
  transition: opacity var(--transition-base);
}

.logo:hover {
  opacity: 0.8;
}

.logo-icon {
  font-size: 28px;
  line-height: 1;
}

.logo-accent {
  color: var(--accent-primary);
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.nav-link {
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
  font-weight: 500;
  transition: all var(--transition-base);
}

.nav-link:hover {
  color: var(--text-primary);
  background: var(--bg-tertiary);
}

.nav-link.active {
  color: var(--accent-primary);
  background: var(--accent-glow);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.icon-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
  transition: all var(--transition-base);
}

.icon-btn:hover {
  color: var(--text-primary);
  background: var(--bg-tertiary);
}

/* ===== MAIN CONTENT ===== */
.site-main {
  flex: 1;
  margin-top: 70px;
}

/* ===== FOOTER ===== */
.site-footer {
  background: var(--bg-secondary);
  border-top: 1px solid var(--border-subtle);
  padding: var(--space-3xl) 0 var(--space-xl);
  margin-top: var(--space-3xl);
}

.footer-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 var(--space-xl);
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr repeat(3, 1fr);
  gap: var(--space-2xl);
  margin-bottom: var(--space-2xl);
}

.footer-col h4 {
  font-size: 18px;
  margin-bottom: var(--space-md);
}

.footer-col h5 {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: var(--space-md);
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.footer-desc {
  color: var(--text-secondary);
  line-height: 1.7;
}

.footer-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.footer-links a {
  color: var(--text-secondary);
  transition: color var(--transition-base);
}

.footer-links a:hover {
  color: var(--accent-primary);
}

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: var(--space-lg);
  border-top: 1px solid var(--border-subtle);
  color: var(--text-tertiary);
  font-size: 14px;
}

.footer-badges {
  display: flex;
  gap: var(--space-sm);
}

.badge {
  padding: var(--space-xs) var(--space-md);
  background: var(--bg-tertiary);
  border-radius: var(--radius-full);
  font-size: 12px;
  font-weight: 500;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
  .header-container {
    padding: 0 var(--space-lg);
  }
  
  .nav-menu {
    display: none;
  }
  
  .footer-grid {
    grid-template-columns: 1fr;
    gap: var(--space-xl);
  }
  
  .footer-bottom {
    flex-direction: column;
    gap: var(--space-md);
    text-align: center;
  }
}
`;
}

function getGlobalScripts(): string {
  return `
// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeToggle?.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});

// Search button
const searchBtn = document.getElementById('search-btn');
searchBtn?.addEventListener('click', () => {
  window.location.href = '/library?focus=search';
});
`;
}
