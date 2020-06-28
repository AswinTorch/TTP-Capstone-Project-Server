import * as express from 'express';
import { Request, Response, NextFunction } from "express";
import { Error } from "../app";
import * as db from "./db";
import { obj_is_empty } from "../utility/utils";
import * as firebase from "firebase";

const router = express.Router();
var comment_cache= {};

router.get("/getComments", async (req:Request, res:Response, next:NextFunction) => {
  const professorName: any = req.query;
  console.log(professorName);
  if (obj_is_empty(comment_cache)) {
    try {
      let comment_data = await db
        .collection("Professors")     
        .get()
        .then((ss) => {
          let comment = [];
          if (ss.empty) {
            res.status(404).send("Comments Not Found");
          } else {
            ss.forEach((doc) => {
              let current_data = doc.data();
              comment_cache[current_data.professor_name] = current_data.comment;
            });
          }
          // console.log(comment_cache)
          res.status(200).send(comment_cache[professorName.professorName]);
        });
    } catch (err ) {
      next(err);
    }
  } else {
    console.log("from cache")
    res.status(200).send(comment_cache[professorName.professorName]);
  }
});

export = router;
