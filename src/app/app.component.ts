import { Component } from '@angular/core';
import { Platform,ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Login } from '../pages/login/login';
import { Orders } from '../pages/orders/orders';
import { FCM } from '@ionic-native/fcm';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage;

  constructor(platform: Platform,private toastCtrl: ToastController, statusBar: StatusBar, splashScreen: SplashScreen,private fcm: FCM) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      statusBar.overlaysWebView(true);
      statusBar.backgroundColorByHexString('#139CD3');
      splashScreen.hide();
      if (platform.is('android')) {
        this.fcm.subscribeToTopic(localStorage.getItem('id'));

        //this.fcm.getToken().then(token => {
          //alert(token)
        //});

        this.fcm.onNotification().subscribe(data => {
          if(data.wasTapped){
            console.log("Received in background");
            this.presentToast(JSON.stringify(data))
          } else {
            console.log("Received in foreground");
            this.presentToast(JSON.stringify(data))
          };
        });
    };

      if(localStorage.getItem('id')){
        this.rootPage = Orders;
      }else{
        this.rootPage = Login;
      }
    });
  }
  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
}


