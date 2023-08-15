import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isAuthSubject:BehaviorSubject<any> = new BehaviorSubject<any>(false);
  public isAuth$: Observable<any> = this._isAuthSubject;

  constructor() { }
}
