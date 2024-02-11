const express = require("express");
const cors = require("cors");
const multer = require("multer");
require("dotenv").config();
const app = express();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));
app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});
app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  const fileMetadata = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size,
  };
  res.json(fileMetadata);
});

const port = process.env.PORT;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
