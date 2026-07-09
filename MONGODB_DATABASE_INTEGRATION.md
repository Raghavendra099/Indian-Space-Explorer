# 🗄️ MONGODB DATABASE INTEGRATION - COMPLETE GUIDE

## Part 1: Understanding MongoDB

### What is MongoDB?

**MongoDB** is a NoSQL (Not Only SQL) database that stores data in JSON-like documents instead of tables.

#### Comparison: Traditional Database vs MongoDB

**Traditional SQL Database (like MySQL):**
```
Table: Users
┌────┬──────────┬─────────────┬──────────┐
│ ID │ Username │ Email       │ Password │
├────┼──────────┼─────────────┼──────────┤
│ 1  │ john_doe │ john@ex.com │ hashed.. │
│ 2  │ jane_smith│jane@ex.com │ hashed.. │
└────┴──────────┴─────────────┴──────────┘
```

**MongoDB (NoSQL Database):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "username": "john_doe",
  "email": "john@example.com",
  "password": "hashed_password_here",
  "createdAt": "2024-06-11T10:30:00Z",
  "role": "user"
}
```

### MongoDB Advantages:
✅ Flexible schema (can add fields anytime)
✅ JSON-like format (matches JavaScript objects)
✅ Scalable (great for large datasets)
✅ Easy to learn (if you know JavaScript)
✅ Perfect for Node.js applications

---

## Part 2: MongoDB Setup

### Step 2.1: Install MongoDB Locally

**Option A: MongoDB Community Edition (Free)**

1. Download from: https://www.mongodb.com/try/download/community

2. Choose:
   - **OS:** Windows
   - **Version:** Latest stable
   - **Package:** MSI

3. Click **Download** button

4. Run the installer:
   - Click **Next** through all screens
   - Accept license agreement
   - Select **Complete** installation
   - Click **Install**
   - When prompted to install MongoDB Compass, **check the box**
   - Click **Finish**

5. MongoDB now runs as a Windows Service (auto-starts)

---

### Step 2.2: Verify MongoDB Installation

**Using PowerShell:**

```powershell
# Connect to MongoDB
mongo
```

**Expected Output:**
```
>
```

If you see the `>` prompt, MongoDB is running!

**To exit:**
```
exit()
```

---

### Step 2.3: Install MongoDB GUI Tool (Optional but Recommended)

**MongoDB Compass** - Visual tool to view databases

1. Download from: https://www.mongodb.com/products/compass

2. Install like any Windows program (Next → Next → Install)

3. Open MongoDB Compass

4. Click **"New Connection"**

5. Default settings:
   ```
   mongodb://localhost:27017
   ```

6. Click **"Connect"**

**You should see:**
- Left sidebar with database list
- Green "Connected" indicator

---

## Part 3: MongoDB in Node.js Project

### Step 3.1: Install Required Packages

```bash
npm install mongoose dotenv bcryptjs jsonwebtoken
```

**What each package does:**
- **mongoose**: MongoDB ORM (Object-Relational Mapping)
- **dotenv**: Load environment variables from .env file
- **bcryptjs**: Hash passwords securely
- **jsonwebtoken**: Create authentication tokens

### Step 3.2: Create Environment Configuration

**Create file:** `.env`

```env
# Database
MONGO_URI=mongodb://localhost:27017/isro-explorer
DB_NAME=isro-explorer

# Server
PORT=3000
NODE_ENV=development

# JWT
JWT_SECRET=your-secret-key-change-this-in-production
JWT_EXPIRE=7d

# Email (Optional)
MAIL_HOST=smtp.gmail.com
MAIL_USER=your-email@gmail.com
MAIL_PASS=your-app-password
```

---

### Step 3.3: Create MongoDB Connection File

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
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
```

---

### Step 3.4: Update server.js

**Modify file:** `backend/server.js`

```javascript
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config(); // Add this at top

// Database connection
const connectDB = require('./config/db');
connectDB();

// Routes
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth'); // New auth routes

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Middleware ───────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../frontend')));

// ─── Routes ───────────────────────────────────────────────────────
app.use('/api', apiRoutes);
app.use('/api/auth', authRoutes); // New

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

## Part 4: Create Database Models

### Step 4.1: User Model (Authentication)

**Create file:** `backend/models/User.js`

```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // Basic Info
  firstName: {
    type: String,
    required: [true, 'Please provide first name'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Please provide last name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    unique: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
    select: false // Don't return password by default
  },
  phone: String,
  
  // Profile
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  profileImage: String,
  
  // Dates
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: Date,
  
  // Verification
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: String,
  
  // Security
  isActive: {
    type: Boolean,
    default: true
  }
});

