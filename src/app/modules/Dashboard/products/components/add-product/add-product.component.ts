import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddDataResponseService } from 'src/app/Shared/Services/add-data-response.service';
import { ProductsHttpSerice } from 'src/app/Core/Http/Api/Products/products-http.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './add-product.component.html',
})
export class AddproductComponent {
  constructor(
          private readonly http: ProductsHttpSerice,
          private readonly addProductSubject: AddDataResponseService
  ) {}
  public newproduct: FormGroup = new FormGroup({
                                          name: new FormControl('', Validators.required),
                                          price: new FormControl('', [Validators.required, Validators.min(0)]),
                                          stock: new FormControl(Math.floor(Math.random() * 100000), [Validators.required, Validators.min(0)]),
                                          sku: new FormControl(Math.floor(Math.random() * 10000).toString(),Validators.required),
                                          active: new FormControl(false, Validators.required),
                                        });

  public newproductf():void {
              if (this.newproduct.valid)
                this.http.createProduct(this.newproduct.value).subscribe((res) => {
                                                                  this.newproduct.reset();
                                                                  this.newproduct.get('active')?.setValue(false);
                                                                  this.addProductSubject.onAddProduct('success');
                                                                });
              else this.addProductSubject.onAddProduct('error');
            }
}
