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
    this.sendlerService.get('/api/Company').subscribe((companies:Array<Company>)=>{
      companies.forEach(company=>{
        this._companiesSubject.value.next(company);
      });
    });
  }

  getCompanyType(companyTypeID){
    let findedType;
    this.sendlerService.get('/api/CompanyType').subscribe((companyTypes:Array<{ID:number, NAME:string}>)=>{
      companyTypes.forEach(type=>{
        if(type.ID==companyTypeID){
          findedType = type;
        }
      });
    });
    return findedType;
  }

  public getCompanies(){
    return this._companiesSubject.value;
  }

  public deleteCompany(id){
    this.sendlerService.delete('/api/Company/'+id).subscribe(result=>console.log(result));
    this._companiesSubject.value.splice(this._companiesSubject.value.findIndex(company=>company.id==id),1);
  }

  public changeCompany(company){
    this.sendlerService.put('/api/Company/'+company.id, company).subscribe(result=>{console.log(result)});
    this._companiesSubject.value[this._companiesSubject.value.findIndex(comp=>comp.id==company.id)] = company;
  }

  public addCompany(company){
    this.sendlerService.put('/api/Company/', company).subscribe(result=>console.log(result));
    this._companiesSubject.next(company);
  }
}
