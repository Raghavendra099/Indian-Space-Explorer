# 🏗️ MULTI-PAGE APPLICATION RESTRUCTURE GUIDE

## Current Structure (Single Page App - SPA)

```
frontend/
├── index.html         (Contains ALL sections)
├── css/
│   └── styles.css     (All styles)
└── js/
    ├── api.js         (API calls)
    └── main.js        (All logic)
```

**Problem:** Everything in one file, hard to maintain and scale

---

## New Structure (Multi-Page App - MPA)

```
frontend/
├── index.html              (Header, Nav, Footer only)
├── pages/
│   ├── missions.html      (Missions page)
│   ├── photos.html        (Photos page)
│   ├── videos.html        (Videos page)
│   ├── about.html         (About page)
│   ├── contact.html       (Contact page)
│   ├── login.html         (Login page)
│   └── register.html      (Register page)
│
├── css/
│   ├── styles.css         (Base styles)
│   ├── pages/
│   │   ├── missions.css
│   │   ├── photos.css
│   │   ├── videos.css
│   │   ├── about.css
│   │   ├── contact.css
│   │   ├── login.css
│   │   └── register.css
│   └── components/
│       ├── navbar.css
│       └── footer.css
│
└── js/
    ├── api.js             (API calls - same as before)
    ├── auth.js            (Authentication logic)
    ├── utils.js           (Helper functions)
    └── pages/
        ├── missions.js
        ├── photos.js
        ├── videos.js
        ├── about.js
        ├── contact.js
        ├── login.js
        └── register.js
```

---

## Step 1: Update index.html (Header, Nav, Footer Only)

