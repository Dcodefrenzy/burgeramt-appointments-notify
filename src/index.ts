import express, {Application, Request, Response, NextFunction} from "express";
import https from "https";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
// import api from "./router";
//import { logger, stream } from "./logger/logger";
import fs from "fs";
import * as dotenv from "dotenv";
import api from "./router";
dotenv.config();

let req: Request, res: Response;
//initialize middlewares
const app: Application = express();

const origins = [
  "https://mingles.team",
  "https://bot.mingles.team",
  "https://3.74.119.110",
];

const options: cors.CorsOptions = {
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
  ],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: origins,
  preflightContinue: false,
};

app.use(cors(options));
app.use(bodyParser.urlencoded({limit: "10mb", extended: true}));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use("/api/v1", api);

app.use("/test", api);

export default app;
