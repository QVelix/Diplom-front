import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SendlerService {
  private url = 'localhost:5054';

  constructor(private http: HttpClient) { }

  public get(url:string, value:any=null){
    if(value==null){
      return this.http.get(this.url+url).pipe(map(response=>{return response}));
    }else{
      return this.http.get(this.url+url, value).pipe(map(response=>{return response}));
    }
  }

  public post(url:string, value:any){
    return this.http.post(this.url+url, value, {withCredentials:true}).pipe(map(response=>{return response}));
  }

  public put(url:string, value:any):void{
    this.http.put(this.url+url, value, {withCredentials:true});
  }

  public delete(url:string, value:any):void{
    this.http.delete(this.url+url, value);
  }
}
