import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor() { }

  
  public newSale_state!:{
                            selectedClient:any,
                            salesForm:FormGroup,
                            searchingClients:boolean,
                            searchingProducts:boolean
                          }

}
