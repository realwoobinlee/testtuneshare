import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { headersToString } from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class GoserverService {

  constructor(private Http: HttpClient) { 

  }

  signout(): Observable<any> {
    let header = new HttpHeaders({
      'From':'web'
    })

    return this.Http.post("http://h2838507.stratoserver.net:8000/signout",{userid:"woobinleefinal1",password:"hallochen!12",gender:"m",fname:"lee",name:"woobin",birthdate:"01.11.1997",email:"leewoobinfinal1@gmail.com",telephone:"12340012",address:"lksahdgkl",postalcode:"44263",city:"dortmund",country:"DE",nationality:"DE"},
    {headers:header, withCredentials: true})
  }

  test(): Observable<any> {
    let header = new HttpHeaders({
      'From':'web'
    })
    return this.Http.get("http://h2838507.stratoserver.net:8000/test",
    {headers:header, withCredentials: true})
  }
}
