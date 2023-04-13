import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddDataResponseService } from 'src/app/Shared/Services/add-data-response.service';
import { Toastr } from 'src/app/Shared/Services/toastr.service';
import { Observable, Subscription, map, of } from 'rxjs';
import { ProductsHttpSerice } from 'src/app/Core/Http/Api/Products/products-http.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit{
  public productsObservable$!: Observable<any[]>;
  public productsList!:any[];
  public productsForm: FormGroup = new FormGroup({});

  public filterFn: Function[] = [   ///// contains all filter methods
                                  (products: any) => {   ///filter by active
                                    let filteredProducts: any[] = [];
                                    if (this.filters_active)
                                      filteredProducts = products.filter(
                                        (product: any) =>
                                          product.active.toString() === this.filters_active
                                      );
                                    else filteredProducts = products;
                                    return filteredProducts;
                                  },

                                  (products: any) => {   ///filter by stock
                                    let filteredProducts: any[] = [];
                                    if (this.filters_stock)
                                      if (this.filters_stock == '0')
                                        filteredProducts = products.filter(
                                          (product: any) => product.stock == 0
                                        );
                                      else
                                        filteredProducts = products.filter(
                                          (product: any) => product.stock > 0
                                        );
                                    else filteredProducts = products;
                                    return filteredProducts;
                                  },
                                ];

  public filters_active = '' //// will be updated when change on filter dropdowns
  public filters_stock =''
  

  public currentPage = 1;
  public pageSize: number = 5;
  public numberOfProducts!: number; //length of products array
  public numberOfPages!: number; // in pagination

  public addProduct = false;

  constructor(
          private readonly http: ProductsHttpSerice,
          private readonly toastr: Toastr,
          private readonly addProductSubject: AddDataResponseService,
  ) {}

  public pagination(updatedPagination: { currentPage: number; pageSize: number }) {
        this.currentPage = updatedPagination.currentPage;
        this.pageSize = updatedPagination.pageSize;
        this.numberOfPages = Math.ceil(this.numberOfProducts / this.pageSize);
  }

  public setfiltersActive(activeDropdown: any) {   ///will be called on change in dropdown
        this.currentPage = 1;
        this.getdata();
  }
  public setfiltersStock(stockDropdown: any) {
        this.currentPage = 1;
        this.getdata();
  }

  public showAddProduct() {
        this.addProduct = !this.addProduct;
  }

  public addProductsSubscription: Subscription = this.addProductSubject.addProductResponse().subscribe((response: string) => {
                                                                                                this.addProductResponse(response);
                                                                                              });

  public addProductResponse(response: string) {
        switch (response) {
              case 'success':
                    this.toastr.showtoast('success', 'product added');
                    this.getdata();
                    break;

              default:
                    this.toastr.showtoast('error', 'Product not valid');
                    break;
        }
        this.getdata();
  }

  public switch(product: any, checkbox: any) {  /// sets product active or invactive
        if (checkbox.target.checked == true) {
              this.productsForm.controls[product.id].get('price')?.enable();
              this.productsForm.controls[product.id].get('stock')?.enable();
              this.http.updateProductActive(product.id, true).subscribe();
        }
        else {
            this.productsForm.controls[product.id].get('price')?.disable();
            this.productsForm.controls[product.id].get('stock')?.disable();
            this.http.updateProductActive(product.id, false).subscribe();
    }
  }

  public setPriceInputFieldOnChange(product: any, event: any) {   // converts number to currency in input field
        const newvalue = this.getCurrencyFromNumber(
          this.getNumberFromText(event.target.value)
        );
        this.productsForm.controls[product.id].get('price')?.setValue(newvalue);
  }

  public delete(id: number) {
        this.http.deleteProduct(id).subscribe((respose) => {
                                      this.toastr.showtoast('success', 'deleted');
                                      this.http.getProducts().subscribe((response: any) => {
                                                                this.productsObservable$ = of(response);
                                                              });
                                    });
  }

  public reloadProducts(){
    this.getdata();

  }

  private getdata() {    /// retrieves products from server
    this.productsObservable$ = this.http.getProducts().pipe( map((products: any) => {
                                                            return this.checkfilters(products);
                                                          })
                                                        );

    this.productsObservable$.subscribe((resp: any) => {
                                this.numberOfProducts = resp.length;
                                this.numberOfPages = Math.ceil(resp.length / this.pageSize);
                                this.productsForm=new FormGroup({});
                                resp.map((product: any) => {
                                                  this.productsForm.addControl(
                                                          `${product.id}`, new FormGroup({
                                                                                  switch: new FormControl(product.active),
                                                                                  price: new FormControl(
                                                                                          {
                                                                                            value: this.getCurrencyFromNumber(product.price),
                                                                                            disabled: !product.active,
                                                                                          },
                                                                                          Validators.min(0)
                                                                                        ),
                                                                                  stock: new FormControl(
                                                                                            { value: product.stock, disabled: !product.active },
                                                                                            Validators.min(0)
                                                                                          ),
                                                                                        })
                                                  );
                                                });
                              });
  }
 

  private checkfilters(products: any) {
          for (const filter of this.filterFn) products = filter(products);
          return products;
  }

  public updateProduct(product: any) {
        const updatedProduct = {
                                ...product,
                                price: this.getNumberFromText(this.productsForm.controls[product.id].value.price ),
                                stock: this.productsForm.controls[product.id].value.stock,
                              };

        this.http.updateProduct(product.id, updatedProduct).subscribe((response) => {
                                                              this.toastr.showtoast('success', 'update success');
                                                              this.getdata();
                                                            });
  }

  private getNumberFromText(text: string) {
      return Number(text.replace(/[^0-9.-]+/g, ''));
  }
  private getCurrencyFromNumber(value: any) {
     return formatCurrency(value, 'en-US', '$');
  }

  public checkIfProductUpdated(product: any) {   //toggles update button on or off
          const { price, stock } = this.productsForm.controls[product.id].value;
          if (!this.productsForm.controls[product.id].get('switch')?.value)
              return false;
          return !(this.getNumberFromText(price) == product.price && stock == product.stock);
  }

  public updateEnableOrDisable(product: any) {    //toggles update button on or off
      if (this.productsForm.controls[product.id].get('switch')?.value)
          if (this.checkIfProductUpdated(product))
               return false;
      return true;
  }
  
  
  ngOnInit(): void {
    this.getdata();
  }
 
}
