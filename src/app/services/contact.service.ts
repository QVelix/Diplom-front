import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {SendlerService} from "./sendler.service";
import {Contact} from "../models/Contact";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private _contactsSubject:BehaviorSubject<any> = new BehaviorSubject<Array<Contact>>(null);
  public contacts$:Observable<any> = this._contactsSubject.asObservable();

  constructor(private sendlerService: SendlerService) {
    this.sendlerService.get('/api/ContactController').subscribe((contacts:Array<Contact>)=>{
      contacts.forEach(contact=>{
        this._contactsSubject.value.next(contact);
      });
    });
  }
}
