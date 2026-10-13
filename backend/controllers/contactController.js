import { Inquiry } from '../models/Inquiry.js';

// POST /api/contact (Public inquiry form)
export async function sendContactMessage(req, res, next) {
  try {
    const { name, email, phone, company, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, and message are required' });
    }

    const inquiry = await Inquiry.create({
      name,
      email,
      phone: phone || '',
      company: company || '',
      subject: subject || 'General Inquiry',
      message
    });

    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received. Our team will contact you shortly.',
      data: inquiry
    });
  } catch (error) {
    next(error);
  }
}

// GET /api/inquiries (Admin)
export async function getInquiries(req, res, next) {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json({ success: true, count: inquiries.length, data: inquiries });
  } catch (error) {
    next(error);
  }
}

// PATCH /api/inquiries/:id (Admin status update)
export async function updateInquiryStatus(req, res, next) {
  try {
    const { status } = req.body;
    const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }
    res.json({ success: true, data: inquiry, message: 'Status updated' });
  } catch (error) {
    next(error);
  }
}

// DELETE /api/inquiries/:id (Admin delete)
export async function deleteInquiry(req, res, next) {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }
    res.json({ success: true, message: 'Inquiry deleted' });
  } catch (error) {
    next(error);
  }
}
