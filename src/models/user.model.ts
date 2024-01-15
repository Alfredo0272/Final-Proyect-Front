import { Beer } from './beer.model';
import { Pub } from './pub.model';

export type LoginUser = {
  email: string;
  password: string;
};

export type User = LoginUser & {
  id: string;
  name: string;
  surname: string;
  age: number;
  userName: string;
  probada: Beer[];
  visitado: Pub[];
  role: 'Admin' | 'User';
};
