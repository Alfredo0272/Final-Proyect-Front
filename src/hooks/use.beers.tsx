import { useDispatch, useSelector } from 'react-redux';
import { ApiRepoBeers } from '../services/beers/api.repo.beers';
import { AppDispatch, RootState } from '../store/store';
import { useCallback, useMemo } from 'react';
import { loadBeerThunks, loadBeerByIdThunk } from '../slices/beer/beer.thunk';
import { useParams } from 'react-router-dom';
import { Beer } from '../models/beer.model';
import { setCurrentBeerItem } from '../slices/beer/beer.slice';
import { LocalStorage } from '../services/local.storage';

export function useBeers() {
  const { currentBeerItem, beers } = useSelector(
    (state: RootState) => state.beerState
  );
  const dispatch = useDispatch<AppDispatch>();
  const repo = useMemo(() => new ApiRepoBeers(), []);
  const userStore = useMemo(
    () =>
      new LocalStorage<{
        token: string;
        id: string;
        role: string;
      }>('user'),
    []
  );

  const createBeer = useCallback(
    (newBeer: FormData) => {
      const userStoreData = userStore.get();
      if (userStoreData) {
        const { token } = userStoreData;
        repo.createBeer(newBeer, token);
      }
    },
    [repo, userStore]
  );

  const loadBeer = useCallback(() => {
    dispatch(loadBeerThunks(repo));
  }, [dispatch, repo]);

  const { beerId } = useParams();

  const loadBeerById = useCallback(() => {
    if (beerId) {
      dispatch(loadBeerByIdThunk({ beerId, repo }));
    }
  }, [dispatch, repo, beerId]);

  const handleBeerDetails = useCallback(
    (beer: Beer) => {
      dispatch(setCurrentBeerItem(beer));
    },
    [dispatch]
  );

  return {
    beers,
    currentBeerItem,
    loadBeer,
    dispatch,
    loadBeerById,
    handleBeerDetails,
    createBeer,
  };
}
