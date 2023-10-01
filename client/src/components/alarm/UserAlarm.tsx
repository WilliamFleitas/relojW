import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getUserAlarms } from "../../redux/alarmSlice/alarmAction";
import { IUserType } from "../../redux/userSlice";
import UserAlarmLayout from "./UserAlarmLayout";
interface UserAlarmsTypeProps {
  user: IUserType | null;
}
export const UserAlarm = ({user}: UserAlarmsTypeProps) => {
 
  const dispatch = useAppDispatch();
  const alarmList = useAppSelector((state) => state.alarm.alarmList);

  useEffect(() => {
    if (user?.id) {
      dispatch(getUserAlarms(user.id));
    }
  }, [ user?.id]);
 console.log(alarmList);
  return (
    <div className="flex flex-col w-full h-full md:my-6 lg:py-0 max-h-[43vh] fh:max-h-[42vh] md:max-h-[60vh]  lg:max-h-[65vh] overflow-y-scroll no-scrollbar text-start items-center justify-between  space-y-4">
      {alarmList && user?.id ? (
        alarmList.map((e) => {
          return (
            <div className="w-full h-full" key={e.id}>
           <UserAlarmLayout  userId={user.id} data={e}/>
           </div>
          );
        })
      ) : (
        <>Create alarm</>
      )}
    </div>
  );
};
