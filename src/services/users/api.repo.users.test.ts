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
  JSON.stringify({ token: mockUserID, id: mockUserID })
);

const repo = new UsersRepo();
describe('Given User ApiRepo class', () => {
  describe('When we instantiate it and response is ok', () => {
    let jsonMock: jest.Mock;
    beforeEach(() => {
      jsonMock = jest.fn().mockResolvedValue([]);
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: jsonMock,
      });
    });

    test('Then method login should be used', async () => {
      const expected: User[] = [];
      const result = await repo.login(mockLogin);
      expect(jsonMock).toHaveBeenCalled();
      expect(result).toStrictEqual(expected);
    });

    test('Then method login should be used', async () => {
      const expected: User[] = [];
      const result = await repo.loginWithToken(mockToken);
      expect(jsonMock).toHaveBeenCalled();
      expect(result).toStrictEqual(expected);
    });

    test('then method registerUser should be used', async () => {
      const result = await repo.registerUser(mockRegister);
      expect(result).toEqual([]);
    });
    test('then method getUserbyId should be used', async () => {
      const result = await repo.getUserbyID(mockUserID);
      expect(result).toEqual([]);
    });
    test('then method addBeertoTaste should be used', async () => {
      const result = await repo.addBeertoTaste(mockBeerID, mockToken);
      expect(result).toEqual([]);
    });
    test('then method delBeerFromTase should be used', async () => {
      const result = await repo.delBeerFromTaste(mockBeerID, mockToken);
      expect(result).toEqual([]);
    });
    test('then method addPubtoVisited should be used', async () => {
      const result = await repo.addPubtoVisited(mockPubID, mockToken);
      expect(result).toEqual([]);
    });
    test('then method delPubFromVisited should be used', async () => {
      const result = await repo.delPubFromVisited(mockPubID, mockToken);
      expect(result).toEqual([]);
    });
  });

  describe('When we instantiate it and response is bad', () => {
    beforeEach(() => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
      });
    });
    test('Then method login dont should be used', async () => {
      expect(repo.login(mockLogin)).rejects.toThrow();
    });
    test('Then method loginWhitToken dont should be used', async () => {
      expect(repo.loginWithToken(mockToken)).rejects.toThrow();
    });
    test('Then method reegisterUser dont shoul be used', async () => {
      expect(repo.registerUser(mockRegister)).rejects.toThrow();
    });
    test('Then method getUserbyId dont should be used', async () => {
      expect(repo.getUserbyID(mockUserID)).rejects.toThrow();
    });
    test('Then method addBeertoTaste dont should be used', async () => {
      expect(repo.addBeertoTaste(mockBeerID, mockToken)).rejects.toThrow();
    });
    test('Then method delBeerFromTaste dont should be used', async () => {
      expect(repo.delBeerFromTaste(mockBeerID, mockToken)).rejects.toThrow();
    });
    test('Then method addPubtoVisited dont should be used', async () => {
      expect(repo.addPubtoVisited(mockPubID, mockToken)).rejects.toThrow();
    });
    test('Then method delPubtoVisited dont should be used', async () => {
      expect(repo.delPubFromVisited(mockPubID, mockToken)).rejects.toThrow();
    });
  });
});
