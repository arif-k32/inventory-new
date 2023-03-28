import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnChanges {
  @Output() paginationChange = new EventEmitter<{
    currentPage: number;
    pageSize: number;
  }>();
  @Input() currentPage!: number;
  @Input() numberOfPages!: number;
  pageSize = '3';
  hide = true;
  button(event: any) {
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
  onPageSizeChange() {
    this.currentPage = 1;
    this.paginationChange.emit({
      currentPage: this.currentPage,
      pageSize: Number(this.pageSize),
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['numberOfPages']) {
      //  this.currentPage=1;
      //  this.paginationChange.emit( { currentPage:this.currentPage, pageSize:Number(this.pageSize)} )
      //  console.log(changes['numberOfPages'])
    }
  }
}
