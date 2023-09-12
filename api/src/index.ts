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


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://127.0.0.1:5173",
  },
});
app.use(cors());



app.use((_req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", FRONT_URL); 
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
  
  socket.on("dataUser", (datos) => {
    if (datos.userId ) {
      console.log("New client conect");
      console.log("Data received:", datos);
      const userId = datos.userId;
       conWatcher(userId, socket.id);
      userToSocketMap.set(userId, socket.id);
      // socket.emit("evento", datos);
    }
  });
  socket.on("disconnect", () => {
    
    const userId = getUserBySocketId(socket.id);
    if (userId) {
      userToSocketMap.delete(userId);
      console.log("Client disconnected");
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
    console.log("Could not connect to DB ", error);
  });
  
  export { io  };