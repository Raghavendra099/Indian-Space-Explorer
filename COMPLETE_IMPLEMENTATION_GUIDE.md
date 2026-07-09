# 🚀 COMPLETE IMPLEMENTATION GUIDE - MongoDB + Multi-Page App + Authentication

## Overview

This guide will walk you through implementing:
1. **Multi-Page Application** (separate HTML files for each page)
2. **MongoDB Database** (persistent data storage)
3. **User Authentication** (Login & Register with JWT)
4. **Backend API** (RESTful endpoints with database)

**Estimated Time:** 4-6 hours  
**Difficulty:** Medium  
**Prerequisites:** Node.js, npm, MongoDB installed

---

## PHASE 1: INSTALL DEPENDENCIES (15 minutes)

### Step 1.1: Install Required npm Packages

```bash
cd "d:\Raghu09\MCA\2nd SEM\Web assignment"

npm install mongoose dotenv bcryptjs jsonwebtoken
```

**What this installs:**
- **mongoose**: MongoDB wrapper for Node.js
- **dotenv**: Environment variable management
- **bcryptjs**: Password encryption
- **jsonwebtoken**: Authentication tokens

**Verify Installation:**
```bash
npm list mongoose dotenv bcryptjs jsonwebtoken
```

You should see all packages listed with versions.

---

### Step 1.2: Create Environment File

**Create file:** `.env` in project root

```
# MongoDB
MONGO_URI=mongodb://localhost:27017/isro-explorer
DB_NAME=isro-explorer

# Server
PORT=3000
NODE_ENV=development

# JWT Authentication
JWT_SECRET=your-super-secret-key-change-in-production-12345
JWT_EXPIRE=7d

# Email (Optional)
MAIL_HOST=smtp.gmail.com
MAIL_USER=your-email@gmail.com
MAIL_PASS=your-app-password
```

---

### Step 1.3: Create .gitignore

**Create file:** `.gitignore` in project root

```
node_modules/
.env
.env.local
.env.*.local
*.log
dist/
build/
.DS_Store
thumbs.db
```

---

## PHASE 2: SETUP MONGODB (20 minutes)

### Step 2.1: Start MongoDB Service

**Windows PowerShell:**
```powershell
# Check if MongoDB is running
Get-Service MongoDB | Select-Object -Property *

# If not running, start it
Start-Service MongoDB

# Verify it started
Get-Service MongoDB
```

**Expected output:**
```
Status   Name               DisplayName
------   ----               -----------
Running  MongoDB            MongoDB
```

### Step 2.2: Test MongoDB Connection

**PowerShell:**
```powershell
mongo
```

You should see:
```
>
```

Type `exit()` to quit.

### Step 2.3: Open MongoDB Compass (GUI Tool)

1. Open **MongoDB Compass** application
2. Click **"New Connection"**
3. Default connection: `mongodb://localhost:27017`
4. Click **"Connect"**

You should see databases listed on the left.

---

## PHASE 3: CREATE DATABASE MODELS (30 minutes)

### Step 3.1: Create Database Connection File

**Create folder:** `backend/config`

**Create file:** `backend/config/db.js`

```javascript
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
```

### Step 3.2: Create Models Folder

**Create folder:** `backend/models`

### Step 3.3: Create User Model

**Create file:** `backend/models/User.js`

```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name required'],
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email required'],
    unique: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email']
  },
  password: {
    type: String,
    required: [true, 'Password required'],
    minlength: 6,
    select: false
  },
  phone: String,
  
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: Date,
  
  isActive: {
    type: Boolean,
    default: true
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
```

### Step 3.4: Create Mission, Photo, Video Models

**Create file:** `backend/models/Mission.js`

```javascript
const mongoose = require('mongoose');

const missionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  year: {
    type: Number,
    required: true
  },
  icon: String,
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Success', 'In Progress', 'Planning'],
    default: 'Success'
  },
  statusColor: String,
  link: String,
  
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Mission', missionSchema);
```

**Create file:** `backend/models/Photo.js`

```javascript
const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  imageUrl: {
    type: String,
    required: true
  },
  category: String,
  
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Photo', photoSchema);
```

**Create file:** `backend/models/Video.js`

```javascript
const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  youtubeId: String,
  thumbnail: String,
  duration: String,
  views: {
    type: Number,
    default: 0
  },
  category: String,
  
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Video', videoSchema);
```

