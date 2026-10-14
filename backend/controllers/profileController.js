import { Profile } from '../models/Profile.js';
import { Hero } from '../models/Hero.js';
import { About } from '../models/About.js';

// GET /api/profile
export async function getProfile(req, res, next) {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      // Create default from existing Hero and About if exists
      const hero = await Hero.findOne();
      const about = await About.findOne();
      profile = await Profile.create({
        name: hero ? hero.heading : 'M. Mohan & K. Gopala Krishnan',
        partner1: hero ? hero.name1 : 'M. Mohan',
        partner2: hero ? hero.name2 : 'K. Gopala Krishnan',
        title: hero ? hero.subtitle : 'MANAGING PARTNERS · THIRUPATHI ENGINEERS',
        heroDescription: hero ? hero.description : 'Premier mechanical industrial structural & equipment erection partnership firm.',
        aboutHeading: about ? about.heading : 'Industrial Lineage & Mechanical Construction Leadership',
        aboutSubheading: about ? about.subheading : 'A Partnership Built on Grounded Site Execution and Decades of Field Mastery',
        aboutDescription: about ? about.companyIntro : 'Thirupathi Engineers is an industrial mechanical structural and equipment erection partnership firm.',
        experienceYears: about ? about.experienceYears : 50,
        foundingYear: about ? about.foundingYear : 1985,
        profileImage: about ? about.imageUrl : 'assets/images/ramco_cement_plant.jpg',
        highlights: about ? about.highlights : ['50+ Years Combined Partner Lineage', 'Direct Partner Job-Site Supervision']
      });
    }

    res.json({ success: true, data: profile });
  } catch (error) {
    next(error);
  }
}

// PUT /api/profile
export async function updateProfile(req, res, next) {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create(req.body);
    } else {
      profile = await Profile.findByIdAndUpdate(profile._id, req.body, { new: true, runValidators: true });
    }

    // Also sync with Hero and About models if they exist
    await Hero.findOneAndUpdate({}, {
      heading: profile.name,
      name1: profile.partner1,
      name2: profile.partner2,
      subtitle: profile.title,
      description: profile.heroDescription
    }, { upsert: true });

    await About.findOneAndUpdate({}, {
      heading: profile.aboutHeading,
      subheading: profile.aboutSubheading,
      companyIntro: profile.aboutDescription,
      experienceYears: profile.experienceYears,
      foundingYear: profile.foundingYear,
      imageUrl: profile.profileImage
    }, { upsert: true });

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: profile
    });
  } catch (error) {
    next(error);
  }
}
