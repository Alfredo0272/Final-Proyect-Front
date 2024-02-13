import { createAsyncThunk } from '@reduxjs/toolkit';
import { Pub } from '../../models/pub.model';
import { ApiRepoPubs } from '../../services/pubs/api.repo.pubs';
import { LocalStorage } from '../../services/local.storage';
import { User } from '../../models/user.model';
import { Beer } from '../../models/beer.model';

export const createPubThunk = createAsyncThunk<
  Pub,
  {
    newPub: FormData;
    user: User['id'];
    repo: ApiRepoPubs;
    tokenStorage: LocalStorage<{ token: string }>;
  }
>('create', async ({ newPub, user, repo, tokenStorage }) => {
  const { token } = tokenStorage.get()!;
  const result = await repo.createPub(newPub, user, token);
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
>('loadbyid', async (params) => {
  const { pubID, repo } = params;
  const pubs = await repo.loadPubById(pubID);
  return pubs;
});

export const addBeerToTapsThunk = createAsyncThunk<
  Pub,
  {
    pub: Pub['id'];
    beer: Beer['id'];
    repo: ApiRepoPubs;
    tokenStorage: LocalStorage<{ token: string }>;
  }
>('addBeer', async ({ beer, pub, tokenStorage, repo }) => {
  const { token } = tokenStorage.get()!;
  const result = await repo.addBeerToTaps(beer, pub, token);
  return result;
});

export const delBeerfromTapsThunk = createAsyncThunk<
  Pub,
  {
    pub: Pub['id'];
    beer: Beer['id'];
    repo: ApiRepoPubs;
    tokenStorage: LocalStorage<{ token: string }>;
  }
>('addBeer', async ({ beer, pub, tokenStorage, repo }) => {
  const { token } = tokenStorage.get()!;
  const result = await repo.delBeerFromTaps(beer, pub, token);
  return result;
});
