const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

// Set storage engine for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/uploads"); // Uploads folder
  },
  filename: function (req, file, cb) {
    const uniqueid = uuidv4();// uuidv4 create unique id for each image;
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueid + uniqueSuffix + path.extname(file.originalname)); // Adding UUID to the filename;
  },
});

const upload = multer({ storage: storage });
module.exports = upload;
