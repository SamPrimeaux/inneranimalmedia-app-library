// App Card Component

import type { App } from '../types';
import { escapeHtml, formatNumber, renderStars } from '../utils/html';

export function renderAppCard(app: App, size: 'default' | 'featured' = 'default'): string {
  const cardClass = size === 'featured' ? 'app-card app-card-featured' : 'app-card';

  return `
<a href="/library/${escapeHtml(app.slug)}" class="${cardClass}">
  <div class="app-card-header">
    <div class="app-icon">
      <img src="${escapeHtml(app.icon_url)}" alt="${escapeHtml(app.name)}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Crect fill=%22%234ECDC4%22 width=%22100%22 height=%22100%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-size=%2240%22 fill=%22white%22%3E${app.name[0].toUpperCase()}%3C/text%3E%3C/svg%3E'">
    </div>
    ${app.is_featured ? '<span class="featured-badge">Featured</span>' : ''}
  </div>
  
  <div class="app-card-body">
    <h3 class="app-name">${escapeHtml(app.name)}</h3>
    ${app.tagline ? `<p class="app-tagline">${escapeHtml(app.tagline)}</p>` : ''}
    
    <div class="app-meta">
      <span class="category-badge">${escapeHtml(app.category)}</span>
      ${app.rating > 0 ? `
        <div class="rating">
          <span class="stars">${renderStars(app.rating)}</span>
          <span class="rating-value">${app.rating.toFixed(1)}</span>
          ${app.review_count > 0 ? `<span class="review-count">(${formatNumber(app.review_count)})</span>` : ''}
        </div>
      ` : ''}
    </div>
    
    ${app.downloads > 0 ? `
      <div class="app-stats">
        <span class="stat">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 11V3M8 11L5 8M8 11l3-3M2 13h12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          ${formatNumber(app.downloads)}
        </span>
        <span class="stat">v${escapeHtml(app.version)}</span>
      </div>
    ` : ''}
  </div>
  
  <div class="app-card-footer">
    <button class="btn-primary btn-sm">View Details</button>
  </div>
</a>
`;
}

export function getAppCardStyles(): string {
  return `
.app-card {
  display: flex;
  flex-direction: column;
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  transition: all var(--transition-base);
  cursor: pointer;
  overflow: hidden;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.app-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg), var(--shadow-glow);
  border-color: var(--border-glass);
}

.app-card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: var(--space-md);
}

.app-icon {
  width: 80px;
  height: 80px;
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-md);
}

.app-icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.featured-badge {
  padding: var(--space-xs) var(--space-md);
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  color: var(--bg-primary);
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-radius: var(--radius-full);
}

.app-card-body {
  flex: 1;
  margin-bottom: var(--space-lg);
}

.app-name {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: var(--space-xs);
  color: var(--text-primary);
}

.app-tagline {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: var(--space-md);
  line-height: 1.5;
}

.app-meta {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  margin-bottom: var(--space-md);
  flex-wrap: wrap;
}

.category-badge {
  padding: var(--space-xs) var(--space-md);
  background: var(--bg-tertiary);
  color: var(--text-secondary);
  font-size: 12px;
  font-weight: 600;
  border-radius: var(--radius-sm);
  text-transform: capitalize;
}

.rating {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  font-size: 13px;
}

.stars {
  color: #FFD700;
  font-size: 14px;
  line-height: 1;
}

.rating-value {
  font-weight: 600;
  color: var(--text-primary);
}

.review-count {
  color: var(--text-tertiary);
}

.app-stats {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
  font-size: 13px;
  color: var(--text-secondary);
}

.stat {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.stat svg {
  opacity: 0.7;
}

.app-card-footer {
  padding-top: var(--space-lg);
  border-top: 1px solid var(--border-subtle);
}

.btn-primary {
  width: 100%;
  padding: var(--space-md) var(--space-lg);
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  color: var(--bg-primary);
  font-weight: 600;
  border-radius: var(--radius-md);
  transition: all var(--transition-base);
  font-size: 14px;
  text-align: center;
}

.btn-primary:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 12px var(--accent-glow-strong);
}

.btn-sm {
  padding: var(--space-sm) var(--space-lg);
  font-size: 13px;
}

/* Featured card variant */
.app-card-featured {
  grid-column: span 2;
  flex-direction: row;
  gap: var(--space-xl);
}

.app-card-featured .app-icon {
  width: 120px;
  height: 120px;
  flex-shrink: 0;
}

.app-card-featured .app-card-header {
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-md);
}

.app-card-featured .app-name {
  font-size: 24px;
}

.app-card-featured .app-tagline {
  font-size: 16px;
}

@media (max-width: 768px) {
  .app-card-featured {
    grid-column: span 1;
    flex-direction: column;
  }
  
  .app-card-featured .app-icon {
    width: 80px;
    height: 80px;
  }
}
`;
}
