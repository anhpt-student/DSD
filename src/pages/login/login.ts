import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { LoginProvider } from '../../providers/login/login';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username: String;
  password: String;
  platform: any;
  constructor(platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private loginService: LoginProvider) {
    this.username = "";
    this.password = "";
    this.platform = platform;
  }

  ionViewDidLoad() {
  }

  doLogin() {
    let result: Boolean = this.loginService.doLogin(this.username, this.password);
    if (result) {
      setTimeout(() => { this.navCtrl.push(TabsPage) }, 500);
    } else {
      let confirm = this.alertCtrl.create({
        title: 'Thông báo',
        message: 'Somethings wrong, Please check your account!!',
        buttons: [
          {
            text: 'OK',
            handler: () => {
              this.platform.exitApp();
            }
          },
        ]
      });
      confirm.present();
    }
  }

}
