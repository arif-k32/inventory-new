import { IClient } from "@interfaces/clients/clients.interface";

export interface ISale {

    client:IClient,
    created_at:string,
    id:number,
    items:{
            created_at:string,
            id:number,
            price:number,
            product_id:number,
            quantity:number,
            sale_id:number
          }[],
    total:number

}


export interface IQuickSale {
    created_at:string,
    id:number,
    name:string,
    products:{
                active:boolean,
                created_at:string,
                id:number,
                name:string,
                price:number,
                sku:string,
                stock:number,
                updated_at:string

             }[]
    updated_at:string

}