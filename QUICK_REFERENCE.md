# ⚡ QUICK REFERENCE & CHEAT SHEET

## 🚀 QUICK START

```bash
# 1. Navigate to project
cd "d:\Raghu09\MCA\2nd SEM\Web assignment"

# 2. Install dependencies (first time only)
npm install

# 3. Start the server
npm start

# 4. Open in browser
http://localhost:3000

# 5. Stop server
Ctrl + C
```

---

## 📡 API TESTING (CURL COMMANDS)

```bash
# Test Missions API
curl http://localhost:3000/api/missions

# Test Photos API
curl http://localhost:3000/api/photos

# Test Videos API
curl http://localhost:3000/api/videos

# Test Stats API
curl http://localhost:3000/api/stats

# Test Contact Form (POST)
curl -X POST http://localhost:3000/api/contact ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Test\",\"email\":\"test@example.com\",\"subject\":\"Hello\",\"message\":\"Test message here\"}"

# Test Frontend
curl http://localhost:3000
```

---

## 🔧 TROUBLESHOOTING

### Port 3000 Already in Use

**Problem:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solutions:**

```bash
# Option 1: Use different port
PORT=3001 npm start

# Option 2: Kill existing Node process
taskkill /F /IM node.exe

# Option 3: Find what's using port 3000
netstat -ano | findstr :3000
taskkill /F /PID <PID_number>
```

---

### Module Not Found

**Problem:**
```
Error: Cannot find module 'express'
```

**Solutions:**

```bash
# Clear node_modules and reinstall
rm -r node_modules package-lock.json
npm install
```

---

### Static Files Returning 404

**Problem:**
```
GET /css/styles.css 404 Not Found
```

**Solutions:**

1. Verify directory structure:
   ```
   frontend/
   ├── index.html
   ├── css/
   │  └── styles.css
   └── js/
      ├── api.js
      └── main.js
   ```

2. Check server.js middleware:
   ```javascript
   app.use(express.static(path.join(__dirname, '../frontend')));
   ```

3. Restart server after moving files

---

### API Endpoints Not Responding

**Problem:**
```
GET http://localhost:3000/api/missions → 404
```

**Solutions:**

1. Verify backend/data/missions.json exists
2. Check backend/routes/api.js for syntax errors
3. Check server logs for error messages
4. Verify route is mounted: `app.use('/api', apiRoutes)`

---

### Frontend Not Loading Data

**Problem:**
```
Missions grid appears empty, no console errors
```

**Solutions:**

1. Open browser DevTools (F12)
2. Check Console tab for JavaScript errors
3. Check Network tab:
   - Is `/api/missions` request being made?
   - What's the response status?
   - Is response valid JSON?
4. Check missions.json file exists and is valid JSON
5. Verify API response structure:
   ```javascript
   {success: true, count: 6, data: [...]}
   ```

---

## 📁 FILE STRUCTURE REFERENCE

```
project/
├── backend/
│   ├── server.js          ← Express initialization
│   ├── routes/
│   │   └── api.js         ← API endpoints
│   └── data/
│       └── missions.json  ← Data storage
├── frontend/
│   ├── index.html         ← Page markup
│   ├── css/
│   │   └── styles.css     ← Styling
│   └── js/
│       ├── api.js         ← HTTP client
│       └── main.js        ← UI logic
├── package.json           ← Dependencies
└── node_modules/          ← Installed packages
```

---

## 🔐 FORM VALIDATION RULES

**Contact Form Requirements:**

| Field | Rule |
|-------|------|
| Name | Required, non-empty |
| Email | Required, must match email regex |
| Subject | Required, non-empty |
| Message | Required, minimum 10 characters |

**Error Messages:**
- "Name is required"
- "Invalid email address"
- "Subject is required"
- "Message must be at least 10 characters"

---

## 🎨 RESPONSIVE BREAKPOINTS

```css
/* Mobile: Default */
max-width: 480px

/* Tablet: Medium screens */
@media (max-width: 768px)

/* Desktop: Large screens */
@media (max-width: 1024px)
```

---

## 🚨 COMMON PORT CONFLICTS

```bash
# Find what's running on port 3000
netstat -ano | findstr :3000

# If output shows:
#   TCP    127.0.0.1:3000    0.0.0.0:0    LISTENING    12345
# Then PID 12345 is using it

# Kill that process
taskkill /F /PID 12345

# Or use different port
PORT=3001 npm start
PORT=8000 npm start
PORT=5000 npm start
```

---

## 🧪 MANUAL TESTING CHECKLIST

- [ ] Server starts: `npm start`
- [ ] Frontend loads: http://localhost:3000
- [ ] Navbar responsive on mobile
- [ ] Hero stats counters animate
- [ ] Mission cards display (6 items)
- [ ] Photo gallery displays (6 items)
- [ ] Videos display (4 items)
- [ ] Contact form validates
- [ ] Form submit shows success/error
- [ ] All API endpoints respond (curl test)
- [ ] No console errors (DevTools)
- [ ] Smooth scrolling works
- [ ] Mobile menu toggles
- [ ] Links open in new tabs

