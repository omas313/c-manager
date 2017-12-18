import { Component, Input } from '@angular/core';
import { Order } from '../../models/order';

@Component({
  selector: 'app-orders-table-view',
  templateUrl: './orders-table-view.component.html',
  styleUrls: ['./orders-table-view.component.css']
})
export class OrdersTableViewComponent {

  @Input("orders") orders: Order[];
  @Input("paginatedIndices") paginatedIndices: number[];
  @Input("currentPage") currentPage: number;
  @Input("pageLimit") pageLimit: number;

  sortProperty = "";
  sortAscending = false;

  sort(property) {
    // make sure we start with ascending when we click on another column
    if (this.sortProperty !== property)
      this.sortAscending = true;
    else // if same prop just flip sorting direction
      this.sortAscending = !this.sortAscending;
    this.sortProperty = property;

    this.orders = this.orders.sort((c1, c2) => {
      // get lower cased titles
      const t1 = typeof c1[property] === "string" ? c1[property].toLowerCase() : c1[property];
      const t2 = typeof c2[property] === "string" ? c2[property].toLowerCase() : c2[property];

      // sort string ascending
      if (t1 < t2) return this.sortAscending ? -1 : 1;
      if (t1 > t2) return this.sortAscending ? 1 : -1;
      // no sorting
      return 0;
    });
  }

}
