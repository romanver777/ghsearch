import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import fetchUsersReducer from "./fetch-users-reducer";
import sortUsersReducer from "./sort-users-reducer";

export const store = configureStore({
  reducer: {
    users: fetchUsersReducer,
    sort: sortUsersReducer,
  },
  devTools: process.env.NODE_ENV === "development",
});

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<TAppDispatch>();
