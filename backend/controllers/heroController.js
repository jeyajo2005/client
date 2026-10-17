import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Hero } from '../models/Hero.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.resolve(__dirname, '../data/hero.json');

// Default hero data matching the static index.html content
let cachedHero = {
  heading: 'M. Mohan, K. Gopala Krishnan',
  name1: 'M. Mohan',
  name2: 'K. Gopala Krishnan',
  subtitle: 'MANAGING PARTNERS · THIRUPATHI ENGINEERING',
  description: 'Premier mechanical industrial structural & equipment erection partnership firm. Proven execution in 20 MW thermal power plant non-IBR structures, ACC cooling towers, cement plant clinker silos, packing plants, sizer crushers, and bulk handling systems.',
  badgeText: 'MECHANICAL & INDUSTRIAL STRUCTURES',
  badgeLoc: 'TAMIL NADU · INDIA',
  primaryCtaText: 'Discuss Your Next Structure',
  primaryCtaLink: '#contact',
  secondaryCtaText: 'View Project Record',
  secondaryCtaLink: '#projects',
  bgImageUrl: 'assets/images/hero_colorful_plant.jpg',
  logoUrl: '',
  contactEmail: 'thirupathiengineerings@gmail.com',
  contactPhone: '+91 9043288002'
};

// Load persisted hero from JSON file if available
try {
  if (fs.existsSync(DATA_FILE)) {
    const fileData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    if (fileData && typeof fileData === 'object') {
      cachedHero = { ...cachedHero, ...fileData };
    }
  }
} catch (e) {
  console.warn('[Hero] File read fallback:', e.message);
}

function persistHeroFile() {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(cachedHero, null, 2), 'utf8');
  } catch (e) {
    console.warn('[Hero] File save warning:', e.message);
  }
}

// GET /api/hero
export async function getHero(req, res, next) {
  try {
    if (mongoose.connection.readyState === 1) {
      try {
        const hero = await Hero.findOne().maxTimeMS(2000);
        if (hero) {
          cachedHero = { ...cachedHero, ...hero.toObject() };
          persistHeroFile();
          return res.json({ success: true, data: hero });
        }
      } catch (e) {
        console.warn('[Hero GET] DB query warning:', e.message);
      }
    }
    res.json({ success: true, data: cachedHero });
  } catch (error) {
    res.json({ success: true, data: cachedHero });
  }
}

// PUT /api/hero
export async function updateHero(req, res, next) {
  try {
    // Update active cache immediately
    cachedHero = { ...cachedHero, ...req.body };
    persistHeroFile();

    if (mongoose.connection.readyState === 1) {
      try {
        let hero = await Hero.findOne().maxTimeMS(2000);
        if (!hero) {
          hero = await Hero.create(cachedHero);
        } else {
          hero = await Hero.findByIdAndUpdate(hero._id, req.body, { new: true, runValidators: true });
        }
        return res.json({ success: true, data: hero, message: 'Hero section updated successfully' });
      } catch (dbErr) {
        console.warn('[Hero PUT] DB async update warning:', dbErr.message);
      }
    }

    res.json({ success: true, data: cachedHero, message: 'Hero section updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
