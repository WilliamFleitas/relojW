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
    origin: FRONT_URL,
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
app.use(express.json()); 

app.use(morgan("dev"));

app.use("/", routes);
let userToSocketArray: { userId: string; socketId: string }[] = [];

io.on("connection", (socket) => {
 
  socket.on("dataUser", async (data) => {
    if (data.userId) {
      const roomName = `user-${data.userId}`;
      if (!userToSocketArray.find((item) => item.userId === data.userId)) {
        console.log("New client conect");
        console.log("Data received:", data);
        const task = await conWatcher(data.userId);
        task.start();
        socket.on("disconnect", () => {
          const socketId = userToSocketArray.find(
            (item) => item.socketId === socket.id
          );
          if (socketId) {
            task.stop();
            userToSocketArray = userToSocketArray.filter(
              (item) => item.socketId !== socket.id
            );
            console.log("Client disconnected");
          }
        });
      }
      if (!userToSocketArray.find((item) => item.socketId === socket.id)) {
        userToSocketArray.push({ userId: data.userId, socketId: socket.id });
      }
      socket.join(roomName);
    }
  });
});

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

export { io };