**Create file:** `backend/models/Contact.js`

```javascript
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: String,
  email: {
    type: String,
    required: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  },
  phone: String,
  subject: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true,
    minlength: 10
  },
  status: {
    type: String,
    enum: ['new', 'read', 'replied'],
    default: 'new'
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Contact', contactSchema);
```

---

## PHASE 4: CREATE BACKEND ROUTES (30 minutes)

### Step 4.1: Create Authentication Routes

**Create file:** `backend/routes/auth.js`

```javascript
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// Register
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword, phone } = req.body;

  if (!firstName || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please fill all required fields'
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: 'Passwords do not match'
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: 'Password minimum 6 characters'
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }

    const user = await User.create({
      firstName,
      lastName: lastName || '',
      email,
      password,
      phone: phone || ''
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed'
    });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password required'
    });
  }

  try {
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    user.lastLogin = new Date();
    await user.save();

    const token = generateToken(user._id);

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed'
    });
  }
});

// Logout
router.post('/logout', (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

// Get profile
router.get('/profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        firstName: user.firstName,
        email: user.email
      }
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
});

module.exports = router;
```

### Step 4.2: Update API Routes for Database

**Modify file:** `backend/routes/api.js`

```javascript
const express = require('express');
const router = express.Router();
const Mission = require('../models/Mission');
const Photo = require('../models/Photo');
const Video = require('../models/Video');
const Contact = require('../models/Contact');

// Get missions
router.get('/missions', async (req, res) => {
  try {
    const missions = await Mission.find();
    res.json({
      success: true,
      count: missions.length,
      data: missions
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching missions' });
  }
});

// Get photos
router.get('/photos', async (req, res) => {
  try {
    const photos = await Photo.find();
    res.json({
      success: true,
      count: photos.length,
      data: photos
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching photos' });
  }
});

// Get videos
router.get('/videos', async (req, res) => {
  try {
    const videos = await Video.find();
    res.json({
      success: true,
      count: videos.length,
      data: videos
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching videos' });
  }
});

// Get stats
router.get('/stats', async (req, res) => {
  try {
    const stats = {
      missions: await Mission.countDocuments(),
      photos: await Photo.countDocuments(),
      videos: await Video.countDocuments(),
      users: await require('../models/User').countDocuments()
    };
    
    res.json({ success: true, data: stats });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching stats' });
  }
});

// Submit contact form
router.post('/contact', async (req, res) => {
  const { firstName, lastName, email, phone, subject, message } = req.body;

  if (!firstName || !email || !subject || !message || message.length < 10) {
    return res.status(400).json({
      success: false,
      message: 'Invalid form data'
    });
  }

  try {
    const contact = await Contact.create({
      firstName,
      lastName,
      email,
      phone,
      subject,
      message
    });

    res.status(201).json({
      success: true,
      message: 'Message received',
      data: contact
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error saving contact' });
  }
});

module.exports = router;
```

---

## PHASE 5: UPDATE SERVER.JS (15 minutes)

**Modify file:** `backend/server.js`

```javascript
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Database connection
const connectDB = require('./config/db');
connectDB();

// Import routes
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Middleware ───────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../frontend')));

// ─── Routes ───────────────────────────────────────────────────────
app.use('/api', apiRoutes);
app.use('/api/auth', authRoutes);

// ─── SPA Fallback ──────────────────────────────────────────────────
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// ─── Error Handler ────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ success: false, message: 'Server error' });
});

// ─── Start Server ─────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
```

---

## PHASE 6: CREATE FRONTEND PAGES (1-2 hours)

Follow **MULTI_PAGE_APP_RESTRUCTURE.md** to create:

- `frontend/index.html` (Home page with header/footer only)
- `frontend/pages/missions.html` (Missions page)
- `frontend/pages/login.html` (Login page)
- `frontend/pages/register.html` (Register page)
- All page JavaScript files
- All page CSS files

---

## PHASE 7: SEED DATABASE (10 minutes)

### Step 7.1: Create Seed Script

**Create folder:** `backend/scripts`

**Create file:** `backend/scripts/seedDB.js`

