# Get All Courses
![](https://img.shields.io/badge/%2Fapi%2Fcourses-GET-brightgreen?style=flat-square)\
Returns an object containing an array of course objects, with the amount equal to the query limit specified in the URL.

**URL Params:**
- Required: `?limit=[number]`

**Data Params:**
- None

## Success Response
**Status Code:** `200 OK`

**Response Content:**
```json
{
    "data": 
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
        },
        {
            ...
        },
    ]
}
```

## Error Response
**Condition:** If the `Courses` collection does not exist on the database

**Status Code:** `404 Not Found`

**Response Content:**
An empty data array would be returned if an invalid query has been submitted
```json
{
    "data": []
}
```

## Sample Call
```js
axios.get("/api/courses?limit=50")
.then((res) => console.log(res.data.data))
.catch((err) => console.error(err));
```