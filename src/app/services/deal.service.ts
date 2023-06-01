import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {SendlerService} from "./sendler.service";
import {Deal} from "../models/Deal";

@Injectable({
  providedIn: 'root'
})
export class DealService {
  private _dealsSubject:BehaviorSubject<any> = new BehaviorSubject<Array<Deal>>(null);
  public deals$:Observable<any> = this._dealsSubject.asObservable();

  constructor(private sendlerService: SendlerService) {
    this.sendlerService.get('/api/DealController').subscribe((deals:Array<Deal>)=>{
      deals.forEach(contact=>{
        this._dealsSubject.value.next(contact);
      });
    });
  }
}
