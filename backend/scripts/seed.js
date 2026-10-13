import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import { User } from '../models/User.js';
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

async function seedDatabase() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/thirupathi_portfolio';
    console.log(`[Seed] Connecting to MongoDB: ${mongoUri}`);
    await mongoose.connect(mongoUri);

    console.log('[Seed] Clearing existing collections...');
    await Promise.all([
      User.deleteMany(),
      Hero.deleteMany(),
      About.deleteMany(),
      Service.deleteMany(),
      Project.deleteMany(),
      Experience.deleteMany(),
      Achievement.deleteMany(),
      Team.deleteMany(),
      Testimonial.deleteMany(),
      Gallery.deleteMany(),
      Settings.deleteMany()
    ]);

    // 1. Admin User
    const adminEmail = process.env.ADMIN_DEFAULT_EMAIL || 'admin@thirupathiengineers.com';
    const adminPassword = process.env.ADMIN_DEFAULT_PASSWORD || 'Admin@Thirupathi2026';
    await User.create({
      name: 'Managing Partner Admin',
      email: adminEmail,
      password: adminPassword,
      role: 'superadmin'
    });
    console.log(`[Seed] Created admin user: ${adminEmail}`);

    // 2. Hero Section
    await Hero.create({
      heading: 'M. Mohan, K. Gopala Krishnan',
      name1: 'M. Mohan',
      name2: 'K. Gopala Krishnan',
      subtitle: 'MANAGING PARTNERS · THIRUPATHI ENGINEERS',
      description: 'Premier mechanical industrial structural & equipment erection partnership firm. Proven execution in 20 MW thermal power plant non-IBR structures, ACC cooling towers, cement plant clinker silos, packing plants, sizer crushers, and bulk handling systems.',
      badgeText: 'MECHANICAL & INDUSTRIAL STRUCTURES',
      badgeLoc: 'TAMIL NADU · INDIA',
      primaryCtaText: 'Discuss Your Next Structure',
      primaryCtaLink: '#contact',
      secondaryCtaText: 'View Project Record',
      secondaryCtaLink: '#projects',
      bgImageUrl: 'assets/images/hero.jpg',
      logoUrl: '',
      contactEmail: 'thirupathiengineerss@gmail.com',
      contactPhone: '+91 9043288002'
    });

    // 3. About Section
    await About.create({
      heading: 'Industrial Lineage & Mechanical Construction Leadership',
      subheading: 'A Partnership Built on Grounded Site Execution and Decades of Field Mastery',
      companyIntro: 'Thirupathi Engineers is an industrial mechanical structural and equipment erection partnership firm founded on direct job-site execution leadership.',
      history: 'With lineage stretching back to 1985 in major steel plant construction and expanding into cement manufacturing facilities by 1990, managing partners M. Mohan and K. Gopalakrishnan deliver decades of combined industry lineage.',
      mission: 'To execute high-tonnage structural erection and mechanical equipment alignment with uncompromised engineering precision, zero-accident site safety, and schedule certainty.',
      vision: 'To stand as the most trusted execution partner for India’s cement, power, and heavy process manufacturing leaders.',
      experienceYears: 50,
      foundingYear: 1985,
      imageUrl: 'assets/images/ramco_cement_plant.jpg',
      highlights: [
        '50+ Years Combined Partner Lineage',
        'Direct Partner Job-Site Supervision',
        'Heavy Crane Rigging & Tandem Lifts',
        'Turnkey Mechanical Structural Execution'
      ]
    });

    // 4. Services (The 6 Scope of Practice Services)
    const servicesData = [
      {
        title: 'Power Plant Non-IBR Structures',
        category: 'POWER INFRASTRUCTURE',
        shortDesc: 'Precision erection of non-IBR steel framing, auxiliary boiler support structures, industrial flue gas ducting arrays, and elevated pipe rack frameworks for thermal and captive power units.',
        fullDesc: 'Comprehensive execution covering 20 MW thermal power plant non-IBR structures, boiler platforms, high-elevation flue gas ducting networks, and heavy pipe bridge racks.',
        icon: 'Zap',
        tags: ['Non-IBR Steel', 'Boiler Auxiliary', 'Pipe Racks'],
        dataNum: '01',
        order: 1,
        isPublished: true
      },
      {
        title: 'ACC Cooling Tower Erection',
        category: 'THERMAL SYSTEMS',
        shortDesc: 'Specialized erection of Air-Cooled Condenser (ACC) cooling towers, including heavy structural columns, fan deck platforms, wind walls, steam distribution duct supports, and motor bridges.',
        fullDesc: 'High-elevation crane erection of ACC condenser towers, vibration-damped fan deck modules, and high-diameter steam distribution headers.',
        icon: 'Factory',
        tags: ['ACC Decks', 'Steam Ducting', 'Wind Walls'],
        dataNum: '02',
        order: 2,
        isPublished: true
      },
      {
        title: 'Clinker Silos & Conveyor Galleries',
        category: 'CEMENT MANUFACTURING',
        shortDesc: 'Heavy mechanical steel structural execution for clinker storage silos, transfer towers, overhead belt conveyor galleries, feeder chutes, and high-elevation industrial access systems.',
        fullDesc: 'Clinker silo roof framing, bucket elevator access towers, long-span enclosed conveyor gantries, and transfer chute hoppers.',
        icon: 'Layers',
        tags: ['Clinker Silos', 'Conveyor Galleries', 'Transfer Towers'],
        dataNum: '03',
        order: 3,
        isPublished: true
      },
      {
        title: 'Dry Mix Units, Packing & Hoppers',
        category: 'EQUIPMENT ERECTION',
        shortDesc: 'Complete equipment structural installation for dry mix manufacturing units, automated packing plants, bulk storage hoppers, bucket elevator towers, and machine platforms.',
        fullDesc: 'Turnkey erection of multi-floor dry mix mortar plants, rotary packing machines, pneumatic conveying systems, and steel storage hoppers.',
        icon: 'Boxes',
        tags: ['Dry Mix Units', 'Packing Plants', 'Hoppers'],
        dataNum: '04',
        order: 4,
        isPublished: true
      },
      {
        title: 'Sizer Crushers & Mill Structures',
        category: 'MINING & HEAVY MACHINERY',
        shortDesc: 'Mechanical structural support frames for primary sizer crushers, coal mill buildings, cement grinding mills, vibration-isolated equipment chassis, and rock transfer chutes.',
        fullDesc: 'Precision anchor bolt setting, dynamic foundation isolation, and heavy rigging of high-tonnage primary sizers and coal pulverizer mills.',
        icon: 'Cog',
        tags: ['Sizer Crushers', 'Coal Mills', 'Cement Mills'],
        dataNum: '05',
        order: 5,
        isPublished: true
      },
      {
        title: 'Plant Shutdowns & Heavy Crane Rigging',
        category: 'PLANT ENGINEERING',
        shortDesc: 'Time-critical shutdown mechanical modifications, certified heavy mobile crane rigging plans, high-elevation structural replacement, stacker-reclaimers, and precision laser alignment.',
        fullDesc: 'Round-the-clock emergency shutdown teams delivering kiln repairs, structural retrofitting, crane tandem lifts, and mechanical drive alignment.',
        icon: 'Hammer',
        tags: ['Shutdown Jobs', 'Crane Rigging', 'Stacker-Reclaimers'],
        dataNum: '06',
        order: 6,
        isPublished: true
      }
    ];
    await Service.insertMany(servicesData);

    // 5. Projects
    const projectsData = [
      {
        title: 'Dry Mix Plant & Packing Unit Mechanical Erection',
        category: 'CEMENT & PACKING',
        client: 'The Ramco Cements Ltd.',
        location: 'R.R. Nagar Works, Tamil Nadu',
        year: '2023',
        capacity: 'Turnkey Unit',
        description: 'Complete mechanical and structural erection of automated dry mix manufacturing tower, bulk storage hoppers, bucket elevators, and packing unit conveyors.',
        scope: ['Dry mix tower structural framing', 'Storage hopper plate assembly', 'Bucket elevator alignment', 'High-elevation transfer chutes'],
        images: ['assets/images/drymix_packing.jpg', 'assets/images/gallery/site-img-001.jpg'],
        mainImage: 'assets/images/drymix_packing.jpg',
        tags: ['Dry Mix Plant', 'Ramco Cements', 'Packing Plant'],
        status: 'COMPLETED',
        isFeatured: true,
        order: 1
      },
      {
        title: '20 MW Thermal Power Plant Non-IBR Structure & ACC Cooling Deck',
        category: 'THERMAL POWER',
        client: 'Tecksk Projects / ISGEC',
        location: 'Tamil Nadu Site',
        year: '2022',
        capacity: '20 MW Captive Unit',
        description: 'Erection of complete non-IBR structural steel frameworks, auxiliary boiler ducting arrays, ACC cooling tower fan deck, and high-elevation pipe racks.',
        scope: ['20 MW non-IBR steel skeleton', 'ACC cooling tower structural deck', 'Fan support bridges', 'Steam distribution pipe racks'],
        images: ['assets/images/power_plant_acc.jpg', 'assets/images/gallery/site-img-003.jpg'],
        mainImage: 'assets/images/power_plant_acc.jpg',
        tags: ['Power Plant', 'Non-IBR', 'ACC Tower'],
        status: 'COMPLETED',
        isFeatured: true,
        order: 2
      },
      {
        title: 'Primary Sizer Crusher Support Framing & Mining Hoppers',
        category: 'MINING & CRUSHING',
        client: 'The Ramco Cements Ltd. (Mines Division)',
        location: 'Limestone Mines, Tamil Nadu',
        year: '2021',
        capacity: 'Heavy Sizer',
        description: 'Heavy structural erection for primary sizer crusher station, rock receiving hoppers, vibration-damped foundation frames, and transfer conveyor galleries.',
        scope: ['Heavy primary crusher station framing', 'Limestone receiving hopper fit-up', 'Tandem mobile crane rigging', 'Vibration isolation chassis'],
        images: ['assets/images/sizer_crusher.jpg', 'assets/images/washing_plant.jpg'],
        mainImage: 'assets/images/sizer_crusher.jpg',
        tags: ['Sizer Crusher', 'Mining', 'Heavy Rigging'],
        status: 'COMPLETED',
        isFeatured: true,
        order: 3
      },
      {
        title: 'Clinker Storage Silos Roof Framing & Conveyor Gallery',
        category: 'STORAGE & CONVEYING',
        client: 'Cement Manufacturing Plant',
        location: 'South India Site',
        year: '2020',
        capacity: '50,000 MT Silo',
        description: 'Elevated structural execution of circular clinker silo roof trusses, overhead feed conveyor gantry bridges, and transfer chutes.',
        scope: ['High-elevation circular roof trusses', 'Overhead conveyor gallery spans', 'Transfer tower framing', 'Safety access stair towers'],
        images: ['assets/images/clinker_silo.jpg', 'assets/images/flsmidth_crane_lift.jpg'],
        mainImage: 'assets/images/clinker_silo.jpg',
        tags: ['Clinker Silo', 'Conveyors', 'Roof Framing'],
        status: 'COMPLETED',
        isFeatured: true,
        order: 4
      }
    ];
    await Project.insertMany(projectsData);

    // 6. Experience Stats & Timeline
    const experienceData = [
      {
        value: '50+',
        label: 'Years Industrial Lineage',
        subtext: 'Combined partner legacy in heavy mechanical structural erection since 1985.',
        order: 1,
        isPublished: true
      },
      {
        value: '100%',
        label: 'Zero-Accident Safety Record',
        subtext: 'Strict adherence to ISO, OSHA, and Indian industrial safety rigging standards.',
        order: 2,
        isPublished: true
      },
      {
        value: '10,000+',
        label: 'Metric Tons Erected',
        subtext: 'Heavy steel framing, silos, ducting, hoppers, and crusher equipment placed.',
        order: 3,
        isPublished: true
      },
      {
        value: '24/7',
        label: 'Shutdown Response',
        subtext: 'Rapid mobilization for critical planned plant overhauls and emergency repairs.',
        order: 4,
        isPublished: true
      }
    ];
    await Experience.insertMany(experienceData);

    // 7. Achievements
    const achievementsData = [
      {
        title: 'Zero Incident Safety Citation',
        year: '2023',
        category: 'Safety Excellence',
        organization: 'The Ramco Cements Ltd.',
        description: 'Awarded for incident-free completion of heavy crane rigging during critical shutdown.',
        badge: 'Safety Excellence',
        order: 1,
        isPublished: true
      },
      {
        title: 'High-Elevation Rigging Milestone',
        year: '2022',
        category: 'Engineering Rigging',
        organization: 'Tecksk / ISGEC Power Plant Site',
        description: 'Flawless placement of ACC cooling tower structural deck using heavy mobile cranes.',
        badge: 'Rigging Milestone',
        order: 2,
        isPublished: true
      },
      {
        title: 'Fast-Track Packing Plant Delivery',
        year: '2021',
        category: 'Project Execution',
        organization: 'R.R. Nagar Cement Works',
        description: 'Completed automated packing tower erection ahead of scheduled shutdown deadline.',
        badge: 'Schedule Excellence',
        order: 3,
        isPublished: true
      }
    ];
    await Achievement.insertMany(achievementsData);

    // 8. Team (Managing Partners)
    const teamData = [
      {
        name: 'M. Mohan',
        role: 'Partner | Senior Industrial Construction Professional',
        shortRole: 'Senior Managing Partner',
        experienceDisplay: '50+ Years Industrial Experience',
        description: 'With more than five decades of experience in industrial construction, M. Mohan began his career in steel plant construction in 1985 and expanded into cement plant construction in 1990. Oversees job-site erection, heavy rigging, and structural fit-up.',
        initials: 'MM',
        image: 'assets/images/mohan.jpg',
        keyDisciplines: ['Industrial Steel Structures', 'Cement Plant Construction', 'Heavy Plant Erection', 'Commissioning Coordination'],
        order: 1,
        isPublished: true
      },
      {
        name: 'K. Gopalakrishnan',
        role: 'Partner | Engineering and Project Management Professional',
        shortRole: 'Managing Partner',
        experienceDisplay: '15 Years Industry Experience',
        description: 'With approximately 15 years of industry experience, K. Gopalakrishnan began working in steel plant projects in 2012 and cement plant projects in 2016. Directs engineering execution, site planning, and client coordination.',
        initials: 'KG',
        image: 'assets/images/gopalakrishnan.jpg',
        keyDisciplines: ['Steel Plant Projects', 'Cement Plant Projects', 'Project Coordination & Planning', 'Field Engineering Management'],
        order: 2,
        isPublished: true
      }
    ];
    await Team.insertMany(teamData);

    // 9. Testimonials
    const testimonialsData = [
      {
        name: 'Project Chief Engineer',
        role: 'Head of Mechanical Projects',
        company: 'Major Cement Corporation',
        feedback: 'Thirupathi Engineers executed our clinker silo roof trusses and packing plant structural erection with outstanding accuracy and strict adherence to safety schedules.',
        rating: 5,
        isFeatured: true,
        order: 1,
        isPublished: true
      },
      {
        name: 'Senior Mechanical Manager',
        role: 'Thermal Power Division',
        company: 'EPC Infrastructure Partner',
        feedback: 'Their direct on-site partner leadership makes all the difference. When rigging high-elevation ACC condenser decks, their crane planning and fit-up accuracy was immaculate.',
        rating: 5,
        isFeatured: true,
        order: 2,
        isPublished: true
      }
    ];
    await Testimonial.insertMany(testimonialsData);

    // 10. Gallery Items (Populated with archive images)
    const gallerySeed = [
      {
        title: 'Washing Plant & Thickener Tank Structural Erection',
        category: 'mining',
        tag: 'The Ramco Cements Ltd.',
        imageUrl: 'assets/images/washing_plant.jpg',
        order: 1,
        isPublished: true
      },
      {
        title: 'FLSmidth Equipment High-Tonnage Crane Lift',
        category: 'cranes',
        tag: 'Heavy Rigging',
        imageUrl: 'assets/images/flsmidth_crane_lift.jpg',
        order: 2,
        isPublished: true
      },
      {
        title: 'Dry Mix Unit Drive Motors & Equipment Assembly',
        category: 'machinery',
        tag: 'RR Nagar Site',
        imageUrl: 'assets/images/drymix_packing.jpg',
        order: 3,
        isPublished: true
      },
      {
        title: 'Primary Sizer Crusher Mechanical Support Tower',
        category: 'mining',
        tag: 'Ramco Mines',
        imageUrl: 'assets/images/sizer_crusher.jpg',
        order: 4,
        isPublished: true
      },
      {
        title: '20 MW Thermal Power Plant ACC Cooling Tower Deck',
        category: 'cranes',
        tag: 'Tecksk / ISGEC',
        imageUrl: 'assets/images/power_plant_acc.jpg',
        order: 5,
        isPublished: true
      },
      {
        title: 'Clinker Storage Silo Structures & Elevated Galleries',
        category: 'hoppers',
        tag: 'Cement Works',
        imageUrl: 'assets/images/clinker_silo.jpg',
        order: 6,
        isPublished: true
      }
    ];

    // Add remaining numbered site archive images
    for (let idx = 1; idx <= 18; idx++) {
      const pad = idx.toString().padStart(3, '0');
      const cats = ['cranes', 'machinery', 'hoppers', 'mining'];
      const cat = cats[(idx - 1) % cats.length];
      gallerySeed.push({
        title: `Mechanical Structure Execution Site Photo #${idx}`,
        category: cat,
        tag: 'Live Plant Execution',
        imageUrl: `assets/images/gallery/site-img-${pad}.jpg`,
        order: idx + 6,
        isPublished: true
      });
    }
    await Gallery.insertMany(gallerySeed);

    // 11. Website Settings & SEO
    await Settings.create({
      companyName: 'Thirupathi Engineers',
      businessType: 'Partnership Firm',
      tagline: 'Mechanical Industrial Structures & Equipment Erection',
      subtitle: 'Delivering reliable industrial steel structure fabrication and erection, cement plant construction, and power plant structural solutions through experience, precision, and commitment to quality.',
      phones: [
        { display: '+91 9043288002', value: '9043288002' },
        { display: '+91 9790520126', value: '9790520126' }
      ],
      emails: [
        'thirupathiengineerss@gmail.com',
        'gopalkannan5@gmail.com'
      ],
      address: 'Tamil Nadu, India',
      gmapUrl: 'https://maps.google.com',
      gstNumber: '33AAHFT1234F1Z5',
      copyrightText: '© 2026 Thirupathi Engineers. All rights reserved. Industrial Structural Erection.',
      socialLinks: {
        linkedin: 'https://linkedin.com',
        twitter: '',
        facebook: '',
        instagram: '',
        youtube: ''
      },
      siteTitle: 'Thirupathi Engineers | Mechanical Industrial Structure & Equipment Erection',
      metaDescription: 'Premier mechanical industrial structural and equipment erection partnership firm led by M. Mohan and K. Gopalakrishnan. Specializing in power plant non-IBR structures, ACC cooling towers, clinker silos, and cement plant machinery.',
      metaKeywords: 'Thirupathi Engineers, Mechanical Industrial Structures, Erection, Ramco Cements, Power Plant Structures, ACC Cooling Towers',
      ogImageUrl: 'assets/images/hero.jpg',
      navMenu: [
        { label: 'Projects', link: '#projects', order: 1, isVisible: true },
        { label: 'Gallery', link: '#gallery', order: 2, isVisible: true },
        { label: 'Services', link: '#services', order: 3, isVisible: true },
        { label: 'Contact', link: '#contact', order: 4, isVisible: true }
      ]
    });

    console.log('[Seed] Database successfully seeded with all initial portfolio content!');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]', error);
    process.exit(1);
  }
}

seedDatabase();
