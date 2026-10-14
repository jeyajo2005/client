import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from root or backend
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
if (!process.env.MONGO_URI) {
  dotenv.config({ path: path.resolve(__dirname, '../.env') });
}

import { User } from '../models/User.js';
import { Hero } from '../models/Hero.js';
import { About } from '../models/About.js';
import { Profile } from '../models/Profile.js';
import { Service } from '../models/Service.js';
import { Project } from '../models/Project.js';
import { TimelineEntry } from '../models/TimelineEntry.js';
import { Skill } from '../models/Skill.js';
import { Experience } from '../models/Experience.js';
import { Education } from '../models/Education.js';
import { Achievement } from '../models/Achievement.js';
import { Team } from '../models/Team.js';
import { Testimonial } from '../models/Testimonial.js';
import { Gallery } from '../models/Gallery.js';
import { Settings } from '../models/Settings.js';
import { ContactSettings } from '../models/ContactSettings.js';

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
      Profile.deleteMany(),
      Service.deleteMany(),
      Project.deleteMany(),
      TimelineEntry.deleteMany(),
      Skill.deleteMany(),
      Experience.deleteMany(),
      Education.deleteMany(),
      Achievement.deleteMany(),
      Team.deleteMany(),
      Testimonial.deleteMany(),
      Gallery.deleteMany(),
      Settings.deleteMany(),
      ContactSettings.deleteMany()
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

    // 2. Profile & Hero & About
    await Profile.create({
      name: 'M. Mohan & K. Gopala Krishnan',
      partner1: 'M. Mohan',
      partner2: 'K. Gopala Krishnan',
      title: 'Managing Partners · Thirupathi Engineers',
      companyName: 'Thirupathi Engineers',
      tagline: 'Industrial Mechanical Structural & Equipment Erection Partnership Firm',
      heroDescription: 'Premier mechanical industrial structural & equipment erection partnership firm. Proven execution in 20 MW thermal power plant non-IBR structures, ACC cooling towers, cement plant clinker silos, packing plants, sizer crushers, and bulk handling systems.',
      aboutHeading: 'Industrial Lineage & Mechanical Construction Leadership',
      aboutSubheading: 'A Partnership Built on Grounded Site Execution and Decades of Field Mastery',
      aboutDescription: 'Thirupathi Engineers is an industrial mechanical structural and equipment erection partnership firm founded on direct job-site execution leadership. With lineage stretching back to 1985 in major steel plant construction and expanding into cement manufacturing facilities by 1990, managing partners M. Mohan and K. Gopalakrishnan deliver decades of combined industry lineage.',
      experienceYears: 50,
      foundingYear: 1985,
      profileImage: 'assets/images/ramco_cement_plant.jpg',
      partner1Image: 'assets/images/mohan.jpg',
      partner2Image: 'assets/images/gopalakrishnan.jpg',
      highlights: [
        '50+ Years Combined Partner Lineage',
        'Direct Partner Job-Site Supervision',
        'Heavy Crane Rigging & Tandem Lifts',
        'Turnkey Mechanical Structural Execution'
      ]
    });

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

    // 3. Serpentine Timeline Entries (All 10 Real Steps from index.html)
    const timelineData = [
      {
        stepNumber: 1,
        year: '1985',
        title: 'Industrial Erection Career Origin',
        client: 'Steel Plants & Heavy Framing',
        description: "Inception of Mr. M. Mohan's 50+ year legacy in heavy structural framing & machinery installation.",
        imageUrl: 'assets/images/gallery/site-img-024.jpg',
        alignment: 'left',
        themeClass: 'theme-teal',
        themeColor: '#0D9488',
        order: 1,
        status: 'COMPLETED',
        isPublished: true
      },
      {
        stepNumber: 2,
        year: '1992',
        title: 'Gold Star Steel Plant Commissioning',
        client: 'Gold Star Steel Plant',
        description: 'Foundational turnkey steel plant machinery commissioning and heavy mill structural erection.',
        imageUrl: 'assets/images/gallery/site-img-018.jpg',
        alignment: 'right',
        themeClass: 'theme-ocean',
        themeColor: '#0284C7',
        order: 2,
        status: 'COMPLETED',
        isPublished: true
      },
      {
        stepNumber: 3,
        year: '1998',
        title: 'Camplastic Pipe Total Plant Erection',
        client: 'Camplastic Pipe Ltd.',
        description: 'Full manufacturing shed erection, extrusion line supports, and industrial infrastructure.',
        imageUrl: 'assets/images/gallery/site-img-014.jpg',
        alignment: 'left',
        themeClass: 'theme-marine',
        themeColor: '#0F766E',
        order: 3,
        status: 'COMPLETED',
        isPublished: true
      },
      {
        stepNumber: 4,
        year: '2005',
        title: 'Parryware Tiles Total Plant Erection',
        client: 'Parryware Tiles',
        description: 'Complete industrial plant structural framing, kiln line mechanical erection, and factory sheds.',
        imageUrl: 'assets/images/gallery/site-img-008.jpg',
        alignment: 'right',
        themeClass: 'theme-gold',
        themeColor: '#D97706',
        order: 4,
        status: 'COMPLETED',
        isPublished: true
      },
      {
        stepNumber: 5,
        year: '2016–21',
        title: 'Coal Stacker, Reclaimer & Packing',
        client: 'The Ramco Cements Ltd.',
        description: 'Heavy traveling stacker & reclaimer machinery, gantry rail steel, and automated packing plants.',
        imageUrl: 'assets/images/flsmidth_crane_lift.jpg',
        alignment: 'left',
        themeClass: 'theme-navy',
        themeColor: '#1E40AF',
        order: 5,
        status: 'COMPLETED',
        isPublished: true
      },
      {
        stepNumber: 6,
        year: '2022',
        title: 'Washing Plant Beneficiation Erection',
        client: 'The Ramco Cements Ltd.',
        description: 'Turnkey mineral washing plant facilities, screening decks, slurry piping, and pump house frameworks.',
        imageUrl: 'assets/images/washing_plant.jpg',
        alignment: 'right',
        themeClass: 'theme-slate',
        themeColor: '#475569',
        order: 6,
        status: 'COMPLETED',
        isPublished: true
      },
      {
        stepNumber: 7,
        year: '2023',
        title: 'Line-3 Kiln Coal Mill & Galleries',
        client: 'The Ramco Cements Ltd.',
        description: 'Multi-level coal mill building framing, overhead conveyor galleries, and transfer towers.',
        imageUrl: 'assets/images/gallery/site-img-002.jpg',
        alignment: 'left',
        themeClass: 'theme-royal',
        themeColor: '#2563EB',
        order: 7,
        status: 'COMPLETED',
        isPublished: true
      },
      {
        stepNumber: 8,
        year: '2025',
        title: '20 MW Power Plant Non-IBR & ACC',
        client: 'Tecksk Projects / ISGEC (Zero LTI)',
        description: 'Non-IBR boiler framing, ACC cooling towers, steam ducting supports, and pipe racks.',
        imageUrl: 'assets/images/power_plant_acc.jpg',
        alignment: 'right',
        themeClass: 'theme-darknavy',
        themeColor: '#1E293B',
        order: 8,
        status: 'COMPLETED',
        isPublished: true
      },
      {
        stepNumber: 9,
        year: '2025',
        title: 'Clinker Silo Structures & Bridges',
        client: 'The Ramco Cements Ltd.',
        description: 'Heavy silo mechanical structural steel and elevated conveyor bridges inside active operational plant.',
        imageUrl: 'assets/images/clinker_silo.jpg',
        alignment: 'left',
        themeClass: 'theme-steel',
        themeColor: '#3B82F6',
        order: 9,
        status: 'COMPLETED',
        isPublished: true
      },
      {
        stepNumber: 10,
        year: '2026',
        title: 'Sizer Crusher Mechanical Structures',
        client: 'Ramco Mines, Virudhunagar',
        description: 'Primary mineral sizer crusher machinery, heavy rock chutes, and vibration-damped structural towers.',
        imageUrl: 'assets/images/sizer_crusher.jpg',
        alignment: 'right',
        themeClass: 'theme-cobalt',
        themeColor: '#4F46E5',
        order: 10,
        status: 'COMPLETED',
        isPublished: true
      }
    ];
    await TimelineEntry.insertMany(timelineData);
    console.log(`[Seed] Seeded ${timelineData.length} Serpentine Timeline milestone entries.`);

    // 4. Projects Showcase (The 4 featured project records in index.html)
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
        client: 'The Ramco Cements Ltd.',
        location: 'South India Site',
        year: '2025 Handover',
        capacity: '50,000 MT Silo',
        description: 'Elevated structural execution of circular clinker silo roof trusses, overhead feed conveyor gantry bridges, and transfer chutes delivered with zero downtime.',
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
    console.log(`[Seed] Seeded ${projectsData.length} showcase projects.`);

    // 5. Skills
    const skillsData = [
      { name: 'Mechanical Structural Framing', category: 'Mechanical', proficiency: 98, icon: 'Shield', order: 1 },
      { name: 'Heavy Tandem Crane Rigging', category: 'Structural', proficiency: 96, icon: 'Tool', order: 2 },
      { name: 'Non-IBR Boiler Structures', category: 'Engineering', proficiency: 95, icon: 'Zap', order: 3 },
      { name: 'Air Cooled Condenser (ACC) Decking', category: 'Structural', proficiency: 94, icon: 'Layers', order: 4 },
      { name: 'Precision Machinery Alignment', category: 'Mechanical', proficiency: 95, icon: 'Crosshair', order: 5 },
      { name: 'Cement Silo & Conveyor Galleries', category: 'Engineering', proficiency: 97, icon: 'Box', order: 6 },
      { name: 'Zero-Harm Site Safety & ISO', category: 'Safety', proficiency: 99, icon: 'CheckCircle', order: 7 },
      { name: 'Rapid Turnaround Plant Shutdowns', category: 'Management', proficiency: 95, icon: 'Clock', order: 8 }
    ];
    await Skill.insertMany(skillsData);

    // 6. Experience Stats
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

    // 7. Education & Certifications
    const educationData = [
      {
        degree: 'Mechanical Engineering & Industrial Fabrication Mastery',
        institution: 'Board of Technical Education, Tamil Nadu',
        year: '1985',
        description: 'Comprehensive foundational qualification in mechanical engineering, structural mechanics, and machine design.',
        order: 1
      },
      {
        degree: 'Certified Heavy Mobile Crane Rigging & Tandem Lift Supervisor',
        institution: 'National Safety Council / Heavy Equipment Guild',
        year: '1995',
        description: 'Rigorous credentialing for high-tonnage mobile cranes, multi-crane tandem lifts, and safe rigging engineering.',
        order: 2
      },
      {
        degree: 'Industrial Plant Safety Leadership & Non-IBR Power Plant Standards',
        institution: 'Power & Heavy Process Manufacturing Safety Guild',
        year: '2010',
        description: 'Certification in zero-incident job-site safety management and high-elevation non-IBR boiler erection protocols.',
        order: 3
      }
    ];
    await Education.insertMany(educationData);

    // 8. Contact Settings
    await ContactSettings.create({
      email: 'thirupathiengineerss@gmail.com',
      phone: '+91 9043288002',
      secondaryPhone: '+91 9443728002',
      address: 'Industrial Estate, Virudhunagar / R.R. Nagar Works, Tamil Nadu, India - 626204',
      workingHours: 'Monday – Saturday: 8:00 AM – 7:00 PM (24/7 Shutdown Emergency Response)',
      mapLocation: 'Virudhunagar, Tamil Nadu, India',
      socialLinks: {
        linkedin: 'https://linkedin.com',
        whatsapp: 'https://wa.me/919043288002',
        twitter: '',
        facebook: '',
        youtube: ''
      }
    });

    // 9. Services & Achievements & Team & Settings
    const servicesData = [
      {
        title: 'Power Plant Non-IBR Structures',
        category: 'POWER INFRASTRUCTURE',
        shortDesc: 'Precision erection of non-IBR steel framing, auxiliary boiler support structures, industrial flue gas ducting arrays, and elevated pipe rack frameworks.',
        fullDesc: 'Comprehensive execution covering 20 MW thermal power plant non-IBR structures, boiler platforms, high-elevation flue gas ducting networks, and heavy pipe bridge racks.',
        icon: 'Zap',
        tags: ['Non-IBR Steel', 'Boiler Auxiliary', 'Pipe Racks'],
        dataNum: '01',
        order: 1,
        isPublished: true
      },
      {
        title: 'Air Cooled Condenser (ACC) Structures',
        category: 'COOLING INFRASTRUCTURE',
        shortDesc: 'Structural assembly and high-elevation placement of ACC fan deck steel, steam distribution headers, ducting supports, and peripheral wind walls.',
        fullDesc: 'Specialized modular assembly of air-cooled condenser fan decks, overhead header supports, vibration-damped motor frames, and safety maintenance catwalks.',
        icon: 'Layers',
        tags: ['ACC Fan Deck', 'Steam Headers', 'Wind Walls'],
        dataNum: '02',
        order: 2,
        isPublished: true
      },
      {
        title: 'Clinker Silos & Bulk Storage',
        category: 'STORAGE SYSTEMS',
        shortDesc: 'High-tonnage mechanical erection of circular clinker silos, overhead conveyor gantry bridges, steel hopper cones, and high-elevation transfer towers.',
        fullDesc: 'Heavy structural erection for cement plant clinker storage facilities, feed conveyor galleries, discharge hopper gates, and safety access stair towers.',
        icon: 'Box',
        tags: ['Clinker Silos', 'Conveyor Bridges', 'Hopper Cones'],
        dataNum: '03',
        order: 3,
        isPublished: true
      },
      {
        title: 'Dry Mix & Automated Packing Plants',
        category: 'CEMENT PROCESS PLANTS',
        shortDesc: 'Complete mechanical installation of dry mix manufacturing towers, rotary packing machines, bucket elevators, vibrating screens, and bag conveyors.',
        fullDesc: 'Full turnkey erection of multi-story dry mix process towers, automated packing units, bucket elevators, bag loading chutes, and dust extraction ducting.',
        icon: 'Activity',
        tags: ['Dry Mix Towers', 'Rotary Packers', 'Bucket Elevators'],
        dataNum: '04',
        order: 4,
        isPublished: true
      },
      {
        title: 'Primary Sizer & Crusher Stations',
        category: 'MINING & AGGREGATE',
        shortDesc: 'Heavy mechanical installation of primary mineral sizer crushers, dump hoppers, grizzly feeders, high-capacity discharge chutes, and drive chassis.',
        fullDesc: 'Robust structural framing and equipment placement for heavy primary limestone sizers, rock receiving hoppers, and vibration-damped foundation frames.',
        icon: 'Maximize',
        tags: ['Primary Sizers', 'Dump Hoppers', 'Grizzly Feeders'],
        dataNum: '05',
        order: 5,
        isPublished: true
      },
      {
        title: 'Plant Shutdowns & Heavy Crane Rigging',
        category: 'PLANT ENGINEERING',
        shortDesc: 'Time-critical shutdown mechanical modifications, certified heavy mobile crane rigging plans, high-elevation structural replacement, and precision alignment.',
        fullDesc: 'Round-the-clock emergency shutdown teams delivering kiln repairs, structural retrofitting, crane tandem lifts, and mechanical drive alignment.',
        icon: 'Tool',
        tags: ['Shutdown Jobs', 'Crane Rigging', 'Stacker-Reclaimers'],
        dataNum: '06',
        order: 6,
        isPublished: true
      }
    ];
    await Service.insertMany(servicesData);

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

    const teamData = [
      {
        name: 'M. Mohan',
        role: 'Managing Partner · Field Execution',
        shortRole: 'Managing Partner',
        experienceDisplay: '50+ Years Industrial Experience',
        description: '50+ years of frontline industrial erection leadership across premier Indian steel plants, manufacturing complexes, and heavy cement infrastructure.',
        initials: 'MM',
        image: 'assets/images/mohan.jpg',
        keyDisciplines: ['Industrial Erection', 'Kiln Alignment', 'Heavy Fabrication'],
        order: 1,
        isPublished: true
      },
      {
        name: 'K. Gopala Krishnan',
        role: 'Managing Partner · Operations & Rigging',
        shortRole: 'Managing Partner',
        experienceDisplay: '35+ Years Industrial Experience',
        description: 'Decades of heavy equipment alignment, tandem mobile crane rigging execution, and multi-discipline plant commissioning.',
        initials: 'KG',
        image: 'assets/images/gopalakrishnan.jpg',
        keyDisciplines: ['Tandem Crane Rigging', 'Non-IBR Structures', 'Plant Shutdowns'],
        order: 2,
        isPublished: true
      }
    ];
    await Team.insertMany(teamData);

    await Settings.create({
      siteName: 'Thirupathi Engineers',
      tagline: 'Industrial Mechanical Structural & Equipment Erection',
      email: 'thirupathiengineerss@gmail.com',
      phone: '+91 9043288002',
      address: 'Industrial Estate, Virudhunagar / R.R. Nagar Works, Tamil Nadu, India - 626204',
      primaryColor: '#0D9488',
      accentColor: '#3B82F6'
    });

    console.log('[Seed] Database successfully seeded with all portfolio content!');
    process.exit(0);
  } catch (error) {
    console.error(`[Seed] Error seeding database: ${error.message}`);
    process.exit(1);
  }
}

seedDatabase();
