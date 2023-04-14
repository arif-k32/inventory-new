import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from 'src/app/Shared/Interfaces/products/products.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsHttpSerice {
  private url: string = 'https://api-sales-app.josetovar.dev';
  constructor(private http: HttpClient) {}
  
  public getSingleProduct(id: number) {
      return this.http.get(`${this.url}/products/${id}`);
  }

  public deleteProduct(id: number) {
      return this.http.delete(`${this.url}/products/${id}`);
  }
  
  public updateProduct(details: IProduct) {
      return this.http.put(`${this.url}/products`, details);
  }
  public getProducts() {
      return this.http.get(`${this.url}/products`);
  }
  public updateProductActive(id: number, state: boolean) {
      return this.http.put(`${this.url}/products/status/${id}?status=${state}`, {});
  }
  public createProduct(product: IProduct) {
      return this.http.post(`${this.url}/products`, product);
  }

  
}
