const { sq } = require("../config/db");
const { DataTypes } = require("sequelize");
const User = require("./user");

const Post = sq.define("post", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  img_url: { type: DataTypes.STRING, allowNull: false },
  caption: { type: DataTypes.STRING, allowNull: true },
});

module.exports = Post;
