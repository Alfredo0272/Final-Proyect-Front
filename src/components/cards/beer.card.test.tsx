import { Provider } from 'react-redux';
import { appStore } from '../../store/store';
import BeerCard from './beer.card';
import { MemoryRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Beer } from '../../models/beer.model';
import userEvent from '@testing-library/user-event';

jest.mock('../../hooks/use.beers', () => ({
  useBeers: jest.fn().mockReturnValue({
    handleBeerDetails: jest.fn(),
    loadBeer: jest.fn(),
  }),
}));

jest.mock('../../services/images', () => ({
  makeImageURL: jest.fn(),
}));

describe('given the card element', () => {
  describe('card element should render', () => {
    const beerMock = {
      name: 'Beer 1',
      brewer: 'Brewer 1',
      style: 'Style 1',
      alcohol: '5%',
      beerImg: {
        publicId: 'image1',
      },
    } as unknown as Beer;

    render(
      <Provider store={appStore}>
        <Router>
          <BeerCard beer={beerMock} />
        </Router>
      </Provider>
    );
    test('should render a beer card with the correct information when all beer information is provided', async () => {
      expect(screen.getByText('NAME:')).toBeInTheDocument();
      expect(screen.getByText('Beer 1')).toBeInTheDocument();
      expect(screen.getByText('BREWER:')).toBeInTheDocument();
      expect(screen.getByText('Brewer 1')).toBeInTheDocument();
      expect(screen.getByText('STYLE:')).toBeInTheDocument();
      expect(screen.getByText('Style 1')).toBeInTheDocument();
      expect(screen.getByText('ALCOHOL:')).toBeInTheDocument();
      expect(screen.getByText('5%')).toBeInTheDocument();
      expect(
        screen.getByAltText('movil beer image de Beer 1')
      ).toBeInTheDocument();
      userEvent.click(screen.getByAltText('movil beer image de Beer 1'));
    });
  });
});
