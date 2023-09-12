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
            console.log(data);
            dispatch(setAlarmData(data));
        }).catch((e: any) => {
            dispatch(setError(e.message));
        }).finally(() => {
            dispatch(setLoadingAlarm(false));
        });
    }
    
};

export const updateEnableAlarm = (id:string, enableAlarma: boolean) => (dispatch : AppDispatch) => {
    
   const session = JSON.parse(window.localStorage.getItem("userSession") as string);
   if(!session){
      return Promise.reject(new Error("Inicie sesión"));
   }
   else {
       axios.put(`${BackUrl}/api/alarm/enable/${id}`,{enable: enableAlarma} , {
           headers: {
               "auth-token":`${session}`
           },
       }).then(({data}) => {
           console.log(data);
       }).catch((error: any) => {
        console.log(error);
       });
   }
};