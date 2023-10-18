import { alarmType } from "../typos";
import { io } from "../index";
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
import { createTalkDid } from "../requestAssets/createTalkDid";
const { Alarm, UserPreferences } = require("../database");
const { Op } = require("sequelize");
const dayjs = require("dayjs");
dayjs.extend(utc);
dayjs.extend(timezone);

declare global {
  var timer: NodeJS.Timeout | undefined;
}

export const getUserAlarms = async (userId: string, userTimezone: string) => {
  try {
    const today = dayjs().tz(userTimezone).get("day");
    const actualHour = dayjs().tz(userTimezone).format("HH:mm");

    // const nextHour = dayjs().tz(userTimezone).format("HH:mm");
    const nextHour = dayjs().add(10, "minute").format("HH:mm");
    const result = await Alarm.findAll({
      where: {
        userId: userId,
        enable: true,
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
    throw new Error(error);
  }
};

export const calculateTimeUntilAlarm = (alarmTime: string, userTimezone: string) => {
  const now = dayjs().tz(userTimezone);
  const currentHour = now.hour();
  const currentMinute = now.minute();
  const currentSecond = now.second();

  const [alarmHour, alarmMinute] = alarmTime.split(":");

  const hourDiff = parseInt(alarmHour, 10) - currentHour;
  const minuteDiff = parseInt(alarmMinute, 10) - currentMinute;

  const timeUntilAlarm =
    (hourDiff * 3600 + minuteDiff * 60 - currentSecond) * 1000;

  return timeUntilAlarm;
};

export const forEachAlarmFunction = (
  findAlarms: alarmType[],
  userId: string, userTimezone: string
) => {
  findAlarms.forEach(async (alarm) => {
    const hourAlarm = alarm.hour.slice(0, 5);
    const hourToMiliseconds = calculateTimeUntilAlarm(hourAlarm, userTimezone);
    const findUser = await UserPreferences.findOne({
      where: {
        userId: userId
      }
    });
    
      
    const timer = setTimeout(async () => {
      const alertObjet = {
        iaMessage: alarm.iaMessage,
        hour: alarm.hour,
        description: alarm.description,
        goalType: alarm.goalType,
        goalDateEnd: alarm.goalDateEnd,
        goalNotes: alarm.goalNotes,
        goalNotesDates: alarm.goalNotesDates,
        createdAt: alarm.createdAt,
        id: alarm.id
      };
      global.timer = timer;
      if(findUser && findUser.avatarVideo === true){
        createTalkDid(alarm.iaMessage, userId, findUser.didKey);
      }
      io.to(`user-${userId}`).emit("userAlarm", alertObjet);
      if (alarm.alarmType === "once") {
        try {
          await Alarm.update(
            { enable: false },
            {
              where: {
                id: alarm.id,
              },
            }
          );
        } catch (error: any) {
          throw new Error(error);
        }
      }
    }, hourToMiliseconds);
  });
};