**Modify file:** `frontend/index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Indian Space Explorer - ISRO Missions</title>
    
    <!-- Stylesheets -->
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="css/components/navbar.css">
    <link rel="stylesheet" href="css/components/footer.css">
    
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <!-- Navigation Bar -->
    <nav class="navbar">
        <div class="nav-container">
            <!-- Logo -->
            <a href="index.html" class="nav-logo">
                <i class="fas fa-rocket"></i> ISRO Explorer
            </a>
            
            <!-- Navigation Links -->
            <ul class="nav-menu">
                <li class="nav-item">
                    <a href="pages/missions.html" class="nav-link">Missions</a>
                </li>
                <li class="nav-item">
                    <a href="pages/photos.html" class="nav-link">Photos</a>
                </li>
                <li class="nav-item">
                    <a href="pages/videos.html" class="nav-link">Videos</a>
                </li>
                <li class="nav-item">
                    <a href="pages/about.html" class="nav-link">About</a>
                </li>
                <li class="nav-item">
                    <a href="pages/contact.html" class="nav-link">Contact</a>
                </li>
                <li class="nav-item">
                    <a href="pages/login.html" class="nav-link auth-link">Login</a>
                </li>
            </ul>
            
            <!-- Hamburger Menu -->
            <div class="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </nav>

    <!-- Main Content Area (Page specific content goes here) -->
    <main id="main-content">
        <!-- Home Page Content -->
        <section class="hero">
            <canvas id="canvas"></canvas>
            <div class="hero-content">
                <h1>Indian Space Exploration</h1>
                <p>Journey through India's groundbreaking space missions</p>
                <a href="pages/missions.html" class="btn btn-primary">Explore Missions</a>
            </div>
            
            <!-- Stats -->
            <div class="hero-stats">
                <div class="stat">
                    <h3 data-target="125">0</h3>
                    <p>Missions</p>
                </div>
                <div class="stat">
                    <h3 data-target="431">0</h3>
                    <p>Satellites</p>
                </div>
                <div class="stat">
                    <h3 data-target="34">0</h3>
                    <p>Countries</p>
                </div>
                <div class="stat">
                    <h3 data-target="58">0</h3>
                    <p>Years Active</p>
                </div>
            </div>
        </section>
    </main>

    <!-- Footer -->
    <footer class="footer">
        <div class="footer-container">
            <div class="footer-content">
                <div class="footer-section">
                    <h4>ISRO Explorer</h4>
                    <p>Showcasing India's space achievements</p>
                </div>
                <div class="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="pages/missions.html">Missions</a></li>
                        <li><a href="pages/about.html">About ISRO</a></li>
                        <li><a href="pages/contact.html">Contact Us</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Follow Us</h4>
                    <div class="social-links">
                        <a href="#" target="_blank"><i class="fab fa-facebook"></i></a>
                        <a href="#" target="_blank"><i class="fab fa-twitter"></i></a>
                        <a href="#" target="_blank"><i class="fab fa-instagram"></i></a>
                        <a href="#" target="_blank"><i class="fab fa-youtube"></i></a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2024 ISRO Space Explorer. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <!-- Scripts -->
    <script src="js/api.js"></script>
    <script src="js/auth.js"></script>
    <script src="js/utils.js"></script>
    <script>
        // Home page initialization
        document.addEventListener('DOMContentLoaded', () => {
            createStars();
            animateCounter();
            setupNavbar();
            checkUserLogin();
        });

        // Create star animation
        function createStars() {
            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            const stars = [];
            for (let i = 0; i < 180; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 1.5,
                    opacity: Math.random() * 0.5 + 0.5
                });
            }

            function animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                stars.forEach(star => {
                    star.opacity += Math.random() * 0.02 - 0.01;
                    star.opacity = Math.max(0.2, Math.min(1, star.opacity));
                    ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
                    ctx.fillRect(star.x, star.y, star.radius, star.radius);
                });
                requestAnimationFrame(animate);
            }
            animate();
        }

        // Animate counters
        function animateCounter() {
            const stats = document.querySelectorAll('.stat h3');
            stats.forEach(stat => {
                const target = parseInt(stat.dataset.target);
                let current = 0;
                const increment = target / 50;

                const counter = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        stat.textContent = target;
                        clearInterval(counter);
                    } else {
                        stat.textContent = Math.floor(current);
                    }
                }, 30);
            });
        }

        // Setup navbar
        function setupNavbar() {
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.querySelector('.nav-menu');

            hamburger.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });

            document.addEventListener('click', (e) => {
                if (!e.target.closest('.navbar')) {
                    navMenu.classList.remove('active');
                }
            });

            window.addEventListener('scroll', () => {
                document.querySelector('.navbar').classList.toggle(
                    'scrolled',
                    window.scrollY > 60
                );
            });
        }

        // Check if user is logged in
        function checkUserLogin() {
            const token = localStorage.getItem('token');
            const loginLink = document.querySelector('.auth-link');
            
            if (token) {
                loginLink.textContent = 'Logout';
                loginLink.href = '#';
                loginLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    alert('Logged out successfully');
                    location.reload();
                });
            }
        }
    </script>
</body>
</html>
```

---

## Step 2: Create Missions Page

**Create file:** `frontend/pages/missions.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Missions - ISRO Explorer</title>
    
    <link rel="stylesheet" href="../css/styles.css">
    <link rel="stylesheet" href="../css/components/navbar.css">
    <link rel="stylesheet" href="../css/components/footer.css">
    <link rel="stylesheet" href="../css/pages/missions.css">
    
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <!-- Navigation Bar -->
    <nav class="navbar">
        <div class="nav-container">
            <a href="../index.html" class="nav-logo">
                <i class="fas fa-rocket"></i> ISRO Explorer
            </a>
            <ul class="nav-menu">
                <li class="nav-item">
                    <a href="missions.html" class="nav-link active">Missions</a>
                </li>
                <li class="nav-item">
                    <a href="photos.html" class="nav-link">Photos</a>
                </li>
                <li class="nav-item">
                    <a href="videos.html" class="nav-link">Videos</a>
                </li>
                <li class="nav-item">
                    <a href="about.html" class="nav-link">About</a>
                </li>
                <li class="nav-item">
                    <a href="contact.html" class="nav-link">Contact</a>
                </li>
                <li class="nav-item">
                    <a href="login.html" class="nav-link auth-link">Login</a>
                </li>
            </ul>
            <div class="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <main class="main-content">
        <section class="missions-section">
            <h1>ISRO Missions</h1>
            <p class="section-desc">Explore India's groundbreaking space missions</p>
            
            <div id="missionsGrid" class="missions-grid">
                <!-- Missions loaded dynamically -->
            </div>
        </section>
    </main>

    <!-- Footer -->
    <footer class="footer">
        <div class="footer-container">
            <div class="footer-content">
                <div class="footer-section">
                    <h4>ISRO Explorer</h4>
                    <p>Showcasing India's space achievements</p>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2024 ISRO Space Explorer. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <!-- Scripts -->
    <script src="../js/api.js"></script>
    <script src="../js/auth.js"></script>
    <script src="../js/utils.js"></script>
    <script src="../js/pages/missions.js"></script>
</body>
</html>
```

