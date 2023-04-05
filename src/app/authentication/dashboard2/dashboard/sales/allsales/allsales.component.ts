import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-allsales',
  templateUrl: './allsales.component.html',
  styleUrls: ['./allsales.component.scss']
})
export class AllsalesComponent implements OnInit, OnDestroy {
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
  onResume(){
    const previous_state = this.dataStorage.allsale_state;
    if(previous_state){
      console.log('ds')
      // this.sales$=previous_state.sales$;
      this.currentPage=previous_state.currentPage;
      this.numberOfPages=previous_state.numberOfPages;
      this.numberOfSales=previous_state.numberOfSales;
      this.pageSize=previous_state.pageSize;
    }
    else{
      this.getSales();
      
    }
  }

  ngOnInit(){
      this.onResume();
  }
  ngOnDestroy(): void {
    const current_state={
      sales$:this.sales$,
      currentPage:this.currentPage,
      numberOfPages:this.numberOfPages,
      numberOfSales:this.numberOfSales,
      pageSize:this.pageSize
    }
    console.log(this.sales$)
    // this.dataStorage.allsale_state=current_state;
  }

}
