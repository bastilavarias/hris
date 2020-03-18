const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: path.join(__dirname, "/file/photos"),
    filename: (req, file, cb) => {
        cb(null, file.originalname + "-" + Date.now() + path.extname(file.originalname));
    }
});

const multerInstance = multer({
    storage
});

module.exports = multerInstance;