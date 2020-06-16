var express = require("express");
var router = express.Router();
var firebase = require("firebase");
var db = require("./db");

/**
 * GET student object from their id
 * /api/students/id/:id
 * 
 * /api/students/id/10 would return the student object with id 10, if it exists
 * 
 * Return status:
 * 200 - OK
 * 404 - Not found
 */
router.get("/id/:id", async (req, res, next) => 
{
    const { id } = req.params;

    try 
    {
        var return_val = await db.collection("Students")
        .doc(id)
        .get()
        .then((doc) => {
            if (doc.exists) {
            return doc.data();
            } else {
            console.log("no such data found");
            }
        })
        .catch((err) => {
            console.log("no such data found on db");
        });
        res.status(200).json(return_val);
    } 
    catch (err) 
    {
        next(err);
    }
});

/**
 * POST new student
 * /api/students/
 * 
 * Upon sign in, Firebase Authentication will generate a random uid for the new user.
 * After sign in, the signed-in user can be accessed by using the currentUser property:
 * 
 * let user = firebase.auth().currentUser;
 * 
 * The user's profile can have these properties:
 * - displayName
 * - email
 * - photoURL
 * - uid
 */
router.post("/", async (req, res) => 
{
    const { uid, firstName, lastName, email } = req.body;

    try 
    {
        let return_id = await db.collection("Students")
        .add(
        {
            uid: uid,
            firstName: firstName,
            lastName: lastName,
            email: email,
            totalCredit: 0,
            totalOwed: 0,
            totalReceived: 0,
            enrolledClasses: [],
        })
        .then((ref) => { return ref.id; })
        .catch((err) => console.error(err));

        res.status(201).send(return_id);
    } 
    catch(err) 
    {
        res.status(400).send(`${err} :::Couldn't add for some ungodly reason`);
    }
});

//Checks if the student exists on the database or not and return [false] if not found | [[true,Student.id]] if found.
router.get("/exists/:uid_o", async (req, res, next) => {
  // try to get students object from database
  const { uid_o } = req.params;
  // console.log(name, email);
  try {
    var return_bool = await db
      .collection("Students")
      .where("uid", "==", uid_o)
      .get()
      .then((snapShot) => {
        var return_val = [];
        if (snapShot.empty) {
          return_val.push(false);
        } else {
          snapShot.forEach((doc) => {
            return_val.push([true, doc.id]);
          });
        }
        return return_val;
      })
      .catch((err) => {
        console.log("Error on retrieval", err);
      });
    res.status(200).send(return_bool);
  } catch (err) {
    next(err);
  }
});
//insert classes enrolled
//takes in the student id as parameter
//& course_id as json object
router.put("/addCourse/:id", async (req, res, next) => {
  const { id } = req.params;
  const { course_id } = req.body;
  try {
    var current_student = await db.collection("Students").doc(id);
    current_student.update({
      enrolled_classes: firebase.firestore.FieldValue.arrayUnion(course_id),
    });
    res.status(201).send("sucesss");
  } catch (err) {
    next(err);
  }
});
//Remove Course
router.put("/removeCourse/:id", async (req, res, next) => {
  const { id } = req.params;
  const { course_id } = req.body;
  try {
    var current_student = await db.collection("Students").doc(id);
    current_student.update({
      enrolled_classes: firebase.firestore.FieldValue.arrayRemove(course_id),
    });
    res.status(201).send("success");
  } catch (err) {
    next(err);
  }
});
//Swap Course
//req body take to arguments
//prev course id and the the new id
router.put("/swapCourse/:id", async (req, res, next) => {
  const { id } = req.params;
  //
  const { prev_course_id, new_course_id } = req.body;
  try {
    var current_student = await db.collection("Students").doc(id);
    current_student.update({
      enrolled_classes: firebase.firestore.FieldValue.arrayRemove(
        prev_course_id
      ),
    });
    current_student.update({
      enrolled_classes: firebase.firestore.FieldValue.arrayUnion(
        new_course_id
      ),
    });
    res.status(201).send("success")
  } catch (err) {
    next(err);
  }
});

async function get_course() {
  return;
}
module.exports = router;
