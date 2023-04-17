import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import HorizontalNav from "./HorizontalNav";
// import RightNav from "./RightNav";


const NavBar = () => {
 
  
  return (
    <div className="z-10 w-[70px] p-5 bg-[#C88827] h-screen shadow-red-500 shadow-lg" >
      {/* border-r  border-[#E2725B] text-[#E2725B]top-[-2px] w-[60px] justify-around h-screen z-10 shadow-2xl shadow-[#B35642] */}
      {/* <div className="animation self-center hidden md:block" ><NavLink to="/" ><img className="h-[50px]" src={}/></NavLink></div>
      <div className="animation self-center md:hidden" ><NavLink to="/" ><img className="h-[50px]" src={logoMobile}/></NavLink></div> */}
      {/* <div className="md:hidden">
        <RightNav />
      </div> */}

      {/* <HorizontalNav /> */}
    </div>
  );
};

export default NavBar;