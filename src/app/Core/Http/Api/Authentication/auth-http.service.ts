import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthHttpService {
  
  constructor(private httpClient: HttpClient) {}

  public auth(){
      return this.httpClient.post(`${environment.api}/auth`,null)
  }

  public login(loginInfo: any) {
    return this.httpClient.post(`${environment.api}/login`, loginInfo);
  }

  public registerUser(registerInfo: any) {
    return this.httpClient.post(`${environment.api}/users`, registerInfo);
  }

}
