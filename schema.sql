-- InnerAnimalMedia App Library Database Schema
-- D1 SQLite Database

-- Apps table
CREATE TABLE IF NOT EXISTS apps (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  tagline TEXT,
  description TEXT,
  long_description TEXT,
  
  -- Metadata
  category TEXT NOT NULL,
  subcategory TEXT,
  developer TEXT NOT NULL,
  developer_url TEXT,
  
  -- Versions
  version TEXT NOT NULL,
  build_number INTEGER,
  release_date TEXT NOT NULL,
  min_os_version TEXT,
  
  -- Assets (R2 keys)
  icon_url TEXT NOT NULL,
  hero_image_url TEXT,
  screenshots TEXT, -- JSON array of screenshot URLs
  video_url TEXT,
  
  -- Metrics
  downloads INTEGER DEFAULT 0,
  rating REAL DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  
  -- Access
  is_public BOOLEAN DEFAULT 1,
  is_featured BOOLEAN DEFAULT 0,
  install_url TEXT NOT NULL,
  documentation_url TEXT,
  
  -- Timestamps
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT, -- emoji or icon name
  display_order INTEGER DEFAULT 0,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- App downloads tracking
CREATE TABLE IF NOT EXISTS app_downloads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  app_id TEXT NOT NULL,
  user_id TEXT,
  ip_address TEXT,
  user_agent TEXT,
  downloaded_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (app_id) REFERENCES apps(id)
);

-- App reviews
CREATE TABLE IF NOT EXISTS app_reviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  app_id TEXT NOT NULL,
  user_id TEXT,
  username TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
  title TEXT,
  comment TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (app_id) REFERENCES apps(id)
);

-- Analytics
CREATE TABLE IF NOT EXISTS app_views (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  app_id TEXT NOT NULL,
  view_type TEXT NOT NULL, -- 'list', 'detail', 'search'
  referrer TEXT,
  viewed_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (app_id) REFERENCES apps(id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_apps_category ON apps(category);
CREATE INDEX IF NOT EXISTS idx_apps_featured ON apps(is_featured, is_public);
CREATE INDEX IF NOT EXISTS idx_apps_rating ON apps(rating DESC);
CREATE INDEX IF NOT EXISTS idx_apps_downloads ON apps(downloads DESC);
CREATE INDEX IF NOT EXISTS idx_apps_created ON apps(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_apps_slug ON apps(slug);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_app_downloads_app ON app_downloads(app_id);
CREATE INDEX IF NOT EXISTS idx_app_reviews_app ON app_reviews(app_id);
CREATE INDEX IF NOT EXISTS idx_app_views_app ON app_views(app_id);
