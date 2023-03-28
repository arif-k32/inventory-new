import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss'],
})
export class SaleComponent implements OnInit {
  sales!:any;
  constructor(
    private route: ActivatedRoute,
    private http: HttpServiceService
  ) {}
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const sale_id = Number(params.get('id'));
      this.http.getSaleById(sale_id).subscribe((response:any)=> this.sales = response)
    });
  }
}
