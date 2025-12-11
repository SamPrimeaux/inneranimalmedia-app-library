// Vision Board Main Template

import { renderBaseHTML } from '../components/layout';
import type { Vision, Mission, Plan, Task, Reminder, Thought, Pillar, NorthStarMetric } from '../types';

const AGENT_TYPES = [
  { id: 'architect', name: 'System Architect', role: 'System design, architecture, tech stack', color: '#3b82f6', icon: blueprintIcon() },
  { id: 'frontend', name: 'Frontend Developer', role: 'UI/UX, components, responsive design', color: '#3dd9d0', icon: layoutIcon() },
  { id: 'backend', name: 'Backend Developer', role: 'APIs, database, auth, caching', color: '#8b5cf6', icon: serverIcon() },
  { id: 'devops', name: 'DevOps Engineer', role: 'Deployment, CI/CD, monitoring', color: '#f59e0b', icon: pipelineIcon() },
  { id: 'ai_ml', name: 'AI/ML Specialist', role: 'Models, embeddings, RAG, fine-tune', color: '#10b981', icon: brainIcon() },
  { id: 'three_d', name: '3D Engineer', role: 'Three.js, shaders, 3D scenes', color: '#ec4899', icon: cubeIcon() },
  { id: 'qa_tester', name: 'QA Engineer', role: 'Tests, quality, performance', color: '#ef4444', icon: checkIcon() },
  { id: 'security', name: 'Security Specialist', role: 'Audit, auth, compliance', color: '#dc2626', icon: shieldIcon() },
];

const WORKFLOW_PRESETS = [
  { id: 'fullstack_app', name: 'Full Stack Application', duration: '8-14h', automation: 'high', agents: ['architect', 'frontend', 'backend', 'devops', 'qa_tester'] },
  { id: 'landing_page', name: 'Landing Page Sprint', duration: '1.5-2h', automation: 'very high', agents: ['frontend', 'devops'] },
  { id: 'api_service', name: 'API Service', duration: '4.5-5.5h', automation: 'high', agents: ['architect', 'backend', 'security', 'devops'] },
  { id: 'three_d_showcase', name: '3D Product Showcase', duration: '3.5-5.5h', automation: 'medium', agents: ['three_d', 'frontend', 'devops'] },
  { id: 'rag_system', name: 'RAG AI System', duration: '4-7h', automation: 'medium', agents: ['ai_ml', 'backend', 'frontend'] },
];

export function renderVisionBoard(
  visions: Vision[],
  missions: Mission[],
  plans: Plan[],
  tasks: Task[],
  reminders: Reminder[],
  thoughts: Thought[],
  pillars: Pillar[],
  northStar: NorthStarMetric | null,
  baseUrl: string = ''
): string {
  const styles = getVisionBoardStyles();
  const scripts = getVisionBoardScripts(baseUrl);

  const content = `
<div class="vision-board">
  <!-- AutoMeaux Hero -->
  <div class="board-hero automeaux-hero">
    <div class="hero-left">
      <p class="eyebrow">AutoMeaux · Rapid Dev Zone</p>
      <h1 class="hero-title">Multi-Agent Development System</h1>
      <p class="hero-subtitle">Parallelized builders for Cloudflare, GitHub, OpenAI, and Cursor.</p>
      <div class="hero-actions">
        <button class="btn-primary">Launch Multi-Agent Run</button>
        <button class="btn-secondary">View Playbooks</button>
        <span class="hero-meta">Optimized for R2 · D1 · Workers</span>
      </div>
    </div>
    <div class="hero-right">
      <div class="metrics-card">
        <div class="metric">
          <span class="metric-value">70%</span>
          <span class="metric-label">Time Reduction</span>
        </div>
        <div class="metric">
          <span class="metric-value">4</span>
          <span class="metric-label">Parallel Agents</span>
        </div>
        <div class="metric">
          <span class="metric-value">99%</span>
          <span class="metric-label">Automation Score</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Agent Framework -->
  <section class="panel">
    <div class="panel-header">
      <div>
        <p class="eyebrow">Agent Orchestration</p>
        <h2 class="panel-title">Specialized Agent Teams</h2>
        <p class="panel-subtitle">System architect, frontend, backend, DevOps, AI/ML, 3D, QA, and security.</p>
      </div>
      <button class="btn-secondary">Manage Agents</button>
    </div>
    <div class="agent-grid">
      ${AGENT_TYPES.map(agent => `
        <div class="agent-card" style="--agent-color:${agent.color}">
          <div class="agent-icon">${agent.icon}</div>
          <div class="agent-meta">
            <div class="agent-name">${agent.name}</div>
            <div class="agent-role">${agent.role}</div>
          </div>
          <span class="agent-pill">Active</span>
        </div>
      `).join('')}
    </div>
  </section>

  <!-- Workflow Templates -->
  <section class="panel">
    <div class="panel-header">
      <div>
        <p class="eyebrow">Workflow Templates</p>
        <h2 class="panel-title">Battle-Tested Playbooks</h2>
        <p class="panel-subtitle">From landing pages to RAG pipelines and 3D showcases.</p>
      </div>
      <button class="btn-secondary">Add Custom Workflow</button>
    </div>
    <div class="workflow-grid">
      ${WORKFLOW_PRESETS.map(wf => `
        <div class="workflow-card">
          <div class="workflow-top">
            <div>
              <div class="workflow-name">${wf.name}</div>
              <div class="workflow-meta">${wf.duration} · Automation ${wf.automation}</div>
            </div>
            <div class="workflow-agents">
              ${wf.agents.slice(0, 4).map(id => renderAgentDot(id)).join('')}
              ${wf.agents.length > 4 ? `<span class="agent-dot extra">+${wf.agents.length - 4}</span>` : ''}
            </div>
          </div>
          <button class="btn-primary btn-ghost">Run</button>
        </div>
      `).join('')}
    </div>
  </section>

  <!-- Tab Navigation -->
  <div class="board-tabs">
    <button class="tab-btn active" data-tab="vision">Vision & Mission</button>
    <button class="tab-btn" data-tab="plans">Plans</button>
    <button class="tab-btn" data-tab="tasks">Tasks</button>
    <button class="tab-btn" data-tab="reminders">Reminders</button>
    <button class="tab-btn" data-tab="thoughts">Thoughts</button>
  </div>

  <!-- Vision & Mission Tab -->
  <div class="tab-content active" id="tab-vision">
    ${renderVisionSection(visions, missions, pillars, northStar)}
  </div>

  <!-- Plans Tab -->
  <div class="tab-content" id="tab-plans">
    ${renderPlansSection(plans, missions)}
  </div>

  <!-- Tasks Tab -->
  <div class="tab-content" id="tab-tasks">
    ${renderTasksSection(tasks, plans)}
  </div>

  <!-- Reminders Tab -->
  <div class="tab-content" id="tab-reminders">
    ${renderRemindersSection(reminders)}
  </div>

  <!-- Thoughts Tab -->
  <div class="tab-content" id="tab-thoughts">
    ${renderThoughtsSection(thoughts)}
  </div>
</div>
`;

  return renderBaseHTML('Vision Board', content, styles, scripts);
}

