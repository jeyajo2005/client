export function uploadImage(req, res) {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'Please upload an image file' });
  }

  const relativePath = `/uploads/${req.file.filename}`;
  const host = req.get('host');
  const protocol = req.protocol;
  const fileUrl = `${protocol}://${host}${relativePath}`;

  res.status(201).json({
    success: true,
    url: fileUrl,
    relativePath: relativePath,
    filename: req.file.filename,
    originalname: req.file.originalname,
    size: req.file.size,
    mimetype: req.file.mimetype,
    message: 'Image uploaded successfully'
  });
}
