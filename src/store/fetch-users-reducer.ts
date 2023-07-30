import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type TUser = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: "User";
  site_admin: boolean;
  score: number;
};

type TUsers = {
  total_count: number;
  incomplete_results: boolean;
  items: TUser[];
};

export const fetchUsers = createAsyncThunk<
  TUsers,
  string,
  { rejectValue: string }
>("users/fetchUsers", async (search: string, thunkApi) => {
  try {
    const response = await fetch(
      `https://api.github.com/search/users${search}`
    );

    if (!response.ok) return thunkApi.rejectWithValue("Что-то пошло не так...");
    return response.json();
  } catch (error) {
    return thunkApi.rejectWithValue("Что-то пошло не так...");
  }
});

export interface IUsersInitialState {
  users: TUsers | null;
  loading: boolean;
  error: string | null;
}

const initialState: IUsersInitialState = {
  users: null,
  loading: false,
  error: null,
};

export const fetchUsersSlice = createSlice({
  name: "fetch-users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = {
          total_count: action.payload.total_count,
          incomplete_results: action.payload.incomplete_results,
          items: action.payload.items,
        };
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка";
      });
  },
});

export default fetchUsersSlice.reducer;
