import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginResponse } from '../../types/user.login';
import { UsersRepo } from '../../services/users/api.repo.users';
import { LocalStorage } from '../../services/local.storage';
import { LoginUser, User } from '../../models/user.model';
import { Pub } from '../../models/pub.model';

export const loginThunk = createAsyncThunk<
  LoginResponse,
  {
    loginUser: LoginUser;
    repo: UsersRepo;
    userStore: LocalStorage<{ token: string }>;
  }
>('login', async ({ loginUser, repo, userStore }) => {
  const result = await repo.login(loginUser);
  userStore.set({ token: result.token });
  return result;
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

export const addBeerToTasteThunk = createAsyncThunk<
  User,
  {
    beer: string;
    repo: UsersRepo;
    userStore: LocalStorage<{ token: string }>;
  }
>('addBeer', async ({ beer, repo, userStore }) => {
  const { token } = userStore.get()!;
  const result = await repo.addBeertoTaste(beer, token);
  return result;
});

export const delBeerFromTasteThunk = createAsyncThunk<
  User,
  {
    beer: string;
    repo: UsersRepo;
    userStore: LocalStorage<{ token: string }>;
  }
>('delBeer', async ({ beer, repo, userStore }) => {
  const { token } = userStore.get()!;
  const result = await repo.delBeerFromTaste(beer, token);
  return result;
});

export const addPubtoVisitedThunk = createAsyncThunk<
  User,
  {
    pub: Pub['id'];
    repo: UsersRepo;
    userStore: LocalStorage<{ token: string }>;
  }
>('addPub', async ({ pub, repo, userStore }) => {
  const { token } = userStore.get()!;
  const result = await repo.addPubtoVisited(pub, token);
  return result;
});

export const delPubFromVisitedThunk = createAsyncThunk<
  User,
  {
    pub: Pub['id'];
    repo: UsersRepo;
    userStore: LocalStorage<{ token: string }>;
  }
>('delPub', async ({ pub, repo, userStore }) => {
  const { token } = userStore.get()!;
  const result = await repo.delPubFromVisited(pub, token);
  return result;
});
