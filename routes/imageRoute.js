const express = require("express");
const router = express.Router();
const imageController = require("./../controller/imageController");
router.post(
  "/",
  imageController.uploadPhoto,
  imageController.resizePhoto,
  imageController.getImageURL
);
module.exports = router;
