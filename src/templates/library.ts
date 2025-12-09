// Library page template

import type { App, Category } from '../types';
import { renderBaseHTML } from '../components/layout';
import { renderAppCard, getAppCardStyles } from '../components/app-card';
import { escapeHtml } from '../utils/html';

export function renderLibrary(
  apps: App[],
  categories: Category[],
  currentCategory?: string,
  currentSort?: string,
  searchQuery?: string,
  totalApps?: number
): string {
  const content = `
${getLibraryStyles()}

<section class="library-header">
  <div class="library-container">
    <h1 class="library-title">App Library</h1>
    <p class="library-subtitle">Discover powerful applications built for the modern enterprise</p>
    
    <div class="search-bar">
      <svg class="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM18 18l-4.35-4.35" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
      <input
        type="search"
        id="search-input"
        placeholder="Search apps..."
        value="${escapeHtml(searchQuery || '')}"
        class="search-input"
      >
      ${searchQuery ? '<button class="clear-search" id="clear-search">?</button>' : ''}
    </div>
  </div>
</section>

<section class="library-controls">
  <div class="library-container">
    <div class="categories-scroll">
      <button class="category-chip ${!currentCategory ? 'active' : ''}" data-category="all">
        All Apps
      </button>
      ${categories.map(cat => `
        <button class="category-chip ${currentCategory === cat.slug ? 'active' : ''}" data-category="${escapeHtml(cat.slug)}">
          <span class="chip-icon">${cat.icon || '??'}</span>
          ${escapeHtml(cat.name)}
        </button>
      `).join('')}
    </div>
    
    <div class="sort-controls">
      <label for="sort-select" class="sort-label">Sort by:</label>
      <select id="sort-select" class="sort-select">
        <option value="popular" ${currentSort === 'popular' ? 'selected' : ''}>Most Popular</option>
        <option value="newest" ${currentSort === 'newest' ? 'selected' : ''}>Newest</option>
        <option value="rating" ${currentSort === 'rating' ? 'selected' : ''}>Highest Rated</option>
        <option value="name" ${currentSort === 'name' ? 'selected' : ''}>Name (A-Z)</option>
      </select>
    </div>
  </div>
</section>

<section class="library-content">
  <div class="library-container">
    ${searchQuery ? `
      <div class="search-results-info">
        <p>Found <strong>${apps.length}</strong> app${apps.length !== 1 ? 's' : ''} matching "<strong>${escapeHtml(searchQuery)}</strong>"</p>
      </div>
    ` : ''}
    
    ${apps.length > 0 ? `
      <div class="apps-grid">
        ${apps.map(app => renderAppCard(app)).join('')}
      </div>
      
      ${totalApps && totalApps > apps.length ? `
        <div class="load-more">
          <button class="btn-load-more" id="load-more">
            Load More Apps
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 8l5 5 5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      ` : ''}
    ` : `
      <div class="empty-state">
        <div class="empty-icon">??</div>
        <h3 class="empty-title">No apps found</h3>
        <p class="empty-desc">Try adjusting your search or filters</p>
        <button class="btn-secondary" onclick="window.location.href='/library'">Clear Filters</button>
      </div>
    `}
  </div>
</section>

<script>
// Search functionality
const searchInput = document.getElementById('search-input');
const clearSearch = document.getElementById('clear-search');
let searchTimeout;

searchInput?.addEventListener('input', (e) => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    const query = e.target.value.trim();
    if (query.length > 0) {
      updateURL({ search: query, page: 1 });
    } else {
      updateURL({ search: null, page: null });
    }
  }, 500);
});

clearSearch?.addEventListener('click', () => {
  searchInput.value = '';
  updateURL({ search: null, page: null });
});

// Category filtering
document.querySelectorAll('.category-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    const category = chip.getAttribute('data-category');
    if (category === 'all') {
      updateURL({ category: null, page: null });
    } else {
      updateURL({ category, page: null });
    }
  });
});

// Sort functionality
const sortSelect = document.getElementById('sort-select');
sortSelect?.addEventListener('change', (e) => {
  updateURL({ sort: e.target.value, page: null });
});

// Update URL and reload
function updateURL(params) {
  const url = new URL(window.location);
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      url.searchParams.set(key, value);
    } else {
      url.searchParams.delete(key);
    }
  });
  window.location.href = url.toString();
}

// Focus search if ?focus=search in URL
if (window.location.search.includes('focus=search')) {
  searchInput?.focus();
}
</script>
`;

  return renderBaseHTML('App Library', content, getLibraryStyles() + getAppCardStyles());
}

