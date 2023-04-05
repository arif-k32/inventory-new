import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor() { }

  

  public products_state!:{
                           products$:Observable<any>,
                           filters_active:string,
                           filters_stock:string,
                           currentPage:number,
                           numberOfProducts: number,
                           numberOfPages: number,
                           pageSize: number,
                           addProduct:boolean,
                           productsForm:FormGroup

                          }

  public clients_state!:{ 
                            clients$:Observable<any>,
                            currentPage:number,
                            numberOfPages: number,
                            numberOfClients: number,
                            pageSize:number,
                            editMode:boolean,
                            updateClientForm:FormGroup,
                            addClient:boolean,

                          }
  
  
  public newSale_state!:{
                            selectedClient:any,
                            salesForm:FormGroup,
                            searchingClients:boolean,
                            searchingProducts:boolean
                          }
  public allsale_state!:{
                            sales:any[],
                            currentPage:number,
                            numberOfPages: number,
                            numberOfSales: number,
                            pageSize:number,

                          }
  

}
