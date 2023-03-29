import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
})

export class SaleComponent implements OnInit {

  sales!:any;

  constructor( private route: ActivatedRoute, private http: HttpServiceService) {}


  getSingleProductName(product_id:number){
    console.log(product_id)
    // this.http.getSingleProduct(product_id).subscribe((product:any)=> {return product.name; })
  }
  addProductName(sale:any){
        for(let item of  sale.items){
              this.http.getSingleProduct(item.product_id).subscribe((product:any)=>{
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
