# R2 Storage Architecture & Live URLs

## ?? All Live Dashboard URLs

**Base:** `https://inneranimalmedia-dev.meauxbility.workers.dev`

### Dashboard Pages (SPA - All serve same HTML)
- **/** ? `302` redirect to `/dashboard`
- **/dashboard** ? Overview (stats, activity, system health)
- **/dashboard/projects** ? Client projects grid
- **/dashboard/library** ? App library
- **/dashboard/tasks** ? Task management
- **/dashboard/meauxwork** ? Project boards (Kanban)
- **/dashboard/meauxmedia** ? Media gallery
- **/dashboard/brands** ? Brand Command Center (8 brands with image previews)
- **/dashboard/r2** ? R2 Storage browser
- **/dashboard/database** ? Database explorer (220+ tables)
- **/dashboard/settings** ? Settings page

### API Endpoints
- **/api/brands** ? `GET/POST` - List/create brands
- **/api/brands/:id** ? `PUT/DELETE` - Update/delete brand
- **/api/clients** ? `GET` - List clients from D1
- **/api/r2/list** ? `GET` - List R2 objects (with prefix/cursor)
- **/api/r2/upload** ? `POST` - Upload file to R2
- **/api/r2/delete** ? `POST` - Delete object from R2
- **/api/cf/zones** ? `GET` - List Cloudflare zones (requires API token)
- **/api/cf/zone/:id** ? `GET` - Get zone details
- **/api/db/tables** ? `GET` - List all database tables
- **/api/db/table/:name** ? `GET` - Get table schema
- **/api/db/query** ? `POST` - Run SELECT queries (read-only)

### Assets
- **/assets/themes.css** ? Theme CSS (served from R2 or embedded fallback)
- **/assets/dashboard-modules/*.js** ? Dashboard modules (from R2 if present)
- **/assets/*** ? Other assets (served from R2)

---

## ?? R2 Storage Architecture

### **R2 Bucket:** `inneranimalmedia-assets`
**Binding:** `ASSETS` in worker  
**Account:** `ede6590ac0d2fb7daf155b35653457b2`

### Current R2 Structure

```
inneranimalmedia-assets/
??? dashboard/
?   ??? index.html              ? STORED (Main dashboard HTML)
?   ??? assets/
?       ??? themes.css          ? STORED (Theme CSS)
??? assets/
?   ??? themes.css              ? EXISTS (Full 46-theme library)
?   ??? dashboard-modules/
?   ?   ??? global-state.js     ? EXISTS
?   ?   ??? meauxmedia.js       ? EXISTS
?   ??? images/                 ? EXISTS
?   ??? styles/                 ? EXISTS
??? brands/                      (Brand assets - can be organized here)
??? media/                       (Media library)
??? [other files...]
```

### How It Works

1. **Dashboard HTML:**
   - **Primary:** Served from R2 at `dashboard/index.html`
   - **Fallback:** Embedded in worker (`src/dashboard-html.ts`)
   - **Benefit:** Update UI via R2 upload without redeploy

2. **Themes CSS:**
   - **Primary:** Served from R2 at `dashboard/assets/themes.css`
   - **Fallback:** Embedded in worker (`src/themes-css.ts`)
   - **Note:** Full 46-theme library exists at `assets/themes.css` in R2

3. **Other Assets:**
   - Served from R2 if present
   - Worker checks R2 first, returns 404 if not found

---

## ?? Storage Strategy

### **Hybrid Approach (Current)**

**Dashboard HTML:**
```
Request ? Check R2 (dashboard/index.html) ? If found: Serve from R2
         ? If not found: Serve embedded (DASHBOARD_HTML)
```

**Themes CSS:**
```
Request ? Check R2 (dashboard/assets/themes.css) ? If found: Serve from R2
         ? If not found: Serve embedded (THEMES_CSS)
```

**Benefits:**
- ? Quick UI updates via R2 (no redeploy needed)
- ? Reliable fallback (always works)
- ? Version control via R2 keys
- ? Fast loading (R2 is fast, embedded is instant)

---

## ?? How to Update Dashboard in R2

### Method 1: Direct Upload (Recommended)
```bash
# Extract HTML from worker
node -e "const fs=require('fs'); const html=fs.readFileSync('src/dashboard-html.ts','utf8'); const match=html.match(/export const DASHBOARD_HTML = \`([\s\S]*?)\`;/); if(match) fs.writeFileSync('public/dashboard-index.html', match[1]);"

# Upload to R2
wrangler r2 object put inneranimalmedia-assets/dashboard/index.html \
  --file=./public/dashboard-index.html \
  --env dev
```

### Method 2: Via Dashboard UI
1. Navigate to `/dashboard/r2`
2. Use "Upload" button
3. Upload to `dashboard/index.html`

### Method 3: Via API
```bash
curl -X PUT "https://inneranimalmedia-dev.meauxbility.workers.dev/api/r2/upload" \
  -F "file=@dashboard-index.html" \
  -F "key=dashboard/index.html"
```

---

## ?? Check R2 Contents

### Via Dashboard
- Navigate to `/dashboard/r2`
- Browse all objects
- Search by key or prefix

### Via API
```bash
# List all objects
curl "https://inneranimalmedia-dev.meauxbility.workers.dev/api/r2/list?limit=100"

# List with prefix
curl "https://inneranimalmedia-dev.meauxbility.workers.dev/api/r2/list?prefix=dashboard/&limit=50"
```

### Via Wrangler (Local)
```bash
# Note: Wrangler R2 commands work with local bucket by default
# Use --remote flag for production bucket
wrangler r2 object get inneranimalmedia-assets/dashboard/index.html --env dev
```

---

## ? Current Status

**Dashboard HTML:**
- ? Stored in R2 at `dashboard/index.html`
- ? Embedded fallback in worker
- ? Worker serves from R2 first

**Themes CSS:**
- ? Stored in R2 at `dashboard/assets/themes.css`
- ? Full library at `assets/themes.css` (46 themes)
- ? Embedded fallback in worker

**Other Assets:**
- ? `assets/dashboard-modules/*.js` - Dashboard modules
- ? `assets/images/*` - Image assets
- ? `assets/styles/*` - Style files

---

## ?? Recommended Next Steps

1. **Organize Brand Assets:**
   - Upload brand logos to `brands/logos/`
   - Link in brand records

2. **Upload Full Themes Library:**
   - Copy `assets/themes.css` (46 themes) to `dashboard/assets/themes.css`
   - Or update dashboard to use full library

3. **Version Control:**
   - Use R2 keys like `dashboard/v1/index.html`, `dashboard/v2/index.html`
   - Worker can serve specific version

4. **CDN Integration:**
   - R2 objects can be served via Cloudflare CDN
   - Enable public access for faster global delivery

---

**Everything is properly stored and accessible!**
