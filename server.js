import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env configuration
dotenv.config({ path: path.resolve(__dirname, '.env') });

import { connectDB } from './backend/config/db.js';
import { errorHandler } from './backend/middleware/errorHandler.js';

// Route Imports
import authRoutes from './backend/routes/authRoutes.js';
import heroRoutes from './backend/routes/heroRoutes.js';
import timelineRoutes from './backend/routes/timelineRoutes.js';
import projectRoutes from './backend/routes/projectRoutes.js';
import profileRoutes from './backend/routes/profileRoutes.js';
import skillRoutes from './backend/routes/skillRoutes.js';
import experienceRoutes from './backend/routes/experienceRoutes.js';
import educationRoutes from './backend/routes/educationRoutes.js';
import contactSettingsRoutes from './backend/routes/contactSettingsRoutes.js';
import serviceRoutes from './backend/routes/serviceRoutes.js';
import achievementRoutes from './backend/routes/achievementRoutes.js';
import teamRoutes from './backend/routes/teamRoutes.js';
import testimonialRoutes from './backend/routes/testimonialRoutes.js';
import galleryRoutes from './backend/routes/galleryRoutes.js';
import contactRoutes from './backend/routes/contactRoutes.js';
import settingsRoutes from './backend/routes/settingsRoutes.js';
import uploadRoutes from './backend/routes/uploadRoutes.js';
import portfolioRoutes from './backend/routes/portfolioRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Security Headers with Helmet
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com", "https://fonts.googleapis.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdnjs.cloudflare.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com", "data:"],
      imgSrc: ["'self'", "data:", "blob:", "http:", "https:"],
      connectSrc: ["'self'", "http://localhost:*", "http://127.0.0.1:*", "ws://localhost:*"]
    }
  },
  crossOriginEmbedderPolicy: false
}));

// CORS Configuration
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
      callback(null, true); // Dev/Staging permissive
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control', 'Pragma']
}));

// Body and Cookie Parsers
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));
app.use(cookieParser());

// Express Session Management
app.use(session({
  name: 'thirupathi_admin_sid',
  secret: process.env.SESSION_SECRET || 'thirupathi_session_secret_change_in_production_key_2026_!@#',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    sameSite: 'lax'
  }
}));

// Rate Limiting for Auth Endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // 30 requests per window
  message: { success: false, message: 'Too many authentication attempts, please try again in 15 minutes.' }
});

// Cache-Control headers for dynamic API responses
app.use('/api', (req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  next();
});

// Static Folders
app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')));
app.use('/assets', express.static(path.resolve(__dirname, 'assets')));
app.use('/css', express.static(path.resolve(__dirname, 'css')));
app.use('/js', express.static(path.resolve(__dirname, 'js')));
app.use('/admin', express.static(path.resolve(__dirname, 'admin')));

// Favicon endpoints
app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'favicon.ico'));
});
app.get('/favicon.svg', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'favicon.svg'));
});
app.get('/favicon.png', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'favicon.png'));
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'Thirupathi ENGINEERING MERN Portfolio API & Admin'
  });
});

// API Routes
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/hero', heroRoutes);
app.use('/api/timeline', timelineRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/contact-settings', contactSettingsRoutes);
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
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

// Central Error Handler
app.use(errorHandler);

// Start Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`================================================================`);
  console.log(`[Thirupathi ENGINEERING Server] Running on http://localhost:${PORT}`);
  console.log(`[Public Portfolio]            http://localhost:${PORT}/`);
  console.log(`[Admin Dashboard]            http://localhost:${PORT}/admin`);
  console.log(`[REST API Root]              http://localhost:${PORT}/api/all`);
  console.log(`[Serpentine Timeline API]    http://localhost:${PORT}/api/timeline`);
  console.log(`================================================================`);
});
