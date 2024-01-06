import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html',
  styles: ``
})
export class ProductsHeaderComponent {
  @Output() columnsCountChange = new EventEmitter<number>();
  @Output() itemsCountChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<string>();
  sort = 'desc';
  itemShowCount = 12;

  onSortUpdate(newSort: string) {
    this.sort = newSort;
    this.sortChange.emit(newSort);
  }

  onItemsUpdated(count: number) {
    this.itemShowCount = count;
    this.itemsCountChange.emit(count);
  }

  onColumnsUpdate(colsNum: number) {
    this.columnsCountChange.emit(colsNum);
  }
}
