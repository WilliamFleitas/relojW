import { alarmType } from "../../typos";
const {Alarm} = require("../../database");


export const createAlarm = async (body: alarmType) => {
    try {
        
        const result = await Alarm.create({
            hour: body.hour,
            description: body.description,
            alarmDays: body.alarmDays
        });
        await result.setUser(body.userId);
        return result;
    } catch (error: any) {
        console.log("error", error);
        throw new Error(error);
    }
};

