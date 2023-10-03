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
    <div className="flex flex-col w-screen   h-screen text-zinc-300 text-start items-center justify-center p-5">
      <div className={`  flex flex-row  text-start items-center justify-between bg-[#673115] bg-opacity-[5%]  shadow-md border-2 border-r-0 border-[#271309]   min-w-[70vw] max-w-[70vw] min-h-[80vh] max-h-[80vh] rounded-[80px] overflow-hidden`}>
        <div className={`transition-transform duration-500 ${logSwitch ? "transform translate-x-full ": ""}  z-50 flex flex-col w-full  text-start justify-center items-center h-full  relative `}>
          <img
            className={`w-full h-full object-cover  transition-transform duration-500 ${logSwitch ? "transform ": ""}`}
            src={logSwitch? ChroniSignUp : ChroniSignIn }
            alt={`${logSwitch? "ChroniSignUpBanner" : "ChroniSignInBanner" }`}
          />
          <div className="absolute bg-[#372e26] flex flex-col z-50 text-center items-center justify-center bg-opacity-[35%] w-full h-full ">
          </div>
        </div>
        <div className={` flex flex-col duration-100 transition-opacity ${logSwitch ? "transform -translate-x-full ": "transform "} w-full  text-start justify-start items-center h-full py-10`}
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
