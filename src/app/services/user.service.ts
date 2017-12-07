import {Injectable} from "@angular/core";
//import {Permission} from "../permission";

@Injectable()
export class UserService {

  private _authorization: string;
  private _sessionKey: string;
  private _serviceKey: string;
  private _serviceId: number;
  private _fullName: string;
  private _imageProfile: string;
  private _serviceName: string;
  //private _permissions: Permission[];
  private _startSessionTime: Date;
  private _userId: number;
  private _moohadmin: boolean;


  get moohadmin(): boolean {
    return this._moohadmin;
  }

  get authorization(): string {
    return this._authorization;
  }

  get sessionKey(): string {
    return this._sessionKey;
  }

  get serviceKey(): string {
    return this._serviceKey;
  }

  get serviceId(): number {
    return this._serviceId;
  }

  get fullName(): string {
    return this._fullName;
  }

  get imageProfile(): string {
    return this._imageProfile;
  }

  get serviceName(): string {
    return this._serviceName;
  }

  get startSessionTime(): Date {
    return this._startSessionTime;
  }

  get userId(): number {
    return this._userId;
  }

  //public checkPermission(permission: Permission): boolean {
    //return this._permissions && this._permissions.some(p => p == permission);
  //}

  set serviceId(value: number) {
    this._serviceId = value;
  }

  set serviceKey(value: string) {
    this._serviceKey = value;
  }

  public load(data: any): void {
    this._authorization = data.authorization;
    this._userId = data.userId;
    this._fullName = data.fullName;
    //this._permissions = data.permissions;
    this._sessionKey = data.sessionKey;
    this._serviceKey = data.serviceKey;
    this._serviceId = data.serviceId;
    this._imageProfile = data.imageProfile;
    this._serviceName = data.serviceName;
    this._moohadmin = data.moohAdmin;
    this._startSessionTime = new Date(data.startSessionTime);
  }

  public setCenterAdmin(key: string, id: number): void{
    this._serviceKey = key;
    this._serviceId = id;
  }

  public clean(): void {
    this._authorization = null;
    this._userId = null;
    this._sessionKey = null;
    this._serviceKey = null;
    this._serviceId = null;
    this._fullName = null;
    this._imageProfile = null;
    this._serviceName = null;
    // this._permissions = null;
    this._startSessionTime = null;
  }
}
