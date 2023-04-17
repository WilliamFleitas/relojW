import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUserType {
    username: string;
    id: string;
    privilege: string;
}

export interface UserStateType {
    user: IUserType;
    loading: Boolean;
    userRol: string;
};

const initialState: UserStateType = {
    user: {
      username: "",
      id: "",
      privilege: ""
    },
    loading: false,
    userRol: ""
};

const UserSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        setDataUser(state, action: PayloadAction<IUserType>){
            state.user.username = action.payload.username;
            state.user.id = action.payload.id;
            state.user.privilege = action.payload.privilege;
        },
        clearDataUser(state){
            state.user = {
                username: "",
                id: "",
                privilege: ""
            };
        },
        setLoadingUser(state, action: PayloadAction<Boolean>){
            state.loading = action.payload
        },
        userRoll(state, action: PayloadAction<string>){
            state.userRol = action.payload
        },
        clearUserRoll(state){
            state.userRol = ""
        }
    }
});

export default UserSlice.reducer;
export const {setDataUser, clearDataUser, setLoadingUser, userRoll, clearUserRoll}= UserSlice.actions;