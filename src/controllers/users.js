const { User } = require("../models");
const { createUserValidation } = require("../validations/user.validation");
const bcrypt = require("bcrypt");
const validator = require("email-validator");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = process.env;

const signUp = async (req, res, next) => {
  try {
    const { error } = createUserValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

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
    const { email, password } = req.body;
    if (email && password) {
      if (validator.validate(email)) {
        let check = await User.findOne({
          where: { email: email },
          attributes: ["email", "password"],
        });
        if (check !== null) {
          let comparePassword = await bcrypt.compare(password, check.password);
          if (comparePassword) {
            res.status(200).json({
              response: "Auth successful",
              token: jwt.sign({ email: check.email }, JWT_KEY),
            });
          } else {
            res.status(401).json({ response: "Auth failed" });
          }
        } else {
          res.status(404).json({ response: "user not found" });
        }
      } else {
        res.status(422).json({ response: "not a valid email" });
      }
    } else {
      res.status(422).json({ response: "one or more values are missing" });
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
    const updatedUser = await User.update(
      { ...req.body },
      { where: { id: req.userData.id } }
    );
    res.status(200).json({ message: "update successful" });
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

module.exports = {
  signUp,
  login,
  remove,
  update,
  profie,
};
