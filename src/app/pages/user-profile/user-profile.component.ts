import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public user;
  public edit:boolean = false;

  constructor(private userService: UserService) {
    userService.user$.subscribe(user=>{
      this.user = user;
    });
  }

  ngOnInit() {
  }

  getAge(){
    const birthdate = new Date(this.user.birthdate);
    const nowDate = new Date();
    let age = nowDate.getFullYear() - birthdate.getFullYear();
    if(nowDate.getMonth()<birthdate.getMonth()){
      age-=1;
    }else if(nowDate.getMonth()==birthdate.getMonth()){
      if(nowDate.getDate()<birthdate.getDate()){
        age-=1;
      }
    }
    return age;
  }

}
