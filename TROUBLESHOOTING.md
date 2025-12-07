# 🔧 Troubleshooting Guide

## Quick Fixes for Common Issues

---

## 🎥 Camera/Gesture Issues

### Camera Permission Denied
**Symptoms**: No video feed, permission error

**Solutions**:
1. Reload the page (F5)
2. Check browser camera permissions:
   - **Chrome**: Click lock icon → Camera → Allow
   - **Edge**: Settings → Site permissions → Camera
3. Ensure no other app is using the camera
4. Try incognito/private mode
5. Use `http://localhost` or HTTPS (not `file://`)

### Gestures Not Detecting
**Symptoms**: Hand visible but gestures don't work

**Solutions**:
1. **Improve lighting** - Brighten the room
2. **Check distance** - Arm's length from camera
3. **Keep hand in frame** - Don't go outside video bounds
4. **Make gestures clear**:
   - Fist: Close ALL fingers tightly
   - Palm: Spread ALL fingers wide
   - Thumbs up: Only index + thumb extended, others closed
5. **Check hand tracking** - Green lines should appear on your hand
6. **Wait for indicator** - "Ready for gestures" should show

### Video Feed Frozen
**Solutions**:
1. Reload page (F5)
2. Close other camera apps
3. Restart browser
4. Check Task Manager - kill any hung browser processes

---

## 🗺️ Map Issues

### Map Not Displaying
**Symptoms**: Gray box or no map

**Solutions**:
1. Check internet connection (Leaflet loads from CDN)
2. Clear browser cache (Ctrl+Shift+Delete)
3. Disable ad blockers temporarily
4. Check browser console (F12) for errors
5. Reload page

### Markers Not Showing Colors
**Symptoms**: All markers same color

**Solutions**:
1. Ensure latest `app-final.js` is loaded (check timestamp)
2. Hard refresh (Ctrl+F5)
3. Check browser console for JavaScript errors
4. Verify airport codes match (LAX, JFK, LHR)

### Flight Path Not Glowing
**Symptoms**: Path visible but no glow effect

**Solutions**:
1. Ensure `modern-map.css` is loaded
2. Check browser supports CSS filters (should work in all modern browsers)
3. Try a different browser (Chrome/Edge recommended)
4. Check if hardware acceleration is enabled in browser settings

---

## ✈️ Flight Data Issues

### No Flights Showing
**Symptoms**: "Select different cities" message

**Solutions**:
1. Ensure different cities selected (From ≠ To)
2. Click "Search Flights" button
3. Wait for loading animation to complete
4. Check internet connection
5. If API fails, mock data should load automatically

### API Errors
**Symptoms**: Console shows errors, mock data displays

**Solutions**:
- **This is normal!** OpenSky API has rate limits
- Mock data is a feature, not a bug
- Shows realistic flight data even without API
- For production: Add AviationStack API key to CONFIG

### Prices Not Showing CAD
**Symptoms**: Shows $ instead of CAD $

**Solutions**:
1. Ensure latest `app-final.js` loaded
2. Hard refresh (Ctrl+F5)
3. Check `renderFlights()` function has CAD prefix
4. Clear browser cache

---

## 🎨 Styling Issues

### Snowflakes Not Falling
**Symptoms**: No snow or static snowflakes

**Solutions**:
1. Check `style-complete.css` is loaded (not `style.css`)
2. Verify 25 snowflake divs in HTML
3. Hard refresh (Ctrl+F5)
4. Check browser console for CSS errors
5. Ensure animations aren't disabled in browser

### Icons Not Animating
**Symptoms**: Plane/hand icons static

**Solutions**:
1. Check classes: `.plane-icon-animated` and `.hand-icon-animated`
2. Verify `style-complete.css` loaded
3. Look for animation keyframes in CSS
4. Hard refresh (Ctrl+F5)
5. Check browser performance settings

### Buttons Not Teal
**Symptoms**: Wrong colors, old blue theme

**Solutions**:
1. Ensure `style-complete.css` loaded (not `style-final.css`)
2. Hard refresh (Ctrl+F5)
3. Check file paths in `index.html` head section
4. Clear cache completely

### No Hover Effects
**Symptoms**: Buttons don't glow on hover

**Solutions**:
1. Check if hardware acceleration enabled
2. Try different browser
3. Ensure CSS `:hover` pseudo-classes present
4. Check if pointer device (not touch screen only)

---

## 🔧 Performance Issues

### Laggy Animations
**Symptoms**: Choppy snowfall, slow gestures

**Solutions**:
1. Close other browser tabs
2. Enable hardware acceleration:
   - Chrome: Settings → Advanced → System → Use hardware acceleration
