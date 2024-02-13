import { useDispatch, useSelector } from 'react-redux';
import { ApiRepoBeers } from '../services/beers/api.repo.beers';
import { AppDispatch, RootState } from '../store/store';
import { useCallback, useMemo } from 'react';
import { loadBeerThunks, loadBeerByIdThunk } from '../slices/beer/beer.thunk';
import { useParams } from 'react-router-dom';
import { Beer } from '../models/beer.model';
import { setCurrentBeerItem } from '../slices/beer/beer.slice';

export function useBeers() {
  const { currentBeerItem, beers } = useSelector(
    (state: RootState) => state.beerState
  );
  const dispatch = useDispatch<AppDispatch>();
  const repo = useMemo(() => new ApiRepoBeers(), []);

  const createBeer = (newBeer: FormData) => {
    repo.createBeer(newBeer);
  };

  const loadBeer = useCallback(async () => {
    dispatch(loadBeerThunks(repo));
  }, [dispatch, repo]);

  const { beerId } = useParams();

  const loadBeerById = useCallback(async () => {
    if (beerId) {
      dispatch(loadBeerByIdThunk({ beerId, repo }));
    }
  }, [dispatch, repo]);

  const handleBeerDetails = async (beer: Beer) => {
    dispatch(setCurrentBeerItem(beer));
  };

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
