import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpServiceService } from '@services/http-service.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
})
export class DetailsComponent {
  sales!:any;

  constructor( private route: ActivatedRoute, private http: HttpServiceService) {}


 
 
  


  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
                                  const sale_id = Number(params.get('id'));
                                  this.http.getQuickSaleById(sale_id).subscribe(sale=>this.sales=sale)
                                });
  }
}
