import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUserType {
    username: string;
    id: string;
    role: string;
    email: string;
}

export interface UserStateType {
    user: IUserType | null;
    loading: boolean;
    
    webSocket: boolean
};

const initialState: UserStateType = {
    user: null,
    webSocket: false,
    loading: false,
};

const UserSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        setDataUser(state, action: PayloadAction<IUserType>){
            state.user = action.payload;
        },
        setUserSocket(state, action: PayloadAction<boolean>){
            state.webSocket = action.payload;
        },
        clearDataUser(state){
            state.user = null
        },
        setLoadingUser(state, action: PayloadAction<boolean>){
            state.loading = action.payload
        },
    }
});

export default UserSlice.reducer;
export const {setDataUser, setUserSocket, clearDataUser, setLoadingUser, }= UserSlice.actions;