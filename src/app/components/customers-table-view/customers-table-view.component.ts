import { Component, Input } from '@angular/core';
import { Customer } from '../../models/customer';

@Component({
  selector: 'app-customers-table-view',
  templateUrl: './customers-table-view.component.html',
  styleUrls: ['./customers-table-view.component.css']
})
export class CustomersTableViewComponent {

  @Input("customers") customers: Customer[];
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

    this.customers = this.customers.sort((c1, c2) => {
      // get lower cased titles
      const t1 = c1[property].toLowerCase();
      const t2 = c2[property].toLowerCase();

      // sort string ascending
      if (t1 < t2) return this.sortAscending ? -1 : 1;
      if (t1 > t2) return this.sortAscending ? 1 : -1;
      // no sorting
      return 0;
    });
  }

}
