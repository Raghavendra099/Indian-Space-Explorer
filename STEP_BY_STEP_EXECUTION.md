# 🚀 COMPLETE STEP-BY-STEP PROJECT EXECUTION GUIDE

**Project:** Indian Space Explorer (ISRO Mission Showcase)  
**Target Audience:** Beginners  
**Difficulty:** Easy  

---

## 📋 TABLE OF CONTENTS
1. Prerequisites Check
2. Open Project in VS Code
3. Install Dependencies
4. Start the Server
5. Access in Browser
6. Test the Application
7. Stop the Server
8. Troubleshooting

---

## ✅ STEP 1: PREREQUISITES CHECK

### What You Need:
- Windows 10/11 Operating System
- Node.js (v14 or higher)
- npm (Node Package Manager - comes with Node.js)
- A web browser (Chrome, Firefox, Edge, Safari)
- VS Code (recommended) or any text editor

### 1.1: Verify Node.js Installation

**What:** Check if Node.js is installed on your computer

**How:**
1. Press **Windows Key + R** on your keyboard
   - A "Run" dialog will appear

2. Type: `powershell`
   - Click **OK** button or press **Enter**

3. A PowerShell terminal window will open (black window with `>` symbol)

4. Type this command:
   ```
   node --version
   ```
   - Then press **Enter**

**Expected Output:**
```
v24.15.0
```
(Version number might be different, but should show a version)

### 1.2: Verify npm Installation

**What:** Check if npm package manager is installed

**How:**
1. In the same PowerShell window, type:
   ```
   npm --version
   ```
   - Press **Enter**

**Expected Output:**
```
10.7.0
```
(Version might be different)

**If you see errors:**
- Download and install Node.js from: https://nodejs.org
- Choose "LTS" (Long Term Support) version
- Run installer and click "Next" → "Install" → "Finish"
- Restart PowerShell and try again

---

## 📁 STEP 2: OPEN PROJECT IN VS CODE

### 2.1: Navigate to Project Folder

**What:** Go to where your project files are located

**How:**
1. In PowerShell, type:
   ```
   cd "d:\Raghu09\MCA\2nd SEM\Web assignment"
   ```
   - Press **Enter**

2. You should see the path change in PowerShell:
   ```
   PS D:\Raghu09\MCA\2nd SEM\Web assignment>
   ```

3. List all files to verify you're in the right place:
   ```
   dir
   ```
   - Press **Enter**

**You should see:**
```
Mode  LastWriteTime  Length  Name
----  ──────────────  ──────  ────
d----  Jun 11 10:00  <DIR>   backend
d----  Jun 11 10:00  <DIR>   frontend
d----  Jun 11 10:00  <DIR>   node_modules
-a---  Jun 11 10:00   1.2KB  package.json
-a---  Jun 11 10:00   2.5KB  package-lock.json
```

### 2.2: Open in VS Code

**What:** Open the project in Visual Studio Code editor

**How - Option 1 (Recommended):**
1. Type in PowerShell:
   ```
   code .
   ```
   - Press **Enter**

2. VS Code will open automatically with your project loaded

**How - Option 2 (Manual):**
1. Click **Windows Start** button (bottom left corner)
2. Search for **"Visual Studio Code"**
3. Click on it to open
4. In VS Code:
   - Click **File** → **Open Folder**
   - Navigate to `D:\Raghu09\MCA\2nd SEM\Web assignment`
   - Click **Select Folder**

**VS Code Window will show:**
```
├── 📁 backend/
│   ├── server.js
│   ├── routes/
│   │   └── api.js
│   └── data/
│       └── missions.json
├── 📁 frontend/
│   ├── index.html
│   ├── css/
│   │   └── styles.css
│   └── js/
│       ├── api.js
│       └── main.js
├── package.json
└── package-lock.json
```

---

## 📦 STEP 3: INSTALL DEPENDENCIES

### What is This Step?
Your project needs external libraries (express.js, cors, etc.) to run. These are listed in `package.json`. This step downloads them.

### 3.1: Keep PowerShell Open

**Prerequisite:** You should still have PowerShell open in the project directory

**Where to check:** PowerShell shows:
```
PS D:\Raghu09\MCA\2nd SEM\Web assignment>
```

### 3.2: Run npm install

**What:** Download all project dependencies

**How:**
1. In PowerShell, type:
   ```
   npm install
   ```
   - Press **Enter**

2. Wait for installation (this takes 30 seconds to 2 minutes)

3. You'll see progress like:
   ```
   npm notice
   npm notice
   npm notice  added 98 packages, and audited 99 packages in 2s
   npm notice
   npm notice found 0 vulnerabilities
   ```

