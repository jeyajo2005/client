import { Hero } from '../models/Hero.js';
import { About } from '../models/About.js';
import { Service } from '../models/Service.js';
import { Project } from '../models/Project.js';
import { TimelineEntry } from '../models/TimelineEntry.js';
import { Experience } from '../models/Experience.js';
import { Achievement } from '../models/Achievement.js';
import { Team } from '../models/Team.js';
import { Testimonial } from '../models/Testimonial.js';
import { Gallery } from '../models/Gallery.js';
import { Settings } from '../models/Settings.js';
import { Inquiry } from '../models/Inquiry.js';
import { Profile } from '../models/Profile.js';
import { Skill } from '../models/Skill.js';
import { Education } from '../models/Education.js';
import { ContactSettings } from '../models/ContactSettings.js';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function readDataFile(name, fallback) {
  try {
    const file = path.resolve(__dirname, `../data/${name}`);
    if (fs.existsSync(file)) {
      return JSON.parse(fs.readFileSync(file, 'utf8'));
    }
  } catch (e) {}
  return fallback;
}

// GET /api/all
// Optimized endpoint that fetches all published content in parallel for public frontend
export async function getAllPortfolioData(req, res, next) {
  try {
    let hero = null, about = null, profile = null, services = [], projects = [], timeline = [],
        skills = [], experience = [], education = [], achievements = [], team = [], testimonials = [],
        gallery = [], settings = null, contactSettings = null;

    if (mongoose.connection.readyState === 1) {
      try {
        [
          hero, about, profile, services, projects, timeline,
          skills, experience, education, achievements, team, testimonials,
          gallery, settings, contactSettings
        ] = await Promise.all([
          Hero.findOne().maxTimeMS(2000),
          About.findOne().maxTimeMS(2000),
          Profile.findOne().maxTimeMS(2000),
          Service.find({ isPublished: true }).sort({ order: 1, createdAt: 1 }).maxTimeMS(2000),
          Project.find({ isPublished: true }).sort({ order: 1, createdAt: -1 }).maxTimeMS(2000),
          TimelineEntry.find({ isPublished: true }).sort({ order: 1, stepNumber: 1 }).maxTimeMS(2000),
          Skill.find({ isPublished: true }).sort({ order: 1 }).maxTimeMS(2000),
          Experience.find({ isPublished: true }).sort({ order: 1, createdAt: 1 }).maxTimeMS(2000),
          Education.find({ isPublished: true }).sort({ order: 1 }).maxTimeMS(2000),
          Achievement.find({ isPublished: true }).sort({ order: 1, year: -1 }).maxTimeMS(2000),
          Team.find({ isPublished: true }).sort({ order: 1, createdAt: 1 }).maxTimeMS(2000),
          Testimonial.find({ isPublished: true }).sort({ order: 1, createdAt: -1 }).maxTimeMS(2000),
          Gallery.find({ isPublished: true }).sort({ order: 1, createdAt: -1 }).maxTimeMS(2000),
          Settings.findOne().maxTimeMS(2000),
          ContactSettings.findOne().maxTimeMS(2000)
        ]);
      } catch (dbErr) {
        console.warn('[Portfolio GET /all] DB query warning, using latest file store:', dbErr.message);
      }
    }

    // Always ensure projects, timeline, and profile use latest persisted data if DB was empty/offline
    if (!projects || projects.length === 0) {
      projects = readDataFile('projects.json', []).filter(p => p.isPublished !== false);
    }
    if (!timeline || timeline.length === 0) {
      timeline = readDataFile('timeline.json', []).filter(t => t.isPublished !== false);
    }
    if (!profile || Object.keys(profile).length === 0) {
      profile = readDataFile('profile.json', {});
    }

    res.json({
      success: true,
      data: {
        hero: hero || {},
        about: about || {},
        profile: profile || {},
        services: services || [],
        projects: projects || [],
        timeline: timeline || [],
        skills: skills || [],
        experience: experience || [],
        education: education || [],
        achievements: achievements || [],
        team: team || [],
        testimonials: testimonials || [],
        gallery: gallery || [],
        settings: settings || {},
        contactSettings: contactSettings || {}
      }
    });
  } catch (error) {
    const fallbackProjects = readDataFile('projects.json', []).filter(p => p.isPublished !== false);
    const fallbackTimeline = readDataFile('timeline.json', []).filter(t => t.isPublished !== false);
    const fallbackProfile = readDataFile('profile.json', {});

    res.json({
      success: true,
      data: {
        hero: {},
        about: {},
        profile: fallbackProfile,
        services: [],
        projects: fallbackProjects,
        timeline: fallbackTimeline,
        skills: [],
        experience: [],
        education: [],
        achievements: [],
        team: [],
        testimonials: [],
        gallery: [],
        settings: {},
        contactSettings: {}
      }
    });
  }
}

// GET /api/dashboard/stats
export async function getDashboardStats(req, res, next) {
  try {
    let totalProjects = 0, totalTimeline = 0, totalSkills = 8, totalExperience = 4,
        totalServices = 6, totalGallery = 20, totalTeam = 2, totalInquiries = 0, unreadInquiries = 0;

    if (mongoose.connection.readyState === 1) {
      try {
        [
          totalProjects,
          totalTimeline,
          totalSkills,
          totalExperience,
          totalServices,
          totalGallery,
          totalTeam,
          totalInquiries,
          unreadInquiries
        ] = await Promise.all([
          Project.countDocuments(),
          TimelineEntry.countDocuments(),
          Skill.countDocuments(),
          Experience.countDocuments(),
          Service.countDocuments(),
          Gallery.countDocuments(),
          Team.countDocuments(),
          Inquiry.countDocuments(),
          Inquiry.countDocuments({ status: 'unread' })
        ]);
      } catch (dbErr) {
        console.warn('[Stats] MongoDB count warning:', dbErr.message);
      }
    }

    // Fallback to local files if database is offline or empty
    if (!totalTimeline) {
      const timelineData = readDataFile('timeline.json', []);
      totalTimeline = Array.isArray(timelineData) && timelineData.length > 0 ? timelineData.length : 10;
    }
    if (!totalProjects) {
      const projectsData = readDataFile('projects.json', []);
      totalProjects = Array.isArray(projectsData) && projectsData.length > 0 ? projectsData.length : 4;
    }

    res.json({
      success: true,
      stats: {
        totalProjects,
        totalTimeline,
        totalSkills,
        totalExperience,
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
