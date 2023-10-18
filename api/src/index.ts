import express, { NextFunction, Request, Response } from "express";
import routes from "./routes/index";
import conWatcher from "./cronUtil/cronWatcher";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import { forEachAlarmFunction, getUserAlarms } from "./cronUtil/cronController";
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
let userToSocketArray: {
  userId: string;
  socketId: string[];
  runningTask: boolean;
}[] = [];

io.on("connection", (socket) => {
  socket.on("dataUser", async (data) => {
    if (data.userId) {
      const findSocketUser = userToSocketArray.find(
        (item) => item.userId === data.userId
      );
      if (!findSocketUser) {
        const newObject = {
          userId: data.userId,
          socketId: [socket.id],
          runningTask: false,
        };

        userToSocketArray.push(newObject);
        const roomName = `user-${data.userId}`;
        console.log("Client connect");

        if (
          !userToSocketArray.at(userToSocketArray.indexOf(newObject))
            ?.runningTask
        ) {
          const task = await conWatcher(data.userId, data.userTimezone);
          console.log("running");
          task.start();
          userToSocketArray[userToSocketArray.indexOf(newObject)].runningTask =
            true;
          socket.join(roomName);
          socket.on("resetCronTask", async () => {
            task.stop();
            console.log("resetnodetask");
            const timer = global.timer;
            const findAlarms = await getUserAlarms(
              data.userId,
              data.userTimezone
            );
            if (findAlarms.length) {
              console.log("find", findAlarms.length);
              forEachAlarmFunction(findAlarms, data.userId, data.userTimezone);
            }
            clearTimeout(timer);
            task.start();
          });
          socket.on("disconnect", () => {
            const findUser = userToSocketArray.find(
              (item) => item.userId === data.userId
            );

            if (findUser && findUser.socketId.length > 1) {
              const filterSocketIdArray = findUser.socketId.filter(
                (item) => item !== socket.id
              );
              findUser.socketId = filterSocketIdArray;
            } else {
              userToSocketArray = userToSocketArray.filter(
                (item) => item.userId !== data.userId
              );
              task.stop();
            }

            console.log("Client disconnected");
          });
        }
      }
      if (findSocketUser) {
        if (!findSocketUser.socketId.includes(socket.id)) {
          findSocketUser.socketId.push(socket.id);
          socket.join(`user-${findSocketUser.userId}`);
        }
      }
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
