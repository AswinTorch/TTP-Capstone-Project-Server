# Get Courses by Search
![](https://img.shields.io/badge/%2Fapi%2Fcourses/search-GET-green?style=flat-square) ![Deprecating](https://img.shields.io/badge/-Deprecating-red?style=flat-square)\
Returns an array containing objects, each consisting of a course object and a [Levenshtein distance](https://en.wikipedia.org/wiki/Levenshtein_distance) value

**URL Params:**
- Required: `?search_string=[string]`

**Data Params:**
- None

## Success Response
**Status Code:** `200 OK`

**Response Content:**
`/api/courses/search?search_string=3665`
```json
[
    {
        "data": 
        {
            "campus_name": "Brooklyn College",
            "career": "Undergraduate",
            "course_identifier": "CISC",
            "course_name": "Game Design",
            "course_number": "3665",
            "department": "Computer & Information Science",
            "description": "Prior to Fall 2010, this course was known as CIS 54.2.nThe information below might still reflect the old course numbers. Bracketed numbers, if any, are the old course numbers. Learn more...)",
            "lecturer": ["Professor 1", "Professor 2", "Professor 3"],
            "semester_offered": "Fall, Spring",
            "units": "4.00"
        },
        "distance": 0.6666666666666666
    },
    {
        "data":
        {
            "campus_name": "Brooklyn College",
            "career": "Undergraduate",
            "course_identifier": "CISC",
            "course_name": "Game Design and Development",
            "course_number": "3667",
            "department": "Computer & Information Science",
            "description": "4 hours; 4 creditsnnAn introduction to game design and programming. Topics include analysis of existing games, game mechanics, social games. Game development using a game engine, including the use of assets and prefabs, movement, animations, audio and data persistence. Multi-week individual and small group assignments in game design and development. (Not open to students who have taken Computer and Information Science 3660 or Computer and Information Science 3665.)nnPrerequisite: Computer and Information Science 3130.",
            "lecturer": ["Professor 1", "Professor 2", "Professor 3"],
            "semester_offered": "Fall, Spring",
            "units": "4.00"
        },
        "distance": 0.5
    }
]
```

## Error Response
**Condition:** If the cache containing the list of courses is empty

**Status Code:** `404 Not Found`

**Response Content:**
An empty array would be returned if no results are found
```json
[]
```

## Sample Call
```js
axios.get(`/api/courses/search?search_string=3665`)
.then((res) => console.log(res.data))
.catch((err) => console.error(err));
```