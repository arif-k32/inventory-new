import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { HttpServiceService } from './http-service.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardGuard implements CanActivate {
  constructor(private readonly http:HttpServiceService, private readonly router:Router) {}

  getAuth(){
    this.http.auth().subscribe({
                          next:()=>{},
                          error:()=>{
                              this.router.navigate(['/login']);
                              return false;
                          },
                          complete:()=> true,
                      });
  }


  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): any {
    this.getAuth();
   
  }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot):any {
    this.getAuth();
  }
}
