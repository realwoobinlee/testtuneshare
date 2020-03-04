import { Component } from '@angular/core';
import {SignLogService} from '../../wichtig/sign-log.service';
import { Router } from '@angular/router';
import {StorageService} from '../../wichtig/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  private tokens;
  private usernameoruseremail;
  private password;

  constructor(
    private singlogservice: SignLogService,
    private router: Router) {
    }

  async login() {
    await this.singlogservice.getTokens_login(this.usernameoruseremail,this.password)
      .subscribe((data) => {
        console.log(data.headers.get('sngshr_usertoken'));
        this.router.navigateByUrl('/tabs');
      })
  }

}
