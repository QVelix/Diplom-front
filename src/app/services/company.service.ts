import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Company} from "../models/Company";
import {SendlerService} from "./sendler.service";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private _companiesSubject:BehaviorSubject<any> = new BehaviorSubject<Array<Company>>(null);
  public companies$:Observable<any> = this._companiesSubject.asObservable();

  constructor(private sendlerService: SendlerService) {
    this.sendlerService.get('/api/CompanyController').subscribe((companies:Array<Company>)=>{
      companies.forEach(company=>{
        this._companiesSubject.value.next(company);
      });
    });
  }

  getCompanyType(companyTypeID){
    let findedType;
    this.sendlerService.get('/api/CompanyTypeContoller').subscribe((companyTypes:Array<{ID:number, NAME:string}>)=>{
      companyTypes.forEach(type=>{
        if(type.ID==companyTypeID){
          findedType = type;
        }
      });
    });
    return findedType;
  }
}
