import { Injectable } from '@angular/core';
import {SendlerService} from "./sendler.service";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private sendlerService: SendlerService) {

  }

  public getProducts(){
    let products;
    this.sendlerService.get('/api/Products').subscribe(prods=>{
      products = prods;
    });
    return products;
  }

  public addProduct(product){
    this.sendlerService.post('/api/Products', product).subscribe(result=>{
      console.log(result);
    });
  }

  public deleteProduct(prodId){
    this.sendlerService.delete('/api/Products/'+prodId).subscribe(result=>{console.log(result);});
  }

  public changeProduct(product){
    this.sendlerService.put('/api/Products/'+product.id, product).subscribe(result=>{console.log(result);});
  }
}
