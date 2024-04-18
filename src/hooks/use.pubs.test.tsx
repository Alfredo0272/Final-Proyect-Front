import { Pub } from '../models/pub.model';
import { usePubs } from './use.pubs';
import { userEvent } from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { Provider, useDispatch } from 'react-redux';
import { appStore } from '../store/store';
import { LocalStorage } from '../services/local.storage';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn().mockReturnValue(jest.fn()),
  useParams: jest.fn().mockReturnValue({ id: 'test' }),
}));

const mockNewPub = {} as unknown as FormData;
const mockPub = {} as Pub;
describe('Given usePubs Hook', () => {
  const TestComponent = () => {
    const {
      loadPubs,
      loadPubById,
      handlePubDetails,
      addBeerToTap,
      delBeerFromTap,
      createPub,
    } = usePubs();

    return (
      <>
        <button onClick={() => loadPubs()}></button>
        <button onClick={() => loadPubById()}></button>
        <button onClick={() => handlePubDetails(mockPub)}></button>
        <button onClick={() => addBeerToTap(mockPub, 'beer', 'token')}></button>
        <button
          onClick={() => delBeerFromTap(mockPub, 'beer', 'token')}
        ></button>
        <button onClick={() => createPub(mockNewPub)}></button>
      </>
    );
  };

  let elements: HTMLElement[];
  beforeEach(() => {
    render(
      <Provider store={appStore}>
        <TestComponent></TestComponent>
      </Provider>
    );
    elements = screen.getAllByRole('button');
  });

  describe('When we click button loadPubs', () => {
    test('Then the dispatch should have been called', async () => {
      await userEvent.click(elements[0]);
      expect(useDispatch).toHaveBeenCalled();
    });
  });
  describe('When we click button loadPubById', () => {
    test('Then the dispatch should have been called', async () => {
      await userEvent.click(elements[1]);
      expect(useDispatch).toHaveBeenCalled();
    });
  });
  describe('When we click button handlePubDetails', () => {
    test('Then the dispatch should have been called', async () => {
      await userEvent.click(elements[2]);
      expect(useDispatch).toHaveBeenCalled();
    });
  });
  describe('When we click button addBeerToTap', () => {
    test('Then the dispatch should have been called', async () => {
      await userEvent.click(elements[3]);
      expect(useDispatch).toHaveBeenCalled();
    });
  });
  describe('When we click button delBeerFromTap', () => {
    test('Then the dispatch should have been called', async () => {
      await userEvent.click(elements[4]);
      expect(useDispatch).toHaveBeenCalled();
    });
  });
  describe('When we click button createPub', () => {
    test('Then the dispatch should have been called', async () => {
      global.fetch = jest.fn().mockImplementation((url) => {
        if (url.includes('create')) {
          return Promise.resolve({
            ok: true,
            json: () =>
              Promise.resolve({
                mockNewPub,
              }),
          });
        }

        return Promise.resolve({
          ok: false,
          status: 404,
          statusText: 'Not Found',
        });
      });
      LocalStorage.prototype.get = jest.fn().mockReturnValue('test');
      await userEvent.click(elements[5]);
      expect(useDispatch).toHaveBeenCalled();
    });
  });
});
