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

}
