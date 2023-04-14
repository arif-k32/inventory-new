import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SalesHttpService } from '@api/Sales/sales-http.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
})
export class OverviewComponent implements OnInit {

  public quickSales:any[]=[];

  constructor(private readonly http:SalesHttpService,private readonly router:Router){}

  public goToQuickSale(id:number){
        this.router.navigate(['/dashboard/sales/newsale'],{queryParams:{quick_sale:id}})

  }

  ngOnInit(): void {
          this.http.getAllQuickSales().subscribe((sales:any )=>  { this.quickSales=sales})
  }

}
