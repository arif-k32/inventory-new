import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HttpServiceService {
  url: string = 'https://api-sales-app.josetovar.dev';
  constructor(private http: HttpClient, private router: Router) {}
  getSingleProduct(id: number) {
    return this.http.get(`${this.url}/products/${id}`);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.url}/products/${id}`);
  }
  login(loginform: FormGroup) {
    return this.http.post(`${this.url}/login`, loginform.value);
  }

  registerUser(registerform: FormGroup) {
    return this.http.post(`${this.url}/users`, registerform.value);
  }
  updateProduct(id: string, details: any) {
    return this.http.put(`${this.url}/products`, details);
  }
  getProducts() {
    return this.http.get(`${this.url}/products`);
  }
  updateProductActive(id: number, state: boolean) {
    this.http
      .put(`${this.url}/products/status/${id}?status=${state}`, {})
      .subscribe();
  }
  createProduct(product: any) {
    return this.http.post(`${this.url}/products`, product);
  }

  ///////////////////////////////////////////////////////////////////////

  getAllClients() {
    return this.http.get(`${this.url}/clients`);
  }
  registerClient(client: any) {
    return this.http.post(`${this.url}/clients`, client);
  }
  updateClient(client: any) {
    return this.http.put(`${this.url}/clients`, client);
  }
  deleteClient(clientId: number) {
    return this.http.delete(`${this.url}/clients/${clientId}`);
  }
  //////////////////////////////////////////////////////////////

  getAllSales(){
    return this.http.get(`${this.url}/sales`)
  }
  getSaleById(sale_id:number){
    return this.http.get(`${this.url}/sales/${sale_id}`)
  }
  createSale(sale:any){
    return this.http.post(`${this.url}/sales`, sale)
  }
}
