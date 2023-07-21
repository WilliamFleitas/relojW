
import {   getUserAlarms } from "./cronController";
const cron = require("node-cron");
import {io} from "../index"
// const {Server} = require("socket.io");
// const http = require("http");
// const dayjs = require("dayjs");
// const {io} = require("../index");

async function conWatcher(userId: string, socketUserId:string) {
  console.log("usertomapid", userId);
  try {
    // Ejecutar la función cada hora en punto
    // const server = http.createServer();
    let aux = 0;

    cron.schedule("* * * * *	", async () => {
      // 0 * * * *	
      const findAlarms = await getUserAlarms(userId);
      if (findAlarms.length && findAlarms[0].userId === userId) {
        
        findAlarms.forEach(async (alarm: any) => {
        const hourAlarm = alarm.hour.slice(0, 5);
          
        //  const newMessage = await createResponseIa(alarm.description, alarm.hour);
        //  console.log("newmessage", newMessage);
        const task = cron.schedule(`${Number(hourAlarm.slice(3))} ${Number(hourAlarm.slice(0, 2))} * * *`, () => {
            // Lógica para enviar la notificación
           
           const alertObjet = { 
            data: `Alarma para ${alarm.description ? alarm.description : "uwu"} + ${alarm.hour}`,
            iaMessage: alarm.iaMessage,
            hour: alarm.hour,
            description: alarm.description
          };
           io.to(socketUserId).emit("userAlarm", alertObjet);
          //  io.emit("alarmclick", { mensaje: "holandasss"});
          }, {scheduled: true});

       return  task.start();
        });
        console.log("tiene algo", findAlarms);
        return ;
      } 
      console.log("no tiene na");
      aux += 1;
      console.log(aux);
      
    }, { scheduled: true});
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}

export default conWatcher;