// ─── Hash Password Before Saving ───────────────────────────────────
userSchema.pre('save', async function(next) {
  // Only hash if password is modified
  if (!this.isModified('password')) {
    next();
  }

  // Generate salt
  const salt = await bcrypt.genSalt(10);
  
  // Hash password
  this.password = await bcrypt.hash(this.password, salt);
});

// ─── Compare Password Method ───────────────────────────────────────
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
```

### Step 4.2: Mission Model (for Database)

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
  imageUrl: String,
  details: String,
  
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Mission', missionSchema);
```

### Step 4.3: Photo Model

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
  category: {
    type: String,
    enum: ['Moon', 'Mars', 'Earth', 'Space', 'Satellite'],
    default: 'Space'
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Photo', photoSchema);
```

### Step 4.4: Video Model

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
  category: {
    type: String,
    enum: ['Chandrayaan', 'Mangalyaan', 'PSLV', 'Aditya-L1', 'Gaganyaan'],
    default: 'PSLV'
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Video', videoSchema);
```

### Step 4.5: Contact Model

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
  },
  repliedAt: Date
});

module.exports = mongoose.model('Contact', contactSchema);
```

---

## Part 5: Database Integration in API Routes

### Step 5.1: Update API Routes for Database

**Modify file:** `backend/routes/api.js`

```javascript
const express = require('express');
const router = express.Router();
const Mission = require('../models/Mission');
const Photo = require('../models/Photo');
const Video = require('../models/Video');
const Contact = require('../models/Contact');

// ─── GET /api/missions ────────────────────────────────────────────
router.get('/missions', async (req, res) => {
  try {
    const missions = await Mission.find();
    res.json({
      success: true,
      count: missions.length,
      data: missions
    });
  } catch (err) {
    console.error('Error fetching missions:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch missions' });
  }
});

// ─── GET /api/photos ──────────────────────────────────────────────
router.get('/photos', async (req, res) => {
  try {
    const photos = await Photo.find();
    res.json({
      success: true,
      count: photos.length,
      data: photos
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch photos' });
  }
});

// ─── GET /api/videos ──────────────────────────────────────────────
router.get('/videos', async (req, res) => {
  try {
    const videos = await Video.find();
    res.json({
      success: true,
      count: videos.length,
      data: videos
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch videos' });
  }
});

// ─── GET /api/stats ───────────────────────────────────────────────
router.get('/stats', async (req, res) => {
  try {
    const stats = {
      missions: await Mission.countDocuments(),
      photos: await Photo.countDocuments(),
      videos: await Video.countDocuments(),
      contacts: await Contact.countDocuments()
    };
    
    res.json({ success: true, data: stats });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch stats' });
  }
});

// ─── POST /api/contact ────────────────────────────────────────────
router.post('/contact', async (req, res) => {
  const { firstName, lastName, email, phone, subject, message } = req.body;

  // Validation
  if (!firstName || !email || !subject || !message || message.length < 10) {
    return res.status(400).json({
      success: false,
      message: 'Please fill all required fields correctly'
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

    console.log(`📧 Message from ${firstName}: ${subject}`);

    res.json({
      success: true,
      message: `Thank you, ${firstName}! We'll contact you soon.`,
      data: contact
    });
  } catch (err) {
    console.error('Error saving contact:', err);
    res.status(500).json({ success: false, message: 'Failed to save message' });
  }
});

module.exports = router;
```

---

## Part 6: Authentication Backend

### Step 6.1: Create Authentication Routes

**Create file:** `backend/routes/auth.js`

```javascript
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// ─── Generate JWT Token ──────────────────────────────────────────
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

// ─── POST /api/auth/register ─────────────────────────────────────
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword, phone } = req.body;

  // Validation
  if (!firstName || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide all required fields'
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
      message: 'Password must be at least 6 characters'
    });
  }

  try {
    // Check if user exists
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }

    // Create new user
    const user = await User.create({
      firstName,
      lastName: lastName || '',
      email,
      password,
      phone: phone || ''
    });

    // Generate token
    const token = generateToken(user._id);

    // Return user and token
    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Error during registration'
    });
  }
});

// ─── POST /api/auth/login ───────────────────────────────────────
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide email and password'
    });
  }

  try {
    // Find user and include password
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check password
    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Error during login'
    });
  }
});

