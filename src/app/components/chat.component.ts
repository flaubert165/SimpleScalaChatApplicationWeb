import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from "@angular/core";
//import {ChatDataType} from "../../chat.data.type";
import {MqttService} from "ngx-mqtt";
//import {SourceService} from "../../services/source.service";
//import {QuerySource} from "../../sources/query.source";
import {Subscription} from "rxjs/Subscription";
import {RestService} from "../services/rest.service";
import {Notifier} from "../notifier";
//import {RecorderService} from "../../services/recorder.service";
//import {StorageService} from "../../services/storage.service";
//import {AutoScrollDirective} from "../../directives/auto.scroll.directive";
//import {ImageModalComponent} from "../modals/image.modal.component";

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html'

})
export class ChatComponent implements OnInit, OnDestroy {

  //public ChatDataType = ChatDataType;

  //@ViewChild(AutoScrollDirective) autoScroll: AutoScrollDirective;
  @Output() public print: EventEmitter<void>;
  public text: string;
  //public source: QuerySource;

  public isRecording: boolean;

  private chatSubscription: Subscription;
  private lastSeenSubscription: Subscription;

  constructor(private mqttService: MqttService,//private sourceService: SourceService, 
             private restService: RestService,
             private notifier: Notifier) {
    this.text = null;
    //this.source = sourceService.createQuery('chat/data/query').start(30).reverse(true).itemCallBack(i => {
      //i.read = i.operator ? (this.chat.lastSeenMobile ? i.interactionTime <= this.chat.lastSeenMobile : false) : null;
    //});
    this.isRecording = false;
    this.print = new EventEmitter<void>();
  }

  public ngOnInit(): void {

    //this.source.filterWithData({ chatId: this.chat.id });

    this.chatSubscription = this.mqttService.observe(`chat/`).subscribe(m => {
      //this.source.data.push(Object.assign( {
        //read: null
      //}, JSON.parse(m.payload.toString())));
      //this.autoScroll.forceScrollDown();
    });
  }

  public ngOnDestroy(): void {
    this.chatSubscription.unsubscribe();
    this.lastSeenSubscription.unsubscribe();
  }

  /*private send(type: ChatDataType, data: string): void {
    let chatData = {
      type: type,
      data: data,
      operator: true,
      interactionTime: null
    };

    //this.source.data.push(Object.assign(chatData,{
      //read: false
    //}));

    //this.autoScroll.forceScrollDown();

    this.restService.post<number>("chat/send", Object.assign({
      //key: this.chat.chatKey,
      //chatId: this.chat.id
    }, chatData)).notifier(this.notifier, true).subscribe(d => chatData.interactionTime = new Date(d));
  }

  public sendText(): void {
    //if(this.text != null && this.text != ""){
      //this.send(ChatDataType.Text, this.text);
      this.text = "";
    //}
  }

  public doPrint(): void {
    this.print.emit();
  }*/
}
