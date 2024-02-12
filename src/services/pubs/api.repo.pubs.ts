import { serverUrl } from '../../config';
import { Beer } from '../../models/beer.model';
import { Pub } from '../../models/pub.model';
import { User } from '../../models/user.model';

export class ApiRepoPubs {
  apiUrl = serverUrl + '/pub/';
  async createPub(
    newPub: FormData,
    userId: User['id'],
    token: string
  ): Promise<Pub> {
    const url = `${this.apiUrl}create/` + userId;
    const response = await fetch(url, {
      method: 'POST',
      body: newPub,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(response.status + ' ' + response.statusText);
    }

    return response.json();
  }

  async loadPubs(): Promise<Pub[]> {
    const response = await fetch(`${this.apiUrl}`);
    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
    return response.json();
  }

  async loadPubById(pubId: Beer['id']): Promise<Pub> {
    const response = await fetch(`${this.apiUrl}create/` + pubId);
    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
    return response.json();
  }

  async addBeerToTaps(
    beer: Beer['id'],
    pub: Pub['id'],
    token: string
  ): Promise<Pub> {
    const url = `${this.apiUrl}addBeer/` + beer;
    const response = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(pub),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
    return response.json();
  }

  async delBeerFromTaps(
    beer: Beer['id'],
    pub: Pub['id'],
    token: string
  ): Promise<Pub> {
    const url = this.apiUrl + 'delBeer/' + beer;
    const response = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(pub),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
    return response.json();
  }
}