function renderVisionSection(
  visions: Vision[],
  missions: Mission[],
  pillars: Pillar[],
  northStar: NorthStarMetric | null
): string {
  return `
<div class="vision-section">
  <!-- North Star Metric -->
  ${northStar ? renderNorthStarMetric(northStar) : renderEmptyNorthStar()}

  <!-- Strategic Pillars -->
  <div class="pillars-section">
    <h2 class="section-title">Strategic Pillars</h2>
    <div class="pillars-grid">
      ${pillars.length > 0 ? pillars.map(p => renderPillar(p)).join('') : renderEmptyPillars()}
    </div>
    <button class="btn-primary" onclick="showAddPillarModal()">+ Add Pillar</button>
  </div>

  <!-- Vision (3-5 Years) -->
  <div class="vision-card-section">
    <h2 class="section-title">Vision (3-5 Years)</h2>
    <div class="vision-cards">
      ${visions.length > 0 ? visions.map(v => renderVisionCard(v)).join('') : renderEmptyVision()}
    </div>
    <button class="btn-primary" onclick="showAddVisionModal()">+ Create Vision</button>
  </div>

  <!-- Mission (12-18 Months) -->
  <div class="mission-section">
    <h2 class="section-title">Mission (12-18 Months)</h2>
    <div class="mission-cards">
      ${missions.length > 0 ? missions.map(m => renderMissionCard(m)).join('') : renderEmptyMission()}
    </div>
    <button class="btn-primary" onclick="showAddMissionModal()">+ Create Mission</button>
  </div>
</div>
`;
}

function renderNorthStarMetric(metric: NorthStarMetric): string {
  const progress = metric.target_value && metric.current_value
    ? Math.min((metric.current_value / metric.target_value) * 100, 100)
    : 0;

  return `
<div class="north-star-card">
  <div class="north-star-header">
    <h3>North Star Metric</h3>
    <button class="icon-btn-sm" onclick="showEditNorthStarModal()">✏️</button>
  </div>
  <div class="north-star-content">
    <div class="metric-name">${escapeHtml(metric.metric_name)}</div>
    ${metric.description ? `<p class="metric-desc">${escapeHtml(metric.description)}</p>` : ''}
    <div class="metric-values">
      <div class="metric-value">
        <span class="value">${metric.current_value ?? '—'}</span>
        <span class="unit">${metric.unit || ''}</span>
      </div>
      <div class="metric-target">
        <span>Target:</span>
        <span class="target-value">${metric.target_value ?? '—'} ${metric.unit || ''}</span>
      </div>
    </div>
    ${metric.target_value ? `
    <div class="metric-progress">
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${progress}%"></div>
      </div>
      <span class="progress-text">${progress.toFixed(1)}%</span>
    </div>
    ` : ''}
  </div>
</div>
`;
}

function renderEmptyNorthStar(): string {
  return `
<div class="north-star-card empty">
  <h3>North Star Metric</h3>
  <p>What single metric best indicates you're moving toward your vision?</p>
  <button class="btn-primary" onclick="showAddNorthStarModal()">+ Define North Star</button>
</div>
`;
}

