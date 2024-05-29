import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { ApiRepoPubs } from '../services/pubs/api.repo.pubs';
import {
  addBeerToTapsThunk,
  delBeerFromTapsThunk,
  loadPubByIdThunk,
  loadPubThunk,
} from '../slices/pubs/pub.thunk';
import { setCurrentPubItem } from '../slices/pubs/pub.slice';
import { Pub } from '../models/pub.model';
import { Beer } from '../models/beer.model';
import { LocalStorage } from '../services/local.storage';

export function usePubs() {
  const { currentPubItem, pubs } = useSelector(
    (state: RootState) => state.pubState
  );
  const dispatch = useDispatch<AppDispatch>();
  const repo = useMemo(() => new ApiRepoPubs(), []);
  const userStore = useMemo(
    () =>
      new LocalStorage<{
        token: string;
        id: string;
        role: string;
      }>('user'),
    []
  );

  const createPub = useCallback(
    async (newPub: FormData) => {
      const userStoreData = userStore.get();
      if (userStoreData) {
        const { token } = userStoreData;
        await repo.createPub(newPub, token);
      }
    },
    [repo, userStore]
  );

  const loadPubs = useCallback(async () => {
    dispatch(loadPubThunk(repo));
  }, [dispatch, repo]);

  const { pubID } = useParams();

  const loadPubById = useCallback(async () => {
    if (pubID) {
      dispatch(loadPubByIdThunk({ pubID, repo }));
    }
  }, [dispatch, repo, pubID]);

  const handlePubDetails = useCallback(
    async (pub: Pub) => {
      dispatch(setCurrentPubItem(pub));
    },
    [dispatch]
  );

  const addBeerToTap = useCallback(
    async (pub: Pub, beer: Beer['id'], token: string) => {
      dispatch(
        addBeerToTapsThunk({
          pub,
          beer,
          repo,
          token,
        })
      );
    },
    [dispatch, repo]
  );

  const delBeerFromTap = useCallback(
    async (pub: Pub, beer: Beer['id'], token: string) => {
      dispatch(
        delBeerFromTapsThunk({
          pub,
          beer,
          repo,
          token,
        })
      );
    },
    [dispatch, repo]
  );

  return {
    pubs,
    currentPubItem,
    loadPubs,
    loadPubById,
    handlePubDetails,
    addBeerToTap,
    delBeerFromTap,
    createPub,
  };
}