```javascript
const mongoose = require('mongoose');
const Mission = require('../models/Mission');
const Photo = require('../models/Photo');
const Video = require('../models/Video');
require('dotenv').config();

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear collections
    await Mission.deleteMany({});
    await Photo.deleteMany({});
    await Video.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Seed missions
    const missions = [
      {
        title: 'Chandrayaan-1',
        year: 2008,
        icon: '🌙',
        description: 'First lunar polar orbiter',
        status: 'Success',
        statusColor: '#10b981',
        link: 'https://www.isro.gov.in/'
      },
      {
        title: 'Mangalyaan',
        year: 2013,
        icon: '🔴',
        description: 'Mars Orbiter Mission',
        status: 'Success',
        statusColor: '#10b981',
        link: 'https://www.isro.gov.in/'
      },
      // Add more missions here...
    ];

    await Mission.insertMany(missions);
    console.log(`✅ Seeded ${missions.length} missions`);

    // Seed photos
    const photos = [
      {
        title: 'Moon Surface',
        description: 'Lunar surface image',
        imageUrl: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400',
        category: 'Moon'
      },
      // Add more photos...
    ];

    await Photo.insertMany(photos);
    console.log(`✅ Seeded ${photos.length} photos`);

    // Seed videos
    const videos = [
      {
        title: 'Chandrayaan-3: Moon Landing',
        description: 'India lands on the Moon',
        youtubeId: 'dQw4w9WgXcQ',
        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
        duration: '10:30',
        views: 1500000,
        category: 'Chandrayaan'
      },
      // Add more videos...
    ];

    await Video.insertMany(videos);
    console.log(`✅ Seeded ${videos.length} videos`);

    console.log('✅ Database seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedDB();
```

### Step 7.2: Run Seed Script

```bash
node backend/scripts/seedDB.js
```

**Expected Output:**
```
✅ Connected to MongoDB
🗑️  Cleared existing data
✅ Seeded 6 missions
✅ Seeded 6 photos
✅ Seeded 4 videos
✅ Database seeding complete!
```

---

## PHASE 8: START & TEST

### Step 8.1: Start Server

```bash
npm start
```

**Expected Output:**
```
✅ MongoDB Connected: localhost
🚀 Server running on http://localhost:3000
```

### Step 8.2: Test in Browser

**Open:** http://localhost:3000

**Test Registration:**
1. Click "Register"
2. Fill form with test data
3. Click "Create Account"
4. Should redirect to home page

**Test Login:**
1. Click "Logout"
2. Click "Login"
3. Enter credentials
4. Should redirect to home page

**Test Database:**
1. Open MongoDB Compass
2. Select `isro-explorer` database
3. View `missions`, `photos`, `videos` collections
4. Verify data is there

---

## VERIFICATION CHECKLIST

- [ ] MongoDB is running and connected
- [ ] All npm packages installed
- [ ] .env file created with correct values
- [ ] All backend models created
- [ ] All backend routes created
- [ ] server.js updated with database connection
- [ ] All frontend pages created
- [ ] Database seeded with initial data
- [ ] Server starts without errors
- [ ] Website loads on http://localhost:3000
- [ ] Registration works
- [ ] Login works
- [ ] Data displays from database
- [ ] Missions/Photos/Videos API returns data

---

## TROUBLESHOOTING

### MongoDB Connection Error

```
Error: connect ECONNREFUSED
```

**Solution:**
```powershell
Start-Service MongoDB
```

### Module Not Found

```
Error: Cannot find module 'mongoose'
```

**Solution:**
```bash
npm install mongoose dotenv bcryptjs jsonwebtoken
```

### Port Already in Use

```
Error: listen EADDRINUSE
```

**Solution:**
```bash
PORT=3001 npm start
```

### Wrong File Paths

**Check:**
- All files in correct locations
- Imports use correct relative paths
- Case sensitivity matches (Linux/Mac are case-sensitive)

---

## NEXT STEPS

1. ✅ Implement all features from this guide
2. ✅ Add more missions/photos/videos data
3. ✅ Add email notifications (nodemailer)
4. ✅ Add profile page
5. ✅ Add admin dashboard
6. ✅ Deploy to production

---

**Congratulations! You've built a full-stack application with MongoDB!** 🎉

For detailed information on each component, see:
- **MONGODB_DATABASE_INTEGRATION.md** - Database details
- **MULTI_PAGE_APP_RESTRUCTURE.md** - Page structure details
- **PROJECT_FILE_STRUCTURE.md** - File organization

