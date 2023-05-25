import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from "../../services/user.service";

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Главная',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/icons', title: 'Иконки',  icon:'ni-planet text-blue', class: '' },
    { path: '/maps', title: 'Карта',  icon:'ni-pin-3 text-orange', class: '' },
    { path: '/user-profile', title: 'Профиль',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/tables', title: 'Таблицы',  icon:'ni-bullet-list-67 text-red', class: '' },
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
    console.log(this.user);
  }

  ngOnInit() {
    ROUTES.forEach(route=>{
      if(this.user.login.length==0 && route.path=='/user-profile'){
        return;
      }
      if(this.user.login.length>0 && (route.path=='/login'||route.path=='/register')){
        return;
      }
      this.menuItems.push(route);
    });
    // this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
