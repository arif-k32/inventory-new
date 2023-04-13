import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SalesHttpService {
  public url: string = 'https://api-sales-app.josetovar.dev';
  constructor(private http: HttpClient) {}
  
  
  /////////////////////////  sales  ////////////////////////////

  public getAllSales(){
      return this.http.get(`${this.url}/sales`)
  }
  public getSaleById(sale_id:number){
      return this.http.get(`${this.url}/sales/${sale_id}`)
  }
  public createSale(sale:any){
      return this.http.post(`${this.url}/sales`, sale);
  }
  /////////////////  quick sales /////////////////////////////

  public getAllQuickSales(){
      return this.http.get(`${this.url}/quick-sales`);
  }

  public createQuickSale(quick_sale:any){
      return this.http.post(`${this.url}/quick-sales`,quick_sale);
  }  

  public getQuickSaleById(quickSaleId:number){
      return this.http.get(`${this.url}/quick-sales/${quickSaleId}`)
  }

}
