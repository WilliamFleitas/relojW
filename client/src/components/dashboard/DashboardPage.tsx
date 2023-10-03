import React, { useEffect, useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { AlarmLayout } from "../alarm/AlarmLayout";
import NavBar from "../navbar/NavBar";
import { io } from "socket.io-client";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getUserData } from "../../redux/userSlice/userAction";
import ModalAlarm from "../utils/ModalAlarm";
import { AlarmScreen } from "../alarm/AlarmScreen";
import { IUserType } from "../../redux/userSlice";
const BackUrl = (import.meta.env.VITE_BACK_URL as string);
const socket = io(BackUrl);

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

const DashboardLayout = () => {
  const dispatch = useAppDispatch();
  const {user} = useAppSelector((state) => state.user);
  const [alarmMessage, setAlarmMessage] = useState<userDataTypes | null>(null);
  const [iaVideo, setIaVideo] = useState<Blob | null>(null);
  const [alarmSwitch, setAlarmSwitch] = useState<boolean>(false);

  socket.on("userAlarm", (data) => {
    setAlarmMessage(null);
    setAlarmMessage(data);
    setAlarmSwitch(true);
    socket.on("iaVideoResult", (iaVideo) => {
      console.log("fueradeluseEffect", iaVideo);
      setIaVideo(iaVideo);
    }); 
  });
  useEffect(() => {
    if (user?.username.length) {
      socket.emit("dataUser", {
        username: user.username,
        userId: user.id,
      });
    }
    return () => {};
  }, [user]);
  useEffect(()=> {
 dispatch(getUserData());
  },[]);
  return (
    <div className="relative flex flex-col lg:flex-row w-full h-screen text-center items-center justify-between">
      {alarmMessage ? (
        <ModalAlarm
          isOpen={alarmSwitch}
          onClose={setAlarmSwitch}
          header={"Alarm"}
          Content={
            <AlarmScreen
              onClose={setAlarmSwitch}
              iaVideo={iaVideo}
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
      <div className="flex flex-col lg:block w-full  h-full lg:order-last">
        <Outlet />
      </div>
      
      <div className=" lg:order-first sticky lg:relative  bottom-0   w-full border-t lg:border-t-0 flex  h-fit  lg:py-0  lg:min-h-screen lg:min-w-[80px] lg:max-w-[80px] bg-[#1c1a18]  shadow-md ">
        <NavBar />
      </div>
    </div>
  );
};

const DashboardPage = () => (
  <Routes>
    <Route element={<DashboardLayout />}>
      <Route index element={<AlarmLayout />} />
      <Route path="/alarm" element={<AlarmLayout />} />
    </Route>
  </Routes>
);

export { DashboardPage };
