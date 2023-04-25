import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IQuickSale, ISale } from '@interfaces/sales/sales.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class SalesHttpService {
  constructor(private httpClient: HttpClient) {}
  
  
  /////////////////////////  sales  ////////////////////////////

  public getAllSales():Observable<ISale[]>{
      return this.httpClient.get<ISale[]>(`${environment.api}/sales`)
  }
  public getSaleById(sale_id:number):Observable<ISale>{
      return this.httpClient.get<ISale>(`${environment.api}/sales/${sale_id}`)
  }
  public createSale(sale:any){
      return this.httpClient.post(`${environment.api}/sales`, sale);
  }
  /////////////////  quick sales /////////////////////////////

  public getAllQuickSales():Observable<IQuickSale[]>{
      return this.httpClient.get<IQuickSale[]>(`${environment.api}/quick-sales`);
  }

  public createQuickSale(quick_sale:any){
      return this.httpClient.post(`${environment.api}/quick-sales`,quick_sale);
  }  

  public getQuickSaleById(quickSaleId:number):Observable<IQuickSale>{
      return this.httpClient.get<IQuickSale>(`${environment.api}/quick-sales/${quickSaleId}`)
  }
  public updateQuickSale(quick_sale:any){
     return this.httpClient.put(`${environment.api}/quick-sales`,quick_sale);
  }
  public deleteQuickSale(sale_id:number){
     return this.httpClient.delete(`${environment.api}/quick-sales/${sale_id}`);
  }

}
