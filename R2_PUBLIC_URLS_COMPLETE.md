# R2 Public URLs - Complete Receipt List

## ?? Issue Fixed: Dashboard Modules 404

**Problem:** Dashboard was requesting `/assets/dashboard-modules/*.js` but files were at `dashboard-modules/*.js` in R2.

**Solution:** Updated worker to handle path mapping:
- Request: `/assets/dashboard-modules/notifications.js`
- Worker tries: `dashboard-modules/notifications.js` (correct path in R2)
- Falls back to: `assets/dashboard-modules/notifications.js` if exists

**Status:** ? Fixed in version `b2abfb46-611f-4d79-b139-121ab1f2265b`

---

## ?? R2 Bucket: `inneranimalmedia-assets`

**Public Access:** Enabled  
**Bucket Size:** 45.26 MB  
**Public URL Base:** `https://pub-inneranimalmedia-assets.r2.dev/`

---

## ?? Public URL Format

All assets are accessible at:
```
https://pub-inneranimalmedia-assets.r2.dev/{key}
```

Where `{key}` is the object key in R2.

---

## ?? Complete Asset List by Category

### Dashboard Files
| Key | Public URL | Size | Type |
|-----|------------|------|------|
| `dashboard/index.html` | `https://pub-inneranimalmedia-assets.r2.dev/dashboard/index.html` | - | HTML |
| `dashboard/dashboard-layout.html` | `https://pub-inneranimalmedia-assets.r2.dev/dashboard/dashboard-layout.html` | 46.87 kB | HTML |
| `dashboard/meaux-themes-complete.css` | `https://pub-inneranimalmedia-assets.r2.dev/dashboard/meaux-themes-complete.css` | - | CSS |
| `dashboard/projects.html` | `https://pub-inneranimalmedia-assets.r2.dev/dashboard/projects.html` | - | HTML |
| `dashboard/support.html` | `https://pub-inneranimalmedia-assets.r2.dev/dashboard/support.html` | - | HTML |

### Dashboard Modules (JavaScript)
| Key | Public URL | Worker URL | Status |
|-----|------------|------------|--------|
| `dashboard-modules/notifications.js` | `https://pub-inneranimalmedia-assets.r2.dev/dashboard-modules/notifications.js` | `/assets/dashboard-modules/notifications.js` ? | Fixed |
| `dashboard-modules/help-modal.js` | `https://pub-inneranimalmedia-assets.r2.dev/dashboard-modules/help-modal.js` | `/assets/dashboard-modules/help-modal.js` ? | Fixed |
| `dashboard-modules/agent-sam.js` | `https://pub-inneranimalmedia-assets.r2.dev/dashboard-modules/agent-sam.js` | `/assets/dashboard-modules/agent-sam.js` ? | Fixed |
| `dashboard-modules/projects-data.js` | `https://pub-inneranimalmedia-assets.r2.dev/dashboard-modules/projects-data.js` | `/assets/dashboard-modules/projects-data.js` ? | Fixed |
| `assets/dashboard-modules/global-state.js` | `https://pub-inneranimalmedia-assets.r2.dev/assets/dashboard-modules/global-state.js` | `/assets/dashboard-modules/global-state.js` ? | OK |
| `assets/dashboard-modules/meauxmedia.js` | `https://pub-inneranimalmedia-assets.r2.dev/assets/dashboard-modules/meauxmedia.js` | `/assets/dashboard-modules/meauxmedia.js` ? | OK |

