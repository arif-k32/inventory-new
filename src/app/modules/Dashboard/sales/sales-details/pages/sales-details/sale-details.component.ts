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

  constructor( private readonly route: ActivatedRoute, private readonly http: SalesHttpService, private readonly productsHttp:ProductsHttpSerice) {}
 
  public addProductName(sale:any){
        for(let item of  sale.items){
              this.productsHttp.getSingleProduct(item.product_id).subscribe((product:any)=>{
                                                                        item.product_name=product.name
                                                                    })
        }
        this.sales=sale;
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
                                  const sale_id = Number(params.get('id'));
                                  this.http.getSaleById(sale_id).subscribe((sale:any)=> {this.addProductName(sale)} )
                                });
  }
}
