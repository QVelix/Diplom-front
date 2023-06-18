import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Array<{id:number, name:string, price:number}>;

  constructor(private modalService: NgbModal, private userService: UserService, private router:Router, private productService: ProductService) {
    if(userService.getAuthStatus()==false){
      router.navigate(['/login']);
    }
    this.productService.getProducts().subscribe((prods:Array<{id:number, name:string, price:number}>)=>{
      this.products = prods;
    })
    console.log(this.products);
  }

  ngOnInit(): void {
  }

  delete(product){
    this.products.splice(this.products.findIndex(prod=>prod.id==product.id),1);
    this.productService.deleteProduct(product.id);
  }

  edit(product){
    const modalRef = this.modalService.open(ProductsDialogContentComponent);
    modalRef.componentInstance.product = product;

    setTimeout(()=>{
      const element = document.getElementsByClassName('modal-backdrop fade show');
      element.item(0).remove();
    }, 100);

    modalRef.result.then(result=>{
      let productPosition = this.products.findIndex(content=>content.id==result.id);
      this.products[productPosition] = result;
      this.productService.changeProduct(result);
    });
  }

  addProduct(){
    let product = {name:'', price:null};
    const modalRef = this.modalService.open(ProductsDialogContentComponent);
    modalRef.componentInstance.product = product;

    setTimeout(()=>{
      const element = document.getElementsByClassName('modal-backdrop fade show');
      element.item(0).remove();
    }, 100);

    modalRef.result.then(result=>{
      this.products.push(result);
      this.productService.addProduct(result);
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
