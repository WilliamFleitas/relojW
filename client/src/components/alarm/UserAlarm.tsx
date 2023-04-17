import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getUserAlarms } from "../../redux/alarmSlice/alarmAction";

export const UserAlarm = () => {
  const daysOfWeek = ["D", "L", "M", "M", "J", "V", "S"];
  const dispatch = useAppDispatch();
  const alarmList = useAppSelector((state) => state.alarm.alarmList);
  const { id } = useAppSelector((state) => state.user.user);
  console.log(alarmList);

  useEffect(() => {
    dispatch(getUserAlarms(id));
  }, [dispatch, id]);

  return (
    <div className="items-center justify-center text-center text-[#2C2A2A]">
      <div className="h-[400px] overflow-auto overflow-x-hidden p-2">
        {alarmList.length ? (
          alarmList.map((e) => {
            return (
              <div
                className="relative bg-[#C88827] my-5  w-[350px] h-[110px] rounded-sm space-x-3"
                key={e.id}
              >
                <h2 className="absolute text-start  top-1 left-2 text-[20px] w-[220px] h-[60px] overflow-auto">
                  {e.description ? `"${e.description}"` : <b>"{"UwU"}"</b>}
                </h2>

                <h3 className="absolute top-[-5px] right-4 text-[40px]">
                  <b>{e.hour.slice(0, 5)}</b>
                </h3>

                {/* <p className="absolute bottom-2 left-2 text-[20px]">{e.alarmDays.toString()}</p> */}
                <div className="flex flex-row text-start absolute bottom-1 left-[-3px] m-auto space-x-1 text-[20px]">
                  { e.alarmDays.length === 7 ? <h3 className="text-white">{"Diariamente"}</h3> : daysOfWeek.length ? (
                    daysOfWeek.map((days, index) => {
                      return (
                        <div
                          className={` ${
                            e.alarmDays.includes(index) ? 'text-white' : ''
                          }`}
                          key={days + index}
                        >
                          <h3 className="">{days}</h3>
                        </div>
                      );
                    })
                  ) : (
                    <></>
                  )}
                </div>
                <p className="absolute bottom-1 right-4 text-[20px]">
                  Suena en: 4H 20M
                </p>
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
