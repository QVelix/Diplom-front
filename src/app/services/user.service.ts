import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private defaultUser = {
    id: 3,
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

  public getUserType(){
    const random = Math.floor(Math.random()*2);
    switch (random) {
      case 0:
        return {'name': 'admin', 'id': 0};
        break;
      case 1:
        return {'name': 'manager', 'id': 1};
        break;
    }
  }
}
