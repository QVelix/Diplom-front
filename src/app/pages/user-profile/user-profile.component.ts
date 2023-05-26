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

}