// ─── POST /api/auth/logout ──────────────────────────────────────
router.post('/logout', (req, res) => {
  // Token is removed on client side (localStorage)
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

// ─── GET /api/auth/profile ──────────────────────────────────────
router.get('/profile', async (req, res) => {
  try {
    // Extract token from header
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user
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
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        role: user.role
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

---

## Part 7: Database Seeding (Populate Initial Data)

### Step 7.1: Create Seed Script

**Create file:** `backend/scripts/seedDB.js`

```javascript
const mongoose = require('mongoose');
const Mission = require('../models/Mission');
const Photo = require('../models/Photo');
const Video = require('../models/Video');
require('dotenv').config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Mission.deleteMany({});
    await Photo.deleteMany({});
    await Video.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Seed missions
    const missions = await Mission.insertMany([
      {
        title: 'Chandrayaan-1',
        year: 2008,
        icon: '🌙',
        description: 'First lunar polar orbiter to perform a high-resolution mineralogical and chemical mapping',
        status: 'Success',
        statusColor: '#10b981',
        link: 'https://www.isro.gov.in/'
      },
      {
        title: 'Mangalyaan',
        year: 2013,
        icon: '🔴',
        description: 'Mars Orbiter Mission - first interplanetary mission on first attempt',
        status: 'Success',
        statusColor: '#10b981',
        link: 'https://www.isro.gov.in/'
      },
      // ... add all missions here
    ]);
    console.log(`✅ Seeded ${missions.length} missions`);

    // Seed photos
    const photos = await Photo.insertMany([
      {
        title: 'Moon Surface',
        description: 'High resolution image of lunar surface',
        imageUrl: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400',
        category: 'Moon'
      },
      // ... add all photos here
    ]);
    console.log(`✅ Seeded ${photos.length} photos`);

    // Seed videos
    const videos = await Video.insertMany([
      {
        title: 'Chandrayaan-3: Moon Landing',
        description: 'India successfully lands on the Moon',
        youtubeId: 'dQw4w9WgXcQ',
        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
        duration: '10:30',
        views: 1500000,
        category: 'Chandrayaan'
      },
      // ... add all videos here
    ]);
    console.log(`✅ Seeded ${videos.length} videos`);

    console.log('✅ Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
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
✅ Database seeding completed successfully!
```

---

## Part 8: Complete MongoDB Integration Steps

### Quick Checklist:

- [ ] Install MongoDB Community Edition
- [ ] Install npm packages: `npm install mongoose dotenv bcryptjs jsonwebtoken`
- [ ] Create `.env` file with MONGO_URI
- [ ] Create `backend/config/db.js` - Connection file
- [ ] Create `backend/models/User.js` - User schema
- [ ] Create `backend/models/Mission.js` - Mission schema
- [ ] Create `backend/models/Photo.js` - Photo schema
- [ ] Create `backend/models/Video.js` - Video schema
- [ ] Create `backend/models/Contact.js` - Contact schema
- [ ] Update `backend/server.js` - Connect to DB
- [ ] Create `backend/routes/auth.js` - Authentication
- [ ] Update `backend/routes/api.js` - Use Mongoose queries
- [ ] Create `backend/scripts/seedDB.js` - Seed script
- [ ] Run seed script: `node backend/scripts/seedDB.js`
- [ ] Test with Postman or browser

---

## Part 9: Verify MongoDB Connection

### Test Connection:

**Method 1: MongoDB Shell**
```powershell
mongo
> show databases
> use isro-explorer
> db.users.find()
```

**Method 2: MongoDB Compass GUI**
1. Open MongoDB Compass
2. Click Connect
3. Look for `isro-explorer` database
4. Click on collections to view data

**Method 3: Test via Backend**
```powershell
npm start
# Check server logs for: "✅ MongoDB Connected"
```

---

## Part 10: Troubleshooting MongoDB

### Error: "connect ECONNREFUSED"

**Cause:** MongoDB server not running

**Solution:**
```powershell
# Check if MongoDB is running
Get-Service MongoDB | Select-Object -Property *

# If stopped, start it
Start-Service MongoDB

# Or use MongoDB shell
mongod
```

### Error: "ERRMONGODB12: Authentication failed"

**Cause:** Wrong connection string

**Solution:**
- Check `.env` file has correct `MONGO_URI`
- Default: `mongodb://localhost:27017/isro-explorer`
- If authentication needed: `mongodb://user:password@host:port/database`

### Error: "E11000 duplicate key error"

**Cause:** Trying to insert duplicate email

**Solution:**
- Email field is unique
- Use different email for testing
- Or clear collection: `db.users.deleteMany({})`

---

**Next Step:** Follow the Multi-Page Application Structure guide to restructure your frontend!

