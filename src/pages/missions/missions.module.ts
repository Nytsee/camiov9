import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Missions } from './missions';

@NgModule({
  declarations: [
    Missions,
  ],
  imports: [
    IonicPageModule.forChild(Missions),
  ],
})
export class MissionsPageModule {}
