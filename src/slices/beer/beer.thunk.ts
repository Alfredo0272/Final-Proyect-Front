import { createAsyncThunk } from '@reduxjs/toolkit';
import { Beer } from '../../models/beer.model';
import { ApiRepoBeers } from '../../services/beers/api.repo.beers';

export const createBeerThunk = createAsyncThunk<
  Beer,
  {
    newBeer: FormData;
    repo: ApiRepoBeers;
    token: string;
  }
>('create', async ({ newBeer, repo, token }) => {
  const result = await repo.createBeer(newBeer, token);
  return result;
});

export const loadBeerByIdThunk = createAsyncThunk<
  Beer,
  { beerId: string; repo: ApiRepoBeers }
>('loadbyid', async (params) => {
  const { beerId, repo } = params;
  const beers = await repo.loadBeerbyId(beerId);
  return beers;
});

export const loadBeerThunks = createAsyncThunk<Beer[], ApiRepoBeers>(
  'load',
  async (repo) => {
    const beers = await repo.loadBeers();
    return beers;
  }
);
