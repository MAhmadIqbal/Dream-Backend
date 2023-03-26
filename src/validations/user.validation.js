const joi = require("joi");

const createUserValidation = (reqObj) => {
  const schema = joi.object({
    first_name: joi.string().min(3).max(30).required(),
    last_name: joi.string().min(3).max(30).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).max(30).required(),
    gender: joi.string().min(4).max(6),
    bio: joi.string(),
    website: joi.string(),
    dob: joi.date().required(),
    social_id: joi.string().min(3).max(100),
    phone: joi.string().min(3).max(20),
    profile_pic: joi.string(),
    profile_pic_small: joi.string(),
    role: joi.string(),
    active: joi.number().min(0).max(1),
    username: joi.string().min(3).max(100),
    social: joi.string(),
    device_token: joi.string(),
    token: joi.string(),
    lat: joi.string(),
    long: joi.string(),
    online: joi.number().min(0).max(1),
    verified: joi.number().min(0).max(1),
    auht_token: joi.string(),
    version: joi.string().min(3).max(10),
    device: joi.string(),
    ip: joi.string(),
    city: joi.string().min(3).max(100),
    country: joi.string().min(3).max(100),
    city_id: joi.number().min(0),
    state_id: joi.number().min(0),
    country_id: joi.number().min(0),
    wallet: joi.number().min(0),
    paypal: joi.string().min(3).max(100),
    fb_id: joi.string().min(3).max(100),
    reset_wallet_datetime: joi.date(),
  });

  return schema.validate(reqObj, { abortEarly: false });
};

const loginUserValidation = (reqObj) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  });

  return schema.validate(reqObj, { abortEarly: false });
};

module.exports = { createUserValidation, loginUserValidation };
