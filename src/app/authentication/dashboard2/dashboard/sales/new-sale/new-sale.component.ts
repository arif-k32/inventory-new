import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { Toastr } from 'src/app/services/toastr.service';

@Component({
  selector: 'app-new-sale',
  templateUrl: './new-sale.component.html',
  styleUrls: ['./new-sale.component.scss'],
})
export class NewSaleComponent implements OnInit, OnDestroy {
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

  searchingClients = false;
  searchingProducts = false;
  

  searchClientsResult: any[] = [];
  selectedClient!: any;
  searchProdutsResult: any[] = [];

  clientsList: any[] = [];
  productsList: any[] = [];

  constructor(
    private http: HttpServiceService,
    private toastr: Toastr,
    private router: Router,
    public dataStorage:DataStorageService,
    private readonly route:ActivatedRoute,
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
  addNewClientRedirect(){
      this.router.navigate(['/dashboard/clients'],{queryParams:{source:'newsale'}})
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
      stock:new FormControl(product.stock),
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
      price+=( product.get('price')?.value * product.get('quantity')?.value);
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
  onSearchClients(value:any){
    if (value == ''){
       this.searchClientsResult = [];
       this.searchingClients=false
    }
    else{
            const temp_searchClientsResult = this.clientsList.filter(
                      (client: any) =>client.first_name.toLowerCase().includes(value.toLowerCase()) ||
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
  onSearchProducts(value:any){
    if (value == ''){
       this.searchProdutsResult = [];
       this.searchingProducts=false;
      }
    else{
        let temp_searchProdutsResult=this.productsList.filter( (product: any) =>product.name.toLowerCase().includes(value.toLowerCase()) &&
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
  resumeData(){
    const previous_state =this.dataStorage.newSale_state;
    if(previous_state?.selectedClient || previous_state?.salesForm?.get('products')){
      this.salesForm=previous_state.salesForm;
      this.selectedClient=previous_state.selectedClient;
      this.searchingClients=previous_state.searchingClients;
      this.searchingProducts=previous_state.searchingProducts;
    }
    

  }
  onQuickSale(params:{[source:string]:string}){
            if(params['quick_sale']){
              this.salesForm.reset();
              this.selectedClient='';
              this.selectedProducts.clear();
              console.log(this.salesForm.value)
              this.http.getQuickSaleById(Number(params['quick_sale'])).subscribe((quickSale:any)=>{
                                                                          for(let product of quickSale.products){
                                                                                this.addProduct(product,'1')
                                                                                console.log(product)}
                                                                          console.log(this.salesForm.value)

                                                                          })
          }

  }

  ngOnInit() {

    this.resumeData()
    this.route.queryParams.subscribe((params:{[source:string]:string})=>{ this.onQuickSale(params)})
    
    this.http.getAllClients().subscribe((response: any) => (this.clientsList = response));
    this.http.getProducts().subscribe((response: any) => (this.productsList = response));

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
