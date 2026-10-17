import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { TimelineEntry } from '../models/TimelineEntry.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.resolve(__dirname, '../data/timeline.json');

let defaultTimeline = [
  { _id: '670cce010000000000000001', stepNumber: 1, year: '1985', title: 'Industrial Erection Career Origin', client: 'Steel Plants & Heavy Framing', description: "Inception of Mr. M. Mohan's 50+ year legacy in heavy structural framing & machinery installation.", imageUrl: 'assets/images/gallery/site-img-024.jpg', alignment: 'left', themeClass: 'theme-teal', themeColor: '#0D9488', order: 1, status: 'COMPLETED', isPublished: true },
  { _id: '670cce010000000000000002', stepNumber: 2, year: '1992', title: 'Gold Star Steel Plant Commissioning', client: 'Gold Star Steel Plant', description: 'Foundational turnkey steel plant machinery commissioning and heavy mill structural erection.', imageUrl: 'assets/images/gallery/site-img-018.jpg', alignment: 'right', themeClass: 'theme-ocean', themeColor: '#0284C7', order: 2, status: 'COMPLETED', isPublished: true },
  { _id: '670cce010000000000000003', stepNumber: 3, year: '1998', title: 'Camplastic Pipe Total Plant Erection', client: 'Camplastic Pipe Ltd.', description: 'Full manufacturing shed erection, extrusion line supports, and industrial infrastructure.', imageUrl: 'assets/images/gallery/site-img-014.jpg', alignment: 'left', themeClass: 'theme-marine', themeColor: '#0F766E', order: 3, status: 'COMPLETED', isPublished: true },
  { _id: '670cce010000000000000004', stepNumber: 4, year: '2005', title: 'Parryware Tiles Total Plant Erection', client: 'Parryware Tiles', description: 'Complete industrial plant structural framing, kiln line mechanical erection, and factory sheds.', imageUrl: 'assets/images/gallery/site-img-008.jpg', alignment: 'right', themeClass: 'theme-gold', themeColor: '#D97706', order: 4, status: 'COMPLETED', isPublished: true },
  { _id: '670cce010000000000000005', stepNumber: 5, year: '2016–21', title: 'Coal Stacker, Reclaimer & Packing', client: 'The Ramco Cements Ltd.', description: 'Heavy traveling stacker & reclaimer machinery, gantry rail steel, and automated packing plants.', imageUrl: 'assets/images/flsmidth_crane_lift.jpg', alignment: 'left', themeClass: 'theme-navy', themeColor: '#1E40AF', order: 5, status: 'COMPLETED', isPublished: true },
  { _id: '670cce010000000000000006', stepNumber: 6, year: '2022', title: 'Washing Plant Beneficiation Erection', client: 'The Ramco Cements Ltd.', description: 'Turnkey mineral washing plant facilities, screening decks, slurry piping, and pump house frameworks.', imageUrl: 'assets/images/washing_plant.jpg', alignment: 'right', themeClass: 'theme-slate', themeColor: '#475569', order: 6, status: 'COMPLETED', isPublished: true },
  { _id: '670cce010000000000000007', stepNumber: 7, year: '2023', title: 'Line-3 Kiln Coal Mill & Galleries', client: 'The Ramco Cements Ltd.', description: 'Multi-level coal mill building framing, overhead conveyor galleries, and transfer towers.', imageUrl: 'assets/images/gallery/site-img-002.jpg', alignment: 'left', themeClass: 'theme-royal', themeColor: '#2563EB', order: 7, status: 'COMPLETED', isPublished: true },
  { _id: '670cce010000000000000008', stepNumber: 8, year: '2025', title: '20 MW Power Plant Non-IBR & ACC', client: 'Tecksk Projects / ISGEC (Zero LTI)', description: 'Non-IBR boiler framing, ACC cooling towers, steam ducting supports, and pipe racks.', imageUrl: 'assets/images/power_plant_acc.jpg', alignment: 'right', themeClass: 'theme-darknavy', themeColor: '#1E293B', order: 8, status: 'COMPLETED', isPublished: true },
  { _id: '670cce010000000000000009', stepNumber: 9, year: '2025', title: 'Clinker Silo Structures & Bridges', client: 'The Ramco Cements Ltd.', description: 'Heavy silo mechanical structural steel and elevated conveyor bridges inside active operational plant.', imageUrl: 'assets/images/clinker_silo.jpg', alignment: 'left', themeClass: 'theme-steel', themeColor: '#3B82F6', order: 9, status: 'COMPLETED', isPublished: true },
  { _id: '670cce010000000000000010', stepNumber: 10, year: '2026', title: 'Sizer Crusher Mechanical Structures', client: 'Ramco Mines, Virudhunagar', description: 'Primary mineral sizer crusher machinery, heavy rock chutes, and vibration-damped structural towers.', imageUrl: 'assets/images/sizer_crusher.jpg', alignment: 'right', themeClass: 'theme-cobalt', themeColor: '#4F46E5', order: 10, status: 'COMPLETED', isPublished: true },
  { _id: '670cce010000000000000011', stepNumber: 11, year: '2026', title: 'Dry Mix Unit: Packing Plant & Bulk Hopper Work', client: 'The Ramco Cements Ltd. · RR Nagar [ONGOING]', description: 'Active ongoing execution: mechanical equipment structure, packing plant, and bulk material hoppers.', imageUrl: 'assets/images/drymix_packing.jpg', alignment: 'left', themeClass: 'theme-emerald', themeColor: '#059669', order: 11, status: 'ONGOING', isPublished: true }
];

