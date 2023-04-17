import axios from "axios";
const BackUrl = (import.meta.env.VITE_BACK_URL as string);

export const getUserCall = () => {

    const session = JSON.parse(window.localStorage.getItem("userSession") as string);

    if(session){
      return  axios.get(`${BackUrl}/api/auth/profile`, {
            headers: {
                "auth-token":`${session}`
            },
        });
    }
    else {
        return Promise.reject(new Error("Inicie sesión"));
    }

};