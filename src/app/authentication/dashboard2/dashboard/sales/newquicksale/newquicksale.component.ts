import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { DataStorageService } from '@services/data-storage.service';
import { HttpServiceService } from '@services/http-service.service';
import {  Toastr} from '@services/toastr.service'


@Component({
  selector: 'app-newquicksale',
  templateUrl: './newquicksale.component.html',
})
export class NewquicksaleComponent {
  
  searchProducts: FormGroup = new FormGroup({
    searchInput: new FormControl(''),
  });


  quickSaleForm: FormGroup = new FormGroup({
    name: new FormControl('',Validators.required),
    products: new FormArray([],Validators.required),
  });

  products_view:any[]=[];

  searchingProducts = false;
  
  quickSaleName:string='';
  searchProdutsResult: any[] = [];

  productsList: any[] = [];

  constructor(
    private http: HttpServiceService,
    private toastr: Toastr,
    private router: Router,
    public dataStorage:DataStorageService
  ) {}

  get selectedProducts(): FormArray {
    return this.quickSaleForm.get('products') as FormArray;
  }
 
 
  addQuickSaleName(quickSaleName:string){
    this.quickSaleName=quickSaleName
    this.quickSaleForm.get('name')?.setValue(quickSaleName);
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
  removeQuickSaleName(){
      this.quickSaleName='';
      this.quickSaleForm.get('name')?.reset();
  }
 

  removeSelectedProducts(product_id: number) {
        const index = this.selectedProducts.controls.findIndex(  (x)   =>   x.value === product_id   );
        if (index >= 0) 
              this.selectedProducts.removeAt(index);
        this.products_view=this.products_view.filter((product:any)=> product.id!=product_id);
  }


  

  confirmSale() {
    
        if(!this.quickSaleForm.valid){
          this.toastr.showtoast('error','Add name and products');
          return;
        }
        this.http.createQuickSale(this.quickSaleForm.value).subscribe((respo) => {
                                                      this.toastr.showtoast('success', 'New quick-sale added');
                                                      this.quickSaleForm.reset();
                                                      this.selectedProducts.clear();
                                                      this.products_view=[];
                                                      this.quickSaleName='';
                                                      this.router.navigate(['dashboard/sales/quick-sales']);
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
                  temp_searchProdutsResult=temp_searchProdutsResult.filter(result=> product.value !=  result.id);
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
  

  

  ngOnInit() {

    // this.resumeData()
    
    
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
