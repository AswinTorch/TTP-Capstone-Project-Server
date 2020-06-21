# Create a New Student Account
![](https://img.shields.io/badge/%2Fapi%2Fstudents-POST-blue?style=flat-square)
Returns the newly created student object

**URL Params:**
- None

**Data Params:**
```json
{
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email Address",
    uid: "Auto-Generated Unique User ID"
}
```

### Success Response
**Status Code:** `201 Created`

**Response Content:**
```json
{
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email Address",
    enrolled_courses: [],
    transaction_history: [],
    uid: "Auto-Generated Unique User ID"
}
```

### Error Response
**Condition:** If request body does not have enough information to create a new student

**Status Code:** `400 Bad Request`

**Response Message:** `Error posting new student. Be sure to include a uid, first_name, last_name, and email.`

### Sample Call
```js
axios.post("/api/students", student)
.then((res) => console.log(res.data))
.catch((err) => console.error(err));
```