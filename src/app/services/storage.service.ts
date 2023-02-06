import { Injectable } from '@angular/core';

const TOKEN_KEY = 'nebula_token';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setToken(value: any) {
    localStorage.setItem(TOKEN_KEY, value);
  }

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  removeToken() {
    localStorage.removeItem(TOKEN_KEY);
  }
}
