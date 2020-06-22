# Get Comments on Professors
![](https://img.shields.io/badge/%2Fapi%2Fprofessors%2FgetComments-GET-brightgreen?style=flat-square)\
Returns an array of comments for the specified professor.

**URL Params:**
- Required: `?professorName=[string]`

**Data Params:**
- None

## Success Response
**Status Code:** `200 OK`

**Response Content:**
```json
[
    "Comment 1",
    "Comment 2",
    "Comment 3"
]
```

## Error Response
**Condition:** If the `Professors` collection does not exist on the database

**Status Code:** `404 Not Found`

**Response Content:**
An empty array would be returned if the professor does not have any comments
```json
[]
```
Nothing will be returned if an invalid query has been submitted


## Sample Call
```js
axios.get("/api/professors/getComments?professorName=John%20Doe")
.then((res) => console.log(res.data))
.catch((err) => console.log(err));
```
