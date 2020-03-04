import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsPageRoutingModule } from './tabs.router.module';
import {RealtimeService} from '../../wichtig/realtime.service';
import {StorageService} from '../../wichtig/storage.service';
import { TabsPage } from './tabs.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule
  ],
  declarations: [TabsPage],
  providers: [
    RealtimeService,
    StorageService,
  ]
})
export class TabsPageModule {}
