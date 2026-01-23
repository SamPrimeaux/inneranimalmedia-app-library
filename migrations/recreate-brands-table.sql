-- Drop and recreate brands table with correct schema
DROP TABLE IF EXISTS brands;

CREATE TABLE brands (
    id TEXT PRIMARY KEY,
    brand_slug TEXT UNIQUE NOT NULL,
    brand_name TEXT NOT NULL,
    domain TEXT,
    zone_id TEXT,
    tier TEXT DEFAULT 'Free',
    type TEXT,
    priority TEXT DEFAULT 'MEDIUM',
    logo_avatar TEXT,
    logo_thumb TEXT,
    logo_inverted TEXT,
    logo_public TEXT,
    notes TEXT,
    revenue_total INTEGER DEFAULT 0,
    revenue_paid INTEGER DEFAULT 0,
    revenue_pending INTEGER DEFAULT 0,
    mrr INTEGER DEFAULT 0,
    hours_invested REAL DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_brands_slug ON brands(brand_slug);
CREATE INDEX IF NOT EXISTS idx_brands_domain ON brands(domain);
CREATE INDEX IF NOT EXISTS idx_brands_priority ON brands(priority);
CREATE INDEX IF NOT EXISTS idx_brands_type ON brands(type);
