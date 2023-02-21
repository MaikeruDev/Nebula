import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserAdapter } from '../adapter/user-adapter';
import { User } from '../models/user';
import { StorageService } from './storage.service';
import { CryptoService } from './crypto.service'; 
import { Post } from '../models/post';

const api_url = "https://michael.prietl.com:3100" 

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

  getNotifications(skip: number): Observable<any> {
    return this.http.post<any>(api_url + '/user/getNotifications', { skip: skip }, { headers: this.getHeader()}).pipe(
      map(data => data.data)
    );
  }
  
  hasNewNotifications(): Observable<any> {
    return this.http.get<any>(api_url + '/user/hasNewNotifications', { headers: this.getHeader()}).pipe(
      map((data: any) => {
        if (data.data.seen == false) return true
        else return false
      })
    );
  }

  getPosts(skip: any): Observable<any> {
    return this.http.post<any>(api_url + '/posts/getPosts', {skip: skip}, { headers: this.getHeader()})
  }
  
  getPost(PostID: number, skip: number): Observable<any> {
    return this.http.post<any>(api_url + '/posts/getPost', {PostID: PostID, skip: skip}, { headers: this.getHeader()}).pipe(
      map(data => data.data)
    );
  }

  getStats(): Observable<any> {
    return this.http.get<any>(api_url + '/stats/getStats', { headers: this.getHeader()})
  }

  getOwnPosts(skip: any): Observable<any> {
    return this.http.post<any>(api_url + '/posts/getOwnPosts', {skip: skip}, { headers: this.getHeader()})
  }

  getUsersPosts(skip: any, userID: number){
    return this.http.post<any>(api_url + '/posts/getUsersPosts', {skip: skip, userID: userID}, { headers: this.getHeader()})
  }

  newPost(obj: any) {    
    return this.http.post<any>(api_url + '/posts/newPost', obj, { headers: this.getHeader().append('Content-Type', '; multipart/form-data; charset=utf-8') })
  }

  deletePost(obj: any) {    
    return this.http.post<any>(api_url + '/posts/deletePost', obj, { headers: this.getHeader()}).pipe(
      map(data => data)
    );
  }

  newComment(obj: any) {    
    return this.http.post<any>(api_url + '/posts/newComment', obj, { headers: this.getHeader()}).pipe(
      map(data => data)
    );
  }

  likePost(post: Post){
    return this.http.post<any>(api_url + '/posts/likePost', post, { headers: this.getHeader()})
  }

  unlikePost(post: Post){
    return this.http.post<any>(api_url + '/posts/unlikePost', post, { headers: this.getHeader()})
  }

  updateProfileSettings(obj: any){
    return this.http.post<any>(api_url + '/user/updateProfileSettings', obj, { headers: this.getHeader()}).pipe(
      map(data => data)
    );
  }

  register(obj: any): Observable<any> {
    obj.password = this.crypto.set(obj.password); 
    return this.http.post<any>(api_url + "/registration/register", obj);
  }

  login(email: string, password: string): Observable<any>{ 
    password = this.crypto.set(password);  
    return this.http.post<any>(api_url + '/registration/login', { email, password });
  }

  follow(user: User){
    return this.http.post<any>(api_url + '/user/follow', user, { headers: this.getHeader()})
  }

  unfollow(user: User){
    return this.http.post<any>(api_url + '/user/unfollow', user, { headers: this.getHeader()})
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
