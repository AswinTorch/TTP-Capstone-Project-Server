var express = require("express");
var router = express.Router();
// const { Student } = require("../database/models");

/* GET all students. */
// /api/students/id
router.get("/:id", async (req, res, next) => {
  // try to get students object from database
  try {
    res.status(200).json({
      firstName: "Jack",
      lastName: "Black",
    });
  } catch (err) {
    // if there is an error, it'll passed via the next parameter to the error handler middleware
    next(err);
  }
});

module.exports = router;
