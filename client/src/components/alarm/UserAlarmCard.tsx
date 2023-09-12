import React, { useEffect, useState } from "react";
import { AlarmType } from "../../redux/alarmSlice";
import { getUserAlarms, updateEnableAlarm } from "../../redux/alarmSlice/alarmAction";
import { useAppDispatch } from "../../hooks";

interface UserAlarmCard {
 data: AlarmType;
 userId: string;
};
const daysOfWeek = ["D", "L", "M", "M", "J", "V", "S"];
const UserAlarmCard = ({data, userId}: UserAlarmCard) => {
    
    const dispatch = useAppDispatch();
    const [AlarmEnable, setEnableAlarm] = useState(data.enable);

    const handleAlarmEnableChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target;
        dispatch(updateEnableAlarm(target.value, !AlarmEnable));
        setEnableAlarm(!AlarmEnable);
      };
      
   
    return(
        <div
        className={`flex flex-row w-full  h-full md:min-h-[15vh] max-h-[15vh]  text-start rounded-md `}
        key={data.id}
      >
        <div className="flex flex-col w-full text-start items-center justify-between">
          <div className={`flex  text-[#9b958d] flex-col p-4 w-full h-full overflow-y-scroll no-scrollbar rounded-tl-md border border-b-0 border-r-0 ${AlarmEnable ? "bg-[#ba5d0649]  border-[#ba5d06]" : "bg-zinc-700 border-zinc-400"}`}>
            <h2 className=" font-bold text-[15px]">
              {data.description ? `"${data.description}"` : <b>"{"UwU"}"</b>}
            </h2>
          </div>
          <div className={`flex flex-row h-full min-h-[5vh] max-h-[5vh] bg-zinc-800  w-full text-start items-center justify-between p-2 gap-x-2 rounded-bl-md border border-r-0 border-[#ba5d06] text-[14px] ${AlarmEnable ? "border-[#ba5d06]" : "border-zinc-400"}`}>
            {data.alarmDays.length === 7 ? (
              <h3 className="text-[#9b958d] font-bold tracking-wider">
                {"Diariamente".toUpperCase()}
              </h3>
            ) : daysOfWeek.length ? (
              daysOfWeek.map((days, index) => {
                return (
                  <div
                    className={` ${
                      data.alarmDays.includes(index) ? "text-[#9b958d]" : ""
                    }`}
                    key={days + index}
                  >
                    <h3 className=" font-bold tracking-wider">
                      {days.toUpperCase()}
                    </h3>
                  </div>
                );
              })
            ) : (
              <></>
            )}
            <p className=" text-[#9b958d] font-medium flex flex-row"><span className="hidden lg:flex ">suena en:</span> 4H 20M</p>
          </div>
        </div>

        <div className={`flex flex-col bg-zinc-800 rounded-r-md text-[#9b958d] ml-auto border  ${AlarmEnable ? "border-[#ba5d06]" : "border-zinc-400"}  p-4 text-start items-center justify-between md:min-w-[8vw] lg:min-w-[10vw] font-bold`}>
          <h3 className=" ">{data.hour.slice(0, 5)}</h3>
          <div className="flex flex-row text-start items-center justify-between ">
            <label className="relative inline-flex items-center cursor-pointer ">
              <input
                type="checkbox"
                value={data.id}
                defaultChecked={data.enable}
                className="sr-only peer focus:outline-none focus:border-none border-none outline-none "
                onChange={(event) => handleAlarmEnableChange(event)}
              />
              <div className="w-8 h-4 border border-zinc-400 bg-[#31221549] focus:outline-none  rounded-full peer   peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[0px] after:left-[0px] after:right-[3px]  after:rounded-full after:h-4  after:shadow-sm  after:w-4 after:transition-all after:bg-[#2d2b28]   peer-checked:bg-[#ba5d0649] peer-checked:after:border  after:border-zinc-400 peer-checked:border-[#ba5d06] peer-checked:after:border-[#ba5d06] after:border peer-checked:after:bg-[#ba5d0649] ">
                {" "}
              </div>
            </label>
          </div>
        </div>
      </div>
    )
};

export default UserAlarmCard;