import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthHttpService } from 'src/app/Core/Http/Api/Authentication/auth-http.service';
import { Toastr } from 'src/app/Shared/Services/toastr.service';

@Component({
  selector: 'app-root',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  constructor(private readonly router: Router, private readonly authHttpService: AuthHttpService,private readonly toastr:Toastr ) {}
  public registerform = new FormGroup({
                                id: new FormControl(0),
                                first_name: new FormControl('', [Validators.required]),
                                last_name: new FormControl('', [Validators.required]),
                                email: new FormControl('', [Validators.required, Validators.email]),
                                password: new FormControl('', Validators.required),
                              });

  public register() {
    if(!this.registerform.valid){
          this.toastr.showtoast('error','inputs are invalid')
          return;
    }
    this.authHttpService.registerUser(this.registerform.value).subscribe((response) => {
                                                  console.log(response);
                                                  this.router.navigate(['/login']);
                                                });
  }
}
