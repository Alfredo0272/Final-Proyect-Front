import { serverUrl } from '../../config';
import { Beer } from '../../models/beer.model';
import { Pub } from '../../models/pub.model';

export class ApiRepoPubs {
  apiUrl = serverUrl + '/pub/';

  async createPub(newPub: FormData, token: string): Promise<Pub> {
    const url = `${this.apiUrl}create/`;
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

  async loadPubById(pubId: Pub['id']): Promise<Pub> {
    const url = `${this.apiUrl}` + pubId;
    const response = await fetch(url);
    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
    return response.json();
  }

  async addBeerToTaps(pub: Pub, beer: Beer['id'], token: string): Promise<Pub> {
    const url = `${this.apiUrl}addBeer/` + beer;
    const response = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(pub),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
    return response.json();
  }

  async delBeerFromTaps(
    pub: Pub,
    beer: Beer['id'],
    token: string
  ): Promise<Pub> {
    const url = this.apiUrl + 'delBeer/' + beer;
    const response = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(pub),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
    return response.json();
  }
}
