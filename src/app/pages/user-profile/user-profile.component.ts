import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";
import { FormControl, FormGroup } from "@angular/forms";
import { User } from "../../models/User";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userGroup: FormGroup = new FormGroup({
    login: new FormControl(null),
    password: new FormControl(null),
    firstname: new FormControl(null),
    secondname: new FormControl(null),
    lastname: new FormControl(null),
    workphone: new FormControl(null),
    personalphone: new FormControl(null),
  });

  public user;
  public edit:boolean = false;

  constructor(private userService: UserService, private router: Router) {
    if(userService.getAuthStatus()==false){
      router.navigate(['/login']);
    }
    userService.user$.subscribe(user=>{
      this.user = user;
      this.userGroup.get('login').setValue(user.login);
      this.userGroup.get('password').setValue(user.password);
      this.userGroup.get('firstname').setValue(user.firstName);
      this.userGroup.get('secondname').setValue(user.secondName);
      this.userGroup.get('lastname').setValue(user.lastName);
      this.userGroup.get('workphone').setValue(user.workPhone);
      this.userGroup.get('personalphone').setValue(user.personalPhone);
    });
  }

  ngOnInit() {
  }

  /**
   * Функция расчёта возраста
   * @return number age
   */
  getAge(){
    const birthdate = new Date(this.user.birthDate);
    const nowDate = new Date();
    //Расчитываем возраст в годах: из текущего года вычитаем год рождения
    let age = nowDate.getFullYear() - birthdate.getFullYear();
    //Если текущий месяц меньше месяца рождения - вычитаем 1 год
    if(nowDate.getMonth()<birthdate.getMonth()){
      age-=1;
    }else if(nowDate.getMonth()==birthdate.getMonth()){ //Если месяц текущий и месяц рождения одинаков проверяем день рождения
      if(nowDate.getDate()<birthdate.getDate()){
        age-=1;
      }
    }
    return age;
  }

  save(){
    let updatedUser:User = {id:this.user.id, firstName:null, secondName:null, password:null, login:null, birthDate:this.user.birthDate, userTypesId: this.user.userTypesId};
    updatedUser.login = this.userGroup.get('login').value;
    updatedUser.password = this.userGroup.get('password').value;
    updatedUser.firstName = this.userGroup.get('firstname').value;
    updatedUser.secondName = this.userGroup.get('secondname').value;
    updatedUser.lastName = this.userGroup.get('lastname').value;
    updatedUser.workPhone = this.userGroup.get('workphone').value;
    updatedUser.personalPhone = this.userGroup.get('personalphone').value;
    this.userService.changeUser(updatedUser);
    this.edit = false;
  }

}
