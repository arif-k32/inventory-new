import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsHttpSerice } from '@api/Products/products-http.service';
import { SalesHttpService } from '@api/Sales/sales-http.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale-details.component.html',
})

export class SaleComponent implements OnInit {

  public sales!:any;

  constructor( private readonly route: ActivatedRoute, private readonly salesHttpService: SalesHttpService, private readonly productsHttpService:ProductsHttpSerice) {}
 
  public addProductName(sale:any){
        for(let item of  sale.items){
              this.productsHttpService.getSingleProduct(item.product_id).subscribe((product:any)=>{
                                                                        item.product_name=product.name
                                                                    })
        }
        this.sales=sale;
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
                                  const sale_id = Number(params.get('id'));
                                  this.salesHttpService.getSaleById(sale_id).subscribe((sale:any)=> {this.addProductName(sale)} )
                                });
  }
}
