import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { Toastr } from 'src/app/services/toastr.service'

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent {
  constructor(private router: Router, private http: HttpServiceService,private readonly toastr:Toastr ) {}
  registerform = new FormGroup({
    id: new FormControl(0),
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  register() {
    if(!this.registerform.valid){
          this.toastr.showtoast('error','inputs are invalid')
          return;
    }
    this.http.registerUser(this.registerform).subscribe((response) => {
      console.log(response);
      this.router.navigate(['/login']);
    });
  }
}
