const express = require("express");
const router = express.Router();
const { adminAuth, userAuth } = require("../middlewares/auth");
const upload = require("../utils/imageUpload");
const {
  createNewVideo,
  deleteVideo,
  updateVideo,
  getSingleVideo,
} = require("../controllers/videos");

router.post("/", userAuth, createNewVideo);
router.patch("/:videoId", userAuth, updateVideo);
router.delete("/:videoId", userAuth, deleteVideo);
router.get("/:videoId", getSingleVideo);

module.exports = router;