---

## Step 3: Create Missions Page JavaScript

**Create file:** `frontend/js/pages/missions.js`

```javascript
// Initialize missions page
document.addEventListener('DOMContentLoaded', async () => {
    setupNavbar();
    checkUserLogin();
    loadMissions();
});

// Load missions from API
async function loadMissions() {
    try {
        console.log('Loading missions...');
        const missions = await window.SpaceAPI.getMissions();
        
        if (missions && missions.length > 0) {
            renderMissions(missions);
        } else {
            showError('No missions found');
        }
    } catch (error) {
        console.error('Error loading missions:', error);
        showError('Failed to load missions. Please try again.');
    }
}

// Render missions to DOM
function renderMissions(missions) {
    const grid = document.getElementById('missionsGrid');
    grid.innerHTML = '';

    missions.forEach(mission => {
        const missionCard = document.createElement('article');
        missionCard.className = 'mission-card';
        missionCard.innerHTML = `
            <div class="mission-icon">${mission.icon || '🚀'}</div>
            <h3 class="mission-title">${mission.title}</h3>
            <p class="mission-year">${mission.year}</p>
            <p class="mission-desc">${mission.description}</p>
            <span class="mission-status" style="background-color: ${mission.statusColor};">
                ${mission.status}
            </span>
            <a href="${mission.link || '#'}" target="_blank" class="mission-link">
                Learn More →
            </a>
        `;

        grid.appendChild(missionCard);
    });
}

// Show error message
function showError(message) {
    const grid = document.getElementById('missionsGrid');
    grid.innerHTML = `<div class="error-message">${message}</div>`;
}

// Setup navbar
function setupNavbar() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            navMenu.classList.remove('active');
        }
    });

    window.addEventListener('scroll', () => {
        document.querySelector('.navbar').classList.toggle(
            'scrolled',
            window.scrollY > 60
        );
    });
}

// Check user login
function checkUserLogin() {
    const token = localStorage.getItem('token');
    const loginLink = document.querySelector('.auth-link');
    
    if (token) {
        loginLink.textContent = 'Logout';
        loginLink.href = '#';
        loginLink.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            alert('Logged out successfully');
            location.reload();
        });
    }
}
```

---

## Step 4: Create Missions Page CSS

**Create file:** `frontend/css/pages/missions.css`

```css
.main-content {
    min-height: 80vh;
    padding: 60px 20px 40px;
    background: linear-gradient(135deg, #0f172a 0%, #1a1f3a 100%);
}

.missions-section {
    max-width: 1200px;
    margin: 0 auto;
}

.missions-section h1 {
    font-size: 3.5rem;
    text-align: center;
    margin-bottom: 10px;
    background: linear-gradient(135deg, #6366f1, #0ea5e9);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-family: 'Orbitron', sans-serif;
    font-weight: 900;
}

.section-desc {
    text-align: center;
    color: #cbd5e1;
    font-size: 1.2rem;
    margin-bottom: 40px;
}

.missions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 30px;
}

.mission-card {
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(14, 165, 233, 0.1));
    border: 1px solid rgba(99, 102, 241, 0.3);
    border-radius: 12px;
    padding: 25px;
    transition: all 0.3s ease;
    cursor: pointer;
}

.mission-card:hover {
    transform: translateY(-8px);
    border-color: #6366f1;
    box-shadow: 0 20px 40px rgba(99, 102, 241, 0.3);
}

.mission-icon {
    font-size: 3rem;
    margin-bottom: 15px;
}

.mission-title {
    font-size: 1.5rem;
    color: #e2e8f0;
    margin-bottom: 8px;
    font-family: 'Orbitron', sans-serif;
}

.mission-year {
    color: #0ea5e9;
    font-weight: bold;
    margin-bottom: 12px;
}

.mission-desc {
    color: #cbd5e1;
    line-height: 1.6;
    margin-bottom: 15px;
    font-size: 0.95rem;
}

.mission-status {
    display: inline-block;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.85rem;
    color: white;
    margin-bottom: 15px;
}

.mission-link {
    display: inline-block;
    color: #0ea5e9;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.3s;
}

.mission-link:hover {
    color: #6366f1;
}

.error-message {
    text-align: center;
    color: #ef4444;
    font-size: 1.2rem;
    padding: 40px;
}

@media (max-width: 768px) {
    .missions-section h1 {
        font-size: 2.5rem;
    }

    .missions-grid {
        grid-template-columns: 1fr;
    }
}
```

