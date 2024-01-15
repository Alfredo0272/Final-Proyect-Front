export const makeImageURL = (publicId: string, height: number) => {
  const urlBase = 'http://res.cloudinary.com/dv0kwrjox/image/upload';
  const url = `${urlBase}/h_${height}/${publicId}`;
  return url;
};
