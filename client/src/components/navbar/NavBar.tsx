import React, { useEffect } from "react";
import {  Link, useNavigate } from "react-router-dom";
import {TfiAlarmClock, TfiTimer} from "react-icons/tfi";
import {RxTimer} from "react-icons/rx";
import {AiOutlineLogout, AiTwotoneSetting} from "react-icons/ai";
import { useAppDispatch } from "../../hooks";
import { userSignOut } from "../../redux/userSlice/userAction";
const navBarOptions = [
  {
    label: "Alarm",
    value: "alarm",
    link: "/dashboard/alarm",
    id:0,
    Icon: TfiAlarmClock,
  },
  // {
  //   label: "Timer",
  //   value: "timer",
  //   link: "/alarm",
  //   id:1,
  //   Icon: RxTimer,
  // },
  // {
  //   label: "Chronometer",
  //   value: "chronometer",
  //   link: "/alarm",
  //   id:2,
  //   Icon: TfiTimer,
  // }
  
];
const NavBar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleSignOutClick = () => {
  dispatch(userSignOut());
  navigate('/login');
  };
  return (
    <div className="flex flex-row lg:flex-col text-start items-center justify-between text-zinc-300 w-full lg:h-screen  lg:px-0  lg:py-0 z-20">
     <div className="hidden lg:flex lg:flex-col  text-start items-center justify-center  w-full h-full min-h-[130px] max-h-[130px] text-zinc-300 ">
      <h2 className="w-fit h-fit p-1 rounded-md  bg-zinc-800 ">ONIONI</h2>
     </div>
      <div className="flex flex-row lg:flex-col  w-full  lg:w-full text-start items-center justify-center h-fit lg:gap-y-8">
        {navBarOptions?.map((option) => (
          <Link to={option.link} className="hover:bg-[#2201016f] hover:text-zinc-600 px-6 lg:px-0 min-h-[50px] lg:min-h-fit min-w-[80px] fh:min-w-[150px] lg:min-w-fit  lg:w-full text-center flex items-center justify-center h-full lg:py-6 "  key={option.id}>
            <option.Icon className="w-full min-w-6 max-w-6 h-full min-h-6 max-h-6"/>
          </Link>
        ))}
      </div>
      
      <div className="flex flex-row border-l lg:border-l-0 border-zinc-800 justify-between lg:flex-col w-fit lg:w-full h-fit mt-auto gap-4 lg:gap-0">
      <div className="flex flex-col w-fit lg:w-full h-full  text-start items-end lg:items-center justify-between   text-zinc-600   hover:bg-[#2201016f]">
        <Link to={"/dashboard/settings"}  className="w-full h-full flex text-start items-center justify-center px-6 lg:px-0 min-h-[50px] lg:min-h-[90px]"><AiTwotoneSetting className="w-6 h-6 "/></Link>
      </div >
      <div className="flex flex-col w-fit lg:w-full h-full  text-start items-end justify-between   text-zinc-600   hover:bg-[#2201016f]">
        <button className="w-full h-full flex text-start items-center justify-center px-6 lg:px-0 min-h-[50px] lg:min-h-[90px]" type="button" onClick={() => handleSignOutClick()}><AiOutlineLogout className="w-6 h-6 "/></button>
      </div >  
      </div>
    </div>
  );
};

export default NavBar;