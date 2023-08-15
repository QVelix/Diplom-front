import { Component, OnInit, Input } from '@angular/core';
import { UserService } from "../../services/user.service";
import { ModalDismissReasons, NgbDatepickerModule, NgbDatepicker, NgbModal, NgbActiveModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import {element} from "protractor";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {User} from "../../models/User";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  DataTableHeaders: Array<string> = ["ID", "Логин", "ФИО", "Дата рождения", "Рабочий телефон"];
  DataTableContent: Array<any>;

  constructor(public userService: UserService, private modalService: NgbModal, private router: Router) {
    if(userService.getAuthStatus()==false){
      router.navigate(['/login']);
    }
    userService.users$.subscribe(users=>{
      this.DataTableContent = users;
    })
  }

  ngOnInit(): void {
  }

  delete(user){
    let userPosition = this.DataTableContent.findIndex(content=>content.id==user.id);
    this.DataTableContent.splice(userPosition, 1);
    this.userService.deleteUser(user.id);
  }

  edit(user){
    const modalRef = this.modalService.open(SettingsDialogContentComponent);
    modalRef.componentInstance.user = user;

    setTimeout(()=>{
      const element = document.getElementsByClassName('modal-backdrop fade show');
      element.item(0).remove();
    }, 100);

    modalRef.result.then(result=>{
      let userPosition = this.DataTableContent.findIndex(content=>content.id==result.id);
      this.DataTableContent[userPosition] = result;
      this.userService.changeUser(result);
    });
  }

  addUser(){
    let user: {userTypesId:2}
    const modalRef = this.modalService.open(SettingsDialogContentComponent);
    modalRef.componentInstance.user = user;

    setTimeout(()=>{
      const element = document.getElementsByClassName('modal-backdrop fade show');
      element.item(0).remove();
    }, 100);

    modalRef.result.then(result=>{
      this.DataTableContent.push(result);
      this.userService.addUser(result);
    })
  }
}

@Component({
  selector: 'settings-dialog-content',
  standalone: true,
  templateUrl: './settings-dialog-content.component.html',
  imports: [
    ReactiveFormsModule
  ]
})
export class SettingsDialogContentComponent {
  @Input() user:any;
  userTypes=[{id:1, name:'Администратор'}, {id:2, name:'Менеджер'}, {id:3, name:'Программист'}];
  userSettingsGroup: FormGroup = new FormGroup<any>({
    login: new FormControl(''),
    password: new FormControl(''),
    firstname: new FormControl(''),
    secondname: new FormControl(''),
    lastname: new FormControl(''),
    birthdate: new FormControl(''),
    workPhone: new FormControl(''),
    personalPhone: new FormControl(''),
  });

  constructor(public activeModal: NgbActiveModal) {
    setTimeout(()=>{
      if(this.user!=undefined){
        this.userSettingsGroup.get('login').setValue(this.user.login);
        this.userSettingsGroup.get('password').setValue(this.user.password);
        this.userSettingsGroup.get('firstname').setValue(this.user.firstName);
        this.userSettingsGroup.get('secondname').setValue(this.user.secondName);
        this.userSettingsGroup.get('lastname').setValue(this.user.lastName);
        this.userSettingsGroup.get('birthdate').setValue(this.user.birthDate);
        this.userSettingsGroup.get('workPhone').setValue(this.user.workPhone);
        this.userSettingsGroup.get('personalPhone').setValue(this.user.personalPhone);
      }
    }, 100);
  }

  save(){
    let id = 0;
    if(this.user.id!=undefined){
      id = this.user.id;
    }
    const user = {
      id: id,
      login: this.userSettingsGroup.get('login').value,
      password: this.userSettingsGroup.get('password').value,
      firstName: this.userSettingsGroup.get('firstname').value,
      secondName: this.userSettingsGroup.get('secondname').value,
      lastName: this.userSettingsGroup.get('lastname').value,
      birthDate: this.userSettingsGroup.get('birthdate').value,
      workPhone: this.userSettingsGroup.get('workPhone').value,
      personalPhone: this.userSettingsGroup.get('personalPhone').value,
      userTypesId: this.user.userTypesId
    };
    return user;
  }
}

