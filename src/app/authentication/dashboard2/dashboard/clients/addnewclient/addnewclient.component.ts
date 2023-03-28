import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddDataResponseService } from 'src/app/services/add-data-response.service';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-addnewclient',
  templateUrl: './addnewclient.component.html',
})
export class AddnewclientComponent {
  newClientForm = new FormGroup({
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
  });
  constructor(
    private http: HttpServiceService,
    private addClientSubject: AddDataResponseService
  ) {}

  addClient() {
    if (this.newClientForm.valid) {
      this.http
        .registerClient(this.newClientForm.value)
        .subscribe((resp: any) => {
          this.newClientForm.reset();
          this.addClientSubject.onAddClient('success');
        });
    } else this.addClientSubject.onAddClient('error');
  }
}
