import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CryptoService } from './crypto.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public http: HttpClient, private crypto: CryptoService) {
    
  }

  async register(name: string, email: string, password: string){
    var encrypted = this.crypto.set('123456$#@$^@1ERF', 'password@123456');
    var decrypted = this.crypto.get('123456$#@$^@1ERF', encrypted);
   
    console.log('Encrypted -> ' + encrypted);
    console.log('Decrypted -> ' + decrypted);
  }

}
