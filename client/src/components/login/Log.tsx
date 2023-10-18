import { useState } from "react";
import ChroniSignUp from "../../assets/ChroniLog2.png";
import ChroniSignIn from "../../assets/ChroniLog.png";
import SignUp from "./SignUp";
import SignIn from "./Signin";

const Log = () => {
 
    const [logSwitch, setLogSwitch] = useState(false);

    const handleSwitchButtonClick = (value: boolean) => {
        setLogSwitch(value);
    };
  return (
    <div className="flex flex-col w-screen h-screen text-zinc-300 text-start items-center justify-center md:p-5 ">
      <div className={`  flex flex-col overflow-scroll md:overflow-hidden sm:flex-row  text-start items-center justify-between fh:bg-[#673115]   fh:bg-opacity-[5%]  sm:shadow-md sm:border w-full sm:border-r-0 border-[#271309] h-full md:h-fit  md:min-w-[70vw] md:max-w-[70vw] min-h-[80vh] md:max-h-[80vh] md:rounded-[80px] `}>
        <div className={` transition-transform duration-500 ${logSwitch ? "sm:transform sm:translate-x-full ": ""}  z-50 hidden sm:flex flex-col w-full  text-start justify-center items-center h-full max-h-[120px] sm:max-h-full  relative `}>
          <img
            className={`w-full h-full object-cover   sm:transition-transform sm:duration-500 ${logSwitch ? "sm:transform ": ""}`}
            style={{width: "100%", aspectRatio: "745/315"}}
            src={logSwitch? ChroniSignUp : ChroniSignIn }
            alt={`${logSwitch? "ChroniSignUpBanner" : "ChroniSignInBanner" }`}
            
          />
          <div className="absolute bg-[#372e26] flex flex-col z-50 text-center items-center justify-center bg-opacity-[35%] w-full h-full ">
          </div>
        </div>
        <div className={` flex flex-col sm:duration-100 sm:transition-opacity ${logSwitch ? "sm:transform sm:-translate-x-full ": "sm:transform "} w-full  text-start justify-start items-center h-full sm:py-10 my-8 md:my-0`}
        >
            {
                logSwitch ? <SignUp changeViewFunction={handleSwitchButtonClick}/> : <SignIn  changeViewFunction={handleSwitchButtonClick}/> 
            }
        </div>
      </div>
    </div>
  );
};

export default Log;
