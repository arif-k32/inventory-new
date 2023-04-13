import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddDataResponseService } from 'src/app/Shared/Services/add-data-response.service';
import { ClientsHttpService } from 'src/app/Core/Http/Api/Clients/clients-http.service';

@Component({
  selector: 'app-addnewclient',
  templateUrl: './add-new-client.component.html',
})
export class AddnewclientComponent {
  public newClientForm = new FormGroup({
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
          private readonly http: ClientsHttpService,
          private readonly addClientSubject: AddDataResponseService,
          private readonly route:ActivatedRoute,
          private readonly router:Router
  ) {}

  public addClient() {
          if (this.newClientForm.valid) {
                  this.http.registerClient(this.newClientForm.value).subscribe((resp: any) => {
                                                                        this.newClientForm.reset();
                                                                        this.addClientSubject.onAddClient('success');
                                                                      });
                  this.route.queryParams.subscribe((params:{[source:string]:string})=>{
                                            if(params['source'])
                                              this.router.navigate(['/dashboard/sales/newsale'])
                                          })
          }
          else 
              this.addClientSubject.onAddClient('error');
  }
}
