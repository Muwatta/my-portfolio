# PWA (Progressive Web App) Setup

Your portfolio is now a fully functional Progressive Web App that works on Android, iOS, and desktop browsers!

## What's New

### 1. **Service Worker** (`public/sw.js`)

- Intelligent caching strategy with multiple cache layers
- Works online and offline
- Automatic cache updates
- Network-first for HTML pages, cache-first for assets

### 2. **Web App Manifest** (`public/manifest.json`)

- Defines app metadata and appearance
- Enables "Add to Home Screen" on Android
- Includes app shortcuts to blog, portfolio, and contact
- Supports maskable icons for adaptive display

### 3. **Installation Prompt**

- Auto-shows on Android Chrome (and supported browsers)
- One-click install to home screen
- User can dismiss or install at any time

### 4. **Service Worker Update Detection**

- Monitors for app updates automatically every 60 seconds
- Shows toast notification when new version is available
- User can install update immediately

## Installation (Android)

### Option 1: Install Prompt (Automatic)

1. Open https://muwatta.com.ng on Android Chrome
2. Wait for install banner to appear
3. Tap "Install" button
4. App installs to your home screen

### Option 2: Manual Installation

1. Open https://muwatta.com.ng on Android Chrome
2. Tap the ⋮ (menu) button
3. Select "Install app" or "Add to Home Screen"
4. Confirm installation

### Option 3: iOS (Home Screen Shortcut)

1. Open https://muwatta.com.ng in Safari
2. Tap the Share button
3. Select "Add to Home Screen"
4. Name it "Muwatta" and tap "Add"

## Features

### Offline Support

- Home page and blog posts are cached
- Static assets load from cache when offline
- Graceful fallback messages for unavailable content
- Blog data persists in cache for offline reading

### Caching Strategy

- **HTML Pages**: Network-first (always try live, fallback to cached)
- **Assets**: Cache-first (use cache, fetch updates in background)
- **API Calls**: Network-first with cache fallback
- **Images**: Offline placeholder when image unavailable

### Auto-Update

- Service worker checks for updates every 60 seconds
- When new version detected, shows update notification
- Users can choose to update immediately or dismiss

### Performance

- Faster load times (cached assets)
- Reduced bandwidth usage
- Works without internet connection
- App-like experience with standalone mode

## Files Added/Modified

### New Files:

- `public/sw.js` - Service Worker (6KB)
- `public/manifest.json` - Web App Manifest (2.8KB)
- `public/browserconfig.xml` - Windows tile config
- `src/components/PWAInstallPrompt.jsx` - Install UI component

### Modified Files:

- `src/main.jsx` - Service Worker registration
- `index.html` - PWA meta tags and manifest link
- `src/App.jsx` - PWA Install Prompt component
- `src/index.css` - Animation styles

## Testing the PWA

### Desktop (Chrome/Edge):

1. Open DevTools (F12)
2. Go to Application → Manifest
3. Check "Start URL" and "Display" settings
4. Offline simulation: Network tab → "Offline"

### Android:

1. Install the app from install prompt
2. Test offline: Enable Airplane mode
3. Navigate pages - cached content should load
4. Update detection: App checks for updates automatically

## Browser Support

| Browser | Desktop | Android | iOS |
| ------- | ------- | ------- | --- |
| Chrome  | ✓       | ✓       | ✗   |
| Edge    | ✓       | ✓       | ✗   |
| Firefox | ✓       | ✓       | ✗   |
| Safari  | ✗       | N/A     | ~   |

Note: iOS supports "Add to Home Screen" but not full PWA features.

## Deployment Considerations

For production deployment:

1. **HTTPS Required**: PWAs must be served over HTTPS (already on muwatta.com.ng)

2. **Icon Files Needed**: For full PWA experience, add these icons to `public/images/`:
   - `favicon-32x32.png` (32×32)
   - `android-chrome-192x192.png` (192×192)
   - `android-chrome-512x512.png` (512×512)
   - `screenshot-540x720.png` (narrow mobile screenshot)
   - `screenshot-1280x720.png` (wide desktop screenshot)

3. **Cache Management**: Service worker caches are versioned. Update `CACHE_VERSIONS` in `public/sw.js` to bust cache when deploying breaking changes.

4. **Manifest Updates**: Edit `public/manifest.json` to customize:
   - App name and short name
   - Theme colors
   - App shortcuts
   - Display mode

## Clear Cache Manually

Users can clear the PWA cache by:

- Browser DevTools → Application → Cache Storage → Delete caches
- Or the app clears old caches automatically on service worker update

## Debugging

### In Browser Console:

```javascript
// Check if SW is registered
navigator.serviceWorker.getRegistrations().then((regs) => console.log(regs));

// Unregister all SWs
navigator.serviceWorker
  .getRegistrations()
  .then((regs) => regs.forEach((reg) => reg.unregister()));

// Check cache storage
caches.keys().then((names) => console.log(names));

// Clear all caches
caches.keys().then((names) => names.forEach((name) => caches.delete(name)));
```

### Service Worker Logs:

All SW actions are logged with `[SW]` prefix in the browser console.

## Next Steps

1. Add icon files to `public/images/` for complete PWA branding
2. Test on Android device with Chrome
3. Monitor performance with Lighthouse (DevTools → Lighthouse)
4. Consider updating cache strategy based on your traffic patterns

## Resources

- [MDN: Progressive Web Apps](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [Web.dev: PWA Checklist](https://web.dev/pwa-checklist/)
- [Lighthouse Audit](https://developers.google.com/web/tools/lighthouse)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
