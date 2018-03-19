import { HttpClient } from '@angular/common/http';
import { Injectable, ElementRef } from '@angular/core';
import { DetailProvider } from '../detail/detail';
import { MARKER_DATA } from './marker';
import { ModalController } from 'ionic-angular';
import { ModalPage } from '../../pages/modal/modal';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  Marker
} from '@ionic-native/google-maps';
/*
  Generated class for the GoogleMapProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GoogleMapProvider {

  constructor(public http: HttpClient, public detailService: DetailProvider, private modalCtrl: ModalController) {
  }

  public initMap(htmlElement: ElementRef, map: GoogleMap) {
    this.loadMap(htmlElement, map);
  }

  private loadMap(htmlElement: ElementRef, map: GoogleMap): Promise<any> {
    return new Promise((resolve) => {
      let mapOptions: GoogleMapOptions = {
        camera: {
          target: {
            lat: 21.006560,
            lng: 105.843626
          },
          zoom: 17,
        }
      };
      let map = GoogleMaps.create(htmlElement.nativeElement, mapOptions);
      let locationArr: Array<Object> = this.detailService.getAllCoordinate();
      let waterCoordinates: Array<Object> = this.detailService.getAllCoordinateWater();
      this.initMarker(map, locationArr, waterCoordinates);
    });
  }

  private initMarker(map: GoogleMap, coordinatesArr: Array<Object>, waterCoordinates: Array<Object>) {
    let tree: Object;
    let water: Object
    map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        //add tree maker
        for (tree of coordinatesArr) {
          map.addMarker({
            title: tree["id"].toString(),
            icon: {
              url: 'assets/icon/tree-icon.png',
              size: {
                width: 45,
                height: 45
              }
            },
            animation: 'DROP',
            position: tree["latLng"],
          }).then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                let profileModal = this.modalCtrl.create(ModalPage, { userId: 8675309 });
                profileModal.present();
              });
          });
        }
        //add water marker
        for (water of waterCoordinates) {
          map.addMarker({
            title: water["id"].toString(),
            icon: {
              url: 'assets/icon/water-icon.png',
              size: {
                width: 30,
                height: 30
              }
            },
            animation: 'DROP',
            position: water["latLng"],
          }).then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
              });
          });
        }


      });
  }

  public getCurrentLocation(map: GoogleMap) {
    // map.getMyLocation().then((location) => {
    //   let alert = this.alertCtrl.create({
    //     title: 'test',
    //     subTitle: JSON.stringify(location),
    //     buttons: ['Dismiss']
    //   });
    //   alert.present();
    // });
  }

  public setMarker(marker: Marker): void {
    MARKER_DATA.push(marker);
  }

  public getAllMarker(): Array<Marker> {
    return MARKER_DATA;
  }
}
