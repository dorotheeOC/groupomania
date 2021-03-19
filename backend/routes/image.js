const express = require("express");
const router = express.Router();

const imgCtrl = require("../controllers/image");
const multer = require("../middleware/multer-config");

router.post("/upload", multer.single("file"), imgCtrl.uploadImage);


module.exports = router;