# Add a New Course to Student's Account
![](https://img.shields.io/badge/%2Fapi%2Fstudents%2F%3Auid%2Faddcourse-PUT-orange?style=flat-square)\
Push the new course object into the `enrolled_courses` array in the student object.

Returns the course object that was added, along with a transaction object associated with it.

**URL Params:**
- Required: `uid=[string]`

**Data Params/Example:**
```json
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
}
```

### Success Response
**Status Code:** `201 Created`

**Response Content:**
```json
{
    "course":
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
    "transaction":
    {
        "action": "ADD_COURSE",
        "date": "2020-06-21T16:55:50.374Z",
        "package": "[the added course object]"
    }
}
```

### Error Response
**Condition:** 
- If request body is empty
- If the user ID does not exist on the database

**Status Code:** 
- `400 Bad Request`
- `404 Not Found`

**Response Message:**
- `Request body cannot be empty`
- `Student with id ${uid} does not exist`

### Sample Call
```js
axios.put(`/api/students/${uid}/addcourse`, course)
.then((res) => console.log(res.data))
.catch((err) => console.error(err));
```