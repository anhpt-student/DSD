import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NavController, Platform, AlertController } from 'ionic-angular';
import { GoogleMapProvider } from '../../providers/google-map/google-map';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker
} from '@ionic-native/google-maps';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements AfterViewInit {
  map: GoogleMap;
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('button') buttonElm: ElementRef;


  constructor(
    public navCtrl: NavController,
    public elementRef: ElementRef,
    private mapService: GoogleMapProvider,
    private alertCtrl: AlertController,
    private platform: Platform
  ) {

  }
  ngAfterViewInit() {

  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      setTimeout(() => {
        this.initMap();
        this.initEvents();
      }, 500);
    });
  }

  public initMap(): void {
    this.mapService.initMap(this.mapElement, this.map);
  }

  public initEvents(): void {
    let markers: Array<Marker> = this.mapService.getAllMarker();
    let button: HTMLElement = this.buttonElm.nativeElement;
    button.addEventListener('click', (data) => {
      console.log("dmm");
      this.mapService.getCurrentLocation(this.map);
    });
  }

}
