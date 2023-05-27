import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.scss']
})
export class DealsComponent implements OnInit {
  DataTableHeaders: Array<string> = ["ID", "Название", "Номер", "Суммарная стоимость", "Дата создания", "Дата завершения", "Отвественный"];
  DataTableContent: Array<any> = [
    {
      id: 0,
      Name: 'admin2',
      Number: 53232,
      Price: 'Богачёв',
      Creation_date: 'Максим',
      Close_date: 'Владиславович',
      ResponsibleId: 0,
      Company: 0,
      Contact: 0
    },
    {
      id: 1,
      Name: 'admin2',
      Number: '12345678',
      Price: 10000,
      Creation_date: 'Максим',
      Close_date: 'Владиславович',
      ResponsibleId: 2,
      Company: 0,
      Contact: 0
    }
  ];

  constructor(public userService: UserService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
  }

  delete(contact){
    let contactPosition = this.DataTableContent.findIndex(content=>content.id==contact.id);
    this.DataTableContent.splice(contactPosition, 1);
  }

  edit(deal){
    const modalRef = this.modalService.open(DealsDialogContentComponent);
    modalRef.componentInstance.deal = deal;

    setTimeout(()=>{
      const element = document.getElementsByClassName('modal-backdrop fade show');
      element.item(0).remove();
    }, 100);

    modalRef.result.then(result=>{
      let contactPosition = this.DataTableContent.findIndex(content=>content.id==result.id);
      this.DataTableContent[contactPosition] = result;
    });
  }

  getResponsible(contact){
    let responsibleUser = null;
    this.userService.users$.subscribe(users=>{
      responsibleUser = users[users.findIndex(user=>user.id==contact.ResponsibleId)];
    });
    const FIO = responsibleUser.firstname+' '+responsibleUser.secondname+' '+responsibleUser.lastname;
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
  dealsGroup: FormGroup = new FormGroup<any>({
    Name: new FormControl(''),
    Number: new FormControl(''),
    Price: new FormControl(''),
    Creation_date: new FormControl(''),
    Close_date: new FormControl(''),
    Responsible: new FormControl(''),
  });

  users;

  constructor(public activeModal: NgbActiveModal, private userService: UserService) {
    this.userService.users$.subscribe(users=>{
      this.users = users;
    });
    setTimeout(()=>{
      this.dealsGroup.get('Name').setValue(this.deal.Name);
      this.dealsGroup.get('Number').setValue(this.deal.Number);
      this.dealsGroup.get('Price').setValue(this.deal.Price);
      this.dealsGroup.get('Creation_date').setValue(this.deal.Creation_date);
      this.dealsGroup.get('Close_date').setValue(this.deal.Close_date);
      this.dealsGroup.get('Responsible').setValue(this.deal.ResponsibleId);
    }, 100);

  }

  save(){
    const deal = {
      id: this.deal.id,
      Name: this.dealsGroup.get('Name').value,
      Number: this.dealsGroup.get('Number').value,
      Price: this.dealsGroup.get('Price').value,
      Creation_date: this.dealsGroup.get('Creation_date').value,
      Close_date: this.dealsGroup.get('Close_date').value,
      ResponsibleId: this.dealsGroup.get('Responsible').value,
    };
    return deal;
  }

  getResponsible(id){
    let responsibleUser = null;
    this.userService.users$.subscribe(users=>{
      responsibleUser = users[users.findIndex(user=>user.id==id)];
    });
    const FIO = responsibleUser.firstname+' '+responsibleUser.secondname+' '+responsibleUser.lastname;
    return FIO;
  }

  getUsers(){
    console.log(this.users);
    return this.users;
  }
}
