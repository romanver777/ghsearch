import { createSelector } from "@reduxjs/toolkit";
import { TRootState } from "./store";

export const getUsersInfo = (state: TRootState) => state.usersInfo.usersInfo;
export const getUsersLoading = (state: TRootState) => state.usersInfo.loading;
export const getUsersError = (state: TRootState) => state.usersInfo.error;

export const getUserInfo = (id: number) =>
  createSelector(getUsersInfo, (items) => {
    const arr = items.filter((it) => it.id === id);
    if (arr.length) return arr[0];
    return null;
  });

export const getUserLoading = (url: string) =>
  createSelector(getUsersLoading, (item) => {
    const arr = item.filter((it) => it.url === url);
    if (arr.length) return arr[0].loading;
    return false;
  });

export const getUserError = (url: string) =>
  createSelector(getUsersError, (errors) => {
    const arr = errors.filter((it) => it.url === url);
    if (arr.length) return true;
    return false;
  });
