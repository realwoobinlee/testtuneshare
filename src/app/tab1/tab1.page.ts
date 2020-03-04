import { Component } from '@angular/core';
//import {MusicKitService} from '../../wichtig/music-kit.service';
//import {SpotifyService} from '../../wichtig/spotify.service';
import {serverurl} from '../../wichtig/configHttp';
import { GoserverService } from 'src/wichtig/goserver.service';
import {SpotifyService} from "src/wichtig/spotify.service"
import { SignLogService } from 'src/wichtig/sign-log.service';
//import {StorageService} from '../../wichtig/storage.service';

declare var cordova:any;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  private username : string
  private userpassword : string
  private config = {
    clientId:'2bcdba49cd1b4edeb8950356343921af',
    redirectUrl: "songshare://callback",
    scopes:['user-read-recently-played', 'user-top-read', 'user-library-modify',
            'user-library-read', 'playlist-read-private', 'playlist-modify-public',
            'playlist-modify-private', 'playlist-read-collaborative','user-read-playback-state',
            'user-modify-playback-state', 'user-read-currently-playing','streaming',
            'user-follow-read', 'user-follow-modify'],
    tokenExchangeUrl: serverurl + '/spotify_exchange',
    tokenRefreshUrl: serverurl + '/spotify_refresh'
  };
  result;
  message;
  music;
  devtoken;
  spauthadress;
  socket;
  state = "play";
  isplaying = false;
  spservice: SpotifyService
  constructor(/*private mkservice: MusicKitService,
              private spservice: SpotifyService,*/
              private goserver: GoserverService,
              private signlog: SignLogService) {
                this.spservice = new SpotifyService()
    //this.socket = io("http://localhost:8080");
    //this._init();
    //this.test()
    this.goserver.test().subscribe((data) => {
      console.log(data)
    })
  }
  authorizesp() {
    this.spservice.authorize();
  }
  /*
  ionViewDidEnter() {
    //window.open = cordova.plugins.InAppbrowser.open;
    this.test();
  }

  sendvalue(){
    this.socket.emit("sendMessage",{recipient: 'woobinlee', message:"hallo"});
  }

  async _init() {
    await this.mkservice.getDevToken().subscribe(value => {
      this.devtoken = value['musickit_devtoken'];
      console.log(value);
      this.mkservice.configure(this.devtoken);
    });
  }
  
  authorizesp() {
    this.spservice.authorize();
  }
  
  
  authorize() {
    console.log("auth mk");
    this.mkservice.authorize();
    //window.open = cordova.plugins.InAppbrowser.open;
    //cordova.plugins.InAppbrowser.open(window.location.href, '_self');
  }

  _onRefresh() {
    this.socket.on('refreshed',(data) => {
      console.log(data);
    });
  }
  async play() {
    let isplaying = await this.mkservice.isPlaying();
    
    if(await isplaying  === false) {
      await this.mkservice.playSong('1450688901');
      this.state = 'Pause';
    } else {
      await this.mkservice.pause();
      this.state = 'play';
    }
  }

  async playsp() {
    this.spservice.searchTracks('Love').then((data)=> {
      this.result = data;
    })
  }
  
  async search() {
    this.music = await this.mkservice.getMusicKit();
    let data = await this.music.api.search('black pink');
    await console.log(data);
   
  }
  */
 authorize() {
  console.log(this.username)
  this.signlog.getTokens_login(this.username,this.userpassword).subscribe((data) => {
    console.log(data)
  })
 }
 play() {
  this.signlog.getTokens_signin().subscribe((data) => {
    console.log(data)
  })
 }
  test() {
    this.goserver.signout().subscribe(data => {
      console.log(data)
    })
  }
}
