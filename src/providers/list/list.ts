import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DetailProvider } from '../detail/detail';
import { Detail } from '../detail/detail-info';

/*
  Generated class for the ListProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ListProvider {

  constructor(public http: HttpClient, private detailService: DetailProvider) {
  }

  public getAllTreeDetail(): Array<Object> {
    let result = new Array<Object>();
    result = this.detailService.getAllBasicInfo();
    return result;
  }

  public getDetail(sequenceId: string): Detail {
    let result: Detail = this.detailService.getDetailItemBySequenceId(sequenceId);
    return result;
  }

}
