import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SalesHttpService } from '@api/Sales/sales-http.service';

@Component({
  selector: 'app-details',
  templateUrl: './quick-sale-details.component.html',
})
export class DetailsComponent {
  public sales!:any;

  constructor( private readonly route: ActivatedRoute, private readonly http: SalesHttpService) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
                                  const sale_id = Number(params.get('id'));
                                  this.http.getQuickSaleById(sale_id).subscribe(sale=>this.sales=sale)
                                });
  }
}
