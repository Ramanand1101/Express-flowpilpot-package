const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies
// Ensure the directory exists
const uploadDirectory = path.join(__dirname, "Storage");
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Set up storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirectory);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Endpoint to handle both form data and binary data uploads
app.post("/upload", upload.any(), (req, res) => {
  // req.files contains the uploaded files
  // req.body contains the form data
  try {
    if (req.files) {
      console.log(req.files);
      res.json({ msg: "File Uploaded Successfully" });
    } else {
      res.json({ msg: "No File Uploaded" });
    }
  } catch (err) {
    console.log(err);
    res.json({ msg: "Error Occured" });
  }
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
