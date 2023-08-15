import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {SendlerService} from "./sendler.service";
import {Contact} from "../models/Contact";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private _contactsSubject:BehaviorSubject<any> = new BehaviorSubject<Array<Contact>>([]);
  public contacts$:Observable<any> = this._contactsSubject.asObservable();

  constructor(private sendlerService: SendlerService) {
    this.sendlerService.get('/api/Contact').subscribe((contacts:Array<Contact>)=>{
      contacts.forEach(contact=>{
        this._contactsSubject.value.push(contact);
      });
    });
  }

  public getContacts(){
    return this._contactsSubject.value;
  }

  public deleteContacts(id){
    this.sendlerService.delete('/api/Contact/'+id).subscribe(result=>{console.log(result);});
    this._contactsSubject.value.splice(this._contactsSubject.value.findIndex(contact=>{contact.id==id}),1);
  }

  public changeContact(contact){
    this.sendlerService.put('/api/Contact/'+contact.id, contact).subscribe(result=>{console.log(result)});
    this._contactsSubject.value[this._contactsSubject.value.findIndex(cont=>cont.id==contact.id)] = contact;
  }

  public addContact(contact){
    this._contactsSubject.next(contact);
    this.sendlerService.post('/api/Contact', contact).subscribe(result=>console.log(result));
  }
}
