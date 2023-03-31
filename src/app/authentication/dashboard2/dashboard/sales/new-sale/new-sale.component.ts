import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { Toastr } from 'src/app/services/toastr.service';

@Component({
  selector: 'app-new-sale',
  templateUrl: './new-sale.component.html',
  styleUrls: ['./new-sale.component.scss'],
})
export class NewSaleComponent implements OnInit {
  searchClients: FormGroup = new FormGroup({
    searchInput: new FormControl(''),
  });
  searchProducts: FormGroup = new FormGroup({
    searchInput: new FormControl(''),
  });
  salesForm: FormGroup = new FormGroup({
    client_id: new FormControl(Validators.required),
    products: new FormArray([]),
  });

  searchingClients = true;
  searchClientsResult: any[] = [];
  selectedClient!: any;
  searchProdutsResult: any[] = [];

  clientsList: any[] = [];
  productsList: any[] = [];

  constructor(
    private http: HttpServiceService,
    private toastr: Toastr,
    private router: Router,
  ) {}

  get selectedProducts(): FormArray {
    return this.salesForm.get('products') as FormArray;
  }
  addClient(client: any) {
    this.salesForm.controls['client_id'].setValue(client.id);
    this.searchClientsResult = [];
    this.searchingClients = false;
    this.selectedClient = client;
  }

  addProduct(product: any, quantity: string) {
    if (Number(quantity) > product.stock) {
      this.toastr.showtoast('error', 'Quantity should be less than stock');
      return;
    }
    const productForm: FormGroup = new FormGroup({
      id: new FormControl(product.id, Validators.required),
      name: new FormControl(product.name),
      price: new FormControl(product.price) ,
      quantity: new FormControl(Number(quantity), [Validators.required,Validators.min(0),Validators.max(product.stock)]),
    });
    this.selectedProducts.push(productForm);
    this.searchProdutsResult = this.searchProdutsResult.filter(
      (obj) => obj.id !== product.id
    );
    
  }

  removeSelectedClient() {
    this.selectedClient = '';
    this.searchClients.controls['searchInput'].setValue('');
    this.searchProducts.controls['searchInput'].setValue('');
    this.salesForm.reset();
    this.selectedProducts.clear();
    this.searchingClients = true;
  }

  removeSelectedProducts(product_id: number) {
        const index = this.selectedProducts.controls.findIndex(  (x)   =>   x.get('id')?.value === product_id   );
        if (index >= 0) 
              this.selectedProducts.removeAt(index);
  }
  getTotalOrderQuantity(){
    let total =0;
    for (const product of this.selectedProducts.controls)
      total+=product.get('quantity')?.value;
    return total;
  }
  getTotalOrderPrice(){
    let price=0;
    for(const product of this.selectedProducts.controls)
      price+= product.get('price')?.value * product.get('quantity')?.value;
    return price;
  }

  confirmSale() {
    
    if (!this.salesForm.valid){
      for(let product  of this.selectedProducts.controls)
          if(product.get('quantity')?.status == 'INVALID'){
              this.toastr.showtoast('error',`At ID '${product.get('id')?.value}' : Quantity greater than available stock`);
              break;
          }
    }
    else
        this.http.createSale(this.salesForm.value).subscribe((respo) => {
                                                      this.toastr.showtoast('success', 'New sale added');
                                                      this.salesForm.reset();
                                                      this.router.navigate(['dashboard/sales']);
                                                    });
  }

  ngOnInit() {
    this.http
      .getAllClients()
      .subscribe((response: any) => (this.clientsList = response));
    this.http
      .getProducts()
      .subscribe((response: any) => (this.productsList = response));

    this.searchClients.get('searchInput')?.valueChanges.subscribe((value) => {
      if (value == '') this.searchClientsResult = [];
      else
        this.searchClientsResult = this.clientsList.filter(
          (client: any) =>
            client.first_name.toLowerCase().includes(value.toLowerCase()) ||
            client.last_name.toLowerCase().includes(value.toLowerCase())
        );
    });

    this.searchProducts.get('searchInput')?.valueChanges.subscribe((value) => {
      if (value == '') this.searchProdutsResult = [];
      else
        this.searchProdutsResult = this.productsList.filter(
          (product: any) =>
            product.name.toLowerCase().includes(value.toLowerCase()) &&
            product.active &&
            product.stock > 0
        );
    });

    // const cli = `{"id":27,"first_name":"Jessica","last_name":"Chen","address":"234 Pine St","city":"Boston","state":"Massachusetts","country":"US","phone":"+1(617)-555-5678","email":"jessica.chen@gmail.com","created_at":"2023-03-17T07:10:02.667600+00:00","updated_at":"2023-03-24T03:02:50.383325+00:00"}`;
    // this.addClient(JSON.parse(cli));
    // const obj=`[{"id":240,"name":"lenovo","price":500000,"sku":"656589","stock":47,"active":true},{"id":142,"name":"nothing phone (1)","price":26000,"sku":"65461","stock":1,"active":true},{"id":216,"name":"Nothing Phone 1","price":7412,"sku":"754210","stock":75421,"active":true},{"id":213,"name":"Nothing Phone 1","price":654200,"sku":"4631","stock":4599,"active":true}]`;
    // for (let product of JSON.parse(obj))
    //     this.addProduct(product,'1');
  }
}