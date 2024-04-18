import { Beer } from '../../models/beer.model';
import { BeerState } from './beer.slice';
import beersReducer from './beer.slice';

describe('Given the beer slices reducers', () => {
  describe('When beers/load fullfiled action is dispatched', () => {
    const initialState: BeerState = {
      currentBeerItem: {} as unknown as Beer,
      beerState: 'idle',
      beers: [],
    };
    test('Then the new state will be returned', () => {
      const action = {
        type: 'loadBeer/fulfilled',
        payload: [{} as unknown as Beer],
      };
      const result = beersReducer(initialState, action);
      expect(result.beers).toStrictEqual([]);
      expect(result.currentBeerItem).toStrictEqual({});
    });
    test('then createBeerThunk/fullfilled action is dispatched', () => {
      const action = {
        type: 'createBeerThunk/fulfilled',
        payload: {} as unknown as Beer,
      };
      const result = beersReducer(initialState, action);
      expect(result.currentBeerItem).toStrictEqual({});
      expect(result.beerState).toBe('idle');
    });
    test('should set Beer to the payload when setCurrentBeer action is dispatched', () => {
      const state: BeerState = {} as BeerState;
      const payload = {} as unknown as Beer;
      const action = { type: 'beers/setCurrentBeerItem', payload };
      const result = beersReducer(state, action);
      expect(result.currentBeerItem).toEqual(payload);
    });
  });
  describe('When beers/load logging action is dispatched', () => {
    const initialState: BeerState = {
      currentBeerItem: {} as unknown as Beer,
      beerState: 'logging',
      beers: [],
    };
    test('then createBeerThunk/pending action is dispatched', () => {
      const action = {
        type: 'createBeerThunk/pending',
      };
      const result = beersReducer(initialState, action);
      expect(result.beerState).toBe('logging');
    });
  });
  describe('When beers/load error action is dispatched', () => {
    const initialState: BeerState = {
      currentBeerItem: null,
      beerState: 'error',
      beers: [],
    };
    test('should set beerState to "error" when createBeerThunk is rejected', () => {
      const action = { type: 'createBeerThunk/rejected', payload: 'error' };
      const result = beersReducer(initialState, action);
      expect(result.currentBeerItem).toBeNull();
      expect(result.beerState).toBe('error');
      expect(result.beers).toStrictEqual([]);
    });
    test('should set beerState to "error" when loadBeerThunk is rejected', () => {
      const action = { type: 'loadBeerThunk/rejected', payload: 'error' };
      const result = beersReducer(initialState, action);
      expect(result.currentBeerItem).toBeNull();
      expect(result.beerState).toBe('error');
      expect(result.beers).toStrictEqual([]);
    });
  });
});
