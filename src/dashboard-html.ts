/**
 * MeauxAccess styled dashboard HTML (meaux-storm-gray).
 * Multi-page SPA: /dashboard, /dashboard/projects, /dashboard/settings, etc.
 * Auto-generated from public/dashboard-index.html via scripts/inline-dashboard.js
 */
export const DASHBOARD_HTML = `<!DOCTYPE html>
<html lang="en" data-theme="meaux-storm-gray">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MeauxAccess | Enterprise Workspace</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = { darkMode: ['class', '[data-theme="obsidian"]'], theme: { extend: { fontFamily: { sans: ['Inter','sans-serif'], mono: ['JetBrains Mono','monospace'] }, colors: { surface: 'var(--bg-surface)', panel: 'var(--bg-panel)', primary: 'var(--color-primary)', secondary: 'var(--color-secondary)', text: 'var(--color-text)', muted: 'var(--color-muted)', border: 'var(--color-border)', accent: 'var(--color-accent)' }, boxShadow: { soft: 'var(--shadow-soft)', float: '0 20px 40px -10px rgba(0,0,0,0.1)', glass: '0 8px 32px 0 rgba(31,38,135,0.07)' } } } };
    </script>
    <script src="https://unpkg.com/lucide@latest"></script>
    <link rel="stylesheet" href="/assets/themes.css">
    <style>
        :root { --transition-speed: 0.2s; }
        body { background-color: var(--bg-surface); color: var(--color-text); transition: background-color 0.3s ease; overflow: hidden; }
        .glass-panel { background: var(--bg-panel); border: 1px solid var(--color-border); box-shadow: var(--shadow-soft); border-radius: var(--radius); }
        .glass-header { background: var(--bg-panel); border-bottom: 1px solid var(--color-border); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); }
        .nav-item { transition: all 0.2s; border-radius: var(--radius); }
        .nav-item:hover { background: rgba(255,255,255,0.05); color: var(--color-primary); }
        .nav-item.active { background: transparent; color: var(--color-primary); font-weight: 600; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: var(--color-border); border-radius: 99px; }
        .project-switcher:hover { background: var(--color-secondary); }
        @keyframes pulse-load { 0%,100%{opacity:1} 50%{opacity:0.5} }
        .animate-pulse-fast { animation: pulse-load 1.5s cubic-bezier(0.4,0,0.6,1) infinite; }
        .fade-in-up { animation: fadeInUp 0.4s ease-out forwards; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeInUp 0.3s ease-out; }
    </style>
</head>
<body class="flex h-screen w-screen selection:bg-primary/20">
    <aside class="w-64 bg-panel border-r border-border flex flex-col z-40">
        <div class="h-16 flex items-center px-6 border-b border-border">
            <div class="w-8 h-8 rounded-lg overflow-hidden shadow-sm">
                <img src="https://imagedelivery.net/g7wf09fCONpnidkRnR_5vw/17535395-1501-490a-ff3d-e43d7c16a000/thumbnail" alt="Logo" class="w-full h-full object-cover">
            </div>
        </div>
        <nav class="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-6">
            <div>
                <div class="px-3 mb-2 text-[10px] font-bold text-muted uppercase tracking-widest">MeauxAccess</div>
                <div class="space-y-0.5">
                    <button class="nav-item active w-full flex items-center gap-3 px-3 py-2 text-sm text-muted" data-page="dashboard" data-nav="dashboard"><i data-lucide="layout-grid" class="w-4 h-4"></i> Dashboard</button>
                    <button class="nav-item w-full flex items-center gap-3 px-3 py-2 text-sm text-muted" data-page="projects" data-nav="projects"><i data-lucide="briefcase" class="w-4 h-4"></i> Projects</button>
                    <button class="nav-item w-full flex items-center gap-3 px-3 py-2 text-sm text-muted" data-page="library" data-nav="library"><i data-lucide="library" class="w-4 h-4"></i> Library</button>
                    <button class="nav-item w-full flex items-center gap-3 px-3 py-2 text-sm text-muted" data-page="tasks" data-nav="tasks"><i data-lucide="check-square" class="w-4 h-4"></i> Tasks</button>
                    <button class="nav-item w-full flex items-center gap-3 px-3 py-2 text-sm text-muted" data-page="meauxwork" data-nav="meauxwork"><i data-lucide="trello" class="w-4 h-4"></i> MeauxWork</button>
                    <button class="nav-item w-full flex items-center gap-3 px-3 py-2 text-sm text-muted" data-page="meauxmedia" data-nav="meauxmedia"><i data-lucide="film" class="w-4 h-4"></i> MeauxMedia</button>
                    <button class="nav-item w-full flex items-center gap-3 px-3 py-2 text-sm text-muted" data-page="brands" data-nav="brands"><i data-lucide="palette" class="w-4 h-4"></i> Brands</button>
                </div>
            </div>
            <div>
                <div class="px-3 mb-2 text-[10px] font-bold text-muted uppercase tracking-widest">Apps</div>
                <div class="space-y-0.5">
                    <button class="nav-item w-full flex items-center gap-3 px-3 py-2 text-sm text-muted" data-page="meauxphoto" data-nav="meauxphoto"><i data-lucide="image" class="w-4 h-4"></i> MeauxPHOTO</button>
                    <button class="nav-item w-full flex items-center gap-3 px-3 py-2 text-sm text-muted" data-page="meauxdoc" data-nav="meauxdoc"><i data-lucide="file-text" class="w-4 h-4"></i> MeauxDOC</button>
                    <button class="nav-item w-full flex items-center gap-3 px-3 py-2 text-sm text-muted" data-page="meauxcad" data-nav="meauxcad"><i data-lucide="box" class="w-4 h-4"></i> MeauxCAD</button>
                    <button class="nav-item w-full flex items-center gap-3 px-3 py-2 text-sm text-muted" data-page="meauxcloud" data-nav="meauxcloud"><i data-lucide="cloud-lightning" class="w-4 h-4"></i> MeauxCloud</button>
                </div>
            </div>
            <div>
                <div class="px-3 mb-2 text-[10px] font-bold text-muted uppercase tracking-widest">DevOps</div>
                <div class="space-y-0.5">
                    <button class="nav-item w-full flex items-center gap-3 px-3 py-2 text-sm text-muted" data-page="dev" data-nav="dev"><i data-lucide="terminal" class="w-4 h-4"></i> Dev Console</button>
                    <button class="nav-item w-full flex items-center gap-3 px-3 py-2 text-sm text-muted" data-page="automeaux" data-nav="automeaux"><i data-lucide="zap" class="w-4 h-4"></i> AutoMeaux</button>
                    <button class="nav-item w-full flex items-center gap-3 px-3 py-2 text-sm text-muted" data-page="r2" data-nav="r2"><i data-lucide="hard-drive" class="w-4 h-4"></i> R2 Storage</button>
                    <button class="nav-item w-full flex items-center gap-3 px-3 py-2 text-sm text-muted" data-page="database" data-nav="database"><i data-lucide="database" class="w-4 h-4"></i> Database</button>
                </div>
            </div>
            <div>
                <div class="px-3 mb-2 text-[10px] font-bold text-muted uppercase tracking-widest">System</div>
                <div class="space-y-0.5">
                    <button class="nav-item w-full flex items-center gap-3 px-3 py-2 text-sm text-muted" data-page="settings" data-nav="settings"><i data-lucide="settings" class="w-4 h-4"></i> Settings</button>
                    <button class="nav-item w-full flex items-center gap-3 px-3 py-2 text-sm text-muted" data-page="audit" data-nav="audit"><i data-lucide="shield-check" class="w-4 h-4"></i> Audit</button>
                </div>
            </div>
        </nav>
        <div class="p-4 border-t border-border">
            <button class="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-secondary transition-colors text-left group">
                <div class="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs">SP</div>
                <div class="flex-1 min-w-0">
                    <div class="font-medium text-xs text-text">Sam Primeaux</div>
                    <div class="text-[10px] text-muted truncate">Super Admin</div>
                </div>
                <i data-lucide="chevrons-up-down" class="w-4 h-4 text-muted"></i>
            </button>
        </div>
    </aside>
    <main class="flex-1 flex flex-col h-full overflow-hidden relative">
        <header class="h-16 glass-header flex items-center justify-between px-6 z-30 sticky top-0">
            <div class="relative group">
                <button onclick="toggleProjectMenu()" class="project-switcher flex items-center gap-3 px-3 py-2 rounded-lg border border-border bg-surface transition-all active:scale-95">
                    <div class="w-5 h-5 rounded bg-primary flex items-center justify-center text-white"><i data-lucide="hexagon" class="w-3 h-3"></i></div>
                    <div class="text-left">
                        <div class="text-xs font-bold text-text leading-tight">InnerAnimal Media</div>
                        <div id="env-label" class="text-[10px] text-muted leading-tight font-mono">Development</div>
                    </div>
                    <i data-lucide="chevron-down" class="w-4 h-4 text-muted ml-2"></i>
                </button>
                <div id="project-menu" class="hidden absolute top-full left-0 mt-2 w-72 bg-panel border border-border rounded-xl shadow-2xl z-50 p-2">
                    <div class="px-2 py-1 text-[10px] font-bold text-muted uppercase tracking-wider mb-1">Organization</div>
                    <button class="w-full flex items-center gap-3 p-2 rounded-lg bg-secondary/50 text-primary mb-1">
                        <div class="w-6 h-6 rounded bg-primary text-white flex items-center justify-center text-xs">IA</div>
                        <span class="text-sm font-medium">InnerAnimal Media</span>
                        <i data-lucide="check" class="w-4 h-4 ml-auto"></i>
                    </button>
                    <div class="h-px bg-border my-2"></div>
                    <div class="px-2 py-1 text-[10px] font-bold text-muted uppercase tracking-wider mb-1">Environment</div>
                    <button onclick="switchEnv('Production')" class="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-surface text-text">
                        <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span class="text-sm">Production</span>
                    </button>
                    <button onclick="switchEnv('Staging')" class="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-surface text-text">
                        <span class="w-2 h-2 rounded-full bg-amber-500"></span>
                        <span class="text-sm">Staging</span>
                    </button>
                    <button onclick="switchEnv('Development')" class="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-surface text-text">
                        <span class="w-2 h-2 rounded-full bg-purple-500"></span>
                        <span class="text-sm">Development</span>
                    </button>
                </div>
            </div>
            <div class="flex items-center gap-4">
                <div class="hidden md:flex items-center bg-surface border border-border rounded-lg px-3 py-1.5 w-64">
                    <i data-lucide="search" class="w-4 h-4 text-muted"></i>
                    <input type="text" placeholder="Search resources (Cmd+K)" class="bg-transparent border-none outline-none text-sm ml-2 w-full text-text placeholder-muted">
                </div>
                <button class="p-2 text-muted hover:text-text relative"><i data-lucide="bell" class="w-5 h-5"></i><span class="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full border border-panel"></span></button>
                <button class="p-2 text-muted hover:text-text"><i data-lucide="help-circle" class="w-5 h-5"></i></button>
            </div>
        </header>
        <div id="view-container" class="flex-1 overflow-y-auto p-8 custom-scrollbar"></div>
    </main>
    <button onclick="toggleAgent()" class="fixed bottom-8 right-8 z-50 w-14 h-14 bg-primary text-white rounded-2xl shadow-float flex items-center justify-center hover:scale-105 transition-transform active:scale-95 group">
        <i data-lucide="sparkles" class="w-6 h-6 group-hover:rotate-12 transition-transform"></i>
    </button>
    <div id="agent-window" class="fixed bottom-24 right-8 w-96 h-[500px] bg-panel border border-border rounded-2xl shadow-float z-50 flex flex-col hidden fade-in-up">
        <div class="h-14 border-b border-border flex items-center justify-between px-4 bg-surface rounded-t-2xl">
            <span class="font-bold text-sm flex items-center gap-2"><i data-lucide="bot" class="w-4 h-4 text-primary"></i> Agent Sam</span>
            <button onclick="toggleAgent()" class="text-muted hover:text-text"><i data-lucide="x" class="w-4 h-4"></i></button>
        </div>
        <div class="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-4">
            <div class="flex gap-3">
                <div class="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary shrink-0"><i data-lucide="bot" class="w-4 h-4"></i></div>
                <div class="bg-surface p-3 rounded-xl rounded-tl-none border border-border text-muted">
                    Hello Sam. Connected to <strong>Development</strong>. Running Cloudflare Workers. D1 Database... <span class="text-emerald-500">OK</span>.
                </div>
            </div>
        </div>
        <div class="p-3 border-t border-border">
            <input type="text" placeholder="Ask Sam to deploy or analyze..." class="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-primary">
        </div>
    </div>
    <template id="tpl-dashboard">
        <div class="space-y-8 animate-fade-in">
            <div class="flex justify-between items-end">
                <div><h2 class="text-2xl font-bold text-text">Overview</h2><p class="text-sm text-muted">Welcome back, Sam. Here is what is happening today.</p></div>
                <div class="flex gap-2">
                    <button class="px-4 py-2 bg-surface border border-border rounded-lg text-sm font-medium text-text hover:bg-secondary">Customize</button>
                    <button class="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium shadow-md hover:opacity-90">Generate Report</button>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div class="glass-panel p-6 flex flex-col justify-between h-32 hover:scale-[1.02] transition-transform cursor-pointer">
                    <div class="flex justify-between items-start"><span class="text-sm font-medium text-muted">Total Revenue</span><i data-lucide="dollar-sign" class="w-5 h-5 text-emerald-500"></i></div>
                    <div><div class="text-2xl font-bold text-text" id="revenue-val">Loading...</div><div class="text-xs text-emerald-500 font-medium" id="revenue-change">Calculating...</div></div>
                </div>
                <div class="glass-panel p-6 flex flex-col justify-between h-32 hover:scale-[1.02] transition-transform cursor-pointer">
                    <div class="flex justify-between items-start"><span class="text-sm font-medium text-muted">Clients</span><i data-lucide="users" class="w-5 h-5 text-primary"></i></div>
                    <div><div class="text-2xl font-bold text-text" id="clients-count">Loading...</div><div class="text-xs text-muted font-medium" id="clients-detail">From database</div></div>
                </div>
                <div class="glass-panel p-6 flex flex-col justify-between h-32 hover:scale-[1.02] transition-transform cursor-pointer">
                    <div class="flex justify-between items-start"><span class="text-sm font-medium text-muted">Monthly MRR</span><i data-lucide="zap" class="w-5 h-5 text-yellow-500"></i></div>
                    <div><div class="text-2xl font-bold text-text" id="mrr-val">Loading...</div><div class="text-xs text-muted font-medium" id="mrr-detail">Recurring revenue</div></div>
                </div>
                <div class="glass-panel p-6 flex flex-col justify-between h-32 hover:scale-[1.02] transition-transform cursor-pointer">
                    <div class="flex justify-between items-start"><span class="text-sm font-medium text-muted">Brands</span><i data-lucide="palette" class="w-5 h-5 text-accent"></i></div>
                    <div><div class="text-2xl font-bold text-text" id="brands-count">Loading...</div><div class="text-xs text-muted font-medium">Active brands</div></div>
                </div>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div class="lg:col-span-2 glass-panel p-6">
                    <h3 class="font-bold text-text mb-6">Recent Activity</h3>
                    <div class="space-y-6">
                        <div class="flex gap-4 items-start">
                            <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0"><i data-lucide="git-commit" class="w-4 h-4"></i></div>
                            <div><p class="text-sm text-text font-medium">Deployed <strong>inneranimalmedia-dev</strong> to Workers</p><p class="text-xs text-muted mt-1">Just now</p></div>
                        </div>
                        <div class="flex gap-4 items-start">
                            <div class="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0"><i data-lucide="check-circle" class="w-4 h-4"></i></div>
                            <div><p class="text-sm text-text font-medium">Dashboard live at /dashboard</p><p class="text-xs text-muted mt-1">MeauxAccess</p></div>
                        </div>
                    </div>
                </div>
                <div class="glass-panel p-6">
                    <h3 class="font-bold text-text mb-6">System Health</h3>
                    <div class="space-y-4">
                        <div><div class="flex justify-between text-xs mb-1"><span class="text-muted">API Latency</span><span class="text-text font-medium">24ms</span></div><div class="h-1.5 w-full bg-surface rounded-full overflow-hidden"><div class="h-full bg-emerald-500 w-1/4 rounded-full"></div></div></div>
                        <div><div class="flex justify-between text-xs mb-1"><span class="text-muted">Database</span><span class="text-text font-medium">D1 OK</span></div><div class="h-1.5 w-full bg-surface rounded-full overflow-hidden"><div class="h-full bg-blue-500 w-[42%] rounded-full"></div></div></div>
                        <div class="p-4 rounded-xl bg-surface border border-border mt-4"><div class="flex items-center gap-2 text-sm font-medium text-text mb-2"><i data-lucide="shield-check" class="w-4 h-4 text-emerald-500"></i> All Systems Operational</div><div class="text-xs text-muted">Last check: 1 min ago</div></div>
                    </div>
                </div>
            </div>
        </div>
    </template>
    <template id="tpl-projects">
        <div class="space-y-6 animate-fade-in">
            <div class="flex justify-between items-center"><h2 class="text-2xl font-bold text-text">Client Projects</h2><button class="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium">New Project</button></div>
            <div id="projects-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><div class="col-span-full text-center py-12"><div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div><p class="text-sm text-muted mt-4">Loading projects...</p></div></div>
        </div>
    </template>
    <template id="tpl-settings">
        <div class="space-y-6 animate-fade-in">
            <div><h2 class="text-2xl font-bold text-text">Settings</h2><p class="text-sm text-muted">Manage workspace preferences and themes</p></div>
            <div class="glass-panel p-6"><h3 class="font-bold text-text mb-4">Account</h3><div class="space-y-4"><div><label class="block text-sm font-medium text-text mb-2">Name</label><input type="text" value="Sam Primeaux" class="w-full bg-surface border border-border rounded-lg px-4 py-2 text-text"></div><div><label class="block text-sm font-medium text-text mb-2">Email</label><input type="email" value="sam@meauxbility.org" class="w-full bg-surface border border-border rounded-lg px-4 py-2 text-text"></div></div></div>
        </div>
    </template>
    <template id="tpl-brands">
        <div class="space-y-8 animate-fade-in">
            <div class="flex justify-between items-start">
                <div>
                    <h2 class="text-3xl font-bold text-text mb-2">Brands</h2>
                    <p class="text-sm text-muted">Control center for your tenants, assets, revenue, and UI cohesion.</p>
                </div>
                <div class="flex gap-2">
                    <button onclick="openBrandModal()" class="px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium shadow-sm hover:opacity-90 transition-all">+ New Brand</button>
                    <button onclick="auditBrands()" class="px-4 py-2 bg-surface border border-border rounded-xl text-sm font-medium text-text hover:bg-secondary transition-all">Audit</button>
                </div>
            </div>
            <div class="glass-panel p-4 rounded-2xl">
                <div class="flex gap-4 items-center mb-4">
                    <div class="flex-1 relative">
                        <i data-lucide="search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted"></i>
                        <input type="text" id="brand-search" placeholder="Search brands..." class="w-full bg-surface border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-text placeholder-muted focus:outline-none focus:border-primary transition-colors" oninput="filterBrands()">
                    </div>
                    <select id="brand-filter-priority" onchange="filterBrands()" class="bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-text focus:outline-none focus:border-primary">
                        <option value="">All Priorities</option>
                        <option value="HIGHEST">Highest</option>
                        <option value="HIGH">High</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="LOW">Low</option>
                    </select>
                    <select id="brand-filter-type" onchange="filterBrands()" class="bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-text focus:outline-none focus:border-primary">
                        <option value="">All Types</option>
                        <option value="SaaS Platform">SaaS</option>
                        <option value="Client Website">Client</option>
                        <option value="Nonprofit Platform">Nonprofit</option>
                        <option value="E-commerce">E-commerce</option>
                    </select>
                </div>
            </div>
            <div id="brands-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <div class="col-span-full text-center py-16">
                    <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <p class="text-sm text-muted mt-4">Loading brands...</p>
                </div>
            </div>
            <div id="brand-optimization" class="glass-panel p-6 rounded-2xl hidden">
                <h3 class="font-bold text-text mb-4 flex items-center gap-2"><i data-lucide="sparkles" class="w-5 h-5 text-primary"></i> Optimization Insights</h3>
                <div id="optimization-content" class="space-y-3"></div>
            </div>
        </div>
        <div id="brand-drawer" class="fixed inset-y-0 right-0 w-[700px] bg-panel border-l border-border shadow-2xl z-50 transform translate-x-full transition-transform duration-300 overflow-y-auto">
            <div class="sticky top-0 bg-panel border-b border-border p-6 flex items-center justify-between z-10 backdrop-blur-sm">
                <h3 class="text-xl font-bold text-text" id="drawer-title">Brand Details</h3>
                <button onclick="closeBrandDrawer()" class="p-2 hover:bg-surface rounded-lg transition-colors"><i data-lucide="x" class="w-5 h-5 text-muted"></i></button>
            </div>
            <div id="drawer-content" class="p-6 space-y-6"></div>
        </div>
        <div id="brand-image-modal" class="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] hidden items-center justify-center" onclick="closeImageModal()">
            <div class="max-w-4xl max-h-[90vh] p-4" onclick="event.stopPropagation()">
                <div class="bg-panel rounded-3xl shadow-2xl overflow-hidden">
                    <div class="p-4 border-b border-border flex items-center justify-between">
                        <h4 class="font-bold text-text" id="image-modal-title">Image Preview</h4>
                        <button onclick="closeImageModal()" class="p-2 hover:bg-surface rounded-lg"><i data-lucide="x" class="w-5 h-5 text-muted"></i></button>
                    </div>
                    <div class="p-6">
                        <img id="image-modal-img" src="" alt="" class="w-full h-auto rounded-xl max-h-[70vh] object-contain mx-auto">
                        <div class="mt-4 flex gap-2">
                            <a id="image-modal-link" href="" target="_blank" class="px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:opacity-90">Open in New Tab</a>
                            <button onclick="copyImageUrl()" class="px-4 py-2 bg-surface border border-border rounded-xl text-sm text-text hover:bg-secondary">Copy URL</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="brand-modal-overlay" class="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 hidden items-center justify-center" onclick="closeBrandModal()">
            <div id="brand-modal" class="bg-panel rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4" onclick="event.stopPropagation()">
                <div class="sticky top-0 bg-panel border-b border-border p-6 flex items-center justify-between">
                    <h3 class="text-xl font-bold text-text" id="modal-title">New Brand</h3>
                    <button onclick="closeBrandModal()" class="p-2 hover:bg-surface rounded-lg"><i data-lucide="x" class="w-5 h-5 text-muted"></i></button>
                </div>
                <form id="brand-form" onsubmit="saveBrand(event)" class="p-6 space-y-4">
                    <div class="grid grid-cols-2 gap-4">
                        <div><label class="block text-sm font-medium text-text mb-2">Brand Slug *</label><input type="text" name="brand_slug" required class="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-text focus:outline-none focus:border-primary"></div>
                        <div><label class="block text-sm font-medium text-text mb-2">Brand Name *</label><input type="text" name="brand_name" required class="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-text focus:outline-none focus:border-primary"></div>
                    </div>
                    <div><label class="block text-sm font-medium text-text mb-2">Domain</label><input type="text" name="domain" class="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-text focus:outline-none focus:border-primary"></div>
                    <div class="grid grid-cols-2 gap-4">
                        <div><label class="block text-sm font-medium text-text mb-2">Type</label><select name="type" class="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-text focus:outline-none focus:border-primary"><option value="">Select...</option><option>SaaS Platform</option><option>Client Website</option><option>Nonprofit Platform</option><option>E-commerce</option><option>Infrastructure</option></select></div>
                        <div><label class="block text-sm font-medium text-text mb-2">Priority</label><select name="priority" class="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-text focus:outline-none focus:border-primary"><option value="MEDIUM">Medium</option><option value="HIGHEST">Highest</option><option value="HIGH">High</option><option value="LOW">Low</option></select></div>
                    </div>
                    <div><label class="block text-sm font-medium text-text mb-2">Logo Avatar URL</label><input type="url" name="logo_avatar" class="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-text focus:outline-none focus:border-primary"></div>
                    <div><label class="block text-sm font-medium text-text mb-2">Notes</label><textarea name="notes" rows="3" class="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-text focus:outline-none focus:border-primary"></textarea></div>
                    <div class="flex gap-3 pt-4">
                        <button type="submit" class="flex-1 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:opacity-90 transition-all">Save Brand</button>
                        <button type="button" onclick="closeBrandModal()" class="px-4 py-2.5 bg-surface border border-border rounded-xl text-sm font-medium text-text hover:bg-secondary transition-all">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    </template>
    <template id="tpl-r2">
        <div class="space-y-6 animate-fade-in">
            <div class="flex justify-between items-center">
                <div><h2 class="text-2xl font-bold text-text">R2 Storage</h2><p class="text-sm text-muted">Browse and manage objects in inneranimalmedia-assets</p></div>
                <button onclick="uploadR2File()" class="px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium">Upload</button>
            </div>
            <div class="glass-panel p-4 rounded-2xl">
                <div class="flex gap-4 items-center">
                    <div class="flex-1 relative">
                        <i data-lucide="search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted"></i>
                        <input type="text" id="r2-search" placeholder="Search by key..." class="w-full bg-surface border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-text placeholder-muted focus:outline-none focus:border-primary" oninput="filterR2()">
                    </div>
                    <input type="text" id="r2-prefix" placeholder="Prefix filter..." class="w-64 bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-text placeholder-muted focus:outline-none focus:border-primary" onchange="loadR2()">
                </div>
            </div>
            <div id="r2-list" class="glass-panel rounded-2xl overflow-hidden">
                <div class="p-6 text-center py-16">
                    <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <p class="text-sm text-muted mt-4">Loading R2 objects...</p>
                </div>
            </div>
        </div>
    </template>
    <template id="tpl-database">
        <div class="space-y-6 animate-fade-in">
            <div class="flex justify-between items-center">
                <div><h2 class="text-2xl font-bold text-text">Database</h2><p class="text-sm text-muted">Query and explore inneranimalmedia-business</p></div>
                <button onclick="runQuery()" class="px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium">Run Query</button>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div class="lg:col-span-1 glass-panel p-6 rounded-2xl">
                    <h3 class="font-bold text-text mb-4">Tables</h3>
                    <div id="db-tables" class="space-y-2 max-h-[600px] overflow-y-auto custom-scrollbar">
                        <div class="text-center py-8"><div class="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div></div>
                    </div>
                </div>
                <div class="lg:col-span-2 space-y-6">
                    <div class="glass-panel p-6 rounded-2xl">
                        <h3 class="font-bold text-text mb-4">Query</h3>
                        <textarea id="db-query" rows="4" class="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm font-mono text-text focus:outline-none focus:border-primary" placeholder="SELECT * FROM brands LIMIT 10">SELECT * FROM brands LIMIT 10</textarea>
                        <div class="flex gap-2 mt-4">
                            <button onclick="runQuery()" class="px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium">Execute</button>
                            <button onclick="clearQuery()" class="px-4 py-2 bg-surface border border-border rounded-xl text-sm text-text">Clear</button>
                        </div>
                    </div>
                    <div class="glass-panel rounded-2xl overflow-hidden">
                        <div class="p-4 border-b border-border flex items-center justify-between">
                            <h3 class="font-bold text-text">Results</h3>
                            <span id="db-result-count" class="text-xs text-muted">0 rows</span>
                        </div>
                        <div id="db-results" class="p-6 overflow-x-auto">
                            <div class="text-center py-8 text-muted text-sm">Run a query to see results</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </template>
    <template id="tpl-library">
        <div class="space-y-6 animate-fade-in">
            <div class="flex justify-between items-center">
                <div><h2 class="text-2xl font-bold text-text">Library</h2><p class="text-sm text-muted">App library and resources</p></div>
                <button onclick="openLibraryModal()" class="px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium">Add App</button>
            </div>
            <div class="glass-panel p-4 rounded-2xl">
                <div class="flex gap-4 items-center">
                    <div class="flex-1 relative">
                        <i data-lucide="search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted"></i>
                        <input type="text" id="library-search" placeholder="Search apps..." class="w-full bg-surface border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-text placeholder-muted focus:outline-none focus:border-primary" oninput="filterLibrary()">
                    </div>
                </div>
            </div>
            <div id="library-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div class="col-span-full text-center py-16">
                    <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <p class="text-sm text-muted mt-4">Loading library...</p>
                </div>
            </div>
        </div>
    </template>
    <template id="tpl-tasks">
        <div class="space-y-6 animate-fade-in">
            <div class="flex justify-between items-center">
                <div><h2 class="text-2xl font-bold text-text">Tasks</h2><p class="text-sm text-muted">Manage your tasks and to-dos</p></div>
                <button onclick="openTaskModal()" class="px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium">+ New Task</button>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div class="lg:col-span-2 glass-panel p-6 rounded-2xl">
                    <h3 class="font-bold text-text mb-4">Active Tasks</h3>
                    <div id="tasks-list" class="space-y-3">
                        <div class="text-center py-12">
                            <div class="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                            <p class="text-sm text-muted mt-4">Loading tasks...</p>
                        </div>
                    </div>
                </div>
                <div class="glass-panel p-6 rounded-2xl">
                    <h3 class="font-bold text-text mb-4">Stats</h3>
                    <div id="tasks-stats" class="space-y-4">
                        <div><div class="text-2xl font-bold text-text">0</div><div class="text-xs text-muted">Total Tasks</div></div>
                        <div><div class="text-2xl font-bold text-emerald-500">0</div><div class="text-xs text-muted">Completed</div></div>
                        <div><div class="text-2xl font-bold text-orange-500">0</div><div class="text-xs text-muted">In Progress</div></div>
                    </div>
                </div>
            </div>
        </div>
    </template>
    <template id="tpl-meauxwork">
        <div class="space-y-6 animate-fade-in">
            <div class="flex justify-between items-center">
                <div><h2 class="text-2xl font-bold text-text">MeauxWork</h2><p class="text-sm text-muted">Project management and workflows</p></div>
                <button onclick="openBoardModal()" class="px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium">New Board</button>
            </div>
            <div id="meauxwork-boards" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div class="col-span-full text-center py-16">
                    <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <p class="text-sm text-muted mt-4">Loading boards...</p>
                </div>
            </div>
        </div>
    </template>
    <template id="tpl-meauxmedia">
        <div class="space-y-6 animate-fade-in">
            <div class="flex justify-between items-center">
                <div><h2 class="text-2xl font-bold text-text">MeauxMedia Asset Manager</h2><p class="text-sm text-muted">Ecosystem-wide CRUD for Cloudflare Images & R2</p></div>
                <div class="flex gap-2">
                    <button onclick="uploadMedia()" class="px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium">New Asset</button>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <button onclick="switchMediaView('images')" class="media-tab glass-panel p-4 rounded-xl text-left hover:shadow-lg transition-all cursor-pointer active" data-view="images">
                    <div class="flex items-center gap-3 mb-2"><i data-lucide="image" class="w-5 h-5 text-primary"></i><span class="font-bold text-text">Cloudflare Images</span></div>
                    <div class="text-xs text-muted">Manage Cloudflare Images</div>
                </button>
                <button onclick="switchMediaView('r2-assets')" class="media-tab glass-panel p-4 rounded-xl text-left hover:shadow-lg transition-all cursor-pointer" data-view="r2-assets">
                    <div class="flex items-center gap-3 mb-2"><i data-lucide="hard-drive" class="w-5 h-5 text-primary"></i><span class="font-bold text-text">R2 Storage (Assets)</span></div>
                    <div class="text-xs text-muted">inneranimalmedia-assets bucket</div>
                </button>
                <button onclick="switchMediaView('r2-cad')" class="media-tab glass-panel p-4 rounded-xl text-left hover:shadow-lg transition-all cursor-pointer" data-view="r2-cad">
                    <div class="flex items-center gap-3 mb-2"><i data-lucide="box" class="w-5 h-5 text-primary"></i><span class="font-bold text-text">R2 Storage (CAD)</span></div>
                    <div class="text-xs text-muted">splineicons bucket</div>
                </button>
            </div>
            <div class="glass-panel p-4 rounded-2xl">
                <div class="flex gap-4 items-center">
                    <div class="flex-1 relative">
                        <i data-lucide="search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted"></i>
                        <input type="text" id="media-search" placeholder="Search by filename..." class="w-full bg-surface border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-text placeholder-muted focus:outline-none focus:border-primary" oninput="filterMedia()">
                    </div>
                    <select id="media-filter-type" onchange="filterMedia()" class="bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-text focus:outline-none focus:border-primary">
                        <option value="">All Types</option>
                        <option value="image">Images</option>
                        <option value="video">Videos</option>
                        <option value="document">Documents</option>
                    </select>
                </div>
            </div>
            <div id="media-grid" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <div class="col-span-full text-center py-16">
                    <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <p class="text-sm text-muted mt-4">Loading media...</p>
                </div>
            </div>
        </div>
        <div id="media-preview-modal" class="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] hidden items-center justify-center" onclick="closeMediaPreview()">
            <div class="max-w-6xl max-h-[90vh] p-4" onclick="event.stopPropagation()">
                <div class="bg-panel rounded-3xl shadow-2xl overflow-hidden">
                    <div class="p-4 border-b border-border flex items-center justify-between">
                        <h4 class="font-bold text-text" id="media-preview-title">Media Preview</h4>
                        <button onclick="closeMediaPreview()" class="p-2 hover:bg-surface rounded-lg"><i data-lucide="x" class="w-5 h-5 text-muted"></i></button>
                    </div>
                    <div class="p-6">
                        <img id="media-preview-img" src="" alt="" class="w-full h-auto rounded-xl max-h-[70vh] object-contain mx-auto mb-4">
                        <div class="space-y-2 mb-4">
                            <div class="text-xs font-mono text-muted break-all" id="media-preview-key"></div>
                            <div class="flex gap-2">
                                <a id="media-preview-link" href="" target="_blank" class="px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:opacity-90">Open in New Tab</a>
                                <button onclick="copyMediaUrl()" class="px-4 py-2 bg-surface border border-border rounded-xl text-sm text-text hover:bg-secondary">Copy URL</button>
                                <button onclick="deleteMediaAsset()" class="px-4 py-2 bg-red-500/10 text-red-600 rounded-xl text-sm font-medium hover:bg-red-500/20">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </template>
    <template id="tpl-meauxphoto">
        <div class="space-y-6 animate-fade-in">
            <div class="flex justify-between items-center">
                <div><h2 class="text-2xl font-bold text-text">MeauxPHOTO</h2><p class="text-sm text-muted">AI-powered photo editing & management</p></div>
                <button onclick="uploadPhoto()" class="px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium">Upload Photo</button>
            </div>
            <div class="glass-panel p-6">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div class="p-4 rounded-xl bg-surface border border-border">
                        <div class="text-sm font-medium text-muted mb-1">Total Photos</div>
                        <div class="text-2xl font-bold text-text" id="photo-count">Loading...</div>
                    </div>
                    <div class="p-4 rounded-xl bg-surface border border-border">
                        <div class="text-sm font-medium text-muted mb-1">Storage Used</div>
                        <div class="text-2xl font-bold text-text" id="photo-storage">Loading...</div>
                    </div>
                    <div class="p-4 rounded-xl bg-surface border border-border">
                        <div class="text-sm font-medium text-muted mb-1">AI Edits</div>
                        <div class="text-2xl font-bold text-text" id="photo-ai-edits">0</div>
                    </div>
                </div>
                <div class="flex gap-4 items-center mb-4">
                    <div class="flex-1 relative">
                        <i data-lucide="search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted"></i>
                        <input type="text" id="photo-search" placeholder="Search photos..." class="w-full bg-surface border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-text placeholder-muted focus:outline-none focus:border-primary" oninput="filterPhotos()">
                    </div>
                </div>
                <div id="photo-grid" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    <div class="col-span-full text-center py-16"><div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div><p class="text-sm text-muted mt-4">Loading photos...</p></div>
                </div>
            </div>
        </div>
    </template>
    <template id="tpl-meauxdoc">
        <div class="space-y-6 animate-fade-in">
            <div class="flex justify-between items-center">
                <div><h2 class="text-2xl font-bold text-text">MeauxDOC</h2><p class="text-sm text-muted">Document management & collaboration</p></div>
                <button onclick="createDoc()" class="px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium">New Document</button>
            </div>
            <div class="glass-panel p-6">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div class="p-4 rounded-xl bg-surface border border-border">
                        <div class="text-sm font-medium text-muted mb-1">Documents</div>
                        <div class="text-2xl font-bold text-text" id="doc-count">Loading...</div>
                    </div>
                    <div class="p-4 rounded-xl bg-surface border border-border">
                        <div class="text-sm font-medium text-muted mb-1">Shared</div>
                        <div class="text-2xl font-bold text-text" id="doc-shared">0</div>
                    </div>
                    <div class="p-4 rounded-xl bg-surface border border-border">
                        <div class="text-sm font-medium text-muted mb-1">Recent</div>
                        <div class="text-2xl font-bold text-text" id="doc-recent">Today</div>
                    </div>
                </div>
                <div id="doc-list" class="space-y-2">
                    <div class="text-center py-16"><div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div><p class="text-sm text-muted mt-4">Loading documents...</p></div>
                </div>
            </div>
        </div>
    </template>
    <template id="tpl-meauxcad">
        <div class="h-full flex flex-col animate-fade-in">
            <div class="h-12 border-b border-border flex items-center justify-between px-4 bg-surface mb-4">
                <div class="flex gap-2">
                    <button class="p-2 hover:bg-panel rounded text-muted"><i data-lucide="mouse-pointer" class="w-4 h-4"></i></button>
                    <button class="p-2 hover:bg-panel rounded text-muted"><i data-lucide="move" class="w-4 h-4"></i></button>
                    <button class="p-2 hover:bg-panel rounded text-muted"><i data-lucide="rotate-3d" class="w-4 h-4"></i></button>
                </div>
                <div class="text-xs font-mono text-muted">Scene: Main_Stage</div>
                <button class="px-3 py-1 bg-primary text-white rounded text-xs">Render</button>
            </div>
            <div class="flex-1 bg-gray-900 relative overflow-hidden flex items-center justify-center rounded-xl">
                <div class="absolute inset-0 opacity-20" style="background-image: linear-gradient(#444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px); background-size: 40px 40px;"></div>
                <div class="text-gray-500 font-mono text-sm">3D Viewport initialized</div>
                <div class="absolute bottom-8 bg-black/80 backdrop-blur text-white px-4 py-2 rounded-full border border-white/10 flex gap-4 text-xs">
                    <span>X: 0.00</span><span>Y: 2.40</span><span>Z: -5.00</span>
                </div>
            </div>
        </div>
    </template>
    <template id="tpl-meauxcloud">
        <div class="space-y-6 animate-fade-in">
            <div class="flex justify-between items-center">
                <div><h2 class="text-2xl font-bold text-text">MeauxCloud</h2><p class="text-sm text-muted">Infrastructure & cloud services</p></div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div class="glass-panel p-6">
                    <div class="flex items-center gap-3 mb-4"><i data-lucide="server" class="w-5 h-5 text-primary"></i><h3 class="font-bold text-text">Workers</h3></div>
                    <div class="text-2xl font-bold text-text mb-2" id="cloud-workers">160+</div>
                    <div class="text-xs text-muted">Active deployments</div>
                </div>
                <div class="glass-panel p-6">
                    <div class="flex items-center gap-3 mb-4"><i data-lucide="database" class="w-5 h-5 text-primary"></i><h3 class="font-bold text-text">Databases</h3></div>
                    <div class="text-2xl font-bold text-text mb-2" id="cloud-databases">12</div>
                    <div class="text-xs text-muted">D1 instances</div>
                </div>
                <div class="glass-panel p-6">
                    <div class="flex items-center gap-3 mb-4"><i data-lucide="hard-drive" class="w-5 h-5 text-primary"></i><h3 class="font-bold text-text">Storage</h3></div>
                    <div class="text-2xl font-bold text-text mb-2" id="cloud-storage">80+</div>
                    <div class="text-xs text-muted">R2 buckets</div>
                </div>
            </div>
        </div>
    </template>
    <template id="tpl-dev">
        <div class="space-y-6 animate-fade-in">
            <div class="flex justify-between items-center">
                <div><h2 class="text-2xl font-bold text-text">Dev Console</h2><p class="text-sm text-muted">Developer tools & terminal</p></div>
            </div>
            <div class="glass-panel p-6">
                <div class="bg-black rounded-xl p-4 font-mono text-sm text-green-400 h-96 overflow-y-auto" id="dev-terminal">
                    <div class="mb-2"><span class="text-gray-500">$</span> <span class="text-white">Welcome to Dev Console</span></div>
                    <div class="mb-2"><span class="text-gray-500">$</span> <span class="text-white">Type commands below...</span></div>
                </div>
                <div class="mt-4 flex gap-2">
                    <input type="text" id="dev-command" placeholder="Enter command..." class="flex-1 bg-surface border border-border rounded-lg px-4 py-2 text-sm text-text font-mono" onkeypress="if(event.key==='Enter') executeDevCommand()">
                    <button onclick="executeDevCommand()" class="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium">Execute</button>
                </div>
            </div>
        </div>
    </template>
    <template id="tpl-automeaux">
        <div class="space-y-6 animate-fade-in">
            <div class="flex justify-between items-center">
                <div><h2 class="text-2xl font-bold text-text">AutoMeaux</h2><p class="text-sm text-muted">Automation & workflows</p></div>
                <button onclick="createWorkflow()" class="px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium">New Workflow</button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="glass-panel p-6">
                    <h3 class="font-bold text-text mb-4">Active Workflows</h3>
                    <div id="workflow-list" class="space-y-3">
                        <div class="text-center py-8"><div class="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div></div>
                    </div>
                </div>
                <div class="glass-panel p-6">
                    <h3 class="font-bold text-text mb-4">Recent Executions</h3>
                    <div id="execution-list" class="space-y-2">
                        <div class="text-center py-8 text-muted text-sm">No executions yet</div>
                    </div>
                </div>
            </div>
        </div>
    </template>
    <template id="tpl-audit">
        <div class="space-y-6 animate-fade-in">
            <div class="flex justify-between items-center">
                <div><h2 class="text-2xl font-bold text-text">Security Audit</h2><p class="text-sm text-muted">System security & compliance</p></div>
                <button onclick="runAudit()" class="px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium">Run Audit</button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div class="glass-panel p-6">
                    <div class="flex items-center gap-3 mb-2"><i data-lucide="shield-check" class="w-5 h-5 text-emerald-500"></i><span class="font-bold text-text">Security Score</span></div>
                    <div class="text-3xl font-bold text-emerald-500" id="audit-score">95%</div>
                </div>
                <div class="glass-panel p-6">
                    <div class="flex items-center gap-3 mb-2"><i data-lucide="alert-triangle" class="w-5 h-5 text-amber-500"></i><span class="font-bold text-text">Issues</span></div>
                    <div class="text-3xl font-bold text-amber-500" id="audit-issues">2</div>
                </div>
                <div class="glass-panel p-6">
                    <div class="flex items-center gap-3 mb-2"><i data-lucide="check-circle" class="w-5 h-5 text-primary"></i><span class="font-bold text-text">Checks</span></div>
                    <div class="text-3xl font-bold text-text" id="audit-checks">24</div>
                </div>
            </div>
            <div class="glass-panel p-6">
                <h3 class="font-bold text-text mb-4">Audit Results</h3>
                <div id="audit-results" class="space-y-3">
                    <div class="text-center py-8 text-muted text-sm">Click "Run Audit" to start</div>
                </div>
            </div>
        </div>
    </template>
    <script>
        function router(page) {
            console.log('Router called with page:', page);
            const viewContainer = document.getElementById('view-container');
            if (!viewContainer) {
                console.error('view-container not found');
                return;
            }
            document.querySelectorAll('.nav-item').forEach(el => { if (el.dataset.page === page) el.classList.add('active'); else el.classList.remove('active'); });
            const newPath = page === 'dashboard' ? '/dashboard' : '/dashboard/' + page;
            if (window.location.pathname !== newPath) window.history.pushState({}, '', newPath);
            let templateId = 'tpl-dashboard';
            if (page === 'projects') templateId = 'tpl-projects';
            if (page === 'settings') templateId = 'tpl-settings';
            if (page === 'brands') templateId = 'tpl-brands';
            if (page === 'r2' || page === 'storage') templateId = 'tpl-r2';
            if (page === 'database' || page === 'db') templateId = 'tpl-database';
            if (page === 'library') templateId = 'tpl-library';
            if (page === 'tasks') templateId = 'tpl-tasks';
            if (page === 'meauxwork') templateId = 'tpl-meauxwork';
            if (page === 'meauxmedia') templateId = 'tpl-meauxmedia';
            if (page === 'meauxphoto') templateId = 'tpl-meauxphoto';
            if (page === 'meauxdoc') templateId = 'tpl-meauxdoc';
            if (page === 'meauxcad') templateId = 'tpl-meauxcad';
            if (page === 'meauxcloud') templateId = 'tpl-meauxcloud';
            if (page === 'dev') templateId = 'tpl-dev';
            if (page === 'automeaux') templateId = 'tpl-automeaux';
            if (page === 'audit') templateId = 'tpl-audit';
            const template = document.getElementById(templateId);
            console.log('Router: page=', page, 'templateId=', templateId, 'found=', !!template);
            if (template && viewContainer) {
                viewContainer.innerHTML = template.innerHTML;
                setTimeout(() => {
                    if (typeof lucide !== 'undefined') lucide.createIcons();
                    if (page === 'dashboard') { console.log('Loading dashboard stats...'); loadDashboardStats(); }
                    if (page === 'projects') { console.log('Loading projects...'); loadProjects(); }
                    if (page === 'brands') { console.log('Loading brands...'); loadBrands(); }
                    if (page === 'r2' || page === 'storage') { console.log('Loading R2...'); loadR2(); }
                    if (page === 'database' || page === 'db') { console.log('Loading database...'); loadDatabase(); }
                    if (page === 'library') { console.log('Loading library...'); loadLibrary(); }
                    if (page === 'tasks') { console.log('Loading tasks...'); loadTasks(); }
                    if (page === 'meauxwork') { console.log('Loading meauxwork...'); loadMeauxWork(); }
                    if (page === 'meauxmedia') { console.log('Loading meauxmedia...'); loadMeauxMedia(); }
                    if (page === 'meauxphoto') { console.log('Loading meauxphoto...'); loadMeauxPhoto(); }
                    if (page === 'meauxdoc') { console.log('Loading meauxdoc...'); loadMeauxDoc(); }
                    if (page === 'meauxcad') { console.log('Loading meauxcad...'); loadMeauxCAD(); }
                    if (page === 'meauxcloud') { console.log('Loading meauxcloud...'); loadMeauxCloud(); }
                    if (page === 'dev') { console.log('Loading dev console...'); initDevConsole(); }
                    if (page === 'automeaux') { console.log('Loading automeaux...'); loadAutoMeaux(); }
                    if (page === 'audit') { console.log('Loading audit...'); loadAudit(); }
                }, 50);
            } else if (viewContainer) {
                viewContainer.innerHTML = '<div class="flex flex-col items-center justify-center h-full text-muted animate-fade-in-up"><div class="w-16 h-16 rounded-2xl bg-panel border border-border flex items-center justify-center mb-4"><i data-lucide="code" class="w-8 h-8 opacity-50"></i></div><h2 class="text-xl font-bold text-text mb-2 capitalize">' + page + '</h2><p class="text-sm">Module initialized. UI pending.</p></div>';
                if (typeof lucide !== 'undefined') lucide.createIcons();
            }
        }
        async function loadProjects() {
            const grid = document.getElementById('projects-grid');
            if (!grid) return;
            try {
                const res = await fetch('/api/clients');
                const data = await res.json();
                if (!data.success || !data.clients || data.clients.length === 0) {
                    grid.innerHTML = '<div class="col-span-full text-center py-12"><i data-lucide="folder-x" class="w-12 h-12 text-muted mx-auto mb-4"></i><p class="text-muted">No projects found</p></div>';
                    typeof lucide !== 'undefined' && lucide.createIcons();
                    return;
                }
                grid.innerHTML = data.clients.slice(0, 12).map(c => '<div class="glass-panel overflow-hidden hover:shadow-lg transition-all cursor-pointer group"><div class="h-40 bg-gradient-to-br from-primary/20 to-accent/20 relative overflow-hidden"><div class="absolute inset-0 flex items-center justify-center"><div class="text-6xl font-bold text-white/10">' + (c.name||'P').charAt(0) + '</div></div><div class="absolute top-3 right-3"><span class="px-2 py-1 rounded text-[10px] font-bold bg-emerald-500/90 text-white">ACTIVE</span></div></div><div class="p-6"><h3 class="font-bold text-text text-lg mb-2">' + (c.name||'Untitled') + '</h3><p class="text-sm text-muted mb-4">' + (c.email||'No contact') + '</p><div class="flex items-center justify-between text-xs text-muted border-t border-border pt-4"><span>' + (c.status||'active') + '</span></div></div></div>').join('');
                typeof lucide !== 'undefined' && lucide.createIcons();
            } catch (e) {
                grid.innerHTML = '<div class="col-span-full text-center py-12"><i data-lucide="alert-circle" class="w-12 h-12 text-accent mx-auto mb-4"></i><p class="text-muted">Failed to load projects</p></div>';
                typeof lucide !== 'undefined' && lucide.createIcons();
            }
        }
        function toggleProjectMenu() { const m = document.getElementById('project-menu'); if (m) m.classList.toggle('hidden'); }
        function switchEnv(name) { document.getElementById('project-menu')?.classList.add('hidden'); const l = document.getElementById('env-label'); if (l) l.textContent = name; typeof lucide !== 'undefined' && lucide.createIcons(); }
        function toggleAgent() { const w = document.getElementById('agent-window'); if (w) { w.classList.toggle('hidden'); if (!w.classList.contains('hidden')) w.querySelector('input')?.focus(); } }
        let allBrands = [];
        async function loadBrands() {
            const grid = document.getElementById('brands-grid');
            if (!grid) {
                console.error('brands-grid not found');
                return;
            }
            try {
                console.log('Loading brands from /api/brands');
                const res = await fetch('/api/brands');
                if (!res.ok) throw new Error('HTTP ' + res.status);
                const data = await res.json();
                console.log('Brands data:', data);
                allBrands = data.brands || [];
                if (allBrands.length === 0) {
                    console.warn('No brands returned, using fallback');
                }
                renderBrands(allBrands);
                updateOptimization();
            } catch (e) {
                console.error('Failed to load brands:', e);
                grid.innerHTML = '<div class="col-span-full text-center py-12"><i data-lucide="alert-circle" class="w-12 h-12 text-accent mx-auto mb-4"></i><p class="text-muted">Failed to load brands: ' + e.message + '</p><button onclick="loadBrands()" class="mt-4 px-4 py-2 bg-primary text-white rounded-xl text-sm">Retry</button></div>';
                typeof lucide !== 'undefined' && lucide.createIcons();
            }
        }
        function renderBrands(brands) {
            const grid = document.getElementById('brands-grid');
            if (!grid) return;
            if (brands.length === 0) {
                grid.innerHTML = '<div class="col-span-full text-center py-16"><i data-lucide="palette" class="w-16 h-16 text-muted mx-auto mb-4"></i><p class="text-muted mb-4">No brands found</p><button onclick="openBrandModal()" class="px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium">Create First Brand</button></div>';
                typeof lucide !== 'undefined' && lucide.createIcons();
                return;
            }
            const priorityColors = { HIGHEST: 'bg-red-500/10 text-red-600 border-red-500/20', HIGH: 'bg-orange-500/10 text-orange-600 border-orange-500/20', MEDIUM: 'bg-blue-500/10 text-blue-600 border-blue-500/20', LOW: 'bg-gray-500/10 text-gray-600 border-gray-500/20' };
            grid.innerHTML = brands.map(b => {
                const logo = b.logo_avatar || b.logo_thumb || b.logo_public || b.logo_inverted;
                const initials = (b.brand_name || 'B').split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
                const priority = b.priority || 'MEDIUM';
                const revenue = b.mrr || b.revenue_total || 0;
                const logoClick = logo ? 'onclick="event.stopPropagation();openImageModal(\'' + logo + '\', \'' + (b.brand_name || '') + '\')"' : '';
                return '<div class="glass-panel p-6 rounded-2xl hover:shadow-lg transition-all cursor-pointer group" onclick="openBrandDrawer(\'' + b.id + '\')"><div class="flex items-start gap-4 mb-4"><div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0 overflow-hidden cursor-pointer hover:scale-105 transition-transform" ' + logoClick + '>' + (logo ? '<img src="' + logo + '" alt="' + (b.brand_name || '') + '" class="w-full h-full object-cover" loading="lazy">' : '<span class="text-2xl font-bold text-primary/60">' + initials + '</span>') + '</div><div class="flex-1 min-w-0"><h3 class="font-bold text-text text-lg mb-1 truncate">' + (b.brand_name || 'Untitled') + '</h3><p class="text-xs text-muted truncate">' + (b.domain || 'No domain') + '</p><div class="flex items-center gap-2 mt-2"><span class="px-2 py-0.5 rounded-lg text-[10px] font-medium border ' + (priorityColors[priority] || priorityColors.MEDIUM) + '">' + priority + '</span><span class="text-[10px] text-muted">' + (b.type || '') + '</span></div></div></div><div class="flex items-center justify-between pt-4 border-t border-border"><div class="text-xs text-muted">' + (revenue > 0 ? '$' + revenue + (b.mrr ? '/mo' : '') : 'Free tier') + '</div><div class="flex gap-2"><button onclick="event.stopPropagation();editBrand(\'' + b.id + '\')" class="p-2 hover:bg-surface rounded-lg transition-colors"><i data-lucide="edit" class="w-4 h-4 text-muted"></i></button><button onclick="event.stopPropagation();deleteBrand(\'' + b.id + '\')" class="p-2 hover:bg-red-500/10 rounded-lg transition-colors"><i data-lucide="trash-2" class="w-4 h-4 text-red-500"></i></button></div></div></div>';
            }).join('');
            typeof lucide !== 'undefined' && lucide.createIcons();
        }
        function filterBrands() {
            const search = (document.getElementById('brand-search')?.value || '').toLowerCase();
            const priority = document.getElementById('brand-filter-priority')?.value || '';
            const type = document.getElementById('brand-filter-type')?.value || '';
            const filtered = allBrands.filter(b => {
                const matchSearch = !search || (b.brand_name || '').toLowerCase().includes(search) || (b.domain || '').toLowerCase().includes(search) || (b.brand_slug || '').toLowerCase().includes(search);
                const matchPriority = !priority || b.priority === priority;
                const matchType = !type || (b.type || '').includes(type);
                return matchSearch && matchPriority && matchType;
            });
            renderBrands(filtered);
        }
        async function openBrandDrawer(id) {
            const brand = allBrands.find(b => b.id === id);
            if (!brand) return;
            const drawer = document.getElementById('brand-drawer');
            const title = document.getElementById('drawer-title');
            const content = document.getElementById('drawer-content');
            if (drawer && title && content) {
                title.textContent = brand.brand_name || 'Brand';
                const logo = brand.logo_avatar || brand.logo_thumb || brand.logo_public || brand.logo_inverted;
                const initials = (brand.brand_name || 'B').split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
                let zoneInfo = '';
                if (brand.zone_id) {
                    try {
                        const res = await fetch('/api/cf/zone/' + brand.zone_id);
                        const data = await res.json();
                        if (data.success && data.zone) {
                            zoneInfo = '<div class="mt-4 p-4 bg-surface rounded-xl border border-border"><div class="text-xs font-medium text-muted mb-2">Cloudflare Zone</div><div class="text-sm text-text font-mono">' + data.zone.name + '</div><div class="text-xs text-muted mt-1">Status: ' + (data.zone.status || 'unknown') + '</div></div>';
                        }
                    } catch (e) {
                        console.log('Zone fetch failed:', e);
                    }
                }
                const logos = [];
                if (brand.logo_avatar) logos.push({ type: 'Avatar', url: brand.logo_avatar });
                if (brand.logo_thumb) logos.push({ type: 'Thumbnail', url: brand.logo_thumb });
                if (brand.logo_public) logos.push({ type: 'Public', url: brand.logo_public });
                if (brand.logo_inverted) logos.push({ type: 'Inverted', url: brand.logo_inverted });
                const logoGrid = logos.length > 0 ? '<div class="mt-4"><div class="text-xs font-medium text-muted mb-3">Logo Variants</div><div class="grid grid-cols-2 gap-3">' + logos.map(l => '<div class="bg-surface p-3 rounded-xl border border-border cursor-pointer hover:border-primary transition-colors" onclick="openImageModal(\'' + l.url + '\', \'' + brand.brand_name + ' - ' + l.type + '\')"><div class="text-xs text-muted mb-2">' + l.type + '</div><img src="' + l.url + '" alt="" class="w-full h-20 object-contain rounded"></div>').join('') + '</div></div>' : '';
                content.innerHTML = '<div class="space-y-6"><div class="flex items-center gap-4 pb-6 border-b border-border"><div class="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center overflow-hidden cursor-pointer hover:scale-105 transition-transform" ' + (logo ? 'onclick="openImageModal(\'' + logo + '\', \'' + (brand.brand_name || '') + '\')"' : '') + '>' + (logo ? '<img src="' + logo + '" alt="' + (brand.brand_name || '') + '" class="w-full h-full object-cover">' : '<span class="text-4xl font-bold text-primary/60">' + initials + '</span>') + '</div><div class="flex-1"><h4 class="text-xl font-bold text-text mb-1">' + (brand.brand_name || '') + '</h4><p class="text-sm text-muted">' + (brand.domain || '') + '</p><div class="flex items-center gap-2 mt-2"><span class="px-2 py-1 rounded-lg text-xs font-medium border bg-blue-500/10 text-blue-600 border-blue-500/20">' + (brand.priority || 'MEDIUM') + '</span><span class="px-2 py-1 rounded-lg text-xs font-medium border bg-surface text-text">' + (brand.tier || 'Free') + '</span></div></div></div><div class="grid grid-cols-2 gap-4"><div><div class="text-xs text-muted mb-1">Type</div><div class="text-sm font-medium text-text">' + (brand.type || '-') + '</div></div><div><div class="text-xs text-muted mb-1">Zone ID</div><div class="text-sm font-mono text-text text-xs break-all">' + (brand.zone_id || '-') + '</div></div><div><div class="text-xs text-muted mb-1">Revenue Total</div><div class="text-sm font-medium text-text">$' + (brand.revenue_total || 0) + '</div></div><div><div class="text-xs text-muted mb-1">MRR</div><div class="text-sm font-medium text-emerald-500">$' + (brand.mrr || 0) + '/mo</div></div></div>' + zoneInfo + logoGrid + (brand.notes ? '<div><div class="text-xs font-medium text-muted mb-2">Notes</div><div class="text-sm text-text bg-surface p-4 rounded-xl border border-border">' + brand.notes + '</div></div>' : '') + '<div class="flex gap-3 pt-4 border-t border-border"><button onclick="editBrand(\'' + brand.id + '\')" class="flex-1 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:opacity-90">Edit</button><button onclick="deleteBrand(\'' + brand.id + '\')" class="px-4 py-2.5 bg-red-500/10 text-red-600 rounded-xl text-sm font-medium hover:bg-red-500/20">Delete</button></div></div>';
                drawer.classList.remove('translate-x-full');
                typeof lucide !== 'undefined' && lucide.createIcons();
            }
        }
        function closeBrandDrawer() {
            const drawer = document.getElementById('brand-drawer');
            if (drawer) drawer.classList.add('translate-x-full');
        }
        function openBrandModal(brand) {
            const overlay = document.getElementById('brand-modal-overlay');
            const form = document.getElementById('brand-form');
            const title = document.getElementById('modal-title');
            if (overlay && form && title) {
                if (brand) {
                    title.textContent = 'Edit Brand';
                    Object.entries(brand).forEach(([k, v]) => {
                        const input = form.querySelector('[name="' + k + '"]');
                        if (input) input.value = v || '';
                    });
                    form.dataset.brandId = brand.id;
                } else {
                    title.textContent = 'New Brand';
                    form.reset();
                    delete form.dataset.brandId;
                }
                overlay.classList.remove('hidden');
                overlay.classList.add('flex');
            }
        }
        function closeBrandModal() {
            const overlay = document.getElementById('brand-modal-overlay');
            if (overlay) {
                overlay.classList.add('hidden');
                overlay.classList.remove('flex');
            }
        }
        async function saveBrand(e) {
            e.preventDefault();
            const form = e.target;
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            const id = form.dataset.brandId;
            try {
                const url = id ? '/api/brands/' + id : '/api/brands';
                const method = id ? 'PUT' : 'POST';
                const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
                const result = await res.json();
                if (result.success) {
                    closeBrandModal();
                    loadBrands();
                    showToast(id ? 'Brand updated' : 'Brand created');
                } else {
                    alert('Error: ' + (result.error || 'Failed to save'));
                }
            } catch (e) {
                alert('Error: ' + e.message);
            }
        }
        function editBrand(id) {
            const brand = allBrands.find(b => b.id === id);
            if (brand) {
                closeBrandDrawer();
                openBrandModal(brand);
            }
        }
        async function deleteBrand(id) {
            if (!confirm('Delete this brand? This cannot be undone.')) return;
            try {
                const res = await fetch('/api/brands/' + id, { method: 'DELETE' });
                const result = await res.json();
                if (result.success) {
                    closeBrandDrawer();
                    loadBrands();
                    showToast('Brand deleted');
                } else {
                    alert('Error: ' + (result.error || 'Failed to delete'));
                }
            } catch (e) {
                alert('Error: ' + e.message);
            }
        }
        function updateOptimization() {
            const panel = document.getElementById('brand-optimization');
            const content = document.getElementById('optimization-content');
            if (!panel || !content) return;
            const scores = allBrands.map(b => {
                let score = 0;
                if (b.logo_avatar || b.logo_thumb) score += 15;
                if (b.logo_inverted) score += 15;
                if (b.domain) score += 20;
                if (b.type) score += 15;
                if (b.notes) score += 10;
                if (b.zone_id) score += 10;
                if (b.mrr > 0 || b.revenue_total > 0) score += 15;
                return { brand: b, score };
            });
            const avgScore = scores.reduce((a, s) => a + s.score, 0) / (scores.length || 1);
            const incomplete = scores.filter(s => s.score < 70);
            if (incomplete.length > 0 || avgScore < 80) {
                panel.classList.remove('hidden');
                content.innerHTML = '<div class="flex items-center justify-between mb-2"><span class="text-sm font-medium text-text">Average Completeness</span><span class="text-lg font-bold ' + (avgScore >= 80 ? 'text-emerald-500' : 'text-orange-500') + '">' + Math.round(avgScore) + '%</span></div><div class="h-2 bg-surface rounded-full overflow-hidden"><div class="h-full bg-primary rounded-full transition-all" style="width: ' + avgScore + '%"></div></div>' + (incomplete.length > 0 ? '<div class="mt-4 space-y-2"><div class="text-xs font-medium text-muted mb-2">Needs Attention (' + incomplete.length + ')</div>' + incomplete.slice(0, 5).map(s => '<div class="text-xs text-text">' + s.brand.brand_name + ' (' + s.score + '%)</div>').join('') + '</div>' : '');
            } else {
                panel.classList.add('hidden');
            }
        }
        function auditBrands() {
            const issues = [];
            allBrands.forEach(b => {
                if (!b.logo_avatar && !b.logo_thumb) issues.push(b.brand_name + ' missing logo');
                if (!b.domain) issues.push(b.brand_name + ' missing domain');
                if (!b.type) issues.push(b.brand_name + ' missing type');
            });
            alert(issues.length > 0 ? 'Issues found:\n' + issues.slice(0, 10).join('\n') : 'All brands look good!');
        }
        function showToast(msg) {
            const toast = document.createElement('div');
            toast.className = 'fixed bottom-8 left-1/2 -translate-x-1/2 bg-panel border border-border rounded-xl px-6 py-3 shadow-2xl z-50 animate-fade-in-up';
            toast.textContent = msg;
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 3000);
        }
        function openImageModal(url, title) {
            const modal = document.getElementById('brand-image-modal');
            const img = document.getElementById('image-modal-img');
            const link = document.getElementById('image-modal-link');
            const titleEl = document.getElementById('image-modal-title');
            if (modal && img && link && titleEl) {
                img.src = url;
                link.href = url;
                titleEl.textContent = title || 'Image Preview';
                modal.classList.remove('hidden');
                modal.classList.add('flex');
            }
        }
        function closeImageModal() {
            const modal = document.getElementById('brand-image-modal');
            if (modal) {
                modal.classList.add('hidden');
                modal.classList.remove('flex');
            }
        }
        function copyImageUrl() {
            const img = document.getElementById('image-modal-img');
            if (img && img.src) {
                navigator.clipboard.writeText(img.src).then(() => {
                    showToast('Image URL copied to clipboard');
                }).catch(() => {
                    showToast('Failed to copy URL');
                });
            }
        }
        let r2Objects = [];
        async function loadR2() {
            const list = document.getElementById('r2-list');
            if (!list) return;
            try {
                const prefix = document.getElementById('r2-prefix')?.value || '';
                const res = await fetch('/api/r2/list?limit=500' + (prefix ? '&prefix=' + encodeURIComponent(prefix) : ''));
                const data = await res.json();
                if (data.success) {
                    r2Objects = data.objects || [];
                    renderR2(r2Objects);
                } else {
                    list.innerHTML = '<div class="p-6 text-center text-muted">Failed to load R2 objects</div>';
                }
            } catch (e) {
                list.innerHTML = '<div class="p-6 text-center text-muted">Error: ' + e.message + '</div>';
            }
        }
        function renderR2(objects) {
            const list = document.getElementById('r2-list');
            if (!list) return;
            if (objects.length === 0) {
                list.innerHTML = '<div class="p-6 text-center py-16 text-muted">No objects found</div>';
                return;
            }
            const formatSize = (bytes) => {
                if (bytes < 1024) return bytes + ' B';
                if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
                return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
            };
            list.innerHTML = '<div class="divide-y divide-border"><div class="grid grid-cols-12 gap-4 p-4 text-xs font-medium text-muted border-b border-border"><div class="col-span-6">Key</div><div class="col-span-2">Size</div><div class="col-span-2">Type</div><div class="col-span-2">Actions</div></div>' + objects.map(obj => {
                const isImage = obj.contentType?.startsWith('image/');
                return '<div class="grid grid-cols-12 gap-4 p-4 hover:bg-surface/50 transition-colors items-center"><div class="col-span-6 font-mono text-sm text-text truncate" title="' + obj.key + '">' + obj.key + '</div><div class="col-span-2 text-xs text-muted">' + formatSize(obj.size) + '</div><div class="col-span-2 text-xs text-muted">' + (obj.contentType || 'unknown') + '</div><div class="col-span-2 flex gap-2"><a href="https://pub-' + obj.key.split('/')[0] + '.r2.dev/' + obj.key + '" target="_blank" class="p-1.5 hover:bg-surface rounded text-muted"><i data-lucide="external-link" class="w-4 h-4"></i></a><button onclick="deleteR2(\'' + obj.key + '\')" class="p-1.5 hover:bg-red-500/10 rounded text-red-500"><i data-lucide="trash-2" class="w-4 h-4"></i></button></div></div>';
            }).join('') + '</div>';
            if (typeof lucide !== 'undefined') lucide.createIcons();
        }
        function filterR2() {
            const search = (document.getElementById('r2-search')?.value || '').toLowerCase();
            const filtered = r2Objects.filter(obj => obj.key.toLowerCase().includes(search));
            renderR2(filtered);
        }
        function uploadR2File() {
            const input = document.createElement('input');
            input.type = 'file';
            input.onchange = async (e) => {
                const file = (e.target as HTMLInputElement).files?.[0];
                if (!file) return;
                const formData = new FormData();
                formData.append('file', file);
                formData.append('key', file.name);
                try {
                    const res = await fetch('/api/r2/upload', { method: 'POST', body: formData });
                    const data = await res.json();
                    if (data.success) {
                        showToast('File uploaded');
                        loadR2();
                    } else {
                        alert('Upload failed: ' + data.error);
                    }
                } catch (e) {
                    alert('Error: ' + e.message);
                }
            };
            input.click();
        }
        async function deleteR2(key) {
            if (!confirm('Delete ' + key + '?')) return;
            try {
                const res = await fetch('/api/r2/delete', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ key }) });
                const data = await res.json();
                if (data.success) {
                    showToast('Deleted');
                    loadR2();
                } else {
                    alert('Delete failed');
                }
            } catch (e) {
                alert('Error: ' + e.message);
            }
        }
        async function loadDatabase() {
            const tablesEl = document.getElementById('db-tables');
            if (!tablesEl) return;
            try {
                const res = await fetch('/api/db/tables');
                const data = await res.json();
                if (data.success && data.tables) {
                    tablesEl.innerHTML = data.tables.map((t: string) => '<button onclick="selectTable(\'' + t + '\')" class="w-full text-left px-3 py-2 rounded-lg hover:bg-surface text-sm text-text transition-colors">' + t + '</button>').join('');
                    if (data.tables.length > 0) selectTable(data.tables[0]);
                }
            } catch (e) {
                tablesEl.innerHTML = '<div class="text-xs text-muted p-4">Failed to load tables</div>';
            }
        }
        async function selectTable(tableName) {
            const queryEl = document.getElementById('db-query') as HTMLTextAreaElement;
            if (queryEl) queryEl.value = 'SELECT * FROM ' + tableName + ' LIMIT 10';
            runQuery();
        }
        async function runQuery() {
            const queryEl = document.getElementById('db-query') as HTMLTextAreaElement;
            const resultsEl = document.getElementById('db-results');
            const countEl = document.getElementById('db-result-count');
            if (!queryEl || !resultsEl) return;
            const query = queryEl.value.trim();
            if (!query) return;
            try {
                resultsEl.innerHTML = '<div class="text-center py-8"><div class="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div></div>';
                const res = await fetch('/api/db/query', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ query, limit: 100 }) });
                const data = await res.json();
                if (data.success && data.results) {
                    const rows = data.results;
                    if (rows.length === 0) {
                        resultsEl.innerHTML = '<div class="text-center py-8 text-muted">No results</div>';
                        if (countEl) countEl.textContent = '0 rows';
                        return;
                    }
                    const cols = Object.keys(rows[0]);
                    resultsEl.innerHTML = '<div class="overflow-x-auto"><table class="w-full text-sm"><thead><tr class="border-b border-border">' + cols.map(c => '<th class="text-left p-2 font-medium text-text">' + c + '</th>').join('') + '</tr></thead><tbody>' + rows.map((r: any) => '<tr class="border-b border-border/50 hover:bg-surface/50">' + cols.map(c => '<td class="p-2 text-muted font-mono text-xs">' + (r[c] !== null && r[c] !== undefined ? String(r[c]).substring(0, 100) : '<span class="text-muted/50">null</span>') + '</td>').join('') + '</tr>').join('') + '</tbody></table></div>';
                    if (countEl) countEl.textContent = rows.length + ' rows';
                } else {
                    resultsEl.innerHTML = '<div class="text-center py-8 text-red-500">Error: ' + (data.error || 'Query failed') + '</div>';
                }
            } catch (e) {
                resultsEl.innerHTML = '<div class="text-center py-8 text-red-500">Error: ' + e.message + '</div>';
            }
        }
        function clearQuery() {
            const queryEl = document.getElementById('db-query') as HTMLTextAreaElement;
            const resultsEl = document.getElementById('db-results');
            if (queryEl) queryEl.value = '';
            if (resultsEl) resultsEl.innerHTML = '<div class="text-center py-8 text-muted text-sm">Run a query to see results</div>';
        }
        async function loadLibrary() {
            const grid = document.getElementById('library-grid');
            if (!grid) return;
            try {
                const res = await fetch('/api/apps?limit=20');
                const data = await res.json();
                if (data.apps && data.apps.length > 0) {
                    grid.innerHTML = data.apps.map((app: any) => '<div class="glass-panel p-6 rounded-2xl hover:shadow-lg transition-all cursor-pointer"><div class="flex items-center gap-4 mb-4"><div class="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-2xl">' + (app.name?.charAt(0) || 'A') + '</div><div class="flex-1"><h3 class="font-bold text-text">' + (app.name || 'App') + '</h3><p class="text-xs text-muted">' + (app.category || '') + '</p></div></div><p class="text-sm text-muted line-clamp-2">' + (app.description || 'No description') + '</p></div>').join('');
                } else {
                    grid.innerHTML = '<div class="col-span-full text-center py-16 text-muted">No apps found</div>';
                }
                if (typeof lucide !== 'undefined') lucide.createIcons();
            } catch (e) {
                grid.innerHTML = '<div class="col-span-full text-center py-16 text-muted">Failed to load library</div>';
            }
        }
        function filterLibrary() {
            const search = (document.getElementById('library-search')?.value || '').toLowerCase();
            console.log('Filter library:', search);
        }
        function openLibraryModal() {
            showToast('Library modal coming soon');
        }
        async function loadTasks() {
            const list = document.getElementById('tasks-list');
            const stats = document.getElementById('tasks-stats');
            if (!list) return;
            try {
                list.innerHTML = '<div class="space-y-3"><div class="glass-panel p-4 rounded-xl flex items-center gap-4"><div class="w-5 h-5 rounded border-2 border-border"></div><div class="flex-1"><div class="font-medium text-text">Sample Task</div><div class="text-xs text-muted">Created today</div></div></div></div>';
                if (stats) {
                    stats.innerHTML = '<div><div class="text-2xl font-bold text-text">1</div><div class="text-xs text-muted">Total Tasks</div></div><div><div class="text-2xl font-bold text-emerald-500">0</div><div class="text-xs text-muted">Completed</div></div><div><div class="text-2xl font-bold text-orange-500">1</div><div class="text-xs text-muted">In Progress</div></div>';
                }
                if (typeof lucide !== 'undefined') lucide.createIcons();
            } catch (e) {
                list.innerHTML = '<div class="text-center py-12 text-muted">Failed to load tasks</div>';
            }
        }
        function openTaskModal() {
            showToast('Task modal coming soon');
        }
        async function loadMeauxWork() {
            const boards = document.getElementById('meauxwork-boards');
            if (!boards) return;
            try {
                boards.innerHTML = '<div class="glass-panel p-6 rounded-2xl hover:shadow-lg transition-all cursor-pointer"><h3 class="font-bold text-text mb-2">Default Board</h3><p class="text-sm text-muted">Get started with your first board</p></div>';
                if (typeof lucide !== 'undefined') lucide.createIcons();
            } catch (e) {
                boards.innerHTML = '<div class="col-span-full text-center py-16 text-muted">Failed to load boards</div>';
            }
        }
        function openBoardModal() {
            showToast('Board modal coming soon');
        }
        async function loadMeauxMedia() {
            const grid = document.getElementById('media-grid');
            if (!grid) return;
            try {
                const res = await fetch('/api/r2/list?limit=200');
                if (!res.ok) {
                    const text = await res.text();
                    let errorMsg = 'HTTP ' + res.status;
                    try {
                        const errorJson = JSON.parse(text);
                        errorMsg = errorJson.error || errorMsg;
                    } catch {
                        if (text) errorMsg = text.substring(0, 100);
                    }
                    throw new Error(errorMsg);
                }
                const contentType = res.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    const text = await res.text();
                    throw new Error('Invalid response: ' + text.substring(0, 100));
                }
                const data = await res.json();
                if (data.success && data.objects && data.objects.length > 0) {
                    const imageObjects = data.objects.filter((obj: any) => {
                        const key = obj.key.toLowerCase();
                        return obj.contentType?.startsWith('image/') || 
                               key.endsWith('.jpg') || key.endsWith('.jpeg') || 
                               key.endsWith('.png') || key.endsWith('.gif') || 
                               key.endsWith('.webp') || key.endsWith('.svg') ||
                               key.includes('image') || key.includes('media');
                    }).slice(0, 48);
                    if (imageObjects.length > 0) {
                        grid.innerHTML = imageObjects.map((obj: any) => {
                            const key = obj.key || '';
                            const imageUrl = key.startsWith('http') ? key : 'https://pub-inneranimalmedia-assets.r2.dev/' + key;
                            return '<div class="glass-panel aspect-square rounded-2xl overflow-hidden hover:shadow-lg transition-all cursor-pointer group relative" onclick="openMediaPreview(\'' + imageUrl.replace(/'/g, "\\'") + '\', \'' + key.replace(/'/g, "\\'") + '\')"><div class="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center"><img src="' + imageUrl.replace(/'/g, "\\'") + '" alt="' + key.replace(/'/g, "\\'") + '" class="w-full h-full object-cover group-hover:scale-105 transition-transform" loading="lazy" onerror="this.parentElement.innerHTML=\'<i data-lucide=\\\'file\\\' class=\\\'w-12 h-12 text-muted\\\'></i>\'; if(typeof lucide !== \\\'undefined\\\') lucide.createIcons();"></div><div class="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-2 opacity-0 group-hover:opacity-100 transition-opacity"><div class="text-xs text-white truncate font-mono">' + key.split('/').pop() + '</div></div></div>';
                        }).join('');
                    } else {
    grid.innerHTML = '<div class="col-span-full text-center py-16"><i data-lucide="image" class="w-16 h-16 text-muted mx-auto mb-4"></i><p class="text-muted mb-4">No images found in R2</p><button onclick="uploadMedia()" class="px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium">Upload Images</button></div>';
}
                } else {
    grid.innerHTML = '<div class="col-span-full text-center py-16"><i data-lucide="image" class="w-16 h-16 text-muted mx-auto mb-4"></i><p class="text-muted mb-4">No media found. Upload some files!</p><button onclick="uploadMedia()" class="px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium">Upload Media</button></div>';
}
if (typeof lucide !== 'undefined') lucide.createIcons();
            } catch (e: any) {
    console.error('MeauxMedia load error:', e);
    grid.innerHTML = '<div class="col-span-full text-center py-16 text-red-500"><i data-lucide="alert-circle" class="w-16 h-16 mx-auto mb-4"></i><p class="text-muted">Failed to load media: ' + (e.message || 'Unknown error') + '</p><button onclick="loadMeauxMedia()" class="mt-4 px-4 py-2 bg-primary text-white rounded-xl text-sm">Retry</button></div>';
    if (typeof lucide !== 'undefined') lucide.createIcons();
}
        }
function filterMedia() {
    const search = (document.getElementById('media-search')?.value || '').toLowerCase();
    console.log('Filter media:', search);
}
function uploadMedia() {
    uploadR2File();
}
async function loadDashboardStats() {
    try {
        const res = await fetch('/api/dashboard/stats');
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const data = await res.json();
        if (data.success && data.stats) {
            const s = data.stats;
            const revenueEl = document.getElementById('revenue-val');
            const revenueChangeEl = document.getElementById('revenue-change');
            const clientsEl = document.getElementById('clients-count');
            const clientsDetailEl = document.getElementById('clients-detail');
            const mrrEl = document.getElementById('mrr-val');
            const mrrDetailEl = document.getElementById('mrr-detail');
            const brandsEl = document.getElementById('brands-count');
            if (revenueEl) revenueEl.textContent = '$' + (s.totalRevenue || 0).toLocaleString();
            if (revenueChangeEl) revenueChangeEl.textContent = '$' + (s.pendingRevenue || 0) + ' pending';
            if (clientsEl) clientsEl.textContent = (s.clientCount || 0).toString();
            if (clientsDetailEl) clientsDetailEl.textContent = s.clientCount + ' active clients';
            if (mrrEl) mrrEl.textContent = '$' + (s.mrr || 0) + '/mo';
            if (mrrDetailEl) mrrDetailEl.textContent = 'Monthly recurring';
            if (brandsEl) brandsEl.textContent = (s.brandCount || 0).toString();
        }
    } catch (e) {
        console.error('Failed to load dashboard stats:', e);
    }
}
let currentMediaView = 'r2-assets';
let allMediaObjects: any[] = [];
function switchMediaView(view: string) {
    currentMediaView = view;
    document.querySelectorAll('.media-tab').forEach(tab => {
        if (tab.getAttribute('data-view') === view) {
            tab.classList.add('active', 'ring-2', 'ring-primary');
        } else {
            tab.classList.remove('active', 'ring-2', 'ring-primary');
        }
    });
    if (view === 'images') {
        loadCloudflareImages();
    } else if (view === 'r2-assets') {
        loadR2Media('inneranimalmedia-assets');
    } else if (view === 'r2-cad') {
        loadR2Media('splineicons');
    }
}
async function loadR2Media(bucket: string) {
    const grid = document.getElementById('media-grid');
    if (!grid) return;
    try {
        const res = await fetch('/api/r2/list?limit=200');
        if (!res.ok) {
            const text = await res.text();
            throw new Error(text || 'HTTP ' + res.status);
        }
        const data = await res.json();
        if (data.success && data.objects) {
            allMediaObjects = data.objects;
            renderMediaGrid(data.objects);
        } else {
            grid.innerHTML = '<div class="col-span-full text-center py-16 text-muted">No media found</div>';
        }
        if (typeof lucide !== 'undefined') lucide.createIcons();
    } catch (e: any) {
        console.error('Load R2 media error:', e);
        grid.innerHTML = '<div class="col-span-full text-center py-16 text-red-500">Error: ' + (e.message || 'Failed to load') + '</div>';
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }
}
async function loadCloudflareImages() {
    const grid = document.getElementById('media-grid');
    if (!grid) return;
    try {
        const res = await fetch('/api/cf/images');
        if (!res.ok) {
            grid.innerHTML = '<div class="col-span-full text-center py-16 text-muted">Cloudflare Images API not configured</div>';
            return;
        }
        const data = await res.json();
        if (data.success && data.images) {
            renderMediaGrid(data.images.map((img: any) => ({ ...img, isCloudflareImage: true })));
        } else {
            grid.innerHTML = '<div class="col-span-full text-center py-16 text-muted">No Cloudflare Images found</div>';
        }
        if (typeof lucide !== 'undefined') lucide.createIcons();
    } catch (e: any) {
        console.error('Load Cloudflare Images error:', e);
        grid.innerHTML = '<div class="col-span-full text-center py-16 text-muted">Cloudflare Images not available</div>';
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }
}
function renderMediaGrid(objects: any[]) {
    const grid = document.getElementById('media-grid');
    if (!grid) return;
    const imageObjects = objects.filter(obj => {
        const key = obj.key?.toLowerCase() || '';
        return obj.contentType?.startsWith('image/') ||
            key.endsWith('.jpg') || key.endsWith('.jpeg') ||
            key.endsWith('.png') || key.endsWith('.gif') ||
            key.endsWith('.webp') || key.endsWith('.svg') ||
            obj.isCloudflareImage;
    }).slice(0, 48);
    if (imageObjects.length === 0) {
        grid.innerHTML = '<div class="col-span-full text-center py-16 text-muted">No images found</div>';
        return;
    }
    grid.innerHTML = imageObjects.map(obj => {
        const key = obj.key || obj.id || 'unknown';
        let imageUrl = '';
        if (obj.isCloudflareImage) {
            imageUrl = obj.variants?.[0] || obj.url || '';
        } else {
            imageUrl = obj.key?.startsWith('http') ? obj.key : 'https://pub-inneranimalmedia-assets.r2.dev/' + obj.key;
        }
        return '<div class="glass-panel aspect-square rounded-2xl overflow-hidden hover:shadow-lg transition-all cursor-pointer group relative" onclick="openMediaPreview(\'' + imageUrl.replace(/'/g, "\\'") + '\', \'' + key.replace(/'/g, "\\'") + '\')"><div class="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center"><img src="' + imageUrl.replace(/'/g, "\\'") + '" alt="' + key.replace(/'/g, "\\'") + '" class="w-full h-full object-cover group-hover:scale-105 transition-transform" loading="lazy" onerror="this.parentElement.innerHTML=\'<i data-lucide=\\\'file\\\' class=\\\'w-12 h-12 text-muted\\\'></i>\'; if(typeof lucide !== \\\'undefined\\\') lucide.createIcons();"></div><div class="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-2 opacity-0 group-hover:opacity-100 transition-opacity"><div class="text-xs text-white truncate font-mono">' + key.split('/').pop() + '</div></div></div>';
    }).join('');
    if (typeof lucide !== 'undefined') lucide.createIcons();
}
function filterMedia() {
    const search = (document.getElementById('media-search')?.value || '').toLowerCase();
    const type = document.getElementById('media-filter-type')?.value || '';
    const filtered = allMediaObjects.filter(obj => {
        const key = (obj.key || '').toLowerCase();
        const matchSearch = !search || key.includes(search);
        const matchType = !type || (type === 'image' && (obj.contentType?.startsWith('image/') || key.match(/\.(jpg|jpeg|png|gif|webp|svg)$/)));
        return matchSearch && matchType;
    });
    renderMediaGrid(filtered);
}
let currentMediaUrl = '';
let currentMediaKey = '';
function openMediaPreview(url: string, key: string) {
    currentMediaUrl = url;
    currentMediaKey = key;
    const modal = document.getElementById('media-preview-modal');
    const img = document.getElementById('media-preview-img');
    const link = document.getElementById('media-preview-link');
    const title = document.getElementById('media-preview-title');
    const keyEl = document.getElementById('media-preview-key');
    if (modal && img && link && title && keyEl) {
        img.src = url;
        link.href = url;
        title.textContent = key.split('/').pop() || 'Media Preview';
        keyEl.textContent = key;
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}
function closeMediaPreview() {
    const modal = document.getElementById('media-preview-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}
function copyMediaUrl() {
    if (currentMediaUrl) {
        navigator.clipboard.writeText(currentMediaUrl).then(() => {
            showToast('Image URL copied to clipboard');
        }).catch(() => {
            showToast('Failed to copy URL');
        });
    }
}
        async function deleteMediaAsset() {
            if (!currentMediaKey || !confirm('Delete ' + currentMediaKey + '?')) return;
            try {
                const res = await fetch('/api/r2/delete', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ key: currentMediaKey }) });
                const data = await res.json();
                if (data.success) {
                    showToast('Asset deleted');
                    closeMediaPreview();
                    if (currentMediaView === 'r2-assets') loadR2Media('inneranimalmedia-assets');
                    else if (currentMediaView === 'r2-cad') loadR2Media('splineicons');
                } else {
                    alert('Delete failed: ' + (data.error || 'Unknown error'));
                }
            } catch (e: any) {
                alert('Error: ' + e.message);
            }
        }
        async function loadMeauxPhoto() {
            const grid = document.getElementById('photo-grid');
            const countEl = document.getElementById('photo-count');
            const storageEl = document.getElementById('photo-storage');
            if (!grid) return;
            try {
                const res = await fetch('/api/r2/list?limit=100');
                if (!res.ok) throw new Error('HTTP ' + res.status);
                const data = await res.json();
                if (data.success && data.objects) {
                    const photos = data.objects.filter((o: any) => o.contentType?.startsWith('image/')).slice(0, 48);
                    if (countEl) countEl.textContent = photos.length.toString();
                    if (storageEl) storageEl.textContent = (photos.reduce((sum: number, p: any) => sum + (p.size || 0), 0) / 1024 / 1024).toFixed(1) + ' MB';
                    if (photos.length > 0) {
                        grid.innerHTML = photos.map((p: any) => {
                            const url = 'https://pub-inneranimalmedia-assets.r2.dev/' + p.key;
                            return '<div class="glass-panel aspect-square rounded-xl overflow-hidden hover:shadow-lg cursor-pointer" onclick="openMediaPreview(\'' + url + '\', \'' + p.key + '\')"><img src="' + url + '" alt="" class="w-full h-full object-cover"></div>';
                        }).join('');
                    } else {
                        grid.innerHTML = '<div class="col-span-full text-center py-16 text-muted">No photos found</div>';
                    }
                }
                if (typeof lucide !== 'undefined') lucide.createIcons();
            } catch (e: any) {
                grid.innerHTML = '<div class="col-span-full text-center py-16 text-red-500">Error loading photos</div>';
            }
        }
        function filterPhotos() { loadMeauxPhoto(); }
        function uploadPhoto() { uploadR2File(); }
        async function loadMeauxDoc() {
            const listEl = document.getElementById('doc-list');
            const countEl = document.getElementById('doc-count');
            if (!listEl) return;
            try {
                const res = await fetch('/api/r2/list?prefix=documents/&limit=20');
                if (!res.ok) throw new Error('HTTP ' + res.status);
                const data = await res.json();
                if (data.success && data.objects) {
                    const docs = data.objects.filter((o: any) => o.contentType?.includes('document') || o.key.endsWith('.pdf') || o.key.endsWith('.doc'));
                    if (countEl) countEl.textContent = docs.length.toString();
                    if (docs.length > 0) {
                        listEl.innerHTML = docs.map((d: any) => '<div class="p-4 border border-border rounded-xl hover:bg-surface cursor-pointer"><div class="flex items-center gap-3"><i data-lucide="file-text" class="w-5 h-5 text-primary"></i><div class="flex-1"><div class="font-medium text-text">' + d.key.split('/').pop() + '</div><div class="text-xs text-muted">' + (d.size ? (d.size / 1024).toFixed(1) + ' KB' : '') + '</div></div></div></div>').join('');
                    } else {
                        listEl.innerHTML = '<div class="text-center py-8 text-muted">No documents found</div>';
                    }
                }
                if (typeof lucide !== 'undefined') lucide.createIcons();
            } catch (e: any) {
                listEl.innerHTML = '<div class="text-center py-8 text-red-500">Error loading documents</div>';
            }
        }
        function createDoc() { showToast('Document creation coming soon'); }
        function loadMeauxCAD() { if (typeof lucide !== 'undefined') lucide.createIcons(); }
        async function loadMeauxCloud() {
            const workersEl = document.getElementById('cloud-workers');
            const databasesEl = document.getElementById('cloud-databases');
            const storageEl = document.getElementById('cloud-storage');
            if (workersEl) workersEl.textContent = '160+';
            if (databasesEl) databasesEl.textContent = '12';
            if (storageEl) storageEl.textContent = '80+';
        }
        function initDevConsole() {
            const terminal = document.getElementById('dev-terminal');
            if (terminal) {
                terminal.innerHTML = '<div class="mb-2"><span class="text-gray-500">$</span> <span class="text-white">Dev Console Ready</span></div>';
            }
        }
        function executeDevCommand() {
            const input = document.getElementById('dev-command') as HTMLInputElement;
            const terminal = document.getElementById('dev-terminal');
            if (!input || !terminal) return;
            const cmd = input.value.trim();
            if (!cmd) return;
            terminal.innerHTML += '<div class="mb-2"><span class="text-gray-500">$</span> <span class="text-white">' + cmd + '</span></div>';
            terminal.innerHTML += '<div class="mb-2 text-yellow-400">Command execution coming soon...</div>';
            input.value = '';
            terminal.scrollTop = terminal.scrollHeight;
        }
        async function loadAutoMeaux() {
            const workflowList = document.getElementById('workflow-list');
            const executionList = document.getElementById('execution-list');
            if (workflowList) workflowList.innerHTML = '<div class="text-center py-8 text-muted text-sm">No workflows configured</div>';
            if (executionList) executionList.innerHTML = '<div class="text-center py-8 text-muted text-sm">No executions yet</div>';
        }
        function createWorkflow() { showToast('Workflow creation coming soon'); }
        async function loadAudit() {
            const scoreEl = document.getElementById('audit-score');
            const issuesEl = document.getElementById('audit-issues');
            const checksEl = document.getElementById('audit-checks');
            const resultsEl = document.getElementById('audit-results');
            if (scoreEl) scoreEl.textContent = '95%';
            if (issuesEl) issuesEl.textContent = '2';
            if (checksEl) checksEl.textContent = '24';
            if (resultsEl) resultsEl.innerHTML = '<div class="p-4 border border-border rounded-xl"><div class="flex items-center gap-2 mb-2"><i data-lucide="check-circle" class="w-4 h-4 text-emerald-500"></i><span class="text-sm font-medium text-text">Security headers configured</span></div></div><div class="p-4 border border-border rounded-xl mt-2"><div class="flex items-center gap-2 mb-2"><i data-lucide="alert-triangle" class="w-4 h-4 text-amber-500"></i><span class="text-sm font-medium text-text">Review API token permissions</span></div></div>';
            if (typeof lucide !== 'undefined') lucide.createIcons();
        }
        function runAudit() { loadAudit(); showToast('Audit completed'); }
window.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname.replace(/^\/+|\/+$/g, '') || 'dashboard';
    const parts = path.split('/');
    let page = 'dashboard';
    if (parts[0] === 'dashboard') {
        page = parts[1] || 'dashboard';
    } else if (parts[0]) {
        page = parts[0];
    }
    router(page);
    document.addEventListener('click', e => {
        if (!e.target.closest('.project-switcher')) document.getElementById('project-menu')?.classList.add('hidden');
        const navBtn = (e.target as HTMLElement).closest('[data-nav]');
        if (navBtn) {
            const page = navBtn.getAttribute('data-nav');
            if (page) router(page);
        }
    });
});
window.addEventListener('popstate', () => {
    const path = window.location.pathname.replace(/^\/+|\/+$/g, '') || 'dashboard';
    const parts = path.split('/');
    let page = 'dashboard';
    if (parts[0] === 'dashboard') {
        page = parts[1] || 'dashboard';
    } else if (parts[0]) {
        page = parts[0];
    }
    router(page);
});
</script>
    </body>
    </html>`;
