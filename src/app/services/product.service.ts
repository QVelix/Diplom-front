import { Injectable } from '@angular/core';
import {SendlerService} from "./sendler.service";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private sendlerService: SendlerService) {

  }

  public getProducts() {
    return this.sendlerService.get('/api/Product');
  }


  public addProduct(product){
    this.sendlerService.post('/api/Product', product).subscribe(result=>{
      console.log(result);
    });
  }

  public deleteProduct(prodId){
    this.sendlerService.delete('/api/Product/'+prodId).subscribe(result=>{console.log(result);});
  }

  public changeProduct(product){
    this.sendlerService.put('/api/Product/'+product.id, product).subscribe(result=>{console.log(result);});
  }
}
