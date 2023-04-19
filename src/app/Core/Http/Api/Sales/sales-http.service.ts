import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IQuickSale, ISale } from '@interfaces/sales/sales.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SalesHttpService {
  public url: string = 'https://api-sales-app.josetovar.dev';
  constructor(private http: HttpClient) {}
  
  
  /////////////////////////  sales  ////////////////////////////

  public getAllSales():Observable<ISale[]>{
      return this.http.get<ISale[]>(`${this.url}/sales`)
  }
  public getSaleById(sale_id:number):Observable<ISale>{
      return this.http.get<ISale>(`${this.url}/sales/${sale_id}`)
  }
  public createSale(sale:any){
      return this.http.post(`${this.url}/sales`, sale);
  }
  /////////////////  quick sales /////////////////////////////

  public getAllQuickSales():Observable<IQuickSale[]>{
      return this.http.get<IQuickSale[]>(`${this.url}/quick-sales`);
  }

  public createQuickSale(quick_sale:any){
      return this.http.post(`${this.url}/quick-sales`,quick_sale);
  }  

  public getQuickSaleById(quickSaleId:number):Observable<IQuickSale>{
      return this.http.get<IQuickSale>(`${this.url}/quick-sales/${quickSaleId}`)
  }
  public updateQuickSale(quick_sale:any){
     return this.http.put(`${this.url}/quick-sales`,quick_sale);
  }
  public deleteQuickSale(sale_id:number){
     return this.http.delete(`${this.url}/quick-sales/${sale_id}`);
  }

}
