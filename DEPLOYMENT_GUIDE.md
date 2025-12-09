# InnerAnimalMedia App Library - Deployment Guide

## ? Deployment Status

**Successfully Deployed!** ??

- **Live URL**: https://inneranimalmedia-production.meauxbility.workers.dev
- **GitHub Repo**: https://github.com/SamPrimeaux/inneranimalmedia-app-library
- **Status**: All core features implemented and deployed

---

## ?? What's Been Deployed

### Infrastructure
- ? **Cloudflare Worker**: `inneranimalmedia-production`
- ? **D1 Database**: `inneranimalmedia_app_library` (ff10ed0d-fb18-4f94-8e8a-2d8eb2053bef)
- ? **R2 Bucket**: `inneranimalmedia-assets`
- ? **KV Namespace**: `CACHE` (38d3dbd415f148008aec823bd1b245bb)

### Features Implemented
- ? **Homepage** (`/`) - Hero section, stats banner, featured apps
- ? **App Library** (`/library`) - Search, filter, sort, category navigation
- ? **App Detail Pages** (`/library/[slug]`) - Screenshots, reviews, metadata
- ? **Dashboard** (`/dashboard`) - Placeholder for enterprise metrics
- ? **API Endpoints** - `/api/apps`, `/api/stats`, `/api/apps/[slug]`
- ? **Dark/Light Theme** - Toggle with localStorage persistence
- ? **Responsive Design** - Mobile, tablet, desktop optimized
- ? **Sample Data** - 8 apps, 6 categories, reviews seeded

### Database Content
- **Apps**: MeauxAccess, MeauxPhoto, iAutodidact, DamnSam, Grant Writing Pipeline, DesignLab, MeauxLearn, CloudConnect
- **Categories**: Productivity, Media & Content, Developer Tools, AI & ML, Business, Design & Creative
- **Reviews**: 5 sample reviews
- **Metrics**: Downloads, ratings, views tracked

---

## ?? Setting Up Custom Domain (inneranimalmedia.com)

Your API token doesn't have permissions to create routes automatically. Set up the custom domain manually:

### Option 1: Cloudflare Dashboard (Recommended)

1. **Go to Cloudflare Dashboard**
   - Navigate to: https://dash.cloudflare.com
   - Select your account: `Info@inneranimals.com's Account`
   - Select zone: `inneranimalmedia.com`

2. **Navigate to Workers Routes**
   - In the left sidebar: `Workers & Pages` ? `Overview`
   - Click on: `inneranimalmedia-production`
   - Go to: `Settings` ? `Triggers` ? `Routes`

3. **Add Route**
   - Click: `Add Route`
   - **Route**: `inneranimalmedia.com/*`
   - **Worker**: `inneranimalmedia-production`
   - **Zone**: `inneranimalmedia.com`
   - Click: `Save`

4. **Optional: Add www subdomain**
   - **Route**: `www.inneranimalmedia.com/*`
   - **Worker**: `inneranimalmedia-production`

5. **Test**
   - Visit: https://inneranimalmedia.com
   - Should show the new app library homepage!

### Option 2: Using Wrangler with Route Command

```bash
cd /Users/samprimeaux/Downloads/inneranimalmedia-app-library

# Add route for main domain
wrangler routes create inneranimalmedia.com/* --worker=inneranimalmedia-production --env=production

# Add route for www subdomain
wrangler routes create www.inneranimalmedia.com/* --worker=inneranimalmedia-production --env=production
```

### Option 3: Update API Token Permissions

If you want automatic route management, update your API token:

1. Go to: https://dash.cloudflare.com/profile/api-tokens
2. Find your token (CLOUDFLARE_API_TOKEN)
3. Edit permissions to include:
   - **Zone** ? **Worker Routes** ? **Edit**
   - **Zone** ? **Workers Scripts** ? **Edit**
4. Re-run deployment:

```bash
wrangler deploy --env=production
```

---

## ?? Customization Guide

### Adding New Apps