function renderPillar(pillar: Pillar): string {
  return `
<div class="pillar-card">
  <h4>${escapeHtml(pillar.name)}</h4>
  ${pillar.description ? `<p>${escapeHtml(pillar.description)}</p>` : ''}
  <button class="icon-btn-sm" onclick="editPillar('${pillar.id}')">✏️</button>
</div>
`;
}

function renderEmptyPillars(): string {
  return '<p class="empty-state">No strategic pillars defined yet.</p>';
}

function renderVisionCard(vision: Vision): string {
  return `
<div class="vision-card">
  <div class="card-header">
    <h3>${escapeHtml(vision.title)}</h3>
    <div class="card-actions">
      <button class="icon-btn-sm" onclick="editVision('${vision.id}')">✏️</button>
      <button class="icon-btn-sm" onclick="deleteVision('${vision.id}')">🗑️</button>
    </div>
  </div>
  ${vision.description ? `<p class="card-description">${escapeHtml(vision.description)}</p>` : ''}
  ${vision.success_criteria ? `
  <div class="card-section">
    <strong>Success Criteria:</strong>
    <p>${escapeHtml(vision.success_criteria)}</p>
  </div>
  ` : ''}
  ${vision.target_date ? `
  <div class="card-meta">
    <span class="meta-item">🎯 Target: ${formatDate(vision.target_date)}</span>
  </div>
  ` : ''}
</div>
`;
}

function renderEmptyVision(): string {
  return '<p class="empty-state">Define your long-term vision: What outcome do you want to create? Who is it for? What does success look like in 3-5 years?</p>';
}

function renderMissionCard(mission: Mission): string {
  const statusClass = `status-${mission.status}`;
  return `
<div class="mission-card ${statusClass}">
  <div class="card-header">
    <h3>${escapeHtml(mission.title)}</h3>
    <span class="status-badge">${mission.status}</span>
  </div>
  ${mission.description ? `<p class="card-description">${escapeHtml(mission.description)}</p>` : ''}
  ${mission.target_date ? `
  <div class="card-meta">
    <span class="meta-item">📅 Target: ${formatDate(mission.target_date)}</span>
  </div>
  ` : ''}
  <div class="card-actions">
    <button class="btn-sm" onclick="editMission('${mission.id}')">Edit</button>
    <button class="btn-sm" onclick="deleteMission('${mission.id}')">Delete</button>
  </div>
</div>
`;
}

function renderEmptyMission(): string {
  return '<p class="empty-state">Define your mission: What will you do to move toward the vision? What are the key activities and outcomes for the next 12-18 months?</p>';
}

function renderPlansSection(plans: Plan[], missions: Mission[]): string {
  const activePlans = plans.filter(p => p.status === 'active');
  const completedPlans = plans.filter(p => p.status === 'completed');

  return `
<div class="plans-section">
  <div class="section-header">
    <h2>Plans</h2>
    <button class="btn-primary" onclick="showAddPlanModal()">+ Create Plan</button>
  </div>

  ${activePlans.length > 0 ? `
  <div class="plans-group">
    <h3 class="group-title">Active Plans</h3>
    <div class="plans-grid">
      ${activePlans.map(p => renderPlanCard(p)).join('')}
    </div>
  </div>
  ` : ''}

  ${completedPlans.length > 0 ? `
  <div class="plans-group">
    <h3 class="group-title">Completed Plans</h3>
    <div class="plans-grid">
      ${completedPlans.map(p => renderPlanCard(p)).join('')}
    </div>
  </div>
  ` : ''}

  ${plans.length === 0 ? '<p class="empty-state">No plans yet. Create your first plan to get started!</p>' : ''}
</div>
`;
}

function renderPlanCard(plan: Plan): string {
  const priorityClass = `priority-${plan.priority}`;
  return `
<div class="plan-card ${priorityClass}">
  <div class="card-header">
    <h3>${escapeHtml(plan.title)}</h3>
    <span class="priority-badge">${plan.priority}</span>
  </div>
  ${plan.description ? `<p class="card-description">${escapeHtml(plan.description)}</p>` : ''}
  <div class="progress-section">
    <div class="progress-info">
      <span>Progress</span>
      <span>${plan.progress}%</span>
    </div>
    <div class="progress-bar">
      <div class="progress-fill" style="width: ${plan.progress}%"></div>
    </div>
  </div>
  ${plan.target_date ? `
  <div class="card-meta">
    <span class="meta-item">📅 ${formatDate(plan.target_date)}</span>
  </div>
  ` : ''}
  <div class="card-actions">
    <button class="btn-sm" onclick="editPlan('${plan.id}')">Edit</button>
    <button class="btn-sm" onclick="updatePlanProgress('${plan.id}')">Update Progress</button>
  </div>
</div>
`;
}

