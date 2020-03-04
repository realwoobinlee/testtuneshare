import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import {serverurl} from './configHttp';
import { Observable } from 'rxjs';

export interface IChatMessage {
  from: string
  roomid: string
  message: SongIDs | string
  date: Date
}
interface SongIDs {
  spotify: string
  apple_music: string
}
@Injectable({
  providedIn: 'root'
})
//  1.  dbservice
/*
  2.  var socket = io("http://localhost", {
    extraHeaders: {
      Authorization: "Bearer authorization_token_here"
    }
  });
*/
export class RealtimeService {
  public socket;

  constructor() {
  }

  public init() {
      this.socket = io(serverurl + "/chat", {
        //path: "/chat",
        query: {
          "from": "web"
        }
      });
      this.socket.on('connect',() => {
        console.log("socket connected");
      });
      return this.socket;
    
  }

  public changeSocket(_socket) {
    if(_socket) {
      this.socket = _socket;
    }
  }
  // recipient= username(s) of opposition 
  public sendMessage(roomid: String, message: SongIDs | string) {
    this.socket.emit("sendMessage",{
        roomid: roomid,
        message: message
    });
  }

  public 

  // event = "getMessage":, 
  //"refreshed"
  public getMessage() {
    return new Observable<IChatMessage>( (observer) => { 
      this.socket.on("getMessage", (data: IChatMessage) => {
          observer.next(data);
      });   
    });
  }
  public getchatError() {
    return new Observable<IChatMessage>( (observer) => { 
      this.socket.on("chatError", (data: IChatMessage) => {
          observer.next(data);
      });   
    });
  }
  public onEvent(event: String): Observable<IChatMessage> {
    //this.storage.set('sngshr_usertoken', data.sngshr_usertoken);
      return new Observable<IChatMessage>( (observer) => { 
          this.socket.on(event, (data: IChatMessage) => {
              observer.next(data);
          });   
      });
  }


}
