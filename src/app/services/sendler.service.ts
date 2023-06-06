import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SendlerService {
  private url = 'https://hleb-development.space';
  private headers = new HttpHeaders();

  constructor(private http: HttpClient) { }

  public get(url:string, value:any=null){
    this.headers.append('Accept', 'application/json');
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', '*');
    this.headers.append("Access-Control-Allow-Headers", "X-Requested-With");
    this.headers.append("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE");
    if(value==null){
      return this.http.get(this.url+url, {headers:this.headers})
        .pipe(map(response=>{return response}));
    }else{
      return this.http.get(this.url+url, value).pipe(map(response=>{return response}));
    }
  }

  public post(url:string, value:any){
    this.headers.append('Accept', 'application/json');
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', '*');
    this.headers.append("Access-Control-Allow-Headers", "X-Requested-With");
    this.headers.append("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE");
    return this.http.post(this.url+url, value, {withCredentials:true, headers:this.headers}).pipe(map(response=>{return response}));
  }

  public put(url:string, value:any){
    this.headers.append('Accept', 'application/json');
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', '*');
    this.headers.append("Access-Control-Allow-Headers", "X-Requested-With");
    this.headers.append("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE");
    return this.http.put(this.url+url, value, {headers:this.headers}).pipe(map(response=>{return response;}));
  }

  public delete(url:string){
    this.headers.append('Accept', 'application/json');
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', '*');
    // this.headers.append("Access-Control-Allow-Headers", "X-Requested-With");
    this.headers.append("Access-Control-Allow-Methods", "DELETE");
    return this.http.delete(this.url+url, {headers:this.headers}).pipe(map(response=>{return response;}));
  }
}
