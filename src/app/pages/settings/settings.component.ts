import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  DataTableHeaders: Array<string> = ["ID", "Логин", "ФИО", "Дата рождения", "Почта"];
  DataTableContent: Array<any> = [
    [0, "admin2", "Богачёв Максим Владиславович", "12/19/2002", "max.bogachew@yandex.ru"],
    [1, "pochtiadmin", "Соловьев Алексей Сергеевич", "01/30/1988", "sas@solo-it.ru"]
  ];

  constructor(public userService: UserService) {
    userService.user$.subscribe(user=>{
      this.DataTableContent.push([3, user.login, user.firstname+' '+user.secondname+' '+user.lastname, user.birthdate, user.mail])
    })
  }

  ngOnInit(): void {
  }

  delete(user){
    let userPosition = this.DataTableContent.findIndex(content=>content[0]==user[0]);
    this.DataTableContent.splice(userPosition, 1);
  }

}
