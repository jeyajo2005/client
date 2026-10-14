import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'M. Mohan & K. Gopala Krishnan'
  },
  partner1: {
    type: String,
    default: 'M. Mohan'
  },
  partner1Role: {
    type: String,
    default: 'Industrial Erection & Field Operations Lead'
  },
  partner1Exp: {
    type: String,
    default: '50+ YEARS EXPERIENCE'
  },
  partner1Bio: {
    type: String,
    default: 'With over 50 years of distinguished experience in industrial construction across steel plants and cement manufacturing facilities, Mr. M. Mohan is a veteran erection specialist. His construction journey began in 1985 at Gold Star Steel Plant, progressing into cement plant construction in 1990. Landmark milestones include the total plant commissioning of Gold Star Steel Plant in 1992, total plant erection of Camplastic Pipe in 1998, Parryware Tiles company erection in 2005, and multiple cement mill and structural erections across various sites for The Ramco Cements Ltd. He personally leads heavy crane rigging sequencing, non-IBR structural framing, and workforce safety.'
  },
  partner1Phone: {
    type: String,
    default: '+91 9043288002'
  },
  partner1Email: {
    type: String,
    default: 'thirupathiENGINEERINGs@gmail.com'
  },
  partner2: {
    type: String,
    default: 'K. Gopala Krishnan'
  },
  partner2Role: {
    type: String,
    default: 'Mechanical Engineer'
  },
  partner2Exp: {
    type: String,
    default: '15 YEARS EXPERIENCE'
  },
  partner2Bio: {
    type: String,
    default: 'Bringing nearly 15 years of rigorous engineering leadership in mechanical industrial structures and equipment erection. Commenced his engineering career in the steel plant sector in 2012 and transitioned to cement plant structural erection in 2016, serving in key capacities as Engineer and Project Manager across multiple reputed industrial engineering companies before co-leading Thirupathi ENGINEERING. He specializes in mechanical structural design interpretation, equipment alignment, clinker silo structural frameworks, high-elevation conveyor galleries, drawing audits, and statutory quality sign-offs.'
  },
  partner2Phone: {
    type: String,
    default: '+91 9790520126'
  },
  partner2Email: {
    type: String,
    default: 'gopalkannan5@gmail.com'
  },
  title: {
    type: String,
    default: 'Managing Partners · Thirupathi ENGINEERING'
  },
  companyName: {
    type: String,
    default: 'Thirupathi ENGINEERING'
  },
  tagline: {
    type: String,
    default: 'Industrial Mechanical Structural & Equipment Erection Partnership Firm'
  },
  heroDescription: {
    type: String,
    default: 'Premier mechanical industrial structural & equipment erection partnership firm. Proven execution in 20 MW thermal power plant non-IBR structures, ACC cooling towers, cement plant clinker silos, packing plants, sizer crushers, and bulk handling systems.'
  },
  aboutHeading: {
    type: String,
    default: 'Industrial Lineage & Mechanical Construction Leadership'
  },
  aboutSubheading: {
    type: String,
    default: 'A Partnership Built on Grounded Site Execution and Decades of Field Mastery'
  },
  aboutDescription: {
    type: String,
    default: 'Thirupathi ENGINEERING is an industrial mechanical structural and equipment erection partnership firm founded on direct job-site execution leadership. With lineage stretching back to 1985 in major steel plant construction and expanding into cement manufacturing facilities by 1990, managing partners M. Mohan and K. Gopalakrishnan deliver decades of combined industry lineage.'
  },
  experienceYears: {
    type: Number,
    default: 50
  },
  foundingYear: {
    type: Number,
    default: 1985
  },
  profileImage: {
    type: String,
    default: 'assets/images/ramco_cement_plant.jpg'
  },
  partner1Image: {
    type: String,
    default: 'assets/images/mohan.jpg'
  },
  partner2Image: {
    type: String,
    default: 'assets/images/gopalakrishnan.jpg'
  },
  highlights: [{
    type: String
  }]
}, {
  timestamps: true
});

export const Profile = mongoose.model('Profile', profileSchema);
