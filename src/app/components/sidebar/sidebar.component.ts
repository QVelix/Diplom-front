import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from "../../services/user.service";
import {beforeMain} from "@popperjs/core";

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Главная',  icon: 'ni-tv-2 text-primary', class: '' },
    // { path: '/icons', title: 'Иконки',  icon:'ni-planet text-blue', class: '' },
    // { path: '/maps', title: 'Карта',  icon:'ni-pin-3 text-orange', class: '' },
    { path: '/user-profile', title: 'Профиль',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/companies', title: 'Компании', icon: 'ni-briefcase-24 text-red', class: ''},
    { path: '/contacts', title: 'Контакты', icon: 'ni-circle-08 text-blue', class: ''},
    { path: '/deals', title: 'Сделки', icon: 'ni-single-copy-04', class: ''},
    { path: '/products', title: 'Товары', icon: 'ni-box-2 text-orange', class: ''},
    // { path: '/tables', title: 'Таблицы',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/settings', title: 'Настройки', icon:'ni-settings-gear-65 text-primary', class: '' },
    { path: '/login', title: 'Авторизоваться',  icon:'ni-key-25 text-info', class: '' },
    { path: '/register', title: 'Зарегистрироваться',  icon:'ni-circle-08 text-pink', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  private authStatus:boolean = true;

  public menuItems: any[] = [];
  public isCollapsed = true;

  private user: any;

  constructor(private router: Router, private userService: UserService) {
    userService.user$.subscribe(user=>{
      this.user = user;
    });
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }

  public getShowed(menuItem) {
    if(this.userService.getAuthStatus()==true){
      if(menuItem.path=="/register"||menuItem.path=="/login"){
        return false;
      }/*else if(menuItem.path=='/settings'&&this.userService.getUserType()!=1){
        return false;
      }*/
      else{
        return true;
      }
    }else{
      switch (menuItem.path){
        case '/login': return true; break;
        case '/register': return true; break;
        default: return false; break;
      }
    }
  }

}
