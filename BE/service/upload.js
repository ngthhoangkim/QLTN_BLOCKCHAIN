const cloudinary = require('../config/cloudinary.config.js');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Cấu hình storage cho Multer sử dụng Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "qltn",
    allowed_formats: ["jpg", "png", "jpeg"],
    public_id: (req, file) => file.originalname.replace(/\s+/g, "_").replace(/\.[^/.]+$/, ""),
  },
});

const upload = multer({ storage });

module.exports = upload;
