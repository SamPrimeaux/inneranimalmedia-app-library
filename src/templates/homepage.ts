// Homepage template

import type { App } from '../types';
import { renderBaseHTML } from '../components/layout';
import { renderAppCard, getAppCardStyles } from '../components/app-card';
import { formatNumber } from '../utils/html';

export function renderHomepage(featuredApps: App[], stats: any): string {
  const content = `
${getHomepageStyles()}

<section class="hero">
  <div class="hero-container">
    <div class="hero-content">
      <h1 class="hero-title">
        Your Digital
        <span class="gradient-text">Ecosystem</span>
      </h1>
      <p class="hero-subtitle">
        Enterprise tools, creative apps, and intelligence—all in one beautifully crafted platform.
        Built on Cloudflare's edge for lightning-fast performance.
      </p>
      <div class="hero-cta">
        <a href="/library" class="btn-hero btn-hero-primary">
          Explore Library
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7 13l5-5m0 0l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
        <a href="/dashboard" class="btn-hero btn-hero-secondary">View Dashboard</a>
      </div>
    </div>
    
    <div class="hero-visual">
      <div class="floating-card card-1">
        <div class="card-icon">??</div>
        <div class="card-text">Real-time Analytics</div>
      </div>
      <div class="floating-card card-2">
        <div class="card-icon">??</div>
        <div class="card-text">Edge Performance</div>
      </div>
      <div class="floating-card card-3">
        <div class="card-icon">??</div>
        <div class="card-text">AI Powered</div>
      </div>
      <div class="floating-card card-4">
        <div class="card-icon">?</div>
        <div class="card-text">Instant Deploy</div>
      </div>
    </div>
  </div>
</section>

<section class="stats-banner">
  <div class="stats-container">
    <div class="stat-item">
      <div class="stat-value">${formatNumber(stats.totalApps)}+</div>
      <div class="stat-label">Apps Available</div>
    </div>
    <div class="stat-divider"></div>
    <div class="stat-item">
      <div class="stat-value">${formatNumber(stats.totalDownloads)}+</div>
      <div class="stat-label">Total Downloads</div>
    </div>
    <div class="stat-divider"></div>
    <div class="stat-item">
      <div class="stat-value">${stats.totalCategories}</div>
      <div class="stat-label">Categories</div>
    </div>
    <div class="stat-divider"></div>
    <div class="stat-item">
      <div class="stat-value">${formatNumber(stats.totalReviews)}+</div>
      <div class="stat-label">Reviews</div>
    </div>
  </div>
</section>

<section class="featured-apps">
  <div class="content-container">
    <div class="section-header">
      <h2 class="section-title">Featured Apps</h2>
      <p class="section-subtitle">Hand-picked applications that power modern enterprises</p>
    </div>
    
    <div class="apps-grid">
      ${featuredApps.map(app => renderAppCard(app, 'featured')).join('')}
    </div>
    
    <div class="section-footer">
      <a href="/library" class="btn-secondary">
        View All Apps
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M7 13l5-5m0 0l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </a>
    </div>
  </div>
</section>

<section class="features">
  <div class="content-container">
    <div class="section-header centered">
      <h2 class="section-title">Built for Performance</h2>
      <p class="section-subtitle">Enterprise-grade infrastructure with consumer-grade simplicity</p>
    </div>
    
    <div class="features-grid">
      <div class="feature-card">
        <div class="feature-icon">?</div>
        <h3 class="feature-title">Lightning Fast</h3>
        <p class="feature-desc">Deployed on Cloudflare's global edge network for sub-50ms response times worldwide.</p>
      </div>
      
      <div class="feature-card">
        <div class="feature-icon">??</div>
        <h3 class="feature-title">Secure by Default</h3>
        <p class="feature-desc">Built-in DDoS protection, SSL, and enterprise-grade security at every layer.</p>
      </div>
      
      <div class="feature-card">
        <div class="feature-icon">??</div>
        <h3 class="feature-title">Real-time Insights</h3>
        <p class="feature-desc">Monitor usage, performance, and costs with live analytics dashboards.</p>
      </div>
      
      <div class="feature-card">
        <div class="feature-icon">??</div>
        <h3 class="feature-title">Global Scale</h3>
        <p class="feature-desc">Automatically scales to handle millions of requests without configuration.</p>
      </div>
      
      <div class="feature-card">
        <div class="feature-icon">??</div>
        <h3 class="feature-title">AI Integration</h3>
        <p class="feature-desc">Seamlessly integrate with Claude, GPT-4, and other AI models via MCP.</p>
      </div>
      
      <div class="feature-card">
        <div class="feature-icon">??</div>
        <h3 class="feature-title">Cost Effective</h3>
        <p class="feature-desc">Pay only for what you use with transparent, usage-based pricing.</p>
      </div>
    </div>
  </div>
</section>
`;

  return renderBaseHTML('Home', content, getAppCardStyles());
}

