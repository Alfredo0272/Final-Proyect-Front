import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginResponse } from '../types/user.login';
import { UsersRepo } from '../services/users/api.repo.users';
import { LocalStorage } from '../services/local.storage';
import { LoginUser, User } from '../models/user.model';

export const loginThunk = createAsyncThunk<
  LoginResponse,
  {
    loginUser: LoginUser;
    repo: UsersRepo;
    userStore: LocalStorage<{ token: string; id: string }>;
  }
>('login', async ({ loginUser, repo, userStore }) => {
  const LoginResponse = await repo.login(loginUser);
  userStore.set({ token: LoginResponse.token, id: LoginResponse.user.id });
  return LoginResponse;
});

export const loginTokenThunk = createAsyncThunk<
  LoginResponse,
  {
    token: string;
    repo: UsersRepo;
    userStore: LocalStorage<{ token: string }>;
  }
>('loginWithToken', async ({ token, repo, userStore }) => {
  const loginResponse = await repo.loginWithToken(token);
  userStore.set({ token: loginResponse.token });
  return loginResponse;
});

export const registerThunk = createAsyncThunk<
  User,
  {
    newUser: Partial<User>;
    repo: UsersRepo;
  }
>('register', async ({ newUser, repo }) => {
  const result = await repo.registerUser(newUser);
  return result;
});
