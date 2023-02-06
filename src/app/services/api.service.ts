import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserAdapter } from '../adapter/user-adapter';
import { User } from '../models/user';
import { StorageService } from './storage.service';
import { CryptoService } from './crypto.service';

const api_url = "http://localhost:3100"

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(public http: HttpClient, private crypto: CryptoService, private storageService: StorageService, private userAdapter: UserAdapter) {
    
  }

  getHeader(): HttpHeaders {
    const headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json; charset=utf-8',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: 'Bearer ' + this.storageService.getToken()
    });
    return headers;
  }

  getPosts(): Observable<any> {
    return this.http.get<any>(api_url + '/posts/getPosts', { headers: this.getHeader() })
  }

  register(obj: any): Observable<any> {
    obj.password = this.crypto.set(obj.password); 
    return this.http.post<any>(api_url + "/registration/register", obj);
  }

  async login(name: string, password: string){ 

  }

  getUserById(id: number): Observable<User> {
    return this.http.get<any>(api_url + '/user/databyuserid/' + id, { headers: this.getHeader() }).pipe(
      map(data => this.userAdapter.adapt(data.data))
    );
  }

}
