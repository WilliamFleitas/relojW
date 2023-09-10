import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getUserAlarms } from "../../redux/alarmSlice/alarmAction";

export const UserAlarm = () => {
  const daysOfWeek = ["D", "L", "M", "M", "J", "V", "S"];
  const dispatch = useAppDispatch();
  const alarmList = useAppSelector((state) => state.alarm.alarmList);
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (user?.id) {
      dispatch(getUserAlarms(user.id));
    }
  }, [dispatch, user?.id]);

  return (
    <div className="flex flex-col w-full h-full text-start items-center justify-between text-[#2C2A2A] space-y-4">
      {alarmList.length ? (
        alarmList.map((e) => {
          return (
            <div
              className="flex flex-row  h-full min-h-[15vh] max-h-[15vh] min-w-[50vw] max-w-[50vw] text-start rounded-md border border-[#ba5d06]"
              key={e.id}
            >
              <div className="flex flex-col w-full text-start items-center justify-between">
                <div className="flex bg-[#ba5d0649] text-white flex-col p-4 w-full h-full overflow-y-scroll no-scrollbar rounded-tl-md">
                  <h2 className=" font-bold text-[15px]">
                    {e.description ? `"${e.description}"` : <b>"{"UwU"}"</b>}
                  </h2>
                </div>
                <div className="flex flex-row h-full min-h-[5vh] max-h-[5vh] bg-zinc-800 text-white w-full text-start items-center justify-between p-2 gap-x-2 rounded-bl-md border-t border-[#ba5d06] text-[14px]">
                  {e.alarmDays.length === 7 ? (
                    <h3 className="text-white font-bold tracking-wider">
                      {"Diariamente".toUpperCase()}
                    </h3>
                  ) : daysOfWeek.length ? (
                    daysOfWeek.map((days, index) => {
                      return (
                        <div
                          className={` ${
                            e.alarmDays.includes(index) ? "text-white" : ""
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
                  <p className=" text-zinc-300 font-medium">suena en: 4H 20M</p>
                </div>
              </div>

              <div className="flex flex-col bg-zinc-800 rounded-r-md text-white ml-auto border-l border-[#ba5d06]  p-4 text-start items-center justify-between min-w-[10vw] font-bold">
                <h3 className=" ">{e.hour.slice(0, 5)}</h3>
                <div className="flex flex-row text-start items-center justify-between ">
                  <label className="relative inline-flex items-center cursor-pointer ">
                    <input
                      type="checkbox"
                      value=""
                      className="sr-only peer focus:outline-none focus:border-none border-none outline-none "
                    />
                    <div className="w-8 h-4 border border-[#ba5d06] bg-[#31221549] focus:outline-none  rounded-full peer   peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[0px] after:left-[0px] after:right-[3px]  after:rounded-full after:h-4  after:shadow-sm  after:w-4 after:transition-all after:bg-[#2d2b28]   peer-checked:bg-[#ba5d0649] peer-checked:after:border  after:border-[#ba5d06] after:border peer-checked:after:bg-[#ba5d0649] ">
                      {" "}
                    </div>
                  </label>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
};
