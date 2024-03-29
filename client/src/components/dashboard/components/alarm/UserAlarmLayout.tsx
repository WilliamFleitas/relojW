import  { useState } from "react";
import { AlarmType } from "../../../../redux/alarmSlice";
import { useAppDispatch } from "../../../../hooks";
import UserAlarmCard from "./userAlarmsAssets/UserAlarmCard";
import UserAlarmStats from "./userAlarmsAssets/UserAlarmStats";
import {GiStairsGoal} from "react-icons/gi";
import {TfiAlarmClock} from "react-icons/tfi";
import { AiOutlineRadarChart} from "react-icons/ai";
interface UserAlarmLayoutTypeProps {
  data: AlarmType;
}

const UserAlarmLayout = ({ data}: UserAlarmLayoutTypeProps) => {
  const dispatch = useAppDispatch();
  const [alarmEnable, setEnableAlarm] = useState<boolean>(data.enable);
  const [statsSwitch, setStatsSwitch] = useState<boolean>(false);

  const handleStatsSwitchButton = (value: boolean) => {
    setStatsSwitch(value);
  };

  return (
    <div
      className={`flex flex-col relative w-full h-fit  text-start items-center justify-between rounded-md ${
        alarmEnable
          ? "bg-[#673115] bg-opacity-[5%] shadow-md  "
          : "bg-[#01000062]"
      } border border-[#2713095e] overflow-hidden`}
      key={data.id}
    >
      {alarmEnable ? (
        <div className="absolute top-0 left-0 flex flex-row text-start items-center rounded-tl-md rounded-br-md  justify-center  border border-[#2713095e] bg-zinc-900  shadow-md ">
          <button
            className={` z-10 py-1 px-2  h-full  w-9  hover:bg-[#01000091] rounded-tl-md rounded-br-md  text-center items-center flex flex-row justify-center ${!statsSwitch ? "bg-zinc-800 " : "bg-zinc-900"}`}
            type="button"
            onClick={() => handleStatsSwitchButton(false)}
          >
            {
              data.goalType ? 
              <GiStairsGoal
            style={{pointerEvents: "none"}}
              className="w-4 h-4 text-zinc-400 z-0"
            /> :
            <TfiAlarmClock
            style={{pointerEvents: "none"}}
              className="w-4 h-4 text-zinc-400 z-0"
            />
            }
           
          </button>
          <button
            className={`  px-2 py-1 h-full  w-9 hover:bg-[#01000091]  text-center items-center flex flex-row justify-center rounded-tl-md  rounded-br-md ${statsSwitch ? "bg-zinc-800 " : "bg-zinc-900 "}`}
            type="button"
            onClick={() => handleStatsSwitchButton(true)}
          >
            <AiOutlineRadarChart
            style={{pointerEvents: "none"}}
              className="w-4 h-4 text-amber-500"
            />
          </button>
        </div>
      ) : (
        <></>
      )}

      {statsSwitch ? (
        <UserAlarmStats
          actualWeek={data.alarmAnalytic.actualWeek}
          lastWeek={data.alarmAnalytic.lastWeek}
          goalType={data.goalType}
          goalDateEnd={data.goalDateEnd}
          timesSounded={data.alarmAnalytic.timesSounded}
          createdAt={data.createdAt}
        />
      ) : (
        <UserAlarmCard
          data={data}
          userId={data.userId}
          alarmEnable={alarmEnable}
          alarmEnableOnChange={setEnableAlarm}
        />
      )}
    </div>
  );
};

export default UserAlarmLayout;
