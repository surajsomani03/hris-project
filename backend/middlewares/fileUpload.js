const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Create the upload folder if it doesn't exist
const uploadDir = "public/profilePhoto";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Destination folder
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const username = req.user._Id; // assuming the username is passed in the request body
    const fileExt = path.extname(file.originalname);
    const filename = `${username}${fileExt}`;
    cb(null, filename); // File saved with username as filename
  },
});

// Set file filter for image types
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const mimetype = allowedTypes.test(file.mimetype);
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Only images (jpeg, jpg, png) are allowed!"));
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB limit
  },
});

module.exports = upload;
