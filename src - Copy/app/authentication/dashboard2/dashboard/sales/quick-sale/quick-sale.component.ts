import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SalesHttpService } from 'src/app/Core/Http/Api/Sales/sales-http.service';

@Component({
  selector: 'app-quicksale',
  templateUrl: './quick-sale.component.html',
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

  public getQuickSales(){
        this.quickSales$= this.http.getAllQuickSales();
        this.quickSales$.subscribe((sales:any)=>{
                                        this.numberOfSales = sales.length;
                                        this.numberOfPages = Math.ceil(this.numberOfSales / this.pageSize);
                                    })
  }
  public goToQuickSale(id:number){
      this.router.navigate(['/dashboard/sales/newsale'],{queryParams:{quick_sale:id}})

  }

  ngOnInit() {
    this.getQuickSales();
    
  }

}
