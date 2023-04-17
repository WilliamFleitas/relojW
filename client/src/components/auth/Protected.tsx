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
    const session = window.localStorage.getItem("userSession");
    setDisplay(false)
    if (session) {
        getUserCall()
        .then(({data}) => {
            if(data.privilege === "user" || data.privilege === "admin"){
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
    }else{
      navigate('/login')
    }
  }, [setDisplay, navigate]);

  return <>{display ? children : <h1>Cargando..</h1> }</>;
};

export default Protected;