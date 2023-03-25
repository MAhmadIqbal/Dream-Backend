const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/auth");
const upload = require("../utils/imageUpload");
const mediaUpload = require("../controllers/mediaUpload");

router.post("/", userAuth, upload.single("media_file"), mediaUpload);

module.exports = router;
