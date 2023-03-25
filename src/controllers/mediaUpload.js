const fs = require("fs");
const cloudinary = require("../config/cloudinary");
const uploadMedia = async (req, res) => {
  const { path } = req.file;

  try {
    if (path) {
      const { url } = await cloudinary.uploads(path, "SocialMedia");
      fs.unlinkSync(path);
      res.status(201).json({ url });
    } else {
      res.status(400).json({ response: "image not present in body" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ response: "error occured" });
  }
};

module.exports = uploadMedia;
