import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClientsHttpService } from '@api/Clients/clients-http.service';
import { IClient } from '@interfaces/clients/clients.interface';
import { AddDataResponseService } from '@services/add-data-response.service';
import { Toastr } from '@services/toastr.service';
import { Observable, Subscription } from 'rxjs';
import * as Papa from 'papaparse';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
})
export class ClientsComponent implements OnInit {

  public clients$!: Observable<IClient[]>;
  public currentPage = 1;
  public numberOfPages!: number;
  public numberOfClients!: number;
  public pageSize = 5;

  public editMode = false;
  public updateClientForm = new FormGroup({
                                    id:         new FormControl(0),
                                    first_name: new FormControl('', Validators.required),
                                    last_name:  new FormControl('', Validators.required),
                                    address:    new FormControl('', Validators.required),
                                    city:       new FormControl('', Validators.required),
                                    state:      new FormControl('', Validators.required),
                                    country:    new FormControl('', Validators.required),
                                    phone:      new FormControl('', Validators.required),
                                    email:      new FormControl('', Validators.required),
                                    created_at: new FormControl('', Validators.required),
                                    updated_at: new FormControl('', Validators.required)
                                  });
  public addClient = false;

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
        this.clients$.subscribe((clients: IClient[]) => {
                        this.numberOfClients = clients.length;
                        this.numberOfPages = Math.ceil(this.numberOfClients / this.pageSize);
                      });
  }

  public importFiles(event:any):void{
      let file= event.target.files[0];
      let fileToUpload:FormData = new FormData();
      fileToUpload.append('csv', file, file.name)
      this.http.imoportClients(fileToUpload).subscribe((response:boolean)=>{
                                                        if(response){   
                                                            this.toastr.showtoast('success','file uploaded successfully');
                                                            this.getClients();
                                                        }
                                                      })
  }
  public exportFiles():void{
      this.http.getAllClients().subscribe((response:IClient[])=>{
                                                      const csv = Papa.unparse(response);
                                                      const blob = new Blob([csv], {type:'text/csv'});
                                                      const url = window.URL.createObjectURL(blob);
                                                      const a = document.createElement('a');
                                                      a.setAttribute('hidden','');
                                                      a.setAttribute('href',url);
                                                      a.setAttribute('download','clients.csv');
                                                      document.body.appendChild(a);
                                                      a.click();
                                                      document.body.removeChild(a);
                                                      window.URL.revokeObjectURL(url);
                                                })
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
