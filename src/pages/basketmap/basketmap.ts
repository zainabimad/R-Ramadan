import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import {ViewChild,ElementRef} from '@angular/core';

import {Locations} from '../../model/locations';
import{AngularFireDatabase,AngularFireList} from 'angularfire2/database';
import{Observable} from 'rxjs';


declare let google:any

/**
 * Generated class for the BasketmapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-basketmap',
  templateUrl: 'basketmap.html',
})
export class BasketmapPage {
  @ViewChild('map') mapElement:ElementRef
  map:any
  itemList:AngularFireList<any>
  itemArray=[]

  constructor(public navCtrl: NavController, public navParams: NavParams,public db:AngularFireDatabase,
  alertctrl:AlertController) {
    this.itemList=db.list('giftmap')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BasketmapPage');
    this.loadmap()
  }

loadmap(){
  let LatLng= new google.maps.LatLng(33.2232,43.6793);
  let mapOptions={
    center:LatLng,
    zoom:6,
    mapTypeId:google.maps.MapTypeId.ROADMAP

  }
this.map= new google.maps.Map(this.mapElement.nativeElement,mapOptions);
 let infowindow= new google.maps.InfoWindow();
let marker ,i ;


this.itemList.snapshotChanges().subscribe(actions=>{
  actions.forEach(action=>{
    let y=action.payload.toJSON()
    y['key']=action.key
    this.itemArray.push(y as Locations)
  })

for (const value of this.itemArray) {
  let marker= new google.maps.Marker({
    position:new google.maps.LatLng(value['latitude'],value['longitude']),
    map:this.map
  });
  marker.info= new google.maps.InfoWindow({
    content:value['info']
  })
  google.maps.events.addListener(marker,'click',function(){
    let marker_map=this.getMap();
    this.info.open(marker_map,this)
    alert(this.info.content)
  });
}





})


}





}
