import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IProduct, ImportProductsResponse } from 'src/app/Shared/Interfaces/products/products.interface';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsHttpSerice {
 
  constructor(private httpClient: HttpClient) {}
  
  public getSingleProduct(id: number) {
      return this.httpClient.get(`${environment.api}/products/${id}`);
  }

  public deleteProduct(id: number) {
      return this.httpClient.delete(`${environment.api}/products/${id}`);
  }
  
  public updateProduct(details: IProduct) {
      return this.httpClient.put(`${environment.api}/products`, details);
  }
  public getProducts():Observable<IProduct[]> {
      return this.httpClient.get<IProduct[]>(`${environment.api}/products`);
  }
  public updateProductActive(id: number, status: boolean) {
      return this.httpClient.put(`${environment.api}/products/status/${id}`, {},{params:{status}});
  }
  public createProduct(product: IProduct) {
      return this.httpClient.post(`${environment.api}/products`, product);
  }
  importProducts(file:FormData):Observable<ImportProductsResponse>{
    return this.httpClient.post<ImportProductsResponse>(`${environment.api}/products/import`,file);
  }

  
}
