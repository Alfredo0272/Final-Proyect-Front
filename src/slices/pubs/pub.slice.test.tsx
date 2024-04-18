import { Pub } from '../../models/pub.model';
import pubsReducer, { PubState, setCurrentPubItem } from './pub.slice';
import { addBeerToTapsThunk, createPubThunk, loadPubThunk } from './pub.thunk';

describe('Given the pubs slice reducer', () => {
  const initialState: PubState = {
    currentPubItem: {} as Pub,
    pubState: 'idle',
    pubs: [],
  };

  describe('When pubs/load action is dispatched', () => {
    test('Then the new state will be returned', () => {
      const action = {
        type: loadPubThunk.fulfilled.type,
        payload: [{} as Pub],
      };
      const result = pubsReducer(initialState, action);
      expect(result.currentPubItem).toStrictEqual({});
    });

    test('should set Pub to the payload when setCurrentPub action is dispatched', () => {
      const state: PubState = {} as PubState;
      const payload = {} as Pub;
      const action = { type: setCurrentPubItem.type, payload };
      const result = pubsReducer(state, action);
      expect(result.currentPubItem).toEqual(payload);
    });

    test('should update the state correctly when createPubThunk is fulfilled', () => {
      const payload = {} as Pub;
      const action = { type: createPubThunk.fulfilled.type, payload };
      const result = pubsReducer(initialState, action);
      expect(result.currentPubItem).toEqual(payload);
      expect(result.pubState).toBe('idle');
    });
  });

  describe('When pubs/load action is dispatched with error', () => {
    const errorInitialState: PubState = {
      currentPubItem: null,
      pubState: 'error',
      pubs: [],
    };

    test('should set pubState to "error" when createPubThunk is rejected', () => {
      const action = { type: createPubThunk.rejected.type };
      const result = pubsReducer(errorInitialState, action);
      expect(result.currentPubItem).toBeNull();
      expect(result.pubState).toBe('error');
    });

    test('should set pubState to "error" when loadPubThunk is rejected', () => {
      const action = { type: loadPubThunk.rejected.type };
      const result = pubsReducer(errorInitialState, action);
      expect(result.currentPubItem).toBeNull();
      expect(result.pubState).toBe('error');
    });

    test('should set pubState to "error" when addBeerToTapsThunk is rejected', () => {
      const action = { type: addBeerToTapsThunk.rejected.type };
      const result = pubsReducer(errorInitialState, action);
      expect(result.currentPubItem).toBeNull();
      expect(result.pubState).toBe('error');
    });
  });
});