---

## 🗂️ DATA LOCATIONS

**Frontend Data Display:**
- Missions: Loaded from `/api/missions` → Rendered to `#missionsGrid`
- Photos: Loaded from `/api/photos` → Rendered to `#photosGrid`
- Videos: Loaded from `/api/videos` → Rendered to `#videosGrid`
- Stats: Loaded from `/api/stats` → Displayed as animated counters

**Backend Data Source:**
- All data: `backend/data/missions.json`

**Data Counts:**
- Missions: 6 items
- Photos: 6 items
- Videos: 4 items
- Stats: 4 values (missions, satellites, countries, yearsActive)

---

## 📝 LOGGING & DEBUGGING

**Console Log Important Values:**

```javascript
// In main.js, add these to debug:
console.log('Page loaded at:', new Date().toLocaleTimeString());
console.log('Missions API response:', response);
console.log('Mission cards rendered:', document.querySelectorAll('.mission-card').length);
console.log('Form data before submit:', formData);
```

**Server Logs:**

```javascript
// In server.js or routes/api.js:
console.log('GET /api/missions requested');
console.log('Missions data:', missions);
console.log('Sending response with count:', missions.length);
```

---

## 🔄 DEVELOPMENT WORKFLOW

1. **Make changes** to `.js`, `.css`, or `.html` files
2. **For server changes (server.js, api.js):**
   - Stop server: `Ctrl + C`
   - Restart: `npm start`
3. **For frontend changes (main.js, api.js, styles.css):**
   - Save file
   - Refresh browser: `Ctrl + R` or `F5`
   - Clear cache if needed: `Ctrl + Shift + Delete`

**Using Auto-Reload (Recommended):**
```bash
npm run dev
# Uses nodemon to auto-restart on file changes
# Still need to refresh browser for frontend changes
```

---

## 📊 MONITORING REQUESTS

**Browser DevTools - Network Tab:**

1. Open DevTools: `F12`
2. Click "Network" tab
3. Reload page: `F5`
4. You'll see:
   - `index.html` (200 OK)
   - `styles.css` (200 OK)
   - `api.js` (200 OK)
   - `main.js` (200 OK)
   - `missions` API call (200 OK)
   - `photos` API call (200 OK)
   - `videos` API call (200 OK)

**View API Response:**
1. In Network tab, click on API request (e.g., "missions")
2. Click "Response" tab
3. View JSON data structure

---

## 🎯 KEY PERFORMANCE METRICS

**Page Load Time:**
- Initial HTML: ~5-10ms
- CSS Parse: ~10-15ms
- JS Parse & Execute: ~20-30ms
- API Calls: ~50ms per request
- DOM Rendering: ~100-150ms
- **Total**: ~300-400ms

**Resource Sizes (Approximate):**
- HTML: ~15KB
- CSS: ~30KB
- JS (api.js + main.js): ~25KB
- JSON Data: ~8KB
- Total: ~78KB

---

## 💡 TIPS & TRICKS

1. **Quick port cleanup:**
   ```bash
   # Windows - Kill all Node processes
   taskkill /F /IM node.exe
   ```

2. **Verify JSON validity:**
   ```bash
   # Windows - Check missions.json
   curl http://localhost:3000/api/missions | powershell -Command "$_ | ConvertFrom-Json"
   ```

3. **View raw server output:**
   ```bash
   npm start 2>&1 | Tee-Object -FilePath debug.log
   ```

4. **Test with custom PORT:**
   ```bash
   $env:PORT = 5000; npm start
   ```

5. **Hide console log from production:**
   ```javascript
   // Wrap with NODE_ENV check
   if (process.env.NODE_ENV !== 'production') {
     console.log('Debug info');
   }
   ```

---

## 📚 DOCUMENTATION FILES

- **[PROJECT_ANALYSIS.md](PROJECT_ANALYSIS.md)** - Full analysis with execution steps, database integration, and project analysis
- **[EXECUTION_DIAGRAMS.md](EXECUTION_DIAGRAMS.md)** - Visual diagrams of structure, flow, and interactions
- **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** - This file (cheat sheet)

---

## ✅ VERIFICATION COMMANDS

```bash
# Verify Node.js installed
node --version

# Verify npm installed
npm --version

# Verify project setup
npm ls

# Test all API endpoints
curl -s http://localhost:3000/api/missions | powershell -Command "$_ | ConvertFrom-Json | Select-Object -Property count, success"
curl -s http://localhost:3000/api/photos | powershell -Command "$_ | ConvertFrom-Json | Select-Object -Property count, success"
curl -s http://localhost:3000/api/videos | powershell -Command "$_ | ConvertFrom-Json | Select-Object -Property count, success"
curl -s http://localhost:3000/api/stats | powershell -Command "$_ | ConvertFrom-Json | Select-Object -Property success"

# Verify frontend serving
curl -I http://localhost:3000
```

---

**Last Updated:** 2026-06-11  
**Project:** Indian Space Explorer (ISRO Mission Showcase)  
**Version:** 1.0.0
