import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Profile } from '../models/Profile.js';
import { Hero } from '../models/Hero.js';
import { About } from '../models/About.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.resolve(__dirname, '../data/profile.json');

// In-memory fallback cache so changes persist reliably even during MongoDB reconnection
let cachedProfile = {
  partner1: 'M. Mohan',
  partner1Role: 'Industrial Erection & Field Operations Lead',
  partner1Exp: '50+ YEARS EXPERIENCE',
  partner1Bio: 'With over 50 years of distinguished experience in industrial construction across steel plants and cement manufacturing facilities, Mr. M. Mohan is a veteran erection specialist. His construction journey began in 1985 at Gold Star Steel Plant, progressing into cement plant construction in 1990. Landmark milestones include the total plant commissioning of Gold Star Steel Plant in 1992, total plant erection of Camplastic Pipe in 1998, Parryware Tiles company erection in 2005, and multiple cement mill and structural erections across various sites for The Ramco Cements Ltd. He personally leads heavy crane rigging sequencing, non-IBR structural framing, and workforce safety.',
  partner1Phone: '+91 9043288002',
  partner1Email: 'thirupathiengineerings@gmail.com',
  partner2: 'K. Gopala Krishnan',
  partner2Role: 'Mechanical Engineer',
  partner2Exp: '15 YEARS EXPERIENCE',
  partner2Bio: 'Bringing nearly 15 years of rigorous engineering leadership in mechanical industrial structures and equipment erection. Commenced his engineering career in the steel plant sector in 2012 and transitioned to cement plant structural erection in 2016, serving in key capacities as Engineer and Project Manager across multiple reputed industrial engineering companies before co-leading Thirupathi ENGINEERING. He specializes in mechanical structural design interpretation, equipment alignment, clinker silo structural frameworks, high-elevation conveyor galleries, drawing audits, and statutory quality sign-offs.',
  partner2Phone: '+91 9790520126',
  partner2Email: 'gopalkannan5@gmail.com',
  title: 'MANAGING PARTNERS · THIRUPATHI ENGINEERING',
  name: 'M. Mohan, K. Gopala Krishnan',
  experienceYears: 50,
  foundingYear: 1985,
  heroDescription: 'Premier mechanical industrial structural & equipment erection partnership firm. Proven execution in 20 MW thermal power plant non-IBR structures, ACC cooling towers, cement plant clinker silos, packing plants, sizer crushers, and bulk handling systems.',
  aboutDescription: 'Thirupathi ENGINEERING is an industrial mechanical structural and equipment erection partnership firm founded on direct job-site execution leadership. With lineage stretching back to 1985 in major steel plant construction and expanding into cement manufacturing facilities by 1990, managing partners M. Mohan and K. Gopalakrishnan deliver decades of combined industry lineage.',
  partner1Image: 'assets/images/mohan.png',
  partner2Image: 'assets/images/gopalakrishnan.jpg'
};

try {
  if (fs.existsSync(DATA_FILE)) {
    const fileData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    if (fileData && typeof fileData === 'object') {
      cachedProfile = { ...cachedProfile, ...fileData };
    }
  }
} catch (e) {
  console.warn('[Profile] File read fallback:', e.message);
}

function persistProfileFile() {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(cachedProfile, null, 2), 'utf8');
  } catch (e) {
    console.warn('[Profile] File save warning:', e.message);
  }
}

// GET /api/profile
export async function getProfile(req, res) {
  try {
    if (mongoose.connection.readyState === 1) {
      const profile = await Profile.findOne().maxTimeMS(2000);
      if (profile) {
        cachedProfile = { ...cachedProfile, ...profile.toObject() };
        persistProfileFile();
      }
    }
    return res.json({ success: true, data: cachedProfile });
  } catch (error) {
    console.warn('[Profile GET] Returning active cached profile:', error.message);
    return res.json({ success: true, data: cachedProfile });
  }
}

// PUT /api/profile
export async function updateProfile(req, res) {
  try {
    // Update active cache immediately
    cachedProfile = { ...cachedProfile, ...req.body };
    persistProfileFile();

    if (mongoose.connection.readyState === 1) {
      try {
        let profile = await Profile.findOne().maxTimeMS(2000);
        if (!profile) {
          profile = await Profile.create(cachedProfile);
        } else {
          profile = await Profile.findByIdAndUpdate(profile._id, cachedProfile, { new: true, runValidators: true });
        }

        // Also sync with Hero and About models if they exist
        await Hero.findOneAndUpdate({}, {
          heading: cachedProfile.name,
          name1: cachedProfile.partner1,
          name2: cachedProfile.partner2,
          subtitle: cachedProfile.title,
          description: cachedProfile.heroDescription
        }, { upsert: true });

        await About.findOneAndUpdate({}, {
          companyIntro: cachedProfile.aboutDescription,
          experienceYears: cachedProfile.experienceYears,
          foundingYear: cachedProfile.foundingYear
        }, { upsert: true });
      } catch (dbErr) {
        console.warn('[Profile PUT] DB async sync warning:', dbErr.message);
      }
    }

    return res.json({
      success: true,
      message: 'Partner profiles updated successfully',
      data: cachedProfile
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
}
