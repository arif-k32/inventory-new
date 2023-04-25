import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddDataResponseService } from '@services/add-data-response.service';
import { ClientsHttpService } from '@api/Clients/clients-http.service';

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
          private readonly clientsHttpService: ClientsHttpService,
          private readonly addClientSubject: AddDataResponseService,
          private readonly route:ActivatedRoute,
          private readonly router:Router
  ) {}

  public addClient():void {
          if (this.newClientForm.valid) {
                  this.clientsHttpService.registerClient(this.newClientForm.value).subscribe((resp: any) => {
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
