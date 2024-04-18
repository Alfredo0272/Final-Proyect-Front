import { createAsyncThunk } from '@reduxjs/toolkit';
import { Pub } from '../../models/pub.model';
import { ApiRepoPubs } from '../../services/pubs/api.repo.pubs';
import { Beer } from '../../models/beer.model';

export const createPubThunk = createAsyncThunk<
  Pub,
  {
    newPub: FormData;
    repo: ApiRepoPubs;
    token: string;
  }
>('create', async ({ newPub, repo, token }) => {
  const result = await repo.createPub(newPub, token);
  return result;
});

export const loadPubThunk = createAsyncThunk<Pub[], ApiRepoPubs>(
  'load',
  async (repo: ApiRepoPubs) => {
    const pubs = await repo.loadPubs();
    return pubs;
  }
);

export const loadPubByIdThunk = createAsyncThunk<
  Pub,
  {
    pubID: Pub['id'];
    repo: ApiRepoPubs;
  }
>('loadPubByid', async (params) => {
  const { pubID, repo } = params;
  const pubs = await repo.loadPubById(pubID);
  return pubs;
});

export const addBeerToTapsThunk = createAsyncThunk<
  Pub,
  {
    pub: Pub;
    beer: Beer['id'];
    repo: ApiRepoPubs;
    token: string;
  }
>('addBeerToTap', async ({ pub, beer, token, repo }) => {
  const result = await repo.addBeerToTaps(pub, beer, token);
  return result;
});

export const delBeerFromTapsThunk = createAsyncThunk<
  Pub,
  {
    pub: Pub;
    beer: Beer['id'];
    repo: ApiRepoPubs;
    token: string;
  }
>('addBeerfromTap', async ({ pub, beer, token, repo }) => {
  const result = await repo.delBeerFromTaps(pub, beer, token);
  return result;
});
