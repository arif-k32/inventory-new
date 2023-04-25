export interface IProduct {
    active:boolean,
    id:number,
    name:string,
    price:number,
    sku:string,
    stock:number,
}

export interface ImportProductsResponse{
    "Skipped Products":number;
    "Imported Products":number
}