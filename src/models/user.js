const { sq } = require("../config/db");
const { DataTypes } = require("sequelize");

const User = sq.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    first_name: { type: DataTypes.STRING, allowNull: false },
    last_name: { type: DataTypes.STRING, allowNull: false },
    gender: { type: DataTypes.STRING, allowNull: false },
    bio: { type: DataTypes.STRING, allowNull: false },
    website: { type: DataTypes.STRING, allowNull: false },
    dob: { type: DataTypes.DATE, allowNull: false },
    social_id: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    phone: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    profile_pic: { type: DataTypes.STRING, allowNull: false },
    profile_pic_small: { type: DataTypes.STRING, allowNull: false },
    role: {
      type: DataTypes.ENUM,
      values: ["user", "admin"],
      defaultValue: "user",
    },
    active: {
      type: DataTypes.INTEGER,
      allowNull: false,
      values: [1, 0],
      defaultValue: 1,
    },
    username: { type: DataTypes.STRING, allowNull: false },
    social: { type: DataTypes.STRING, allowNull: false },
    device_token: { type: DataTypes.STRING, allowNull: false },
    token: { type: DataTypes.STRING, allowNull: false },
    lat: { type: DataTypes.STRING, allowNull: false },
    long: { type: DataTypes.STRING, allowNull: false },
    online: { type: DataTypes.INTEGER, allowNull: false },
    verified: { type: DataTypes.INTEGER, allowNull: false },
    auth_token: { type: DataTypes.STRING, allowNull: false },
    version: { type: DataTypes.STRING, allowNull: false },
    device: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "android",
    }, // ios, android
    ip: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    country: { type: DataTypes.STRING, allowNull: false },
    city_id: { type: DataTypes.INTEGER, allowNull: false },
    state_id: { type: DataTypes.INTEGER, allowNull: false },
    country_id: { type: DataTypes.INTEGER, allowNull: false },
    wallet: { type: DataTypes.INTEGER, allowNull: false },
    paypal: { type: DataTypes.STRING, allowNull: false },
    fb_id: { type: DataTypes.STRING, allowNull: false },
    reset_wallet_datetime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: function () {
        let d = new Date();
        return d.toISOString();
      },
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
    createdAt: "created",
    updatedAt: false,
  }
);

module.exports = User;
