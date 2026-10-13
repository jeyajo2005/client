import { Hero } from '../models/Hero.js';
import { About } from '../models/About.js';
import { Service } from '../models/Service.js';
import { Project } from '../models/Project.js';
import { Experience } from '../models/Experience.js';
import { Achievement } from '../models/Achievement.js';
import { Team } from '../models/Team.js';
import { Testimonial } from '../models/Testimonial.js';
import { Gallery } from '../models/Gallery.js';
import { Settings } from '../models/Settings.js';
import { Inquiry } from '../models/Inquiry.js';

// GET /api/all
// Optimized endpoint that fetches all published content in parallel for public frontend
export async function getAllPortfolioData(req, res, next) {
  try {
    const [
      hero,
      about,
      services,
      projects,
      experience,
      achievements,
      team,
      testimonials,
      gallery,
      settings
    ] = await Promise.all([
      Hero.findOne(),
      About.findOne(),
      Service.find({ isPublished: true }).sort({ order: 1, createdAt: 1 }),
      Project.find({ isPublished: true }).sort({ order: 1, createdAt: -1 }),
      Experience.find({ isPublished: true }).sort({ order: 1, createdAt: 1 }),
      Achievement.find({ isPublished: true }).sort({ order: 1, year: -1 }),
      Team.find({ isPublished: true }).sort({ order: 1, createdAt: 1 }),
      Testimonial.find({ isPublished: true }).sort({ order: 1, createdAt: -1 }),
      Gallery.find({ isPublished: true }).sort({ order: 1, createdAt: -1 }),
      Settings.findOne()
    ]);

    res.json({
      success: true,
      data: {
        hero: hero || {},
        about: about || {},
        services: services || [],
        projects: projects || [],
        experience: experience || [],
        achievements: achievements || [],
        team: team || [],
        testimonials: testimonials || [],
        gallery: gallery || [],
        settings: settings || {}
      }
    });
  } catch (error) {
    next(error);
  }
}

// GET /api/dashboard/stats
export async function getDashboardStats(req, res, next) {
  try {
    const [
      totalProjects,
      totalServices,
      totalGallery,
      totalTeam,
      totalInquiries,
      unreadInquiries
    ] = await Promise.all([
      Project.countDocuments(),
      Service.countDocuments(),
      Gallery.countDocuments(),
      Team.countDocuments(),
      Inquiry.countDocuments(),
      Inquiry.countDocuments({ status: 'unread' })
    ]);

    res.json({
      success: true,
      stats: {
        totalProjects,
        totalServices,
        totalGallery,
        totalTeam,
        totalInquiries,
        unreadInquiries
      }
    });
  } catch (error) {
    next(error);
  }
}
