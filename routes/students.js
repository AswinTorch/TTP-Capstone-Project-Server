var express = require("express");
var router = express.Router();
var firebase = require("firebase");
var db = require("./db");

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
router.get("/:id", async (req, res) => 
{
    const { id } = req.params;

    try
    {
        await db.collection("Students")
        .doc(id).get()
        .then((doc) =>
        {
            if(!doc.exists) res.status(404).send(`Student with id ${id} does not exist`);
            else res.status(200).send(doc.data());
        })
        .catch((err) => console.error(err));
    }
    catch(err)
    {
        console.error(err);
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
router.post("/", async (req, res) => 
{
    const { uid, firstName, lastName, email } = req.body;

    let newStudentObj =
    {
        uid: uid,
        first_name: firstName,
        last_name: lastName,
        email: email,
        total_credit: 0,
        total_received: 0,
        total_owed: 0,
        enrolled_courses: [],
    };

    try 
    {
        // Creates a new student object and returns it
        await db.collection("Students")
        .doc(uid).set(newStudentObj)
        .then(() => res.status(201).send(newStudentObj))
        .catch((err) => console.log(err));
    } 
    catch(err) 
    {
        res.status(400).send(`${err}\nError posting new student. Be sure to include a uid, first_name, last_name, and email.`);
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
router.put("/:id/addcourse", async (req, res) =>
{
    const { id } = req.params;

    let current_student = db.collection("Students").doc(id);

    try
    {
        await current_student.get()
        .then((doc) =>
        {
            if(doc.exists)
            {
                if(req.body.constructor === Object && Object.keys(req.body).length > 0)
                {
                    let new_credit = parseInt(doc.data().total_credit) + parseInt(req.body.units);
                    current_student.update(
                    {
                        total_owed: new_credit * 150,
                        total_credit: new_credit,
                        enrolled_courses: firebase.firestore.FieldValue.arrayUnion(req.body)
                    });
                    res.status(201).send(doc.data());
                }
                else res.status(400).send("Request body cannot be empty");
            } 
            else res.status(404).send(`Student with id ${id} does not exist`);
        })
        .catch((err) => console.error(err));
    }
    catch(err)
    {
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
router.delete("/:id/removecourse", async (req, res) => 
{
    const { id } = req.params;

    let current_student = db.collection("Students").doc(id);

    try 
    {
        await current_student.get()
        .then((doc) =>
        {
            if(doc.exists)
            {
                if(req.body.constructor === Object && Object.keys(req.body).length > 0)
                {
                    let new_credit = parseInt(doc.data().total_credit) - parseInt(req.body.units);
                    current_student.update(
                    {
                        total_owed: new_credit * 150,
                        total_credit: new_credit,
                        enrolled_courses: firebase.firestore.FieldValue.arrayRemove(req.body),
                    });
                    res.status(200).send(doc.data());
                }
                else res.status(400).send("Request body cannot be empty");
            }
            else res.status(404).send(`Student with id ${id} does not exist`);
        })
        .catch((err) => console.error(err));
    }
    catch (err) 
    {
        console.error(err);
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
    let current_student = await db.collection("Students").doc(id);
    current_student.update({
      enrolled_courses: firebase.firestore.FieldValue.arrayRemove(
        prev_course_id
      ),
    });
    current_student.update({
      enrolled_courses: firebase.firestore.FieldValue.arrayUnion(new_course_id),
    });
    res.status(201).send("success");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
