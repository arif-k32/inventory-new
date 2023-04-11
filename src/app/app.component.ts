import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenstorageService } from './services/tokenstorage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'route';
  constructor(
    private router: Router,
    private tokenStorage: TokenstorageService
  ) {}

 
}
