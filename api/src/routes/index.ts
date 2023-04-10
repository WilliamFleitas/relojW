import { Router } from "express";
import alarmRoutes from "./alarmRoute";
const routes = Router();

routes.use("/api/alarm", alarmRoutes);

export default routes;