var multer = require("multer");

function imageMid(req, res, next) {
  var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads");
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + "-" + Date.now());
    },
  });
  var upload = multer({ storage: storage });
  upload.single("image");
}
module.exports = imageMid;
