import { serverUrl } from '../../config';
import { Beer } from '../../models/beer.model';
import { LoginUser, User } from '../../models/user.model';
import { LoginResponse } from '../../types/user.login';

export class UsersRepo {
  apiUrl = serverUrl + '/user/';

  async login(loginUser: LoginUser): Promise<LoginResponse> {
    const url = this.apiUrl + 'login';
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(loginUser),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
    return response.json();
  }

  async loginWithToken(token: string): Promise<LoginResponse> {
    const url = this.apiUrl + 'login';
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
    return response.json();
  }

  async registerUser(newUser: Partial<User>): Promise<User> {
    const url = this.apiUrl + 'register';
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
    return response.json();
  }

  async getUserbyID(_id: User['id']): Promise<User> {
    const userID = localStorage.get('id');
    const url = this.apiUrl + userID.id;
    const response = await fetch(url);
    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
    return response.json();
  }

  async addBeertoTaste(beer: Beer['id'], token: string): Promise<User> {
    const url = this.apiUrl + 'addBeer/' + beer;
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
    return response.json();
  }

  async delBeertoTaste(beer: Beer['id'], token: string): Promise<User> {
    const url = this.apiUrl + 'delBeer/' + beer;
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
    return response.json();
  }
}
