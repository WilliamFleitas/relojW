import axios from "axios";
import { AppDispatch } from "../../store";
import { clearAlarmList, clearGoalNotes, setAlarmData, setError, setGoalNotes, setLoadingAlarm } from ".";

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
            dispatch(setAlarmData(data));
        }).catch((e: any) => {
            dispatch(setError(e.message));
        }).finally(() => {
            dispatch(setLoadingAlarm(false));
        });
    }
    
};

export const getUserNotes = (id: string) => (dispatch : AppDispatch) => {
 axios.get(`${BackUrl}/api/alarm/getNotes/${id}`).then(({data}) => {
    
    dispatch(setGoalNotes(data));
  }).catch((error:any) => {
    console.log(error);
  })
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
          
       }).catch((error: any) => {
        console.log(error);
       });
   }
};

export const deleteAlarm = (id:string, userId:string) => (dispatch : AppDispatch) => {
    
    const session = JSON.parse(window.localStorage.getItem("userSession") as string);
    if(!session){
       return Promise.reject(new Error("Inicie sesión"));
    }
    else {
        axios.delete(`${BackUrl}/api/alarm/deleteAlarm/${id}`, {
            headers: {
                "auth-token":`${session}`
            },
        }).then(({data}) => {
            
            dispatch(getUserAlarms(userId));
        }).catch((error: any) => {
         console.log(error);
        });
    }
 };