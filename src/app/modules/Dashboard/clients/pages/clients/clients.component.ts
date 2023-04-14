import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AddDataResponseService } from 'src/app/Shared/Services/add-data-response.service';
import { Toastr } from 'src/app/Shared/Services/toastr.service';
import { Observable, Subscription } from 'rxjs';
import { ClientsHttpService } from 'src/app/Core/Http/Api/Clients/clients-http.service';
import { IClient } from 'src/app/Shared/Interfaces/clients/clients.interface';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
})
export class ClientsComponent implements OnInit {

  public clients$!: Observable<any>;
  public currentPage = 1;
  public numberOfPages!: number;
  public numberOfClients!: number;
  public pageSize = 5;

  editMode = false;
  updateClientForm = new FormGroup({
                                    id: new FormControl(0),
                                    first_name: new FormControl('', Validators.required),
                                    last_name: new FormControl('', Validators.required),
                                    address: new FormControl('', Validators.required),
                                    city: new FormControl('', Validators.required),
                                    state: new FormControl('', Validators.required),
                                    country: new FormControl('', Validators.required),
                                    phone: new FormControl('', Validators.required),
                                    email: new FormControl('', Validators.required),
                                    created_at: new FormControl('',Validators.required),
                                    updated_at: new FormControl('',Validators.required)
                                  });
  addClient = false;

  constructor(
            private readonly http: ClientsHttpService,
            private readonly toastr: Toastr,
            private readonly addClientSubject: AddDataResponseService,
            private readonly route:ActivatedRoute,
  ) {}

  public showAddClient():void {
       this.addClient = !this.addClient;
  }

  public addClinetsSubscription: Subscription = this.addClientSubject.addClientResponse().subscribe((response: string) => {
                                                                                            this.addClientResponse(response);
                                                                                          });

  public addClientResponse(response: string):void {
              switch (response) {
                    case 'success':
                          this.toastr.showtoast(response, 'client added successfully');
                          this.getClients();
                          break;
                    case 'error':
                          this.toastr.showtoast(response, 'data not valid');
                          break;
              }
  }

  public cancelEditClient():void {
      this.editMode = false;
  }
  public editClient(client: IClient):void {
        this.updateClientForm.setValue(client);
        this.editMode = true;
  }
  public updateClient():void {
        if (this.updateClientForm.valid) {
              this.http.updateClient(this.updateClientForm.value).subscribe((response: any) => {
                                                                      this.editMode = false;
                                                                      this.toastr.showtoast('success', 'client updated');
                                                                      this.getClients();
                                                                    });
        }
        else
            this.toastr.showtoast('error', 'data not valid');
  }

  public deleteClient(clientid: number):void {
        this.http.deleteClient(clientid).subscribe((response: any) => {
                                                if (response) {
                                                      this.toastr.showtoast('success', 'client deleted');
                                                      this.getClients();
                                                }
                                                else
                                                    this.toastr.showtoast('error', 'client not deleted');
                                          });
  }
  public pagination(updatedPagination: { currentPage: number; pageSize: number }):void {
        this.currentPage = updatedPagination.currentPage;
        this.pageSize = updatedPagination.pageSize;
        this.numberOfPages = Math.ceil(this.numberOfClients / this.pageSize);
  }
  

  private getClients():void {
        this.clients$ = this.http.getAllClients();
        this.clients$.subscribe((clients: any) => {
                        this.numberOfClients = clients.length;
                        this.numberOfPages = Math.ceil(this.numberOfClients / this.pageSize);
                      });
  }
  

  ngOnInit() {
    this.getClients();
    this.route.queryParams.subscribe((params:{[source:string]:string})=>{
                              if(params['source']){
                                this.addClient=true;
                              }
                            })
      
  }
 
}
