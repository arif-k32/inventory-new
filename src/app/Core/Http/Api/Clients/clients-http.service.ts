import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IClient } from 'src/app/Shared/Interfaces/clients/clients.interface';

@Injectable({
  providedIn: 'root',
})
export class ClientsHttpService {

  public url: string = 'https://api-sales-app.josetovar.dev';
  constructor(private http: HttpClient) {}

  public getAllClients():Observable<IClient[]> {
      return this.http.get<IClient[]>(`${this.url}/clients`);
  }
  public registerClient(client: any) {
      return this.http.post(`${this.url}/clients`, client);
  }
  public updateClient(client: any) {
      return this.http.put(`${this.url}/clients`, client);
  }
  deleteClient(clientId: number) {
      return this.http.delete(`${this.url}/clients/${clientId}`);
  }
  imoportClients(file:FormData):Observable<boolean>{
    return this.http.post<boolean>(`${this.url}/clients/import`,file).pipe(map( ()=>{return true;}));
  }

}
