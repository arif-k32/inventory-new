import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataStorageService } from '@services/data-storage.service';
import { HttpServiceService } from '@services/http-service.service';

@Component({
  selector: 'app-allsales',
  templateUrl: './allsales.component.html',
})
export class AllsalesComponent implements OnInit {
  sales$!:Observable<any>;
  
  
  currentPage=1;
  numberOfSales!:number;
  numberOfPages!: number;
  pageSize=5;

  

  constructor(private http:HttpServiceService, private readonly dataStorage:DataStorageService){}

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
