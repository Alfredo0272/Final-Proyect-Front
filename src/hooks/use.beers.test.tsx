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

const mockBeer = {} as Beer;
const mockNewBeer = new FormData();

describe('Given useBeers Hook', () => {
  const TestComponent = () => {
    const { loadBeer, loadBeerById, handleBeerDetails, createBeer } =
      useBeers();

    return (
      <>
        <button onClick={loadBeer}></button>
        <button onClick={loadBeerById}></button>
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

  const testButtonDispatch = (index: number) => {
    test(`When we click button at index ${index}, then the dispatch should have been called`, async () => {
      await userEvent.click(elements[index]);
      expect(useDispatch()).toHaveBeenCalled();
    });
  };

  describe('When we click different buttons', () => {
    testButtonDispatch(0);
    testButtonDispatch(1);
    testButtonDispatch(2);
    testButtonDispatch(3);
  });
});
