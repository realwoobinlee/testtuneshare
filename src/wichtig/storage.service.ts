import { Injectable } from '@angular/core';
import {TOKEN,AES_CONF} from './configHttp';
import {Storage} from '@ionic/storage';
//import {AES256} from '@ionic-native/aes-256';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private secureKey;
  private secureIV;

  constructor(
    private storage: Storage//,
    //private aes256: AES256
  ) {
    //this._init();
  }
  /*
  private async _init() {
    this.secureKey = await this.aes256.generateSecureKey(AES_CONF.KEY); 
    this.secureIV = await this.aes256.generateSecureIV(AES_CONF.IV);
    await console.log(this.secureKey,this.secureIV);
  }
*/
  async getTokens() {

    let _usertokens: Array<string> = [];
    let keys = Object.keys(TOKEN);
    await keys.forEach((key) => {;
      this.storage.get(TOKEN[key]).then(val => {
        
        _usertokens.push(val);
      });
    });
    
    return await _usertokens;
  }

  async setTokens(_tk, _rf_tk) {
    await this.storage.set(TOKEN.ACCESS,_tk);
    await this.storage.set(TOKEN.REFRESH,_rf_tk);
    await console.log("Tokens have been saved");
    
  }
}
