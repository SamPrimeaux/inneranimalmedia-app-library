-- Complete table creation script for inneranimalmedia-business
-- Run this to ensure all required tables exist

-- Brands table (if not exists)
CREATE TABLE IF NOT EXISTS brands (
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

-- Clients table (if not exists)
CREATE TABLE IF NOT EXISTS clients (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT,
    status TEXT DEFAULT 'active',
    domain TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_clients_name ON clients(name);
CREATE INDEX IF NOT EXISTS idx_clients_status ON clients(status);
CREATE INDEX IF NOT EXISTS idx_clients_domain ON clients(domain);

-- Invoices table (if not exists)
CREATE TABLE IF NOT EXISTS invoices (
    id TEXT PRIMARY KEY,
    client_id TEXT,
    brand_id TEXT,
    amount INTEGER NOT NULL,
    status TEXT DEFAULT 'pending',
    due_date TEXT,
    paid_date TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (client_id) REFERENCES clients(id),
    FOREIGN KEY (brand_id) REFERENCES brands(id)
);

CREATE INDEX IF NOT EXISTS idx_invoices_client ON invoices(client_id);
CREATE INDEX IF NOT EXISTS idx_invoices_brand ON invoices(brand_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices(status);
CREATE INDEX IF NOT EXISTS idx_invoices_due_date ON invoices(due_date);

-- Notifications table (if not exists)
CREATE TABLE IF NOT EXISTS notifications (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT DEFAULT 'info',
    read INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read);
CREATE INDEX IF NOT EXISTS idx_notifications_created ON notifications(created_at);
CREATE INDEX IF NOT EXISTS idx_notifications_type ON notifications(type);