**What happened:** 98 packages downloaded and installed in `node_modules` folder

### 3.3: Verify Installation Success

**How:**
1. Check if `node_modules` folder was created:
   ```
   dir | findstr node_modules
   ```
   - Press **Enter**

2. You should see:
   ```
   d----  Jun 11 10:00  <DIR>   node_modules
   ```

**If you see an error:**
- Run: `npm install` again
- If still failing, delete node_modules folder and try again:
  ```
  rmdir node_modules /s /q
  npm install
  ```

---

## 🔌 STEP 4: START THE SERVER

### What is This Step?
This step runs your Express server on your computer, making your website accessible at http://localhost:3000

### 4.1: Start Server

**How:**
1. In PowerShell, type:
   ```
   npm start
   ```
   - Press **Enter**

2. Wait 2-3 seconds for the server to start

**You should see:**
```
🚀 Indian Space Explorer is live!
   → Local:  http://localhost:3000
   → API:    http://localhost:3000/api/missions
```

### 4.2: What This Means

- ✅ Server is running successfully
- ✅ Your website is now accessible
- ✅ PowerShell will keep running (don't close it!)
- ✅ The blinking cursor is normal

### 4.3: Important Notes

**DO NOT:**
- ❌ Close PowerShell window (server stops)
- ❌ Press Ctrl+C (stops the server)
- ❌ Minimize PowerShell if you want to keep it running

**DO:**
- ✅ Keep PowerShell open in background
- ✅ Open a new PowerShell for other commands
- ✅ Leave server running while testing

---

## 🌐 STEP 5: ACCESS IN BROWSER

### What is This Step?
Open your website in a web browser to see and test it

### 5.1: Open Web Browser

**Which browser?** Chrome, Firefox, Edge, or Safari

**How:**
1. Click **Windows Start** button (bottom left)
2. Search for **"Chrome"** (or your preferred browser)
3. Click to open

**OR** If browser is already open, just click on it in taskbar

### 5.2: Navigate to Website

**How:**
1. Click on the **Address Bar** (where URLs are typed) at the top
2. Type:
   ```
   http://localhost:3000
   ```
3. Press **Enter**

### 5.3: Website Loads

**What you should see:**
- Navigation bar at top with links (Missions, Photos, Videos, About, Contact)
- Hero section with animated statistics
- Mission cards showing 6 ISRO space missions
- Photo gallery with space images
- Video section with mission videos
- Contact form
- Footer with information

**If page doesn't load:**
- Check PowerShell is still running (showing server output)
- Wait 5 seconds and refresh browser (Ctrl+R or F5)
- See "Troubleshooting" section below

### 5.4: Interact with Website

**What to try:**

1. **Navigation:**
   - Click menu items (Missions, Photos, Videos)
   - Page smoothly scrolls to sections

2. **Mobile Menu (on smaller screens):**
   - Click hamburger menu (☰) icon
   - Menu slides out

3. **Mission Cards:**
   - Click on any mission card
   - Opens ISRO official page in new tab

4. **Contact Form:**
   - Scroll to bottom
   - Fill in Name, Email, Subject, Message
   - Click "Send Message" button
   - Should see success notification

5. **Animations:**
   - Scroll through page
   - See counter animations
   - See star twinkling effects
   - See fade-in animations

---

## 🧪 STEP 6: TEST THE APPLICATION

### 6.1: Browser Developer Tools (DevTools)

**What:** Tools to inspect and debug your website

**How to open:**
1. Press **F12** on keyboard
2. OR Right-click on page → Click **"Inspect"**

### 6.2: Check Console for Errors

**Steps:**
1. In DevTools, click **"Console"** tab
2. Look for any red error messages
3. If no red errors, everything is working!

### 6.3: Check Network Requests

**Steps:**
1. In DevTools, click **"Network"** tab
2. Reload page (Ctrl+R)
3. You should see requests for:
   - `index.html` (200 OK)
   - `styles.css` (200 OK)
   - `api.js` (200 OK)
   - `main.js` (200 OK)
   - `missions` API (200 OK)
   - `photos` API (200 OK)
   - `videos` API (200 OK)

All should show **"200 OK"** in green

### 6.4: Test Each Feature

| Feature | How to Test | Expected Result |
|---------|------------|-----------------|
| **Page Load** | Refresh page | Page loads in <1 second |
| **Navbar Scroll** | Scroll down | Navbar background changes |
| **Stat Counter** | Scroll to hero | Numbers animate up |
| **Mission Cards** | Scroll down | 6 cards appear smoothly |
| **Photo Gallery** | Continue scrolling | 6 photos display |
| **Videos** | Continue scrolling | 4 video thumbnails show |
| **Contact Form** | Scroll to bottom | Form appears with inputs |
| **Form Validation** | Try submitting empty | Error messages show |
| **Form Submit** | Fill & submit valid form | Success message appears |

---

## 🛑 STEP 7: STOP THE SERVER

### When to Stop?
- When you're done testing
- Before shutting down your computer
- To restart the server with changes

### 7.1: Stop Server

**How:**
1. Go to PowerShell window (showing server output)
2. Press **Ctrl + C** (hold Control, press C)

**You should see:**
```
^C
PS D:\Raghu09\MCA\2nd SEM\Web assignment>
```

The `^C` shows that Ctrl+C was pressed and server stopped.

### 7.2: Verify Server Stopped

**What happens:**
- Website becomes inaccessible
- If you refresh browser, you get "Cannot reach localhost" error
- PowerShell shows cursor ready for new commands

### 7.3: Restart Server

**How:**
1. Type again in PowerShell:
   ```
   npm start
   ```
2. Press **Enter**
3. Server starts again and website is accessible

---

## 🔧 STEP 8: TESTING API ENDPOINTS

### What are API Endpoints?
Backend routes that return data (JSON) to frontend

### 8.1: Test in Browser

**Missions API:**
1. Open new browser tab
2. Type: `http://localhost:3000/api/missions`
3. Press **Enter**
4. You'll see JSON data with 6 missions

**Photos API:**
1. Type: `http://localhost:3000/api/photos`
2. Press **Enter**
3. You'll see JSON data with 6 photos

**Videos API:**
1. Type: `http://localhost:3000/api/videos`
2. Press **Enter**
3. You'll see JSON data with 4 videos

**Stats API:**
1. Type: `http://localhost:3000/api/stats`
2. Press **Enter**
3. You'll see JSON with numbers (125, 431, 34, 58)

### 8.2: Test Contact Form (Advanced)

**Using PowerShell to test:**
1. Open **new** PowerShell window (keep server PowerShell open!)
2. Type:
   ```powershell
   $body = @{
       name = "Test User"
       email = "test@example.com"
       subject = "Test"
       message = "This is a test message"
   } | ConvertTo-Json
   
   Invoke-WebRequest -Uri "http://localhost:3000/api/contact" `
     -Method POST `
     -Headers @{"Content-Type"="application/json"} `
     -Body $body
   ```
3. Press **Enter**

**Expected Response:**
```
StatusCode : 200
Content    : {"success":true,"message":"Thank you, Test User! Message received."}
```

---

## ⚠️ TROUBLESHOOTING

### Problem 1: Port 3000 Already in Use

**Error Message:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Cause:** Another server is already running on port 3000

**Solution:**

**Option A - Use Different Port:**
```powershell
$env:PORT = 3001
npm start
```
Then access at: http://localhost:3001

**Option B - Kill Existing Process:**
```powershell
taskkill /F /IM node.exe
npm start
```

---

### Problem 2: Module Not Found

**Error Message:**
```
Error: Cannot find module 'express'
```

**Cause:** Dependencies not installed

**Solution:**
```powershell
rm -r node_modules package-lock.json
npm install
npm start
```

---

### Problem 3: Website Won't Load

**Symptom:** Browser shows "Cannot reach localhost"

**Cause:** Server is not running

**Solution:**
1. Check PowerShell window
2. If you see prompt `>`, server stopped
3. Type: `npm start` and press **Enter**
4. Refresh browser (Ctrl+R)

---

### Problem 4: Static Files Not Loading (404 errors)

**Error:** CSS/JS files return 404

**Cause:** File paths incorrect

**Solution:**
1. Check file structure:
   ```
   frontend/
   ├── index.html
   ├── css/
   │   └── styles.css
   └── js/
       ├── api.js
       └── main.js
   ```
2. Restart server: Press Ctrl+C, then `npm start`

---

### Problem 5: API Returns No Data

**Symptom:** Mission cards, photos, videos not appearing

**Cause:** API endpoint failing

**Solution:**
1. Open DevTools (F12)
2. Go to Console tab
3. Look for error messages
4. Try accessing API directly:
   - Go to: http://localhost:3000/api/missions
   - Should show JSON with mission data
5. If error, check backend/data/missions.json exists

---

### Problem 6: PowerShell Command Not Found

**Error:**
```
npm : The term 'npm' is not recognized
```

**Cause:** npm not in system PATH

**Solution:**
1. Reinstall Node.js from: https://nodejs.org
2. During installation, make sure **"Add to PATH"** is selected
3. Restart PowerShell
4. Try again: `npm --version`

---

## 📊 QUICK COMMAND REFERENCE

### Most Used Commands

| Task | Command | Where to Run |
|------|---------|-------------|
| Navigate to project | `cd "d:\Raghu09\MCA\2nd SEM\Web assignment"` | PowerShell |
| Install dependencies | `npm install` | PowerShell |
| Start server | `npm start` | PowerShell |
| Stop server | `Ctrl + C` | PowerShell |
| List files | `dir` | PowerShell |
| Open in VS Code | `code .` | PowerShell |
| Check Node version | `node --version` | PowerShell |
| Check npm version | `npm --version` | PowerShell |

---

## 🎯 COMPLETE EXECUTION CHECKLIST

Follow this checklist to run the project:

- [ ] **Step 1:** Verify Node.js installed
  - [ ] Run: `node --version`
  - [ ] Run: `npm --version`

- [ ] **Step 2:** Open project in VS Code
  - [ ] Navigate to project folder
  - [ ] Run: `code .`
  - [ ] OR manually open VS Code

- [ ] **Step 3:** Install dependencies
  - [ ] Run: `npm install`
  - [ ] Wait for completion
  - [ ] Verify node_modules folder created

- [ ] **Step 4:** Start server
  - [ ] Run: `npm start`
  - [ ] Wait for "🚀 Indian Space Explorer is live!"
  - [ ] Keep PowerShell open

- [ ] **Step 5:** Open in browser
  - [ ] Open Chrome/Firefox
  - [ ] Type: `http://localhost:3000`
  - [ ] Press Enter

- [ ] **Step 6:** Test website
  - [ ] Scroll through page
  - [ ] Click mission cards
  - [ ] Fill contact form
  - [ ] Check DevTools console (F12)

- [ ] **Step 7:** Test APIs (Optional)
  - [ ] Visit: `http://localhost:3000/api/missions`
  - [ ] Visit: `http://localhost:3000/api/photos`
  - [ ] Visit: `http://localhost:3000/api/videos`

- [ ] **Step 8:** Stop server (When done)
  - [ ] Press: `Ctrl + C` in PowerShell
  - [ ] Confirm: `^C` appears

---

## 📱 RESPONSIVE TESTING

### Test on Different Screen Sizes

**In Browser DevTools (F12):**
1. Click device icon (top-left of DevTools)
2. Select different devices:
   - iPhone 12
   - iPad Pro
   - Desktop 1920x1080
3. Website should adjust layout automatically

**Expected Behaviors:**
- Desktop: All content visible
- Tablet: Content flows nicely
- Mobile: Hamburger menu appears, stacks vertically

---

## 🎬 NEXT STEPS AFTER TESTING

Once project is running successfully:

1. **Explore Code:**
   - Open `backend/server.js` to see server setup
   - Open `backend/routes/api.js` to see API endpoints
   - Open `frontend/js/main.js` to see frontend logic

2. **Make Changes:**
   - Edit files in VS Code
   - For JavaScript/CSS changes: Save file, refresh browser
   - For server.js/api.js changes: Save file, restart server

3. **Integrate Database (Optional):**
   - Follow Phase 1 in PROJECT_FILE_STRUCTURE.md
   - Replace JSON with MongoDB
   - Add persistent data storage

4. **Deploy (Advanced):**
   - Deploy to Heroku, AWS, or other platform
   - Use environment variables
   - Set up CI/CD pipeline

---

## 📞 GETTING HELP

**If something goes wrong:**

1. Check the error message in PowerShell
2. Look in DevTools Console (F12) for errors
3. Refer to "Troubleshooting" section above
4. Check PROJECT_ANALYSIS.md for detailed explanations
5. Check QUICK_REFERENCE.md for command examples

---

## ✅ SUCCESS CRITERIA

Your project is running successfully when:

✅ Server starts with "🚀 Indian Space Explorer is live!"  
✅ Website loads at http://localhost:3000  
✅ All sections visible (Missions, Photos, Videos, etc.)  
✅ Navigation links work  
✅ Contact form appears  
✅ DevTools Console shows no red errors  
✅ API endpoints return data when visited  
✅ All features respond to user interactions  

---

**Congratulations! Your project is now running!** 🎉

For more information, see:
- PROJECT_ANALYSIS.md - Technical deep dive
- EXECUTION_DIAGRAMS.md - Visual flow diagrams
- QUICK_REFERENCE.md - Command cheat sheet
- PROJECT_FILE_STRUCTURE.md - File organization

---

*Last Updated: 2026-06-11*  
*Version: 1.0.0*  
*Difficulty: ⭐ Beginner-Friendly*
