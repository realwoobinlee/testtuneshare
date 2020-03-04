import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {StorageService} from '../../wichtig/storage.service';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-master',
  templateUrl: './master.page.html',
  styleUrls: ['./master.page.scss'],
})
export class MasterPage  {

  constructor(
    private storage: Storage,
    private router: Router,
  ) { 
    this._init();
  }

   _init() {
    let waitingTime = 0;
    //this.tokens = await this.storage.getTokens();
    /*
    this.storage.checkTokens()
    .then((data) => {
      if(data) {
        this.router.navigateByUrl('/tabs');
      } else {
        this.router.navigateByUrl('/home');
      }
    });
    */
    this.storage.get('sngshr_usertoken').then(val => {
      if(val) {
        this.router.navigateByUrl('/tabs');
      } else {
        this.router.navigateByUrl('/home');
      }
    })

    /*
    await setTimeout(() => {
      console.log("waited for " + waitingTime);
    },waitingTime);
    */
  }
  /*
  ionViewDidEnter() {
    console.log(this.res);
      if(this.res === true) {
        this.router.navigateByUrl('/tabs');
      } else if (this.res === false) {
        this.router.navigateByUrl('/home');
      }

  }
  */
}
