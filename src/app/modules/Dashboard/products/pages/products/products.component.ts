import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddDataResponseService } from 'src/app/Shared/Services/add-data-response.service';
import { Toastr } from 'src/app/Shared/Services/toastr.service';
import { Observable, Subscription, map, of } from 'rxjs';
import { ProductsHttpSerice } from 'src/app/Core/Http/Api/Products/products-http.service';
import { IProduct } from 'src/app/Shared/Interfaces/products/products.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit{
  public productsObservable$!: Observable<IProduct[]>;
  public productsList!:IProduct[];
  public productsForm: FormGroup = new FormGroup({});

  public filterFn: Function[] = [   ///// contains all filter methods
                                  (products: IProduct[]):IProduct[] => {   ///filter by active
                                    let filteredProducts: IProduct[] = [];
                                    if (this.filters_active)
                                      filteredProducts = products.filter(
                                        (product: IProduct) =>
                                          product.active.toString() === this.filters_active
                                      );
                                    else filteredProducts = products;
                                    return filteredProducts;
                                  },

                                  (products: IProduct[]):IProduct[] => {   ///filter by stock
                                    let filteredProducts: IProduct[] = [];
                                    if (this.filters_stock)
                                      if (this.filters_stock == '0')
                                        filteredProducts = products.filter(
                                          (product: IProduct) => product.stock == 0
                                        );
                                      else
                                        filteredProducts = products.filter(
                                          (product: IProduct) => product.stock > 0
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

  public pagination(updatedPagination: { currentPage: number; pageSize: number }):void {
        this.currentPage = updatedPagination.currentPage;
        this.pageSize = updatedPagination.pageSize;
        this.numberOfPages = Math.ceil(this.numberOfProducts / this.pageSize);
  }

  public setfiltersActive(activeDropdown: Event):void {   ///will be called on change in dropdown
        this.filters_active=(activeDropdown.target as HTMLSelectElement).value;
        this.currentPage = 1;
        this.getdata();
  }
  public setfiltersStock(stockDropdown: Event):void {
        this.filters_stock=(stockDropdown.target as HTMLSelectElement).value;
        this.currentPage = 1;
        this.getdata();
  }

  public showAddProduct():void {
        this.addProduct = !this.addProduct;
  }

  public addProductsSubscription: Subscription = this.addProductSubject.addProductResponse().subscribe((response: string) => {
                                                                                                this.addProductResponse(response);
                                                                                              });

  public addProductResponse(response: string):void {
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

  public switch(product: IProduct, checkbox: Event):void {  /// sets product active or invactive
        if ((checkbox.target as HTMLInputElement).checked == true) {
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

  public setPriceInputFieldOnChange(product: IProduct, event: Event):void {   // converts number to currency in input field
        const newvalue = this.getCurrencyFromNumber(
          this.getNumberFromText((event.target as HTMLInputElement).value)
        );
        this.productsForm.controls[product.id].get('price')?.setValue(newvalue);
  }

  public delete(id: number):void {
        this.http.deleteProduct(id).subscribe(() => {
                                      this.toastr.showtoast('success', 'deleted');
                                      this.getdata();
                                    });
  }

  public reloadProducts():void{
    this.getdata();

  }

  private getdata():void {    /// retrieves products from server
    this.productsObservable$ = this.http.getProducts().pipe( map((products: any) => {
                                                            return this.checkfilters(products);
                                                          })
                                                        );

    this.productsObservable$.subscribe((resp: IProduct[]) => {
                                this.numberOfProducts = resp.length;
                                this.numberOfPages = Math.ceil(resp.length / this.pageSize);
                                this.productsForm=new FormGroup({});
                                resp.map((product: IProduct) => {
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
 

  private checkfilters(products: IProduct[]):IProduct[] {
          
          for (const filter of this.filterFn)
             products = filter(products);
          return products;
  }

  public updateProduct(product: IProduct):void {
        const updatedProduct = {
                                ...product,
                                price: this.getNumberFromText(this.productsForm.controls[product.id].value.price ),
                                stock: this.productsForm.controls[product.id].value.stock,
                              };

        this.http.updateProduct( updatedProduct).subscribe(() => {
                                                              this.toastr.showtoast('success', 'update success');
                                                              this.getdata();
                                                            });
  }

  private getNumberFromText(text: string):number {
      return Number(text.replace(/[^0-9.-]+/g, ''));
  }
  private getCurrencyFromNumber(value: number) :string{
     return formatCurrency(value, 'en-US', '$');
  }

  public checkIfProductUpdated(product: IProduct):boolean {   //toggles update button on or off
          const { price, stock } = this.productsForm.controls[product.id].value;
          if (!this.productsForm.controls[product.id].get('switch')?.value)
              return false;
          return !(this.getNumberFromText(price) == product.price && stock == product.stock);
  }

  public updateEnableOrDisable(product: IProduct):boolean {    //toggles update button on or off
      if (this.productsForm.controls[product.id].get('switch')?.value)
          if (this.checkIfProductUpdated(product))
               return false;
      return true;
  }
  
  
  ngOnInit(): void {
    this.getdata();
  }
 
}
