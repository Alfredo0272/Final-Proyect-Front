import { ImgData } from '../types/img.data';
import { Beer } from './beer.model';

export type Pub = {
  logo: ImgData;
  direction: string;
  owner: string;
  taps: number;
  beers: Beer[];
};
