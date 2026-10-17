import fs from 'fs';

export function uploadImage(req, res) {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'Please upload an image file' });
  }

  let fileUrl;
  let relativePath;

  if (process.env.VERCEL || req.file.buffer) {
    const base64 = req.file.buffer ? req.file.buffer.toString('base64') : fs.readFileSync(req.file.path, 'base64');
    fileUrl = `data:${req.file.mimetype || 'image/jpeg'};base64,${base64}`;
    relativePath = fileUrl;
  } else {
    relativePath = `/uploads/${req.file.filename}`;
    const host = req.get('host');
    const protocol = req.protocol;
    fileUrl = `${protocol}://${host}${relativePath}`;
  }

  res.status(201).json({
    success: true,
    url: fileUrl,
    relativePath: relativePath,
    filename: req.file.originalname || req.file.filename,
    size: req.file.size,
    mimetype: req.file.mimetype,
    message: 'Image uploaded successfully'
  });
}
