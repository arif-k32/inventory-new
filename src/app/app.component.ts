import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IsloggedinService } from './services/isloggedin.service';
import { TokenstorageService } from './services/tokenstorage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'route';
  constructor(
    private router: Router,
    public isloggedinService: IsloggedinService,
    private tokenStorage: TokenstorageService
  ) {}

  logout() {
    // if(this.isloggedinService.isloggedin){
    this.isloggedinService.isloggedin = false;
    this.tokenStorage.accessToken = '';
    this.router.navigate(['home']);
    // }
  }
}
