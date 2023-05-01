const multer = require("multer");
const upload = multer({ dest: "src/uploads/images" });

module.exports = upload;
