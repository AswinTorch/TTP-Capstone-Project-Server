const express = require("express");
const router = express.Router();
const db = require("./db");

/**
 * GET all courses
 * /api/courses
 *
 * Returns: an object containing a data array and pagination object
 * - Data array contains course objects
 * - Pagination object contains key-value of item count
 *
 * Return status:
 * 200 - OK
 * 400 - Bad Request
 */
course_cache = {};

router.get("/", async (req, res, next) => {
  const { limit } = req.query;
  // const ind
  if (is_empty(course_cache)) {
    try {
      await db
        .collection("Courses")
        .orderBy("course_number")
        .get()
        .then(function (snapShot) {
          var return_list = [];
          snapShot.forEach((doc) => {
            course_cache[doc.id] = doc.data();
          });
        })
        .catch(function (err) {
          console.log("Error on retrival :: ", err);
        });
      var final_object = {
        total_count: limit,
      };
      console.log("obj grabbed from db");
      let return_value = { data:get_obj_slice(course_cache, limit), pagination: final_object };

      res.status(200).send(return_value);
    } catch (err) {
      
      next(err);
    }
  } else {
    console.log("obj grabbed from cache");
      let return_value = {
        data: get_obj_slice(course_cache, limit),
        pagination: final_object,
      };
    res.status(200).send(return_value);
  }
});
//id:: GEt data by id number
router.get("/id/:id", async (req, res, next) => {
  const { id } = req.params;
  if (is_empty(course_cache)){
    try {
      var return_value = await db
        .collection("Courses")
        .doc(id)
        .get()
        .then((doc) => {
          if (doc.exists) {
            console.log("DOC IS FOUND", doc.data());
            return doc.data();
          } else {
            console.log("no such data found");
          }
        })
        .catch((err) => {
          console.log("Error on retrival :: ", err);
        });
      console.log(return_value);
      res.status(200).send(return_value);
    } catch (err) {
      next(err);
      }
  }
  else {
    console.log("Course Returned from the cache")
    res.status(200).send(course_cache[id]);
  }
});
// Deparment
// will send the list of all the departments available within the courses
router.get("/allDepartment", async (req, res, next) => {
  if (is_empty(course_cache)){
    try {
      var return_val = await db
        .collection("Courses")
        .get()
        .then((snapShot) => {
          var return_item = new Set();
          snapShot.forEach((doc) => {
            var curr_data = doc.data();
            console.log(typeof curr_data.department);
            if (return_item.has(curr_data.department)) {
              console.log("in");
            } else {
              return_item.add(curr_data.department);
            }
          });
          console.log(return_item);
          return [...return_item];
        })
        .catch((err) => {
          console.log("Error on retrival::", err);
        });
      res.status(200).json(return_val);
    } catch (err) {
      next(err);
    }
  } else {
    console.log("CACHED")
    res.status(200).json(get_all_department(course_cache));    
    }
});
router.get("/allDepartment/:dptName", async (req, res, next) => {
  const { dptName } = req.params;
  if(is_empty(course_cache)){
  try {
    var return_val = await db
      .collection("Courses")
      .get()
      .then((snapShot) => {
        var return_item = [];
        snapShot.forEach((doc) => {
          var curr_data = doc.data();
          if (dptName === curr_data.department) {
            return_item.push(curr_data);
          } else {
            console.log("nah");
          }
        });
        return return_item;
      })
      .catch((err) => {
        console.log("Could retrive the val ", err);
      });
    res.status(200).json(return_val);
  } catch (err) {
    next(err);
    }
  } else {
    res.status(200).send(get_by_dpt_name(course_cache,dptName))
  }
});
//Utility functions
function is_empty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}
function get_obj_slice(obj, limit) {
  let return_list = [];
  let keys = Object.keys(obj);
  // console.log(keys)
  for (let i = 0; i < limit; i++) {
    // console.log(keys[i])
    return_list.push(obj[keys[i]]);
  }
  return return_list;
}
function get_all_department(obj) {
  let department_set = new Set();
  for (let i in obj) {
    department_set.add(obj[i].department)
  }   
  return [...department_set]
}
//Not the most efficient way to do this but as the database is rather small this should be fine
function get_by_dpt_name(obj,dpt_name) {
  let department = [];
  for (let i in obj) {
    if (obj[i].department === dpt_name) {
      department.push(obj[i])
    }
  }
  return department;
}
module.exports = router;
