# All Live URLs - Complete Reference

## ?? Base URL
**https://inneranimalmedia-dev.meauxbility.workers.dev**

---

## ?? Dashboard Pages (SPA - All serve same HTML from R2)

| URL | Page | Description |
|-----|------|-------------|
| `/` | Redirect | `302` ? `/dashboard` |
| `/dashboard` | Overview | Stats, activity feed, system health |
| `/dashboard/projects` | Projects | Client projects grid (from D1) |
| `/dashboard/library` | Library | App library browser |
| `/dashboard/tasks` | Tasks | Task management |
| `/dashboard/meauxwork` | MeauxWork | Project boards (Kanban) |
| `/dashboard/meauxmedia` | MeauxMedia | Media gallery (from R2) |
| `/dashboard/brands` | Brands | Brand Command Center (8 brands, image previews) |
| `/dashboard/r2` | R2 Storage | R2 object browser |
| `/dashboard/database` | Database | Database explorer (220+ tables) |
| `/dashboard/settings` | Settings | Settings page |

---

## ?? API Endpoints

### Brands API
- `GET /api/brands` - List all brands (with search/filter)
- `POST /api/brands` - Create new brand
- `PUT /api/brands/:id` - Update brand
- `DELETE /api/brands/:id` - Delete brand

### Clients API
- `GET /api/clients` - List clients from D1

### R2 Storage API
- `GET /api/r2/list` - List R2 objects (query params: `prefix`, `cursor`, `limit`)
- `POST /api/r2/upload` - Upload file (form-data: `file`, `key`)
- `POST /api/r2/delete` - Delete object (JSON: `{key: string}`)

### Cloudflare API
- `GET /api/cf/zones` - List all Cloudflare zones
- `GET /api/cf/zone/:zone_id` - Get zone details

### Database API
- `GET /api/db/tables` - List all tables
- `GET /api/db/table/:name` - Get table schema
- `POST /api/db/query` - Run SELECT query (JSON: `{query: string, limit?: number}`)

---

## ?? Assets

| URL | Source | Description |
|-----|--------|-------------|
| `/assets/themes.css` | R2 ? Embedded | Theme CSS (meaux-storm-gray minimal) |
| `/assets/dashboard-modules/*.js` | R2 | Dashboard modules (if present) |
| `/assets/*` | R2 | Other assets (images, styles, etc.) |

---

## ?? R2 Storage Location

### **Bucket:** `inneranimalmedia-assets`
**Binding:** `ASSETS` in worker

### Dashboard Files in R2

```
? dashboard/index.html          ? Main dashboard HTML (served first, embedded fallback)
? dashboard/assets/themes.css   ? Theme CSS (served first, embedded fallback)
```

### Other Assets in R2

```
? assets/themes.css                    ? Full 46-theme library
? assets/dashboard-modules/            ? Dashboard JavaScript modules
   ??? global-state.js
   ??? meauxmedia.js
? assets/images/                       ? Image assets
? assets/styles/                       ? Style files
```

---

## ?? How Dashboard is Served

### Current Flow (Hybrid)

1. **Request:** `GET /dashboard`
2. **Worker checks R2:** `ASSETS.get('dashboard/index.html')`
3. **If found in R2:** Serve from R2 (with cache headers)
4. **If not in R2:** Serve embedded `DASHBOARD_HTML` (fallback)
5. **Response:** HTML with all dashboard pages (SPA)

### Benefits

- ? **Update UI without redeploy:** Upload new HTML to R2
- ? **Always works:** Embedded fallback ensures reliability
- ? **Fast:** R2 is fast, embedded is instant
- ? **Version control:** Can use R2 keys like `dashboard/v2/index.html`

---

## ?? How to Update Dashboard

### Quick Update (R2 Only - No Redeploy)
```bash
# 1. Edit public/dashboard-index.html
# 2. Upload to R2
wrangler r2 object put inneranimalmedia-assets/dashboard/index.html \
  --file=./public/dashboard-index.html \
  --env dev
```

### Full Update (R2 + Worker)
```bash
# 1. Edit src/dashboard-html.ts
# 2. Extract to public/dashboard-index.html
node scripts/inline-dashboard.js  # (if using the script)
# 3. Upload to R2
wrangler r2 object put inneranimalmedia-assets/dashboard/index.html \
  --file=./public/dashboard-index.html \
  --env dev
# 4. Deploy worker (updates embedded fallback)
wrangler deploy --env dev
```

---

## ?? R2 Object Keys Reference

### Dashboard
- `dashboard/index.html` - Main dashboard HTML
- `dashboard/assets/themes.css` - Theme CSS

### Assets
- `assets/themes.css` - Full theme library (46 themes)
- `assets/dashboard-modules/*.js` - Dashboard modules
- `assets/images/*` - Image assets
- `assets/styles/*` - Style files

### Other
- `brands.html` - (Legacy)
- `about.html` - (Legacy)
- `admin/*` - Admin pages
- `chess/*` - Chess 3D assets
- `backups/*` - Backup files

---

## ? Current Status

**Version:** `2f3277a3-f8f3-406d-9446-317ae88c0977`

**Dashboard HTML:**
- ? Stored in R2 at `dashboard/index.html`
- ? Embedded in worker as fallback
- ? Worker serves R2 first, then embedded

**Themes CSS:**
- ? Stored in R2 at `dashboard/assets/themes.css`
- ? Full library at `assets/themes.css` (46 themes)
- ? Embedded minimal version as fallback

**All URLs Working:**
- ? All dashboard pages return `200`
- ? All API endpoints functional
- ? R2 storage properly configured

---

**Everything is live, stored in R2, and accessible!**
