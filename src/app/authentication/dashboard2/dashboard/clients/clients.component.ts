import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AddDataResponseService } from 'src/app/services/add-data-response.service';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { Toastr } from 'src/app/services/toastr.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit,OnDestroy {
  clients$!: Observable<any>;
  currentPage = 1;
  numberOfPages!: number;
  numberOfClients!: number;
  pageSize = 5;

  editMode = false;
  updateClientForm = new FormGroup({
    id: new FormControl(''),
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
    private http: HttpServiceService,
    private toastr: Toastr,
    private addClientSubject: AddDataResponseService,
    private router:Router,
    private route:ActivatedRoute,
    private readonly dataStorage:DataStorageService
  ) {}

  showAddClient() {
    this.addClient = !this.addClient;
  }

  public addClinetsSubscription: Subscription = this.addClientSubject
    .addClientResponse()
    .subscribe((response: string) => {
      this.addClientResponse(response);
    });

  addClientResponse(response: string) {
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

  cancelEditClient() {
    this.editMode = false;
  }
  editClient(client: any) {
    this.updateClientForm.setValue(client);
    this.editMode = true;
  }
  updateClient() {
    if (this.updateClientForm.valid) {
      this.http
        .updateClient(this.updateClientForm.value)
        .subscribe((response: any) => {
          this.editMode = false;
          this.toastr.showtoast('success', 'client updated');
          this.getClients();
        });
    } else this.toastr.showtoast('error', 'data not valid');
  }

  deleteclient(clientid: number) {
    this.http.deleteClient(clientid).subscribe((response: any) => {
      if (response) {
        this.toastr.showtoast('success', 'client deleted');
        this.getClients();
      } else this.toastr.showtoast('error', 'client not deleted');
    });
  }
  pagination(updatedPagination: { currentPage: number; pageSize: number }) {
    this.currentPage = updatedPagination.currentPage;
    this.pageSize = updatedPagination.pageSize;
    this.numberOfPages = Math.ceil(this.numberOfClients / this.pageSize);
  }
  paginationChange(changes: any) {
    console.log(changes);
  }

  getClients() {
    this.clients$ = this.http.getAllClients();
    this.clients$.subscribe((clients: any) => {
      this.numberOfClients = clients.length;
      this.numberOfPages = Math.ceil(this.numberOfClients / this.pageSize);
    });
  }
  onResume(){
    const previous_state = this.dataStorage.clients_state;
    if(previous_state){
      
      this.currentPage=previous_state.currentPage;
      this.pageSize=previous_state.pageSize;
      this.editMode=previous_state.editMode;
      this.updateClientForm=previous_state.updateClientForm;
      this.addClient=previous_state.addClient;
      this.clients$=previous_state.clients$;
      this.numberOfClients=previous_state.numberOfClients;
      this.numberOfPages=previous_state.numberOfPages;
    }
    else{
      this.getClients();
    }
  }

  ngOnInit() {
    this.onResume();
    this.route.queryParams.subscribe((params:{[source:string]:string})=>{
      if(params['source']){
        this.addClient=true;
      }
    })
      
  }
  ngOnDestroy(): void {
    const current_state={
      clients$:this.clients$,
      currentPage:this.currentPage,
      pageSize:this.pageSize,
      editMode:this.editMode,
      updateClientForm:this.updateClientForm,
      addClient:this.addClient,
      numberOfClients:this.numberOfClients,
      numberOfPages:this.numberOfPages
    }
    this.dataStorage.clients_state=current_state;
  }
}