let cachedTimeline = defaultTimeline;

// Load persisted timeline from JSON file if available
try {
  if (fs.existsSync(DATA_FILE)) {
    const fileData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    if (Array.isArray(fileData) && fileData.length > 0) {
      cachedTimeline = fileData;
    }
  }
} catch (e) {
  console.warn('[Timeline] File read fallback:', e.message);
}

function persistTimelineFile() {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(cachedTimeline, null, 2), 'utf8');
  } catch (e) {
    console.warn('[Timeline] File save warning:', e.message);
  }
}

// GET /api/timeline
export async function getTimelineEntries(req, res, next) {
  try {
    const isPublic = req.query.admin !== 'true';
    if (mongoose.connection.readyState === 1) {
      try {
        const filter = isPublic ? { isPublished: true } : {};
        const entries = await TimelineEntry.find(filter).sort({ order: 1, stepNumber: 1 }).maxTimeMS(2000);
        if (entries && entries.length > 0) {
          cachedTimeline = entries.map(e => e.toObject());
          persistTimelineFile();
          return res.json({ success: true, count: entries.length, data: entries });
        }
      } catch (e) {}
    }
    const results = isPublic ? cachedTimeline.filter(t => t.isPublished !== false) : cachedTimeline;
    res.json({ success: true, count: results.length, data: results });
  } catch (error) {
    res.json({ success: true, count: cachedTimeline.length, data: cachedTimeline });
  }
}

// GET /api/timeline/:id
export async function getTimelineEntryById(req, res, next) {
  try {
    const id = req.params.id;
    const found = cachedTimeline.find(t => String(t._id) === String(id));
    if (found) {
      return res.json({ success: true, data: found });
    }
    if (mongoose.connection.readyState === 1) {
      try {
        const entry = await TimelineEntry.findById(id).maxTimeMS(2000);
        if (entry) return res.json({ success: true, data: entry });
      } catch (e) {}
    }
    return res.status(404).json({ success: false, message: 'Timeline entry not found' });
  } catch (error) {
    next(error);
  }
}

