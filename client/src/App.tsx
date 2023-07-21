import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState} from "react";
import Cookies from "js-cookie";
import { Home } from "./components/Home";
import { AlarmLayout } from "./components/alarm/AlarmLayout";;
import { Signin } from "./components/login/Signin";
import { useAppDispatch, useAppSelector } from "./hooks";
import { changeUserSocket, getUserData } from "./redux/userSlice/userAction";
import Protected from "./components/auth/Protected";
import NavBar from "./components/navbar/NavBar";
import { io } from "socket.io-client";
import { AlarmScreen } from "./components/alarm/AlarmScreen";
import Modal from "./components/utils/Modal";
const socket = io("http://localhost:3001");

interface userDataTypes {
  data: string;
  description: string;
  hour: string;
  iaMessage: string;
};
const App = () => {

  const session = JSON.parse(
    window.localStorage.getItem("userSession") as string
  );
  const [alarmMessage, setAlarmMessage] = useState<userDataTypes>();
  const [alarmSwitch, setAlarmSwitch] = useState<boolean>(false);

  const { user, webSocket} = useAppSelector((state) => state.user);
  console.log("app", user?.username);
  const [pathLogin, setPathLogin] = useState<boolean>(false);
  const [showAlarmModal, setShowAlarmModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!user?.username) {
      dispatch(getUserData());
      
    }
  }, []);
  useEffect(() => {
    socket.on('userAlarm', (data) => {
        console.log('userAlarm:', data);
        setAlarmMessage(data);
        setAlarmSwitch(true);
      });
}, []);
  useEffect(()=>{
    if(window.location.pathname === "/login"){
      setPathLogin(true);
    }else{
      setPathLogin(false);
    }
  }, []);
  socket.on('evento', data => {
    console.log('Evento recibido:', data);
  });
  
  useEffect(() => {
    if(user?.username.length){
      // Eventos del socket
      console.log("hola")
    socket.on('connection', () => {

      console.log('Conectado al servidor');
      dispatch(changeUserSocket(true));
      
    });
    socket.emit('dataUser', {
      username: user?.username,
      userId: user?.id,
    });
    }
    
  }, [user, dispatch]);

  return(
    <div className="relative flex ">
      {/* <NavBar /> */}
      {pathLogin ? <></> : <NavBar />}
      
      {/* {
        showAlarmModal ? <AlarmScreen/> : <></>
      } */}
      { 
      alarmMessage ? 
        <Modal
        isOpen={alarmSwitch}
        onClose={setAlarmSwitch}
        header={"Alarm"}
        Content={<AlarmScreen 
        iaMessage={alarmMessage.iaMessage}
        description={alarmMessage.description}
        data={alarmMessage.data}
        hour={alarmMessage.hour}
        />}/> : <></>
        }
        
      <Routes>

        <Route index element={
          <Home/>
        }/>
        <Route path="/home" element={
         <Protected>
          <Home/>
         </Protected>
      }/>
        {/* <Route path="/test" element={<AlarmScreen/>} /> */}
        <Route
          path="/login"
          element={<Signin/>}
        />

        <Route path="/alarm" element={
        // <Protected>
          <AlarmLayout/>
        // </Protected>
        }/>

        <Route path="*" element={<>NOT FOUND</>}/>
      </Routes>

    </div>
  )
};

export default App;