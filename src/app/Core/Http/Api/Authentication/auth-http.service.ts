import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthHttpService {
  private url: string = 'https://api-sales-app.josetovar.dev';
  
  constructor(private http: HttpClient) {}

  public auth(){
      return this.http.post(`${this.url}/auth`,null)
  }

  public login(loginInfo: any) {
    return this.http.post(`${this.url}/login`, loginInfo);
  }

  public registerUser(registerInfo: any) {
    return this.http.post(`${this.url}/users`, registerInfo);
  }

}