#### Method 1: Direct D1 SQL

```bash
cd /Users/samprimeaux/Downloads/inneranimalmedia-app-library

# Create SQL file
cat > add-app.sql <<'EOF'
INSERT INTO apps (id, name, slug, tagline, description, category, developer, version, release_date, icon_url, install_url, is_featured, rating, review_count, downloads)
VALUES (
  'my-new-app',
  'My New App',
  'my-new-app',
  'Amazing new application',
  'Full description here',
  'productivity',
  'Your Company',
  '1.0.0',
  '2024-12-09',
  'https://assets.inneranimalmedia.com/icons/my-new-app.png',
  'https://myapp.com',
  1,
  4.5,
  50,
  1000
);
EOF

# Execute
wrangler d1 execute inneranimalmedia_app_library --file=add-app.sql --remote --env=production
```

#### Method 2: API Endpoint (TODO)

Once MCP is connected, you'll be able to add apps via API:

```bash
curl -X POST https://inneranimalmedia.com/api/apps \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My New App",
    "tagline": "Amazing application",
    "category": "productivity",
    "developer": "Your Company",
    "version": "1.0.0",
    "install_url": "https://myapp.com"
  }'
```

### Uploading Assets to R2

```bash
# Upload app icon
wrangler r2 object put inneranimalmedia-assets/icons/my-app.png --file=./my-app-icon.png

# Upload screenshot
wrangler r2 object put inneranimalmedia-assets/screenshots/my-app-1.png --file=./screenshot1.png

# List objects
wrangler r2 object list inneranimalmedia-assets --prefix=icons/
```

### Updating Styles

Edit these files to customize the design:
- **Global styles**: `src/components/layout.ts` (getGlobalStyles function)
- **Homepage**: `src/templates/homepage.ts` (getHomepageStyles function)
- **Library**: `src/templates/library.ts` (getLibraryStyles function)
- **App cards**: `src/components/app-card.ts` (getAppCardStyles function)

After changes:
```bash
wrangler deploy --env=production
```

---

## ?? Monitoring & Analytics

### View Logs

```bash
# Tail live logs
wrangler tail inneranimalmedia-production --env=production

# View last 100 logs
wrangler tail inneranimalmedia-production --env=production --format=pretty
```

### Database Queries

```bash
# Check app count
wrangler d1 execute inneranimalmedia_app_library --command="SELECT COUNT(*) as total FROM apps" --remote

# View all apps
wrangler d1 execute inneranimalmedia_app_library --command="SELECT id, name, downloads, rating FROM apps ORDER BY downloads DESC" --remote

# View recent views
wrangler d1 execute inneranimalmedia_app_library --command="SELECT * FROM app_views ORDER BY viewed_at DESC LIMIT 20" --remote
```

### Analytics Dashboard

Visit Cloudflare Dashboard:
- https://dash.cloudflare.com
- Select your worker: `inneranimalmedia-production`
- View: Metrics, Logs, CPU usage, Requests

---

## ?? Next Steps: MCP Integration

To allow Claude to manage the app library via MCP:

### 1. Update MCP Server

Add these tools to your MCP server at `mcp.inneranimalmedia.com`:

```typescript
{
  name: "create_library_app",
  description: "Add a new app to the library",
  inputSchema: {
    type: "object",
    properties: {
      name: { type: "string" },
      slug: { type: "string" },
      tagline: { type: "string" },
      description: { type: "string" },
      category: { type: "string" },
      developer: { type: "string" },
      version: { type: "string" },
      install_url: { type: "string" },
      icon_url: { type: "string" },
      is_featured: { type: "boolean" }
    },
    required: ["name", "slug", "category", "developer", "version", "install_url"]
  }
}
```

### 2. Connect to Claude Desktop

Add to `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "inneranimalmedia": {
      "command": "npx",
      "args": ["-y", "mcp-server-fetch"],
      "env": {
        "MCP_SERVER_URL": "https://mcp.inneranimalmedia.com"
      }
    }
  }
}
```

