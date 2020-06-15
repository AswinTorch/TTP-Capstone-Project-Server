var express = require("express");
var router = express.Router();

// Subrouters;
const coursesRouter = require("./courses");
const studentsRouter = require("./students");

// Mount our subrouters to assemble our apiRouter;

router.use("/courses", coursesRouter);
router.use("/students", studentsRouter);

// Error handling middleware;
router.use((req, res, next) => {
  const error = new Error("Not Found, Please Check URL!");
  error.status = 404;
  next(error);
});

module.exports = router;
