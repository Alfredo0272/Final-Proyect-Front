import { Beer } from './beer.model';

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
  role: 'Admin' | 'User';
};
