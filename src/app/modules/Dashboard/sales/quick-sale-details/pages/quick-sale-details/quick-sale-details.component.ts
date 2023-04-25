import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SalesHttpService } from '@api/Sales/sales-http.service';
import { IQuickSale } from '@interfaces/sales/sales.interface';

@Component({
  selector: 'app-details',
  templateUrl: './quick-sale-details.component.html',
})
export class DetailsComponent {
  public sales!:IQuickSale;

  constructor( private readonly route: ActivatedRoute, private readonly salesHttpService: SalesHttpService) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
                                  const sale_id = Number(params.get('id'));
                                  this.salesHttpService.getQuickSaleById(sale_id).subscribe(sale=>this.sales=sale)
                                });
  }
}
