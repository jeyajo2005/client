import { Hero } from '../models/Hero.js';

// GET /api/hero
export async function getHero(req, res, next) {
  try {
    let hero = await Hero.findOne();
    if (!hero) {
      hero = await Hero.create({});
    }
    res.json({ success: true, data: hero });
  } catch (error) {
    next(error);
  }
}

// PUT /api/hero
export async function updateHero(req, res, next) {
  try {
    let hero = await Hero.findOne();
    if (!hero) {
      hero = await Hero.create(req.body);
    } else {
      hero = await Hero.findByIdAndUpdate(hero._id, req.body, { new: true, runValidators: true });
    }
    res.json({ success: true, data: hero, message: 'Hero section updated successfully' });
  } catch (error) {
    next(error);
  }
}
