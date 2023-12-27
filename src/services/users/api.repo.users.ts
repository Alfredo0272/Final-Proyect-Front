import { serverUrl } from '../../config';
import { LoginUser } from '../../models/user.model';
import { LoginResponse } from '../../types/user.login';

export class UsersRepo {
  apiUrl = serverUrl + 'user/';

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
    const url = this.apiUrl + '/login';
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
