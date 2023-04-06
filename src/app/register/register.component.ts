import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpServiceService } from '../services/http-service.service';
import { Toastr } from 'src/app/services/toastr.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(private router: Router, private http: HttpServiceService, private readonly toastr:Toastr) {}
  registerform = new FormGroup({
    id: new FormControl(0),
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  register() {
    if(!this.registerform.valid){
          this.toastr.showtoast('error','Inputs not valid');
          return;
    }
    this.http.registerUser(this.registerform).subscribe((response) => {
      console.log(response);
      this.router.navigate(['/login']);
    });
  }
}