---

## Step 5: Create Login Page

**Create file:** `frontend/pages/login.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - ISRO Explorer</title>
    
    <link rel="stylesheet" href="../css/styles.css">
    <link rel="stylesheet" href="../css/components/navbar.css">
    <link rel="stylesheet" href="../css/components/footer.css">
    <link rel="stylesheet" href="../css/pages/login.css">
    
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <!-- Navigation Bar -->
    <nav class="navbar">
        <div class="nav-container">
            <a href="../index.html" class="nav-logo">
                <i class="fas fa-rocket"></i> ISRO Explorer
            </a>
            <ul class="nav-menu">
                <li class="nav-item">
                    <a href="missions.html" class="nav-link">Missions</a>
                </li>
                <li class="nav-item">
                    <a href="login.html" class="nav-link active">Login</a>
                </li>
                <li class="nav-item">
                    <a href="register.html" class="nav-link">Register</a>
                </li>
            </ul>
            <div class="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <main class="main-content">
        <div class="login-container">
            <div class="login-box">
                <h1>Login</h1>
                <p>Welcome back to ISRO Explorer</p>

                <form id="loginForm" class="login-form">
                    <!-- Email -->
                    <div class="form-group">
                        <label for="email">Email Address</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            required
                            placeholder="Enter your email"
                        >
                        <span class="error-text" id="emailError"></span>
                    </div>

                    <!-- Password -->
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            required
                            placeholder="Enter your password"
                        >
                        <span class="error-text" id="passwordError"></span>
                    </div>

                    <!-- Remember Me -->
                    <div class="form-group checkbox">
                        <input type="checkbox" id="rememberMe" name="rememberMe">
                        <label for="rememberMe">Remember me</label>
                    </div>

                    <!-- Submit Button -->
                    <button type="submit" class="btn btn-primary btn-full">
                        <span id="btnText">Login</span>
                        <i id="btnIcon" class="fas fa-spinner fa-spin" style="display: none;"></i>
                    </button>

                    <!-- General Error -->
                    <div id="generalError" class="error-message" style="display: none;"></div>

                    <!-- Success Message -->
                    <div id="successMessage" class="success-message" style="display: none;"></div>
                </form>

                <!-- Footer Links -->
                <div class="form-footer">
                    <p>Don't have an account? <a href="register.html">Register here</a></p>
                    <p><a href="#">Forgot password?</a></p>
                </div>
            </div>
        </div>
    </main>

    <!-- Footer -->
    <footer class="footer">
        <div class="footer-container">
            <div class="footer-bottom">
                <p>&copy; 2024 ISRO Space Explorer. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <!-- Scripts -->
    <script src="../js/api.js"></script>
    <script src="../js/auth.js"></script>
    <script src="../js/utils.js"></script>
    <script src="../js/pages/login.js"></script>
</body>
</html>
```

---

## Step 6: Create Login Page JavaScript

**Create file:** `frontend/js/pages/login.js`

