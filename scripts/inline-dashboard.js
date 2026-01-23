#!/usr/bin/env node
/**
 * Inlines dashboard-index.html into src/dashboard-html.ts for Worker deployment.
 * Run before deploy: node scripts/inline-dashboard.js
 */
const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'public', 'dashboard-index.html');
const outPath = path.join(__dirname, '..', 'src', 'dashboard-html.ts');

if (!fs.existsSync(htmlPath)) {
  console.error('Missing public/dashboard-index.html. Create it first.');
  process.exit(1);
}

const html = fs.readFileSync(htmlPath, 'utf8');
const escaped = html
  .replace(/\\/g, '\\\\')
  .replace(/`/g, '\\`')
  .replace(/\$\{/g, '\\${');

const ts = `/** Auto-generated from public/dashboard-index.html. Do not edit directly. */\nexport const DASHBOARD_HTML = \`${escaped}\`;\n`;
fs.writeFileSync(outPath, ts, 'utf8');
console.log('Wrote src/dashboard-html.ts');
