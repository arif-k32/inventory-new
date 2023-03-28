import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddDataResponseService } from 'src/app/services/add-data-response.service';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
})
export class AddproductComponent {
  constructor(
    private http: HttpServiceService,
    private addProductSubject: AddDataResponseService
  ) {}
  newproduct: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    stock: new FormControl(Math.floor(Math.random() * 100000), [
      Validators.required,
      Validators.min(0),
    ]),
    sku: new FormControl(
      Math.floor(Math.random() * 10000).toString(),
      Validators.required
    ),
    active: new FormControl(false, Validators.required),
  });

  newproductf() {
    if (this.newproduct.valid)
      this.http.createProduct(this.newproduct.value).subscribe((res) => {
        this.newproduct.reset();
        this.newproduct.get('active')?.setValue(false);
        this.addProductSubject.onAddProduct('success');
      });
    else this.addProductSubject.onAddProduct('error');
  }
}
