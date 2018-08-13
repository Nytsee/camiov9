import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Login } from '../pages/login/login';
import { Chat } from '../pages/chat/chat';
import { Orders } from '../pages/orders/orders';
declare var FCMPlugin;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      if(typeof(FCMPlugin) != 'undefined') {
        FCMPlugin.onTokenRefresh(function(token){
            alert( token );
        });
        FCMPlugin.getToken(function(token){
            alert(token);
        });
        if(localStorage.getItem('id')){
          FCMPlugin.subscribeToTopic(localStorage.getItem('id'));
        }
        FCMPlugin.onNotification(function(data){
            if(data.wasTapped){
              //Notification was received on device tray and tapped by the user.
              alert( JSON.stringify(data.title) );
            }else{
              //Notification was received in foreground. Maybe the user needs to be notified.
              alert( JSON.stringify(data) );
            }
        });
      }
      statusBar.overlaysWebView(false);
      statusBar.backgroundColorByHexString('#139CD3');
      splashScreen.hide();
      if(localStorage.getItem('id')){
        this.rootPage = Orders;          
      }else{
        this.rootPage = Login;
      }
    });
  }
}


