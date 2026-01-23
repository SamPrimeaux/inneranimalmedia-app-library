/**
 * InnerAnimalMedia App Library
 * Main Worker Entry Point — MeauxAccess styled /dashboard (multi-page SPA)
 */

import type { Env, LibraryQuery } from './types';
import { AppLibraryDB } from './utils/db';
import { renderHomepage } from './templates/homepage';
import { renderLibrary } from './templates/library';
import { renderDashboard } from './templates/dashboard';
import { DASHBOARD_HTML } from './dashboard-html';
import { THEMES_CSS } from './themes-css';
import { AgentSwarm, SessionDO, IAMSession, MeauxSession } from './durable-objects';
export { AgentSwarm, SessionDO, IAMSession, MeauxSession };

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Initialize database helper
    const db = new AppLibraryDB(env.DB);

    try {
      // Root — redirect to /dashboard (dev)
      if (pathname === '/') {
        return Response.redirect(url.origin + '/dashboard', 302);
      }

      // Dashboard SPA — styled multi-page (meaux-storm-gray)
      // Try R2 first, fallback to embedded
      if (pathname === '/dashboard' || pathname.startsWith('/dashboard/')) {
        try {
          const dashboardFile = await env.ASSETS.get('dashboard/index.html');
          if (dashboardFile) {
            const html = await dashboardFile.text();
            return new Response(html, {
              headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=300' },
            });
          }
        } catch (e) {
          console.log('Dashboard not in R2, using embedded fallback');
        }
        // Fallback to embedded
        return new Response(DASHBOARD_HTML, {
          headers: { 'Content-Type': 'text/html; charset=utf-8' },
        });
      }

      // Assets: themes.css (minimal meaux-storm-gray)
      // Try R2 first, fallback to embedded
      if (pathname === '/assets/themes.css') {
        try {
          const themesFile = await env.ASSETS.get('dashboard/assets/themes.css');
          if (themesFile) {
            const css = await themesFile.text();
            return new Response(css, {
              headers: { 'Content-Type': 'text/css; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
            });
          }
        } catch (e) {
          console.log('Themes CSS not in R2, using embedded fallback');
        }
        // Fallback to embedded
        return new Response(THEMES_CSS, {
          headers: { 'Content-Type': 'text/css; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
        });
      }

      // Assets: serve from R2 (e.g. /assets/*, /dashboard-modules/*)
      if (pathname.startsWith('/assets/') || pathname.startsWith('/dashboard-modules/')) {
        let key = pathname.slice(1); // Remove leading /

        // Handle /assets/dashboard-modules/* -> try both paths
        if (key.startsWith('assets/dashboard-modules/')) {
          const altKey = key.replace('assets/dashboard-modules/', 'dashboard-modules/');
          try {
            const obj = await env.ASSETS.get(altKey);
            if (obj) {
              const contentType = altKey.endsWith('.css') ? 'text/css' : altKey.endsWith('.js') ? 'application/javascript' : 'application/octet-stream';
              const headers = new Headers();
              headers.set('Content-Type', contentType);
              headers.set('Cache-Control', 'public, max-age=3600');
              return new Response(obj.body, { headers });
            }
          } catch (_) { }
        }

        // Try the original path
        try {
          const obj = await env.ASSETS.get(key);
          if (obj) {
            const contentType = key.endsWith('.css') ? 'text/css' : key.endsWith('.js') ? 'application/javascript' : 'application/octet-stream';
            const headers = new Headers();
            headers.set('Content-Type', contentType);
            headers.set('Cache-Control', 'public, max-age=3600');
            return new Response(obj.body, { headers });
          }
        } catch (_) { }
        return new Response('Not Found', { status: 404 });
      }

      // API: clients (D1 inneranimalmedia-business)
      if (pathname === '/api/clients' && request.method === 'GET') {
        try {
          const limit = Math.min(parseInt(new URL(request.url).searchParams.get('limit') || '50', 10), 100);
          const r = await env.DB.prepare('SELECT id, name, email, status, domain FROM clients ORDER BY name ASC LIMIT ?').bind(limit).all<{ id: string; name: string; email: string; status: string; domain: string | null }>();
          const clients = (r.results || []).map((c) => ({ id: c.id, name: c.name, email: c.email, status: c.status || 'active', domain: c.domain }));
          return new Response(JSON.stringify({ success: true, clients }), {
            headers: { 'Content-Type': 'application/json' },
          });
        } catch (e) {
          return new Response(JSON.stringify({ success: false, error: String(e), clients: [] }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          });
        }
      }

      // API: brands CRUD (D1 inneranimalmedia-business)
      if (pathname === '/api/brands' && request.method === 'GET') {
        try {
          const url = new URL(request.url);
          const search = url.searchParams.get('search') || '';
          const priority = url.searchParams.get('priority') || '';
          const type = url.searchParams.get('type') || '';
          const tier = url.searchParams.get('tier') || '';
          let query = 'SELECT * FROM brands WHERE 1=1';
          const params: any[] = [];
          if (search) {
            query += ' AND (brand_name LIKE ? OR domain LIKE ? OR brand_slug LIKE ?)';
            const searchTerm = `%${search}%`;
            params.push(searchTerm, searchTerm, searchTerm);
          }
          if (priority) query += ' AND priority = ?';
          if (priority) params.push(priority);
          if (type) query += ' AND type = ?';
          if (type) params.push(type);
          if (tier) query += ' AND tier = ?';
          if (tier) params.push(tier);
          query += ' ORDER BY CASE priority WHEN "HIGHEST" THEN 1 WHEN "HIGH" THEN 2 WHEN "MEDIUM" THEN 3 WHEN "LOW" THEN 4 ELSE 5 END, brand_name ASC';
          const stmt = env.DB.prepare(query);
          const r = await stmt.bind(...params).all();
          const brands = r.results || [];
          // Fallback to hardcoded seed if no brands found
          if (brands.length === 0) {
            const fallback = [
              { id: 'brand_inneranimalmedia', brand_slug: 'inneranimalmedia', brand_name: 'Inner Animal Media', type: 'SaaS Platform - Main Product', priority: 'HIGHEST', domain: 'inneranimalmedia.com', zone_id: '0bab48636c1bea4be4ea61c0c7787c3e', tier: 'Pro', logo_avatar: 'https://imagedelivery.net/g7wf09fCONpnidkRnR_5vw/17535395-1501-490a-ff3d-e43d7c16a000/avatar', logo_thumb: 'https://imagedelivery.net/g7wf09fCONpnidkRnR_5vw/17535395-1501-490a-ff3d-e43d7c16a000/thumbnail', notes: 'Primary SaaS offering - needs premium branding & refined copy', revenue_total: 0, revenue_paid: 0, revenue_pending: 0, mrr: 0, hours_invested: 0 },
              { id: 'brand_nicoc', brand_slug: 'nicoc', brand_name: 'New Iberia Church of Christ', type: 'Client Website', priority: 'HIGH', domain: 'newiberiachurchofchrist.com', zone_id: 'e75c2160f16a66e66dd22b948751f112', tier: 'Pro (client)', logo_thumb: 'https://imagedelivery.net/g7wf09fCONpnidkRnR_5vw/icons/nicoc-official-logo.png/small', logo_inverted: 'https://imagedelivery.net/g7wf09fCONpnidkRnR_5vw/75db2f88-b909-40ad-1f03-8c598653ca00/small', revenue_total: 500, revenue_paid: 200, revenue_pending: 300, hours_invested: 18, notes: 'Client paid for Cloudflare Pro (revenue does not go to you)' },
              { id: 'brand_pawlove', brand_slug: 'pawlove', brand_name: 'Paw Love Rescue', type: 'Nonprofit Platform', priority: 'HIGH', domain: 'pawloverescue.org', zone_id: '030d0f520c4026c45d187468a7cc8dc2', tier: 'Free', logo_avatar: 'https://imagedelivery.net/g7wf09fCONpnidkRnR_5vw/111a8e16-4a71-48a3-754b-2b950780a300/avatar', revenue_total: 750, revenue_paid: 750, notes: 'CONVERT TO RECURRING - needs centralized nonprofit optimization' },
              { id: 'brand_pelicanpeptides', brand_slug: 'pelicanpeptides', brand_name: 'Pelican Peptides', type: 'E-commerce', priority: 'MEDIUM', domain: 'pelicanpeptides.com', zone_id: '671ceff6c7fbb6f936ae2afd4a7d46a8', tier: 'Free', logo_thumb: 'https://imagedelivery.net/g7wf09fCONpnidkRnR_5vw/75db2f88-b909-40ad-1f03-8c598653ca00/small', revenue_total: 600, revenue_paid: 300, revenue_pending: 300, notes: 'Need upsell strategy & monthly options' },
              { id: 'brand_southernpets', brand_slug: 'southernpets', brand_name: 'Southern Pets Animal Rescue', type: 'SaaS Client', priority: 'MEDIUM', domain: 'southernpetsanimalrescue.com', zone_id: '841846658f1ae77907f5d35485927060', tier: 'Free', logo_public: 'https://imagedelivery.net/g7wf09fCONpnidkRnR_5vw/793e0ecb-8787-454a-676d-97c87e5a1c00/public', mrr: 75, notes: 'FIRST PAYING SAAS CLIENT' },
              { id: 'brand_meauxbility', brand_slug: 'meauxbility', brand_name: 'Meauxbility', type: 'Nonprofit Platform - Major Tenant', priority: 'HIGH', domain: 'meauxbility.org', zone_id: '2f420b6c582e4ba8d7b1f6ebaf91438b', tier: 'Free', logo_avatar: 'https://imagedelivery.net/g7wf09fCONpnidkRnR_5vw/e6e1daec-6dcd-4269-eaf0-820275984a00/avatar', notes: 'Major tenant - finish buildout, asset organization needed' },
              { id: 'brand_iautodidact', brand_slug: 'iautodidact', brand_name: 'iAutodidact', type: 'Brand Platform', priority: 'MEDIUM', domain: 'iautodidact.app', zone_id: '8af8b20619901b98901828527fdf42a0', logo_avatar: 'https://imagedelivery.net/g7wf09fCONpnidkRnR_5vw/611ea0dd-fcae-4997-8a4f-1d4a69fa9d00/avatar', notes: 'Future community/learning courses' },
              { id: 'brand_meauxcloud', brand_slug: 'meauxcloud', brand_name: 'MeauxCloud', type: 'Infrastructure/Backend', priority: 'LOW', domain: 'meauxcloud.org', zone_id: 'e5e1a89175623885537cd6572823fe16', logo_avatar: 'https://imagedelivery.net/g7wf09fCONpnidkRnR_5vw/85b76f95-8b55-4d39-65d9-bc705bea3100/avatar', notes: 'Infrastructure brand - low priority' }
            ];
            return new Response(JSON.stringify({ success: true, brands: fallback }), {
              headers: { 'Content-Type': 'application/json' },
            });
          }
          return new Response(JSON.stringify({ success: true, brands }), {
            headers: { 'Content-Type': 'application/json' },
          });
        } catch (e) {
          return new Response(JSON.stringify({ success: false, error: String(e), brands: [] }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          });
        }
      }

      if (pathname === '/api/brands' && request.method === 'POST') {
        try {
          const body = await request.json<{
            brand_slug: string; brand_name: string; domain?: string; zone_id?: string;
            tier?: string; type?: string; priority?: string; logo_avatar?: string;
            logo_thumb?: string; logo_inverted?: string; notes?: string;
            revenue_total?: number; revenue_paid?: number; revenue_pending?: number; mrr?: number; hours_invested?: number;
          }>();
          const id = `brand_${body.brand_slug}`;
          const now = new Date().toISOString();
          await env.DB.prepare(`
            INSERT INTO brands (id, brand_slug, brand_name, domain, zone_id, tier, type, priority,
              logo_avatar, logo_thumb, logo_inverted, notes, revenue_total, revenue_paid, revenue_pending, mrr, hours_invested, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `).bind(
            id, body.brand_slug, body.brand_name, body.domain || null, body.zone_id || null,
            body.tier || 'Free', body.type || null, body.priority || 'MEDIUM',
            body.logo_avatar || null, body.logo_thumb || null, body.logo_inverted || null, body.notes || null,
            body.revenue_total || 0, body.revenue_paid || 0, body.revenue_pending || 0, body.mrr || 0, body.hours_invested || 0,
            now, now
          ).run();
          return new Response(JSON.stringify({ success: true, id }), {
            headers: { 'Content-Type': 'application/json' },
          });
        } catch (e: any) {
          return new Response(JSON.stringify({ success: false, error: String(e) }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        }
      }

      if (pathname.startsWith('/api/brands/') && request.method === 'PUT') {
        try {
          const id = pathname.replace('/api/brands/', '');
          const body = await request.json<Partial<{
            brand_slug: string; brand_name: string; domain: string; zone_id: string;
            tier: string; type: string; priority: string; logo_avatar: string;
            logo_thumb: string; logo_inverted: string; notes: string;
            revenue_total: number; revenue_paid: number; revenue_pending: number; mrr: number; hours_invested: number;
          }>>();
          const updates: string[] = [];
          const values: any[] = [];
          Object.entries(body).forEach(([k, v]) => {
            if (v !== undefined && k !== 'id') {
              updates.push(`${k} = ?`);
              values.push(v);
            }
          });
          if (updates.length === 0) {
            return new Response(JSON.stringify({ success: false, error: 'No fields to update' }), {
              status: 400,
              headers: { 'Content-Type': 'application/json' },
            });
          }
          updates.push('updated_at = ?');
          values.push(new Date().toISOString());
          values.push(id);
          await env.DB.prepare(`UPDATE brands SET ${updates.join(', ')} WHERE id = ?`).bind(...values).run();
          return new Response(JSON.stringify({ success: true }), {
            headers: { 'Content-Type': 'application/json' },
          });
        } catch (e) {
          return new Response(JSON.stringify({ success: false, error: String(e) }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        }
      }

      if (pathname.startsWith('/api/brands/') && request.method === 'DELETE') {
        try {
          const id = pathname.replace('/api/brands/', '');
          await env.DB.prepare('DELETE FROM brands WHERE id = ?').bind(id).run();
          return new Response(JSON.stringify({ success: true }), {
            headers: { 'Content-Type': 'application/json' },
          });
        } catch (e) {
          return new Response(JSON.stringify({ success: false, error: String(e) }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        }
      }

      // API: Cloudflare Zones (domains)
      if (pathname === '/api/cf/zones' && request.method === 'GET') {
        try {
          if (!env.CLOUDFLARE_API_TOKEN) {
            return new Response(JSON.stringify({ success: false, error: 'Cloudflare API token not configured' }), {
              status: 500,
              headers: { 'Content-Type': 'application/json' },
            });
          }
          const accountId = env.CLOUDFLARE_ACCOUNT_ID || 'ede6590ac0d2fb7daf155b35653457b2';
          const res = await fetch(`https://api.cloudflare.com/client/v4/zones?account.id=${accountId}&per_page=50`, {
            headers: {
              'Authorization': `Bearer ${env.CLOUDFLARE_API_TOKEN}`,
              'Content-Type': 'application/json',
            },
          });
          const data = await res.json();
          if (data.success) {
            return new Response(JSON.stringify({ success: true, zones: data.result || [] }), {
              headers: { 'Content-Type': 'application/json' },
            });
          }
          return new Response(JSON.stringify({ success: false, error: data.errors?.[0]?.message || 'API error' }), {
            status: res.status,
            headers: { 'Content-Type': 'application/json' },
          });
        } catch (e) {
          return new Response(JSON.stringify({ success: false, error: String(e) }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          });
        }
      }

      // API: Cloudflare Zone Details
      if (pathname.startsWith('/api/cf/zone/') && request.method === 'GET') {
        try {
          if (!env.CLOUDFLARE_API_TOKEN) {
            return new Response(JSON.stringify({ success: false, error: 'Cloudflare API token not configured' }), {
              status: 500,
              headers: { 'Content-Type': 'application/json' },
            });
          }
          const zoneId = pathname.replace('/api/cf/zone/', '');
          const res = await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}`, {
            headers: {
              'Authorization': `Bearer ${env.CLOUDFLARE_API_TOKEN}`,
              'Content-Type': 'application/json',
            },
          });
          const data = await res.json();
          if (data.success) {
            return new Response(JSON.stringify({ success: true, zone: data.result }), {
              headers: { 'Content-Type': 'application/json' },
            });
          }
          return new Response(JSON.stringify({ success: false, error: data.errors?.[0]?.message || 'API error' }), {
            status: res.status,
            headers: { 'Content-Type': 'application/json' },
          });
        } catch (e) {
          return new Response(JSON.stringify({ success: false, error: String(e) }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          });
        }
      }

      // Library page
      if (pathname === '/library') {
        const query: LibraryQuery = {
          category: url.searchParams.get('category') || undefined,
          search: url.searchParams.get('search') || undefined,
          featured: url.searchParams.get('featured') === 'true',
          sort: (url.searchParams.get('sort') as any) || 'popular',
          page: parseInt(url.searchParams.get('page') || '1'),
          limit: parseInt(url.searchParams.get('limit') || '20'),
        };

        const [{ apps, total }, categories] = await Promise.all([
          db.getApps(query),
          db.getCategories(),
        ]);

        return new Response(
          renderLibrary(
            apps,
            categories,
            query.category,
            query.sort,
            query.search,
            total
          ),
          {
            headers: { 'Content-Type': 'text/html; charset=utf-8' },
          }
        );
      }

      // App detail page
      if (pathname.startsWith('/library/')) {
        const slug = pathname.replace('/library/', '');

        if (!slug) {
          return Response.redirect(url.origin + '/library', 302);
        }

        const app = await db.getApp(slug);

        if (!app) {
          return new Response('App not found', {
            status: 404,
            headers: { 'Content-Type': 'text/plain' },
          });
        }

        // Record view
        await db.recordView(app.id, 'detail', request.headers.get('referer') || undefined);

        // Get reviews
        const reviews = await db.getAppReviews(app.id, 10);

        // Simple app detail page (TODO: Create proper template)
        const appDetailHTML = `
          <!DOCTYPE html>
          <html>
          <head><title>${app.name}</title></head>
          <body>
            <h1>${app.name}</h1>
            <p>${app.description || 'No description'}</p>
            <a href="/library">Back to Library</a>
          </body>
          </html>
        `;
        return new Response(appDetailHTML, {
          headers: { 'Content-Type': 'text/html; charset=utf-8' },
        });
      }

      // API: Notifications
      if (pathname === '/api/notifications' && request.method === 'GET') {
        try {
          const url = new URL(request.url);
          const limit = Math.min(parseInt(url.searchParams.get('limit') || '20', 10), 100);
          const unread = url.searchParams.get('unread') === 'true';

          // Query notifications from database (if table exists) or return mock
          let notifications: any[] = [];
          try {
            const r = await env.DB.prepare('SELECT id, title, message, type, read, created_at FROM notifications ORDER BY created_at DESC LIMIT ?').bind(limit).all<{ id: string; title: string; message: string; type: string; read: boolean; created_at: string }>();
            notifications = (r.results || []).map(n => ({
              id: n.id,
              title: n.title,
              message: n.message,
              type: n.type || 'info',
              read: n.read || false,
              createdAt: n.created_at,
            }));
          } catch (e) {
            // Table might not exist, return empty array
            console.log('Notifications table not found, returning empty array');
          }

          if (unread) {
            notifications = notifications.filter(n => !n.read);
          }

          return new Response(JSON.stringify({
            success: true,
            notifications,
            count: notifications.length,
            unreadCount: notifications.filter(n => !n.read).length,
          }), {
            headers: { 'Content-Type': 'application/json' },
          });
        } catch (e) {
          return new Response(JSON.stringify({
            success: false,
            error: String(e),
            notifications: [],
          }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          });
        }
      }

      // API: Mark notification as read
      if (pathname.startsWith('/api/notifications/') && pathname.endsWith('/read') && request.method === 'POST') {
        try {
          const id = pathname.replace('/api/notifications/', '').replace('/read', '');
          await env.DB.prepare('UPDATE notifications SET read = 1 WHERE id = ?').bind(id).run();
          return new Response(JSON.stringify({ success: true }), {
            headers: { 'Content-Type': 'application/json' },
          });
        } catch (e) {
          return new Response(JSON.stringify({ success: false, error: String(e) }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          });
        }
      }

      // Favicon
      if (pathname === '/favicon.ico') {
        try {
          const favicon = await env.ASSETS.get('favicon.ico');
          if (favicon) {
            return new Response(favicon.body, {
              headers: { 'Content-Type': 'image/x-icon', 'Cache-Control': 'public, max-age=86400' },
            });
          }
        } catch (_) { }
        // Return 204 No Content if favicon not found
        return new Response(null, { status: 204 });
      }

      // API: Get dashboard stats (real data from D1)
      if (pathname === '/api/dashboard/stats' && request.method === 'GET') {
        try {
          const [brandsRes, clientsRes, invoicesRes, r2Res] = await Promise.all([
            env.DB.prepare('SELECT SUM(revenue_total) as total_revenue, SUM(revenue_paid) as paid_revenue, SUM(mrr) as total_mrr, COUNT(*) as brand_count FROM brands').first<{ total_revenue: number; paid_revenue: number; total_mrr: number; brand_count: number }>(),
            env.DB.prepare('SELECT COUNT(*) as count FROM clients').first<{ count: number }>(),
            env.DB.prepare('SELECT COUNT(*) as count FROM invoices').first<{ count: number }>(),
            env.ASSETS.list({ limit: 1 }).catch(() => ({ objects: [], truncated: false })),
          ]);
          const totalRevenue = brandsRes?.total_revenue || 0;
          const paidRevenue = brandsRes?.paid_revenue || 0;
          const mrr = brandsRes?.total_mrr || 0;
          const brandCount = brandsRes?.brand_count || 0;
          const clientCount = clientsRes?.count || 0;
          const invoiceCount = invoicesRes?.count || 0;
          const r2ObjectCount = r2Res?.objects?.length || 0;
          return new Response(JSON.stringify({
            success: true,
            stats: {
              totalRevenue: totalRevenue,
              paidRevenue: paidRevenue,
              pendingRevenue: totalRevenue - paidRevenue,
              mrr: mrr,
              brandCount: brandCount,
              clientCount: clientCount,
              invoiceCount: invoiceCount,
              r2ObjectCount: r2ObjectCount,
            },
          }), {
            headers: { 'Content-Type': 'application/json' },
          });
        } catch (e) {
          return new Response(JSON.stringify({ success: false, error: String(e), stats: {} }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          });
        }
      }

      // API: Get stats (legacy)
      if (pathname === '/api/stats') {
        const stats = await db.getStats();
        return new Response(JSON.stringify(stats), {
          headers: { 'Content-Type': 'application/json' },
        });
      }

      // API: Get all apps
      if (pathname === '/api/apps') {
        const query: LibraryQuery = {
          category: url.searchParams.get('category') || undefined,
          search: url.searchParams.get('search') || undefined,
          featured: url.searchParams.get('featured') === 'true',
          sort: (url.searchParams.get('sort') as any) || 'popular',
          page: parseInt(url.searchParams.get('page') || '1'),
          limit: parseInt(url.searchParams.get('limit') || '20'),
        };

        const { apps, total } = await db.getApps(query);

        return new Response(
          JSON.stringify({
            apps,
            total,
            page: query.page,
            limit: query.limit,
            pages: Math.ceil(total / (query.limit || 20)),
          }),
          {
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }

      // API: Get single app
      if (pathname.startsWith('/api/apps/')) {
        const slug = pathname.replace('/api/apps/', '');
        const app = await db.getApp(slug);

        if (!app) {
          return new Response(JSON.stringify({ error: 'App not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        const reviews = await db.getAppReviews(app.id, 10);

        return new Response(
          JSON.stringify({ app, reviews }),
          {
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }

      // API: R2 List (enhanced for dashboard)
      if (pathname === '/api/r2/list' && request.method === 'GET') {
        try {
          const url = new URL(request.url);
          const limit = Math.min(parseInt(url.searchParams.get('limit') || '1000', 10), 5000);
          const prefix = url.searchParams.get('prefix') || '';
          const cursor = url.searchParams.get('cursor') || '';

          const listOptions: { limit: number; prefix?: string; cursor?: string } = { limit };
          if (prefix) listOptions.prefix = prefix;
          if (cursor) listOptions.cursor = cursor;

          const objects = await env.ASSETS.list(listOptions);
          const results = objects.objects.map(obj => ({
            key: obj.key,
            size: obj.size,
            etag: obj.etag,
            uploaded: obj.uploaded ? new Date(obj.uploaded).toISOString() : null,
            httpEtag: obj.httpEtag,
            httpMetadata: obj.httpMetadata,
            contentType: obj.httpMetadata?.contentType || 'application/octet-stream',
            cacheControl: obj.httpMetadata?.cacheControl,
          }));

          return new Response(JSON.stringify({
            success: true,
            objects: results,
            truncated: objects.truncated,
            cursor: objects.cursor,
            total: results.length,
          }), {
            headers: { 'Content-Type': 'application/json' },
          });
        } catch (e) {
          return new Response(JSON.stringify({ success: false, error: String(e) }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          });
        }
      }

      // API: Database tables list
      if (pathname === '/api/db/tables' && request.method === 'GET') {
        try {
          const r = await env.DB.prepare("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name").all<{ name: string }>();
          const tables = (r.results || []).map(t => t.name).filter(n => !n.startsWith('sqlite_'));
          return new Response(JSON.stringify({ success: true, tables, count: tables.length }), {
            headers: { 'Content-Type': 'application/json' },
          });
        } catch (e) {
          return new Response(JSON.stringify({ success: false, error: String(e), tables: [] }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          });
        }
      }

      // API: Database table schema
      if (pathname.startsWith('/api/db/table/') && request.method === 'GET') {
        try {
          const tableName = pathname.replace('/api/db/table/', '').split('/')[0];
          const r = await env.DB.prepare(`PRAGMA table_info(${tableName})`).all();
          return new Response(JSON.stringify({ success: true, schema: r.results || [] }), {
            headers: { 'Content-Type': 'application/json' },
          });
        } catch (e) {
          return new Response(JSON.stringify({ success: false, error: String(e) }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          });
        }
      }

      // API: Database query (read-only, limited)
      if (pathname === '/api/db/query' && request.method === 'POST') {
        try {
          const body = await request.json<{ query: string; limit?: number }>();
          const limit = Math.min(body.limit || 100, 1000);
          let query = body.query.trim();
          if (!query.toLowerCase().startsWith('select')) {
            return new Response(JSON.stringify({ success: false, error: 'Only SELECT queries allowed' }), {
              status: 400,
              headers: { 'Content-Type': 'application/json' },
            });
          }
          if (!query.toLowerCase().includes('limit')) {
            query += ` LIMIT ${limit}`;
          }
          const r = await env.DB.prepare(query).all();
          return new Response(JSON.stringify({ success: true, results: r.results || [], meta: r.meta }), {
            headers: { 'Content-Type': 'application/json' },
          });
        } catch (e) {
          return new Response(JSON.stringify({ success: false, error: String(e) }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          });
        }
      }

      // API: R2 Upload
      if (pathname === '/api/r2/upload' && request.method === 'POST') {
        try {
          const formData = await request.formData();
          const file = formData.get('file') as File;
          const key = formData.get('key') as string;

          if (!file || !key) {
            return new Response(JSON.stringify({ error: 'file and key required' }), {
              status: 400,
              headers: { 'Content-Type': 'application/json' },
            });
          }

          const fileBuffer = await file.arrayBuffer();
          await env.ASSETS.put(key, fileBuffer, {
            httpMetadata: {
              contentType: file.type || 'application/octet-stream',
              cacheControl: 'public, max-age=3600',
            },
          });

          return new Response(JSON.stringify({
            success: true,
            key,
            size: file.size,
          }), {
            headers: { 'Content-Type': 'application/json' },
          });
        } catch (e) {
          return new Response(JSON.stringify({ error: String(e) }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          });
        }
      }

      // API: R2 Delete
      if (pathname === '/api/r2/delete' && request.method === 'POST') {
        try {
          const body = await request.json<{ key: string | string[] }>();
          if (!body.key) {
            return new Response(JSON.stringify({ error: 'key required' }), {
              status: 400,
              headers: { 'Content-Type': 'application/json' },
            });
          }

          const keys = Array.isArray(body.key) ? body.key : [body.key];
          for (const key of keys) {
            await env.ASSETS.delete(key);
          }

          return new Response(JSON.stringify({
            success: true,
            deleted: keys.length,
          }), {
            headers: { 'Content-Type': 'application/json' },
          });
        } catch (e) {
          return new Response(JSON.stringify({ error: String(e) }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          });
        }
      }

      // API: Dashboard Revenue (proxy to main worker)
      if (pathname === '/api/dashboard/revenue' && request.method === 'GET') {
        try {
          const mainWorkerUrl = 'https://inneranimalmediamain.meauxbility.workers.dev/api/dashboard/revenue';
          const response = await fetch(mainWorkerUrl);
          const data = await response.json();
          return new Response(JSON.stringify(data), {
            headers: { 'Content-Type': 'application/json' },
          });
        } catch (e) {
          return new Response(JSON.stringify({ error: String(e) }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          });
        }
      }

      // API: Dashboard Stats (proxy to main worker)
      if (pathname === '/api/dashboard/stats' && request.method === 'GET') {
        try {
          const mainWorkerUrl = 'https://inneranimalmediamain.meauxbility.workers.dev/api/dashboard/stats';
          const response = await fetch(mainWorkerUrl);
          const data = await response.json();
          return new Response(JSON.stringify(data), {
            headers: { 'Content-Type': 'application/json' },
          });
        } catch (e) {
          return new Response(JSON.stringify({ error: String(e) }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          });
        }
      }

      // Health check
      if (pathname === '/health') {
        return new Response(
          JSON.stringify({
            status: 'ok',
            service: 'inneranimalmedia-app-library',
            version: '1.0.0',
            timestamp: new Date().toISOString(),
          }),
          {
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }

      // 404
      return new Response('Not Found', {
        status: 404,
        headers: { 'Content-Type': 'text/plain' },
      });
    } catch (error: any) {
      console.error('Worker error:', error);
      return new Response(
        JSON.stringify({
          error: 'Internal Server Error',
          message: error.message,
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
  },
};
