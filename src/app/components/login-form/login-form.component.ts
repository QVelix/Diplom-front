import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  error = null;
  registerGroup: FormGroup = new FormGroup<any>({
    password: new FormControl(''),
    login: new FormControl(''),
    firstname: new FormControl(''),
    secondname: new FormControl(''),
    lastname: new FormControl('')
  });
  loginGroup: FormGroup = new FormGroup<any>({
    login: new FormControl(''),
    password: new FormControl('')
  })

  constructor(public userService: UserService, public router: Router) { }

  ngOnInit(): void {
  }

  checkPassword(){
    var password = this.registerGroup.get('password').value; // Получаем пароль из формы
    console.log(password);
    var s_letters = "qwertyuiopasdfghjklzxcvbnm"; // Буквы в нижнем регистре
    var b_letters = "QWERTYUIOPLKJHGFDSAZXCVBNM"; // Буквы в верхнем регистре
    var digits = "0123456789"; // Цифры
    var specials = "!@#$%^&*()_-+=\|/.,:;[]{}"; // Спецсимволы
    var is_s = false; // Есть ли в пароле буквы в нижнем регистре
    var is_b = false; // Есть ли в пароле буквы в верхнем регистре
    var is_d = false; // Есть ли в пароле цифры
    var is_sp = false; // Есть ли в пароле спецсимволы
    for (var i = 0; i < password.length; i++) {
      /* Проверяем каждый символ пароля на принадлежность к тому или иному типу */
      if (!is_s && s_letters.indexOf(password[i]) != -1) is_s = true;
      else if (!is_b && b_letters.indexOf(password[i]) != -1) is_b = true;
      else if (!is_d && digits.indexOf(password[i]) != -1) is_d = true;
      else if (!is_sp && specials.indexOf(password[i]) != -1) is_sp = true;
    }
    var rating = 0;
    var text = "";
    if (is_s) rating++; // Если в пароле есть символы в нижнем регистре, то увеличиваем рейтинг сложности
    if (is_b) rating++; // Если в пароле есть символы в верхнем регистре, то увеличиваем рейтинг сложности
    if (is_d) rating++; // Если в пароле есть цифры, то увеличиваем рейтинг сложности
    if (is_sp) rating++; // Если в пароле есть спецсимволы, то увеличиваем рейтинг сложности
    /* Далее идёт анализ длины пароля и полученного рейтинга, и на основании этого готовится текстовое описание сложности пароля */
    if (password.length < 8 && rating < 3) text = "Простой";
    else if (password.length < 8 && rating >= 3) text = "Средний";
    else if (password.length >= 8 && rating < 3) text = "Средний";
    else if (password.length >= 8 && rating >= 3) text = "Сложный";
    else if (password.length >= 6 && rating == 1) text = "Простой";
    else if (password.length >= 6 && rating > 1 && rating < 4) text = "Средний";
    else if (password.length >= 6 && rating == 4) text = "Сложный";
    // alert(text); // Выводим итоговую сложность пароля
    return text; // Форму не отправляем
  }

  checkValid(){
    if(this.router.url=='/register'){
      const passwordLength = this.registerGroup.get('password').value.length;
      const loginLength = this.registerGroup.get('login').value.length;
      const firstnameLength = this.registerGroup.get('firstname').value.length;
      const secondnameLength = this.registerGroup.get('secondname').value.length;
      if(passwordLength>0 && loginLength>0 && firstnameLength>0 && secondnameLength>0 && (this.checkPassword()=="Средний"||this.checkPassword()=="Сложный")){
        return true;
      }
      return false;
    }else{
      const passwordLength = this.loginGroup.get('password').value.length;
      const loginLength = this.loginGroup.get('login').value.length;
      if(passwordLength>0 && loginLength>0){
        return true;
      }
      return false;
    }
  }

  auth(){
    const user = this.userService.auth(this.loginGroup.get('login').value, this.loginGroup.get('password').value);
    if(user==false){
      this.error = 'Неправильный логин или пароль';
    }else{
      this.router.navigate(['/dashboard']);
    }
  }

}
