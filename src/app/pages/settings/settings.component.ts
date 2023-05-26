import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from "../../services/user.service";
import { ModalDismissReasons, NgbDatepickerModule, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {element} from "protractor";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  closeResult:any = '';
  DataTableHeaders: Array<string> = ["ID", "Логин", "ФИО", "Дата рождения", "Почта"];
  DataTableContent: Array<any> = [
    [0, "admin2", "Богачёв Максим Владиславович", "12/19/2002", "max.bogachew@yandex.ru"],
    [1, "pochtiadmin", "Соловьев Алексей Сергеевич", "01/30/1988", "sas@solo-it.ru"]
  ];

  constructor(public userService: UserService, private modalService: NgbModal) {
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

  edit(){
    // this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
    //   (result) => {
    //     this.closeResult = `Closed with: ${result}`;
    //   },
    //   (reason) => {
    //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    //   },
    // );
    const modalRef = this.modalService.open(NgbdModalContent);

    setTimeout(()=>{
      const element = document.getElementsByClassName('modal-backdrop fade show');
      console.log(element);
      element.item(0).remove();
    }, 100);


  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } /*else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    }*/ else {
      return `with: ${reason}`;
    }
  }

}

@Component({
  selector: 'ngbd-modal-content',
  standalone: true,
  template: `
		<div class="modal-header">
			<h4 class="modal-title">Hi there!</h4>
			<button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
		</div>
		<div class="modal-body">
			<p>Hello, {{ name }}!</p>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
		</div>
	`,
})
export class NgbdModalContent {
  // @Input() name;
  name = 'hello';

  constructor(public activeModal: NgbActiveModal) {}
}

