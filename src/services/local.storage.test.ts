import { LocalStorage } from './local.storage';

test('should set and get data successfully', () => {
  const storage = new LocalStorage<string>('test');
  const data = 'test data';

  storage.set(data);
  const result = storage.get();

  expect(result).toEqual(data);
});
