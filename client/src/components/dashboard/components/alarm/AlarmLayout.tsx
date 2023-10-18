import { CreateAlarm } from "./CreateAlarm";
import { Chroni } from "./Chroni";
import { BsSun } from "react-icons/bs";
import { GiNightSleep } from "react-icons/gi";
import { UserAlarms } from "./UserAlarms";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { getUserAlarms } from "../../../../redux/alarmSlice/alarmAction";
export const REPEAT_ALARM_OPTIONS = {
  once: "once",
  daily: "daily",
  custom: "custom",
};

export const AlarmLayout = () => {

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const {alarmList} = useAppSelector((state) => state.alarm);

  useEffect(() => {
    if (user?.id) {
      dispatch(getUserAlarms(user.id));
    }
  }, [user?.id]);

  
  return (
    <div className="flex flex-col w-full h-full py-4 md:py-0 text-start items-center justify-center select-none">
      <div className="hidden md:flex flex-col sticky top-0 w-full  h-fit  text-start items-start justify-start">
        <Chroni />
      </div>

      <div className="flex flex-col md:flex-row w-full h-full px-6 gap-x-4 my-2  text-start items-center justify-center">
        <div className="h-full w-full flex flex-col text-start items-center justify-between">
          <CreateAlarm user={user} />
          <div className="flex flex-col  w-full relative my-4">
          <div className="flex flex-col fh:flex-row w-full text-zinc-300   justify-between gap-x-6 md:gap-x-0">
            <div className="flex flex-row h-fit w-full fh:h-full  md:min-w-[20vw] md:max-w-[20vw] md:min-h-[125px] md:max-h-[125px] text-start items-start px-2 py-2 fh:py-4 bg-[#673115] bg-opacity-[5%] border border-[#2713095e] shadow-md rounded-md">
              <div className="flex flex-col w-full h-full  text-start items-center  gap-y-3">
                <BsSun className="w-10 h-10 fh:w-14 fh:h-14 text-amber-900 flex text-center  items-center justify-center " />
                <div className="flex text-start items-center justify-center ">
                  <label className="relative  flex cursor-pointer ">
                    <input
                      type="checkbox"
                      className="sr-only peer focus:outline-none focus:border-none border-none outline-none "
                      onChange={() => {}}
                    />
                    <div className="w-8 h-4 border border-[#121614]  bg-[#121614] focus:outline-none  rounded-full peer   peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[0px] after:left-[0px] after:right-[3px]  after:rounded-full after:h-4  after:shadow-sm  after:w-4 after:transition-all after:bg-zinc-800   peer-checked:bg-[#0a120c] peer-checked:after:border  after:border-zinc-800 peer-checked:border-[#0a120c] peer-checked:after:border-green-900 after:border peer-checked:after:bg-green-900 ">
                      {" "}
                    </div>
                  </label>
                </div>
              </div>
              <div className=" flex flex-col h-full w-full  text-start items-center justify-center m-auto">
                <span className=" text-[20px] fh:text-[35px] text-zinc-500 font-bold">
                  06:00{" "}
                </span>
                <span className="text-[13px] text-zinc-500">Wake Up</span>
              </div>
            </div>

            <div className="flex flex-row h-fit w-full fh:h-full  md:min-w-[20vw] md:max-w-[20vw] md:min-h-[125px] md:max-h-[125px] text-start items-start px-2 py-2 fh:py-4 bg-[#673115] bg-opacity-[5%] border border-[#2713095e] shadow-md rounded-md">
              <div className="flex flex-col w-full h-full  text-start items-center  gap-y-3">
                <GiNightSleep className="w-10 h-10 fh:w-14 fh:h-14 text-amber-900 flex text-center  items-center justify-center " />
                <div className="flex text-start items-center justify-center ">
                  <label className="relative  flex cursor-pointer ">
                    <input
                      type="checkbox"
                      className="sr-only peer focus:outline-none focus:border-none border-none outline-none "
                      onChange={() => {}}
                    />
                    <div className="w-8 h-4 border border-[#121614]  bg-[#121614] focus:outline-none  rounded-full peer   peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[0px] after:left-[0px] after:right-[3px]  after:rounded-full after:h-4  after:shadow-sm  after:w-4 after:transition-all after:bg-zinc-800   peer-checked:bg-[#0a120c] peer-checked:after:border  after:border-zinc-800 peer-checked:border-[#0a120c] peer-checked:after:border-green-900 after:border peer-checked:after:bg-green-900 ">
                      {" "}
                    </div>
                  </label>
                </div>
              </div>

              <div className=" flex flex-col h-full w-full  text-start items-center justify-center m-auto">
                <span className=" text-[20px] fh:text-[35px] text-zinc-500 font-bold">
                  12:00{" "}
                </span>
                <span className="text-[13px] text-zinc-500">Bed Time</span>
              </div>
            </div>
          </div>
          <div className="absolute w-full h-full top-0 bg-zinc-900 bg-opacity-[10%]  rounded-md text-center items-center justify-center flex flex-col z-5">
              <h3 className=" select-none  w-full bg-zinc-900 bg-opacity-[60%] text-center items-center m-auto justify-center flex flex-col py-2 ">Comming Soon</h3>
          </div>
          </div>
          
        </div>
        <div className="flex items-center">
          <p className=" mt-1 hidden md:flex bg-[#673115] bg-opacity-[5%]  shadow-md border border-[#2713095e]  rounded-full md:h-full md:min-h-[40vh] lg:min-h-[60vh] lg:max-h-[60vh] w-2 "></p>
        </div>

        <div className="w-full  flex flex-col h-full text-start items-center justify-center">
          <UserAlarms alarmList={alarmList} />
        </div>
      </div>
    </div>
  );
};
