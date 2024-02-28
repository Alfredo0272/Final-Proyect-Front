import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Pub } from '../../models/pub.model';
import {
  addBeerToTapsThunk,
  createPubThunk,
  delBeerFromTapsThunk,
  loadPubThunk,
} from './pub.thunk';

export type LoginState = 'idle' | 'loading' | 'error';

type PubState = {
  currentPubItem: Pub | null;
  pubState: LoginState;
  pubs: Pub[];
};

const initialState: PubState = {
  currentPubItem: null,
  pubState: 'idle',
  pubs: [],
};

const pubsSlice = createSlice({
  name: 'pubs',
  initialState,
  reducers: {
    setCurrentPubItem(state: PubState, { payload }: PayloadAction<Pub>) {
      state.currentPubItem = payload;
      return state;
    },
  },
  extraReducers(builder) {
    builder.addCase(createPubThunk.rejected, (state: PubState) => {
      state.pubState = 'error';
    });
    builder.addCase(loadPubThunk.rejected, (state: PubState) => {
      state.pubState = 'error';
    });
    builder.addCase(addBeerToTapsThunk.rejected, (state: PubState) => {
      state.pubState = 'error';
    });
    builder.addCase(createPubThunk.pending, (state: PubState) => {
      state.pubState = 'loading';
    });
    builder.addCase(loadPubThunk.pending, (state: PubState) => {
      state.pubState = 'loading';
    });
    builder.addCase(addBeerToTapsThunk.pending, (state: PubState) => {
      state.pubState = 'loading';
    });
    builder.addCase(
      createPubThunk.fulfilled,
      (state: PubState, { payload }) => {
        state.currentPubItem = payload;
        state.pubState = 'idle';
      }
    );
    builder.addCase(
      loadPubThunk.fulfilled,
      (state: PubState, { payload }: PayloadAction<Pub[]>) => {
        state.pubs = payload;
        state.pubState = 'idle';
      }
    );
    builder.addCase(
      addBeerToTapsThunk.fulfilled,
      (state: PubState, { payload }: PayloadAction<Pub>) => {
        state.currentPubItem = payload;
        return state;
      }
    );
    builder.addCase(
      delBeerFromTapsThunk.fulfilled,
      (state: PubState, { payload }: PayloadAction<Pub>) => {
        state.currentPubItem = payload;
        return state;
      }
    );
  },
});

export default pubsSlice.reducer;
export const { setCurrentPubItem } = pubsSlice.actions;
