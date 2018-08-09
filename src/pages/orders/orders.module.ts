import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Orders } from './orders';

@NgModule({
  declarations: [
    Orders,
  ],
  imports: [
    IonicPageModule.forChild(Orders),
  ],
})
export class OrdersPageModule {}
