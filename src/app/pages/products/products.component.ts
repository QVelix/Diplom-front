import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

  delete(product){
    this.products.splice(this.products.findIndex(prod=>prod.id==product.id),1);
  }

}
