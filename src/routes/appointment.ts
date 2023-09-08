import express from "express";
import {crawlFirstMonth} from "../controllers/appointment";
const appointmentRouter = express.Router();

appointmentRouter.route("/").get(crawlFirstMonth);

export default appointmentRouter;
