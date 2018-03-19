import { Component, ViewChild, } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Detail } from '../../providers/detail/detail-info';
import { Chart } from 'chart.js';
import { ElementRef } from '@angular/core';

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  treeDetail: Detail;
  daysOfTimeLine: Array<string>;
  waterIrrigatedOfTimeLine: Array<number>;
  doughnutChart: any;
  lineChart: any;
  daysToWork: number;
  averageWaterPerTime: number;
  situation: string;
  waterAmount: number;
  waterIrrigated: number;
  percentToDone: number;

  @ViewChild('doughnutCanvas') doughnutCanvas: ElementRef;
  @ViewChild('lineCanvas') lineCanvas: ElementRef;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.treeDetail = this.navParams.get("itemDetail");
  }

  ionViewDidLoad() {
    this.getBasicInfoOfTree();
    this.daysOfTimeLine = this.getDaysOfTimeLine(this.treeDetail.timeLine);
    this.waterIrrigatedOfTimeLine = this.getWaterIrrigatedOfTimeLine(this.treeDetail.timeLine);
    this.loadChart();
    console.log(this.treeDetail);
  }

  public loadChart(): void {
    // init doughnutChart
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ["Đã tưới", "Cần thêm"],
        datasets: [{
          label: '# of Votes',
          data: [75.6, 24.4],
          backgroundColor: [
            "#36A2EB",
            "#DDDDDD"
          ],
          hoverBackgroundColor: [
          ],
        }]
      }
    });
    // init lineChart
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.daysOfTimeLine,
        datasets: [
          {
            label: "Lượng nước đã tưới (ml)",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.waterIrrigatedOfTimeLine,
            spanGaps: true,
          }
        ]
      },
    });
  }

  public getDaysOfTimeLine(timeline: Array<Object>): Array<string> {
    let result = new Array<string>();
    let x: Object;
    for (x of timeline) {
      if (x) {
        let day: string = x["day"];
        day = day.slice(0, -5);
        result.push(day);
      }
    }
    return result;
  }

  public getWaterIrrigatedOfTimeLine(timeline: Array<Object>): Array<number> {
    let result = new Array<number>();
    let x: Object;
    for (x of timeline) {
      if (x) {
        result.push(parseFloat(x["waterIrrigated"]));
      }
    }
    return result;
  }

  public getAverageWaterIrrigatedPerTime(): number {
    let result: number;
    let sum: number = this.waterIrrigatedOfTimeLine.reduce((previous, current) => current += previous);
    result = sum / this.waterIrrigatedOfTimeLine.length;
    return result;
  }

  public getBasicInfoOfTree(): void{
    this.averageWaterPerTime = this.treeDetail.specification["AWPT"];
    this.daysToWork = this.treeDetail.specification["days"];
    this.waterAmount = this.treeDetail.specification["waterAmount"];
    this.waterIrrigated = this.treeDetail.specification["waterIrrigated"];
    this.situation = this.treeDetail.specification["situation"];
    this.percentToDone = this.treeDetail.specification["PTF"];
  }
}
