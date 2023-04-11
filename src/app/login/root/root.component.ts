import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { TokenstorageService } from 'src/app/services/tokenstorage.service';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
})
export class RootComponent {
  constructor(
    private router: Router,
    private http: HttpServiceService,
    private tokenStorage: TokenstorageService
  ) {}

  loginform = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', Validators.required),
  });

  public get controls() {
    return this.loginform.controls;
  }

  login() {
    let users: any[];
    this.http.login(this.loginform).subscribe((response: any) => {
      this.tokenStorage.accessToken = response.access_token;
      localStorage.setItem(
        'access_token',
        JSON.stringify(response.access_token)
      );
      this.router.navigate(['/dashboard']);
    });
  }
}
