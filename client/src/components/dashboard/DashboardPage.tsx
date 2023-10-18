import React, { useEffect, useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { AlarmLayout } from "./components/alarm/AlarmLayout";
import NavBar from "../navbar/NavBar";
import { io } from "socket.io-client";
import ModalAlarm from "../utils/ModalAlarm";
import { AlarmScreen } from "./components/alarm/AlarmScreen";
import ChroniPP from "../../assets/chroniClosedEyes.png";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { changeUserSocket, getUserData } from "../../redux/userSlice/userAction";
import UserSettings from "./components/Settings/UserSettings";
dayjs.extend(utc);
dayjs.extend(timezone);

const BackUrl = import.meta.env.VITE_BACK_URL as string;
export const socket = io(BackUrl);
interface userDataTypes {
  description: string;
  hour: string;
  iaMessage: string;
  goalType: boolean;
  iaVideo: Blob;
  goalDateEnd?: string;
  createdAt: string;
  id: string;
}

const DashboardLayout = () => {
  

  const dispatch = useAppDispatch();
  const { user, webSocket } = useAppSelector((state) => state.user);
  
  const [alarmMessage, setAlarmMessage] = useState<userDataTypes | null>(null);
  const [iaVideo, setIaVideo] = useState<Blob | null>(null);
  const [iaVideoError, setIaVideoError] = useState<string | null>(null);
  const [alarmSwitch, setAlarmSwitch] = useState<boolean>(false);
  const [notificationSended, setNotificationSended] = useState<boolean>(false);
  useEffect(() => {
    setAlarmMessage(null);
    socket.on("userAlarm", (data) => {
      if(data.id){
        if (
          document.visibilityState === "hidden" &&
          Notification.permission === "granted" &&
          !notificationSended
        ) {
          
            new Notification(data.description, {
              body: data.iaMessage,
              icon: ChroniPP,
            });
            setNotificationSended(true);
        }
        setAlarmMessage(data);
        setAlarmSwitch(true);
        socket.on("iaVideoResult", (iaVideo) => {
          setIaVideo(iaVideo);
        });
        socket.on("createTalkError", (error) => {
          setIaVideoError(error);
        });
      }
     
    });
  }, []);
 
  useEffect(() => {
    if(user?.username && !webSocket){
      socket.emit("dataUser", {
        username: user?.username,
        userId: user?.id,
        userTimezone: dayjs.tz.guess(),
      });
      dispatch(changeUserSocket(true));
    }
   
    return () => {dispatch(changeUserSocket(false));};
  }, [user?.id]);
  

  useEffect(() => {
    dispatch(getUserData());
  }, []);
  return (
    <div className="relative flex flex-col lg:flex-row w-full h-screen text-center items-center justify-between">
      {alarmMessage && alarmSwitch ? (
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
              hour={alarmMessage.hour}
              goalType={alarmMessage.goalType}
              goalDateEnd={alarmMessage.goalDateEnd}
              iaVideoError={iaVideoError}
              id={alarmMessage.id}
              createdAt={alarmMessage.createdAt}
            />
          }
        />
      ) : (
        <>
          <div className="flex flex-col lg:block w-full  h-fit md:h-full lg:order-last">
            <Outlet />
          </div>

          <div className="z-20 lg:order-first sticky lg:relative  bottom-0   w-full border-t lg:border-t-0 flex  h-fit  lg:py-0  lg:min-h-screen lg:min-w-[80px] lg:max-w-[80px] bg-[#1c1a18]  shadow-md border-[#231e1a]">
            <NavBar />
          </div>
        </>
      )}
    </div>
  );
};

const DashboardPage = () => (
  <Routes>
    <Route element={<DashboardLayout />}>
      <Route index element={<AlarmLayout />} />
      <Route path="/alarm" element={<AlarmLayout />} />
      <Route path="/settings" element={<UserSettings />} />
    </Route>
  </Routes>
);

export { DashboardPage };
