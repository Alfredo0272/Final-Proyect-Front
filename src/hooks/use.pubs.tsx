import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { ApiRepoPubs } from '../services/pubs/api.repo.pubs';
import {
  addBeerToTapsThunk,
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
  const userStore = new LocalStorage<{
    token: string;
    id: string;
    role: string;
  }>('user');

  const createPub = async (newPub: FormData) => {
    const userStoreData = userStore.get();
    if (userStoreData) {
      const { token } = userStoreData;
      await repo.createPub(newPub, token);
    }
  };

  const loadPubs = useCallback(async () => {
    dispatch(loadPubThunk(repo));
  }, [dispatch, repo]);

  const { pubID } = useParams();

  const loadPubById = useCallback(async () => {
    if (pubID) {
      dispatch(loadPubByIdThunk({ pubID, repo }));
    }
  }, [dispatch, repo]);

  const handlePubDetails = async (pub: Pub) => {
    dispatch(setCurrentPubItem(pub));
  };

  const addBeerToTap = async (
    pub: Pub['id'],
    beer: Beer['id'],
    token: string
  ) => {
    dispatch(
      addBeerToTapsThunk({
        pub,
        beer,
        repo,
        token,
      })
    );
  };

  return {
    pubs,
    currentPubItem,
    loadPubs,
    dispatch,
    loadPubById,
    handlePubDetails,
    addBeerToTap,
    createPub,
  };
}
