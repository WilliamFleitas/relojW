import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState} from "react";
import Cookies from "js-cookie";
import { Home } from "./components/Home";
import { AlarmLayout } from "./components/alarm/AlarmLayout";;
import { Signin } from "./components/login/Signin";
import { useAppDispatch, useAppSelector } from "./hooks";
import { getUserData } from "./redux/userSlice/userAction";
import Protected from "./components/auth/Protected";
import NavBar from "./components/navbar/NavBar";


const App = () => {

  const session = JSON.parse(
    window.localStorage.getItem("userSession") as string
  );
  const [pathLogin, setPathLogin] = useState<boolean>(false);
  const { username } = useAppSelector((state) => state.user.user);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (session) {
      dispatch(getUserData());
    }
  }, [dispatch]);
  
  useEffect(()=>{
    if(window.location.pathname === "/login"){
      setPathLogin(true);
    }else{
      setPathLogin(false);
    }
  }, [])
  return(
    <div className="flex ">
      {/* <NavBar /> */}
      {pathLogin ? <></> : <NavBar />}
      <Routes>

        <Route index element={
        <Protected>
          <Home/>
        </Protected>
        }/>
        <Route path="/home" element={
        <Protected>
          <Home/>
        </Protected>}/>
        
        <Route
          path="/login"
          element={username ? <Navigate to="/alarm"/> : <Signin/>}
        />

        <Route path="/alarm" element={
        <Protected>
          <AlarmLayout/>
        </Protected>
        }/>

        <Route path="*" element={<>NOT FOUND</>}/>
      </Routes>

    </div>
  )
};

export default App;