import express from "express";
import appointmentRouter from "./routes/appointment";

const api = express.Router();

api.use("/appointment", appointmentRouter);

export default api;
