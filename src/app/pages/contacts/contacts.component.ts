import { Component, Input, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { NgForOf } from "@angular/common";
import { Router } from "@angular/router";
import {ContactService} from "../../services/contact.service";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  DataTableHeaders: Array<string> = ["ID", "ФИО", "Рабочий телефон", "Ответственный"];
  DataTableContent: Array<any> = [];

  constructor(public userService: UserService, private modalService: NgbModal, private router: Router, private contactService: ContactService) {
    if(userService.getAuthStatus()==false){
      router.navigate(['/login']);
    }
    this.contactService.contacts$.subscribe(contacts=>{
      contacts.forEach(cont=>{
        this.DataTableContent.push(cont);
      });
    });
  }

  ngOnInit(): void {
  }

  delete(contact){
    let contactPosition = this.DataTableContent.findIndex(content=>content.id==contact.id);
    this.DataTableContent.splice(contactPosition, 1);
    this.contactService.deleteContacts(contact.id);
  }

  edit(contact){
    const modalRef = this.modalService.open(ContactsDialogContentComponent);
    modalRef.componentInstance.contact = contact;

    setTimeout(()=>{
      const element = document.getElementsByClassName('modal-backdrop fade show');
      element.item(0).remove();
    }, 100);

    modalRef.result.then(result=>{
      let contactPosition = this.DataTableContent.findIndex(content=>content.id==result.id);
      this.DataTableContent[contactPosition] = result;
      this.contactService.changeContact(result);
    });
  }

  addContact(){
    const modalRef = this.modalService.open(ContactsDialogContentComponent);

    setTimeout(()=>{
      const element = document.getElementsByClassName('modal-backdrop fade show');
      element.item(0).remove();
    }, 100);

    modalRef.result.then(result=>{
      let contactPosition = this.DataTableContent.findIndex(content=>content.id==result.id);
      this.DataTableContent[contactPosition] = result;
      this.contactService.addContact(result);
    });
  }

  getResponsible(contact){
    let responsibleUser = null;
    this.userService.users$.subscribe(users=>{
      responsibleUser = users[users.findIndex(user=>user.id==contact.userId)];
    });
    const FIO = responsibleUser.firstName+' '+responsibleUser.secondName+' '+responsibleUser.lastName;
    return FIO;
  }

}

@Component({
  selector: 'contacts-dialog-content',
  standalone: true,
  templateUrl: './contacts-dialog-content.component.html',
  imports: [
    ReactiveFormsModule,
    NgForOf
  ]
})
export class ContactsDialogContentComponent {
  @Input() contact:any;
  contactGroup: FormGroup = new FormGroup<any>({
    First_name: new FormControl(''),
    Second_name: new FormControl(''),
    Last_name: new FormControl(''),
    Work_phone: new FormControl(''),
    Personal_phone: new FormControl(''),
    Responsible: new FormControl(''),
  });

  users = [];

  constructor(public activeModal: NgbActiveModal, private userService: UserService) {
    this.userService.users$.subscribe(users=>{
      users.forEach(u=>this.users.push(u));
    });
    setTimeout(()=>{
      if(this.contact!=undefined){
        this.contactGroup.get('First_name').setValue(this.contact.firstName);
        this.contactGroup.get('Second_name').setValue(this.contact.secondName);
        this.contactGroup.get('Last_name').setValue(this.contact.lastName);
        this.contactGroup.get('Work_phone').setValue(this.contact.workPhone);
        this.contactGroup.get('Personal_phone').setValue(this.contact.personalPhone);
        this.contactGroup.get('Responsible').setValue(this.contact.userId);
      }
    }, 100);

  }

  save(){
    let id = 0;
    if(this.contact.id!=undefined){
      id = this.contact.id;
    }
    const contact = {
      id: id,
      firstName: this.contactGroup.get('First_name').value,
      secondName: this.contactGroup.get('Second_name').value,
      lastName: this.contactGroup.get('Last_name').value,
      workPhone: this.contactGroup.get('Work_phone').value,
      personalPhone: this.contactGroup.get('Personal_phone').value,
      userId: this.contactGroup.get('Responsible').value,
    };
    return contact;
  }

  getResponsible(id){
    let responsibleUser = null;
    this.userService.users$.subscribe(users=>{
      responsibleUser = users[users.findIndex(user=>user.id==id)];
    });
    const FIO = responsibleUser.firstName+' '+responsibleUser.secondName+' '+responsibleUser.lastName;
    return FIO;
  }

  getUsers(){
    console.log(this.users);
    return this.users;
  }
}
