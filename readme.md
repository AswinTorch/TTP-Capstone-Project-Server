# API Routes

## Students
```js
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
axios.get(`/api/students/${uid}`)
.then((res) => console.log(res.data))
.catch((err) => console.error(err));
```

```js
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
axios.post("/api/students/", student)
.then((res) => console.log(res.data))
.catch((err) => console.error(err));
```

```js
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
axios.put(`/api/students/${uid}`, course)
.then((res) => console.log(res.data))
.catch((err) => console.error(err));
```

```js
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
axios.delete(`/api/students/${uid}`, course)
.then((res) => console.log(res.data))
.catch((err) => console.error(err));
```

```js
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
let courses = [prevCourse, newCourse];

axios.put(`/api/students/${uid}`, courses)
.then((res) => console.log(res.data))
.catch((err) => console.error(err));
```