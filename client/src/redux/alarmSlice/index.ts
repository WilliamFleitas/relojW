import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AlarmType {
    hour: string;
    description: string;
    id: string;
    alarmDays: number[];
    enable: boolean;
}

export interface UserStateType {
    alarmList: AlarmType[];
    loading: Boolean;
    error: string;
};

const initialState: UserStateType = {
    alarmList: [],
    loading: false,
    error: ""
};

const AlarmSlice = createSlice({
    name: "Alarm",
    initialState,
    reducers: {
        setAlarmData(state, action: PayloadAction<AlarmType[]>){
            state.alarmList = action.payload;
        },
        clearAlarmList(state){
            state.alarmList = [];
        },
        setLoadingAlarm(state, action: PayloadAction<Boolean>){
            state.loading = action.payload
        },
        setError(state, action: PayloadAction<string>){
            state.error = action.payload
        },
        clearError(state){
            state.error = ""
        }
    }
});

export default AlarmSlice.reducer;
export const {setAlarmData, clearAlarmList, setLoadingAlarm, setError, clearError}= AlarmSlice.actions;