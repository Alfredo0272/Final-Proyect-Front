import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { appStore } from '../../store/store';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import BeerDetails from './beer.details';

const mockLoadBeerById = jest.fn();
const mockAddBeer = jest.fn();
const mockDelBeer = jest.fn();
const mockLoadPubs = jest.fn();
const mockAddBeerToTap = jest.fn();
const mockDelBeerFromTap = jest.fn();
const mockGetUserStore = jest.fn().mockReturnValue({ token: '1234' });

jest.mock('../../hooks/use.beers', () => ({
  useBeers: jest.fn(() => ({
    currentBeerItem: {
      id: '1',
      name: 'Beer 1',
      brewer: 'Brewer 1',
      style: 'Style 1',
      alcohol: '5%',
      beerImg: {
        publicId: 'image1',
      },
    },
    loadBeerById: mockLoadBeerById,
  })),
}));

jest.mock('../../hooks/use.users', () => ({
  useUsers: jest.fn(() => ({
    addBeer: mockAddBeer,
    delBeer: mockDelBeer,
    userStore: {
      get: mockGetUserStore,
    },
  })),
}));

jest.mock('../../hooks/use.pubs', () => ({
  usePubs: jest.fn(() => ({
    pubs: [
      {
        id: 'pub1',
        name: 'Pub 1',
      },
    ],
    addBeerToTap: mockAddBeerToTap,
    delBeerFromTap: mockDelBeerFromTap,
    loadPubs: mockLoadPubs,
  })),
}));

describe('Given Details Component', () => {
  test('renders correctly', () => {
    render(
      <Router>
        <Provider store={appStore}>
          <BeerDetails />
        </Provider>
      </Router>
    );

    expect(mockLoadBeerById).toHaveBeenCalled();

    expect(screen.getByText('NAME:')).toBeInTheDocument();
    expect(screen.getByText('BREWER:')).toBeInTheDocument();
    expect(screen.getByText('STYLE:')).toBeInTheDocument();
    expect(screen.getByText('ALCOHOL:')).toBeInTheDocument();
  });

  test('renders add and delete buttons', () => {
    const pathname = '/details/1';
    render(
      <Router initialEntries={[pathname]}>
        <Provider store={appStore}>
          <BeerDetails />
        </Provider>
      </Router>
    );

    expect(screen.getByRole('button', { name: '❤️' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '🗑' })).toBeInTheDocument();
  });

  test('calls addBeer when add button is clicked', () => {
    const pathname = '/details/1';
    render(
      <Router initialEntries={[pathname]}>
        <Provider store={appStore}>
          <BeerDetails />
        </Provider>
      </Router>
    );

    fireEvent.click(screen.getByRole('button', { name: '❤️' }));
    expect(mockAddBeer).toHaveBeenCalledWith('1', '1234');
  });

  test('calls delBeer when delete button is clicked', () => {
    const pathname = '/details/1';
    render(
      <Router initialEntries={[pathname]}>
        <Provider store={appStore}>
          <BeerDetails />
        </Provider>
      </Router>
    );

    fireEvent.click(screen.getByRole('button', { name: '🗑' }));
    expect(mockDelBeer).toHaveBeenCalledWith('1', '1234');
  });

  test('calls addBeerToTap when Add Beer to Pub button is clicked', () => {
    const pathname = '/details/1';
    render(
      <Router initialEntries={[pathname]}>
        <Provider store={appStore}>
          <BeerDetails />
        </Provider>
      </Router>
    );
    fireEvent.click(
      screen.getByText((content) => content.startsWith('Add Beer to Pub'))
    );

    expect(mockLoadPubs).toHaveBeenCalled();
    expect(screen.getByText('Select a pub:')).toBeInTheDocument();
  });

  test('calls delBeerFromTap when Delete Beer from Pub button is clicked', () => {
    const pathname = '/details/1';
    render(
      <Router initialEntries={[pathname]}>
        <Provider store={appStore}>
          <BeerDetails />
        </Provider>
      </Router>
    );

    fireEvent.click(
      screen.getByText((content) => content.startsWith('Del Beer from Pub'))
    );

    expect(mockLoadPubs).toHaveBeenCalled();
    expect(screen.getByText('Select a pub:')).toBeInTheDocument();
  });

  test('calls addBeerToTap when a pub is selected', () => {
    const pathname = '/details/1';
    render(
      <Router initialEntries={[pathname]}>
        <Provider store={appStore}>
          <BeerDetails />
        </Provider>
      </Router>
    );

    fireEvent.click(
      screen.getByText((content) => content.startsWith('Add Beer to Pub'))
    );
    fireEvent.click(screen.getByText('Pub 1'));

    expect(mockAddBeerToTap).toHaveBeenCalledWith(
      { id: 'pub1', name: 'Pub 1' },
      '1',
      '1234'
    );
    expect(screen.queryByText('Select a pub:')).not.toBeInTheDocument();
  });

  test('calls delBeerFromTap when a pub is selected', () => {
    const pathname = '/details/1';
    render(
      <Router initialEntries={[pathname]}>
        <Provider store={appStore}>
          <BeerDetails />
        </Provider>
      </Router>
    );

    fireEvent.click(
      screen.getByText((content) => content.startsWith('Del Beer from Pub'))
    );
    fireEvent.click(screen.getByText('Pub 1'));

    expect(mockDelBeerFromTap).toHaveBeenCalledWith(
      { id: 'pub1', name: 'Pub 1' },
      '1',
      '1234'
    );
    expect(screen.queryByText('Select a pub:')).not.toBeInTheDocument();
  });
});
