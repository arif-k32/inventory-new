import { Pipe, PipeTransform } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';

@Pipe({
  name: 'pagination',
})
export class PaginationPipe implements PipeTransform {
  transform(products: any, currentPage: number, itemsPerPage: number): any {
        const pageStart = (currentPage - 1) * itemsPerPage;
        const pageEnd = pageStart + itemsPerPage;
        return products.pipe( map((product: any) => {
                                  return product.slice(pageStart, pageEnd);
                                })
        );
  }
}
