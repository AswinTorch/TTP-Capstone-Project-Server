# StudentFirst REST API
An attempt to make a responsive, student-oriented application similar to the CUNYFirst system, with emphasis on ease of use and a modern UI.

## Student Endpoints
[Get a Student's Account]()&nbsp;
![](https://img.shields.io/badge/%2Fapi%2Fstudents%2F%3Auid-GET-brightgreen?style=flat-square) 

[Create a New Student Account]()&nbsp;
![](https://img.shields.io/badge/%2Fapi%2Fstudents-POST-blue?style=flat-square)

[Add a New Course to Student's Account]()&nbsp;
![](https://img.shields.io/badge/%2Fapi%2Fstudents%2F%3Auid%2Faddcourse-PUT-orange?style=flat-square)

[Remove Course from Student's Account]()&nbsp;
![](https://img.shields.io/badge/%2Fapi%2Fstudents%2F%3Auid%2Fremovecourse-PUT-orange?style=flat-square)

[Swapping Courses in Student's Account]()&nbsp;
![](https://img.shields.io/badge/%2Fapi%2Fstudents%2F%3Auid%2Fswapcourses-PUT-orange?style=flat-square)

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