import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./redux/userSlice/index";
import alarmSlice from "./redux/alarmSlice";
const store = configureStore({
  reducer: {
     user: userSlice,
     alarm: alarmSlice,
  },
  
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch