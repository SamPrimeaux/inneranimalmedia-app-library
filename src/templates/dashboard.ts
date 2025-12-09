// Dashboard template (moved from root to /dashboard)

import { renderBaseHTML } from '../components/layout';

export function renderDashboard(): string {
  const content = `
<section class="dashboard-redirect">
  <div class="redirect-container">
    <div class="redirect-card">
      <div class="redirect-icon">??</div>
      <h1 class="redirect-title">Dashboard Coming Soon</h1>
      <p class="redirect-desc">
        The full enterprise dashboard will be available here soon. 
        In the meantime, check out our app library!
      </p>
      <div class="redirect-actions">
        <a href="/library" class="btn-primary">Explore Library</a>
        <a href="/" class="btn-secondary">Go Home</a>
      </div>
    </div>
  </div>
</section>

<style>
.dashboard-redirect {
  min-height: calc(100vh - 70px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-2xl);
}

.redirect-container {
  max-width: 600px;
  width: 100%;
}

.redirect-card {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-xl);
  padding: var(--space-3xl);
  text-align: center;
  box-shadow: var(--shadow-lg);
}

.redirect-icon {
  font-size: 80px;
  margin-bottom: var(--space-xl);
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.redirect-title {
  font-size: 32px;
  font-weight: 800;
  margin-bottom: var(--space-md);
}

.redirect-desc {
  font-size: 18px;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: var(--space-2xl);
}

.redirect-actions {
  display: flex;
  gap: var(--space-md);
  justify-content: center;
  flex-wrap: wrap;
}
</style>
`;

  return renderBaseHTML('Dashboard', content);
}
