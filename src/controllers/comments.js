// const { Video, User, Comment } = require("../models");
const Video = require("../models/video");
const User = require("../models/user");
const Comment = require("../models/video_comment");

const createComment = async (req, res, next) => {
  const { video_id, comment } = req.body;
  try {
    const findVideo = await Video.findOne({ where: { id: video_id } });
    if (findVideo) {
      if (comment) {
        const commentCreated = await Comment.create({
          comment,
          video_id,
          user_id: req.userData.id,
        });
        res.status(200).json({
          response: "success",
          comment: commentCreated,
        });
      } else {
        res.status(422).json({
          response: "text not present",
        });
      }
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

const editComment = async (req, res, next) => {
  try {
    const [updateComment] = await Comment.update(
      { comment: req.body.comment },
      { where: { id: req.params.commentId, user_id: req.userData.id } }
    );
    if (updateComment) {
      res.status(200).json({
        response: "comment Updated successfully",
      });
    } else {
      res.status(404).json({
        response: "Comment not found.",
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
  createComment,
  editComment,
};
