const { Alarm } = require("../database");
const { Op } = require("sequelize");
const dayjs = require("dayjs");

export const getUserAlarms = async (userId: string) => {
  console.log("userididid", userId);
  try {
    const today = dayjs().get("day");

    const actualHour = dayjs().format("HH:mm");

    const nextHour = dayjs().add(10, "minute").format("HH:mm");
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
