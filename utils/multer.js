const multer = require('multer');
const path = require('path');

// Multer config
module.exports = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png" && ext !== ".JPG"
            && ext !== ".JPEG" && ext !== ".PNG"){
            cb(new Error("File type isn't supported."), false);
            return;
        }
        cb(null, true);
    }

});