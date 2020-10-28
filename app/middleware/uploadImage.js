const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public');
    console.log("ten image: " + file.originalname)

  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
    console.log("ten image: " + (file.filename))
  }

});
const fileFilter = (req, file, cb) => {
  if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
}
const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;
