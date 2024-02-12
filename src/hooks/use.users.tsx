import { useDispatch, useSelector } from 'react-redux';
import { LocalStorage } from '../services/local.storage';
import { AppDispatch, RootState } from '../store/store';
import { UsersRepo } from '../services/users/api.repo.users';
import {
  addBeerToTasteThunk,
  loginThunk,
  loginTokenThunk,
} from '../slices/user.thunk';
import { LoginUser, User } from '../models/user.model';
import * as ac from '../slices/user.slice';
import { logout } from '../slices/user.slice';
import { useMemo } from 'react';
import { Beer } from '../models/beer.model';

export function useUsers() {
  const userStore = new LocalStorage<{ token: string; id: string }>('user');
  const dispatch = useDispatch<AppDispatch>();
  const repo = useMemo(() => new UsersRepo(), []);
  const { loggedUser } = useSelector((state: RootState) => state.usersState);

  const login = (loginUser: LoginUser) => {
    dispatch(loginThunk({ loginUser, repo, userStore }));
  };

  const loginWithToken = () => {
    const userStoreData = userStore.get();
    if (userStoreData) {
      const { token } = userStoreData;
      dispatch(loginTokenThunk({ token, repo, userStore }));
    }
  };

  const register = (newUser: Partial<User>) => {
    repo.registerUser(newUser);
  };

  const makeLogOut = () => {
    dispatch(ac.logout());
  };

  const logoutUser = () => {
    dispatch(logout());
    userStore.remove();
  };

  const addBeer = (beerId: string) => {
    const userStoreData = userStore.get();
    if (userStoreData) {
      dispatch(
        addBeerToTasteThunk({
          beerId,
          repo,
          userStore,
        })
      );
    }
  };

  const delBeer = async (beer: Beer['id'], token: string) => {
    repo.delBeertoTaste(beer, token);
  };

  return {
    login,
    loginWithToken,
    register,
    logoutUser,
    makeLogOut,
    addBeer,
    delBeer,
    loggedUser,
    userStore,
  };
}
