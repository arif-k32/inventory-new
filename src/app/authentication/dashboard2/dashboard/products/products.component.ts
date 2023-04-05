import { formatCurrency } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable, of, Subscription } from 'rxjs';
import { AddDataResponseService } from 'src/app/services/add-data-response.service';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { Toastr } from 'src/app/services/toastr.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy{
  productsObservable$!: Observable<any[]>;
  productsForm: FormGroup = new FormGroup({});

  filterFn: Function[] = [
    ///// contains all filter methods

    (products: any) => {
      ///filter by active
      let filteredProducts: any[] = [];
      if (this.filters_active)
        filteredProducts = products.filter(
          (product: any) =>
            product.active.toString() === this.filters_active
        );
      else filteredProducts = products;
      return filteredProducts;
    },

    (products: any) => {
      ///filter by stock
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

  filters_active = '' //// will be updated when change on filter dropdowns
  filters_stock =''
  

  currentPage = 1;
  pageSize: number = 5;
  numberOfProducts!: number; //length of products array
  numberOfPages!: number; // in pagination

  addProduct = false;

  constructor(
    private http: HttpServiceService,
    private toastr: Toastr,
    private addProductSubject: AddDataResponseService,
    private readonly dataStorage:DataStorageService
  ) {}

  pagination(updatedPagination: { currentPage: number; pageSize: number }) {
    this.currentPage = updatedPagination.currentPage;
    this.pageSize = updatedPagination.pageSize;
    this.numberOfPages = Math.ceil(this.numberOfProducts / this.pageSize);
  }

  setfiltersActive(activeDropdown: any) {
    ///will be called on change in dropdown
    this.currentPage = 1;
    this.getdata();
  }
  setfiltersStock(stockDropdown: any) {
    this.currentPage = 1;
    this.getdata();
  }

  showAddProduct() {
    this.addProduct = !this.addProduct;
  }

  public addProductsSubscription: Subscription = this.addProductSubject
    .addProductResponse()
    .subscribe((response: string) => {
      this.addProductResponse(response);
    });

  addProductResponse(response: string) {
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

  switch(product: any, checkbox: any) {
    /// sets product active or invactive
    if (checkbox.target.checked == true) {
      this.productsForm.controls[product.id].get('price')?.enable();
      this.productsForm.controls[product.id].get('stock')?.enable();
      this.http.updateProductActive(product.id, true);
    } else {
      this.productsForm.controls[product.id].get('price')?.disable();
      this.productsForm.controls[product.id].get('stock')?.disable();
      this.http.updateProductActive(product.id, false);
    }
  }

  setPriceInputFieldOnChange(product: any, event: any) {
    // converts number to currency in input field
    const newvalue = this.getCurrencyFromNumber(
      this.getNumberFromText(event.target.value)
    );
    this.productsForm.controls[product.id].get('price')?.setValue(newvalue);
  }

  delete(id: number) {
    this.http.deleteProduct(id).subscribe((respose) => {
      this.toastr.showtoast('success', 'deleted');
      this.http.getProducts().subscribe((response: any) => {
        this.productsObservable$ = of(response);
      });
    });
  }

  reloadProducts(){
    this.getdata();

  }

  getdata() {    /// retrieves products from server
    this.productsObservable$ = this.http.getProducts().pipe(
      map((products: any) => {
        return this.checkfilters(products);
      })
    );
    this.productsObservable$.subscribe((resp: any) => {
      this.numberOfProducts = resp.length;
      this.numberOfPages = Math.ceil(resp.length / this.pageSize);
      this.productsForm=new FormGroup({});
      resp.map((product: any) => {
        this.productsForm.addControl(
          `${product.id}`,
          new FormGroup({
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
 

  checkfilters(products: any) {
    for (const filter of this.filterFn) products = filter(products);
    return products;
  }

  updateProduct(product: any) {
    const updatedProduct = {
      ...product,
      price: this.getNumberFromText(
        this.productsForm.controls[product.id].value.price
      ),
      stock: this.productsForm.controls[product.id].value.stock,
    };

    this.http
      .updateProduct(product.id, updatedProduct)
      .subscribe((response) => {
        this.toastr.showtoast('success', 'update success');
        this.getdata();
      });
  }

  getNumberFromText(text: string) {
    return Number(text.replace(/[^0-9.-]+/g, ''));
  }
  getCurrencyFromNumber(value: any) {
    return formatCurrency(value, 'en-US', '$');
  }

  checkIfProductUpdated(product: any) {
    //toggles update button on or off
    const { price, stock } = this.productsForm.controls[product.id].value;
    if (!this.productsForm.controls[product.id].get('switch')?.value)
      return false;
    return !(
      this.getNumberFromText(price) == product.price && stock == product.stock
    );
  }

  updateEnableOrDisable(product: any) {
    //toggles update button on or off
    if (this.productsForm.controls[product.id].get('switch')?.value)
      if (this.checkIfProductUpdated(product)) return false;
    return true;
  }
  
  onResume(){
      const previous_state = this.dataStorage.products_state;
      if(previous_state){
        this.filters_active=previous_state.filters_active;
        this.filters_stock=previous_state.filters_stock;
        this.currentPage=previous_state.currentPage;
        this.pageSize=previous_state.pageSize;
        this.addProduct=previous_state.addProduct;
        this.productsForm=previous_state.productsForm;
        this.productsObservable$=previous_state.products$;
        this.numberOfPages=previous_state.numberOfPages;
        this.numberOfProducts=previous_state.numberOfProducts;
      }
      else{
        this.getdata();
      }
  }
  ngOnInit(): void {
    this.onResume();
    
    
  }
  ngOnDestroy(): void {
    const current_state = {
                              filters_active:this.filters_active,
                              filters_stock:this.filters_stock,
                              currentPage:this.currentPage,
                              pageSize:this.pageSize,
                              addProduct:this.addProduct,
                              productsForm:this.productsForm,
                              products$:this.productsObservable$,
                              numberOfPages:this.numberOfPages,
                              numberOfProducts:this.numberOfProducts
                          }
    this.dataStorage.products_state=current_state;
  }
}
