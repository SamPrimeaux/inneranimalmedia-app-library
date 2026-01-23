// Database utility functions

import type { Env, App, Category, AppReview, LibraryQuery } from '../types';

export class AppLibraryDB {
  constructor(private db: D1Database) { }

  /**
   * Get all categories
   */
  async getCategories(): Promise<Category[]> {
    const result = await this.db
      .prepare('SELECT * FROM categories ORDER BY display_order ASC')
      .all<Category>();
    return result.results || [];
  }

  /**
   * Get apps with optional filtering
   */
  async getApps(query: LibraryQuery = {}): Promise<{ apps: App[]; total: number }> {
    const {
      category,
      search,
      featured,
      sort = 'popular',
      page = 1,
      limit = 20,
    } = query;

    let sql = 'SELECT * FROM apps WHERE is_public = 1';
    const params: any[] = [];

    // Filter by category
    if (category) {
      sql += ' AND category = ?';
      params.push(category);
    }

    // Filter featured
    if (featured) {
      sql += ' AND is_featured = 1';
    }

    // Search
    if (search) {
      sql += ' AND (name LIKE ? OR description LIKE ? OR tagline LIKE ?)';
      const searchParam = `%${search}%`;
      params.push(searchParam, searchParam, searchParam);
    }

    // Sorting
    switch (sort) {
      case 'popular':
        sql += ' ORDER BY downloads DESC, rating DESC';
        break;
      case 'newest':
        sql += ' ORDER BY created_at DESC';
        break;
      case 'rating':
        sql += ' ORDER BY rating DESC, review_count DESC';
        break;
      case 'name':
        sql += ' ORDER BY name ASC';
        break;
    }

    // Get total count
    const countResult = await this.db
      .prepare(sql.replace('SELECT *', 'SELECT COUNT(*) as count'))
      .bind(...params)
      .first<{ count: number }>();

    const total = countResult?.count || 0;

    // Pagination
    const offset = (page - 1) * limit;
    sql += ' LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const result = await this.db
      .prepare(sql)
      .bind(...params)
      .all<App>();

    return {
      apps: result.results || [],
      total,
    };
  }

  /**
   * Get a single app by slug
   */
  async getApp(slug: string): Promise<App | null> {
    const result = await this.db
      .prepare('SELECT * FROM apps WHERE slug = ? AND is_public = 1')
      .bind(slug)
      .first<App>();
    return result || null;
  }

  /**
   * Get featured apps
   */
  async getFeaturedApps(limit: number = 4): Promise<App[]> {
    const result = await this.db
      .prepare('SELECT * FROM apps WHERE is_featured = 1 AND is_public = 1 ORDER BY rating DESC LIMIT ?')
      .bind(limit)
      .all<App>();
    return result.results || [];
  }

  /**
   * Get reviews for an app
   */
  async getAppReviews(appId: string, limit: number = 10): Promise<AppReview[]> {
    const result = await this.db
      .prepare('SELECT * FROM app_reviews WHERE app_id = ? ORDER BY created_at DESC LIMIT ?')
      .bind(appId, limit)
      .all<AppReview>();
    return result.results || [];
  }

  /**
   * Record an app view
   */
  async recordView(appId: string, viewType: string, referrer?: string): Promise<void> {
    await this.db
      .prepare('INSERT INTO app_views (app_id, view_type, referrer) VALUES (?, ?, ?)')
      .bind(appId, viewType, referrer || null)
      .run();
  }

  /**
   * Increment download count
   */
  async recordDownload(appId: string, ipAddress?: string, userAgent?: string): Promise<void> {
    // Record download
    await this.db
      .prepare('INSERT INTO app_downloads (app_id, ip_address, user_agent) VALUES (?, ?, ?)')
      .bind(appId, ipAddress || null, userAgent || null)
      .run();

    // Increment counter
    await this.db
      .prepare('UPDATE apps SET downloads = downloads + 1 WHERE id = ?')
      .bind(appId)
      .run();
  }

  /**
   * Get app statistics
   */
  async getStats(): Promise<{
    totalApps: number;
    totalDownloads: number;
    totalCategories: number;
    totalReviews: number;
  }> {
    const [apps, downloads, categories, reviews] = await Promise.all([
      this.db.prepare('SELECT COUNT(*) as count FROM apps WHERE is_public = 1').first<{ count: number }>(),
      this.db.prepare('SELECT SUM(downloads) as total FROM apps WHERE is_public = 1').first<{ total: number }>(),
      this.db.prepare('SELECT COUNT(*) as count FROM categories').first<{ count: number }>(),
      this.db.prepare('SELECT COUNT(*) as count FROM app_reviews').first<{ count: number }>(),
    ]);

    return {
      totalApps: apps?.count || 0,
      totalDownloads: downloads?.total || 0,
      totalCategories: categories?.count || 0,
      totalReviews: reviews?.count || 0,
    };
  }
}
