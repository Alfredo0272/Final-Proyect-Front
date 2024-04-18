import { Pub } from '../../models/pub.model';
import { ApiRepoPubs } from './api.repo.pubs';

const newPub: FormData = {} as unknown as FormData;

describe('Given Pub ApiRepo class', () => {
  const apiRepoPubs = new ApiRepoPubs();
  describe('When we instantiate it and response is ok', () => {
    const expectedResponse: Pub = {} as unknown as Pub;
    beforeEach(() => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(expectedResponse),
      });
    });

    test('should send a POST request to the correct URL with the correct body and headers, and return the parsed response', async () => {
      const result = await apiRepoPubs.createPub(newPub, 'token');
      expect(result).toEqual(expectedResponse);
    });
    test('should fetch pubs from the API and return them as an array of Pub objects', async () => {
      const result = await apiRepoPubs.loadPubs();
      expect(result).toEqual(expectedResponse);
    });
    test('should fetch a pub by its ID and return it as a Pub object', async () => {
      const result = await apiRepoPubs.loadPubById('123');
      expect(result).toEqual(expectedResponse);
    });
    test('should add a beer to the taps of a pub and return the updated pub', async () => {
      const result = await apiRepoPubs.addBeerToTaps({} as Pub, '123', 'token');
      expect(result).toEqual(expectedResponse);
    });
    test('should delete a beer from the taps of a pub and return the updated pub', async () => {
      const result = await apiRepoPubs.delBeerFromTaps(
        {} as Pub,
        '123',
        'token'
      );
      expect(result).toEqual(expectedResponse);
    });
  });
  describe('When we instantiate it and response is fail', () => {
    const expectedResponse: Pub = {} as unknown as Pub;
    beforeEach(() => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
        json: jest.fn().mockResolvedValueOnce(expectedResponse),
      });
    });
    test('should throw an error when newPub parameter is null', async () => {
      await expect(apiRepoPubs.createPub(newPub, 'token')).rejects.toThrow();
    });
    test('should throw an error if the API returns a non-OK status code', async () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      });
      await expect(apiRepoPubs.loadPubs()).rejects.toThrow();
    });
    test('should throw an error if the API returns a non-OK whenwe loadByID', async () => {
      await expect(apiRepoPubs.loadPubById('123')).rejects.toThrow();
    });
    test('should throw an error if the API returns a non-OK when addBeerToTaps', async () => {
      await expect(
        apiRepoPubs.addBeerToTaps({} as Pub, '123', 'token')
      ).rejects.toThrow();
    });
    test('should throw an error if the API returns a non-OK when delBeerFromTaps', async () => {
      await expect(
        apiRepoPubs.delBeerFromTaps({} as Pub, '123', 'token')
      ).rejects.toThrow();
    });
  });
});