function getHomepageStyles(): string {
  return `<style>
/* ===== HERO SECTION ===== */
.hero {
  padding: var(--space-3xl) 0;
  background: linear-gradient(135deg, rgba(96, 223, 223, 0.05) 0%, rgba(78, 205, 196, 0.05) 100%);
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at top right, rgba(96, 223, 223, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

.hero-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 var(--space-xl);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-3xl);
  align-items: center;
  position: relative;
}

.hero-content {
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-title {
  font-size: 56px;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: var(--space-lg);
  letter-spacing: -1px;
}

.gradient-text {
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 18px;
  line-height: 1.7;
  color: var(--text-secondary);
  margin-bottom: var(--space-2xl);
  max-width: 540px;
}

.hero-cta {
  display: flex;
  gap: var(--space-md);
  flex-wrap: wrap;
}

.btn-hero {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-md) var(--space-xl);
  font-size: 16px;
  font-weight: 600;
  border-radius: var(--radius-md);
  transition: all var(--transition-base);
}

.btn-hero-primary {
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  color: var(--bg-primary);
  box-shadow: 0 4px 12px var(--accent-glow-strong);
}

.btn-hero-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px var(--accent-glow-strong);
}

.btn-hero-secondary {
  background: var(--bg-card);
  border: 1px solid var(--border-glass);
  color: var(--text-primary);
}

.btn-hero-secondary:hover {
  border-color: var(--accent-primary);
  background: var(--accent-glow);
}

/* Hero Visual */
.hero-visual {
  position: relative;
  height: 500px;
}

.floating-card {
  position: absolute;
  background: var(--bg-card);
  border: 1px solid var(--border-glass);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  display: flex;
  align-items: center;
  gap: var(--space-md);
  box-shadow: var(--shadow-lg);
  backdrop-filter: blur(10px);
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(2deg); }
}

.card-1 { top: 10%; left: 10%; animation-delay: 0s; }
.card-2 { top: 30%; right: 10%; animation-delay: 0.5s; }
.card-3 { bottom: 30%; left: 20%; animation-delay: 1s; }
.card-4 { bottom: 10%; right: 20%; animation-delay: 1.5s; }

.card-icon {
  font-size: 32px;
}

.card-text {
  font-weight: 600;
  font-size: 14px;
  white-space: nowrap;
}

/* ===== STATS BANNER ===== */
.stats-banner {
  background: var(--bg-card);
  border-top: 1px solid var(--border-subtle);
  border-bottom: 1px solid var(--border-subtle);
  padding: var(--space-2xl) 0;
}

.stats-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 var(--space-xl);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2xl);
}

.stat-item {
  text-align: center;
  flex: 1;
}

.stat-value {
  font-size: 40px;
  font-weight: 800;
  color: var(--accent-primary);
  margin-bottom: var(--space-xs);
}

.stat-label {
  font-size: 14px;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
}

.stat-divider {
  width: 1px;
  height: 60px;
  background: var(--border-subtle);
}

/* ===== SECTIONS ===== */
.content-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: var(--space-3xl) var(--space-xl);
}

.section-header {
  text-align: center;
  max-width: 700px;
  margin: 0 auto var(--space-3xl);
}

.section-header.centered {
  text-align: center;
}

.section-title {
  font-size: 40px;
  font-weight: 800;
  margin-bottom: var(--space-md);
  letter-spacing: -0.5px;
}

.section-subtitle {
  font-size: 18px;
  color: var(--text-secondary);
  line-height: 1.7;
}

.section-footer {
  margin-top: var(--space-3xl);
  text-align: center;
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-md) var(--space-xl);
  background: var(--bg-card);
  border: 1px solid var(--border-glass);
  color: var(--text-primary);
  font-weight: 600;
  border-radius: var(--radius-md);
  transition: all var(--transition-base);
}

.btn-secondary:hover {
  border-color: var(--accent-primary);
  background: var(--accent-glow);
  transform: translateY(-2px);
}

/* ===== FEATURED APPS ===== */
.apps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: var(--space-xl);
}

/* ===== FEATURES ===== */
.features {
  background: var(--bg-secondary);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: var(--space-xl);
}

.feature-card {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  transition: all var(--transition-base);
}

.feature-card:hover {
  transform: translateY(-4px);
  border-color: var(--border-glass);
  box-shadow: var(--shadow-lg);
}

.feature-icon {
  font-size: 48px;
  margin-bottom: var(--space-md);
  line-height: 1;
}

.feature-title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: var(--space-sm);
}

.feature-desc {
  color: var(--text-secondary);
  line-height: 1.7;
  font-size: 15px;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 1024px) {
  .hero-container {
    grid-template-columns: 1fr;
  }
  
  .hero-visual {
    display: none;
  }
  
  .stats-container {
    flex-wrap: wrap;
  }
  
  .stat-divider {
    display: none;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 40px;
  }
  
  .section-title {
    font-size: 32px;
  }
  
  .apps-grid,
  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>`;
}
