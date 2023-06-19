import { Component, Input, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { NgForOf } from "@angular/common";
import { Router } from "@angular/router";
import {DealService} from "../../services/deal.service";

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.scss']
})
export class DealsComponent implements OnInit {
  DataTableHeaders: Array<string> = ["ID", "Название", "Номер", "Суммарная стоимость", "Дата создания", "Дата завершения", "Отвественный"];
  DataTableContent: Array<any> = [];
  users = [];

  constructor(public userService: UserService, private modalService: NgbModal, private router: Router, private dealService: DealService) {
    if(userService.getAuthStatus()==false){
      router.navigate(['/login']);
    }
    this.dealService.deals$.subscribe(deals=>{
      this.DataTableContent = deals;
    });
    this.userService.users$.subscribe(users=>{
      users.forEach(user=>this.users.push(user));
      console.log(this.users);
    })
  }

  ngOnInit(): void {
  }

  delete(deal){
    let contactPosition = this.DataTableContent.findIndex(content=>content.id==deal.id);
    this.DataTableContent.splice(contactPosition, 1);
    this.dealService.deleteDeal(deal.id);
  }

  edit(deal){
    const modalRef = this.modalService.open(DealsDialogContentComponent);
    modalRef.componentInstance.deal = deal;
    modalRef.componentInstance.users = this.users;

    setTimeout(()=>{
      const element = document.getElementsByClassName('modal-backdrop fade show');
      element.item(0).remove();
    }, 100);

    modalRef.result.then(result=>{
      let contactPosition = this.DataTableContent.findIndex(content=>content.id==result.id);
      this.DataTableContent[contactPosition] = result;

      this.dealService.changeDeal(result);
    });
  }

  addDeal(){
    const modalRef = this.modalService.open(DealsDialogContentComponent);
    console.log(this.users);
    modalRef.componentInstance.user = this.users;

    setTimeout(()=>{
      const element = document.getElementsByClassName('modal-backdrop fade show');
      element.item(0).remove();
    }, 100);

    modalRef.result.then(result=>{
      this.DataTableContent.push(result);
      this.dealService.addDeal(result);
    });
  }

  getResponsible(contact){
    let responsibleUser = null;
    this.userService.users$.subscribe(users=>{
      responsibleUser = users[users.findIndex(user=>user.id==contact.userId)];
    });
    const FIO = responsibleUser.firstName+' '+responsibleUser.secondName+' '+responsibleUser.lastName;
    return FIO;
  }

}

@Component({
  selector: 'deals-dialog-content',
  standalone: true,
  templateUrl: './deals-dialog-content.component.html',
  imports: [
    ReactiveFormsModule,
    NgForOf
  ]
})
export class DealsDialogContentComponent {
  @Input() deal:any;
  @Input() users:Array<any>;
  dealsGroup: FormGroup = new FormGroup<any>({
    Name: new FormControl(''),
    Number: new FormControl(''),
    Price: new FormControl(''),
    Creation_date: new FormControl(''),
    Close_date: new FormControl(''),
    Responsible: new FormControl(''),
  });

  constructor(public activeModal: NgbActiveModal, private userService: UserService) {
    setTimeout(()=>{
      console.log(this.users);
      if(this.deal!=undefined){
        this.dealsGroup.get('Name').setValue(this.deal.name);
        this.dealsGroup.get('Number').setValue(this.deal.number);
        this.dealsGroup.get('Price').setValue(this.deal.price);
        this.dealsGroup.get('Creation_date').setValue(this.deal.creationDate);
        this.dealsGroup.get('Close_date').setValue(this.deal.closeDate);
        this.dealsGroup.get('Responsible').setValue(this.deal.userId);
      }
    }, 100);

  }

  save(){
    const deal = {
      id: this.deal.id,
      mame: this.dealsGroup.get('Name').value,
      mumber: this.dealsGroup.get('Number').value,
      price: this.dealsGroup.get('Price').value,
      creationDate: this.dealsGroup.get('Creation_date').value,
      closeDate: this.dealsGroup.get('Close_date').value,
      userId: this.dealsGroup.get('Responsible').value,
    };
    return deal;
  }

  getResponsible(id){
    let responsibleUser = null;
    this.userService.users$.subscribe(users=>{
      responsibleUser = users[users.findIndex(user=>user.id==id)];
    });
    const FIO = responsibleUser.firstName+' '+responsibleUser.secondName+' '+responsibleUser.lastName;
    return FIO;
  }

  getUsers(){
    console.log(this.users);
    return this.users;
  }
}
