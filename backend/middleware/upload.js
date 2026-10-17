import multer from 'multer';
import path from 'path';
import fs from 'fs';

const isVercel = !!process.env.VERCEL;
const uploadDir = isVercel ? '/tmp' : path.resolve('uploads');
if (!fs.existsSync(uploadDir)) {
  try { fs.mkdirSync(uploadDir, { recursive: true }); } catch (e) {}
}

const storage = isVercel
  ? multer.memoryStorage()
  : multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, uploadDir);
      },
      filename: function (req, file, cb) {
        const ext = path.extname(file.originalname).toLowerCase();
        const cleanBase = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
        const uniqueSuffix = `${Date.now()}_${Math.round(Math.random() * 1E6)}`;
        cb(null, `${cleanBase}_${uniqueSuffix}${ext}`);
      }
    });

function fileFilter(req, file, cb) {
  const allowedTypes = /jpeg|jpg|png|webp|svg|gif/;
  const ext = path.extname(file.originalname).toLowerCase().replace('.', '');
  const mime = file.mimetype;

  if (allowedTypes.test(ext) || allowedTypes.test(mime)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files (JPEG, JPG, PNG, WEBP, SVG, GIF) are allowed'), false);
  }
}

export const upload = multer({
  storage: storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB limit
  fileFilter: fileFilter
});
