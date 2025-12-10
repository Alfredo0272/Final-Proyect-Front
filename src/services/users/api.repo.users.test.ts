import { User } from '../../models/user.model';
import { UsersRepo } from './api.repo.users';

const mockLogin = {
  email: 'test@example.com',
  password: 'password123',
};

const mockRegister: Partial<User> = {
  id: '123',
  name: 'John',
  surname: 'Doe',
  age: 25,
  userName: 'johndoe',
};

const mockUserID = '123';
const mockBeerID = '456';
const mockToken = 'mocktoken';
const mockPubID = '789';

localStorage.setItem(
  'user',
  JSON.stringify({ token: mockToken, id: mockUserID })
);

const repo = new UsersRepo();

describe('Given User ApiRepo class', () => {
  describe('When response is ok', () => {
    let jsonMock: jest.Mock;

    beforeEach(() => {
      jsonMock = jest.fn().mockResolvedValue([]);
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jsonMock,
      });
    });

    test('login should return data', async () => {
      const result = await repo.login(mockLogin);
      expect(global.fetch).toHaveBeenCalled();
      expect(jsonMock).toHaveBeenCalled();
      expect(result).toStrictEqual([]);
    });

    test('loginWithToken should be executed', async () => {
      const result = await repo.loginWithToken(mockToken);
      expect(global.fetch).toHaveBeenCalled();
      expect(jsonMock).toHaveBeenCalled();
      expect(result).toStrictEqual([]);
    });

    test('registerUser should return data', async () => {
      const result = await repo.registerUser(mockRegister);
      expect(result).toEqual([]);
    });

    test('getUserbyID should return data', async () => {
      const result = await repo.getUserbyID(mockUserID);
      expect(result).toEqual([]);
    });

    test('addBeertoTaste should return data', async () => {
      const result = await repo.addBeertoTaste(
        mockBeerID,
        mockToken,
        mockUserID
      );
      expect(result).toEqual([]);
    });

    test('delBeerFromTaste should return data', async () => {
      const result = await repo.delBeerFromTaste(
        mockBeerID,
        mockToken,
        mockUserID
      );
      expect(result).toEqual([]);
    });

    test('addPubtoVisited should return data', async () => {
      const result = await repo.addPubtoVisited(
        mockPubID,
        mockToken,
        mockUserID
      );
      expect(result).toEqual([]);
    });

    test('delPubFromVisited should return data', async () => {
      const result = await repo.delPubFromVisited(
        mockPubID,
        mockToken,
        mockUserID
      );
      expect(result).toEqual([]);
    });
  });

  describe('When response is NOT ok', () => {
    beforeEach(() => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
      });
    });

    test('login should throw', async () => {
      await expect(repo.login(mockLogin)).rejects.toThrow();
    });

    test('loginWithToken should throw', async () => {
      await expect(repo.loginWithToken(mockToken)).rejects.toThrow();
    });

    test('registerUser should throw', async () => {
      await expect(repo.registerUser(mockRegister)).rejects.toThrow();
    });

    test('getUserbyID should throw', async () => {
      await expect(repo.getUserbyID(mockUserID)).rejects.toThrow();
    });

    test('addBeertoTaste should throw', async () => {
      await expect(
        repo.addBeertoTaste(mockBeerID, mockToken, mockUserID)
      ).rejects.toThrow();
    });

    test('delBeerFromTaste should throw', async () => {
      await expect(
        repo.delBeerFromTaste(mockBeerID, mockToken, mockUserID)
      ).rejects.toThrow();
    });

    test('addPubtoVisited should throw', async () => {
      await expect(
        repo.addPubtoVisited(mockPubID, mockToken, mockUserID)
      ).rejects.toThrow();
    });

    test('delPubFromVisited should throw', async () => {
      await expect(
        repo.delPubFromVisited(mockPubID, mockToken, mockUserID)
      ).rejects.toThrow();
    });
  });
});
