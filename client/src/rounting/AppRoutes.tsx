import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { DashboardPage } from "../components/dashboard/DashboardPage";
import { Signin } from "../components/login/Signin";
import { useEffect } from "react";
import { getUserData } from "../redux/userSlice/userAction";
import { useAppDispatch, useAppSelector } from "../hooks";
const PUBLIC_URL = "";
const AppRoutes = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  useEffect(() => {
    if (!user?.username) {
      dispatch(getUserData());
    }
  }, []);
  return (
    <BrowserRouter basename={PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard/*" element={<DashboardPage user={user}/>} />
        <Route path="/login" element={<Signin />} />
        <Route path="*" element={<>NOT FOUND</>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
