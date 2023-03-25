const { User, Video, Comment } = require("../models");
const cloudinary = require("../config/cloudinary");
const { createnewVideoValidation } = require("../validations/video.validation");
const fs = require("fs");

const createNewVideo = async (req, res, next) => {
  try {
    const { error } = createnewVideoValidation(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const newVideo = await Video.create({
      ...req.body,
      user_id: req.userData.id,
    });
    res.status(200).json({ video: newVideo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ response: "error occured" });
  }
};

const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.destroy({
      where: { id: req.params.videoId, user_id: req.userData.id },
    });
    if (video) {
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
