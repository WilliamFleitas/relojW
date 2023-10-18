
import UserAlarmLayout from "./UserAlarmLayout";
import { AlarmType } from "../../../../redux/alarmSlice";
import { useAppSelector } from "../../../../hooks";
import UserAlarmsSkeleton from "../../../loading/UserAlarmsSkeleton";
interface UserAlarmsTypeProps {
  alarmList: AlarmType[] | null;
}
export const UserAlarms = ({alarmList}:UserAlarmsTypeProps) => {
  const { userAlarmsLoading} = useAppSelector((state) => state.alarm);

  if(userAlarmsLoading){
    return (
        <UserAlarmsSkeleton count={4}/>
    )
  } 
  return (
    <div className="flex flex-col w-full h-full md:my-6 lg:py-0 max-h-[70vh] md:max-h-[60vh]  lg:max-h-[65vh] overflow-y-scroll no-scrollbar text-start items-center justify-between  space-y-4">
      {alarmList  ? (
        alarmList.map((e) => {
          return (
            <div className="w-full h-full" key={e.id}>
           <UserAlarmLayout   data={e}/>
           </div>
          );
        })
      ) : (
        <>Create alarm</>
      )}
    </div>
  );
};
