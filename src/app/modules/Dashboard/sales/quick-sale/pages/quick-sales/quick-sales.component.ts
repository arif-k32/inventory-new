import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SalesHttpService } from '@api/Sales/sales-http.service';
import { IQuickSale } from '@interfaces/sales/sales.interface';

@Component({
  selector: 'app-quicksale',
  templateUrl: './quick-sales.component.html',
})
export class QuicksaleComponent {
  public quickSales$!:Observable<any>;

  public currentPage=1;
  public numberOfSales!:number;
  public numberOfPages!: number;
  public pageSize=5;


  constructor(private readonly http:SalesHttpService, private readonly router:Router){}

  public pagination(updatedPagination: { currentPage: number; pageSize: number }) {
        this.currentPage = updatedPagination.currentPage;
        this.pageSize = updatedPagination.pageSize;
        this.numberOfPages = Math.ceil(this.numberOfSales / this.pageSize);
  }

  public getQuickSales():void{
        this.quickSales$= this.http.getAllQuickSales();
        this.quickSales$.subscribe((sales:IQuickSale[])=>{
                                        this.numberOfSales = sales.length;
                                        this.numberOfPages = Math.ceil(this.numberOfSales / this.pageSize);
                                    })
  }
  public goToQuickSale(id:number):void{
      this.router.navigate(['/dashboard/sales/newsale'],{queryParams:{quick_sale:id}})

  }

  ngOnInit() {
    this.getQuickSales();
    
  }

}
