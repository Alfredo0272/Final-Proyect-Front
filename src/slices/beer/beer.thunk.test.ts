import { ApiRepoBeers } from '../../services/beers/api.repo.beers';
import { appStore } from '../../store/store';
import {
  createBeerThunk,
  loadBeerByIdThunk,
  loadBeerThunks,
} from './beer.thunk';

describe('Given the beerthunks', () => {
  describe('When we invoque them', () => {
    const sharedData = {
      repo: {
        createBeer: jest.fn().mockReturnValue({}),
        loadBeers: jest.fn().mockReturnValue({}),
        loadBeerbyId: jest.fn().mockReturnValue({}),
      } as unknown as ApiRepoBeers,
    };

    const newBeer = new FormData();
    const beer = 'ValidBeerID';
    test('Then it should dispatch createBeerThunk', async () => {
      const data = { ...sharedData, newBeer, token: '' };
      await appStore.dispatch(createBeerThunk(data));
      expect(data.repo.createBeer).toHaveBeenCalled();
    });
    test('Then it should dispatch loadBeerThunks', async () => {
      const data = { ...sharedData };
      await appStore.dispatch(loadBeerThunks(data.repo));
      expect(data.repo.loadBeers).toHaveBeenCalled();
    });
    test('Then it should dispatch loadBeerByID', async () => {
      const data = {
        ...sharedData,
        beer: { beerId: beer, repo: sharedData.repo },
      };
      await appStore.dispatch(loadBeerByIdThunk(data.beer));
      expect(data.repo.loadBeerbyId).toHaveBeenCalled();
    });
  });
});
