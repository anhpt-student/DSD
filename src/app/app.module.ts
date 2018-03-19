import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from "@angular/common/http";

import { ListPage } from '../pages/list/list';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { AboutPage } from '../pages/about/about';
import { ModalPage } from '../pages/modal/modal'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginProvider } from '../providers/login/login';
import { HttpService } from '../providers/http/http';
import { DetailPage } from '../pages/detail/detail';
import { ListProvider } from '../providers/list/list';
import { DetailProvider } from '../providers/detail/detail';
import { GoogleMapProvider } from '../providers/google-map/google-map';

@NgModule({
  declarations: [
    MyApp,
    ListPage,
    ContactPage,
    AboutPage,
    HomePage,
    TabsPage,
    LoginPage,
    DetailPage,
    ModalPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListPage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    DetailPage,
    ModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    LoginProvider,
    HttpService,
    ListProvider,
    DetailProvider,
    GoogleMapProvider
  ]
})
export class AppModule { }