function renderTasksSection(tasks: Task[], plans: Plan[]): string {
  const pendingTasks = tasks.filter(t => t.status === 'pending' || t.status === 'in-progress');
  const completedTasks = tasks.filter(t => t.status === 'completed');

  // Group by priority
  const urgent = pendingTasks.filter(t => t.priority === 'urgent');
  const high = pendingTasks.filter(t => t.priority === 'high');
  const medium = pendingTasks.filter(t => t.priority === 'medium');
  const low = pendingTasks.filter(t => t.priority === 'low');

  return `
<div class="tasks-section">
  <div class="section-header">
    <h2>Tasks</h2>
    <button class="btn-primary" onclick="showAddTaskModal()">+ Create Task</button>
  </div>

  ${urgent.length > 0 ? `
  <div class="tasks-group priority-urgent">
    <h3 class="group-title">🔴 Urgent</h3>
    <div class="tasks-list">
      ${urgent.map(t => renderTaskItem(t)).join('')}
    </div>
  </div>
  ` : ''}

  ${high.length > 0 ? `
  <div class="tasks-group priority-high">
    <h3 class="group-title">🟠 High Priority</h3>
    <div class="tasks-list">
      ${high.map(t => renderTaskItem(t)).join('')}
    </div>
  </div>
  ` : ''}

  ${medium.length > 0 ? `
  <div class="tasks-group priority-medium">
    <h3 class="group-title">🟡 Medium Priority</h3>
    <div class="tasks-list">
      ${medium.map(t => renderTaskItem(t)).join('')}
    </div>
  </div>
  ` : ''}

  ${low.length > 0 ? `
  <div class="tasks-group priority-low">
    <h3 class="group-title">🟢 Low Priority</h3>
    <div class="tasks-list">
      ${low.map(t => renderTaskItem(t)).join('')}
    </div>
  </div>
  ` : ''}

  ${completedTasks.length > 0 ? `
  <div class="tasks-group completed">
    <h3 class="group-title">✅ Completed</h3>
    <div class="tasks-list">
      ${completedTasks.slice(0, 10).map(t => renderTaskItem(t)).join('')}
    </div>
  </div>
  ` : ''}

  ${tasks.length === 0 ? '<p class="empty-state">No tasks yet. Create your first task to get started!</p>' : ''}
</div>
`;
}

function renderTaskItem(task: Task): string {
  const isCompleted = task.status === 'completed';
  const priorityClass = `priority-${task.priority}`;
  return `
<div class="task-item ${priorityClass} ${isCompleted ? 'completed' : ''}">
  <input type="checkbox" ${isCompleted ? 'checked' : ''} onchange="toggleTask('${task.id}')" class="task-checkbox">
  <div class="task-content">
    <h4>${escapeHtml(task.title)}</h4>
    ${task.description ? `<p>${escapeHtml(task.description)}</p>` : ''}
    ${task.due_date ? `<span class="task-due">Due: ${formatDate(task.due_date)}</span>` : ''}
  </div>
  <div class="task-actions">
    <button class="icon-btn-sm" onclick="editTask('${task.id}')">✏️</button>
    <button class="icon-btn-sm" onclick="deleteTask('${task.id}')">🗑️</button>
  </div>
</div>
`;
}

function renderRemindersSection(reminders: Reminder[]): string {
  const upcoming = reminders.filter(r => !r.is_completed && new Date(r.reminder_date) >= new Date());
  const past = reminders.filter(r => r.is_completed || new Date(r.reminder_date) < new Date());

  return `
<div class="reminders-section">
  <div class="section-header">
    <h2>Reminders</h2>
    <button class="btn-primary" onclick="showAddReminderModal()">+ Create Reminder</button>
  </div>

  ${upcoming.length > 0 ? `
  <div class="reminders-group">
    <h3 class="group-title">Upcoming</h3>
    <div class="reminders-list">
      ${upcoming.map(r => renderReminderItem(r)).join('')}
    </div>
  </div>
  ` : ''}

  ${past.length > 0 ? `
  <div class="reminders-group">
    <h3 class="group-title">Past</h3>
    <div class="reminders-list">
      ${past.slice(0, 10).map(r => renderReminderItem(r)).join('')}
    </div>
  </div>
  ` : ''}

  ${reminders.length === 0 ? '<p class="empty-state">No reminders yet. Create your first reminder to stay on track!</p>' : ''}
</div>
`;
}

function renderReminderItem(reminder: Reminder): string {
  const isCompleted = reminder.is_completed;
  const date = new Date(reminder.reminder_date);
  const isPast = date < new Date();

  return `
<div class="reminder-item ${isCompleted ? 'completed' : ''} ${isPast && !isCompleted ? 'overdue' : ''}">
  <div class="reminder-content">
    <h4>${escapeHtml(reminder.title)}</h4>
    ${reminder.notes ? `<p>${escapeHtml(reminder.notes)}</p>` : ''}
    <div class="reminder-meta">
      <span>📅 ${formatDate(reminder.reminder_date)}</span>
      ${reminder.reminder_time ? `<span>🕐 ${reminder.reminder_time}</span>` : ''}
      ${reminder.is_recurring ? `<span>🔄 ${reminder.recurrence_pattern || 'Recurring'}</span>` : ''}
    </div>
  </div>
  <div class="reminder-actions">
    ${!isCompleted ? `<button class="btn-sm" onclick="completeReminder('${reminder.id}')">Complete</button>` : ''}
    <button class="icon-btn-sm" onclick="editReminder('${reminder.id}')">✏️</button>
    <button class="icon-btn-sm" onclick="deleteReminder('${reminder.id}')">🗑️</button>
  </div>
</div>
`;
}

