import { makeImageURL } from './images';

it('should return a valid URL string with the given publicID and height', () => {
  const publicID = 'image123';
  const height = 200;
  const expectedURL =
    'http://res.cloudinary.com/dv0kwrjox/image/upload/h_200/image123';

  const result = makeImageURL(publicID, height);

  expect(result).toBe(expectedURL);
});
