import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SalesHttpService } from '@api/Sales/sales-http.service';
import { IQuickSale } from '@interfaces/sales/sales.interface';
import { Observable } from 'rxjs';
import { Toastr } from '@services/toastr.service';

@Component({
  selector: 'app-quicksale',
  templateUrl: './quick-sales.component.html',
})
export class QuicksaleComponent {
  public quickSales$!:Observable<IQuickSale[]>;

  public currentPage=1;
  public numberOfSales!:number;
  public numberOfPages!: number;
  public pageSize=5;


  constructor(private readonly salesHttpService:SalesHttpService, private readonly router:Router,private readonly toastr:Toastr){}

  public pagination(updatedPagination: { currentPage: number; pageSize: number }) {
        this.currentPage = updatedPagination.currentPage;
        this.pageSize = updatedPagination.pageSize;
        this.numberOfPages = Math.ceil(this.numberOfSales / this.pageSize);
  }

  public getQuickSales():void{
        this.quickSales$= this.salesHttpService.getAllQuickSales();
        this.quickSales$.subscribe((sales:IQuickSale[])=>{
                                        this.numberOfSales = sales.length;
                                        this.numberOfPages = Math.ceil(this.numberOfSales / this.pageSize);
                                    })
  }
  public goToQuickSale(id:number):void{
      this.router.navigate(['/dashboard/sales/newsale'],{queryParams:{quick_sale:id}})

  }
  public editQuickSale(sale:IQuickSale):void{
    localStorage.setItem('editQuickSale',JSON.stringify(sale));
    this.router.navigate(['/dashboard/sales/newquicksale'],{queryParams:{source:'edit'}})
  }

  public deleteQuickSale(sale_id:number):void{
      this.salesHttpService.deleteQuickSale(sale_id).subscribe(()=>{
                                                    this.toastr.showtoast('success','quick sale deleted');
                                                    this.getQuickSales();
                                            })
  }

  ngOnInit() {
    this.getQuickSales();
    
  }

}