function renderThoughtsSection(thoughts: Thought[]): string {
  return `
<div class="thoughts-section">
  <div class="section-header">
    <h2>Thoughts & Ideas</h2>
    <button class="btn-primary" onclick="showAddThoughtModal()">+ Add Thought</button>
  </div>

  <div class="thoughts-grid">
    ${thoughts.length > 0 ? thoughts.map(t => renderThoughtCard(t)).join('') : '<p class="empty-state">No thoughts yet. Capture your ideas and reflections!</p>'}
  </div>
</div>
`;
}

function renderThoughtCard(thought: Thought): string {
  return `
<div class="thought-card">
  ${thought.title ? `<h3>${escapeHtml(thought.title)}</h3>` : ''}
  <p class="thought-content">${escapeHtml(thought.content)}</p>
  <div class="thought-meta">
    ${thought.category ? `<span class="thought-category">${escapeHtml(thought.category)}</span>` : ''}
    ${thought.mood ? `<span class="thought-mood">${escapeHtml(thought.mood)}</span>` : ''}
    <span class="thought-date">${formatDate(thought.created_at)}</span>
  </div>
  <div class="thought-actions">
    <button class="icon-btn-sm" onclick="editThought('${thought.id}')">✏️</button>
    <button class="icon-btn-sm" onclick="deleteThought('${thought.id}')">🗑️</button>
  </div>
</div>
`;
}

// Utility functions
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function renderAgentDot(id: string): string {
  const agent = AGENT_TYPES.find(a => a.id === id);
  const color = agent?.color || '#7de3cb';
  return `<span class="agent-dot" style="background:${color}" title="${agent?.name || id}"></span>`;
}

// Inline iconography for a consistent branded look
function blueprintIcon(): string {
  return `<svg viewBox="0 0 24 24" class="agent-svg"><rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="3" width="8" height="5" rx="1.5"/><rect x="13" y="10" width="8" height="8" rx="1.5"/><rect x="3" y="13" width="8" height="8" rx="1.5"/><path d="M7 7h4m-2-2v4" stroke="currentColor" stroke-width="1.6" fill="none"/></svg>`;
}

function layoutIcon(): string {
  return `<svg viewBox="0 0 24 24" class="agent-svg"><rect x="3" y="3" width="18" height="6" rx="1.5"/><rect x="3" y="11" width="10" height="10" rx="1.5"/><rect x="15" y="11" width="6" height="10" rx="1.5"/></svg>`;
}

function serverIcon(): string {
  return `<svg viewBox="0 0 24 24" class="agent-svg"><rect x="3" y="4" width="18" height="6" rx="1.5"/><rect x="3" y="14" width="18" height="6" rx="1.5"/><circle cx="8" cy="7" r="1"/><circle cx="8" cy="17" r="1"/><path d="M12 7h6M12 17h6" stroke="currentColor" stroke-width="1.6" fill="none"/></svg>`;
}

function pipelineIcon(): string {
  return `<svg viewBox="0 0 24 24" class="agent-svg"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="8" cy="6" r="2"/><circle cx="16" cy="12" r="2"/><circle cx="10" cy="18" r="2"/></svg>`;
}

function brainIcon(): string {
  return `<svg viewBox="0 0 24 24" class="agent-svg"><path d="M9 3a3 3 0 0 0-3 3v2a3 3 0 0 0-3 3 3 3 0 0 0 3 3v2a3 3 0 0 0 3 3m6-16a3 3 0 0 1 3 3v2a3 3 0 0 1 3 3 3 3 0 0 1-3 3v2a3 3 0 0 1-3 3M9 3h3m3 18h-3m-3-2h3m0-6h3m-3-6h3" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/></svg>`;
}

function cubeIcon(): string {
  return `<svg viewBox="0 0 24 24" class="agent-svg"><path d="M4 7l8-4 8 4-8 4-8-4z" /><path d="M4 7v10l8 4 8-4V7" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linejoin="round"/></svg>`;
}

function checkIcon(): string {
  return `<svg viewBox="0 0 24 24" class="agent-svg"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6" fill="none"/><path d="M8 12l3 3 5-6" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/></svg>`;
}

function shieldIcon(): string {
  return `<svg viewBox="0 0 24 24" class="agent-svg"><path d="M12 3l8 3v6c0 4.5-3 7-8 9-5-2-8-4.5-8-9V6l8-3z" stroke="currentColor" stroke-width="1.6" fill="none"/><path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round"/></svg>`;
}

