export class LocalStorage<T> {
  // eslint-disable-next-line no-useless-constructor, no-unused-vars
  constructor(private storeName: string) {}

  get() {
    const initialData = localStorage.getItem(this.storeName);
    if (!initialData) return null;
    return JSON.parse(initialData) as T;
  }

  set(data: T) {
    const finalData = JSON.stringify(data);
    localStorage.setItem(this.storeName, finalData);
  }

  remove() {
    localStorage.removeItem(this.storeName);
  }
}
