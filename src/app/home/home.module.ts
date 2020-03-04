import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import {HomePageRoutingModule} from './home-routing.module';

import {SignLogService} from '../../wichtig/sign-log.service';
import {StorageService} from '../../wichtig/storage.service';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage],
  providers: [
    SignLogService,
    StorageService
  ]
})
export class HomePageModule {}
