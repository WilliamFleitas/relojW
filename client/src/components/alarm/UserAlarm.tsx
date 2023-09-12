import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getUserAlarms } from "../../redux/alarmSlice/alarmAction";
import UserAlarmCard from "./UserAlarmCard";

export const UserAlarm = () => {
 
  const dispatch = useAppDispatch();
  const alarmList = useAppSelector((state) => state.alarm.alarmList);
  const { user } = useAppSelector((state) => state.user);

  

  useEffect(() => {
    if (user?.id) {
      dispatch(getUserAlarms(user.id));
    }
  }, [ user?.id]);
 
  
  return (
    <div className="flex flex-col w-full h-full md:max-h-[80vh]  overflow-y-scroll no-scrollbar text-start items-center justify-between  space-y-4">
      {alarmList.length && user?.id ? (
        alarmList.map((e) => {
          return (
           <UserAlarmCard userId={user?.id} data={e}/>
          );
        })
      ) : (
        <>Create alarm</>
      )}
    </div>
  );
};
