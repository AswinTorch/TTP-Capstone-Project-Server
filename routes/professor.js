var express = require("express");
var router = express.Router();
var firebase = require("firebase");
var db = require("./db");

router.get("/getComments", async (req, res, next) => {
  const { professorName } = req.query;
  try {
    let comment_data = await db
      .collection("Professors")
      .where("professor_name", "==", professorName)
      .get()
      .then((ss) => {
        let comment = [];
        if (ss.empty) {
          res.status(404).send("Comments Not Found");
        } else {
          ss.forEach((doc) => {
            current_data = doc.data();
            comment = current_data.comment;
          });
        }
        res.status(200).send(comment);
      });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
