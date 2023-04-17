import React from "react";
import { CreateAlarm } from "./CreateAlarm";
import { UserAlarm } from "./UserAlarm";
import { Chroni } from "./Chroni";

export const AlarmLayout = () => {
  return (
    <div className="text-black text-center items-center justify-center w-full h-full">
      <Chroni />

      
        <div className="relative flex flex-row pt-20 items-center justify-center text-center m-auto p-5">

          <div className=" m-auto">
            <CreateAlarm />
          </div>

          <div className="w-[2px]">
           <p className=" bg-white h-[400px] w-1 m-auto"></p>
          </div>

          <div className=" m-auto ">
            <UserAlarm />
          </div>
        </div>

        
      
    </div>
  );
};
