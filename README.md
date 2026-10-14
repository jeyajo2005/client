# Thirupathi Engineers — Portfolio & Admin Dashboard

Official website and Full-Stack Management Platform for **Thirupathi Engineers** — Premier Mechanical Industrial Structural & Equipment Erection Partnership Firm.

---

## 🏗️ Architecture & Technology Stack

- **Public Frontend**: Semantic HTML5, Vanilla CSS3 (Architectural Dark Theme with Electric Cyan & Blue accents), Vanilla JavaScript interactive engine.
- **Admin Dashboard**: Modern Dark UI located at `/admin` (`login.html`, `dashboard.html`, `timeline.html`, `projects.html`, `profile.html`) built with Vanilla HTML/CSS/JS.
- **Backend**: Node.js & Express.js REST API with ES Modules.
- **Database**: MongoDB with Mongoose ODM.
- **Authentication & Security**: Express Session + JWT Token, Bcrypt password hashing, Helmet security headers, Express Rate Limiting, and Cookie Parser.
- **Media Uploads**: Multer handling multipart/form-data with safe unique naming and MIME validation in `uploads/`.

---

## 🚀 Quick Start

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local service or MongoDB Atlas connection string)

### 2. Environment Configuration
Create a `.env` file in the project root (copied from `.env.example`):

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/thirupathi_portfolio
SESSION_SECRET=thirupathi_session_secret_change_in_production_key_2026_!@#
JWT_SECRET=thirupathi_super_secure_jwt_token_key_2026_xyz
ADMIN_DEFAULT_EMAIL=admin@thirupathiengineers.com
ADMIN_DEFAULT_PASSWORD=Admin@Thirupathi2026
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Seed the Database
Populates MongoDB with all 10 historical serpentine timeline steps, 4 showcase projects, partner profiles, capabilities, skills, and admin account:

```bash
npm run seed
```

### 5. Run the Application
```bash
# Production start
npm start

# Or Development with auto-reload
npm run dev
```

Visit:
- **Public Website**: `http://localhost:5000/`
- **Admin Portal**: `http://localhost:5000/admin`
  - **Email**: `admin@thirupathiengineers.com`
  - **Password**: `Admin@Thirupathi2026`

---

## 📂 Project Folder Structure

```
portfolio/
├── index.html                   # Public portfolio frontend
├── admin/                       # Modern Dark-Themed Admin Dashboard
│   ├── login.html               # Admin authentication portal
│   ├── dashboard.html           # Executive stats & activity overview
│   ├── timeline.html            # Serpentine Timeline CRUD + live preview
│   ├── projects.html            # Showcase Projects CRUD
│   ├── profile.html             # Partners profile, skills, contacts
│   ├── admin.css                # Dashboard design system & glassmorphism
│   └── admin.js                 # Frontend admin logic & API client
├── assets/                      # Public images & plant photography
├── uploads/                     # User-uploaded images via Multer
├── css/
│   └── style.css                # Public website styling
├── js/
│   └── main.js                  # Public website interactive engine
├── backend/
│   ├── config/
│   │   └── db.js                # MongoDB Mongoose connection
│   ├── controllers/             # Express route controllers
│   ├── middleware/              # Auth, Upload, Error handler
│   ├── models/                  # Mongoose Schemas (TimelineEntry, Project, User, etc.)
│   ├── routes/                  # REST API routes
│   └── scripts/
│       └── seed.js              # Initial database population script
├── server.js                    # Unified Express application server
├── .env.example                 # Environment configuration template
├── package.json                 # Project dependencies and npm scripts
└── README.md
```

---

## 🔌 REST API Endpoints

### Authentication
- `POST /api/auth/login` — Authenticate admin, start session, set cookie & return JWT.
- `POST /api/auth/logout` — Terminate session and clear credentials.
- `GET /api/auth/me` — Verify current session/token and get user info.

### Serpentine Timeline (`TimelineEntry`)
- `GET /api/timeline` — Public list of published milestones (or all if `?admin=true`).
- `POST /api/timeline` — Create new milestone (Protected).
- `PUT /api/timeline/:id` — Update existing milestone (Protected).
- `DELETE /api/timeline/:id` — Remove milestone (Protected).
- `PUT /api/timeline/reorder` — Reorder milestone steps & positions (Protected).

### Showcase Projects (`Project`)
- `GET /api/projects` — Public list of featured projects.
- `POST /api/projects` — Create project record (Protected).
- `PUT /api/projects/:id` — Update project specifications (Protected).
- `DELETE /api/projects/:id` — Remove project (Protected).

### Profile, Skills & Settings
- `GET /api/profile` & `PUT /api/profile` — Managing partner biographical information.
- `GET /api/skills` & `POST/PUT/DELETE /api/skills` — Core competencies & proficiency.
- `GET /api/contact-settings` & `PUT /api/contact-settings` — Official communication details.
- `POST /api/contact` — Public inquiry submission.
- `GET /api/inquiries` — View client inquiries (Protected).
- `POST /api/upload` — Upload image file using Multer (Protected).
- `GET /api/dashboard/stats` — Metrics count for dashboard cards.

---

## 🔒 Security Features
1. **Password Hashing**: Bcrypt with 10 salt rounds.
2. **Session & JWT Authentication**: Dual session cookie and Bearer token verification.
3. **HTTP Security Headers**: Configured via `helmet`.
4. **Rate Limiting**: Brute-force protection on authentication routes.
5. **Sanitization**: XSS prevention in frontend rendering.
6. **File Upload Hardening**: MIME type validation (JPEG, PNG, WEBP, SVG) with size cap (15MB) and unique suffixes.
