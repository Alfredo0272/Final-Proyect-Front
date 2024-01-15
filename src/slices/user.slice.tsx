import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../models/user.model';
import { loginThunk, loginTokenThunk } from './user.thunk';
import { LoginResponse } from '../types/user.login';

type LoginState = 'logout' | 'logging' | 'error' | 'logged';

export type UserState = {
  loggedUser: User | null;
  loginLoadState: LoginState;
  token: string;
};

const initialState: UserState = {
  loggedUser: null,
  loginLoadState: 'logout',
  token: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state: UserState) {
      state.loggedUser = null;
      state.token = '';

      return state;
    },
    setCurrentUser(state: UserState, { payload }: PayloadAction<User>) {
      state.loggedUser = payload;
      return state;
    },
  },
  extraReducers(builder) {
    builder.addCase(loginThunk.rejected, (state: UserState) => {
      state.loginLoadState = 'error';
    });
    builder.addCase(loginThunk.pending, (state: UserState) => {
      state.loginLoadState = 'logging';
    });
    builder.addCase(
      loginThunk.fulfilled,
      (state: UserState, { payload }: PayloadAction<LoginResponse>) => {
        state.loggedUser = payload.user;
        state.token = payload.token;
      }
    );
    builder.addCase(
      loginTokenThunk.fulfilled,
      (state: UserState, { payload }: PayloadAction<LoginResponse>) => {
        state.loggedUser = payload.user;
        state.loginLoadState = 'logged';
        state.token = payload.token;
      }
    );
  },
});

export default userSlice.reducer;
export const { logout, setCurrentUser } = userSlice.actions;
