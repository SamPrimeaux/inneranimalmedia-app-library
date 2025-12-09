/**
 * InnerAnimalMedia App Library
 * Main Worker Entry Point
 */

import type { Env, LibraryQuery } from './types';
import { AppLibraryDB } from './utils/db';
import { renderHomepage } from './templates/homepage';
import { renderLibrary } from './templates/library';
import { renderAppDetail } from './templates/app-detail';
import { renderDashboard } from './templates/dashboard';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Initialize database helper
    const db = new AppLibraryDB(env.DB);

    try {
      // Root homepage
      if (pathname === '/') {
        const [featuredApps, stats] = await Promise.all([
          db.getFeaturedApps(4),
          db.getStats(),
        ]);
        return new Response(renderHomepage(featuredApps, stats), {
          headers: { 'Content-Type': 'text/html; charset=utf-8' },
        });
      }

      // Dashboard page
      if (pathname === '/dashboard') {
        return new Response(renderDashboard(), {
          headers: { 'Content-Type': 'text/html; charset=utf-8' },
        });
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

        return new Response(renderAppDetail(app, reviews), {
          headers: { 'Content-Type': 'text/html; charset=utf-8' },
        });
      }

      // API: Get stats
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
