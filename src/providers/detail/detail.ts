import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DETAIL_DATA, WATERTAP_DATA } from './detail-data';
import { Detail } from './detail-info';
import { LatLng } from '@ionic-native/google-maps';
/*
  Generated class for the DetailProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DetailProvider {

  constructor(public http: HttpClient) {
    console.log('Hello DetailProvider Provider');
  }

  public getDetailItemBySequenceId(sequenceId: string): Detail {
    let item: Detail;
    for (item of DETAIL_DATA) {
      if (sequenceId == item.sequenceId) {
        return item;
      }
    }
    return item;
  }

  public setDetailItem(item: Detail): void {
    DETAIL_DATA.push(item);
  }

  public getAllBasicInfo(): Array<Object> {
    let result = new Array<Object>();
    let item: Detail;
    for (item of DETAIL_DATA) {
      let object: Object;
      object = { sequenceId: item.sequenceId, location: item.location, listWorker: item.listWorker }
      result.push(object);
    }
    return result;
  }
  public getCoordinateById(id: string): LatLng {
    let item: Detail;
    for (item of DETAIL_DATA) {
      if (item) {
        if (item.sequenceId == id) {
          return new LatLng(item.coordinates[0], item.coordinates[1]);
        }
      }
    }
    return null;
  }

  public getAllCoordinate(): Array<Object> {
    let result: Array<Object> = new Array<Object>();
    let item: Detail;
    for (item of DETAIL_DATA) {
      if (item) {
        result.push({
          id: item.sequenceId,
          latLng: new LatLng(item.coordinates["lat"], item.coordinates["lng"])
        });
      }
    }
    return result;
  }


  public getAllCoordinateWater(): Array<Object>{
    let result: Array<Object> = new Array<Object>();
    let item: any;
    for (item of WATERTAP_DATA) {
      if (item) {
        result.push({
          id: item.sequenceId,
          latLng: new LatLng(item.coordinates["lat"], item.coordinates["lng"])
        });
      }
    }
    return result;
  }
}


