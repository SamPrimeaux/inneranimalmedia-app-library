# Quick Start Guide

## ?? Your App Library is LIVE!

**Preview URL**: https://inneranimalmedia-production.meauxbility.workers.dev

---

## ? Quick Links

- **Homepage**: https://inneranimalmedia-production.meauxbility.workers.dev/
- **Library**: https://inneranimalmedia-production.meauxbility.workers.dev/library
- **Dashboard**: https://inneranimalmedia-production.meauxbility.workers.dev/dashboard
- **API Stats**: https://inneranimalmedia-production.meauxbility.workers.dev/api/stats
- **GitHub Repo**: https://github.com/SamPrimeaux/inneranimalmedia-app-library

---

## ?? What You Get

### ?? App Library Features
- **8 Sample Apps** - MeauxAccess, MeauxPhoto, iAutodidact, and more
- **6 Categories** - Productivity, Media, Dev Tools, AI/ML, Business, Design
- **Search & Filter** - Real-time search, category filtering, sorting
- **App Detail Pages** - Full descriptions, reviews, ratings, screenshots
- **Responsive Design** - Works beautifully on mobile, tablet, desktop
- **Dark/Light Theme** - Toggle with persistent preference

### ?? Beautiful UI
- **iOS-Quality Design** - Inspired by App Store
- **Smooth Animations** - Floating cards, hover effects
- **Glassmorphic Cards** - Modern translucent backgrounds
- **Gradient Accents** - Teal/cyan color scheme

### ?? Performance
- **Edge Deployed** - Cloudflare Workers global network
- **D1 Database** - Serverless SQL with instant queries
- **R2 Storage** - Object storage for assets
- **KV Caching** - Lightning-fast page loads

---

## ?? Next Step: Connect Your Domain

To make this live on **inneranimalmedia.com**:

1. Go to: https://dash.cloudflare.com
2. Select: **inneranimalmedia.com** zone
3. Navigate: **Workers & Pages** ? **inneranimalmedia-production** ? **Settings** ? **Triggers** ? **Routes**
4. Click: **Add Route**
5. Enter:
   - Route: `inneranimalmedia.com/*`
   - Worker: `inneranimalmedia-production`
6. Click: **Save**

Done! Visit https://inneranimalmedia.com to see your new app library! ??

---

## ?? Try These URLs Right Now

### Homepage
https://inneranimalmedia-production.meauxbility.workers.dev/

Features:
- Hero section with animated floating cards
- Stats banner (8 apps, 20K+ downloads)
- Featured apps grid
- Features showcase

### Library (All Apps)
https://inneranimalmedia-production.meauxbility.workers.dev/library

Try:
- Search for "photo" or "AI"
- Filter by category (click chips)
- Sort by rating, popularity, or name

### Individual App Pages
- https://inneranimalmedia-production.meauxbility.workers.dev/library/meauxaccess
- https://inneranimalmedia-production.meauxbility.workers.dev/library/iautodidact
- https://inneranimalmedia-production.meauxbility.workers.dev/library/damnsam

### API Endpoints
- https://inneranimalmedia-production.meauxbility.workers.dev/api/stats
- https://inneranimalmedia-production.meauxbility.workers.dev/api/apps
- https://inneranimalmedia-production.meauxbility.workers.dev/api/apps/meauxaccess

---

## ?? Common Tasks

### Add a New App

```bash
cd /Users/samprimeaux/Downloads/inneranimalmedia-app-library

# Create SQL file
cat > new-app.sql <<'EOF'
INSERT INTO apps (id, name, slug, tagline, description, category, developer, version, release_date, icon_url, install_url, is_featured)
VALUES ('my-app', 'My App', 'my-app', 'Cool app', 'Description', 'productivity', 'Me', '1.0.0', '2024-12-09', '/icons/my-app.png', 'https://myapp.com', 1);
EOF

# Apply to database
wrangler d1 execute inneranimalmedia_app_library --file=new-app.sql --remote --env=production
```

### Redeploy Worker

```bash
cd /Users/samprimeaux/Downloads/inneranimalmedia-app-library
wrangler deploy --env=production
```

### View Logs

```bash
wrangler tail inneranimalmedia-production --env=production
```

### Query Database

```bash
# See all apps
wrangler d1 execute inneranimalmedia_app_library --command="SELECT name, rating, downloads FROM apps" --remote

# Check database stats
wrangler d1 execute inneranimalmedia_app_library --command="SELECT COUNT(*) FROM apps" --remote
```

---

## ?? Customize the Design

Edit files in `src/` and redeploy:

- **Colors**: `src/components/layout.ts` (CSS variables)
- **Homepage**: `src/templates/homepage.ts`
- **Library**: `src/templates/library.ts`
- **App cards**: `src/components/app-card.ts`

```bash
# After changes
wrangler deploy --env=production
```

---

## ?? Something Not Working?

### Check Worker Status
```bash
wrangler deployments list --name=inneranimalmedia-production
```

### Test Database
```bash
wrangler d1 execute inneranimalmedia_app_library --command="SELECT 1" --remote
```

### Redeploy
```bash
cd /Users/samprimeaux/Downloads/inneranimalmedia-app-library
wrangler deploy --env=production
```

---

## ?? Full Documentation

See `DEPLOYMENT_GUIDE.md` for:
- Complete deployment instructions
- MCP integration guide
- Advanced customization
- Troubleshooting
- API documentation

---

**Ready to customize? Start editing the files in `src/` and deploy!**

**Questions?** Open an issue on GitHub or email sam@inneranimalmedia.com
