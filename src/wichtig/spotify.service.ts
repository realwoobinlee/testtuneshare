import { Injectable } from '@angular/core';
import {serverurl} from './configHttp';
import SpotifyWebApi from 'spotify-web-api-js';
import { promise } from 'protractor';

// ionic cordova plugin add cordova-spotify-oauth

declare var cordova: any;

interface tokendata {
  accessToken: String,
  encryptedRefreshToken: String,
  expiresAt: number
};

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private spotifyApi: any;
  private config = {
    clientId:'2bcdba49cd1b4edeb8950356343921af',
    redirectUrl: "songshare://callback",
    scopes:['user-read-recently-played', 'user-top-read', 'user-library-modify',
            'user-library-read', 'playlist-read-private', 'playlist-modify-public',
            'playlist-modify-private', 'playlist-read-collaborative','user-read-playback-state',
            'user-modify-playback-state', 'user-read-currently-playing','streaming',
            'user-follow-read', 'user-follow-modify'],
    tokenExchangeUrl: serverurl + '/spotify_initial',
    tokenRefreshUrl: serverurl + '/spotify_refresh'
  };
  private clientId = this.config.clientId;
  private accessToken: String;
  public playing: boolean = false;
  public paused: boolean = true;

  constructor() {
    this.spotifyApi = new SpotifyWebApi();
  }
  
  public authorize(){
      //return new Promise((resolve) => {
        cordova.plugins.spotifyAuth.authorize(this.config).then((data) => {
          console.log(data);
          
        })
      //});
  }

  // artist:Love just artist     'Love' Artist or name or album
  public searchTracks(query: String) {
    return new Promise((resolve) => {
      this.spotifyApi.searchTracks(query)
      .then(function(data) {
        console.log('Search by', query, data);
        return resolve(data);
      });
    })
  }

  //After Auth it has to be done in order to 
  //enable playback
  private _setToken_for_Api(data) {
    this.accessToken = data.accessToken;
    this.spotifyApi.setAccessToken(this.accessToken);
    console.log(
      "Api is initialized/ repeatedly renewed:",
      this.accessToken );
  }

  public play(item) {
    // item.track.uri => ------
    cordova.plugins.spotify.play(item.track.uri, {
      clientId: this.clientId,
      token: this.accessToken
    })
      .then(() => {
        this.playing = true;
        this.paused = false;
      })
  }

  public pause() {
    cordova.plugins.spotify.pause()
      .then(() => {
        this.playing = false;
        this.paused = true;
      })
  }

  public resume() {
    cordova.plugins.spotify.resume()
      .then(()=> {
        this.playing = true;
        this.paused = false;
      })
  }
}
