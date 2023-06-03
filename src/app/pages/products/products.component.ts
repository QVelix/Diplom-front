import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: any[] = [{id:0,name: 'БУС', price: 19000}, {id:1,name: 'Б24', price: 50000}, {id:2,name: 'Б24М', price: 9000},
    {id:3,name: 'БУС', price: 19000}, {id:4,name: 'Б24', price: 50000}, {id:5,name: 'Б24М', price: 9000},
    {id:6,name: 'БУС', price: 19000}, {id:7,name: 'Б24', price: 50000}, {id:8,name: 'Б24М', price: 9000},
    {id:9,name: 'БУС', price: 19000}, {id:10,name: 'Б24', price: 50000}, {id:11,name: 'Б24М', price: 9000}]

  constructor(private modalService: NgbModal, private userService: UserService, private router:Router) {
    if(userService.getAuthStatus()==false){
      router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
  }

  delete(product){
    this.products.splice(this.products.findIndex(prod=>prod.id==product.id),1);
  }

  edit(product){
    const modalRef = this.modalService.open(ProductsDialogContentComponent);
    modalRef.componentInstance.product = product;

    setTimeout(()=>{
      const element = document.getElementsByClassName('modal-backdrop fade show');
      element.item(0).remove();
    }, 100);

    modalRef.result.then(result=>{
      let userPosition = this.products.findIndex(content=>content.id==result.id);
      this.products[userPosition] = result;
    });
  }

}

@Component({
  selector: 'products-dialog-content',
  standalone: true,
  templateUrl: './products-dialog-content.component.html',
  imports: [
    ReactiveFormsModule
  ]
})
export class ProductsDialogContentComponent {
  @Input() product:any;
  productsGroup: FormGroup = new FormGroup<any>({
    name: new FormControl(''),
    price: new FormControl(''),
  });

  constructor(public activeModal: NgbActiveModal) {
    setTimeout(()=>{
      this.productsGroup.get('name').setValue(this.product.name);
      this.productsGroup.get('price').setValue(this.product.price);
    }, 100);
  }

  save(){
    const product = {
      id: this.product.id,
      name: this.productsGroup.get('name').value,
      price: this.productsGroup.get('price').value,
    };
    return product;
  }
}
