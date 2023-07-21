import express, { NextFunction, Request, Response } from "express";
import routes from "./routes/index";
import conWatcher from "./cronUtil/cronWatcher";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
const http = require("http");
const cors = require("cors");
require("dotenv").config();

const { sequelize } = require("./database");
const morgan = require("morgan");
const FRONT_URL = process.env.FRONT_URL;
const PORT = process.env.PORT;

//creamos el servidor
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://127.0.0.1:5173",
  },
});
app.use(cors());
//middlewares

//Admitir llamados del front
app.use((_req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", FRONT_URL); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, auth-token"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
app.use(cookieParser());
app.use(express.json()); // transforma la req.body a un objeto

app.use(morgan("dev"));


app.use("/", routes);
let userToSocketMap = new Map();

io.on("connection", (socket) => {
  // Eventos del socket
  socket.on("dataUser", (datos) => {
    if (datos.userId ) {
      console.log("Nuevo cliente conectado");
      console.log("Datos recibidos:", datos);
      const userId = datos.userId;
      conWatcher(userId, socket.id);
      // Guardar la asociación entre el ID de usuario y el ID de socket
      userToSocketMap.set(userId, socket.id);
      // Realizar operaciones adicionales relacionadas con el ID de usuario
      // // ...
      socket.emit("evento", datos);
    }
  });
  socket.on("disconnect", () => {
    // Buscar el ID de usuario asociado con el ID de socket y eliminar la entrada
    const userId = getUserBySocketId(socket.id);
    if (userId) {
      userToSocketMap.delete(userId);
      console.log("Cliente desconectado");
    }
  });
});

function getUserBySocketId(socketId: any) {
  for (const [userId, id] of userToSocketMap.entries()) {
    if (id === socketId) {
      return userId;
    }
  }
  return null;
}

sequelize
  .sync({})
  .then(() => {
    server.listen(PORT, () => {
      console.log("Database connected");
      console.log("Server running ok");
    });
  })
  .catch((error: any) => {
    console.log("No se pudo conectar a la DB ", error);
  });
  export { io };