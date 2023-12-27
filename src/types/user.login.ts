import { User } from '../models/user.model';

export type LoginResponse = {
  user: User;
  token: string;
};
