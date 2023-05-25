import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private defaultUser = {
    login: 'admin',
    password: '12345678',
    firstname: 'Богачёв',
    secondname: 'Максим',
    lastname: 'Владиславович',
    phone: '89397052404',
    mail: 'max.bogachew@yandex.ru'
  };
  private _userSubject:BehaviorSubject<any> = new BehaviorSubject<any>(this.defaultUser);

  public user$:Observable<any> = this._userSubject.asObservable();

  constructor() { }
}
