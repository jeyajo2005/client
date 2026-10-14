import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Project } from '../models/Project.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.resolve(__dirname, '../data/projects.json');

// Pre-seeded with all 4 verified project records from the frontend index.html
let defaultProjects = [
  {
    _id: '670cca010000000000000001',
    title: 'Dry Mix Unit: Packing Plant & Hopper Mechanical Erection Work',
    category: 'CEMENT PLANT · DRY MIX & PACKING UNIT',
    client: 'The Ramco Cements Ltd. — RR Nagar, Virudhunagar',
    location: 'RR Nagar, Virudhunagar',
    year: '2026',
    capacity: 'Dry Mix Unit & Packing Plant',
    description: 'Active mechanical industrial structural erection and equipment installation for the high-throughput Dry Mix Unit packing plant at The Ramco Cements Ltd., RR Nagar, Virudhunagar. Scope encompasses heavy structural towers, bulk storage hoppers, mechanical feed chutes, bucket elevator casings, packing line machine supports, and elevated operating galleries.',
    scope: [
      'Dry mix tower structural framing',
      'Storage hopper plate assembly',
      'Bucket elevator alignment',
      'High-elevation transfer chutes'
    ],
    mainImage: 'assets/images/drymix_packing.jpg',
    images: ['assets/images/drymix_packing.jpg'],
    status: 'ONGOING',
    isPublished: true,
    order: 1
  },
  {
    _id: '670cca010000000000000002',
    title: 'Sizer Crusher Mechanical & Equipment Structure Work',
    category: 'MINING EQUIPMENT & HEAVY MECHANICAL ERECTION',
    client: 'The Ramco Cements Ltd. — Ramco Mines, Virudhunagar',
    location: 'Ramco Mines, Virudhunagar',
    year: '2026',
    capacity: 'High-Capacity Mineral Sizer',
    description: 'Turnkey mechanical structural erection and heavy equipment mounting for the primary sizer crusher system at Ramco Mines, Virudhunagar. Scope included heavy steel supporting towers, vibration-damped structural chassis, high-impact rock transfer chutes, primary feed hoppers, and maintenance crane runway monorails engineered for extreme crushing shock loads.',
    scope: [
      'Heavy primary crusher station framing',
      'Limestone receiving hopper fit-up',
      'Tandem mobile crane rigging',
      'Vibration isolation chassis'
    ],
    mainImage: 'assets/images/sizer_crusher.jpg',
    images: ['assets/images/sizer_crusher.jpg'],
    status: 'COMPLETED',
    isPublished: true,
    order: 2
  },
  {
    _id: '670cca010000000000000003',
    title: '20 MW Power Plant: Non-IBR Structures & ACC Cooling Tower Erection',
    category: 'POWER GENERATION & HEAVY ERECTION',
    client: 'Tecksk Projects & ISGEC Heavy Engineering',
    location: 'Tamil Nadu Site',
    year: '2025',
    capacity: '20 MW Captive Unit',
    description: 'Complete non-IBR structural fabrication coordination and heavy steel erection for a 20 MW thermal power plant. Scope included ACC cooling tower steel framing, elevated ducting supports, fan deck erection, auxiliary boiler building columns, and heavy piping bridges executed under stringent client QA/QC supervision.',
    scope: [
      '20 MW non-IBR steel skeleton',
      'ACC cooling tower structural deck',
      'Fan support bridges',
      'Steam distribution pipe racks'
    ],
    mainImage: 'assets/images/power_plant_acc.jpg',
    images: ['assets/images/power_plant_acc.jpg'],
    status: 'COMMISSIONED',
    isPublished: true,
    order: 3
  },
  {
    _id: '670cca010000000000000004',
    title: 'Clinker Silo Mechanical Structures & Conveyor Galleries',
    category: 'CEMENT MANUFACTURING & SILO MECHANICAL STRUCTURES',
    client: 'The Ramco Cements Ltd.',
    location: 'South India Site',
    year: '2025',
    capacity: '50,000 MT Silo',
    description: 'Heavy mechanical structural execution and equipment structural framing for clinker storage silo systems and high-elevation transfer galleries at The Ramco Cements Ltd. Scope encompassed structural column towers, conveyor bridge galleries, feeder support steel, hopper discharge interfaces, and maintenance platforms delivered with zero downtime in an active plant.',
    scope: [
      'High-elevation circular roof trusses',
      'Overhead conveyor gallery spans',
      'Transfer tower framing',
      'Safety access stair towers'
    ],
    mainImage: 'assets/images/clinker_silo.jpg',
    images: ['assets/images/clinker_silo.jpg'],
    status: 'COMPLETED',
    isPublished: true,
    order: 4
  }
];

let cachedProjects = defaultProjects;

try {
  if (fs.existsSync(DATA_FILE)) {
    const fileData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    if (Array.isArray(fileData) && fileData.length > 0) {
      cachedProjects = fileData;
    }
  }
} catch (e) {
  console.warn('[Projects] File read fallback:', e.message);
}

