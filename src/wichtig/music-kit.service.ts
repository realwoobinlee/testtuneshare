import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { from } from 'rxjs';
import {serverurl} from './configHttp';

declare var MusicKit: any;
declare var cordova: any;

@Injectable({
  providedIn: 'root'
})
export class MusicKitService {
  devtoken;
  musickit;
  public isAuthorized = false;
  searchedData: Object;

  private url = serverurl + "/musickit_token";
  private header:HttpHeaders;
  constructor(
              private http: HttpClient,
             ) {
    this.header = new HttpHeaders({'Content-Type' : "application/x-www-form-urlencoded"});
  }
 
  getDevToken() {
    return this.http.get(this.url, {headers: this.header});
  }
  
  configure(_token) {
    MusicKit.configure({
      developerToken: _token,
      app : {
        name: 'Songshare',
        build: '2019.5.11'
      }
    });
    this.musickit = MusicKit.getInstance();
    this.musickit.addEventListener( MusicKit.Events.authorizationStatusDidChange, this.authorizationStatusDidChange.bind(this) );
    this.isAuthorized = this.musickit.isAuthorized;
  }

  authorize(): void {
    from( this.musickit.authorize()).subscribe(() => {
      this.isAuthorized = true;
    });
  }

  unauthorize(): void {
    from( this.musickit.unauthorize()).subscribe(() => {
      this.isAuthorized = false;
    });
  }

  authorizationStatusDidChange(event): void {
    this.isAuthorized = event.authorizationStatus;
    // if ( this.isAuthorized ) {
    //   location.reload();
    // }
  }


  addAuthChangeListener( func ) {
    this.musickit.addEventListener( MusicKit.Events.authorizationStatusDidChange, func );
  }

  getMusicKit() {
    return this.musickit;
  }

  async isPlaying() {
    return await this.musickit.player.isPlaying;
  }

  async playSong(id: string) {
    console.log("play()");
    await this.musickit.setQueue({ song: id }).then(function(queue) {
    // Queue is instantiated and set on music player.
    });
    await this.musickit.play();
  }

  pause() {
    this.musickit.pause();
  }
  stop() {
    this.musickit.stop();
  }

  async search(searchtext: string) {
    this.searchedData = null;
    this.searchedData = await this.musickit.api.search(searchtext);
    await console.log(this.searchedData);
  }

}
