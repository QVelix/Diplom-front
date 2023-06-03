import { Component, OnInit, Input } from '@angular/core';
import { UserService } from "../../services/user.service";
import { ModalDismissReasons, NgbDatepickerModule, NgbDatepicker, NgbModal, NgbActiveModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import {element} from "protractor";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  DataTableHeaders: Array<string> = ["ID", "Логин", "ФИО", "Дата рождения", "Почта"];
  DataTableContent: Array<any> = [
    {
      id: 0,
      login: 'admin2',
      password: '12345678',
      firstname: 'Богачёв',
      secondname: 'Максим',
      lastname: 'Владиславович',
      work_phone: '89397052404',
      personal_phone: '89023678122',
      mail: 'max.bogachew@yandex.ru',
      birthdate: '12/19/2002'
    },
    {
      id: 1,
      login: 'pochtiadmin',
      password: '12345678',
      firstname: 'Богачёв',
      secondname: 'Максим',
      lastname: 'Владиславович',
      work_phone: '89397052404',
      personal_phone: '89023678122',
      mail: 'max.bogachew@yandex.ru',
      birthdate: '12/19/2002'
    }
  ];

  constructor(public userService: UserService, private modalService: NgbModal, private router: Router) {
    if(userService.getAuthStatus()==false){
      router.navigate(['/login']);
    }
    userService.user$.subscribe(user=>{
      this.DataTableContent.push(user);
    });
    if(userService.getAuthStatus()==false){

    }
  }

  ngOnInit(): void {
  }

  delete(user){
    let userPosition = this.DataTableContent.findIndex(content=>content.id==user.id);
    this.DataTableContent.splice(userPosition, 1);
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
    });
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
  userSettingsGroup: FormGroup = new FormGroup<any>({
    login: new FormControl(''),
    password: new FormControl(''),
    firstname: new FormControl(''),
    secondname: new FormControl(''),
    lastname: new FormControl(''),
    birthdate: new FormControl(''),
    workPhone: new FormControl(''),
    personalPhone: new FormControl(''),
    mail: new FormControl('')
  });

  constructor(public activeModal: NgbActiveModal) {
    setTimeout(()=>{
      this.userSettingsGroup.get('login').setValue(this.user.login);
      this.userSettingsGroup.get('password').setValue(this.user.password);
      this.userSettingsGroup.get('firstname').setValue(this.user.firstname);
      this.userSettingsGroup.get('secondname').setValue(this.user.secondname);
      this.userSettingsGroup.get('lastname').setValue(this.user.lastname);
      this.userSettingsGroup.get('birthdate').setValue(this.user.birthdate);
      this.userSettingsGroup.get('workPhone').setValue(this.user.work_phone);
      this.userSettingsGroup.get('personalPhone').setValue(this.user.personal_phone);
      this.userSettingsGroup.get('mail').setValue(this.user.mail);
    }, 100);
  }

  save(){
    const user = {
      id: this.user.id,
      login: this.userSettingsGroup.get('login').value,
      password: this.userSettingsGroup.get('password').value,
      firstname: this.userSettingsGroup.get('firstname').value,
      secondname: this.userSettingsGroup.get('secondname').value,
      lastname: this.userSettingsGroup.get('lastname').value,
      birthdate: this.userSettingsGroup.get('birthdate').value,
      work_phone: this.userSettingsGroup.get('workPhone').value,
      personal_phone: this.userSettingsGroup.get('personalPhone').value,
      mail: this.userSettingsGroup.get('mail').value
    };
    return user;
  }
}

