const { User, Video } = require("../models");
const {
  createUserValidation,
  loginUserValidation,
} = require("../validations/user.validation");
const bcrypt = require("bcrypt");
const validator = require("email-validator");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = process.env;

const signUp = async (req, res, next) => {
  try {
    const { error } = createUserValidation(req.body);
    if (error) {
      const errors = {};
      error.details.forEach((element) => {
        errors[element.context.key] = element.message.replace(/\"/g, "");
      });

      return res.status(400).json({ errors });
    }

    let check = await User.findOne({
      where: { email: req.body.email },
      attributes: ["email"],
    });
    if (check !== null)
      return res.status(409).json({ response: "user already exist" });

    let createUser = await User.create({
      ...req.body,
      password: await bcrypt.hash(req.body.password, 10),
      auth_token: jwt.sign({ email: req.body.email }, JWT_KEY),
      token: jwt.sign({ email: req.body.email }, JWT_KEY),
    });
    if (createUser) {
      res.status(201).json({ response: "user created successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ response: "an error occured" });
  }
};

const login = async (req, res, next) => {
  try {
    const { error } = loginUserValidation(req.body);
    if (error) {
      const errors = {};
      error.details.forEach((element) => {
        errors[element.context.key] = element.message.replace(/\"/g, "");
      });

      return res.status(400).json({ errors });
    }

    let check = await User.findOne({
      where: { email: req.body.email },
      attributes: ["email", "password"],
    });

    if (!check) return res.status(404).json({ response: "user not found" });

    let comparePassword = await bcrypt.compare(
      req.body.password,
      check.password
    );

    if (comparePassword) {
      res.status(200).json({
        response: "Auth successful",
        token: jwt.sign({ email: check.email }, JWT_KEY),
      });
    } else {
      res.status(401).json({ response: "Auth failed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ response: "An error occured" });
  }
};

const remove = async (req, res, next) => {
  try {
    await User.destroy({ where: { id: req.userData.id } });
    res.status(200).json({ response: "user deleted sucessfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occured" });
  }
};

const update = async (req, res, next) => {
  try {
    const { error } = createUserValidation(req.body);
    if (error) {
      const errors = {};
      error.details.forEach((element) => {
        errors[element.context.key] = element.message.replace(/\"/g, "");
      });

      return res.status(400).json({ errors });
    }

    const updatedUser = await User.update(
      { ...req.body },
      { where: { id: req.userData.id } }
    );

    if (updatedUser) {
      const user = await User.findOne({ where: { id: req.userData.id } });
      res.status(200).json({ message: "update successful", response: user });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occured" });
  }
};

const profie = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.userData.id },
      attributes: {
        exclude: [
          "password",
          "auth_token",
          "device_token",
          "token",
          "ip",
          "city_id",
          "country_id",
          "state_id",
        ],
      },
    });
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "An error occured" });
  }
};

const getAllVideosByUserId = async (req, res, next) => {
  const { user_id } = req.params;
  try {
    if (!user_id)
      return res.status(400).json({ message: "user_id is required" });

    const videos = await Video.findAll({
      where: { user_id },
      attributes: {
        exclude: ["user_id"],
      },
    });

    res.status(200).json({ videos });
  } catch (error) {
    res.status(500).json({ message: "An error occured" });
  }
};

module.exports = {
  signUp,
  login,
  remove,
  update,
  profie,
};
