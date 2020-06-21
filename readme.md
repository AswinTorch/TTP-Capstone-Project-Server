# StudentFirst REST API
An attempt to make a responsive, student-oriented application similar to the CUNYFirst system, with emphasis on ease of use and a modern UI.

## Student Endpoints
[Get a Student's Account]()
![](https://img.shields.io/badge/%2Fapi%2Fstudents%2F%3Auid-GET-brightgreen?style=flat-square) 

[Create a New Student Account]()
![](https://img.shields.io/badge/%2Fapi%2Fstudents-POST-blue?style=flat-square)

[Add a New Course to Student's Account]()
![](https://img.shields.io/badge/%2Fapi%2Fstudents%2F%3Auid%2Faddcourse-PUT-orange?style=flat-square)

[Remove Course from Student's Account]()
![](https://img.shields.io/badge/%2Fapi%2Fstudents%2F%3Auid%2Fremovecourse-PUT-orange?style=flat-square)

[Swapping Courses in Student's Account]()
![](https://img.shields.io/badge/%2Fapi%2Fstudents%2F%3Auid%2Fswapcourses-PUT-orange?style=flat-square)

```js
/**
 * POST new student
 * /api/students/
 *
 * Creates a new student object using the following information from the request body:
 * - uid
 * - displayName: first and last name
 * - email
 * And the default value:
 * - enrolled_classes: []
 * - transaction_history: []
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
 * Returns: course object that was added and the transaction
 *
 * Return status:
 * 201 - Created: added new courses to enrolled_courses
 * 400 - Bad Request: empty request body, cannot add new course
 * 404 - Not Found: user id does not exist on database
 */
axios.put(`/api/students/${uid}/addcourse`, course)
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
 * Returns: course object that was removed and the transaction
 *
 * Return status:
 * 200 - OK: course removed, or there was no course to remove in the first place
 * 400 - Bad Request: empty request body, cannot remove course
 * 404 - Not Found: user id does not exist on database
 */
axios.put(`/api/students/${uid}/removecourse`, course)
.then((res) => console.log(res.data))
.catch((err) => console.error(err));
```

```js
/**
 * Swapping courses
 *
 * PUT new course in place of the old one
 * /api/students/:id/swapcourses
 *
 * Takes in student id as parameter, and an array containing two course JSON objects as the request body
 *
 * Returns: course objects to be swapped and the transaction
 *
 * Return status:
 * 200 - OK: swapping successful
 * 400 - Bad Request: invalid request body format
 * 404 - Not Found: user id does not exist on database
 */
axios.put(`/api/students/${uid}/swapcourses`, [prevCourse, newCourse])
.then((res) => console.log(res.data))
.catch((err) => console.error(err));
```

## Courses Endpoints