### Assets Directory
| Key | Public URL | Worker URL |
|-----|------------|------------|
| `assets/themes.css` | `https://pub-inneranimalmedia-assets.r2.dev/assets/themes.css` | `/assets/themes.css` ? |
| `assets/chess-cover.svg` | `https://pub-inneranimalmedia-assets.r2.dev/assets/chess-cover.svg` | `/assets/chess-cover.svg` ? |
| `assets/navigation-injector.js` | `https://pub-inneranimalmedia-assets.r2.dev/assets/navigation-injector.js` | `/assets/navigation-injector.js` ? |
| `assets/shared-navigation.html` | `https://pub-inneranimalmedia-assets.r2.dev/assets/shared-navigation.html` | `/assets/shared-navigation.html` ? |
| `assets/styles/connect-tailwind.css` | `https://pub-inneranimalmedia-assets.r2.dev/assets/styles/connect-tailwind.css` | `/assets/styles/connect-tailwind.css` ? |
| `assets/images/2025/12/meauxaccess-1765411654550.png` | `https://pub-inneranimalmedia-assets.r2.dev/assets/images/2025/12/meauxaccess-1765411654550.png` | `/assets/images/2025/12/meauxaccess-1765411654550.png` ? |

### HTML Pages (Root)
| Key | Public URL | Notes |
|-----|------------|-------|
| `index.html` | `https://pub-inneranimalmedia-assets.r2.dev/index.html` | 11.56 kB |
| `about.html` | `https://pub-inneranimalmedia-assets.r2.dev/about.html` | 6.67 kB |
| `contact.html` | `https://pub-inneranimalmedia-assets.r2.dev/contact.html` | 21.1 kB |
| `login.html` | `https://pub-inneranimalmedia-assets.r2.dev/login.html` | 26.76 kB |
| `signup.html` | `https://pub-inneranimalmedia-assets.r2.dev/signup.html` | 27.72 kB |
| `pricing.html` | `https://pub-inneranimalmedia-assets.r2.dev/pricing.html` | 25.52 kB |
| `services.html` | `https://pub-inneranimalmedia-assets.r2.dev/services.html` | 12.62 kB |
| `work.html` | `https://pub-inneranimalmedia-assets.r2.dev/work.html` | 11.57 kB |
| `library.html` | `https://pub-inneranimalmedia-assets.r2.dev/library.html` | 19.44 kB |
| `calendar.html` | `https://pub-inneranimalmedia-assets.r2.dev/calendar.html` | 17.37 kB |
| `community.html` | `https://pub-inneranimalmedia-assets.r2.dev/community.html` | 75.11 kB |
| `connect.html` | `https://pub-inneranimalmedia-assets.r2.dev/connect.html` | 117 B |
| `command-center.html` | `https://pub-inneranimalmedia-assets.r2.dev/command-center.html` | 21.99 kB |
| `brands.html` | `https://pub-inneranimalmedia-assets.r2.dev/brands.html` | 46.94 kB |
| `tasks.html` | `https://pub-inneranimalmedia-assets.r2.dev/tasks.html` | 31.98 kB |
| `meauxwork.html` | `https://pub-inneranimalmedia-assets.r2.dev/meauxwork.html` | 49.96 kB |
| `meauxmedia.html` | `https://pub-inneranimalmedia-assets.r2.dev/meauxmedia.html` | 35.33 kB |
| `meauxcad.html` | `https://pub-inneranimalmedia-assets.r2.dev/meauxcad.html` | 17.37 kB |
| `meauxdoc.html` | `https://pub-inneranimalmedia-assets.r2.dev/meauxdoc.html` | 17.37 kB |
| `settings.html` | `https://pub-inneranimalmedia-assets.r2.dev/settings.html` | 76.03 kB |
| `automeaux.html` | `https://pub-inneranimalmedia-assets.r2.dev/automeaux.html` | 105.88 kB |
| `dashboard-brands.html` | `https://pub-inneranimalmedia-assets.r2.dev/dashboard-brands.html` | 31.13 kB |
| `dashboard-library.html` | `https://pub-inneranimalmedia-assets.r2.dev/dashboard-library.html` | 39.29 kB |
| `dashboard-meauxmedia.html` | `https://pub-inneranimalmedia-assets.r2.dev/dashboard-meauxmedia.html` | 35.33 kB |
| `dashboard-layout.html` | `https://pub-inneranimalmedia-assets.r2.dev/dashboard-layout.html` | 46.87 kB |
| `dashboard-preview.html` | `https://pub-inneranimalmedia-assets.r2.dev/dashboard-preview.html` | 33.8 kB |
| `projects-preview.html` | `https://pub-inneranimalmedia-assets.r2.dev/projects-preview.html` | 25.38 kB |

