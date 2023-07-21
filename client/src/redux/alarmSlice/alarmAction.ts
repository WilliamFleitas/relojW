import axios from "axios";
import { AppDispatch } from "../../store";
import { clearAlarmList, setAlarmData, setError, setLoadingAlarm } from ".";

const BackUrl = (import.meta.env.VITE_BACK_URL as string);

export const getUserAlarms = (id: string) => (dispatch : AppDispatch) => {
    dispatch(clearAlarmList());
     dispatch(setLoadingAlarm(true));
    const session = JSON.parse(window.localStorage.getItem("userSession") as string);
    if(!session){
       return Promise.reject(new Error("Inicie sesión"));
    }
    else {
        axios.get(`${BackUrl}/api/user/useralarm/${id}`, {
            headers: {
                "auth-token":`${session}`
            },
        }).then(({data}) => {
            dispatch(setAlarmData(data.alarms));
        }).catch((e: any) => {
            dispatch(setError(e.message));
        }).finally(() => {
            dispatch(setLoadingAlarm(false));
        });
    }
    
};