3. Reduce number of snowflakes (edit HTML, remove some divs)
4. Check CPU usage in Task Manager
5. Try in a different browser

### High CPU Usage
**Solutions**:
1. Normal for MediaPipe - it's doing ML processing
2. Close unnecessary tabs
3. Reduce webcam resolution in MediaPipe settings
4. Pause other apps
5. This is expected behavior for real-time ML

### Slow Page Load
**Solutions**:
1. Check internet speed (CDN libraries loading)
2. Hard refresh (Ctrl+F5)
3. Clear browser cache
4. Ensure good WiFi signal

---

## 📱 Browser Compatibility

### Best Browsers (in order):
1. ✅ **Chrome** (Best MediaPipe support)
2. ✅ **Edge** (Chromium-based, very good)
3. ⚠️ **Firefox** (Good, some animation differences)
4. ⚠️ **Safari** (Webkit, may need prefixes)
5. ❌ **IE** (Not supported)

### Known Browser Issues:
- **Safari**: May need `-webkit-` prefixes for backdrop-filter
- **Firefox**: Slightly different animation timing
- **Mobile**: Gesture control requires rear camera or mirror mode

---

## 🐛 JavaScript Errors

### "Cannot read property of undefined"
**Solutions**:
1. Check browser console (F12) for exact line
2. Ensure all libraries loaded (MediaPipe, Leaflet, Lucide)
3. Check network tab for failed CDN requests
4. Reload page

### "airports is not defined"
**Solutions**:
1. Ensure `app-final.js` loaded (check Network tab)
2. Check CONFIG object structure
3. Verify no syntax errors in JavaScript
4. Hard refresh

### MediaPipe Errors
**Common**: "Hands is not defined"

**Solutions**:
1. Check MediaPipe CDN loaded:
   ```html
   https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js
   ```
2. Wait for libraries to fully load
3. Check internet connection
4. Try reloading page

---

## 🎬 Recording-Specific Issues

### Webcam Shows in Recording Twice
**Solution**:
- This is normal if recording fullscreen
- Either:
  1. Record just browser window (not full screen)
  2. Or position yourself so you're in camera view only once

### Audio Not Recording
**Solutions**:
1. Check recording software has microphone selected
2. Enable microphone permissions
3. Test recording software before main video
4. Ensure mic not muted

### Cursor Not Showing
**Solutions**:
1. Enable cursor capture in recording software
2. Use cursor highlighting (often in software settings)
3. OBS: Sources → Add → Window Capture → Capture cursor

---

## 🚀 Last Resort Solutions

### Nuclear Options (if all else fails):

1. **Full Cache Clear**:
   - Ctrl+Shift+Delete → All time → Everything
   
2. **Disable Extensions**:
   - Open in Incognito (Ctrl+Shift+N)
   
3. **Try Different Browser**:
   - Download Chrome if using Edge (or vice versa)
   
4. **Reinstall Files**:
   ```bash
   # Rename current folder as backup
   # Re-download all files
   ```

5. **Check File Integrity**:
   - Verify file sizes match:
     - `app-final.js`: ~30KB
     - `style-complete.css`: ~26KB
     - `index.html`: ~12KB
     - `modern-map.css`: ~4KB

---

## 📞 Still Having Issues?

### Debug Checklist:
```
[ ] Browser console open (F12)
[ ] Network tab shows all files loaded (200 status)
[ ] No red errors in console
[ ] Camera permission granted
[ ] All CSS/JS files loaded (check Sources tab)
[ ] Internet connection stable
[ ] Correct files referenced in index.html
```

### Files to Check:
1. `index.html` - Line 4-6 (CSS links)
2. `index.html` - Line 280 (JS link)
3. `app-final.js` - Line 6-16 (CONFIG object)
4. `style-complete.css` - Should be latest timestamp

---

## ✅ Verification Commands

### Quick File Check (PowerShell):
```powershell
cd "C:/Users/richp/OneDrive/Documents/Advent of Goose AI/Day 05 - Flight Tracker"
ls *.html,*.js,*.css | Select-Object Name,Length,LastWriteTime
```

### Expected Output:
- All files should show today's date (Dec 6, 2025)
- `app-final.js` ~30KB
- `style-complete.css` ~26KB
- `index.html` ~12KB

---

## 💡 Pro Tips

1. **Always hard refresh first** (Ctrl+F5)
2. **Check console errors** (F12)
3. **Test in incognito mode** (eliminates extension conflicts)
4. **One change at a time** (easier to debug)
5. **Keep backup files** (`index-backup.html` exists)

---

**Most issues are solved with a hard refresh! (Ctrl+F5)** 🔄
