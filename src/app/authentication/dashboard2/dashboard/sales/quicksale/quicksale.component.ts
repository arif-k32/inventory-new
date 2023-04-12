import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpServiceService } from '@services/http-service.service';

@Component({
  selector: 'app-quicksale',
  templateUrl: './quicksale.component.html',
})
export class QuicksaleComponent {
  quickSales$!:Observable<any>;

  currentPage=1;
  numberOfSales!:number;
  numberOfPages!: number;
  pageSize=5;


  constructor(private readonly http:HttpServiceService, private readonly router:Router){}

  pagination(updatedPagination: { currentPage: number; pageSize: number }) {
    this.currentPage = updatedPagination.currentPage;
    this.pageSize = updatedPagination.pageSize;
    this.numberOfPages = Math.ceil(this.numberOfSales / this.pageSize);
  }

  getQuickSales(){
    this.quickSales$= this.http.getAllQuickSales();
    this.quickSales$.subscribe((sales:any)=>{
                                    this.numberOfSales = sales.length;
                                    this.numberOfPages = Math.ceil(this.numberOfSales / this.pageSize);
                                })
  }
  goToQuickSale(id:number){
    this.router.navigate(['/dashboard/sales/newsale'],{queryParams:{quick_sale:id}})

  }

  ngOnInit() {
    this.getQuickSales();
    
  }

}
