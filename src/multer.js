const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: path.join(__dirname, "/file/photos"),
    filename: (req, file, cb) => {
        if (Object.keys(file).length > 0) return cb(null, file.originalname + "-" + Date.now() + path.extname(file.originalname));
        return cb(null);
    }
});

const multerInstance = multer({
    storage
});

module.exports = multerInstance;