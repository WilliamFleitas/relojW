import express, { NextFunction, Request, Response } from "express";
import routes from "./routes/index";
require("dotenv").config();

const { sequelize } = require("./database");
const morgan = require("morgan");

const PORT = process.env.PORT;

//creamos el servidor
const app = express();

//middlewares

//Admitir llamados del front
app.use((_req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, auth-token"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
app.use(express.json()); // transforma la req.body a un objeto
app.use(morgan("dev"));
app.use("/", routes);
//acordarse de poner el force true
sequelize
  .sync({})
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connected");
      console.log("Server running ok");
    });
  })
  .catch((error: any) => {
    console.log("No se pudo conectar a la DB ", error);
  });
