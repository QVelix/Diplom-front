import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {SendlerService} from "./sendler.service";
import {User} from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _defaultUsers:Array<User> = [{id:null,login:null,password:null,firstName:null,secondName:null,birthDate:null,userTypesId:null}]

  private _userSubject:BehaviorSubject<any> = new BehaviorSubject<User>(this._defaultUsers[0]);
  private _usersSubject:BehaviorSubject<any> = new BehaviorSubject<Array<User>>(this._defaultUsers);
  public user$:Observable<any> = this._userSubject.asObservable();
  public users$:Observable<any> = this._usersSubject.asObservable();

  constructor(private sendlerService: SendlerService) {
    sendlerService.get('/api/User').subscribe((users:Array<User>)=>{
      users.forEach(user=>{
        this._usersSubject.next(user);
      })
    });
  }


  public getAuthStatus():boolean{
    if(this._userSubject.value.login!=null){
      return true;
    }
    return false;
  }

  public getUserType(){
    let findedType = null;
    this.sendlerService.get('/api/UserType').subscribe((types:Array<{id:number, name:string}>)=>{
      types.forEach(type=>{
        if(this._userSubject.value.id == type.id){
          findedType = type;
        }
      })
    });
    return findedType;
  }

  public searchUser(search:string){
    let findedUser;
    this._usersSubject.forEach((user:User)=>{
      if(user.login.includes(search)||user.firstName.includes(search)||user.secondName.includes(search)||(user.firstName+" "+user.secondName).includes(search)){
        findedUser = user;
      }
    });
    return findedUser;
  }

  public addUser(user){
    this.sendlerService.put('/api/User', user);
    this._usersSubject.next(user);
  }

  public deleteUser(userId){
    this.sendlerService.delete('/api/User', userId);
    this._usersSubject.value.splice(this._usersSubject.value.findIndex(user=>user.ID==userId),1);
  }

  public changeUser(user) {
    this._usersSubject.value[this._usersSubject.value.findIndex(u => u.ID == user.ID)] = user;
  }

  public auth(login:string, password:string):boolean{
    let authUser = false;
    this._usersSubject.forEach(user=>{
      console.log(user);
      console.log(password);
      if(user.login==login && user.password==password){

        this._userSubject.next(user);
        authUser = true;
      }
    });
    console.log(authUser)
    return authUser;
  }

  public deAuth(){
    this._userSubject.value.setValue(this._defaultUsers[0]);
  }
}
