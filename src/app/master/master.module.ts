import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MasterPage } from './master.page';
import {StorageService} from '../../wichtig/storage.service';

const routes: Routes = [
  {
    path: '',
    component: MasterPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MasterPage],
  providers: [
    StorageService
  ]
})
export class MasterPageModule {}
