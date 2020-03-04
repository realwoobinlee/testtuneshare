import { Component } from '@angular/core';
import {RealtimeService} from '../../wichtig/realtime.service';
import {StorageService} from '../../wichtig/storage.service';


export var after_init_socket;
export var messages: Array<String> = [];

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})

export class TabsPage {
  private tokens: Array<String> = [];
  constructor(
    public realtime: RealtimeService,
    public storage: StorageService) {
      this._init();
    }
  async _init() {
    this.tokens = await this.storage.getTokens();
  }

  ionViewWillEnter() {
    if(this.tokens) {
      console.log(this.tokens)
      this.getMessage();
    }
  }
  getMessage() {
    this.realtime.onEvent("getMessage").subscribe(msg => {
      console.log(msg);
    }) // weiter!!!
  }
  
}
