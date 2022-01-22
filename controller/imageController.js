const multer = require("multer");
const sharp = require("sharp");
const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
exports.uploadPhoto = upload.single("photo");
exports.resizePhoto = async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `editorial-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(2000, 1333)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/${req.file.filename}`);

  next();
};
exports.getImageURL = async (req, res, next) => {
  if (req.file.filename) {
    res.status(201).json({
      status: "success",
      message: "Image successfully Uploaded",
      data: {
        URL: `${req.protocol}://${req.get("host")}/img/${req.file.filename}`,
      },
    });
  }
};
