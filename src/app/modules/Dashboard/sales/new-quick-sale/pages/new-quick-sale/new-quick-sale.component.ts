import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsHttpSerice } from '@api/Products/products-http.service';
import { SalesHttpService } from '@api/Sales/sales-http.service';
import { IProduct } from '@interfaces/products/products.interface';
import { IQuickSale } from '@interfaces/sales/sales.interface';
import { Toastr } from '@services/toastr.service';


@Component({
  selector: 'app-newquicksale',
  templateUrl: './new-quick-sale.component.html',
})
export class NewquicksaleComponent {
   
  public mode:string = 'new'; /// 'new' | 'edit'
  
  public searchProducts: FormGroup = new FormGroup({
                                              searchInput: new FormControl(''),
                                            });


  public quickSaleForm: FormGroup = new FormGroup({
                                            name: new FormControl('',Validators.required),
                                            products: new FormArray([],Validators.required),
                                          });

  public products_view:IProduct[]=[];

  public searchingProducts = false;
  
  public quickSaleName:string='';
  public searchProdutsResult: IProduct[] = [];

  public productsList: IProduct[] = [];

  constructor(
        private readonly salesHttpService: SalesHttpService,
        private readonly productsHttpService:ProductsHttpSerice,
        private readonly toastr: Toastr,
        private readonly router: Router,
        private readonly route:ActivatedRoute,
        private readonly renderer:Renderer2,
        private readonly el:ElementRef
  ) {}

  get selectedProducts(): FormArray {
        return this.quickSaleForm.get('products') as FormArray;
  }
 
 
  public addQuickSaleName(quickSaleName:string){
        this.quickSaleName=quickSaleName
        this.quickSaleForm.get('name')?.setValue(quickSaleName);
  }


  public addProduct(product: IProduct):void {
          const id :FormControl = new FormControl(product.id)
          this.products_view.push(product)
          
          this.selectedProducts.push(id);
          this.searchProdutsResult = this.searchProdutsResult.filter((obj) => obj.id !== product.id);
    
  }
  public removeQuickSaleName():void{
          this.quickSaleName='';
          this.quickSaleForm.get('name')?.reset();
          this.selectedProducts.clear();
          this.products_view=[];
  }
 

  public removeSelectedProducts(product_id: number):void {
        const index = this.selectedProducts.controls.findIndex(  (x)   =>   x.value === product_id   );
        if (index >= 0) 
              this.selectedProducts.removeAt(index);
        this.products_view=this.products_view.filter((product:any)=> product.id!=product_id);
  }


  

  public confirmSale():void {
    
        if(!this.quickSaleForm.valid){
          this.toastr.showtoast('error','Add name and products');
          return;
        }
        this.salesHttpService.createQuickSale(this.quickSaleForm.value).subscribe((respo) => {
                                                            this.toastr.showtoast('success', 'New quick-sale added');
                                                            this.quickSaleForm.reset();
                                                            this.selectedProducts.clear();
                                                            this.products_view=[];
                                                            this.quickSaleName='';
                                                            this.router.navigate(['dashboard/sales/quick-sales']);
                                                       });
  }
  
  public onSearchProducts(value:string){
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
                              temp_searchProdutsResult=temp_searchProdutsResult.filter(result=> product.value !=  result.id);
                    this.searchProdutsResult=temp_searchProdutsResult;
            }
            else{
                    this.searchProdutsResult=temp_searchProdutsResult;
            }
            this.searchingProducts=true;
    }
  }
  
  public loadEditItems():void{
      this.mode='edit';
      const temp = localStorage.getItem('editQuickSale');
      let quickSale!:IQuickSale;
      if(temp){
            quickSale = JSON.parse(temp);
            const quickSaleNameInput = this.el.nativeElement.querySelector('input');
            this.renderer.setProperty(quickSaleNameInput, 'value', quickSale.name)
            this.addQuickSaleName(quickSale.name);
            for (let product of quickSale.products)
                 this.addProduct(product) ;
            this.quickSaleForm.addControl('id',new FormControl(quickSale.id,Validators.required))
            localStorage.removeItem('editQuickSale')
      }

  }


  public getFinalSubmitButton():string{
      if(this.mode == 'new')
            return 'confirm';
      return 'update';
  }


  public updateQuickSale():void{
      if(!this.quickSaleForm.valid){
            this.toastr.showtoast('error','Add name and products');
            return;
      }
      this.salesHttpService.updateQuickSale(this.quickSaleForm.value).subscribe((response:any)=>{
                                                                  this.toastr.showtoast('success','quick sale updated');
                                                                  this.router.navigate(['/dashboard/sales/quick-sales']);
                                                            })
      
  }


  public finalSubmit():void{
      if(this.mode == 'new')
            this.confirmSale();
      else
            this.updateQuickSale();

  }
  
  ngOnInit() {
      this.route.queryParams.subscribe((params:{[source:string]:string})=>{
            if(params['source']=='edit'){
                  this.loadEditItems();
            }
          })
     this.productsHttpService.getProducts().subscribe((response: any) => (this.productsList = response));
     this.searchProducts.get('searchInput')?.valueChanges.subscribe((value) => {  this.onSearchProducts(value)  });
  }
  

}
