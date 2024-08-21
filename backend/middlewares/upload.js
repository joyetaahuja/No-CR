
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure the directory exists or create it
const createDirectoryIfNotExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "media/"; // Use 'media/' as the destination directory
    createDirectoryIfNotExists(dir);
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    let filename = "";
    if (req.body?.type === "timetable") {
      filename = `Timetable_${req.body.semester}_Semester_${req.body.branch}.png`;
    } else if (req.body?.type === "profile") {
      if (req.body.enrollmentNo) {
        filename = `Student_Profile_${req.body.enrollmentNo}_Semester_${req.body.branch}.png`;
      } else {
        filename = `Faculty_Profile_${req.body.employeeId}.png`;
      }
    } else if (req.body?.type === "material") {
      filename = `${req.body.title}_Subject_${req.body.subject}.pdf`;
    } else if (req.body?.type === "notice") {
      filename = `Notice_${req.body.title}.pdf`;
    }
    cb(null, filename);
  }
});

const fileFilter = (req, file, cb) => {
  // Accept image and PDF files only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|pdf)$/)) {
    return cb(new Error("Only image and PDF files are allowed!"), false);
  }
  cb(null, true);
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter 
});

module.exports = upload;
