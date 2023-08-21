const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { type } = req.body;
    let path = "";
    if (type === "profile") {
      path = "profiles";
    } else if (type === "product") {
      path = "products";
    } else if (type === "document") {
      path = "documents";
    }

    cb(null, `${process.cwd()}/src/public/${path}`);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploader = multer({ storage });

module.exports = uploader;
