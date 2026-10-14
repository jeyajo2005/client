import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

/**
 * API protection middleware - accepts either Bearer JWT or active Express Session
 */
export async function protect(req, res, next) {
  try {
    let userId = null;

    // 1. Check Session
    if (req.session && req.session.userId) {
      userId = req.session.userId;
    }

    // 2. Check Bearer Token
    if (!userId && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      const token = req.headers.authorization.split(' ')[1];
      if (token) {
        try {
          const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || 'thirupathi_super_secure_jwt_token_key_2026_xyz'
          );
          userId = decoded.id;
        } catch (err) {
          return res.status(401).json({ success: false, message: 'Invalid or expired authorization token' });
        }
      }
    }

    // 3. Check Cookie Token fallback
    if (!userId && req.cookies && req.cookies.admin_token) {
      try {
        const decoded = jwt.verify(
          req.cookies.admin_token,
          process.env.JWT_SECRET || 'thirupathi_super_secure_jwt_token_key_2026_xyz'
        );
        userId = decoded.id;
      } catch (err) {
        // ignore cookie decode error and proceed to check
      }
    }

    if (!userId) {
      return res.status(401).json({ success: false, message: 'Authentication required. Please log in.' });
    }

    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'User account not found or removed' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('[Auth Error]', error.message);
    return res.status(500).json({ success: false, message: 'Internal server error during authentication' });
  }
}

/**
 * Middleware for protecting HTML admin pages (redirects to /admin/login.html if unauthorized)
 */
export function requireAdminSession(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  }

  // Also check if admin_token cookie exists
  if (req.cookies && req.cookies.admin_token) {
    try {
      const decoded = jwt.verify(
        req.cookies.admin_token,
        process.env.JWT_SECRET || 'thirupathi_super_secure_jwt_token_key_2026_xyz'
      );
      if (decoded && decoded.id) {
        if (req.session) req.session.userId = decoded.id;
        return next();
      }
    } catch (e) {
      // invalid cookie
    }
  }

  // If unauthorized for an HTML page, redirect to login
  return res.redirect('/admin/login.html');
}
