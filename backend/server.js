import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import session from 'express-session';
import cookieParser from 'cookie-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from root or local
dotenv.config({ path: path.resolve(__dirname, '../.env') });
if (!process.env.MONGO_URI) {
  dotenv.config({ path: path.resolve(__dirname, '.env') });
}

import { connectDB } from './config/db.js';
import { errorHandler } from './middleware/errorHandler.js';

// Route Imports
import authRoutes from './routes/authRoutes.js';
import timelineRoutes from './routes/timelineRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import skillRoutes from './routes/skillRoutes.js';
import experienceRoutes from './routes/experienceRoutes.js';
import educationRoutes from './routes/educationRoutes.js';
import contactSettingsRoutes from './routes/contactSettingsRoutes.js';
import heroRoutes from './routes/heroRoutes.js';
import aboutRoutes from './routes/aboutRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import achievementRoutes from './routes/achievementRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import portfolioRoutes from './routes/portfolioRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:5000',
  'http://localhost:8085',
  'http://127.0.0.1:5000',
  'http://127.0.0.1:8085',
  'https://thirupathiengineering.vercel.app',
  'https://thirupathiengineering01.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || origin.includes('localhost') || origin.includes('127.0.0.1')) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control', 'Pragma']
}));

// Body parsing middleware
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));
app.use(cookieParser());

// Express Session
app.use(session({
  name: 'thirupathi_admin_sid',
  secret: process.env.SESSION_SECRET || 'thirupathi_session_secret_change_in_production_key_2026_!@#',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: 'lax'
  }
}));

// Cache prevention on API endpoints
app.use('/api', (req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  next();
});

// Static files (from root directory and backend directory)
const rootDir = path.resolve(__dirname, '..');
app.use('/uploads', express.static(path.resolve(rootDir, 'uploads')));
app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')));
app.use('/assets', express.static(path.resolve(rootDir, 'assets')));
app.use('/css', express.static(path.resolve(rootDir, 'css')));
app.use('/js', express.static(path.resolve(rootDir, 'js')));
app.use('/admin', express.static(path.resolve(rootDir, 'admin')));

// Favicon endpoints
app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.resolve(rootDir, 'favicon.ico'));
});
app.get('/favicon.svg', (req, res) => {
  res.sendFile(path.resolve(rootDir, 'favicon.svg'));
});
app.get('/favicon.png', (req, res) => {
  res.sendFile(path.resolve(rootDir, 'favicon.png'));
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'Thirupathi ENGINEERING REST API'
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/timeline', timelineRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/contact-settings', contactSettingsRoutes);
app.use('/api/hero', heroRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api', contactRoutes); // For /api/inquiries
app.use('/api/settings', settingsRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api', portfolioRoutes); // For /api/all and /api/dashboard/stats

// Admin base redirect
app.get('/admin', (req, res) => {
  if (req.session && req.session.userId) {
    return res.redirect('/admin/dashboard.html');
  }
  return res.redirect('/admin/login.html');
});

// Public Homepage
app.get('/', (req, res) => {
  res.sendFile(path.resolve(rootDir, 'index.html'));
});

// Central Error Handling
app.use(errorHandler);

// Start Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`====================================================`);
  console.log(`[Express API] Server running on http://localhost:${PORT}`);
  console.log(`[Admin Portal] http://localhost:${PORT}/admin`);
  console.log(`[Admin Dashboard] http://localhost:${PORT}/admin/dashboard.html`);
  console.log(`[REST Endpoints] http://localhost:${PORT}/api/all`);
  console.log(`====================================================`);
});
