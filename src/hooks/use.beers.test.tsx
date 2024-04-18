import { userEvent } from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { Provider, useDispatch } from 'react-redux';
import { useBeers } from './use.beers';
import { appStore } from '../store/store';
import { Beer } from '../models/beer.model';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn().mockReturnValue(jest.fn()),
}));

const mockBeer = {} as unknown as Beer;
const mockNewBeer = new FormData();
describe('Given useBeers Hook', () => {
  const TestComponent = () => {
    const { loadBeer, loadBeerById, handleBeerDetails, createBeer } =
      useBeers();

    return (
      <>
        <button onClick={() => loadBeer()}></button>
        <button onClick={() => loadBeerById()}></button>
        <button onClick={() => handleBeerDetails(mockBeer)}></button>
        <button onClick={() => createBeer(mockNewBeer)}></button>
      </>
    );
  };

  let elements: HTMLElement[];
  beforeEach(() => {
    render(
      <Provider store={appStore}>
        <TestComponent />
      </Provider>
    );
    elements = screen.getAllByRole('button');
  });

  describe('When we click button loadBeer', () => {
    test('Then the dispatch should have been called', async () => {
      await userEvent.click(elements[0]);
      expect(useDispatch).toHaveBeenCalled();
    });
  });
  describe('When we click button loadBeerById', () => {
    test('Then the dispatch should have been called', async () => {
      await userEvent.click(elements[1]);
      expect(useDispatch).toHaveBeenCalled();
    });
  });
  describe('When we click button handleBeerDetails', () => {
    test('Then the dispatch should have been called', async () => {
      await userEvent.click(elements[2]);
      expect(useDispatch).toHaveBeenCalled();
    });
  });
  describe('When we click button createBeer', () => {
    test('should return the correct value when userStore.get returns a non-null value', async () => {
      const mockGet = jest
        .fn()
        .mockReturnValue({ token: '123', id: '456', role: 'admin' });

      jest.mock('../services/local.storage', () => ({
        LocalStorage: jest.fn().mockImplementation(() => ({
          get: mockGet,
        })),
      }));

      await userEvent.click(elements[3]);
      expect(useDispatch).toHaveBeenCalled();
    });
  });
});
