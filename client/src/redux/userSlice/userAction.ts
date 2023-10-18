import axios from "axios";
import { clearDataUser, setDataUser, setLoadingUser, setUserSocket, } from ".";
import { AppDispatch } from "../../store";

const BackUrl = (import.meta.env.VITE_BACK_URL as string);

export const getUserData = () => (dispatch : AppDispatch) => {
     dispatch(setLoadingUser(true));

    const session = JSON.parse(window.localStorage.getItem("userSession") as string);
    if(!session){
        window.location.replace("/login");
       return Promise.reject(new Error("Sign In"));
    }
    else {
        axios.get(`${BackUrl}/api/auth/profile`, {
            headers: {
                "auth-token":`${session}`
            }, 
        }).then(({data}) => {
            dispatch(setDataUser({username: data.username, id: data.id, role: data.role, email: data.email}));
            window.localStorage.setItem("userLanguage", data.userPreferences.language);
            window.localStorage.setItem("avatarVideo", data.userPreferences.avatarVideo);
            window.localStorage.setItem("didKey", data.userPreferences.didKey);
        }).catch((error: any) => {
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                window.localStorage.removeItem("userSession");
                dispatch(clearDataUser);
                window.location.replace("/login");
                return Promise.reject(new Error("No authorized"));
              } else {
                console.log(error)
              }
            
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


