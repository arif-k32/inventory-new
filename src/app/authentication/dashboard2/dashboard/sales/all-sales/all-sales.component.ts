import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SalesHttpService } from 'src/app/Core/Http/Api/Sales/sales-http.service';

@Component({
  selector: 'app-allsales',
  templateUrl: './all-sales.component.html',
})
export class AllsalesComponent implements OnInit {
  public sales$!:Observable<any>;
  
  
  public currentPage=1;
  public numberOfSales!:number;
  public numberOfPages!: number;
  public pageSize=5;

  

  constructor(private readonly http:SalesHttpService){}

  public pagination(updatedPagination: { currentPage: number; pageSize: number }) {
                this.currentPage = updatedPagination.currentPage;
                this.pageSize = updatedPagination.pageSize;
                this.numberOfPages = Math.ceil(this.numberOfSales / this.pageSize);
  }
  
  public getSales(){
    this.sales$= this.http.getAllSales();
    this.sales$.subscribe((sales:any)=>{
                                    this.numberOfSales = sales.length;
                                    this.numberOfPages = Math.ceil(this.numberOfSales / this.pageSize);
                                })
  }
 

  ngOnInit(){
      this.getSales();
  }
  

}
