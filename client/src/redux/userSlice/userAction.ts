import axios from "axios";
import { clearDataUser, setDataUser, setLoadingUser, setUserSocket, } from ".";
import { AppDispatch } from "../../store";

const BackUrl = (import.meta.env.VITE_BACK_URL as string);

export const getUserData = () => (dispatch : AppDispatch) => {
     dispatch(setLoadingUser(true));

    const session = JSON.parse(window.localStorage.getItem("userSession") as string);
    if(!session){
       return Promise.reject(new Error("Inicie sesión"));
    }
    else {
        axios.get(`${BackUrl}/api/auth/profile`, {
            headers: {
                "auth-token":`${session}`
            }, 
        }).then(({data}) => {
            dispatch(setDataUser({username: data.username, id: data.id, role: data.role,}))
        }).catch((error: any) => {
            console.log(error)
        }).finally(() => {
            dispatch(setLoadingUser(false));
        });
    }
    
};

export const userSignOut = () => (dispatch : AppDispatch) => {
    dispatch(clearDataUser());
    window.localStorage.removeItem("userSession");
};
export const changeUserSocket = (webSocket: boolean) => (dispatch : AppDispatch) => {
    dispatch(setUserSocket(webSocket));
};

