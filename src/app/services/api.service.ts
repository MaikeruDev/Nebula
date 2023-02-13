import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserAdapter } from '../adapter/user-adapter';
import { User } from '../models/user';
import { StorageService } from './storage.service';
import { CryptoService } from './crypto.service';

const api_url = "http://192.168.100.119:3100"

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(public http: HttpClient, private crypto: CryptoService, private storageService: StorageService, private userAdapter: UserAdapter) {
    
  }

  getHeader(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: 'Bearer ' + this.storageService.getToken()
    });
    return headers;
  }

  getPosts(skip: any): Observable<any> {
    return this.http.post<any>(api_url + '/posts/getPosts', {skip: skip}, { headers: this.getHeader()})
  }

  getStats(): Observable<any> {
    return this.http.get<any>(api_url + '/stats/getStats', { headers: this.getHeader()})
  }

  getOwnPosts(skip: any): Observable<any> {
    return this.http.post<any>(api_url + '/posts/getOwnPosts', {skip: skip}, { headers: this.getHeader()})
  }

  register(obj: any): Observable<any> {
    obj.password = this.crypto.set(obj.password); 
    return this.http.post<any>(api_url + "/registration/register", obj);
  }

  login(email: string, password: string): Observable<any>{ 
    password = this.crypto.set(password);  
    return this.http.post<any>(api_url + '/registration/login', { email, password });
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<any>(api_url + '/user/databyuserid/' + id, { headers: this.getHeader() }).pipe(
      map(data => this.userAdapter.adapt(data.data))
    );
  }

  searchUsers(searchTerm: string): Observable<any> {
    return this.http.post<any>(api_url + '/user/searchUser', { searchTerm: searchTerm }, { headers: this.getHeader() })
  }

  getRandomUsers(amount: number): Observable<any> {
    return this.http.post<any>(api_url + '/user/getRandomUsers', { amount: amount }, { headers: this.getHeader() })
  }

}