```javascript
document.addEventListener('DOMContentLoaded', () => {
    setupNavbar();
    setupLoginForm();
    checkIfAlreadyLoggedIn();
});

function setupLoginForm() {
    const form = document.getElementById('loginForm');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Clear errors
        clearErrors();
        
        // Validation
        if (!email || !password) {
            showError('generalError', 'Please fill all fields');
            return;
        }
        
        if (!isValidEmail(email)) {
            showError('emailError', 'Invalid email');
            return;
        }
        
        // Show loading
        showLoading();
        
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                showError('generalError', data.message || 'Login failed');
                return;
            }
            
            // Store token and user data
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            // Show success
            showSuccess('Login successful! Redirecting...');
            
            // Redirect after 2 seconds
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 2000);
            
        } catch (error) {
            console.error('Login error:', error);
            showError('generalError', 'Network error. Please try again.');
        } finally {
            hideLoading();
        }
    });
}

function setupNavbar() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger?.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            navMenu?.classList.remove('active');
        }
    });

    window.addEventListener('scroll', () => {
        document.querySelector('.navbar')?.classList.toggle(
            'scrolled',
            window.scrollY > 60
        );
    });
}

function checkIfAlreadyLoggedIn() {
    const token = localStorage.getItem('token');
    if (token) {
        window.location.href = '../index.html';
    }
}

function clearErrors() {
    document.querySelectorAll('.error-text').forEach(el => el.textContent = '');
    document.getElementById('generalError').style.display = 'none';
}

function showError(elementId, message) {
    const element = document.getElementById(elementId);
    element.textContent = message;
    element.style.display = 'block';
}

function showSuccess(message) {
    const element = document.getElementById('successMessage');
    element.textContent = message;
    element.style.display = 'block';
}

function showLoading() {
    document.getElementById('btnText').style.display = 'none';
    document.getElementById('btnIcon').style.display = 'inline';
    document.querySelector('button[type="submit"]').disabled = true;
}

function hideLoading() {
    document.getElementById('btnText').style.display = 'inline';
    document.getElementById('btnIcon').style.display = 'none';
    document.querySelector('button[type="submit"]').disabled = false;
}

function isValidEmail(email) {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
}
```

---

## Step 7: Create Login Page CSS

**Create file:** `frontend/css/pages/login.css`

```css
.main-content {
    min-height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 60px 20px 40px;
    background: linear-gradient(135deg, #0f172a 0%, #1a1f3a 100%);
}

.login-container {
    width: 100%;
    max-width: 450px;
}

.login-box {
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(14, 165, 233, 0.1));
    border: 1px solid rgba(99, 102, 241, 0.3);
    border-radius: 12px;
    padding: 40px 35px;
    backdrop-filter: blur(10px);
}

.login-box h1 {
    font-size: 2.5rem;
    text-align: center;
    color: #e2e8f0;
    margin-bottom: 8px;
    font-family: 'Orbitron', sans-serif;
}

.login-box > p {
    text-align: center;
    color: #cbd5e1;
    margin-bottom: 30px;
}

.login-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.form-group {
    display: flex;
    flex-direction: column;
}

.form-group label {
    color: #e2e8f0;
    margin-bottom: 8px;
    font-weight: 600;
}

.form-group input[type="text"],
.form-group input[type="email"],
.form-group input[type="password"] {
    padding: 12px 15px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(99, 102, 241, 0.3);
    border-radius: 8px;
    color: #e2e8f0;
    font-size: 1rem;
    transition: all 0.3s;
}

.form-group input:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    background: rgba(255, 255, 255, 0.1);
}

.form-group.checkbox {
    flex-direction: row;
    align-items: center;
    margin-bottom: 5px;
}

.form-group.checkbox input[type="checkbox"] {
    width: 18px;
    height: 18px;
    margin-right: 8px;
    cursor: pointer;
}

.form-group.checkbox label {
    margin-bottom: 0;
}

.error-text {
    color: #ef4444;
    font-size: 0.85rem;
    margin-top: 5px;
    display: none;
}

.error-message {
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid #ef4444;
    color: #fca5a5;
    padding: 12px;
    border-radius: 6px;
    text-align: center;
}

.success-message {
    background: rgba(16, 185, 129, 0.1);
    border: 1px solid #10b981;
    color: #86efac;
    padding: 12px;
    border-radius: 6px;
    text-align: center;
}

.btn-full {
    padding: 12px 20px;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
}

.btn-full:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}

.form-footer {
    text-align: center;
    margin-top: 20px;
}

.form-footer p {
    color: #cbd5e1;
    font-size: 0.95rem;
    margin-bottom: 8px;
}

.form-footer a {
    color: #0ea5e9;
    text-decoration: none;
    transition: color 0.3s;
}

.form-footer a:hover {
    color: #6366f1;
}

@media (max-width: 480px) {
    .login-box {
        padding: 30px 20px;
    }

    .login-box h1 {
        font-size: 2rem;
    }
}
```

