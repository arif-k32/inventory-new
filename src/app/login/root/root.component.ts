import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { IsloggedinService } from 'src/app/services/isloggedin.service';
import { TokenstorageService } from 'src/app/services/tokenstorage.service';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent {
  constructor(
    private router: Router,
    private http: HttpServiceService,
    private isloggedinService: IsloggedinService,
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
      this.isloggedinService.isloggedin = true;
      localStorage.setItem(
        'access_token',
        JSON.stringify(response.access_token)
      );
      this.router.navigate(['/dashboard']);
    });
  }
}
