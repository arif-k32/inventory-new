import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
})
export class PaginationComponent  {


  @Output() paginationChange = new EventEmitter<{ currentPage: number,pageSize: number }>();
  @Input() currentPage!: number;
  @Input() numberOfPages!: number;
  @Input() pageSize!:string;


  public button(event: any) {
            const button = event.target.innerText;
            switch (button) {
                  case 'Previous':
                        if (this.currentPage > 1) this.currentPage--;
                        break;
                  case 'Next':
                        if (this.currentPage + 1 <= this.numberOfPages) this.currentPage++;
                        break;
                  default:
                        if (Number(button) <= this.numberOfPages)
                            this.currentPage = Number(button);
            }

            this.paginationChange.emit({
                                          currentPage: this.currentPage,
                                          pageSize: Number(this.pageSize),
                                        });
  }


  public onPageSizeChange() {
    this.currentPage = 1;
    this.paginationChange.emit({
                                  currentPage: this.currentPage,
                                  pageSize: Number(this.pageSize),
                                });
  }
  
}
