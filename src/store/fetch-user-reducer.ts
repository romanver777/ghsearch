import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type TUserData = {
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
  type: string;
  site_admin: boolean;
  name: string;
  company: null;
  blog: string;
  location: string;
  email: null;
  hireable: null;
  bio: string;
  twitter_username: null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
};

type TError = {
  url: string;
  error: string;
};
type TLoading = {
  url: string;
  loading: boolean;
};

export const fetchUser = createAsyncThunk<
  TUserData,
  string,
  { rejectValue: string }
>("user/fetchUser", async (url: string, thunkApi) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return thunkApi.rejectWithValue("111Что-то пошло не так...");
    }

    return response.json();
  } catch (error) {
    return thunkApi.rejectWithValue("Что-то пошло не так...");
  }
});

export interface IUserData {
  usersInfo: TUserData[];
  loading: TLoading[];
  error: TError[];
}

const initialState: IUserData = {
  usersInfo: [],
  loading: [],
  error: [],
};

export const fetchUserSlice = createSlice({
  name: "fetch-user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUser.pending, (state, action) => {
        const url = action.meta.arg;
        const currLoading = state.loading.filter((it) => it.url === url);
        const otherError = state.error.filter((it) => it.url !== url);

        state.error = otherError;
        if (!currLoading.length) {
          state.loading.push({ url, loading: true });
        }
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        const url = action.meta.arg;

        const otherLoading = state.loading.filter((it) => it.url !== url);
        const otherError = state.error.filter((it) => it.url !== url);

        state.usersInfo.push(action.payload);
        state.error = otherError;
        state.loading = otherLoading;
        state.loading.push({ url, loading: false });
      })
      .addCase(fetchUser.rejected, (state, action) => {
        const url = action.meta.arg;
        const currErr = state.error.filter((it) => it.url === url);
        const otherLoading = state.loading.filter((it) => it.url !== url);

        state.loading = otherLoading;
        state.loading.push({ url, loading: false });

        if (!currErr.length)
          state.error.push({ url, error: action.error.message || "Ошибка" });
      });
  },
});

export default fetchUserSlice.reducer;
