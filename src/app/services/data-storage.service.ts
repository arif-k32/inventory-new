import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor() { }
  public selectedClient!:any;
  public salesForm!:FormGroup;
}
