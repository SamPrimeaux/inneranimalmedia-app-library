// App detail page template

import type { App, AppReview } from '../types';
import { renderBaseHTML } from '../components/layout';
import { escapeHtml, formatNumber, formatDate, renderStars } from '../utils/html';

export function renderAppDetail(app: App, reviews: AppReview[]): string {
  const screenshots = app.screenshots ? JSON.parse(app.screenshots) : [];
  
  const content = `
${getAppDetailStyles()}

<section class="app-detail-hero">
  <div class="detail-container">
    <div class="app-header">
      <div class="app-icon-large">
        <img src="${escapeHtml(app.icon_url)}" alt="${escapeHtml(app.name)}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22150%22 height=%22150%22%3E%3Crect fill=%22%234ECDC4%22 width=%22150%22 height=%22150%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-size=%2260%22 fill=%22white%22%3E${app.name[0].toUpperCase()}%3C/text%3E%3C/svg%3E'">
      </div>
      
      <div class="app-header-content">
        <h1 class="app-detail-title">${escapeHtml(app.name)}</h1>
        ${app.tagline ? `<p class="app-detail-tagline">${escapeHtml(app.tagline)}</p>` : ''}
        
        <div class="app-meta-bar">
          <div class="meta-item">
            <svg class="meta-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1l2 4 4.5 .7-3.3 3.2.8 4.6L8 11l-4 2.5.8-4.6L1.5 5.7 6 5z" fill="currentColor"/>
            </svg>
            <span class="meta-value">${app.rating > 0 ? `${app.rating.toFixed(1)} (${formatNumber(app.review_count)})` : 'No ratings yet'}</span>
          </div>
          <div class="meta-divider"></div>
          <div class="meta-item">
            <svg class="meta-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 11V3M8 11L5 8M8 11l3-3M2 13h12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <span class="meta-value">${formatNumber(app.downloads)} downloads</span>
          </div>
          <div class="meta-divider"></div>
          <div class="meta-item">
            <span class="meta-label">v${escapeHtml(app.version)}</span>
          </div>
        </div>
        
        <div class="app-actions">
          <a href="${escapeHtml(app.install_url)}" class="btn-install" target="_blank" rel="noopener">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 13V3M10 13L7 10M10 13l3-3M4 16h12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            Install App
          </a>
          ${app.documentation_url ? `
            <a href="${escapeHtml(app.documentation_url)}" class="btn-secondary-outline" target="_blank" rel="noopener">
              Documentation
            </a>
          ` : ''}
        </div>
      </div>
    </div>
  </div>
</section>

${screenshots.length > 0 ? `
  <section class="screenshots">
    <div class="detail-container">
      <h2 class="section-heading">Screenshots</h2>
      <div class="screenshots-scroll">
        ${screenshots.map((url: string, index: number) => `
          <div class="screenshot-item" data-index="${index}">
            <img src="${escapeHtml(url)}" alt="Screenshot ${index + 1}" loading="lazy">
          </div>
        `).join('')}
      </div>
    </div>
  </section>
` : ''}

<section class="app-content">
  <div class="detail-container">
    <div class="content-grid">
      <div class="main-content">
        <div class="content-section">
          <h2 class="section-heading">About</h2>
          <div class="app-description">
            ${app.long_description ? 
              escapeHtml(app.long_description).split('\\n\\n').map(p => `<p>${p}</p>`).join('') : 
              escapeHtml(app.description || 'No description available.')
            }
          </div>
        </div>
        
        ${reviews.length > 0 ? `
          <div class="content-section">
            <h2 class="section-heading">Reviews</h2>
            <div class="reviews-list">
              ${reviews.map(review => `
                <div class="review-card">
                  <div class="review-header">
                    <div class="review-author">
                      <div class="author-avatar">${review.username[0].toUpperCase()}</div>
                      <div>
                        <div class="author-name">${escapeHtml(review.username)}</div>
                        <div class="review-date">${formatDate(review.created_at)}</div>
                      </div>
                    </div>
                    <div class="review-rating">
                      ${renderStars(review.rating)}
                    </div>
                  </div>
                  ${review.title ? `<h4 class="review-title">${escapeHtml(review.title)}</h4>` : ''}
                  ${review.comment ? `<p class="review-comment">${escapeHtml(review.comment)}</p>` : ''}
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </div>
      
      <aside class="sidebar-content">
        <div class="info-card">
          <h3 class="info-card-title">Information</h3>
          <div class="info-list">
            <div class="info-item">
              <div class="info-label">Developer</div>
              <div class="info-value">
                ${app.developer_url ? 
                  `<a href="${escapeHtml(app.developer_url)}" target="_blank" rel="noopener">${escapeHtml(app.developer)}</a>` :
                  escapeHtml(app.developer)
                }
              </div>
            </div>
            <div class="info-item">
              <div class="info-label">Category</div>
              <div class="info-value">
                <span class="category-badge">${escapeHtml(app.category)}</span>
              </div>
            </div>
            <div class="info-item">
              <div class="info-label">Version</div>
              <div class="info-value">${escapeHtml(app.version)}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Release Date</div>
              <div class="info-value">${formatDate(app.release_date)}</div>
            </div>
            ${app.min_os_version ? `
              <div class="info-item">
                <div class="info-label">Requirements</div>
                <div class="info-value">Min OS ${escapeHtml(app.min_os_version)}</div>
              </div>
            ` : ''}
          </div>
        </div>
        
        <div class="info-card">
          <h3 class="info-card-title">Share</h3>
          <div class="share-buttons">
            <button class="share-btn" onclick="copyToClipboard('${escapeHtml(new URL(app.slug, 'https://inneranimalmedia.com/library/').href)}')">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M13 11l5-5m0 0l-5-5m5 5H3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
              Copy Link
            </button>
          </div>
        </div>
      </aside>
    </div>
  </div>
</section>

<script>
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert('Link copied to clipboard!');
  });
}
</script>
`;

  return renderBaseHTML(app.name, content);
}

function getAppDetailStyles(): string {
  return `<style>
/* ===== APP DETAIL HERO ===== */
.app-detail-hero {
  padding: var(--space-3xl) 0;
  background: linear-gradient(135deg, rgba(96, 223, 223, 0.05) 0%, transparent 100%);
  border-bottom: 1px solid var(--border-subtle);
}

.detail-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-xl);
}

.app-header {
  display: flex;
  gap: var(--space-2xl);
  align-items: flex-start;
}

.app-icon-large {
  width: 150px;
  height: 150px;
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  flex-shrink: 0;
}

.app-icon-large img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.app-header-content {
  flex: 1;
  min-width: 0;
}

.app-detail-title {
  font-size: 40px;
  font-weight: 800;
  margin-bottom: var(--space-sm);
  letter-spacing: -0.5px;
}

.app-detail-tagline {
  font-size: 18px;
  color: var(--text-secondary);
  margin-bottom: var(--space-lg);
  line-height: 1.6;
}

.app-meta-bar {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
  margin-bottom: var(--space-xl);
  padding-bottom: var(--space-lg);
  border-bottom: 1px solid var(--border-subtle);
}

.meta-item {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  color: var(--text-secondary);
  font-size: 14px;
}

.meta-icon {
  color: var(--accent-primary);
}

.meta-value {
  font-weight: 500;
}

.meta-label {
  font-weight: 600;
  color: var(--text-primary);
}

.meta-divider {
  width: 1px;
  height: 20px;
  background: var(--border-subtle);
}

.app-actions {
  display: flex;
  gap: var(--space-md);
  flex-wrap: wrap;
}

.btn-install {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-md) var(--space-2xl);
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  color: var(--bg-primary);
  font-weight: 600;
  font-size: 16px;
  border-radius: var(--radius-md);
  transition: all var(--transition-base);
  box-shadow: 0 4px 12px var(--accent-glow-strong);
}

.btn-install:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px var(--accent-glow-strong);
}

.btn-secondary-outline {
  display: inline-flex;
  align-items: center;
  padding: var(--space-md) var(--space-xl);
  background: transparent;
  border: 1px solid var(--border-glass);
  color: var(--text-primary);
  font-weight: 600;
  font-size: 16px;
  border-radius: var(--radius-md);
  transition: all var(--transition-base);
}

.btn-secondary-outline:hover {
  border-color: var(--accent-primary);
  background: var(--accent-glow);
}

/* ===== SCREENSHOTS ===== */
.screenshots {
  padding: var(--space-3xl) 0;
  background: var(--bg-secondary);
}

.section-heading {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: var(--space-xl);
}

.screenshots-scroll {
  display: flex;
  gap: var(--space-lg);
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: var(--accent-primary) var(--bg-tertiary);
  padding-bottom: var(--space-lg);
}

.screenshots-scroll::-webkit-scrollbar {
  height: 8px;
}

.screenshots-scroll::-webkit-scrollbar-track {
  background: var(--bg-tertiary);
  border-radius: var(--radius-sm);
}

.screenshots-scroll::-webkit-scrollbar-thumb {
  background: var(--accent-primary);
  border-radius: var(--radius-sm);
}

.screenshot-item {
  flex: 0 0 auto;
  width: 500px;
  height: 300px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  cursor: pointer;
  transition: transform var(--transition-base);
}

.screenshot-item:hover {
  transform: scale(1.02);
}

.screenshot-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ===== APP CONTENT ===== */
.app-content {
  padding: var(--space-3xl) 0;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: var(--space-3xl);
}

.main-content {
  min-width: 0;
}

.content-section {
  margin-bottom: var(--space-3xl);
}

.app-description {
  font-size: 16px;
  line-height: 1.8;
  color: var(--text-secondary);
}

.app-description p {
  margin-bottom: var(--space-lg);
}

/* ===== REVIEWS ===== */
.reviews-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.review-card {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: var(--space-lg);
}

.review-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-md);
}

.review-author {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.author-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  color: var(--bg-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 16px;
}

.author-name {
  font-weight: 600;
  margin-bottom: 2px;
}

.review-date {
  font-size: 13px;
  color: var(--text-tertiary);
}

.review-rating {
  color: #FFD700;
  font-size: 16px;
}

.review-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: var(--space-sm);
}

.review-comment {
  color: var(--text-secondary);
  line-height: 1.7;
}

/* ===== SIDEBAR ===== */
.sidebar-content {
  position: sticky;
  top: 90px;
  align-self: flex-start;
}

.info-card {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  margin-bottom: var(--space-lg);
}

.info-card-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: var(--space-lg);
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.info-label {
  font-size: 13px;
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
}

.info-value {
  font-size: 15px;
  font-weight: 500;
  color: var(--text-primary);
}

.info-value a {
  color: var(--accent-primary);
  transition: opacity var(--transition-base);
}

.info-value a:hover {
  opacity: 0.8;
}

.category-badge {
  display: inline-block;
  padding: var(--space-xs) var(--space-md);
  background: var(--accent-glow);
  color: var(--accent-primary);
  font-size: 13px;
  font-weight: 600;
  border-radius: var(--radius-sm);
  text-transform: capitalize;
}

.share-buttons {
  display: flex;
  gap: var(--space-sm);
}

.share-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  width: 100%;
  padding: var(--space-md);
  background: var(--bg-tertiary);
  border: 1px solid var(--border-subtle);
  color: var(--text-primary);
  font-weight: 500;
  font-size: 14px;
  border-radius: var(--radius-md);
  transition: all var(--transition-base);
}

.share-btn:hover {
  border-color: var(--accent-primary);
  background: var(--accent-glow);
}

/* ===== RESPONSIVE ===== */
@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
  
  .sidebar-content {
    position: relative;
    top: 0;
  }
}

@media (max-width: 768px) {
  .app-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .app-detail-title {
    font-size: 32px;
  }
  
  .screenshot-item {
    width: 350px;
    height: 210px;
  }
  
  .app-actions {
    width: 100%;
  }
  
  .btn-install,
  .btn-secondary-outline {
    width: 100%;
    justify-content: center;
  }
}
</style>`;
}
