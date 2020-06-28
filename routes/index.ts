// var express = require("express");

import * as express from "express";
import { Request, Response, NextFunction } from "express";
import {Error} from "../app";

// // Subrouters;
// const coursesRouter = require("./courses");
// const studentsRouter = require("./students");
// const professorRouter = require("./professor");
const router = express.Router();
import * as coursesRouter from "./courses";
import * as studentsRouter from "./students"
import * as professorRouter from "./professor";
// Mount our subrouters to assemble our apiRouter;

router.use("/courses", coursesRouter);
router.use("/students", studentsRouter);
router.use("/professors", professorRouter);

// Error handling middleware;

router.use((req: Request, res: Response) => {

  const error: Error = new Error();
  error.message = "ERRRROOOR!!!!Please Check the Url!";
  error.status = 404;
  res.status(error.status).send(error.message);
});

export = router;
