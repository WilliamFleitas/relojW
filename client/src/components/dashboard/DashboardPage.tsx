import React, { useEffect, useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { AlarmLayout } from "../alarm/AlarmLayout";
import { Home } from "./components/Home";
import NavBar from "../navbar/NavBar";
import { io } from "socket.io-client";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getUserData } from "../../redux/userSlice/userAction";
import ModalAlarm from "../utils/ModalAlarm";
import { AlarmScreen } from "../alarm/AlarmScreen";
import { IUserType } from "../../redux/userSlice";
const socket = io("http://localhost:3001");

interface userDataTypes {
  data: string;
  description: string;
  hour: string;
  iaMessage: string;
  iaVideo: Blob;
}

interface DashboardPageTypeProps {
  user: IUserType | null;
}

const DashboardLayout = ({ user }: DashboardPageTypeProps) => {
  // const session = JSON.parse(
  //     window.localStorage.getItem("userSession") as string
  //   );
  const [alarmMessage, setAlarmMessage] = useState<userDataTypes>();
  const [alarmSwitch, setAlarmSwitch] = useState<boolean>(false);

  socket.on("userAlarm", (data) => {
    console.log("userAlarm:", data);
    setAlarmMessage(data);
    setAlarmSwitch(true);
  });
  useEffect(() => {
    if (user?.username.length) {
      socket.emit("dataUser", {
        username: user?.username,
        userId: user?.id,
      });
    }
    return () => {};
  }, [user]);
  return (
    <div className="relative flex flex-col md:flex-row w-full md:h-screen text-center items-center justify-between">
      <div className="flex flex-col md:block w-full  h-full md:order-last">
        <Outlet />
      </div>
      {alarmMessage ? (
        <ModalAlarm
          isOpen={alarmSwitch}
          onClose={setAlarmSwitch}
          header={"Alarm"}
          Content={
            <AlarmScreen
              iaVideo={alarmMessage.iaVideo}
              iaMessage={alarmMessage.iaMessage}
              description={alarmMessage.description}
              data={alarmMessage.data}
              hour={alarmMessage.hour}
            />
          }
        />
      ) : (
        <></>
      )}
      <div className=" md:order-first sticky md:relative  bottom-0 w-full border-t md:border-t-0 flex  h-fit  md:py-0  md:min-h-screen md:min-w-[80px] md:max-w-[80px] bg-[#4b2d14] md:bg-[#ba5d0649]  md:border-r border-[#ba5d06]">
        <NavBar />
      </div>
    </div>
  );
};

const DashboardPage = ({ user }: DashboardPageTypeProps) => (
  <Routes>
    <Route element={<DashboardLayout user={user} />}>
      <Route index element={<AlarmLayout />} />
      {/* <Route path="/home" element={<Home/>}/> */}
      <Route path="/alarm" element={<AlarmLayout />} />
    </Route>
  </Routes>
);

export { DashboardPage };