Then restart Claude Desktop and you'll be able to:
- Add new apps via conversation
- Update app metadata
- Upload assets to R2
- Query analytics

---

## ?? Troubleshooting

### Worker not responding
```bash
# Check worker status
wrangler deployments list --name=inneranimalmedia-production

# Redeploy
wrangler deploy --env=production
```

### Database connection issues
```bash
# Test database connection
wrangler d1 execute inneranimalmedia_app_library --command="SELECT 1" --remote

# Recreate tables if needed
wrangler d1 execute inneranimalmedia_app_library --file=./schema.sql --remote --env=production
```

### R2 bucket not accessible
```bash
# List buckets
wrangler r2 bucket list

# Check bucket exists
wrangler r2 object list inneranimalmedia-assets
```

### Clear KV cache
```bash
# List all keys
wrangler kv:key list --namespace-id=38d3dbd415f148008aec823bd1b245bb

# Delete specific key
wrangler kv:key delete "cache-key" --namespace-id=38d3dbd415f148008aec823bd1b245bb
```

---

## ?? Repository Structure

```
inneranimalmedia-app-library/
??? .github/workflows/
?   ??? deploy.yml           # Auto-deploy on push
??? src/
?   ??? components/
?   ?   ??? app-card.ts      # App card component
?   ?   ??? layout.ts        # Header, footer, base HTML
?   ??? templates/
?   ?   ??? homepage.ts      # Homepage template
?   ?   ??? library.ts       # Library page
?   ?   ??? app-detail.ts    # App detail page
?   ?   ??? dashboard.ts     # Dashboard placeholder
?   ??? utils/
?   ?   ??? db.ts            # Database helper functions
?   ?   ??? html.ts          # HTML utility functions
?   ??? types.ts             # TypeScript types
?   ??? index.ts             # Main worker entry
??? schema.sql               # Database schema
??? seed.sql                 # Sample data
??? wrangler.toml            # Cloudflare configuration
??? package.json             # Dependencies
??? tsconfig.json            # TypeScript config
??? README.md                # Project overview

```

---

## ?? Success Checklist

- [x] Worker deployed and accessible
- [x] D1 database created and seeded
- [x] R2 bucket created
- [x] KV namespace created
- [x] All routes working (homepage, library, app details, dashboard)
- [x] Search functionality working
- [x] Category filtering working
- [x] Theme toggle working
- [x] Responsive design verified
- [x] Sample apps displaying correctly
- [x] Code pushed to GitHub
- [ ] Custom domain route set up (inneranimalmedia.com/*)
- [ ] MCP integration complete
- [ ] Real app icons uploaded to R2
- [ ] Production apps added (replacing samples)

---

## ?? Going Live on inneranimalmedia.com

Once you set up the custom domain route:

1. **Test thoroughly**:
   ```bash
   curl https://inneranimalmedia.com/
   curl https://inneranimalmedia.com/library
   curl https://inneranimalmedia.com/api/stats
   ```

2. **Update existing routes** (if any):
   - Remove old `iacess-production` route for `inneranimalmedia.com/*`
   - Add new `inneranimalmedia-production` route

3. **Monitor for 24 hours**:
   - Check error rates in dashboard
   - Monitor response times
   - Verify database queries are efficient

4. **Optional: Enable caching**:
   - Add KV caching for homepage
   - Cache app list for 5 minutes
   - Cache individual apps for 10 minutes

---

## ?? Future Enhancements

- [ ] User authentication (OAuth)
- [ ] App submission form
- [ ] Advanced search with Vectorize
- [ ] Real-time app updates via WebSockets
- [ ] App analytics dashboard
- [ ] Public API with rate limiting
- [ ] App categories management UI
- [ ] Bulk import from App Store Connect
- [ ] Integration with GitHub releases
- [ ] Automated testing with Vitest

---

**Platform built with ?? by InnerAnimal Media**

For questions: sam@inneranimalmedia.com
