import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from '@services/http-service.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
})
export class OverviewComponent implements OnInit {

  quickSales:any[]=[];

  constructor(private readonly http:HttpServiceService,private readonly router:Router){}

  goToQuickSale(id:number){
    this.router.navigate(['/dashboard/sales/newsale'],{queryParams:{quick_sale:id}})

  }

  ngOnInit(): void {
    this.http.getAllQuickSales().subscribe((sales:any )=>  { this.quickSales=sales})
  }

}
