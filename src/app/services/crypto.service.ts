import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { token } from './key'

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor() { }
 
   set(value: any){ 
    var key = CryptoJS.enc.Utf8.parse(token.key);
    var iv = CryptoJS.enc.Utf8.parse(token.key);
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), key,
    {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return encrypted.toString();
  }

  get(value: any){
    var key = CryptoJS.enc.Utf8.parse(token.key);
    var iv = CryptoJS.enc.Utf8.parse(token.key);
    var decrypted = CryptoJS.AES.decrypt(value, key, {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}