---

## Step 8: Create Register Page

**Create file:** `frontend/pages/register.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register - ISRO Explorer</title>
    
    <link rel="stylesheet" href="../css/styles.css">
    <link rel="stylesheet" href="../css/components/navbar.css">
    <link rel="stylesheet" href="../css/components/footer.css">
    <link rel="stylesheet" href="../css/pages/login.css">
    
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <!-- Navigation Bar -->
    <nav class="navbar">
        <div class="nav-container">
            <a href="../index.html" class="nav-logo">
                <i class="fas fa-rocket"></i> ISRO Explorer
            </a>
            <ul class="nav-menu">
                <li class="nav-item">
                    <a href="missions.html" class="nav-link">Missions</a>
                </li>
                <li class="nav-item">
                    <a href="login.html" class="nav-link">Login</a>
                </li>
                <li class="nav-item">
                    <a href="register.html" class="nav-link active">Register</a>
                </li>
            </ul>
            <div class="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <main class="main-content">
        <div class="login-container">
            <div class="login-box">
                <h1>Register</h1>
                <p>Join ISRO Explorer community</p>

                <form id="registerForm" class="login-form">
                    <!-- First Name -->
                    <div class="form-group">
                        <label for="firstName">First Name</label>
                        <input 
                            type="text" 
                            id="firstName" 
                            name="firstName" 
                            required
                            placeholder="Enter first name"
                        >
                        <span class="error-text" id="firstNameError"></span>
                    </div>

                    <!-- Last Name -->
                    <div class="form-group">
                        <label for="lastName">Last Name</label>
                        <input 
                            type="text" 
                            id="lastName" 
                            name="lastName" 
                            placeholder="Enter last name"
                        >
                    </div>

                    <!-- Email -->
                    <div class="form-group">
                        <label for="email">Email Address</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            required
                            placeholder="Enter your email"
                        >
                        <span class="error-text" id="emailError"></span>
                    </div>

                    <!-- Phone -->
                    <div class="form-group">
                        <label for="phone">Phone Number</label>
                        <input 
                            type="tel" 
                            id="phone" 
                            name="phone" 
                            placeholder="Enter phone number (optional)"
                        >
                    </div>

                    <!-- Password -->
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            required
                            placeholder="Min 6 characters"
                        >
                        <span class="error-text" id="passwordError"></span>
                    </div>

                    <!-- Confirm Password -->
                    <div class="form-group">
                        <label for="confirmPassword">Confirm Password</label>
                        <input 
                            type="password" 
                            id="confirmPassword" 
                            name="confirmPassword" 
                            required
                            placeholder="Re-enter password"
                        >
                        <span class="error-text" id="confirmPasswordError"></span>
                    </div>

                    <!-- Terms -->
                    <div class="form-group checkbox">
                        <input type="checkbox" id="terms" name="terms" required>
                        <label for="terms">I agree to Terms & Conditions</label>
                    </div>

                    <!-- Submit Button -->
                    <button type="submit" class="btn btn-primary btn-full">
                        <span id="btnText">Create Account</span>
                        <i id="btnIcon" class="fas fa-spinner fa-spin" style="display: none;"></i>
                    </button>

                    <!-- General Error -->
                    <div id="generalError" class="error-message" style="display: none;"></div>

                    <!-- Success Message -->
                    <div id="successMessage" class="success-message" style="display: none;"></div>
                </form>

                <!-- Footer Links -->
                <div class="form-footer">
                    <p>Already have an account? <a href="login.html">Login here</a></p>
                </div>
            </div>
        </div>
    </main>

    <!-- Footer -->
    <footer class="footer">
        <div class="footer-container">
            <div class="footer-bottom">
                <p>&copy; 2024 ISRO Space Explorer. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <!-- Scripts -->
    <script src="../js/api.js"></script>
    <script src="../js/auth.js"></script>
    <script src="../js/utils.js"></script>
    <script src="../js/pages/register.js"></script>
</body>
</html>
```

