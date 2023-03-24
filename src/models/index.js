const User = require("./user");
const UserFriend = require("./userFriend");
const Video = require("./video");
const Like = require("./video_like");
const Comment = require("./video_comment");

// Video
User.hasMany(Video, { foreignKey: "user_id" });
Video.belongsTo(User, { foreignKey: "user_id" });

//user  Comments
User.hasMany(Comment, { foreignKey: "user_id" });
Comment.belongsTo(User);

// User Likes
User.hasMany(Like, { foreignKey: "user_id" });
Like.belongsTo(User, { foreignKey: "user_id" });

// Freinds
User.belongsToMany(User, { through: UserFriend, as: "friend" });

// Video Likes
Video.hasMany(Like, { foreignKey: "video_id" });
Like.belongsTo(Video, { foreignKey: "video_id" });

// Video Comments
Video.hasMany(Comment, { foreignKey: "video_id" });
Comment.belongsTo(Video);

module.exports = { User, Video, Like, Comment, UserFriend };
