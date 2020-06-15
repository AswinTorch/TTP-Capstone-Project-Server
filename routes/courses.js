var express = require("express");
var router = express.Router();

/* GET all courses. */
// /api/courses
router.get("/", async (req, res, next) => {
  try {
    res.status(200).json({ Hello: "world" });
  } catch (err) {
    // if there is an error, it'll passed via the next parameter to the error handler middleware
    next(err);
  }
});

module.exports = router;
