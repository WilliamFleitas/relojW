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
    userId: string;
}

export interface UserStateType {
    alarmList: AlarmType[] | null;
    goalNotes: string[] | null;
    goalNotesDates: string[] | null;
    userAlarmsLoading: Boolean;
    error: string;
};

const initialState: UserStateType = {
    alarmList: null,
    userAlarmsLoading: false,
    goalNotes: null,
    goalNotesDates: null,
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
        setGoalNotes(state, action: PayloadAction<{goalNotes: string[], goalNotesDates: string[]}>){
        state.goalNotes = action.payload.goalNotes;
        state.goalNotesDates = action.payload.goalNotesDates;
        },
        clearGoalNotes(state){
            state.goalNotes = null;
            state.goalNotesDates = null;
            },
        setLoadingAlarm(state, action: PayloadAction<Boolean>){
            state.userAlarmsLoading = action.payload
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
export const {setAlarmData, clearAlarmList, setLoadingAlarm, setError, clearError, setGoalNotes, clearGoalNotes}= AlarmSlice.actions;