function getVisionBoardStyles(): string {
  return `
/* Vision Board Styles */
.vision-board {
  max-width: 100%;
}

.board-hero {
  text-align: center;
  margin-bottom: var(--space-3xl);
  padding: var(--space-2xl) 0;
}

.hero-title {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 44px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  margin-bottom: var(--space-sm);
}

.hero-subtitle {
  font-size: 18px;
  color: var(--text-secondary);
}

.automeaux-hero {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: var(--space-xl);
  align-items: center;
  background: linear-gradient(135deg, rgba(61, 217, 208, 0.12) 0%, rgba(10, 14, 26, 0.4) 60%, rgba(96, 165, 250, 0.1) 100%);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-xl);
  padding: var(--space-2xl);
  box-shadow: var(--shadow-md);
}

.hero-left .eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 12px;
  color: var(--accent-primary);
  margin-bottom: var(--space-xs);
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  margin-top: var(--space-lg);
  flex-wrap: wrap;
}

.hero-meta {
  font-size: 14px;
  color: var(--text-secondary);
}

.hero-right .metrics-card {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-md);
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  box-shadow: var(--shadow-sm);
}

.metric {
  display: grid;
  gap: 6px;
  text-align: center;
}

.metric-value {
  font-size: 28px;
  font-weight: 800;
  color: var(--accent-primary);
}

.metric-label {
  font-size: 13px;
  color: var(--text-secondary);
}

/* Tabs */
.board-tabs {
  display: flex;
  gap: var(--space-sm);
  margin-bottom: var(--space-2xl);
  border-bottom: 2px solid var(--border-subtle);
  overflow-x: auto;
}

.tab-btn {
  padding: var(--space-md) var(--space-lg);
  background: transparent;
  color: var(--text-secondary);
  font-weight: 500;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  transition: all var(--transition-base);
  white-space: nowrap;
}

.tab-btn:hover {
  color: var(--text-primary);
}

.tab-btn.active {
  color: var(--accent-primary);
  border-bottom-color: var(--accent-primary);
}

.tab-content {
  display: none;
}

.tab-content.active {
  display: block;
}

/* Section Styles */
.section-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: var(--space-lg);
  color: var(--text-primary);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-xl);
}

.group-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: var(--space-md);
  color: var(--text-secondary);
}

.empty-state {
  text-align: center;
  padding: var(--space-3xl);
  color: var(--text-tertiary);
  font-style: italic;
}

/* Cards */
.north-star-card, .vision-card, .mission-card, .plan-card, .thought-card {
  background: var(--bg-card);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  margin-bottom: var(--space-md);
  transition: all var(--transition-base);
}

.north-star-card:hover, .vision-card:hover, .mission-card:hover, .plan-card:hover, .thought-card:hover {
  border-color: var(--border-glass);
  box-shadow: var(--shadow-glow);
  transform: translateY(-2px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--space-md);
}

.card-header h3 {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
}

.card-description {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--space-md);
}

.card-meta {
  display: flex;
  gap: var(--space-md);
  font-size: 14px;
  color: var(--text-tertiary);
  margin-top: var(--space-md);
}

.card-actions {
  display: flex;
  gap: var(--space-sm);
  margin-top: var(--space-md);
}

/* Panels & Grids */
.panel {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-xl);
  padding: var(--space-xl);
  margin-bottom: var(--space-2xl);
  box-shadow: var(--shadow-sm);
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-lg);
  margin-bottom: var(--space-lg);
  flex-wrap: wrap;
}

.panel-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
}

.panel-subtitle {
  color: var(--text-secondary);
  margin-top: var(--space-xs);
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 12px;
  color: var(--text-tertiary);
}

.agent-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: var(--space-md);
}

.agent-card {
  background: var(--bg-glass);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: var(--space-md);
  align-items: center;
  transition: all var(--transition-base);
}

.agent-card:hover {
  border-color: var(--border-glass);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.agent-icon {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.05);
  display: grid;
  place-items: center;
  color: var(--agent-color, var(--accent-primary));
}

.agent-svg {
  width: 28px;
  height: 28px;
}

.agent-meta {
  display: grid;
  gap: 4px;
}

.agent-name {
  font-weight: 700;
  color: var(--text-primary);
}

.agent-role {
  font-size: 14px;
  color: var(--text-secondary);
}

.agent-pill {
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(61, 217, 208, 0.15);
  color: var(--accent-primary);
  font-weight: 700;
  font-size: 12px;
}

.workflow-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: var(--space-md);
}

.workflow-card {
  background: var(--bg-glass);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  display: grid;
  gap: var(--space-md);
  transition: all var(--transition-base);
}

.workflow-card:hover {
  border-color: var(--border-glass);
  box-shadow: var(--shadow-sm);
  transform: translateY(-2px);
}

.workflow-top {
  display: flex;
  justify-content: space-between;
  gap: var(--space-md);
  align-items: flex-start;
}

.workflow-name {
  font-weight: 700;
  color: var(--text-primary);
}

.workflow-meta {
  color: var(--text-secondary);
  font-size: 14px;
}

.workflow-agents {
  display: flex;
  align-items: center;
  gap: 6px;
}

.agent-dot {
  width: 12px;
  height: 12px;
  border-radius: 999px;
  display: inline-block;
  border: 2px solid rgba(0,0,0,0.1);
}

.agent-dot.extra {
  background: var(--bg-hover);
  color: var(--text-secondary);
  font-size: 10px;
  width: 24px;
  height: 24px;
  display: grid;
  place-items: center;
  border: 1px dashed var(--border-subtle);
}

/* Buttons */
.btn-primary {
  background: var(--accent-gradient);
  color: white;
  padding: var(--space-sm) var(--space-lg);
  border-radius: var(--radius-md);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-base);
  border: none;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-glow);
}

.btn-secondary {
  padding: var(--space-sm) var(--space-lg);
  background: var(--bg-glass);
  color: var(--text-primary);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-subtle);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-base);
}

.btn-secondary:hover {
  border-color: var(--border-glass);
  background: var(--bg-hover);
}

.btn-ghost {
  background: transparent;
  color: var(--accent-primary);
  border: 1px solid var(--border-glass);
}

.btn-sm {
  padding: var(--space-xs) var(--space-md);
  background: var(--bg-tertiary);
  color: var(--text-primary);
  border-radius: var(--radius-sm);
  font-size: 14px;
  cursor: pointer;
  transition: all var(--transition-base);
}

.btn-sm:hover {
  background: var(--bg-hover);
}

.icon-btn-sm {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--transition-base);
  background: transparent;
  color: var(--text-secondary);
}

.icon-btn-sm:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}

/* Progress Bars */
.progress-bar {
  width: 100%;
  height: 8px;
  background: var(--bg-tertiary);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--accent-gradient);
  border-radius: var(--radius-full);
  transition: width var(--transition-slow);
}

.progress-section {
  margin: var(--space-md) 0;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-bottom: var(--space-xs);
  color: var(--text-secondary);
}

/* Status Badges */
.status-badge, .priority-badge {
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--radius-full);
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
}

.status-active { background: var(--success); color: white; }
.status-completed { background: var(--info); color: white; }
.status-paused { background: var(--warning); color: white; }

.priority-urgent { border-left: 4px solid var(--error); }
.priority-high { border-left: 4px solid var(--warning); }
.priority-medium { border-left: 4px solid var(--info); }
.priority-low { border-left: 4px solid var(--success); }

/* Grids */
.pillars-grid, .plans-grid, .thoughts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-md);
  margin-bottom: var(--space-lg);
}

.vision-cards, .mission-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--space-md);
  margin-bottom: var(--space-lg);
}

/* Tasks List */
.tasks-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.task-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-md);
  padding: var(--space-md);
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  transition: all var(--transition-base);
}

.task-item:hover {
  border-color: var(--border-glass);
  background: var(--bg-glass);
}

.task-item.completed {
  opacity: 0.6;
}

.task-item.completed .task-content h4 {
  text-decoration: line-through;
}

.task-checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
  margin-top: 2px;
}

.task-content {
  flex: 1;
}

.task-content h4 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: var(--space-xs);
}

.task-content p {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: var(--space-xs);
}

.task-due {
  font-size: 12px;
  color: var(--text-tertiary);
}

/* Reminders List */
.reminders-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.reminder-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: var(--space-md);
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  transition: all var(--transition-base);
}

.reminder-item.overdue {
  border-left: 4px solid var(--error);
}

.reminder-item.completed {
  opacity: 0.6;
}

.reminder-content {
  flex: 1;
}

.reminder-content h4 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: var(--space-xs);
}

.reminder-meta {
  display: flex;
  gap: var(--space-md);
  font-size: 12px;
  color: var(--text-tertiary);
  margin-top: var(--space-xs);
}

/* Thoughts */
.thought-content {
  color: var(--text-secondary);
  line-height: 1.7;
  margin: var(--space-md) 0;
}

.thought-meta {
  display: flex;
  gap: var(--space-sm);
  font-size: 12px;
  color: var(--text-tertiary);
}

.thought-category, .thought-mood {
  padding: var(--space-xs) var(--space-sm);
  background: var(--bg-tertiary);
  border-radius: var(--radius-sm);
}

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: 32px;
  }
  
  .pillars-grid, .plans-grid, .thoughts-grid, .vision-cards, .mission-cards {
    grid-template-columns: 1fr;
  }
  
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-md);
  }
}
`;
}

