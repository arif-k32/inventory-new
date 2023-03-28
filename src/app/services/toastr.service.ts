import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class Toastr {
  constructor(private toastr: ToastrService) {}
  public showtoast(status: string, message: string) {
    switch (status) {
      case 'success':
        this.toastr.success(message, 'success', {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'decreasing',
          positionClass: 'toast-bottom-right',
          closeButton: true,
        });
        break;
      case 'error':
        this.toastr.error(message, 'error', {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'decreasing',
          positionClass: 'toast-bottom-right',
          closeButton: true,
        });
        break;
    }
  }
}
