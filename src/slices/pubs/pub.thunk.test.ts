import { Pub } from '../../models/pub.model';
import { ApiRepoPubs } from '../../services/pubs/api.repo.pubs';
import { appStore } from '../../store/store';
import {
  addBeerToTapsThunk,
  createPubThunk,
  delBeerFromTapsThunk,
  loadPubByIdThunk,
  loadPubThunk,
} from './pub.thunk';

describe('Given the Pub Thunks', () => {
  describe('When we invoque them ', () => {
    const sharedData = {
      repo: {
        createPub: jest.fn(),
        loadPubs: jest.fn(),
        loadPubById: jest.fn(),
        addBeerToTaps: jest.fn(),
        delBeerFromTaps: jest.fn(),
      } as unknown as ApiRepoPubs,
    };

    const newPub = {} as unknown as FormData;
    const beer = 'ValidBeerID';
    const token = 'validToken';
    const pub = 'validID';

    test('Then it should dispatch createPubThunk', async () => {
      const data = { ...sharedData, newPub, token };
      await appStore.dispatch(createPubThunk(data));
      expect(data.repo.createPub).toHaveBeenCalled();
    });
    test('Then it should dispatch loadPubThunk', async () => {
      const data = { ...sharedData };
      await appStore.dispatch(loadPubThunk(data.repo));
      expect(data.repo.loadPubs).toHaveBeenCalled();
    });
    test('Then it should dispatch loadPubByIdThunk', async () => {
      const data = {
        ...sharedData,
        pub: { pubID: pub, repo: sharedData.repo },
      };
      await appStore.dispatch(loadPubByIdThunk(data.pub));
      expect(data.repo.loadPubById).toHaveBeenCalled();
    });
    test('Then it should dispatch addBeerToTapsThunk', async () => {
      const data = { ...sharedData, pub: pub as unknown as Pub, beer, token };
      await appStore.dispatch(addBeerToTapsThunk(data));
      expect(data.repo.addBeerToTaps).toHaveBeenCalled();
    });
    test('Then it should dispatch delBeerFromTapsThunk', async () => {
      const data = { ...sharedData, pub: pub as unknown as Pub, beer, token };
      await appStore.dispatch(delBeerFromTapsThunk(data));
      expect(data.repo.delBeerFromTaps).toHaveBeenCalled();
    });
  });
});
