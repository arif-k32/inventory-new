import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthHttpService } from 'src/app/Core/Http/Api/Authentication/auth-http.service';
import { TokenstorageService } from 'src/app/Shared/Services/tokenstorage.service';

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(
    private readonly router: Router,
    private readonly authHttpService: AuthHttpService,
    private readonly tokenStorage: TokenstorageService
  ) {}

  public loginform = new FormGroup({
                              email: new FormControl('', [Validators.required]),
                              password: new FormControl('', Validators.required),
                            });

  public get controls() {
        return this.loginform.controls;
  }

  public login() {
    this.authHttpService.login(this.loginform.value).subscribe((response: any) => {
                                        this.tokenStorage.accessToken = response.access_token;
                                        localStorage.setItem('access_token',JSON.stringify(response.access_token));
      this.router.navigate(['/dashboard']);
    });
  }
}
