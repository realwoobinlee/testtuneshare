import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import {MusicKitService} from '../../wichtig/music-kit.service';
import {HttpClientModule} from '@angular/common/http';
import {SpotifyService} from 'src/wichtig/spotify.service';
import {StorageService} from '../../wichtig/storage.service';
import { SignLogService } from 'src/wichtig/sign-log.service';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }])
  ],
  providers: [
    MusicKitService,
    SpotifyService,
    StorageService,
    SignLogService
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
