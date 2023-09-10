import React from "react";
import { CreateAlarm } from "./CreateAlarm";
import { UserAlarm } from "./UserAlarm";
import { Chroni } from "./Chroni";

export const AlarmLayout = () => {
  return (
    <div className="text-black text-center items-center justify-center w-full h-full">
      <Chroni />

      
        <div className=" flex flex-row pt-14 items-center justify-between text-center p-5 gap-x-4">

          <div className=" w-full m-auto">
            <CreateAlarm />
          </div>

          <div className="">
           <p className=" bg-zinc-800 rounded-full h-[70vh] w-2 "></p>
          </div>

          <div className="w-full ">
            <UserAlarm />
          </div>
        </div>

        
      
    </div>
  );
};
