import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  verified: boolean;
  avatar?: string;
  followers: number;
  followings: number;
}
interface AuthState {
  profile: UserProfile | null;
  loggedIn: boolean;
  busy: boolean;
}
const initialState: AuthState = {
  profile: null,
  loggedIn: false,
  busy: false,
};
const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateProfile: (state, { payload }: PayloadAction<UserProfile | null>) => {
      state.profile = payload;
      state.loggedIn = true;
    },
    updateLoginState(state, { payload }: PayloadAction<boolean>) {
      state.loggedIn = payload;
    },
    updateBusyState(state, { payload }: PayloadAction<boolean>) {
      state.busy = payload;
    },
  },
});

export const { updateBusyState, updateProfile, updateLoginState } =
  slice.actions;

export const getAuthState = createSelector(
  (state: RootState) => state,
  (authState) => authState,
);
export default slice.reducer;
