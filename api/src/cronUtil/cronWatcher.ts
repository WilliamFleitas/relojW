import { forEachAlarmFunction, getUserAlarms } from "./cronController";
const cron = require("node-cron");

// let nextExecutionTime: Date | undefined;
async function cronWatcher(userId: string, userTimezone: string) {
  try {
    console.log("Looking for alarms1");
        const findAlarms = await getUserAlarms(userId, userTimezone);
        if (findAlarms.length) {
          console.log("find", findAlarms.length)
          forEachAlarmFunction(findAlarms, userId, userTimezone);
        } 
  } catch (error) {
    console.log(error);
  }
  try {
   const task = cron.schedule(
    '*/10 * * * *',
      async () => {
        console.log("Looking for alarms");
        const findAlarms = await getUserAlarms(userId, userTimezone);
        if (findAlarms.length) {
          console.log("find2", findAlarms.length)
          forEachAlarmFunction(findAlarms, userId, userTimezone);
        } 
      },  {
        schedule: true, 
      }
    );
    // nextExecutionTime = new Date(Date.now() + 30 * 60 * 1000);
   return task;
   
  } catch (error: any) {
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
