import { Router } from "express";
import alarmRoutes from "./alarmRoute";
import authRoutes from "./authRoute";
import userRoutes from "../routes/userRoute";
const routes = Router();

routes.use("/api/alarm", alarmRoutes);
routes.use("/api/auth", authRoutes);
routes.use("/api/user", userRoutes);
export default routes;