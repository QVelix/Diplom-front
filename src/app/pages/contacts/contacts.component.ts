import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SettingsDialogContentComponent} from "../settings/settings.component";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  DataTableHeaders: Array<string> = ["ID", "ФИО", "Рабочий телефон", "Ответственный"];
  DataTableContent: Array<any> = [
    {
      id: 0,
      First_name: 'admin2',
      Second_name: '12345678',
      Last_name: 'Богачёв',
      Work_phone: 'Максим',
      Personal_phone: 'Владиславович',
      ResponsibleId: 0,
      Company: 0,
    },
    {
      id: 1,
      First_name: 'Фыппфы',
      Second_name: 'впыпвы',
      Last_name: 'впыпвы',
      Work_phone: 'ывппывп',
      Personal_phone: 'ывпывп',
      ResponsibleId: 1,
      Company: 2,
    }
  ];

  constructor(public userService: UserService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
  }

  delete(contact){
    let contactPosition = this.DataTableContent.findIndex(content=>content.id==contact.id);
    this.DataTableContent.splice(contactPosition, 1);
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
    });
  }

  getResponsible(contact){
    let responsibleUser = null;
    this.userService.users$.subscribe(users=>{
      responsibleUser = users[users.findIndex(user=>user.id==contact.ResponsibleId)];
    });
    const FIO = responsibleUser.firstname+' '+responsibleUser.secondname+' '+responsibleUser.lastname;
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

  users;

  constructor(public activeModal: NgbActiveModal, private userService: UserService) {
    this.userService.users$.subscribe(users=>{
      this.users = users;
    });
    setTimeout(()=>{
      this.contactGroup.get('First_name').setValue(this.contact.First_name);
      this.contactGroup.get('Second_name').setValue(this.contact.Second_name);
      this.contactGroup.get('Last_name').setValue(this.contact.Last_name);
      this.contactGroup.get('Work_phone').setValue(this.contact.Work_phone);
      this.contactGroup.get('Personal_phone').setValue(this.contact.Personal_phone);
      this.contactGroup.get('Responsible').setValue(this.contact.ResponsibleId);
    }, 100);

  }

  save(){
    const contact = {
      id: this.contact.id,
      First_name: this.contactGroup.get('First_name').value,
      Second_name: this.contactGroup.get('Second_name').value,
      Last_name: this.contactGroup.get('Last_name').value,
      Work_phone: this.contactGroup.get('Work_phone').value,
      Personal_phone: this.contactGroup.get('Personal_phone').value,
      ResponsibleId: this.contactGroup.get('Responsible').value,
    };
    return contact;
  }

  getResponsible(id){
    let responsibleUser = null;
    this.userService.users$.subscribe(users=>{
      responsibleUser = users[users.findIndex(user=>user.id==id)];
    });
    const FIO = responsibleUser.firstname+' '+responsibleUser.secondname+' '+responsibleUser.lastname;
    return FIO;
  }

  getUsers(){
    console.log(this.users);
    return this.users;
  }
}
