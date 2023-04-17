import axios from "axios";
import { clearDataUser, clearUserRoll, setDataUser, setLoadingUser, userRoll} from ".";
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
            dispatch(setDataUser({username: data.username, id: data.id, privilege: data.privilege,}))
        }).catch((e: any) => {
            localStorage.removeItem("userSession");
            dispatch(clearDataUser());
        }).finally(() => {
            dispatch(setLoadingUser(false));
        });
    }
    
};

export const setUserRoll = (roll: string) => (dispatch : AppDispatch) => {
    dispatch(clearUserRoll());
    dispatch(userRoll(roll));
}