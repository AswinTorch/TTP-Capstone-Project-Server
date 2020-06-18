var express = require("express");
var router = express.Router();
var firebase = require("firebase");
var db = require("./db");
var _ = require("lodash");
const { debug } = require("console");
const { send } = require("process");
const { doc } = require("./db");

/**
 * GET student object from their id
 * /api/students/:id
 *
 * /api/students/10 would return the student object with id 10, if it exists
 *
 * Returns: the student object associated with the id
 *
 * Return status:
 * 200 - OK: student found on database
 * 404 - Not found: id does not exist on database
 */
student_cache = {};
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (is_empty(student_cache)) {
    try {
      await db
        .collection("Students")
        .doc(id)
        .get()
        .then((doc) => {
          if (!doc.exists)
            res.status(404).send(`Student with id ${id} does not exist`);
          else {
            student_cache[doc.id] = doc.data();
            console.log("line 35:::from db");
            res.status(200).send(doc.data());
          }
        })
        .catch((err) => console.error(err));
    } catch (err) {
      console.error(err);
    }
  } else {
    console.log("line 43::cached data was sent");
    res.status(200).send(student_cache[id]);
  }
});

/**
 * POST new student
 * /api/students/
 *
 * Creates a new student object using the following information from the request body:
 * - uid
 * - displayName: first and last name
 * - email
 * And the default values:
 * - total_credit: 0
 * - total_received: 0
 * - total_owed: 0
 * - enrolled_classes: []
 *
 * Upon sign in, Firebase Authentication will generate a random uid for the new user.
 * After sign in, the signed-in user can be accessed by using the currentUser property:
 *
 * let user = firebase.auth().currentUser;
 *
 * Returns: the newly created student object
 *
 * Return status:
 * 201 - Created: new student object added to the database
 * 400 - Bad Request: request body does not have enough information to create
 * a new student
 */
router.post("/", async (req, res) => {
  const { uid, firstName, lastName, email } = req.body;
  let newStudentObj = {
    uid: uid,
    first_name: firstName,
    last_name: lastName,
    email: email,
    total_credit: 0,
    total_received: 0,
    total_owed: 0,
    enrolled_courses: [],
  };

  try {
    // Creates a new student object and returns it

    await db
      .collection("Students")
      .doc(uid)
      .set(newStudentObj)
      .then(() => {
        student_cache[uid] = newStudentObj;
        res.status(201).send(student_cache[uid]);
      })
      .catch((err) => console.log(err));
  } catch (err) {
    res
      .status(400)
      .send(
        `${err}\nError posting new student. Be sure to include a uid, first_name, last_name, and email.`
      );
  }
});

/**
 * PUT new course into student's enrolled_courses array
 * /api/students/:id/addcourse
 *
 * Takes in student id as parameter, and a course JSON object as the request body
 *
 * Returns: updated student object
 *
 * Return status:
 * 201 - Created: added new courses to enrolled_courses
 * 400 - Bad Request: empty request body, cannot add new course
 * 404 - Not Found: user id does not exist on database
 */
router.put("/:id/addcourse", async (req, res) => {
  const { id } = req.params;

  let current_student = db.collection("Students").doc(id);

  try {
    await current_student
      .get()
      .then((doc) => {
        if (doc.exists) {
          if (
            req.body.constructor === Object &&
            Object.keys(req.body).length > 0
          ) {
            console.log(student_cache);
            student_cache[id].enrolled_courses.push(req.body);
            console.log(student_cache);
            current_student.update({
              enrolled_courses: firebase.firestore.FieldValue.arrayUnion(
                req.body
              ),
            });
            res.status(201).send(req.body);
          } else res.status(400).send("Request body cannot be empty");
        } else res.status(404).send(`Student with id ${id} does not exist`);
      })
      .catch((err) => console.error(err));
  } catch (err) {
    console.error(err);
  }
});

/**
 * DELETE course from student's enrolled_courses array
 * /api/students/:id/removecourse
 *
 * Takes in student id as parameter, and a course JSON object as the request body
 *
 * Returns: updated student object
 *
 * Return status:
 * 200 - OK: course removed, or there was no course to remove in the first place
 * 400 - Bad Request: empty request body, cannot remove course
 * 404 - Not Found: user id does not exist on database
 */
router.put("/:id/removecourse", async (req, res) => {
  const { id } = req.params;

  let current_student = db.collection("Students").doc(id);

  try {
    await current_student
      .get()
      .then((doc) => {
        if (doc.exists) {
          if (
            req.body.constructor === Object &&
            Object.keys(req.body).length > 0
          ) {
            console.log(student_cache[id].enrolled_courses);

            let new_e_c = array_remove(
              student_cache[id].enrolled_courses,
              req.body
            );
            student_cache[id].enrolled_courses = new_e_c;
            console.log(student_cache);
            current_student.update({
              enrolled_courses: firebase.firestore.FieldValue.arrayRemove(
                req.body
              ),
            });
            res.status(200).send(doc.data());
          } else res.status(400).send("Request body cannot be empty");
        } else res.status(404).send(`Student with id ${id} does not exist`);
      })
      .catch((err) => console.error(err));
  } catch (err) {
    console.error(err);
  }
});

/**
 * Swapping courses
 *
 * PUT new course in place of the old one
 * /api/students/:id/swapcourse
 *
 * Takes in student id as parameter, and an array containing two course JSON objects as the request body
 *
 * Returns: updated student object
 *
 * Return status:
 * 200 - OK: swapping successful
 * 400 - Bad Request: invalid request body format
 * 404 - Not Found: user id does not exist on database
 */
router.put("/:id/swapcourse", async (req, res) => {
  const { id } = req.params;
  const prev_course = req.body[0];
  const new_course = req.body[1];

  let current_student = db.collection("Students").doc(id);

  console.log(prev_course);
  console.log(new_course);

  try {
    await current_student
      .get()
      .then((doc) => {
        if (doc.exists) {
          if (
            req.body.constructor === Array &&
            Object.keys(req.body).length === 2
          ) {
            let cached_enrolled_course = array_remove(
              student_cache[id].enrolled_courses,
              prev_course
            );
            student_cache[id].enrolled_courses = cached_enrolled_course;
            student_cache[id].enrolled_courses.push(new_course);
            current_student.update({
              enrolled_courses: firebase.firestore.FieldValue.arrayRemove(
                prev_course
              ),
            });

            current_student.update({
              enrolled_courses: firebase.firestore.FieldValue.arrayUnion(
                new_course
              ),
            });
            res.status(200).send(doc.data());
          } else
            res
              .status(400)
              .send(
                "Invalid request body: expecting an array that contains two JSON objects"
              );
        } else res.status(404).send(`Student with id ${id} does not exist`);
      })
      .catch((err) => console.error(err));
  } catch (err) {
    console.error(err);
  }
});
//Utility functions
function is_empty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}
function array_remove(arr, value) {
  let return_value = [];
  for (let i of arr) {
    if (!_.isEqual(i, value)) {
      return_value.push(i);
    }
  }
  console.log(return_value)
  return return_value;
}
// function is_equivalent(a, b) {
//   var a_property = Object.getOwnPropertyNames(a);
//   var b_property = Object.getOwnPropertyNames(b);
//   if (a_property.length != b_property.length) {
//     return false;
//   }
//   for (var i = 0; i < a_property.length; i++) {
//     var prop_name = a_property[i];
//     if (a[prop_name] !== b[prop_name]) {
//       return false;
//     }
//   }
//   return true;
// }
module.exports = router;
