var express = require("express");
var router = express.Router();
var firebase = require("firebase");
var db = require("./db");

var comment_cache = {};

router.get("/getComments", async (req, res, next) => {
  const { professorName } = req.query;
  if (is_empty(comment_cache)) {
    try {
      let comment_data = await db
        .collection("Professors")     
        .get()
        .then((ss) => {
          let comment = [];
          if (ss.empty) {
            res.status(404).send("Comments Not Found");
          } else {
            ss.forEach((doc) => {
              current_data = doc.data();
              comment_cache[current_data.professor_name] = current_data.comment;
            });
          }
          console.log("db accessed")
          res.status(200).send(comment_cache[professorName]);
        });
    } catch (err) {
      next(err);
    }
  } else {
    console.log("from cache")
    res.status(200).send(comment_cache[professorName]);
  }
});
function is_empty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}
module.exports = router;