function getVisionBoardScripts(baseUrl: string = ''): string {
  // WebSocket URL will be determined in browser context
  return `
  // WebSocket Connection for Real-time Updates
  let ws = null;
  let wsReconnectAttempts = 0;
  const maxReconnectAttempts = 5;

function connectWebSocket() {
  try {
    // Determine WebSocket URL in browser context
    const wsProtocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsHost = location.host;
    const wsUrl = wsProtocol + '//' + wsHost + '/ws';
    
    ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        console.log('WebSocket connected');
        wsReconnectAttempts = 0;

        // Subscribe to all event types
        ws.send(JSON.stringify({
          type: 'subscribe',
          events: ['*'] // Subscribe to all events
        }));

        // Show connection indicator
        updateConnectionStatus(true);
      };

      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          handleWebSocketMessage(message);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        updateConnectionStatus(false);
      };

      ws.onclose = () => {
        console.log('WebSocket disconnected');
        updateConnectionStatus(false);

        // Attempt to reconnect
        if (wsReconnectAttempts < maxReconnectAttempts) {
          wsReconnectAttempts++;
          const delay = Math.min(1000 * Math.pow(2, wsReconnectAttempts), 30000);
          setTimeout(() => {
            console.log(\`Reconnecting... (attempt \${wsReconnectAttempts})\`);
          connectWebSocket();
        }, delay);
      }
    };
  } catch (error) {
    console.error('Failed to connect WebSocket:', error);
  }
}

function handleWebSocketMessage(message) {
  switch (message.type) {
    case 'connected':
      console.log('WebSocket session:', message.sessionId);
      break;
      
    case 'update':
      // Handle real-time updates
      handleRealtimeUpdate(message.eventType, message.data);
      break;
      
    case 'pong':
      // Heartbeat response
      break;
      
    default:
      console.log('Unknown WebSocket message:', message);
  }
}

function handleRealtimeUpdate(eventType, data) {
  console.log('Real-time update:', eventType, data);
  
  // Show notification
  showNotification(\`\${eventType} updated\`, 'info');
  
  // Refresh relevant sections based on event type
  switch (eventType) {
    case 'vision':
    case 'mission':
      // Reload vision/mission section
      location.reload(); // Simple reload for now
      break;
    case 'plan':
      // Reload plans
      location.reload();
      break;
    case 'task':
      // Reload tasks
      location.reload();
      break;
    case 'reminder':
      // Reload reminders
      location.reload();
      break;
    case 'notification':
      // Show notification
      showNotification(data.title || 'New notification', 'info');
      updateNotificationCount();
      break;
  }
}

function updateConnectionStatus(connected) {
  // You can add a connection indicator in the UI
  const indicator = document.getElementById('ws-status');
  if (indicator) {
    indicator.textContent = connected ? '🟢 Connected' : '🔴 Disconnected';
    indicator.style.color = connected ? 'var(--success)' : 'var(--error)';
  }
}

function showNotification(message, type = 'info') {
  // Create a simple notification
  const notification = document.createElement('div');
  notification.className = \`notification notification-\${type}\`;
  notification.textContent = message;
  notification.style.cssText = \`
    position: fixed;
    top: 80px;
    right: 20px;
    padding: 16px 24px;
    background: var(--bg-card);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
    z-index: 10000;
    animation: slideIn 0.3s ease-out;
  \`;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Initialize WebSocket connection
connectWebSocket();

// Keep connection alive with ping
setInterval(() => {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: 'ping' }));
  }
}, 30000); // Every 30 seconds

// Tab switching
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tabId = btn.dataset.tab;
    
    // Update buttons
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Update content
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.getElementById('tab-' + tabId)?.classList.add('active');
  });
});

// API functions
const API_BASE = '';

async function apiCall(endpoint, method = 'GET', body = null) {
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };
  if (body) options.body = JSON.stringify(body);
  
  const response = await fetch(API_BASE + endpoint, options);
  if (!response.ok) throw new Error('API call failed');
  return response.json();
}

// Placeholder functions for modals and actions
function showAddVisionModal() { alert('Add Vision modal - to be implemented'); }
function showAddMissionModal() { alert('Add Mission modal - to be implemented'); }
function showAddPlanModal() { alert('Add Plan modal - to be implemented'); }
function showAddTaskModal() { alert('Add Task modal - to be implemented'); }
function showAddReminderModal() { alert('Add Reminder modal - to be implemented'); }
function showAddThoughtModal() { alert('Add Thought modal - to be implemented'); }
function showAddPillarModal() { alert('Add Pillar modal - to be implemented'); }
function showAddNorthStarModal() { alert('Add North Star modal - to be implemented'); }
function showEditNorthStarModal() { alert('Edit North Star modal - to be implemented'); }

function editVision(id) { alert('Edit vision: ' + id); }
function deleteVision(id) { if(confirm('Delete vision?')) apiCall('/api/visions/' + id, 'DELETE'); }
function editMission(id) { alert('Edit mission: ' + id); }
function deleteMission(id) { if(confirm('Delete mission?')) apiCall('/api/missions/' + id, 'DELETE'); }
function editPlan(id) { alert('Edit plan: ' + id); }
function updatePlanProgress(id) { alert('Update progress: ' + id); }
function toggleTask(id) { apiCall('/api/tasks/' + id, 'PATCH', { status: 'completed' }); }
function editTask(id) { alert('Edit task: ' + id); }
function deleteTask(id) { if(confirm('Delete task?')) apiCall('/api/tasks/' + id, 'DELETE'); }
function completeReminder(id) { apiCall('/api/reminders/' + id, 'PATCH', { is_completed: true }); }
function editReminder(id) { alert('Edit reminder: ' + id); }
function deleteReminder(id) { if(confirm('Delete reminder?')) apiCall('/api/reminders/' + id, 'DELETE'); }
function editThought(id) { alert('Edit thought: ' + id); }
function deleteThought(id) { if(confirm('Delete thought?')) apiCall('/api/thoughts/' + id, 'DELETE'); }
function editPillar(id) { alert('Edit pillar: ' + id); }
`;
}

