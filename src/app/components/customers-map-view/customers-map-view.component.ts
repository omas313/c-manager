import { Component, Input } from '@angular/core';
import { Customer } from '../../models/customer';

@Component({
  selector: 'app-customers-map-view',
  templateUrl: './customers-map-view.component.html',
  styleUrls: ['./customers-map-view.component.css']
})
export class CustomersMapViewComponent {

  @Input("customers") customers: Customer[];

  visibleCard = false;
  cardCustomer: Customer;

  clickedMarker(c: Customer) {
    this.cardCustomer = c;
    this.visibleCard = true;
  }

  get customersWithLocation() {
    return this.customers.filter(c => c.hasLocation);
  }
  
}
