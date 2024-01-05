import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html',
  styles: ``
})
export class ProductsHeaderComponent {
  @Output() columnsCountChange = new EventEmitter<number>();
  sort = 'desc';
  itemShowCount = 12;

  onSortUpdate(newSort: string) {
    this.sort = newSort;
  }

  onItemsUpdated(count: number) {
    this.itemShowCount = count;
  }

  onColumnsUpdate(colsNum: number) {
    this.columnsCountChange.emit(colsNum);
  }
}