function getLibraryStyles(): string {
  return `<style>
/* ===== LIBRARY HEADER ===== */
.library-header {
  padding: var(--space-3xl) 0 var(--space-2xl);
  background: linear-gradient(135deg, rgba(96, 223, 223, 0.05) 0%, transparent 100%);
}

.library-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 var(--space-xl);
}

.library-title {
  font-size: 48px;
  font-weight: 800;
  text-align: center;
  margin-bottom: var(--space-md);
  letter-spacing: -0.5px;
}

.library-subtitle {
  font-size: 18px;
  color: var(--text-secondary);
  text-align: center;
  margin-bottom: var(--space-2xl);
}

.search-bar {
  max-width: 600px;
  margin: 0 auto;
  position: relative;
}

.search-icon {
  position: absolute;
  left: var(--space-md);
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-tertiary);
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: var(--space-md) var(--space-2xl) var(--space-md) 48px;
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  color: var(--text-primary);
  font-size: 16px;
  transition: all var(--transition-base);
}

.search-input:focus {
  outline: none;
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 3px var(--accent-glow);
}

.clear-search {
  position: absolute;
  right: var(--space-md);
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--bg-tertiary);
  color: var(--text-secondary);
  transition: all var(--transition-base);
  font-size: 14px;
}

.clear-search:hover {
  background: var(--accent-primary);
  color: var(--bg-primary);
}

/* ===== LIBRARY CONTROLS ===== */
.library-controls {
  padding: var(--space-xl) 0;
  border-bottom: 1px solid var(--border-subtle);
  position: sticky;
  top: 70px;
  background: rgba(10, 14, 18, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  z-index: 100;
}

.library-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-xl);
}

.categories-scroll {
  flex: 1;
  display: flex;
  gap: var(--space-sm);
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.categories-scroll::-webkit-scrollbar {
  display: none;
}

.category-chip {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-sm) var(--space-lg);
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 600;
  border-radius: var(--radius-full);
  white-space: nowrap;
  transition: all var(--transition-base);
}

.category-chip:hover {
  border-color: var(--border-glass);
  background: var(--accent-glow);
  color: var(--text-primary);
}

.category-chip.active {
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  border-color: transparent;
  color: var(--bg-primary);
}

.chip-icon {
  font-size: 16px;
  line-height: 1;
}

.sort-controls {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  flex-shrink: 0;
}

.sort-label {
  font-size: 14px;
  color: var(--text-secondary);
  font-weight: 500;
}

.sort-select {
  padding: var(--space-sm) var(--space-lg);
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  color: var(--text-primary);
  font-size: 14px;
  font-weight: 500;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--transition-base);
}

.sort-select:hover {
  border-color: var(--border-glass);
}

.sort-select:focus {
  outline: none;
  border-color: var(--accent-primary);
}

/* ===== LIBRARY CONTENT ===== */
.library-content {
  padding: var(--space-3xl) 0;
  min-height: 60vh;
}

.search-results-info {
  margin-bottom: var(--space-xl);
  padding: var(--space-md) var(--space-lg);
  background: var(--accent-glow);
  border: 1px solid var(--border-glass);
  border-radius: var(--radius-md);
  color: var(--text-secondary);
}

.search-results-info strong {
  color: var(--accent-primary);
}

.apps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--space-xl);
}

.load-more {
  margin-top: var(--space-3xl);
  text-align: center;
}

.btn-load-more {
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

.btn-load-more:hover {
  border-color: var(--accent-primary);
  background: var(--accent-glow);
  transform: translateY(-2px);
}

/* ===== EMPTY STATE ===== */
.empty-state {
  text-align: center;
  padding: var(--space-3xl) 0;
}

.empty-icon {
  font-size: 80px;
  margin-bottom: var(--space-lg);
  opacity: 0.5;
}

.empty-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: var(--space-sm);
}

.empty-desc {
  font-size: 16px;
  color: var(--text-secondary);
  margin-bottom: var(--space-xl);
}

/* ===== RESPONSIVE ===== */
@media (max-width: 1024px) {
  .library-container {
    flex-direction: column;
    align-items: stretch;
  }
  
  .categories-scroll {
    order: 2;
  }
  
  .sort-controls {
    order: 1;
    justify-content: space-between;
  }
}

@media (max-width: 768px) {
  .library-title {
    font-size: 36px;
  }
  
  .apps-grid {
    grid-template-columns: 1fr;
  }
  
  .library-controls {
    position: relative;
    top: 0;
  }
}
</style>`;
}
