import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddDataResponseService {
  private addProductSubject = new Subject<string>();
  private addClientSubject = new Subject<string>();
  onAddProduct(response: string) {
    this.addProductSubject.next(response);
  }
  onAddClient(response: string) {
    this.addClientSubject.next(response);
  }
  addProductResponse(): Observable<string> {
    return this.addProductSubject.asObservable();
  }
  addClientResponse(): Observable<string> {
    return this.addClientSubject.asObservable();
  }
}
