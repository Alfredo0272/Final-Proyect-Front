import { serverUrl } from '../../config';
import { Beer } from '../../models/beer.model';

export class ApiRepoBeers {
  userToken: string | null;
  apiUrl = serverUrl + '/beer/';

  constructor() {
    this.userToken = localStorage.getItem('user') || null;
  }

  async createBeer(newBeer: FormData, token: string): Promise<Beer> {
    const finalid = JSON.parse(this.userToken!);
    const url = this.apiUrl + finalid;
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: newBeer,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(response.status + ' ' + response.statusText);
      }

      return response.json();
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      throw new Error('Error al crear la cerveza');
    }
  }

  async loadBeers(): Promise<Beer[]> {
    const response = await fetch(this.apiUrl);
    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
    return response.json();
  }

  async loadBeerbyId(beerId: Beer['id']): Promise<Beer> {
    const response = await fetch(this.apiUrl + beerId);
    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
    return response.json();
  }
}
