const {Alarm} = require("../database");
const {Op} = require("sequelize");
const dayjs = require("dayjs");

export const getAlarms = async () => {
    try {
        const today = dayjs().get("day");

        const actualHour = dayjs().format('HH:mm');

      const nextHour = dayjs().add(1, 'hour').format('HH:mm');
      console.log("actualHour", actualHour);
      console.log("nextHour", nextHour);
        const result = await Alarm.findAll({
            where : {
                alarmDays: {
                    [Op.contains] :[today]
                },
                hour: {
                    [Op.between]: [actualHour,nextHour]
                }
            },
            raw: true
        });
        return result;
    } catch (error: any) {
        console.log("error", error);
        throw new Error(error);
    }
};