---

## Step 9: Create Register Page JavaScript

**Create file:** `frontend/js/pages/register.js`

```javascript
document.addEventListener('DOMContentLoaded', () => {
    setupNavbar();
    setupRegisterForm();
    checkIfAlreadyLoggedIn();
});

function setupRegisterForm() {
    const form = document.getElementById('registerForm');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const terms = document.getElementById('terms').checked;
        
        // Clear errors
        clearErrors();
        
        // Validation
        if (!firstName || !email || !password || !confirmPassword) {
            showError('generalError', 'Please fill all required fields');
            return;
        }
        
        if (!isValidEmail(email)) {
            showError('emailError', 'Invalid email address');
            return;
        }
        
        if (password.length < 6) {
            showError('passwordError', 'Password must be at least 6 characters');
            return;
        }
        
        if (password !== confirmPassword) {
            showError('confirmPasswordError', 'Passwords do not match');
            return;
        }
        
        if (!terms) {
            showError('generalError', 'Please agree to terms and conditions');
            return;
        }
        
        // Show loading
        showLoading();
        
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    phone,
                    password,
                    confirmPassword
                })
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                showError('generalError', data.message || 'Registration failed');
                return;
            }
            
            // Store token and user data
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            // Show success
            showSuccess('Account created! Redirecting...');
            
            // Redirect after 2 seconds
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 2000);
            
        } catch (error) {
            console.error('Registration error:', error);
            showError('generalError', 'Network error. Please try again.');
        } finally {
            hideLoading();
        }
    });
}

function setupNavbar() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger?.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            navMenu?.classList.remove('active');
        }
    });

    window.addEventListener('scroll', () => {
        document.querySelector('.navbar')?.classList.toggle(
            'scrolled',
            window.scrollY > 60
        );
    });
}

function checkIfAlreadyLoggedIn() {
    const token = localStorage.getItem('token');
    if (token) {
        window.location.href = '../index.html';
    }
}

function clearErrors() {
    document.querySelectorAll('.error-text').forEach(el => el.textContent = '');
    document.getElementById('generalError').style.display = 'none';
}

function showError(elementId, message) {
    const element = document.getElementById(elementId);
    element.textContent = message;
    element.style.display = 'block';
}

function showSuccess(message) {
    const element = document.getElementById('successMessage');
    element.textContent = message;
    element.style.display = 'block';
}

function showLoading() {
    document.getElementById('btnText').style.display = 'none';
    document.getElementById('btnIcon').style.display = 'inline';
    document.querySelector('button[type="submit"]').disabled = true;
}

function hideLoading() {
    document.getElementById('btnText').style.display = 'inline';
    document.getElementById('btnIcon').style.display = 'none';
    document.querySelector('button[type="submit"]').disabled = false;
}

function isValidEmail(email) {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
}
```

---

## Step 10: Create Utility Functions

**Create file:** `frontend/js/utils.js`

```javascript
// Shared utility functions used across all pages

// Format date
function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Validate email
function isValidEmail(email) {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
}

// Show toast notification
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Get user from localStorage
function getUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
}

// Get token from localStorage
function getToken() {
    return localStorage.getItem('token');
}

// Check if user is authenticated
function isAuthenticated() {
    return !!localStorage.getItem('token');
}

// Logout user
function logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}
```

---

## Step 11: Update API Client

**Modify file:** `frontend/js/api.js` - Add authentication header

