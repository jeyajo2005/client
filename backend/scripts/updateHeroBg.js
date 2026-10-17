import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from '../config/db.js';
import { Hero } from '../models/Hero.js';

async function updateHeroBg() {
  try {
    await connectDB();
    const res = await Hero.updateMany({}, {
      $set: {
        bgImageUrl: 'assets/images/hero_colorful_plant.jpg',
        badgeText: 'MECHANICAL & INDUSTRIAL STRUCTURES'
      }
    });
    console.log('MongoDB Hero updated successfully:', res);
    process.exit(0);
  } catch (err) {
    console.error('Error updating MongoDB Hero:', err.message);
    process.exit(0);
  }
}

updateHeroBg();
