import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Beer } from '../../models/beer.model';
import { createBeerThunk, loadBeerThunks } from './beer.thunk';

export type LoginState = 'idle' | 'logging' | 'error';

type BeerState = {
  currentBeerItem: Beer | null;
  beerState: LoginState;
  beers: Beer[];
};

const initialState: BeerState = {
  currentBeerItem: null,
  beerState: 'idle',
  beers: [],
};

const beersSlice = createSlice({
  name: 'beers',
  initialState,
  reducers: {
    setCurrentBeerItem(state: BeerState, { payload }: PayloadAction<Beer>) {
      state.currentBeerItem = payload;
      return state;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      createBeerThunk.fulfilled,
      (state: BeerState, { payload }) => {
        state.currentBeerItem = payload;
        state.beerState = 'idle';
        return state;
      }
    );
    builder.addCase(
      loadBeerThunks.fulfilled,
      (state: BeerState, { payload }: PayloadAction<Beer[]>) => {
        state.beers = payload;
        return state;
      }
    );

    builder.addCase(createBeerThunk.pending, (state: BeerState) => {
      state.beerState = 'logging';
      return state;
    });

    builder.addCase(loadBeerThunks.pending, (state: BeerState) => {
      state.beerState = 'logging';
      return state;
    });

    builder.addCase(loadBeerThunks.rejected, (state: BeerState) => {
      state.beerState = 'error';
      return state;
    });

    builder.addCase(createBeerThunk.rejected, (state: BeerState) => {
      state.beerState = 'error';
      return state;
    });
  },
});

export default beersSlice.reducer;
export const { setCurrentBeerItem } = beersSlice.actions;
