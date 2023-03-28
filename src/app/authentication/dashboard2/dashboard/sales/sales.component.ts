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
  


  constructor(private http:HttpServiceService){}
  
  getSales(){
    this.sales$= this.http.getAllSales();
  }

  ngOnInit(){
    this.getSales();
  }

  

}