### 3D Models (GLB)
| Key | Public URL | Size |
|-----|------------|------|
| `Kinetic_Symmetry_0831084700_generate (1).glb` | `https://pub-inneranimalmedia-assets.r2.dev/Kinetic_Symmetry_0831084700_generate%20(1).glb` | 118.29 kB |
| `Meshy_AI_Jet_in_Flight_0104205113_texture.glb` | `https://pub-inneranimalmedia-assets.r2.dev/Meshy_AI_Jet_in_Flight_0104205113_texture.glb` | 17.68 MB |
| `inneranimalmediafooterglb.glb` | `https://pub-inneranimalmedia-assets.r2.dev/inneranimalmediafooterglb.glb` | 118.29 kB |

### Images
| Key | Public URL | Size |
|-----|------------|------|
| `inneranimalmedia-logo.png` | `https://pub-inneranimalmedia-assets.r2.dev/inneranimalmedia-logo.png` | 236.04 kB |

### CSS Files
| Key | Public URL | Size |
|-----|------------|------|
| `themes.css` | `https://pub-inneranimalmedia-assets.r2.dev/themes.css` | 26.79 kB |
| `tailwind.css` | `https://pub-inneranimalmedia-assets.r2.dev/tailwind.css` | 2.89 kB |

### Enterprise CMS
| Key | Public URL |
|-----|------------|
| `enterprise-cms/index.html` | `https://pub-inneranimalmedia-assets.r2.dev/enterprise-cms/index.html` |
| `enterprise-cms/agentsam.html` | `https://pub-inneranimalmedia-assets.r2.dev/enterprise-cms/agentsam.html` |
| `enterprise-cms/content-library.html` | `https://pub-inneranimalmedia-assets.r2.dev/enterprise-cms/content-library.html` |
| `enterprise-cms/meaux-dashboard-theme.css` | `https://pub-inneranimalmedia-assets.r2.dev/enterprise-cms/meaux-dashboard-theme.css` |
| `enterprise-cms/meaux-orange-glass-complete.css` | `https://pub-inneranimalmedia-assets.r2.dev/enterprise-cms/meaux-orange-glass-complete.css` |
| `enterprise-cms/meaux-os-dark-complete.css` | `https://pub-inneranimalmedia-assets.r2.dev/enterprise-cms/meaux-os-dark-complete.css` |
| `enterprise-cms/meaux-themes-complete.css` | `https://pub-inneranimalmedia-assets.r2.dev/enterprise-cms/meaux-themes-complete.css` |
| `enterprise-cms/meaux-themes.css` | `https://pub-inneranimalmedia-assets.r2.dev/enterprise-cms/meaux-themes.css` |
| `enterprise-cms/meauxos-themes.css` | `https://pub-inneranimalmedia-assets.r2.dev/enterprise-cms/meauxos-themes.css` |

