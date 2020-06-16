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
 * 
 * Returns: the newly created UUID
 * 
 * Return status:
 * 201 - Created
 * 400 - Bad Request
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
            first_name: firstName,
            last_name: lastName,
            email: email,
            total_credit: 0,
            total_owed: 0,
            total_received: 0,
            enrolled_classes: [],
        })
        .then((ref) => { return ref.id; })
        .catch((err) => console.error(err));

        res.status(201).send(return_id);
    } 
    catch(err) 
    {
        res.status(400).send(`${err} :: Couldn't post new student for some reason`);
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

module.exports = router;
