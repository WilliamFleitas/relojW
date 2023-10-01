import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AlarmAnalytic {
    actualWeek: number[];
    lastWeek: number[];
    timesSounded: number;
};
export interface AlarmType {
    hour: string;
    description: string;
    id: string;
    alarmDays: number[];
    enable: boolean;
    alarmType: string;
    createdAt: string;
    goalDateEnd: string | null;
    goalNotes: string[] | null;
    goalType: boolean;
    alarmAnalytic: AlarmAnalytic;
}

export interface UserStateType {
    alarmList: AlarmType[] | null;
    loading: Boolean;
    error: string;
};

const initialState: UserStateType = {
    alarmList: null,
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
            state.alarmList = null;
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