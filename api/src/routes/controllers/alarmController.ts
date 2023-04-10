import { alarmType } from "../../typos";
const {Alarm} = require("../../database");


export const createAlarm = async (body: alarmType) => {
    try {
        console.log("body2", body);
        const result = await Alarm.create(body);
        return result;
    } catch (error: any) {
        console.log("error", error);
        throw new Error(error);
    }
};