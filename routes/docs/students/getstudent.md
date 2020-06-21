# Get a Student's Account
![](https://img.shields.io/badge/%2Fapi%2Fstudents%2F%3Aid-GET-brightgreen?style=flat-square)
Returns the student object associated with the id

### Success Response
**Status Code:** `200 OK`

**Response Content:**
```json
{
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email Address",
    enrolled_courses: [Array of Course Objects],
    transaction_history: [Array of Transaction Objects],
    uid: "Unique User ID"
}
```

### Error Response
**Condition:** If user ID does not exist on the database

**Status Code:** `404 Not Found`

**Response Message:** `Student with id ${id} does not exist`