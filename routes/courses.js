var express = require("express");
var router = express.Router();
var firebase = require("firebase");
var db = require("./db");
console.log("this is ", db);

// var set_course = course_ref.set(dummy);
/* GET all courses. */
// /api/courses

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
router.get("/:id", async (req, res, next) => {
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
//Deparment
//will send the departments available
// router.get("/:allDpt", async (req, res, next) => {
//   try {
//     var return_val = await db.collection("Courses").get().then((snapShot) => {
//       var return_item = Set();
//       snapShot.forEach((doc) => {
//         var curr_data = doc.data();
//         console.log(typeOf(curr_data));
//         // if (return_item.has(curr.Department)) {
//         //   console.log("in");
//         // } else {
//         //   return_item.add(doc.data().Department);
//         // }
//       });
//       return return_item;
//     }).catch(err => {
//       console.log("Error on retrival::", err)
//     });
//     res.status(200).json(return_val)
//   } catch (err) {
//     next(err);
//   }
// });


module.exports = router;

