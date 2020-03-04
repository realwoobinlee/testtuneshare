import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {serverurl,TOKEN} from './configHttp';
import {StorageService} from './storage.service';
import { Observable } from 'rxjs';
import {map, tap} from'rxjs/operators';
import {signin} from './models';
import { IChatMessage } from './realtime.service';

export interface login {
  username: string,
  userpassword: string
}

@Injectable({
  providedIn: 'root'
})
export class SignLogService {
  private header:HttpHeaders;
  constructor(
    private http: HttpClient
    ) {
      //{'Content-Type' : "application/json", "from": "app"}
    this.header = new HttpHeaders();
    this.header.set('Content-Type',"application/json")
    this.header.set('from', "web")
    this.header.set('Access-Control-Allow-Credentials', "true")
  }

  /*
  await this.singlogservice.getTokens_login('woobinlee','1234qwer').subscribe((data) => {
    console.log(data.headers.get('sngshr_usertoken'));
  })
  */
  public getTokens_login(usernameORuseremail: string, userpassword: string): Observable<any> {
    let isUsername = usernameORuseremail.includes('@') ? false : true;
    //let _1body: login = {username: _usernameORuseremail, userpassword: _password};
    let RequestBody = isUsername ?
      {username: usernameORuseremail, userpassword: userpassword} :
      {useremail: usernameORuseremail, userpassword: userpassword};
    return this.http.post(
      serverurl + "/user/login",
      RequestBody, 
      {headers: this.header,withCredentials: true, responseType: "json",observe: "response" }
    )
  }

  public getTokens_signin(): Observable<any> {
    return this.http.get(
      serverurl + "/user/refresh",
      {headers: this.header,withCredentials: true, responseType: "json",observe: "response" }
    )
  }

  public getMessages(): Observable<any> {
    return this.http.post(
      serverurl + "/chat/getmessages",
      {roomid: "5e4a72293b45c62b3c3d06da", number: 10},
      {headers:this.header, withCredentials: true,responseType: "json",observe: "response"},
    )
  }

}
