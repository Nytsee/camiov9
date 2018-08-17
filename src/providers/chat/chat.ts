import { Injectable } from '@angular/core';
import { Http ,Response ,URLSearchParams} from '@angular/http';
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
/*
  Generated class for the ChatProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class ChatProvider {

  constructor(public http: Http, public loadingCtrl: LoadingController) {
  }


  getApiUrl : string =  'https://api.freterium.com/apiweb/beta/';

  getUserDiscussions(){
    //+localStorage.getItem('id')
    return  this.http.get(this.getApiUrl+'messages?user_id=63')
            .map((data : Response ) => data.json())
            .do((res : Response ) => console.log(''))
           ;

  }



}
