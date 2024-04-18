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

    beforeEach(() => {
      render(
        <Provider store={appStore}>
          <Router>
            <BeerCard beer={beerMock} />
          </Router>
        </Provider>
      );
    });

    test('should render a beer card with the correct information when all beer information is provided', async () => {
      const expectedTexts = [
        { label: 'NAME:', value: 'Beer 1' },
        { label: 'BREWER:', value: 'Brewer 1' },
        { label: 'STYLE:', value: 'Style 1' },
        { label: 'ALCOHOL:', value: '5%' },
      ];

      expectedTexts.forEach(({ label, value }) => {
        expect(screen.getByText(label)).toBeInTheDocument();
        expect(screen.getByText(value)).toBeInTheDocument();
      });

      expect(
        screen.getByAltText('movil beer image de Beer 1')
      ).toBeInTheDocument();

      userEvent.click(screen.getByAltText('movil beer image de Beer 1'));
    });
  });
});
