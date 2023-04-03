import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit{


  sales$!:Observable<any>;
  
  
  currentPage=1;
  numberOfSales!:number;
  numberOfPages!: number;
  pageSize=5;

  constructor(private http:HttpServiceService){}

  pagination(updatedPagination: { currentPage: number; pageSize: number }) {
                this.currentPage = updatedPagination.currentPage;
                this.pageSize = updatedPagination.pageSize;
                this.numberOfPages = Math.ceil(this.numberOfSales / this.pageSize);
  }
  
  getSales(){
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
