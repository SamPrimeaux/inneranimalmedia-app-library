# Live URLs & R2 Storage Architecture

## ?? All Live Dashboard URLs

**Base URL:** `https://inneranimalmedia-dev.meauxbility.workers.dev`

### Main Dashboard Pages
- **/** ? Redirects to `/dashboard`
- **/dashboard** ? Overview (stats, activity, system health)
- **/dashboard/projects** ? Client projects grid
- **/dashboard/library** ? App library
- **/dashboard/tasks** ? Task management
- **/dashboard/meauxwork** ? Project boards (Kanban)
- **/dashboard/meauxmedia** ? Media gallery
- **/dashboard/brands** ? Brand Command Center (8 brands)
- **/dashboard/r2** ? R2 Storage browser
- **/dashboard/database** ? Database explorer
- **/dashboard/settings** ? Settings page

### API Endpoints
- **/api/brands** ? GET/POST brands (CRUD)
- **/api/brands/:id** ? PUT/DELETE brand
- **/api/clients** ? GET clients from D1
- **/api/r2/list** ? List R2 objects
- **/api/r2/upload** ? Upload to R2
- **/api/r2/delete** ? Delete from R2
- **/api/cf/zones** ? List Cloudflare zones
- **/api/cf/zone/:id** ? Get zone details
- **/api/db/tables** ? List database tables
- **/api/db/table/:name** ? Get table schema
- **/api/db/query** ? Run SELECT queries

### Assets
- **/assets/themes.css** ? Theme CSS (embedded, not R2)

---

## ?? Current Storage Architecture

### **Dashboard HTML: EMBEDDED IN WORKER** (Not in R2)
- **Location:** `src/dashboard-html.ts` (embedded as string)
- **Size:** ~150KB (gzipped: ~30KB)
- **Why:** Fast loading, no R2 fetch needed
- **Trade-off:** Requires worker redeploy to update UI

### **Assets: MIXED**
- **themes.css:** Embedded in worker (`src/themes-css.ts`)
- **Other assets:** Served from R2 if present (`/assets/*`, `/dashboard-modules/*`)

### **R2 Bucket:** `inneranimalmedia-assets`
- **Binding:** `ASSETS` in worker
- **Current usage:** Mixed (some assets, but dashboard HTML not stored there)

---

## ?? How to Properly Store Dashboard in R2

### Option 1: Keep Embedded (Current - Fastest)
**Pros:**
- ? No R2 fetch latency
- ? Single deploy
- ? Always in sync

**Cons:**
- ? Requires redeploy to update UI
- ? Worker bundle size

### Option 2: Store in R2 (Better for Large Updates)
**Pros:**
- ? Update UI without redeploy
- ? Smaller worker bundle
- ? Version control via R2 keys

**Cons:**
- ? R2 fetch latency (~50-100ms)
- ? Need to manage R2 uploads

### Recommended: Hybrid Approach
1. **Store dashboard HTML in R2** at `dashboard/index.html`
2. **Worker serves from R2** with fallback to embedded
3. **Update via R2 upload** for quick UI changes
4. **Keep embedded as fallback** for reliability

---

## ?? How to Upload Dashboard to R2

### Step 1: Extract Dashboard HTML
```bash
# The HTML is in src/dashboard-html.ts
# Extract the DASHBOARD_HTML constant value
```

### Step 2: Upload to R2
```bash
# Using wrangler
wrangler r2 object put inneranimalmedia-assets/dashboard/index.html \
  --file=./public/dashboard-index.html \
  --env dev

# Or via API
curl -X PUT "https://api.cloudflare.com/client/v4/accounts/{account_id}/r2/buckets/inneranimalmedia-assets/objects/dashboard/index.html" \
  -H "Authorization: Bearer {token}" \
  --data-binary @dashboard-index.html
```

### Step 3: Update Worker to Serve from R2 First
```typescript
// In src/index.ts
if (pathname === '/dashboard' || pathname.startsWith('/dashboard/')) {
  // Try R2 first
  const dashboardFile = await env.ASSETS.get('dashboard/index.html');
  if (dashboardFile) {
    return new Response(await dashboardFile.text(), {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }
  // Fallback to embedded
  return new Response(DASHBOARD_HTML, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
```

---

## ?? Recommended R2 Structure

```
inneranimalmedia-assets/
??? dashboard/
?   ??? index.html          # Main dashboard HTML
?   ??? assets/
?       ??? themes.css      # Theme library (46 themes)
?       ??? dashboard-modules/
?           ??? notifications.js
?           ??? help-modal.js
?           ??? agent-sam.js
?           ??? projects-data.js
??? brands/
?   ??? logos/              # Brand logo assets
??? media/                  # Media library
??? shared/                 # Shared assets
```

---

## ?? Current R2 Contents

Check via API:
```bash
curl "https://inneranimalmedia-dev.meauxbility.workers.dev/api/r2/list?limit=100"
```

Or via dashboard:
- Navigate to `/dashboard/r2`
- Browse all objects in `inneranimalmedia-assets`

---

## ? Next Steps

1. **Extract dashboard HTML** to `public/dashboard-index.html`
2. **Upload to R2** at `dashboard/index.html`
3. **Update worker** to serve from R2 with embedded fallback
4. **Upload themes.css** to R2 at `dashboard/assets/themes.css`
5. **Upload dashboard modules** to R2 if needed

This gives you:
- ? Quick UI updates via R2 (no redeploy)
- ? Fallback to embedded (reliability)
- ? Proper asset organization
- ? Version control via R2 keys
