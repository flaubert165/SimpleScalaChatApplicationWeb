import { Component } from '@angular/core';
import { RestService } from './services/rest.service';
import { MqttService, MqttMessage } from 'ngx-mqtt';
import { Subscription } from 'rxjs/Subscription';
import { OnInit, OnDestroy } from '@angular/core';
import { QuerySource } from './sources/query,source';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy{
  public messages: Observable<MqttMessage>;
  public chatSubscription: Subscription;
  public source:  any[] = new Array;
  public text: string;

  constructor(private mqttService: MqttService, private restService: RestService){

    this.chatSubscription = this.mqttService.observe('porra/test').subscribe((m: MqttMessage) => {
      this.source.push(m.payload.toString());
  });

    this.messages = this.mqttService.observe('porra/test');
  }
  
  public ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.chatSubscription.unsubscribe();
  }

  public sendText(topic: string, message: string): void {
    this.mqttService.unsafePublish('porra/test', this.text, {qos: 1, retain: true});
  }
}
