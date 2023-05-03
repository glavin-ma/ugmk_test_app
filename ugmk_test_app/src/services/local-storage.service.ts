export class LocalStorageService {
  get<T>(token: string): T | null {
    const val = localStorage.getItem(token);
    return val !== null ? (JSON.parse(val) as T) : null;
  }
  set<T>(token: string, data: T) {
    localStorage.setItem(token, JSON.stringify(data));
  }
}
