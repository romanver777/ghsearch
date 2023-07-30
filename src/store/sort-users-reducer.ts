import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ISortInitState {
  active: string;
  list: string[];
}

const initialState: ISortInitState = {
  active: "умолчанию",
  list: ["умолчанию", "max репозиториев", "min репозиториев"],
};

export const sortUsersSlice = createSlice({
  name: "sort-users",
  initialState,
  reducers: {
    setActive: (state, action: PayloadAction<string>) => {
      state.active = action.payload;
    },
    setDefault: (state) => {
      state.active = state.list[0];
    },
  },
});

export const { setActive, setDefault } = sortUsersSlice.actions;
export default sortUsersSlice.reducer;
