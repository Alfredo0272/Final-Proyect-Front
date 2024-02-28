import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../models/user.model';
import {
  addBeerToTasteThunk,
  delBeerToTasteThunk,
  loginThunk,
  loginTokenThunk,
} from './user.thunk';
import { LoginResponse } from '../../types/user.login';

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
    },
    setCurrentUser(state: UserState, { payload }: PayloadAction<User>) {
      state.loggedUser = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginThunk.rejected, (state: UserState) => {
        state.loginLoadState = 'error';
      })
      .addCase(loginThunk.pending, (state: UserState) => {
        state.loginLoadState = 'logging';
      })
      .addCase(
        loginThunk.fulfilled,
        (state: UserState, { payload }: PayloadAction<LoginResponse>) => {
          state.loggedUser = payload.user;
          state.token = payload.token;
          state.loginLoadState = 'logged';
        }
      )
      .addCase(
        loginTokenThunk.fulfilled,
        (state: UserState, { payload }: PayloadAction<LoginResponse>) => {
          state.loggedUser = payload.user;
          state.loginLoadState = 'logged';
          state.token = payload.token;
        }
      )
      .addCase(
        addBeerToTasteThunk.fulfilled,
        (state: UserState, { payload }: PayloadAction<User>) => {
          state.loggedUser = payload;
          state.loginLoadState = 'logged';
        }
      )
      .addCase(
        delBeerToTasteThunk.fulfilled,
        (state: UserState, { payload }: PayloadAction<User>) => {
          state.loggedUser = payload;
          state.loginLoadState = 'logged';
        }
      );
  },
});

export default userSlice.reducer;
export const { logout, setCurrentUser } = userSlice.actions;
