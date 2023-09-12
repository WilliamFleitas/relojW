import { forEachAlarmFunction, getUserAlarms } from "./cronController";
import { io } from "../index";
const cron = require("node-cron");

let nextExecutionTime: Date | undefined;
let aux = 0;
async function cronWatcher(userId: string, socketUserId: string) {
  console.log("usertomapidStartCronWatcher", userId);
  try {
    // Ejecutar la función cada hora en punto
    

    // if(aux === 0 ) {
    //   const findAlarms = await getUserAlarms(userId);
    //     if (findAlarms.length && findAlarms[0].userId === userId) {
    //       console.log("tiene algo");

    //       forEachAlarmFunction(findAlarms, socketUserId);

    //       return;
    //     }
    //     console.log("no tiene na");
    // }
    const task1 = cron.schedule(
      "*/1 * * * *",
      // */30 * * * *
      async () => {
        // 0 * * * *
        console.log("Looking for alarms");
        const findAlarms = await getUserAlarms(userId);
        if (findAlarms.length && findAlarms[0].userId === userId) {
          console.log("tiene algo");

          forEachAlarmFunction(findAlarms, socketUserId);

        } else {
          console.log("no tiene na");
        }
      }
    );
    nextExecutionTime = new Date(Date.now() + 30 * 60 * 1000);

    if (aux === 0) {
      task1.start();
      
    aux += 1;
    }
    io.on("disconnect", () => {
      task1.stop();
    })
    //cuando el usuario se desconecta esto sigue funcionando consumiendo procesos, si el usuario se vuelve a conectar esto sigue corriendo y suma otro proceso mas a la cola y asi suscesivamente
    console.log(aux);
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}
export default cronWatcher;

export function getTimeUntilNextExecution(): number | undefined {
  if (nextExecutionTime) {
    const currentTime = new Date().getTime();
    const nextExecutionTimestamp = nextExecutionTime.getTime();
    return nextExecutionTimestamp - currentTime;
  }
  return undefined;
}
