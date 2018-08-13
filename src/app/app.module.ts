import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { Login } from '../pages/login/login';
import { Orders } from '../pages/orders/orders';
import { Detail } from '../pages/detail/detail';
import { Chat } from '../pages/chat/chat';



import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatMenuModule, MatFormFieldModule, MatInputModule, MatTabsModule } from '@angular/material';
import { AuthProvider } from '../providers/auth/auth';
import { MissionsProvider } from '../providers/missions/missions';

//Background Geo Position
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationTrackerProvider } from '../providers/location-tracker/location-tracker';
import { FCM } from '@ionic-native/fcm';

@NgModule({
  declarations: [
    MyApp,
    Login,
    Orders,
    Chat,
    Detail
  ],
  exports: [
    MatMenuModule
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatMenuModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatTabsModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{
      platforms:{
        ios:{
          scrollAssist: true,
          autoFocusAssist: true,
          scrollPadding: true,
          backButtonText: '',
          statusbarPadding: true
        }
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Login,
    Orders,
    Chat,
    Detail
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    MissionsProvider,
    BackgroundGeolocation,
    Geolocation,        
    LocationTrackerProvider,
    FCM
    
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule {}
