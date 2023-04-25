import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SalesHttpService } from '@api/Sales/sales-http.service';
import { ISale } from '@interfaces/sales/sales.interface';

@Component({
  selector: 'app-allsales',
  templateUrl: './all-sales.component.html',
})
export class AllsalesComponent implements OnInit {
  public sales$!:Observable<ISale[]>;
  
  
  public currentPage=1;
  public numberOfSales!:number;
  public numberOfPages!: number;
  public pageSize=5;

  

  constructor(private readonly salesHttpService:SalesHttpService){}

  public pagination(updatedPagination: { currentPage: number; pageSize: number }):void {
                this.currentPage = updatedPagination.currentPage;
                this.pageSize = updatedPagination.pageSize;
                this.numberOfPages = Math.ceil(this.numberOfSales / this.pageSize);
  }
  
  public getSales():void{
    this.sales$= this.salesHttpService.getAllSales();
    this.sales$.subscribe((sales:ISale[])=>{
                                    this.numberOfSales = sales.length;
                                    this.numberOfPages = Math.ceil(this.numberOfSales / this.pageSize);
                                })
  }
 

  ngOnInit(){
      this.getSales();
  }
  

}
