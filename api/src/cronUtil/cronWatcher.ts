import { forEachAlarmFunction, getUserAlarms } from "./cronController";
const cron = require("node-cron");

// let nextExecutionTime: Date | undefined;
let aux = 0;
async function cronWatcher(userId: string) {
  console.log("usertomapidStartCronWatcher", userId);
  try {
   const task = cron.schedule(
      "*/1 * * * *",
      // */30 * * * *
      async () => {
        // 0 * * * *
        aux += 1;
        console.log("Looking for alarms");
        console.log("aux", aux);
        const findAlarms = await getUserAlarms(userId);
        if (findAlarms.length) {
          console.log("tiene algo", findAlarms.length);
          forEachAlarmFunction(findAlarms, userId);

        } else {
          console.log("no tiene na", findAlarms.length);
        }
      },  {
        schedule: false, 
      }
    );
    // nextExecutionTime = new Date(Date.now() + 30 * 60 * 1000);
   return task;
   
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}
export default cronWatcher;

// export function getTimeUntilNextExecution(): number | undefined {
//   if (nextExecutionTime) {
//     const currentTime = new Date().getTime();
//     const nextExecutionTimestamp = nextExecutionTime.getTime();
//     return nextExecutionTimestamp - currentTime;
//   }
//   return undefined;
// }
