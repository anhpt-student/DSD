import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { ListProvider } from '../../providers/list/list';
import { Detail } from '../../providers/detail/detail-info';
import { DetailPage } from '../detail/detail';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  listTree: Array<Object>;
  constructor(public navCtrl: NavController, private listService: ListProvider) {
  }

  ngOnInit() {
    this.loadListTree();
  }

  public loadListTree(): Boolean {
    this.listTree = this.listService.getAllTreeDetail();
    if (this.listTree) {
      return true;
    }
    return false;
  }

  public goDetail(sequenceId: string) {
    if (sequenceId) {
      let item: Detail = this.listService.getDetail(sequenceId);
      if (item) {
        this.navCtrl.push(DetailPage, { itemDetail: item });
      } else {
        // this.alertService.alert("Không có thông tin");
      }
    } else {
      // this.alertService.alert("không nhận diện được ID");
    }
  }
}
