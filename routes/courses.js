var express = require("express");
var router = express.Router();
var firebase = require("firebase");
var db = require("./db");

router.get("/", async (req, res, next) => {
  try {
    var return_value = await db
      .collection("Courses")
      .get()
      .then(function (snapShot) {
        var return_list = {};
        snapShot.forEach((doc) => {
          return_list[doc.id] = doc.data();
          
        });
        return return_list;
      })
      .catch(function (err) {
        console.log("Error on retrival :: ", err);
      });

    res.status(200).send(return_value);
  } catch (err) {
    // if there is an error, it'll passed via the next parameter to the error handler middleware
    next(err);
  }
});
//id:: GEt data by id number
router.get("/id/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    var return_value = await db
      .collection("Courses")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("DOC IS FOUND", doc.data());
          return doc.data();
        } else {
          console.log("no such data found");
        }
      })
      .catch((err) => {
        console.log("Error on retrival :: ", err);
      });
    console.log(return_value);
    res.status(200).send(return_value);
  } catch (err) {
    next(err);
  }
});
// Deparment
// will send the list of all the departments available within the courses
router.get("/allDpt/", async (req, res, next) => {
  const { id } = req.params;
  try {
    var return_val = await db.collection("Courses").get().then((snapShot) => {
      var return_item = new Set();
      snapShot.forEach((doc) => {
        var curr_data = doc.data();
        console.log(typeof(curr_data.department));
        if (return_item.has(curr_data.department)) {
          console.log("in");
        } else {
          return_item.add(curr_data.department);
        }
      });
      console.log(return_item)
      return [...return_item];
    }).catch(err => {
      console.log("Error on retrival::", err)
    });
    res.status(200).json(return_val)
  } catch (err) {
    next(err);
  }
});
router.get("/allDpt/:dptName", async (req, res, next) => {
  const {dptName} = req.params;
  try {
    var return_val = await db.collection("Courses").get().then(snapShot => {
      var return_item = [];
      snapShot.forEach((doc) => {
        var curr_data = doc.data();
        if (dptName === curr_data.department) {
          return_item.push(curr_data)
        } else {
          console.log("nah")
        }
      })
      return return_item
    }).catch(err => {
      console.log("Could retrive the val ", err)
    });
    res.status(200).json(return_val);
  } catch (err) {
    next(err);
  }
});


module.exports = router;