function persistProjectsFile() {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(cachedProjects, null, 2), 'utf8');
  } catch (e) {
    console.warn('[Projects] File save warning:', e.message);
  }
}

// GET /api/projects
export async function getProjects(req, res, next) {
  try {
    const isAdmin = req.query.admin === 'true' || req.query.all === 'true';

    // If MongoDB is actively connected, attempt quick query
    if (mongoose.connection.readyState === 1) {
      try {
        const filter = isAdmin ? {} : { isPublished: true };
        const dbProjects = await Project.find(filter).sort({ order: 1, createdAt: -1 }).maxTimeMS(2000);
        if (dbProjects && dbProjects.length > 0) {
          cachedProjects = dbProjects.map(p => p.toObject());
          persistProjectsFile();
          return res.json({ success: true, count: dbProjects.length, data: dbProjects });
        } else {
          // If DB is empty, seed cached projects in background
          Project.insertMany(cachedProjects).catch(() => {});
        }
      } catch (dbErr) {
        console.warn('[Projects GET] DB query timeout/warning, serving active cache:', dbErr.message);
      }
    }

    // Fast in-memory cache response
    const results = isAdmin ? cachedProjects : cachedProjects.filter(p => p.isPublished !== false);
    return res.json({ success: true, count: results.length, data: results });
  } catch (error) {
    const results = cachedProjects;
    return res.json({ success: true, count: results.length, data: results });
  }
}

// POST /api/projects
export async function createProject(req, res, next) {
  try {
    const newId = new mongoose.Types.ObjectId().toString();
    const newProject = {
      _id: newId,
      title: req.body.title || 'Untitled Project',
      category: req.body.category || 'INDUSTRIAL ERECTION',
      client: req.body.client || 'Client Enterprise',
      location: req.body.location || '',
      year: req.body.year || '2026',
      capacity: req.body.capacity || '',
      description: req.body.description || '',
      scope: Array.isArray(req.body.scope) 
        ? req.body.scope 
        : (typeof req.body.scope === 'string' ? req.body.scope.split('\n').map(s=>s.trim()).filter(Boolean) : []),
      mainImage: req.body.mainImage || 'assets/images/drymix_packing.jpg',
      images: [req.body.mainImage || 'assets/images/drymix_packing.jpg'],
      status: req.body.status || 'COMPLETED',
      isPublished: req.body.isPublished !== false,
      order: cachedProjects.length + 1,
      createdAt: new Date().toISOString()
    };

    // Prepend to active memory list so new project appears at the top
    cachedProjects.unshift(newProject);
    persistProjectsFile();

    if (mongoose.connection.readyState === 1) {
      try {
        await Project.create(newProject);
      } catch (dbErr) {
        console.warn('[Projects POST] DB async save warning:', dbErr.message);
      }
    }

    res.status(201).json({ success: true, data: newProject, message: 'Project created successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// PUT /api/projects/:id
export async function updateProject(req, res, next) {
  try {
    const id = req.params.id;
    const idx = cachedProjects.findIndex(p => p._id === id || String(p._id) === String(id));
    
    const scopeData = Array.isArray(req.body.scope)
      ? req.body.scope
      : (typeof req.body.scope === 'string' ? req.body.scope.split('\n').map(s=>s.trim()).filter(Boolean) : undefined);

    if (idx !== -1) {
      cachedProjects[idx] = {
        ...cachedProjects[idx],
        ...req.body,
        ...(scopeData ? { scope: scopeData } : {})
      };
      persistProjectsFile();
    }

    if (mongoose.connection.readyState === 1) {
      try {
        await Project.findByIdAndUpdate(id, {
          ...req.body,
          ...(scopeData ? { scope: scopeData } : {})
        }, { new: true, runValidators: true });
      } catch (dbErr) {
        console.warn('[Projects PUT] DB async update warning:', dbErr.message);
      }
    }

    const updated = idx !== -1 ? cachedProjects[idx] : req.body;
    res.json({ success: true, data: updated, message: 'Project updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// DELETE /api/projects/:id
export async function deleteProject(req, res, next) {
  try {
    const id = req.params.id;
    cachedProjects = cachedProjects.filter(p => p._id !== id && String(p._id) !== String(id));
    persistProjectsFile();

    if (mongoose.connection.readyState === 1) {
      try {
        await Project.findByIdAndDelete(id);
      } catch (dbErr) {
        console.warn('[Projects DELETE] DB async delete warning:', dbErr.message);
      }
    }

    res.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// PATCH /api/projects/:id/toggle
export async function toggleProject(req, res, next) {
  try {
    const id = req.params.id;
    const project = cachedProjects.find(p => p._id === id || String(p._id) === String(id));
    if (project) {
      project.isPublished = !project.isPublished;
      persistProjectsFile();
    }

    if (mongoose.connection.readyState === 1) {
      try {
        const dbP = await Project.findById(id);
        if (dbP) {
          dbP.isPublished = !dbP.isPublished;
          await dbP.save();
        }
      } catch (e) {}
    }

    res.json({ 
      success: true, 
      data: project, 
      message: `Project ${project && project.isPublished ? 'published' : 'unpublished'}` 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
