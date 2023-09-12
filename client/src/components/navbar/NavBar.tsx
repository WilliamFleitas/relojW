import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import HorizontalNav from "./HorizontalNav";
import {TfiAlarmClock, TfiTimer} from "react-icons/tfi";
import {RxTimer} from "react-icons/rx";
import {GiClockwork} from "react-icons/gi";
import {AiOutlineLogout} from "react-icons/ai";
const navBarOptions = [
  {
    label: "Alarm",
    value: "alarm",
    id:0,
    Icon: TfiAlarmClock,
  },
  {
    label: "Timer",
    value: "timer",
    id:1,
    Icon: RxTimer,
  },
  {
    label: "Chronometer",
    value: "chronometer",
    id:2,
    Icon: TfiTimer,
  }
  ,
  {
    label: "Clock",
    value: "clock",
    id:3,
    Icon: GiClockwork,
  }
]
const NavBar = () => {
 
  
  return (
    <div className="flex flex-row md:flex-col text-start items-center justify-between text-zinc-900 w-full md:h-screen px-4 md:px-0 py-2 md:py-0 ">
     <div className="hidden md:flex md:flex-col  text-start items-center justify-center  w-full h-full min-h-[130px] max-h-[130px] text-[#9b958d] ">
      <h2 className="w-fit h-fit p-1 rounded-md text-white  bg-zinc-800 ">ONIONI</h2>
     </div>
      <div className="flex flex-row md:flex-col  w-full text-start items-center justify-between h-fit md:gap-y-8">
        {navBarOptions?.map((option) => (
          <button className="md:hover:bg-zinc-900 hover:text-zinc-600   w-full text-center flex items-center justify-center h-full md:py-6 " type="button" key={option.id}>
            <option.Icon className="w-full min-w-6 max-w-6 h-full min-h-6 max-h-6"/>
          </button>
        ))}
      </div>

      <div className=" hidden md:flex md:flex-col w-full h-full max-h-[90px] text-start items-end justify-between mt-auto   text-black hover:text-zinc-700 hover:bg-zinc-900">
        <button className="w-full h-full flex text-start items-center justify-center" type="button"><AiOutlineLogout className="w-6 h-6 "/></button>
      </div >
      <div className="md:hidden">
        <button className="w-4 h-4 py-4 px-4 my-1 flex rounded-full bg-black  text-center items-center justify-center ">icon</button>
      </div>
    </div>
  );
};

export default NavBar;