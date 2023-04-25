import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IClient } from 'src/app/Shared/Interfaces/clients/clients.interface';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientsHttpService {

  constructor(private httpClient: HttpClient) {}

  public getAllClients():Observable<IClient[]> {
      return this.httpClient.get<IClient[]>(`${environment.api}/clients`);
  }
  public registerClient(client: any) {
      return this.httpClient.post(`${environment.api}/clients`, client);
  }
  public updateClient(client: any) {
      return this.httpClient.put(`${environment.api}/clients`, client);
  }
  deleteClient(clientId: number) {
      return this.httpClient.delete(`${environment.api}/clients/${clientId}`);
  }
  imoportClients(file:FormData):Observable<boolean>{
    return this.httpClient.post<boolean>(`${environment.api}/clients/import`,file).pipe(map( ()=>{return true;}));
  }

}
