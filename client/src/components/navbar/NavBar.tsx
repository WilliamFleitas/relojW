import React, { useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import {TfiAlarmClock, TfiTimer} from "react-icons/tfi";
import {RxTimer} from "react-icons/rx";
import {GiClockwork} from "react-icons/gi";
import {AiOutlineLogout} from "react-icons/ai";
import { useAppDispatch } from "../../hooks";
import { userSignOut } from "../../redux/userSlice/userAction";
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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleSignOutClick = () => {
  dispatch(userSignOut());
  navigate('/login');
  };
  return (
    <div className="flex flex-row lg:flex-col text-start items-center justify-between text-zinc-300 w-full lg:h-screen px-4 lg:px-0 py-2 lg:py-0 z-10">
     <div className="hidden lg:flex lg:flex-col  text-start items-center justify-center  w-full h-full min-h-[130px] max-h-[130px] text-zinc-300 ">
      <h2 className="w-fit h-fit p-1 rounded-md  bg-zinc-800 ">ONIONI</h2>
     </div>
      <div className="flex flex-row lg:flex-col  w-full text-start items-center justify-between h-fit lg:gap-y-8">
        {navBarOptions?.map((option) => (
          <button className="lg:hover:bg-[#2201016f] hover:text-zinc-600   w-full text-center flex items-center justify-center h-full lg:py-6 " type="button" key={option.id}>
            <option.Icon className="w-full min-w-6 max-w-6 h-full min-h-6 max-h-6"/>
          </button>
        ))}
      </div>

      <div className=" hidden lg:flex lg:flex-col w-full h-full max-h-[90px] text-start items-end justify-between mt-auto   text-zinc-600   hover:bg-[#2201016f]">
        <button className="w-full h-full flex text-start items-center justify-center" type="button" onClick={() => handleSignOutClick()}><AiOutlineLogout className="w-6 h-6 "/></button>
      </div >
      <div className="lg:hidden">
        <button className="w-4 h-4 py-4 px-4 my-1 flex rounded-full  bg-[#2201016f]  text-center items-center justify-center ">icon</button>
      </div>
    </div>
  );
};

export default NavBar;