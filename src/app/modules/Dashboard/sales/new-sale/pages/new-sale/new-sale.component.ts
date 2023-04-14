import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStorageService } from '../../services/data-storage.service';
import { Toastr } from 'src/app/Shared/Services/toastr.service';
import { ClientsHttpService } from '@api/Clients/clients-http.service';
import { ProductsHttpSerice } from '@api/Products/products-http.service';
import { SalesHttpService } from '@api/Sales/sales-http.service';
import { IClient } from 'src/app/Shared/Interfaces/clients/clients.interface';
import { IProduct } from 'src/app/Shared/Interfaces/products/products.interface';

@Component({
  selector: 'app-new-sale',
  templateUrl: './new-sale.component.html',
})
export class NewSaleComponent implements OnInit, OnDestroy {
            
  public searchClients: FormGroup = new FormGroup({
                                            searchInput: new FormControl(''),
                                          });
  public searchProducts: FormGroup = new FormGroup({
                                            searchInput: new FormControl(''),
                                          });
  public salesForm: FormGroup = new FormGroup({
                                                client_id: new FormControl(Validators.required),
                                                products: new FormArray([]),
                                              });

  public searchingClients = false;
  public searchingProducts = false;
  

  public searchClientsResult: IClient[] = [];
  public selectedClient!: IClient|null;
  public searchProdutsResult: IProduct[] = [];

  public clientsList: IClient[] = [];
  public productsList: IProduct[] = [];

  constructor(
        private readonly http: SalesHttpService,
        private readonly productsHttp:ProductsHttpSerice,
        private readonly clientsHttp:ClientsHttpService,
        private readonly toastr: Toastr,
        private readonly router: Router,
        public readonly dataStorage:DataStorageService,
        private readonly route:ActivatedRoute,
  ) {}

  get selectedProducts(): FormArray {
      return this.salesForm.get('products') as FormArray;
  }
  public addClient(client: IClient):void {
      this.salesForm.controls['client_id'].setValue(client.id);
      this.searchClientsResult = [];
      this.searchingClients = false;
      this.selectedClient = client;
  }
  public addNewClientRedirect():void{
        this.router.navigate(['/dashboard/clients'],{queryParams:{source:'newsale'}})
  }



  public addProduct(product: IProduct, quantity: string):void {
      if (Number(quantity) > product.stock) {
            this.toastr.showtoast('error', 'Quantity should be less than stock');
            return;
      }
      const productForm: FormGroup = new FormGroup({
                                          id: new FormControl(product.id, Validators.required),
                                          name: new FormControl(product.name),
                                          price: new FormControl(product.price) ,
                                          stock:new FormControl(product.stock),
                                          quantity: new FormControl(Number(quantity), [Validators.required,Validators.min(0),Validators.max(product.stock)]),
                                        });
      this.selectedProducts.push(productForm);
      this.searchProdutsResult = this.searchProdutsResult.filter((obj) => obj.id !== product.id);
    
  }

  public removeSelectedClient():void {
    this.selectedClient = null;
    this.searchClients.controls['searchInput'].setValue('');
    this.searchProducts.controls['searchInput'].setValue('');
    this.salesForm.reset();
    this.selectedProducts.clear();
    this.searchingClients = true;
  }

  public removeSelectedProducts(product_id: number):void {
        const index = this.selectedProducts.controls.findIndex(  (x)   =>   x.get('id')?.value === product_id   );
        if (index >= 0) 
              this.selectedProducts.removeAt(index);
  }
  public getTotalOrderQuantity():number{
    let total =0;
    for (const product of this.selectedProducts.controls)
      total+=product.get('quantity')?.value;
    return total;
  }
  public getTotalOrderPrice():number{
    let price=0;
    for(const product of this.selectedProducts.controls)
      price+=( product.get('price')?.value * product.get('quantity')?.value);
    return price;
  }

  public confirmSale():void {
    
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
  public onSearchClients(value:string):void{
    if (value == ''){
       this.searchClientsResult = [];
       this.searchingClients=false
    }
    else{
            const temp_searchClientsResult = this.clientsList.filter(
                      (client: IClient) =>client.first_name.toLowerCase().includes(value.toLowerCase()) ||
                                                  client.last_name.toLowerCase().includes(value.toLowerCase()));
            if(this.selectedClient){
                 this.searchClientsResult=temp_searchClientsResult.filter(client=>  client.id != this.salesForm.value.client_id);
            }
            else{
                this.searchClientsResult=temp_searchClientsResult;
            }
            this.searchingProducts=false;
            this.searchingClients=true;
            
      }
  }
  public onSearchProducts(value:string):void{
    if (value == ''){
          this.searchProdutsResult = [];
          this.searchingProducts=false;
      }
    else{
        let temp_searchProdutsResult=this.productsList.filter( (product: IProduct) =>product.name.toLowerCase().includes(value.toLowerCase()) &&
                                                                                  product.active &&
                                                                                  product.stock > 0
                                                                              );
        if(this.selectedProducts.controls[0]){
            for (let product of this.selectedProducts.controls)
                    temp_searchProdutsResult=temp_searchProdutsResult.filter(result=> product.value.id !=  result.id);
            this.searchProdutsResult=temp_searchProdutsResult;
        }
        else{
            this.searchProdutsResult=temp_searchProdutsResult;
        }
        this.searchingClients=false;
        this.searchingProducts=true;
         
    }
  }
  public resumeData():void{
    const previous_state =this.dataStorage.newSale_state;
    if(previous_state?.selectedClient || previous_state?.salesForm?.get('products')){
                this.salesForm=previous_state.salesForm;
                this.selectedClient=previous_state.selectedClient;
                this.searchingClients=previous_state.searchingClients;
                this.searchingProducts=previous_state.searchingProducts;
    }
  }

  public onQuickSale(params:{[source:string]:string}){
            if(params['quick_sale']){
              this.salesForm.reset();
              this.selectedClient=null;
              this.selectedProducts.clear();
              this.http.getQuickSaleById(Number(params['quick_sale'])).subscribe((quickSale:any)=>{
                                                                          for(let product of quickSale.products){
                                                                                this.addProduct(product,'1')
                                                                              }
                                                                          })
          }

  }

  ngOnInit() {

        this.resumeData()
        this.route.queryParams.subscribe((params:{[source:string]:string})=>{ this.onQuickSale(params)})
        
        this.clientsHttp.getAllClients().subscribe((response: any) => (this.clientsList = response));
        this.productsHttp.getProducts().subscribe((response: any) => (this.productsList = response));

        this.searchClients.get('searchInput')?.valueChanges.subscribe((value) => {  this.onSearchClients(value)  });

        this.searchProducts.get('searchInput')?.valueChanges.subscribe((value) => {  this.onSearchProducts(value)  });

  }
  ngOnDestroy() {
        const current_state = {
                                  selectedClient:this.selectedClient,
                                  salesForm:this.salesForm,
                                  searchingClients:this.searchingClients,
                                  searchingProducts:this.searchingProducts

                              }
        this.dataStorage.newSale_state=current_state;
  }
}