// POST /api/timeline
export async function createTimelineEntry(req, res, next) {
  try {
    const newId = new mongoose.Types.ObjectId().toString();
    const calculatedOrder = req.body.order !== undefined && req.body.order !== null
      ? Number(req.body.order)
      : cachedTimeline.length + 1;
    
    const calculatedStep = req.body.stepNumber !== undefined && req.body.stepNumber !== null
      ? Number(req.body.stepNumber)
      : cachedTimeline.length + 1;

    const newEntry = {
      _id: newId,
      stepNumber: calculatedStep,
      year: req.body.year || '2026',
      title: req.body.title || 'New Milestone',
      client: req.body.client || 'Client Enterprise',
      description: req.body.description || '',
      imageUrl: req.body.imageUrl || 'assets/images/drymix_packing.jpg',
      alignment: req.body.alignment || (calculatedStep % 2 === 1 ? 'left' : 'right'),
      themeClass: req.body.themeClass || 'theme-teal',
      themeColor: req.body.themeColor || '#0D9488',
      order: calculatedOrder,
      status: req.body.status || 'COMPLETED',
      isPublished: req.body.isPublished !== false
    };

    cachedTimeline.push(newEntry);
    persistTimelineFile();

    if (mongoose.connection.readyState === 1) {
      try {
        await TimelineEntry.create(newEntry);
      } catch (dbErr) {
        console.warn('[Timeline POST] DB async save warning:', dbErr.message);
      }
    }

    res.status(201).json({
      success: true,
      message: 'Timeline milestone created successfully',
      data: newEntry
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// PUT /api/timeline/:id
export async function updateTimelineEntry(req, res, next) {
  try {
    const id = req.params.id;
    const idx = cachedTimeline.findIndex(t => String(t._id) === String(id));

    if (idx !== -1) {
      cachedTimeline[idx] = {
        ...cachedTimeline[idx],
        ...req.body
      };
      persistTimelineFile();
    }

    if (mongoose.connection.readyState === 1) {
      try {
        await TimelineEntry.findByIdAndUpdate(
          id,
          req.body,
          { new: true, runValidators: true }
        ).maxTimeMS(2000);
      } catch (dbErr) {
        console.warn('[Timeline PUT] DB async update warning:', dbErr.message);
      }
    }

    const updated = idx !== -1 ? cachedTimeline[idx] : req.body;
    res.json({
      success: true,
      message: 'Timeline milestone updated successfully',
      data: updated
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// DELETE /api/timeline/:id
export async function deleteTimelineEntry(req, res, next) {
  try {
    const id = req.params.id;
    cachedTimeline = cachedTimeline.filter(t => String(t._id) !== String(id));
    persistTimelineFile();

    if (mongoose.connection.readyState === 1) {
      try {
        await TimelineEntry.findByIdAndDelete(id).maxTimeMS(2000);
      } catch (dbErr) {
        console.warn('[Timeline DELETE] DB async delete warning:', dbErr.message);
      }
    }

    res.json({
      success: true,
      message: 'Timeline milestone deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// PUT /api/timeline/reorder
export async function reorderTimeline(req, res, next) {
  try {
    const { items } = req.body;
    if (Array.isArray(items)) {
      items.forEach(item => {
        const found = cachedTimeline.find(t => String(t._id) === String(item.id));
        if (found) {
          if (item.order !== undefined) found.order = item.order;
          if (item.stepNumber !== undefined) found.stepNumber = item.stepNumber;
          if (item.alignment) found.alignment = item.alignment;
        }
      });
      cachedTimeline.sort((a, b) => (a.order || 0) - (b.order || 0));
      persistTimelineFile();
    }

    if (mongoose.connection.readyState === 1) {
      try {
        const bulkOps = (items || []).map((item, index) => ({
          updateOne: {
            filter: { _id: item.id },
            update: { $set: { order: item.order !== undefined ? item.order : index + 1 } }
          }
        }));
        if (bulkOps.length > 0) {
          await TimelineEntry.bulkWrite(bulkOps);
        }
      } catch (dbErr) {}
    }

    res.json({
      success: true,
      message: 'Timeline reordered successfully',
      data: cachedTimeline
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

