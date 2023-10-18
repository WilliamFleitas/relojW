import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { DashboardPage } from "../components/dashboard/DashboardPage";
import Log from "../components/login/Log";
import { useEffect } from "react";
const PUBLIC_URL = "";



const AppRoutes = () => {
  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {});
    }
  }, []);
  return (
    <BrowserRouter basename={PUBLIC_URL}>
      
      <Routes>
        <Route path="/" element={<Navigate to="/login"/>} />
        <Route path="/dashboard/*" element={<DashboardPage />} />
        <Route path="/login" element={<Log />} />
        <Route path="*" element={<>NOT FOUND</>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
