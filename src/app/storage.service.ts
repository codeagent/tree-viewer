import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  getItem<T>(key: string, def: T): T {
    try {
      const v = self.localStorage.getItem(key);
      return v ? JSON.parse(v) : def;
    } catch {
      return def;
    }
  }

  hasItem(key: string): boolean {
    return !!self.localStorage.getItem(key)
  }

  setItem<T>(key: string, value: T) {
    self.localStorage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string) {
    return self.localStorage.removeItem(key);
  }

  clear(): void {
    self.localStorage.clear();
  }
}
