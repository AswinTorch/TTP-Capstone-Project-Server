import * as express from "express";
import { Request, Response, NextFunction } from "express";
import { Error } from "../app";
import * as db from "./db";
import { obj_is_empty, get_obj_slice } from "../utility/utils";
// import * as levenshtein_ratio  from "../utility/levensthein";
import * as firebase from "firebase";

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
const router = express.Router();
let course_cache:object = {};

router.get("/", async (req:Request,res:Response,next:NextFunction) => {
  const limit: any = req.query;
  const limit_num: number = Number(limit.limit); 
  console.log(limit);
  if (obj_is_empty(course_cache)) {
    try {
      await db
        .collection("Courses")
        .orderBy("course_number")
        .get()
        .then(function (snapShot) {          
          snapShot.forEach((doc) => {
            course_cache[doc.id] = doc.data();
          });
        })
        .catch(function (err) {
          console.log("Error on retrival :: ", err);
        });
      var final_object : object = {
        total_count: limit,
      };
      console.log("obj grabbed from db");
      let return_value:object = {
        data: get_obj_slice(course_cache, limit_num),
        pagination: final_object,
      };
      res.status(200).send(return_value);
    } catch (err) {
      next(err);
    }
  } else {
    console.log("obj grabbed from cache");
    let return_value : object = {
      data: get_obj_slice(course_cache, limit_num),
      pagination: final_object,
    };
    res.status(200).send(return_value);
  }
});
//id:: GEt data by id number
router.get("/id/:id", async (req:Request,res:Response,next:NextFunction) => {
  const id: any = req.params;
  const course_id: string = id.id;
  if (obj_is_empty(course_cache)) {
    try {
      var return_value = await db
        .collection("Courses")
        .doc(course_id)
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
  } else {
    console.log("Course Returned from the cache");
    res.status(200).send(course_cache[course_id]);
  }
});
// Deparment
// will send the list of all the departments available within the courses
router.get("/allDepartment", async (req:Request,res:Response,next:NextFunction) => {
  if (obj_is_empty(course_cache)) {
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
    console.log("CACHED");
    res.status(200).json(get_all_department(course_cache));
  }
});
router.get("/allDepartment/:dptName", async (req:Request,res:Response,next:NextFunction) => {
  const { dptName } = req.params;
  if (obj_is_empty(course_cache)) {
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
    res.status(200).send(get_by_dpt_name(course_cache, dptName));
  }
});
//Search route
// router.get("/search", async (req:Request,res:Response,next:NextFunction) => {
//   const search_string :any = req.query;
//   console.log(search_string.split(" ").length);
//   if (!obj_is_empty(course_cache)) {
//     let search_result = [];
//       for (let i in course_cache) {
//         if (
//           levensthein_ratio(
//             (`${course_cache[i].course_identifier}${course_cache[i].course_number}`).toLowerCase(),
//             (search_string.replace(/\s/g, "").toLowerCase())
//           ) > 0.2
//         ) {
//           search_result.push({
//             data: course_cache[i],
//             distance: levensthein_ratio(
//               `${course_cache[i].course_identifier}${course_cache[i].course_number.replace(/\s/g,"")}`,
//               search_string
//             ),
//           });
//         }
//     }
//        search_result.sort((first, second) =>
//       first.distance < second.distance ? 1 : -1
//     );
//     res.status(200).send(search_result.slice(0, 10));
//     } 
//    else {
//     res.status(500).send("not there");
// }
// });

function get_all_department(obj) {
  let department_set = new Set();
  for (let i in obj) {
    department_set.add(obj[i].department);
  }
  return [...department_set];
}
//Not the most efficient way to do this but as the database is rather small this should be fine
function get_by_dpt_name(obj, dpt_name) {
  let department = [];
  for (let i in obj) {
    if (obj[i].department === dpt_name) {
      department.push(obj[i]);
    }
  }
  return department;
}
export = router;
