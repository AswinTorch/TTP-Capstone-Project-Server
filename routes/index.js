var express = require("express");
var router = express.Router();

// Subrouters;
const coursesRouter = require("./courses");
const studentsRouter = require("./students");
const professorRouter = require("./professor");
// Mount our subrouters to assemble our apiRouter;

router.use("/courses", coursesRouter);
router.use("/students", studentsRouter);
router.use("/professors", professorRouter);

// Error handling middleware;
router.use((req, res, next) => {
  const error = new Error("Not Found, Please Check URL!");
  error.status = 404;
  next(error);
});

module.exports = router;
