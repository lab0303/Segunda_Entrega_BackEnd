const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { type } = req.body;
    console.log(req, "desde el midlleware", file);
    let path = "";
    if (type === "profile") {
      path = "profiles";
    } else if (type === "product") {
      path = "products";
    } else if (type === "document") {
      path = "documents";
    }
    console.log(`${process.cwd()}/src/public/${path}`);
    cb(null, `${process.cwd()}/src/public/${path}`);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
    console.log("desde el filename", file);
  },
});

const uploader = multer({ storage });

module.exports = uploader;
