import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { HttpServiceService } from 'src/app/services/http-service.service';
import {  Toastr} from 'src/app/services/toastr.service'


@Component({
  selector: 'app-newquicksale',
  templateUrl: './newquicksale.component.html',
  styleUrls: ['./newquicksale.component.scss']
})
export class NewquicksaleComponent {
  
  searchProducts: FormGroup = new FormGroup({
    searchInput: new FormControl(''),
  });


  quickSaleForm: FormGroup = new FormGroup({
    name: new FormControl(Validators.required),
    products: new FormArray([]),
  });

  products_view:any[]=[];

  searchingProducts = false;
  

  
  quickSaleName=false;
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
    return this.quickSaleForm.get('products') as FormArray;
  }
 
  addNewClientRedirect(){
      this.router.navigate(['/dashboard/clients'],{queryParams:{source:'newsale'}})
  }



  addProduct(product: any) {
    
    const id :FormControl = new FormControl(product.id)
    this.products_view.push({
                              id:product.id,
                              name:product.name,
                              price:product.price,
                              stock:product.stock
                              })
    
    this.selectedProducts.push(id);
    this.searchProdutsResult = this.searchProdutsResult.filter((obj) => obj.id !== product.id);
    
  }

  removeSelectedClient() {
    // this.selectedClient = '';
    this.quickSaleForm.controls['searchInput'].setValue('');
    this.searchProducts.controls['searchInput'].setValue('');
    this.quickSaleForm.reset();
    this.selectedProducts.clear();
    
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
    
    if (!this.quickSaleForm.valid){
      for(let product  of this.selectedProducts.controls)
          if(product.get('quantity')?.status == 'INVALID'){
              this.toastr.showtoast('error',`At ID '${product.get('id')?.value}' : Quantity greater than available stock`);
              break;
          }
    }
    else
        this.http.createSale(this.quickSaleForm.value).subscribe((respo) => {
                                                      this.toastr.showtoast('success', 'New sale added');
                                                      this.quickSaleForm.reset();
                                                      this.router.navigate(['dashboard/sales']);
                                                    });
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
        
        this.searchingProducts=true;
         
    }
  }
  resumeData(){
    const previous_state =this.dataStorage.newSale_state;
    if(previous_state?.selectedClient || previous_state?.salesForm?.get('products')){
      this.quickSaleForm=previous_state.salesForm;
      // this.selectedClient=previous_state.selectedClient;
      // this.searchingClients=previous_state.searchingClients;
      this.searchingProducts=previous_state.searchingProducts;
    }
    

  }
  

  addQuickSaleName(quickSaleName:string){
    console.log(this.quickSaleForm.controls['name'])
    // this.quickSaleName=quickSaleName.toString();
    this.quickSaleForm.get('name')?.setValue(quickSaleName);
    console.log(this.quickSaleName, this.quickSaleForm.controls['name'])


  }

  ngOnInit() {

    // this.resumeData()
    
    
    this.http.getAllClients().subscribe((response: any) => (this.clientsList = response));
    this.http.getProducts().subscribe((response: any) => (this.productsList = response));

  

    this.searchProducts.get('searchInput')?.valueChanges.subscribe((value) => {  this.onSearchProducts(value)  });

  }
  // ngOnDestroy() {
  //   const current_state = {
  //                             selectedClient:this.selectedClient,
  //                             salesForm:this.salesForm,
  //                             searchingClients:this.searchingClients,
  //                             searchingProducts:this.searchingProducts

  //                          }
  //   this.dataStorage.newSale_state=current_state;
  // }

}
