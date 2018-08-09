import {Injectable, NgZone} from '@angular/core';
import {BackgroundGeolocation, BackgroundGeolocationConfig} from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { MissionsProvider }  from '../missions/missions';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';




/*
  Generated class for the LocationTrackerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocationTrackerProvider {

  public watch: any;
  public lat: number = 0;
  public lng: number = 0; 

  constructor(
    public zone: NgZone,
    public backgroundGeolocation: BackgroundGeolocation,
    public geolocation: Geolocation,
    public missionService:MissionsProvider) {
    console.log('Hello LocationTrackerProvider Provider');
  }


  public startTracking(statusID,id_detail) {

    if((statusID==2  || statusID==4) && id_detail >0 ){
      let config : BackgroundGeolocationConfig = {
        desiredAccuracy: 100,
        stationaryRadius: 20,
        distanceFilter: 10,
        debug: true,
        interval: 2000
      };
  
      this.backgroundGeolocation.configure(config).subscribe((location) => {
  
        console.log('Background Geolocation:  ' + location.latitude + ',' + location.longitude);
  
        // Update inside of Angular's zone
        this.zone.run(() => {
          this.lat = location.latitude;
          this.lng = location.longitude;
          this.missionService.setLocation(id_detail,this.lat ,this.lng);
        });
      }, (err) => {
        console.log(err);
        }); //End Background Config and init 
  
      this.backgroundGeolocation.start();
  
      // Background tracking
      let options = {
        frequency: 300,
        enableHighAccuracy: true
      };
  
      this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {
        console.log("Watch position : "+position.coords.latitude +" / "+position.coords.longitude);
        
        this.zone.run(() => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          this.missionService.setLocation(id_detail,position.coords.latitude,position.coords.longitude);
          console.log("Zone Ng run position : "+position.coords.latitude +" / "+position.coords.longitude);
        });
  
       });
    }
      //End watch 
  } //End Start Tracking 



  public stopTracking() {
    console.log('stopTracking');
    //this.backgroundGeolocation.finish();
    if(this.watch){
      this.backgroundGeolocation.stop();
      this.watch.unsubscribe();
    }
    
    
  }







} //End Class 

