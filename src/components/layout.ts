// Layout components for Vision Board

export function renderHeader(currentPath: string = '/'): string {
  return `
<header class="site-header">
  <div class="header-container">
    <a href="/" class="logo">
      <div class="logo-icon">✨</div>
      <span class="logo-text">Vision<span class="logo-accent">Board</span></span>
    </a>
    
    <nav class="nav-menu">
      <a href="/" class="nav-link ${currentPath === '/' ? 'active' : ''}">Board</a>
      <a href="/ceo" class="nav-link ${currentPath === '/ceo' ? 'active' : ''}">CEO Dashboard</a>
      <a href="/visionlab" class="nav-link ${currentPath === '/visionlab' ? 'active' : ''}">Vision Lab</a>
      <a href="/thoughts" class="nav-link ${currentPath === '/thoughts' ? 'active' : ''}">Thoughts</a>
    </nav>
    
    <div class="header-actions">
      <button class="icon-btn" id="notifications-btn" title="Notifications">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 2a6 6 0 0 0-6 6v3.586l-.707.707A1 1 0 0 0 4 14h12a1 1 0 0 0 .707-1.707L16 11.586V8a6 6 0 0 0-6-6zM10 18a3 3 0 0 1-3-3h6a3 3 0 0 1-3 3z" stroke="currentColor" stroke-width="1.5" fill="none"/>
        </svg>
        <span class="notification-badge" id="notification-count" style="display: none;">0</span>
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
    <p>&copy; ${currentYear} Vision Board. Built with Cloudflare Workers, D1, and ❤️</p>
    <div class="footer-badges">
      <span class="badge">Cloudflare Powered</span>
      <span class="badge">Real-time Sync</span>
    </div>
  </div>
</footer>
`;
}

export function renderBaseHTML(title: string, content: string, styles: string = '', scripts: string = ''): string {
  return `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Vision Board - Align your goals, plans, tasks, and reminders">
  <title>${title} | Vision Board</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <style>${getGlobalStyles()}${styles}</style>
</head>
<body>
  ${renderHeader()}
  <main class="site-main">
    ${content}
  </main>
  ${renderFooter()}
  <script>${getGlobalScripts()}${scripts}</script>
</body>
</html>`;
}

function getGlobalStyles(): string {
  return `
/* ===== CSS VARIABLES ===== */
:root {
  /* Colors - AutoMeaux Dark Theme */
  --bg-primary: #0a0e1a;
  --bg-secondary: #060911;
  --bg-tertiary: #12192b;
  --bg-card: rgba(20, 28, 46, 0.95);
  --bg-glass: rgba(30, 40, 64, 0.8);
  --bg-hover: rgba(40, 50, 80, 0.6);
  
  /* Gradient Accents */
  --accent-primary: #3dd9d0;
  --accent-secondary: #7de3cb;
  --accent-tertiary: #60a5fa;
  --accent-gradient: linear-gradient(135deg, #3dd9d0 0%, #7de3cb 45%, #60a5fa 100%);
  --accent-glow: rgba(61, 217, 208, 0.25);
  --accent-glow-strong: rgba(61, 217, 208, 0.4);
  
  /* Status Colors */
  --success: #34d399;
  --warning: #fbbf24;
  --error: #ef4444;
  --info: #60a5fa;
  
  /* Text */
  --text-primary: #e8eef7;
  --text-secondary: #a0aec0;
  --text-tertiary: #6b7280;
  
  /* Borders */
  --border-subtle: rgba(255, 255, 255, 0.1);
  --border-glass: rgba(61, 217, 208, 0.3);
  
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
  --radius-xl: 24px;
  --radius-full: 9999px;
  
  /* Shadows */
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.25);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.35);
  --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.45);
  --shadow-glow: 0 0 30px var(--accent-glow);
  --shadow-glow-strong: 0 0 50px var(--accent-glow-strong);
  
  /* Transitions */
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base: 250ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 400ms cubic-bezier(0.4, 0, 0.2, 1);
}

[data-theme="light"] {
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --bg-tertiary: #f1f5f9;
  --bg-card: rgba(255, 255, 255, 0.8);
  --bg-glass: rgba(255, 255, 255, 0.6);
  --bg-hover: rgba(0, 0, 0, 0.05);
  --text-primary: rgba(0, 0, 0, 0.9);
  --text-secondary: rgba(0, 0, 0, 0.7);
  --text-tertiary: rgba(0, 0, 0, 0.5);
  --border-subtle: rgba(0, 0, 0, 0.1);
  --border-glass: rgba(99, 102, 241, 0.2);
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
  background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-primary) 100%);
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
  background: rgba(10, 14, 26, 0.9);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid var(--border-subtle);
  z-index: 1000;
}

.header-container {
  max-width: 1600px;
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
  font-size: 22px;
  font-weight: 800;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  transition: opacity var(--transition-base);
}

.logo:hover {
  opacity: 0.8;
}

.logo-icon {
  font-size: 28px;
  line-height: 1;
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.logo-accent {
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.nav-link {
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  font-weight: 500;
  transition: all var(--transition-base);
  position: relative;
}

.nav-link:hover {
  color: var(--text-primary);
  background: var(--bg-hover);
}

.nav-link.active {
  color: var(--accent-primary);
  background: var(--accent-glow);
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: var(--space-md);
  right: var(--space-md);
  height: 2px;
  background: var(--accent-gradient);
  border-radius: var(--radius-full);
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
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  transition: all var(--transition-base);
  position: relative;
}

.icon-btn:hover {
  color: var(--text-primary);
  background: var(--bg-hover);
}

.notification-badge {
  position: absolute;
  top: 6px;
  right: 6px;
  background: var(--error);
  color: white;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: var(--radius-full);
  min-width: 18px;
  text-align: center;
}

/* ===== MAIN CONTENT ===== */
.site-main {
  flex: 1;
  margin-top: 70px;
  padding: var(--space-2xl) var(--space-xl);
  max-width: 1600px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

/* ===== FOOTER ===== */
.site-footer {
  background: var(--bg-secondary);
  border-top: 1px solid var(--border-subtle);
  padding: var(--space-xl) 0;
  margin-top: var(--space-3xl);
}

.footer-container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 var(--space-xl);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-md);
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
  color: var(--text-secondary);
}

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
  .header-container {
    padding: 0 var(--space-lg);
  }
  
  .nav-menu {
    gap: var(--space-xs);
  }
  
  .nav-link {
    padding: var(--space-xs) var(--space-sm);
    font-size: 14px;
  }
  
  .site-main {
    padding: var(--space-lg) var(--space-md);
  }
  
  .footer-container {
    flex-direction: column;
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

const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeToggle?.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});

// Notifications
const notificationsBtn = document.getElementById('notifications-btn');
notificationsBtn?.addEventListener('click', () => {
  // TODO: Show notifications panel
  console.log('Notifications clicked');
});

// Auto-refresh reminders count
async function updateNotificationCount() {
  try {
    const response = await fetch('/api/reminders?upcoming=true');
    const reminders = await response.json();
    const count = reminders.filter(r => !r.is_completed).length;
    const badge = document.getElementById('notification-count');
    if (badge) {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'block' : 'none';
    }
  } catch (error) {
    console.error('Failed to update notification count:', error);
  }
}

// Update every 30 seconds
setInterval(updateNotificationCount, 30000);
updateNotificationCount();
`;
}
