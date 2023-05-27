import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {SettingsDialogContentComponent} from "../settings/settings.component";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {
  DataTableHeaders: Array<string> = ["ID", "Название", "Тип", "Телефон", "Почта", "Отвественный"];
  DataTableContent: Array<any> = [
    {
      id: 0,
      Short_name: 'pochtiadmin',
      Full_name: '12345678',
      Phone: 'Богачёв',
      Email: 'Максим',
      Type: 'ООО',
      Responsible: '0',
    },
    {
      id: 1,
      Short_name: '2324124',
      Full_name: '12345678',
      Phone: '421412',
      Email: '52151',
      Type: 'ИП',
      Responsible: '1',
    }
  ];

  constructor(public userService: UserService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
  }

  delete(company){
    let companyPosition = this.DataTableContent.findIndex(content=>content.id==company.id);
    this.DataTableContent.splice(companyPosition, 1);
  }

  edit(company){
    const modalRef = this.modalService.open(CompaniesDialogContentComponent);
    modalRef.componentInstance.company = company;

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

  constructor(public activeModal: NgbActiveModal) {
    setTimeout(()=>{
      this.companiesGroup.get('Short_name').setValue(this.company.Short_name);
      this.companiesGroup.get('Full_name').setValue(this.company.Full_name);
      this.companiesGroup.get('Phone').setValue(this.company.Phone);
      this.companiesGroup.get('Email').setValue(this.company.Email);
      this.companiesType.forEach(type=>{
        if(this.company.Type==type.Name) this.companiesGroup.get('Type').setValue(type.id);
      })
      // this.companiesGroup.get('Type').setValue(this.company.Type);
      this.companiesGroup.get('Responsible').setValue(this.company.Responsible);
    }, 100);
  }

  save(){
    const company = {
      id: this.company.id,
      Short_name: this.companiesGroup.get('Short_name').value,
      Full_name: this.companiesGroup.get('Full_name').value,
      Phone: this.companiesGroup.get('Phone').value,
      Email: this.companiesGroup.get('Email').value,
      Type: this.getTypeName(this.companiesGroup.get('Type').value),
      Responsible: this.companiesGroup.get('Responsible').value,
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
}
