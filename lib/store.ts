import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/lib/redux/authSlice";
import userReducer from "@/lib/redux/userSlice";
import guideReducer from "@/lib/redux/guideSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    guide: guideReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
