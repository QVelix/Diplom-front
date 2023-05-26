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
    work_phone: '89397052404',
    personal_phone: '89023678122',
    mail: 'max.bogachew@yandex.ru',
    birthdate: '12/19/2002'
  };
  private _userSubject:BehaviorSubject<any> = new BehaviorSubject<any>(this.defaultUser);

  public user$:Observable<any> = this._userSubject.asObservable();

  constructor() { }

  public getAuthStatus(){
    if(this._userSubject.value!=null){
      return true;
    }
    return false;
  }
}
