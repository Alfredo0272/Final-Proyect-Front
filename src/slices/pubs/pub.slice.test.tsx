import { Pub } from '../../models/pub.model';
import pubsReducer, { PubState } from './pub.slice';

describe('Given the pubs slice reducer', () => {
  describe('When pubs/load action is dispatched', () => {
    const initialState: PubState = {
      currentPubItem: {} as unknown as Pub,
      pubState: 'idle',
      pubs: [],
    };
    test('Then the new state will be returned', () => {
      const action = {
        type: 'loadPub/fulfilled',
        payload: [{} as unknown as Pub],
      };
      const result = pubsReducer(initialState, action);
      expect(result.currentPubItem).toStrictEqual({});
    });
    test('should set Pub to the payload when setCurrentPub action is dispatched', () => {
      const state: PubState = {} as PubState;
      const payload = {} as unknown as Pub;
      const action = { type: 'pubs/setCurrentPubItem', payload };
      const result = pubsReducer(state, action);
      expect(result.currentPubItem).toEqual(payload);
    });
    test('should update the state correctly when createPubThunk is fulfilled', () => {
      const payload = {} as unknown as Pub;
      const action = { type: 'createPubThunk/fulfilled', payload };
      const result = pubsReducer(initialState, action);
      expect(result.currentPubItem).toEqual(payload);
      expect(result.pubState).toBe('idle');
    });
  });
  describe('When pubs/load action is dispatched with error', () => {
    const initialState: PubState = {
      currentPubItem: null,
      pubState: 'error',
      pubs: [],
    };
    test('should set pubState to "error" when createPubThunk is rejected', () => {
      const action = { type: 'createPubThunk/rejected' };
      const result = pubsReducer(initialState, action);
      expect(result.currentPubItem).toBeNull();
      expect(result.pubState).toBe('error');
    });
    test('should set pubState to "error" when loadPubThunk is rejected', () => {
      const action = { type: 'loadPubThunk/rejected' };
      const result = pubsReducer(initialState, action);
      expect(result.currentPubItem).toBeNull();
      expect(result.pubState).toBe('error');
    });
    test('should set pubState to "error" when addBeerToTapsThunk is rejected', () => {
      const action = { type: 'addBeerToTapsThunk/rejected' };
      const result = pubsReducer(initialState, action);
      expect(result.currentPubItem).toBeNull();
      expect(result.pubState).toBe('error');
    });
  });
});
