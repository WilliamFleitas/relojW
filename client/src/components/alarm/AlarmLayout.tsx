import React from "react";
import { CreateAlarm } from "./CreateAlarm";
import { UserAlarm } from "./UserAlarm";
import { Chroni } from "./Chroni";

export const AlarmLayout = () => {
  return (
    <div className="flex flex-col w-full h-full text-start  justify-between">
      <div className="hidden md:flex flex-col w-full h-full mt-auto text-start items-start justify-start">
      <Chroni />
      </div>

      
        <div className=" flex flex-col md:flex-row  text-start items-center justify-between px-6 py-2 gap-x-4 ">

          <div className=" w-full m-auto pb-6 md:pb-0 ">
            <CreateAlarm />
          </div>

          <div className="">
           <p className=" mt-1 hidden md:flex bg-[#ba5d0608] border border-[#ba5d06] rounded-full md:h-full min-h-[80vh] w-2 "></p>
          </div>

          <div className="w-full ">
            <UserAlarm />
          </div>
        </div>

        
      
    </div>
  );
};
