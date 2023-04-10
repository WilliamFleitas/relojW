import { getAlarms } from "./cronController";
const cron = require("node-cron");
// const dayjs = require("dayjs");

async function enviarNotificacion() {
  try {
    // Ejecutar la función cada hora en punto

    let aux = 0;

    cron.schedule("0 * * * *	", async () => {
      console.log("running a task every minute");
      
      const findAlarms = await getAlarms();
      if (findAlarms.length) {
        console.log("find", findAlarms);
        findAlarms.forEach((alarma: any) => {

          const hourAlarm = alarma.hour.slice(0, 5);
          console.log("houral", hourAlarm);
          console.log(`${hourAlarm.slice(0, 2)} + + + + ${hourAlarm.slice(3)}`)
          
        const task =  cron.schedule(`${Number(hourAlarm.slice(3))} ${Number(hourAlarm.slice(0, 2))} * * *`, () => {
            // Lógica para enviar la notificación
            console.log(`Alarma para ${alarma.description}`);
          }, {scheduled: true});

        task.start();
        });
      } else {
        console.log("no tiene na", findAlarms);
      }
      aux += 1;
      console.log(aux);
    }, { scheduled: true});
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}

export default enviarNotificacion;
