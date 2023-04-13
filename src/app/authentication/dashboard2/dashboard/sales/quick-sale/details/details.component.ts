import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SalesHttpService } from 'src/app/Core/Http/Api/Sales/sales-http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
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
