const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const emp = require("../models/employee");
const empBio = require("../models/empBio");
const sharp = require("sharp");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const filefilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file formate"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: filefilter,
  limits: 100000000,
});
//new employee bio data
router.post(
  "/newEmpBio/:emp_id",
  upload.single("profile"),
  async (req, res) => {
    const empdata = req.params.emp_id;
    console.log(empdata);
    const empBiodata = new empBio({
      contact: req.body.contact,
      profile: req.file,
      employee: empdata,
    });

    empBiodata.save().catch((e) => {
      console.log(e);
    });
    res.status(201).json({
      message: "emp bio data Added Successfully ",
      addBio: empBiodata,
    });
  }
);

//get all  employee bio data
router.get("/allEmpBio", async (req, res) => {
  try {
    const empbiodata = await empBio.find({});
    console.log("------------------------>", empbiodata);
    res.status(200).send(empbiodata);
  } catch (e) {
    res.status(400).send();
  }
});

//get all employee bio data by id

router.get("/empBioById/:id", async (req, res) => {
  const empBioid = req.params.id;

  try {
    const empbiodata = await empBio.find({ _id: empBioid });
    res.send(empbiodata);
  } catch (err) {
    res.send(err);
  }
});

//edit employee bio data
router.patch("/empBioEdit/:id", upload.single("profile"), async (req, res) => {
  try {
    //     const file = await sharp(req.file)
    //     .resize({ width: 250, height: 250 })
    //     .png();
    //

    const empbiodata = await empBio.findByIdAndUpdate(
      req.params.id,
      {
        contact: req.body.contact,
        profile: req.file,
      },
      { new: true, runValidators: true }
    );
    res.send(empbiodata);
  } catch (e) {
    res.send(e);
  }
});
//delete employee bio data

router.delete("/empBioDelete/:id", async (req, res) => {
  try {
    const empbiodata = await empBio.findOneAndDelete({
      _id: req.params.id,
    });

    res.send(empbiodata);
  } catch (e) {
    res.status(500).send();
  }
});
module.exports = router;
