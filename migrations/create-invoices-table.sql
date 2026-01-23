-- Invoices table for invoice tracking
-- D1 Migration: inneranimalmedia-business

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
