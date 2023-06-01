import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {SendlerService} from "./sendler.service";
import {User} from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _userSubject:BehaviorSubject<any> = new BehaviorSubject<User>(null);
  private _usersSubject:BehaviorSubject<any> = new BehaviorSubject<Array<User>>(null);
  public user$:Observable<any> = this._userSubject.asObservable();
  public users$:Observable<any> = this._usersSubject.asObservable();

  constructor(private sendlerService: SendlerService) {
    sendlerService.get('/api/UsersController').subscribe((users:Array<User>)=>{
      users.forEach(user=>{
        this._usersSubject.value.next(user);
      })
    });
  }


  public getAuthStatus():boolean{
    if(this._userSubject.value!=null){
      return true;
    }
    return false;
  }

  public getUserType(){
    let findedType = null;
    this.sendlerService.get('/api/UserTypeContoller').subscribe((types:Array<{ID:number, Name:string}>)=>{
      types.forEach(type=>{
        if(this._userSubject.value.ID == type.ID){
          findedType = type;
        }
      })
    });
    return findedType;
  }

  public searchUser(search:string){
    let findedUser;
    this._usersSubject.value.forEach((user:User)=>{
      if(user.Login.includes(search)||user.First_name.includes(search)||user.Second_name.includes(search)||(user.First_name+" "+user.Second_name).includes(search)){
        findedUser = user;
      }
    });
    return findedUser;
  }

  public addUser(user){
    this.sendlerService.put('/api/UsersController', user);
    this._usersSubject.value.next(user);
  }

  public deleteUser(userId){
    this.sendlerService.delete('/api/UsersController', userId);
    this._usersSubject.value.splice(this._usersSubject.value.findIndex(user=>user.ID==userId),1);
  }

  public changeUser(user) {
    this._usersSubject.value[this._usersSubject.value.findIndex(u => u.ID == user.ID)] = user;
  }

  public auth(login:string, password:string):boolean{
    let authUser = false;
    this._usersSubject.value.forEach(user=>{
      if(user.Login==login && user.Password==password){
        this._userSubject.next(user);
        authUser = true;
      }
    });
    return authUser;
  }

  public deAuth(){
    this._userSubject.value.splice(0);
  }
}
