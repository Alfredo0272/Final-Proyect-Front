import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { appStore } from '../../store/store';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import PubDetails from './pub.details';

const mockLoadPubById = jest.fn();
const mockAddPub = jest.fn();
const mockDelPub = jest.fn();
const mockGetUserStore = jest.fn().mockReturnValue({ token: '1234' });

jest.mock('../../hooks/use.pubs', () => ({
  usePubs: jest.fn(() => ({
    currentPubItem: {
      id: '1',
      name: 'Pub 1',
      owner: 'Owner 1',
      direction: 'Direction 1',
      taps: 5,
      logo: {
        publicId: 'image1',
      },
      beers: [
        {
          id: '1',
          name: 'Beer 1',
          brewer: 'Brewer 1',
          style: 'Style 1',
          alcohol: '5%',
          beerImg: {
            publicId: 'image1',
          },
        },
      ],
    },
    loadPubById: mockLoadPubById,
  })),
}));

jest.mock('../../hooks/use.users', () => ({
  useUsers: jest.fn(() => ({
    addPub: mockAddPub,
    delPub: mockDelPub,
    userStore: {
      get: mockGetUserStore,
    },
  })),
}));

describe('Given Pub Details Component', () => {
  test('renders correctly', () => {
    render(
      <Router>
        <Provider store={appStore}>
          <PubDetails />
        </Provider>
      </Router>
    );
  });

  test('should call loadPubById', () => {
    render(
      <Router>
        <Provider store={appStore}>
          <PubDetails />
        </Provider>
      </Router>
    );
    expect(mockLoadPubById).toHaveBeenCalled();
  });
  test('should call addPub', () => {
    render(
      <Router>
        <Provider store={appStore}>
          <PubDetails />
        </Provider>
      </Router>
    );
    fireEvent.click(screen.getByRole('button', { name: '❤️' }));
    expect(mockAddPub).toHaveBeenCalled();
  });
  test('should call delPub', () => {
    render(
      <Router>
        <Provider store={appStore}>
          <PubDetails />
        </Provider>
      </Router>
    );

    fireEvent.click(screen.getByRole('button', { name: '🗑' }));
    expect(mockDelPub).toHaveBeenCalled();
  });
});
