import { useDispatch, useSelector } from 'react-redux';
import { LocalStorage } from '../services/local.storage';
import { AppDispatch, RootState } from '../store/store';
import { UsersRepo } from '../services/users/api.repo.users';
import {
  addBeerToTasteThunk,
  addPubtoVisitedThunk,
  delBeerFromTasteThunk,
  delPubFromVisitedThunk,
  loginThunk,
  loginTokenThunk,
} from '../slices/user/user.thunk';
import { LoginUser, User } from '../models/user.model';
import * as ac from '../slices/user/user.slice';
import { logout } from '../slices/user/user.slice';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Beer } from '../models/beer.model';
import { Pub } from '../models/pub.model';

export function useUsers() {
  const [loading, setLoading] = useState(true);

  const userStore = useMemo(
    () =>
      new LocalStorage<{
        token: string;
        id: string;
        role: string;
      }>('user'),
    []
  );

  const dispatch = useDispatch<AppDispatch>();
  const repo = useMemo(() => new UsersRepo(), []);
  const { loggedUser } = useSelector((state: RootState) => state.usersState);

  const login = useCallback(
    (loginUser: LoginUser) => {
      dispatch(loginThunk({ loginUser, repo, userStore }));
    },
    [dispatch, repo, userStore]
  );

  const loginWithToken = useCallback(() => {
    const userStoreData = userStore.get();
    if (userStoreData) {
      const { token } = userStoreData;
      dispatch(loginTokenThunk({ token, repo, userStore }))
        .then(() => {
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [dispatch, repo, userStore]);

  const register = useCallback(
    (newUser: Partial<User>) => {
      repo.registerUser(newUser);
    },
    [repo]
  );

  const makeLogOut = useCallback(() => {
    dispatch(ac.logout());
  }, [dispatch]);

  const logoutUser = useCallback(() => {
    dispatch(logout());
    userStore.remove();
  }, [dispatch, userStore]);

  const addBeer = useCallback(
    async (beer: Beer['id'], _token: string) => {
      dispatch(
        addBeerToTasteThunk({
          beer,
          repo,
          userStore,
        })
      );
    },
    [dispatch, repo, userStore]
  );

  const delBeer = useCallback(
    async (beer: Beer['id'], _token: string) => {
      dispatch(
        delBeerFromTasteThunk({
          beer,
          repo,
          userStore,
        })
      );
    },
    [dispatch, repo, userStore]
  );

  const addPub = useCallback(
    async (pub: Pub['id'], _token: string) => {
      dispatch(
        addPubtoVisitedThunk({
          pub,
          repo,
          userStore,
        })
      );
    },
    [dispatch, repo, userStore]
  );

  const delPub = useCallback(
    async (pub: Pub['id'], _token: string) => {
      dispatch(
        delPubFromVisitedThunk({
          pub,
          repo,
          userStore,
        })
      );
    },
    [dispatch, repo, userStore]
  );

  useEffect(() => {
    loginWithToken();
  }, [loginWithToken]);

  return {
    login,
    loginWithToken,
    register,
    logoutUser,
    makeLogOut,
    addBeer,
    delBeer,
    addPub,
    delPub,
    loggedUser,
    userStore,
    loading,
  };
}