### Chess Assets
| Key | Public URL |
|-----|------------|
| `chess/v1/board/board_main.glb` | `https://pub-inneranimalmedia-assets.r2.dev/chess/v1/board/board_main.glb` |
| `chess/v1/manifest.json` | `https://pub-inneranimalmedia-assets.r2.dev/chess/v1/manifest.json` |
| `chess/v1/pieces/black/bishop.glb` | `https://pub-inneranimalmedia-assets.r2.dev/chess/v1/pieces/black/bishop.glb` |
| `chess/v1/pieces/black/king.glb` | `https://pub-inneranimalmedia-assets.r2.dev/chess/v1/pieces/black/king.glb` |
| `chess/v1/pieces/black/knight.glb` | `https://pub-inneranimalmedia-assets.r2.dev/chess/v1/pieces/black/knight.glb` |
| `chess/v1/pieces/black/pawn.glb` | `https://pub-inneranimalmedia-assets.r2.dev/chess/v1/pieces/black/pawn.glb` |
| `chess/v1/pieces/black/queen.glb` | `https://pub-inneranimalmedia-assets.r2.dev/chess/v1/pieces/black/queen.glb` |
| `chess/v1/pieces/black/rook.glb` | `https://pub-inneranimalmedia-assets.r2.dev/chess/v1/pieces/black/rook.glb` |
| `chess/v1/pieces/white/bishop.glb` | `https://pub-inneranimalmedia-assets.r2.dev/chess/v1/pieces/white/bishop.glb` |
| `chess/v1/pieces/white/king.glb` | `https://pub-inneranimalmedia-assets.r2.dev/chess/v1/pieces/white/king.glb` |
| `chess/v1/pieces/white/knight.glb` | `https://pub-inneranimalmedia-assets.r2.dev/chess/v1/pieces/white/knight.glb` |
| `chess/v1/pieces/white/pawn.glb` | `https://pub-inneranimalmedia-assets.r2.dev/chess/v1/pieces/white/pawn.glb` |
| `chess/v1/pieces/white/queen.glb` | `https://pub-inneranimalmedia-assets.r2.dev/chess/v1/pieces/white/queen.glb` |
| `chess/v1/pieces/white/rook.glb` | `https://pub-inneranimalmedia-assets.r2.dev/chess/v1/pieces/white/rook.glb` |

---

## ?? Worker Asset Serving

The worker serves assets from R2 with path mapping:

### Path Mapping Rules:
1. **Dashboard HTML:** `/dashboard` ? `dashboard/index.html` in R2
2. **Themes CSS:** `/assets/themes.css` ? `dashboard/assets/themes.css` or `assets/themes.css` in R2
3. **Dashboard Modules:** `/assets/dashboard-modules/*.js` ? `dashboard-modules/*.js` in R2 (fixed!)
4. **General Assets:** `/assets/*` ? `assets/*` in R2
5. **Dashboard Modules (direct):** `/dashboard-modules/*` ? `dashboard-modules/*` in R2

---

## ? SPA Routing Fix

**Issue:** Dashboard modules were 404ing because:
- HTML requested: `/assets/dashboard-modules/notifications.js`
- R2 had: `dashboard-modules/notifications.js` (no `assets/` prefix)

**Fix:** Worker now handles both paths:
```typescript
// If request is /assets/dashboard-modules/*.js
// Try: dashboard-modules/*.js first (correct path)
// Fallback: assets/dashboard-modules/*.js
```

**Status:** ? All 4 modules now load correctly:
- ? `notifications.js`
- ? `help-modal.js`
- ? `agent-sam.js`
- ? `projects-data.js`

---

## ?? Total Objects

**Total Objects in R2:** 1000+ (limited by API query)

**Categories:**
- Dashboard files: ~10
- Dashboard modules: 6
- HTML pages: ~30
- 3D models: 3
- Images: 100+
- CSS files: 10+
- Enterprise CMS: 50+
- Chess assets: 15
- Other assets: 800+

---

## ?? Quick Access URLs

### Dashboard (via Worker)
- `https://inneranimalmedia.com/dashboard`
- `https://inneranimalmediamain.meauxbility.workers.dev/dashboard`

### Direct R2 Public URLs
- Dashboard HTML: `https://pub-inneranimalmedia-assets.r2.dev/dashboard/index.html`
- Themes CSS: `https://pub-inneranimalmedia-assets.r2.dev/assets/themes.css`
- Dashboard Modules: `https://pub-inneranimalmedia-assets.r2.dev/dashboard-modules/notifications.js`

---

**All SPA issues resolved!** ?
