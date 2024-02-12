import { Beer } from '../../models/beer.model';
import { ApiRepoBeers } from './api.repo.beers';

const newBeer: FormData = {} as unknown as FormData;
const mockUserID = '123';
localStorage.setItem('user', JSON.stringify({ token: mockUserID }));
const mockBeerId = '123';
describe('Given User ApiRepo class', () => {
  describe('When we instantiate it and response is ok', () => {
    test('should send a POST request to the correct URL with the correct body and headers, and return the parsed response', async () => {
      const newBeer: FormData = {} as unknown as FormData;
      const expectedResponse: Beer = {} as unknown as Beer;
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(expectedResponse),
      });

      const apiRepoBeers = new ApiRepoBeers();
      const result = await apiRepoBeers.createBeer(newBeer);

      expect(result).toEqual(expectedResponse);
    });
    test('should fetch beers from the API and return them as an array of Beer objects', async () => {
      const expectedResponse: Beer[] = [] as unknown as Beer[];
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(expectedResponse),
      });

      const apiRepoBeers = new ApiRepoBeers();
      const result = await apiRepoBeers.loadBeers();

      expect(result).toEqual(expectedResponse);
    });
    test('should fetch a beer by its ID and return it as a Beer object', async () => {
      const expectedResponse: Beer = {} as unknown as Beer;
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(expectedResponse),
      });

      const apiRepoBeers = new ApiRepoBeers();
      const result = await apiRepoBeers.loadBeerbyId(mockBeerId);

      expect(result).toEqual(expectedResponse);
    });
  });
  describe('When we instantiate it and response is fail', () => {
    beforeEach(() => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
      });
    });
    test('should throw an error when newBeer parameter is null', async () => {
      const apiRepoBeer = new ApiRepoBeers();
      await expect(apiRepoBeer.createBeer(newBeer)).rejects.toThrow();
    });
    test('should throw an error if the API returns a non-OK status code', async () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      });

      const apiRepoBeers = new ApiRepoBeers();
      await expect(apiRepoBeers.loadBeers()).rejects.toThrow('404 Not Found');
    });
    test('should throw an error if the API returns a non-OK whenwe loadByID', async () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      });

      const apiRepoBeers = new ApiRepoBeers();
      await expect(apiRepoBeers.loadBeerbyId(mockBeerId)).rejects.toThrow(
        '404 Not Found'
      );
    });
  });
});
