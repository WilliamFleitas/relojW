import { forEachAlarmFunction, getUserAlarms } from "./cronController";
const cron = require("node-cron");


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
    
   return task;
   
  } catch (error: any) {
    throw new Error(error);
  }
}
export default cronWatcher;


