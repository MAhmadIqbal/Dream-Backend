const joi = require("joi");

const createnewVideoValidation = (reqObj) => {
  const schema = joi.object({
    description: joi.string().min(3).max(500).required(),
    video: joi.string().uri().required(),
    thum: joi.string().uri(),
    gif: joi.string().uri(),
    view: joi.number().min(0),
    section: joi.number().min(0),
    privacy_type: joi.string().valid("public", "private"),
    allow_comments: joi.string().valid("false", "true"),
    allow_duet: joi.number().min(0),
    block: joi.number().min(0).max(1),
    duet_video_id: joi.number(),
    old_video_id: joi.number(),
    sound_id: joi.number(),
    duration: joi.number().min(0),
    promote: joi.number().min(0),
  });

  return schema.validate(reqObj);
};

module.exports = { createnewVideoValidation };
