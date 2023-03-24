const { User, Video, Comment } = require("../models");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

const createNewVideo = async (req, res, next) => {
  try {
    const { path } = req.file;
    console.log("path", path);
    if (path) {
      const {
        description,
        view,
        section,
        privacy_type,
        sound_id,
        allow_comments,
        allow_duet,
        block,
        duet_video_id,
        duration,
        promote,
      } = req.body;

      const { url } = await cloudinary.uploads(path, "SocialMedia");
      fs.unlinkSync(path);
      const newVideo = await Video.create({
        video: url,
        view,
        description,
        section,
        privacy_type,
        sound_id,
        allow_comments,
        allow_duet,
        block,
        duet_video_id,
        duration,
        promote,
        user_id: req.userData.id,
      });
      res.status(200).json({ video: newVideo });
    } else {
      res.status(422).json({ response: "image not present in body" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ response: "error occured" });
  }
};

const deleteVideo = async (req, res, next) => {
  try {
    const post = await Post.destroy({
      where: { id: req.params.postId, userId: req.userData.id },
    });
    if (post) {
      res.status(200).json({
        response: "success",
      });
    } else {
      res.status(404).json({
        response: "Not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      response: "error occured",
    });
  }
};

const updateVideo = (req, res, next) => {};

const getSingleVideo = async (req, res, next) => {
  try {
    const video = await Video.findOne({
      where: { id: req.params.videoId },
      include: [
        {
          model: Comment,
          attributes: ["id", "comment", "created"],
        },
      ],
    });
    if (video) {
      res.status(200).json({
        response: "success",
        video: video,
      });
    } else {
      res.status(404).json({
        response: "Not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      response: "error occured",
    });
  }
};

module.exports = {
  createNewVideo,
  deleteVideo,
  updateVideo,
  getSingleVideo,
};
