import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private defaultUsers = [
    {
      id: 0,
      login: 'admin',
      password: 'Maks2343',
      firstname: 'Богачёв',
      secondname: 'Максим',
      lastname: 'Владиславович',
      work_phone: '89397052404',
      personal_phone: '89023678122',
      mail: 'max.bogachew@yandex.ru',
      birthdate: '12/19/2002'
    },
    {
      id: 1,
      login: 'pochtiAdmin',
      password: '12345678',
      firstname: 'Соловьев',
      secondname: 'Алексей',
      lastname: 'Сергеевич',
      work_phone: '89023678122',
      personal_phone: '89397052404',
      mail: 'sas@solo-it.ru',
      birthdate: '12/19/2002'
    },
    {
      id: 2,
      login: 'manager',
      password: '12345678',
      firstname: 'Юсупов',
      secondname: 'Султан',
      lastname: 'Какой-тович',
      work_phone: '89397052404',
      personal_phone: '89023678122',
      mail: 'm.usupov@solo-it.ru',
      birthdate: '12/19/2002'
    }
  ];
  private _userSubject:BehaviorSubject<any> = new BehaviorSubject<any>(this.defaultUsers[0]);
  private _usersSubject:BehaviorSubject<any> = new BehaviorSubject<any>(this.defaultUsers);
  public user$:Observable<any> = this._userSubject.asObservable();
  public users$:Observable<any> = this._usersSubject.asObservable();

  constructor() { }

  public getAuthStatus():boolean{
    if(this._userSubject.value!=null){
      return true;
    }
    return false;
  }

  public getUserType():Object{
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

  public auth(login:string, password:string):boolean{
    let authUser = false;
    this.defaultUsers.forEach(user=>{
      if(user.login==login && user.password==password){
        this._userSubject.next(user);
        authUser = true;
      }
    });
    return authUser;
  }

  public deAuth(){
    this._userSubject.next(null);
  }
}
