import { alarmType } from "../typos";
import { io } from "../index";
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
import { createTalkDid } from "../requestAssets/createTalkDid";
const { Alarm, UserPreferences } = require("../database");
const { Op } = require("sequelize");
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
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

export const calculateTimeUntilAlarm = (
  alarmTime: string,
  userTimezone: string
) => {
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
  userId: string,
  userTimezone: string
) => {
  findAlarms.forEach(async (alarm) => {
    const hourAlarm = alarm.hour.slice(0, 5);
    const hourToMiliseconds = calculateTimeUntilAlarm(hourAlarm, userTimezone);
    const findUser = await UserPreferences.findOne({
      where: {
        userId: userId,
      },
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
        id: alarm.id,
      };
      global.timer = timer;
      if (findUser && findUser.avatarVideo === true) {
        createTalkDid(alarm.iaMessage, userId, findUser.didKey);
      }
      io.to(`user-${userId}`).emit("userAlarm", alertObjet);
      const totalGoalDays: string = dayjs(alarm.goalDateEnd)
        .diff(alarm.createdAt, "day")
        .toString();
      const goalDaysPassed: number = Number(
        dayjs().diff(dayjs(alarm.createdAt), "day")
      );
      const customAlarmOnGptFailed = `There was an error with the Ia Message, contact to the support or try again later, we apologize for the problems`;
      const gptPrompt = alarm.goalType
        ? `Act as a personal assistant updating your user on an upcoming event. The user has shared a goal, described as "${
            alarm.description
          }", with the end date set as "${
            alarm.goalDateEnd
          }". Since it's the day ${
            goalDaysPassed + 2
          } of ${totalGoalDays} of this endeavor, craft a response that resonates with the sentiment conveyed in the goal description. Your response may include words of congratulations, advice, celebration, support, or comfort, depending on the user's goal. Make the interaction engaging and share a fascinating fact or tidbit related to the user's goal.`
        : `Imagine you are a personal assistant, and your task is to inform the user about an upcoming alarm. You'll be given "${alarm.description}" as the cause for the alarm and "${alarm.hour}" as the set alarm time. Begin by crafting a creatively engaging comment about the purpose of this alarm. For example, if the alarm is related to eating, you might say something like, '12:00 PM is the classic lunch hour, or it's a popular time for a snack.' Then, follow up with an insightful comment about the chosen alarm time, discussing typical activities or events that occur during that hour. Wrap up your response by recommending a random song from the top 50 charts that perfectly complements the user's intended activity. Ensure that the song genre aligns with the activity. If the alarm reason is in Spanish, respond in Spanish; otherwise, respond in English. Use only these two languages.`;
        let response ;
      try {
        response = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: gptPrompt,
          temperature: 1,
          max_tokens: 256,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        });
      } catch (error: any) {
        console.log(error);
      }
      const AlarmUpdateObj = alarm.alarmType === "once" ? {
        enable: false,
        iaMessage:
          response && response.data.choices[0].text
            ? response.data.choices[0].text
            : customAlarmOnGptFailed,
      } : {
        iaMessage:
          response && response.data.choices[0].text
            ? response.data.choices[0].text
            : customAlarmOnGptFailed,
      }
      try {
        await Alarm.update(
          AlarmUpdateObj,
          {
            where: {
              id: alarm.id,
            },
          }
        );
      } catch (error) {
        console.log(error);
      }
        
      
    }, hourToMiliseconds);
  });
};
