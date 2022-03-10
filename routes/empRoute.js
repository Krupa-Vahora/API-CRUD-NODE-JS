const express = require("express");
const router = express.Router();
const employee = require("../models/employee");

// ------All Routes------

//add new employee
router.post("/newEmployee", async (req, res) => {
  const emp = new employee({
    ...req.body,
  });
  try {
    res.status(200).json({
      code: 200,
      message: "Employee Added Successfully ",
      addEmp: await emp.save(),
    });
  } catch (error) {
    console.log("error", error);
  }
});

//get all emp
router.get("/allEmployee", async (req, res) => {
  try {
    const emp = await employee.find({});
    res.send(emp);
  } catch (error) {
    res.send("Error:" + error);
  }
});

//get emp by id
router.get("/empById/:id", async (req, res) => {
  const empid = req.params.id;

  try {
    const emp = await employee.find({ _id: empid });
    res.send(emp);
  } catch (err) {
    res.send(err);
  }
});

//edit emp
router.patch("/updateEmp/:id", async (req, res) => {
  try {
    const emp = await employee.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
      },
      { new: true, runValidators: true }
    );
    res.send(emp);
  } catch (e) {
    res.send(e);
  }
});

//delete emp
router.delete("/deleteEmp/:id", async (req, res) => {
  try {
    const emp = await employee.findOneAndDelete({
      _id: req.params.id,
    });
    res.send(emp);
  } catch (error) {
    res.send(error);
  }
});
module.exports = router;
