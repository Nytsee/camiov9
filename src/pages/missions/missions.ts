
import { Component, ViewChild ,ElementRef } from '@angular/core';
import  $ from 'jquery';
import {TweenMax} from 'gsap';
import { MissionsProvider } from './../../providers/missions/missions';
import { IonicPage, NavController, NavParams,ToastController, Platform } from 'ionic-angular';
import { Detail } from '../../pages/detail/detail';
import { ActivatedRoute } from '@angular/router';

declare var google;
declare var offsetHeight;


/**
 * Generated class for the MissionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-missions',
  templateUrl: 'missions.html',
})
export class Missions {

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('currentHeader') thetopPart: ElementRef;

  missionsList = [];
  currentDate: string = new Date().toISOString();
  heightMapView : string;
  viewHeight: number;
  CurrentLat:any;
  CurrentLan:any;
  CurrentActiveOrder:any;
  Markers = [];
  map: any;



  constructor(
    private router: ActivatedRoute,
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public missionservice :MissionsProvider,
    private toastCtrl:ToastController) {
    this.getMissions();
  }

  IconMission:any = [
    ["pan_tool"],
    ["check_circle"],
    ["swap_calls"],
    ["flag"],
    ["publish"],
    ["directions_walk"],
    ["location_on"],
    ["thumb_up"]
  ];



  ionViewDidLoad() {
  }

  //declartation des foncion pour la map google

  ionViewDidEnter(){
    setTimeout(() => {
      if(this.CurrentActiveOrder){
        let ToConfirme = new Array();
        this.missionservice.setConfirmedMissions().subscribe((data)=>{
        if(data) {
          data.forEach(function (value) {
              if(value.status == 0){
              ToConfirme.push(value.id);
              }
          });
          if(ToConfirme.length > 0){
            this.missionservice.doConfirmMissions(ToConfirme)
            .subscribe(res => {
              this.getMissions();
              });
          }
        }else{
          this.presentToast("aucune mission enregistrer");
        }
      });
      }
    }, 500);
  }


  AdjustMapHeight(){
    this.viewHeight = this.thetopPart.nativeElement.offsetHeight
    if (this.platform.is('android')) {
      this.heightMapView = (document.documentElement.clientHeight-(this.viewHeight*2)+10) +"px";
    }
    if (this.platform.is('ios')) {
      this.heightMapView = (document.documentElement.clientHeight-(this.viewHeight*2)+15) +"px";
    }
  }



  getMissions(){
    this.router.params.subscribe((params) => {
      this.missionservice.getMissions()
      .then(messions => {
          console.log(messions);
          this.missionsList = messions;
        });
    });
    if(this.missionsList) {
      this.missionsList.sort((a,b) => {
        let orderA = (a.status < 4) ? a.infos_loading.location.time_start : a.infos_delivery.location.time_start ;
        let orderB = (b.status < 4) ? b.infos_loading.location.time_start : b.infos_delivery.location.time_start ;
        if (orderA > orderB){
          return 1;
        }
        if (orderA < orderB){
          return -1;
        }
        return 0;
      })


      this.CurrentActiveOrder = this.missionsList[0];
    }

  }



  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
  detail(id){
    //alert(this.CurrentActiveOrder.id)
    //console.log(id)
    this.navCtrl.push(Detail, {
      id_detail: id,
      id_activeOrder: this.CurrentActiveOrder.id
    });
  }



}