```javascript
const API_BASE = '/api';

// Add token to requests if available
function getAuthHeader() {
    const token = localStorage.getItem('token');
    return token ? {
        'Authorization': `Bearer ${token}`
    } : {};
}

// Generic fetch wrapper
async function fetchData(endpoint, options = {}) {
    try {
        const headers = {
            'Content-Type': 'application/json',
            ...getAuthHeader(),
            ...options.headers
        };

        const response = await fetch(`${API_BASE}${endpoint}`, {
            ...options,
            headers
        });

        if (!response.ok) {
            if (response.status === 401) {
                localStorage.removeItem('token');
                window.location.href = 'pages/login.html';
            }
            throw new Error(`HTTP ${response.status}`);
        }

        const json = await response.json();
        if (!json.success) {
            throw new Error(json.message || 'Request failed');
        }

        return json.data;
    } catch (error) {
        console.error(`API Error [${endpoint}]:`, error);
        throw error;
    }
}

// API Methods
const SpaceAPI = {
    missions: {
        getAll: () => fetchData('/missions'),
        getById: (id) => fetchData(`/missions/${id}`)
    },
    photos: {
        getAll: () => fetchData('/photos'),
        getById: (id) => fetchData(`/photos/${id}`)
    },
    videos: {
        getAll: () => fetchData('/videos'),
        getById: (id) => fetchData(`/videos/${id}`)
    },
    stats: {
        getAll: () => fetchData('/stats')
    },
    contact: {
        submit: (data) => fetchData('/contact', {
            method: 'POST',
            body: JSON.stringify(data)
        })
    },
    auth: {
        login: (email, password) => fetchData('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        }),
        register: (userData) => fetchData('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData)
        }),
        getProfile: () => fetchData('/auth/profile')
    }
};

// Export for global use
window.SpaceAPI = SpaceAPI;
```

---

## Step 12: Update server.js with Database

**This was covered in Part 5 & 6 of MongoDB guide**

---

## Complete New Project Structure

```
frontend/
├── index.html                 ✅ New (only header/nav/footer)
├── pages/
│   ├── missions.html         ✅ New
│   ├── photos.html           ✅ New
│   ├── videos.html           ✅ New
│   ├── about.html            ✅ New
│   ├── contact.html          ✅ New
│   ├── login.html            ✅ New
│   └── register.html         ✅ New
├── css/
│   ├── styles.css            (Updated)
│   ├── components/
│   │   ├── navbar.css        ✅ New
│   │   └── footer.css        ✅ New
│   └── pages/
│       ├── missions.css      ✅ New
│       ├── photos.css        ✅ New
│       ├── videos.css        ✅ New
│       ├── about.css         ✅ New
│       ├── contact.css       ✅ New
│       ├── login.css         ✅ New
│       └── register.css      ✅ New
└── js/
    ├── api.js                (Updated)
    ├── auth.js               ✅ New
    ├── utils.js              ✅ New
    └── pages/
        ├── missions.js       ✅ New
        ├── photos.js         ✅ New
        ├── videos.js         ✅ New
        ├── about.js          ✅ New
        ├── contact.js        ✅ New
        ├── login.js          ✅ New
        └── register.js       ✅ New

backend/
├── server.js                 (Updated)
├── routes/
│   ├── api.js               (Updated)
│   └── auth.js              ✅ New
├── models/
│   ├── User.js              ✅ New
│   ├── Mission.js           ✅ New
│   ├── Photo.js             ✅ New
│   ├── Video.js             ✅ New
│   └── Contact.js           ✅ New
├── config/
│   └── db.js                ✅ New
└── scripts/
    └── seedDB.js            ✅ New

Root Files:
├── .env                      ✅ New
├── .gitignore              ✅ New
├── package.json            (Updated)
└── package-lock.json
```

---

## Next Steps:

1. ✅ Create all page files (follow above templates)
2. ✅ Create all CSS files for pages
3. ✅ Create all JavaScript files for pages
4. ✅ Set up MongoDB and models
5. ✅ Update backend routes
6. ✅ Test all pages
7. ✅ Test authentication (register/login)

---

**This is a complete restructure from SPA to MPA with full authentication!**

