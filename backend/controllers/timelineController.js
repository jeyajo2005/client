import { TimelineEntry } from '../models/TimelineEntry.js';

// GET /api/timeline
export async function getTimelineEntries(req, res, next) {
  try {
    const isPublic = req.query.admin !== 'true';
    const filter = isPublic ? { isPublished: true } : {};
    
    // Sort by order ascending, then stepNumber ascending
    const entries = await TimelineEntry.find(filter).sort({ order: 1, stepNumber: 1 });
    res.json({
      success: true,
      count: entries.length,
      data: entries
    });
  } catch (error) {
    next(error);
  }
}

// GET /api/timeline/:id
export async function getTimelineEntryById(req, res, next) {
  try {
    const entry = await TimelineEntry.findById(req.params.id);
    if (!entry) {
      return res.status(404).json({ success: false, message: 'Timeline entry not found' });
    }
    res.json({ success: true, data: entry });
  } catch (error) {
    next(error);
  }
}

// POST /api/timeline
export async function createTimelineEntry(req, res, next) {
  try {
    const {
      stepNumber,
      year,
      title,
      client,
      description,
      imageUrl,
      alignment,
      themeClass,
      themeColor,
      order,
      status,
      isPublished
    } = req.body;

    // If order not explicitly specified, place at end
    let calculatedOrder = order;
    if (calculatedOrder === undefined || calculatedOrder === null) {
      const highest = await TimelineEntry.findOne().sort({ order: -1 });
      calculatedOrder = highest ? highest.order + 1 : 1;
    }

    let calculatedStep = stepNumber;
    if (!calculatedStep) {
      const highestStep = await TimelineEntry.findOne().sort({ stepNumber: -1 });
      calculatedStep = highestStep ? highestStep.stepNumber + 1 : 1;
    }

    const entry = await TimelineEntry.create({
      stepNumber: calculatedStep,
      year: year || '2026',
      title,
      client: client || 'The Ramco Cements Ltd.',
      description,
      imageUrl: imageUrl || 'assets/images/drymix_packing.jpg',
      alignment: alignment || (calculatedStep % 2 === 1 ? 'left' : 'right'),
      themeClass: themeClass || 'theme-teal',
      themeColor: themeColor || '#0D9488',
      order: calculatedOrder,
      status: status || 'COMPLETED',
      isPublished: isPublished !== undefined ? isPublished : true
    });

    res.status(201).json({
      success: true,
      message: 'Timeline milestone created successfully',
      data: entry
    });
  } catch (error) {
    next(error);
  }
}

// PUT /api/timeline/:id
export async function updateTimelineEntry(req, res, next) {
  try {
    const entry = await TimelineEntry.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!entry) {
      return res.status(404).json({ success: false, message: 'Timeline entry not found' });
    }

    res.json({
      success: true,
      message: 'Timeline milestone updated successfully',
      data: entry
    });
  } catch (error) {
    next(error);
  }
}

// DELETE /api/timeline/:id
export async function deleteTimelineEntry(req, res, next) {
  try {
    const entry = await TimelineEntry.findByIdAndDelete(req.params.id);
    if (!entry) {
      return res.status(404).json({ success: false, message: 'Timeline entry not found' });
    }

    res.json({
      success: true,
      message: 'Timeline milestone deleted successfully'
    });
  } catch (error) {
    next(error);
  }
}

// PUT /api/timeline/reorder
export async function reorderTimeline(req, res, next) {
  try {
    const { items } = req.body; // Array of { id, order, stepNumber, alignment }
    if (!Array.isArray(items)) {
      return res.status(400).json({ success: false, message: 'Items array is required' });
    }

    const bulkOps = items.map((item, index) => {
      const updateData = { order: item.order !== undefined ? item.order : index + 1 };
      if (item.stepNumber !== undefined) updateData.stepNumber = item.stepNumber;
      if (item.alignment) updateData.alignment = item.alignment;
      return {
        updateOne: {
          filter: { _id: item.id },
          update: { $set: updateData }
        }
      };
    });

    if (bulkOps.length > 0) {
      await TimelineEntry.bulkWrite(bulkOps);
    }

    const updated = await TimelineEntry.find().sort({ order: 1, stepNumber: 1 });
    res.json({
      success: true,
      message: 'Timeline reordered successfully',
      data: updated
    });
  } catch (error) {
    next(error);
  }
}
