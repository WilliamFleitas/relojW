import React, { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { getUserCall } from "./functions/getUserCall";

interface IProtectedProps {
  children: JSX.Element;
}

const Protected = ({ children }: IProtectedProps) => {
  const [display, setDisplay] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setDisplay(false)
        getUserCall()
        .then(({data}) => {
          console.log("getuser", data);
            if(data.role === "user" || data.role === "admin"){
                setDisplay(true);
            }else{
                localStorage.removeItem("userSession");
                navigate("/login");
            }
        })
        .catch((error) => {
          localStorage.removeItem("userSession");
          navigate("/login");
        });
    
  }, [setDisplay]);

  return <>{display ? children : <h1>Cargando..</h1> }</>;
};

export default Protected;