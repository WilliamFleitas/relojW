import { alarmType } from "../typos";
import { io } from "../index";
const { Alarm } = require("../database");
const { Op } = require("sequelize");
const dayjs = require("dayjs");

export const getUserAlarms = async (userId: string) => {
  try {
    const today = dayjs().get("day");

    const actualHour = dayjs().format("HH:MM");

    const nextHour = dayjs().add(10, "minute").format("HH:MM");
    const result = await Alarm.findAll({
      where: {
        userId: userId,
        alarmDays: {
          [Op.contains]: [today],
        },
        hour: {
          [Op.between]: [actualHour, nextHour],
        },
      },
      raw: true,
    });
    return result;
  } catch (error: any) {
    console.log("error", error);
    throw new Error(error);
  }
};


export const calculateTimeUntilAlarm = (alarmTime: string) => {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentSecond = now.getSeconds();

  const [alarmHour, alarmMinute] = alarmTime.split(":");
  
  
  const hourDiff = parseInt(alarmHour, 10) - currentHour;
  const minuteDiff = parseInt(alarmMinute, 10) - currentMinute;

  
  const timeUntilAlarm = (hourDiff * 3600 + minuteDiff * 60 - currentSecond) * 1000;

  return timeUntilAlarm;
};

 
export const forEachAlarmFunction = (
  findAlarms : alarmType[], 
  socketUserId: string) => {

  findAlarms.forEach(async (alarm, index) => {
    const hourAlarm = alarm.hour.slice(0, 5);
    const hourToMiliseconds = calculateTimeUntilAlarm(hourAlarm);
    

    setTimeout(() => {
      console.log("¡Es hora de sonar la alarma!", index);
      const alertObjet = {
        data: `Alarma para ${
          alarm.description ? alarm.description : "uwu"
        } + ${alarm.hour}`,
        iaMessage: alarm.iaMessage,
        iaVideo: alarm.iaVideo,
        hour: alarm.hour,
        description: alarm.description,
      };
      io.to(socketUserId).emit("userAlarm", alertObjet);
    }, hourToMiliseconds);
    
  });
};