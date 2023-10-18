import dayjs from "dayjs";
import { useState } from "react";
import { IoMdArrowDropright } from "react-icons/io";
interface UserAlarmStatsTypeProps {
  actualWeek: number[];
  lastWeek: number[];
  timesSounded: number;
  createdAt: string;
  goalDateEnd: string | null;
  goalType: boolean;
}
const dateWeek = ["S", "M", "T", "W", "T", "F", "S"];
const UserAlarmStats = ({
  actualWeek,
  lastWeek,
  timesSounded,
  createdAt,
  goalDateEnd,
  goalType,
}: UserAlarmStatsTypeProps) => {
  const createdAtFormated = dayjs(createdAt).format("MMM DD/YY");
  const goalDateEndFormated = dayjs(goalDateEnd).format("MMM DD/YY");
  const totalGoalDays: string = dayjs(goalDateEnd)
    .diff(createdAt, "day")
    .toString();

  const [chartSwitch, setChartSwitch] = useState<boolean>(false);
  const goalDaysPassed: string = dayjs()
    .diff(dayjs(createdAt), "day")
    .toString();
    const handleChartSwitchClick =() => {
      setChartSwitch(!chartSwitch)
    };
  return (
    <div className="flex flex-col w-full h-full text-start items-center justify-between  pt-8  relative text-zinc-500">
     
      <div className="flex flex-row w-full h-fit  gap-x-2 text-start items-center justify-center px-4">
          <button className="" onClick={handleChartSwitchClick}>
            <IoMdArrowDropright  className="w-6 h-6"/>
          </button>
        {  
        !chartSwitch ? 
        dateWeek?.map((day, index) => (
          <div className="flex flex-col w-full h-full" key={index}>
            <div className="h-[70px] w-3 border border-zinc-700 rounded-md overflow-hidden  flex flex-col-reverse bg-zinc-800">
              <span
                className={`w-full bg-gradient-to-t  ${
                  actualWeek[index] <= 3
                    ? "from-green-500 "
                    : actualWeek[index] <= 8 && actualWeek[index] >= 4
                    ? "from-green-500 via-amber-600"
                    : "from-green-500 via-amber-600 to-red-800"
                } rounded-md`}
                style={{
                  height: `${Math.abs(actualWeek[index]) * 10}% `,
                  animation: `expandBar ${
                    Math.abs(actualWeek[index]) / 100
                  }s ease-in-out forwards`,
                }}
              ></span>
            </div>
            <span>{day}</span>
          </div>
        ))
         : 
         dateWeek?.map((day, index) => (
          <div className="flex flex-col w-full h-full" key={index}>
            <div className="h-[70px] w-3 border border-zinc-700 rounded-md overflow-hidden  flex flex-col-reverse bg-zinc-800">
              <span
                className={`w-full bg-gradient-to-t  ${
                  lastWeek[index] <= 3
                    ? "from-green-500 "
                    : lastWeek[index] <= 8 && lastWeek[index] >= 4
                    ? "from-green-500 via-amber-600"
                    : "from-green-500 via-amber-600 to-red-800"
                } rounded-md`}
                style={{
                  height: `${Math.abs(lastWeek[index]) * 10}% `,
                  animation: `expandBar ${
                    Math.abs(lastWeek[index]) / 100
                  }s ease-in-out forwards`,
                }}
              ></span>
            </div>
            <span>{day}</span>
          </div>
        ))
        }
      </div>
      <div className="flex flex-row flex-wrap px-4 py-2  w-full h-fit text-start items-center justify-between mt-2  bg-[#010000]">
        
        {goalType ? (
          <>
          <div className="flex flex-col gap-x-1 text-start">
          <label>Start</label>
          <span>{createdAtFormated}</span>
        </div>
            <div className="flex flex-col gap-x-1 text-end">
              <label>End</label>
              <span>{goalDateEndFormated}</span>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-x-1 text-center w-full">
          <label>Times Sounded</label>
          <span>{timesSounded}</span>
        </div>
        )}
        
      </div>
      {goalType ? (
        <div className="absolute top-0 right-0 flex flex-row text-start items-center rounded-tr-md rounded-bl-md gap-x-1 py-1 px-2 justify-center  border border-[#2713095e] bg-zinc-900  shadow-md ">
            <label>Days: </label>
          <span>
            {goalDaysPassed} / {totalGoalDays}
          </span>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default UserAlarmStats;
