# Swapping Courses in Student's Account
![](https://img.shields.io/badge/%2Fapi%2Fstudents%2F%3Auid%2Fswapcourses-PUT-orange?style=flat-square)\
Swaps a course object from the student's `enrolled_courses` array with a new one.

Returns the two course objects that were swapped, along with a transaction object associated with them.

**URL Params:**
- Required: `uid=[string]`

**Data Params/Example:**
```json
[
    {
        "campus_name": "Brooklyn College",
        "career": "Undergraduate",
        "course_identifier": "CISC",
        "course_name": "Multimedia Computing",
        "course_number": "3630",
        "department": "Computer & Information Science",
        "description": "(Prior to Fall 2010, this course was known as CIS 52.nThe information below might still reflect the old course numbers. Bracketed numbers, if any, are the old course numbers. Learn more...)",
        "lecturer": ["Professor 1", "Professor 2", "Professor 3"],
        "semester_offered": "Fall, Spring",
        "units": "4.00"
    },
    {
        "campus_name": "Brooklyn College",
        "career": "Undergraduate",
        "course_identifier": "CISC",
        "course_name": "Introduction to Natural Language Processing",
        "course_number": "2830",
        "department": "Computer & Information Science",
        "description": "(Prior to Fall 2010, this course was known as CIS 11.5.nThe information below might still reflect the old course numbers. Bracketed numbers, if any, are the old course numbers. Learn more...)",
        "lecturer": ["Professor 1", "Professor 2", "Professor 3"],
        "semester_offered": "Fall, Spring",
        "units": "4.00"
    }
]
```

## Success Response
**Status Code:** `200 OK`

**Response Content:**
```json
{
    "courses": "[prevCourse, newCourse]",
    "transaction":
    {
        "action": "SWAP_COURSES",
        "date": "2020-06-21T16:55:50.374Z",
        "package": "[prevCourse, newCourse]"
    }
}
```

## Error Response
**Condition:**
- If the request body format is invalid
- If the user ID does not exist on the database

**Status Code:**
- `400 Bad Request`
- `404 Not Found`

**Response Message:**
- `Invalid request body: expecting an array that contains two JSON objects`
- `Student with id ${uid} does not exist`

## Sample Call
```js
axios.put(`/api/students/${uid}/swapcourses`, [prevCourse, newCourse])
.then((res) => console.log(res.data))
.catch((err) => console.error(err));
```