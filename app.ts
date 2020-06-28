import * as createError from "http-errors";
import * as express from "express";
import { Application, Response, Request, NextFunction } from "express";
import * as path from "path";
import * as cookieParser from "cookie-parser";
import * as logger from "morgan";
import * as indexRouter from "./routes/index";
import * as env from "process";
import * as helmet from "helmet";
import * as dotenv from "dotenv";
import * as cors from "cors";
export interface Error {
  status?: number;
  stack?: any;
  message?: string;
}

dotenv.config();
const app: Application = express();

app.use(cors());
app.use(helmet());
app.use(logger("dev"));
app.set("trust proxy", true);
app.use(express.json({ type: "*/*" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/api", indexRouter);


const whitelist: Array<string> = ["https://ttp-capstone-project.web.app/"];
var corsOptions = {
  origin: function (origin: string, callback: any) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// Then pass them to cors:
app.use(cors(corsOptions));
//// error handling
app.use((req: Request, res: Response, next: NextFunction) => {
  if (path.extname(req.path).length) {
    const err: Error = new Error("Not Found");
    err.status = 404;
    next(err);
  } else {
    next();
  }
});
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

// error handler
app.use(function (err: Error, req: Request, res: Response, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
