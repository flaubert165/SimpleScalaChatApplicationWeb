import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import { AppComponent } from './app.component';
import { MqttService, MqttModule } from 'ngx-mqtt';
import { environment } from '../environments/environment';
import { RestService } from './services/rest.service';
import { HttpModule } from '@angular/http';
import { TranslateService, TranslateLoader } from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { TranslateModule } from '@ngx-translate/core';
import { UserService } from './services/user.service';
import { CommonModule } from '@angular/common/';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export function translateHttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, `${document.getElementsByTagName('base')[0].href}assets/i18n/`);
}

export function mqttServiceFactory(): MqttService {
  return new MqttService({
    hostname: environment.mqtt.hostname,
    port: environment.mqtt.port,
    path : environment.mqtt.path,
    protocol: <'wss' | 'ws'> environment.mqtt.protocol
  });
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    BrowserModule,
    MqttModule.forRoot({
      provide: MqttService,
      useFactory: mqttServiceFactory
    }),
    HttpModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateHttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: 
  [
    RestService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private translate: TranslateService) {
    translate.addLangs(["en", "pt"]);
    translate.setDefaultLang("pt");
    let browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|pt/) ? browserLang : "en");
  }
 }
