import { Component } from '@angular/core';
import {RealtimeService, IChatMessage} from '../../wichtig/realtime.service';
import {StorageService} from '../../wichtig/storage.service';
import {after_init_socket, messages} from '../tabs/tabs.page';
import { SignLogService } from 'src/wichtig/sign-log.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  private receiver: String;
  private messages: Array<IChatMessage> = [];
  private outmsg: String;
  private tokens;

  constructor(
    private realtime: RealtimeService,
    private http: SignLogService
  ) {
    this._init();
  }
  
  async _init() {
    await this.realtime.init()
    await this.realtime.onEvent("chatError").subscribe((data) => {
      console.log(data)
    })
    await this.realtime.onEvent("getMessage").subscribe((data) => {
      console.log(data)
    })
  }
  
  ionViewDidEnter() {
    this.http.getMessages().subscribe((data) => {
      this.messages = data.body
    })
    console.log(this.messages)
  }
  
  sendMessage(msg: string) {
    this.realtime.sendMessage(this.receiver, msg);
  }
  
}