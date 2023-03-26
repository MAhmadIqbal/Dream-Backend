const joi = require("joi");

const createCommentValidation = (reqObj) => {
  const schema = joi.object({
    comment: joi.string().required(),
    video_id: joi.number().min(1).required(),
  });

  return schema.validate(reqObj, { abortEarly: false });
};

module.exports = { createCommentValidation };
