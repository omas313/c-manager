import { Component, Input } from '@angular/core';
import { Customer } from '../../models/customer';

@Component({
  selector: 'app-customers-card-view',
  templateUrl: './customers-card-view.component.html',
  styleUrls: ['./customers-card-view.component.css']
})
export class CustomersCardViewComponent {
  
  @Input("customers") customers: Customer[];
  @Input("paginatedIndices") paginatedIndices: number[];

}
