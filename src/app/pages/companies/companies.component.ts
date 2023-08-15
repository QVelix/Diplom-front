import { Component, Input, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { NgForOf } from "@angular/common";
import { Router } from "@angular/router";
import {CompanyService} from "../../services/company.service";

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {
  DataTableHeaders: Array<string> = ["ID", "Название", "Тип", "Телефон", "Почта", "Отвественный"];
  DataTableContent: Array<any> = [];

  constructor(public userService: UserService, private modalService: NgbModal, private router: Router, private companyService: CompanyService) {
    if(userService.getAuthStatus()==false){
      router.navigate(['/login']);
    }
    this.companyService.companies$.subscribe(comps=>{
      comps.forEach(comp=>{
        this.DataTableContent.push(comp);
      })
    })
  }

  ngOnInit(): void {
  }

  delete(company){
    let companyPosition = this.DataTableContent.findIndex(content=>content.id==company.id);
    this.DataTableContent.splice(companyPosition, 1);
    this.companyService.deleteCompany(company.id);
  }

  edit(company){
    const modalRef = this.modalService.open(CompaniesDialogContentComponent);
    modalRef.componentInstance.company = company;

    setTimeout(()=>{
      const element = document.getElementsByClassName('modal-backdrop fade show');
      element.item(0).remove();
    }, 100);

    modalRef.result.then(result=>{
      let companyPosition = this.DataTableContent.findIndex(content=>content.id==result.id);
      this.DataTableContent[companyPosition] = result;
      this.companyService.changeCompany(result);
    });
  }

  addCompany(){

  }

  getResponsible(company){
    let responsibleUser = null;
    this.userService.users$.subscribe(users=>{
      responsibleUser = users[users.findIndex(user=>user.id==company.userId)];
    });
    const FIO = responsibleUser.firstName+' '+responsibleUser.secondName+' '+responsibleUser.lastName;
    return FIO;
  }

}


@Component({
  selector: 'companies-dialog-content',
  standalone: true,
  templateUrl: './companies-dialog-content.component.html',
  imports: [
    ReactiveFormsModule,
    NgForOf
  ]
})
export class CompaniesDialogContentComponent {
  @Input() company:any;
  companiesGroup: FormGroup = new FormGroup<any>({
    Short_name: new FormControl(''),
    Full_name: new FormControl(''),
    Phone: new FormControl(''),
    Email: new FormControl(''),
    Type: new FormControl(''),
    Responsible: new FormControl(''),
  });

  companiesType=[{id:0, Name: 'ООО'}, {id:1, Name: 'ИП'}, {id:2, Name: 'Физ. лицо'}];

  users;

  constructor(public activeModal: NgbActiveModal, private userService: UserService) {
    setTimeout(()=>{
      this.userService.users$.subscribe(users=>{
        users.forEach(u=>this.users.push(u));
      });
      this.companiesGroup.get('Short_name').setValue(this.company.shortName);
      this.companiesGroup.get('Full_name').setValue(this.company.fullName);
      this.companiesGroup.get('Phone').setValue(this.company.phone);
      this.companiesGroup.get('Email').setValue(this.company.email);
      this.companiesType.forEach(type=>{
        if(this.company.Type==type.Name) this.companiesGroup.get('Type').setValue(type.id);
      })
      // this.companiesGroup.get('Type').setValue(this.company.Type);
      this.companiesGroup.get('Responsible').setValue(this.company.userId);
    }, 100);
    this.userService.users$.subscribe(users=>{
      this.users = users;
    });
  }

  save(){
    const company = {
      id: this.company.id,
      shortName: this.companiesGroup.get('Short_name').value,
      fullName: this.companiesGroup.get('Full_name').value,
      phone: this.companiesGroup.get('Phone').value,
      email: this.companiesGroup.get('Email').value,
      type: this.getTypeName(this.companiesGroup.get('Type').value),
      userId: this.companiesGroup.get('Responsible').value,
    };
    return company;
  }

  getTypeName(typeId){
    let typeName;
    this.companiesType.forEach(type=>{
      if(type.id == typeId){
        typeName = type.Name;
      }
    });
    return typeName;
  }

  getResponsible(id){
    let responsibleUser = null;
    this.userService.users$.subscribe(users=>{
      responsibleUser = users[users.findIndex(user=>user.id==id)];
    });
    const FIO = responsibleUser.firstName+' '+responsibleUser.secondName+' '+responsibleUser.lastName;
    return FIO;
  }
}
