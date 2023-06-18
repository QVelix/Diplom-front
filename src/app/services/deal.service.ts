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
    this.sendlerService.get('/api/Deal').subscribe((deals:Array<Deal>)=>{
      deals.forEach(contact=>{
        this._dealsSubject.value.next(contact);
      });
      console.log(deals);
    });
  }

  public deleteDeal(id){
    this.sendlerService.delete('/api/Deal/' + id).subscribe(response=>{console.log(response);});
    this._dealsSubject.value.splice(this.findIndex(id),1);
  }

  public addDeal(deal){
    this.sendlerService.post('/api/Deal/', deal).subscribe(result=>{
      console.log(result);
    });
    this._dealsSubject.next(deal);
  }

  public changeDeal(deal){
    this._dealsSubject.value[this.findIndex(deal.id)] = deal;
    this.sendlerService.put('/api/Deal/'+deal.id, deal).subscribe(result=>{
      console.log(result);
    });
  }

  private findIndex(id){
    let index = 0;
    let findedIndex = 0;
    this._dealsSubject.forEach(deal=>{
      console.log(deal.id+' '+id);
      if(deal.id == id){

        findedIndex = index;
      }
      index+=1;
    });
    console.log(findedIndex);
    return findedIndex;
  }
}
