import { EventEmitter, Component, Input, OnChanges, Output } from '@angular/core';
import { Customer } from '../../models/customer';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnChanges {

  @Input("customer") customer: Customer;
  @Output("formSubmit") formSubmit = new EventEmitter();

  setLocation = false;

  ngOnChanges(changes) {
    if (this.customer.hasLocation) this.setLocation = true;
  }

  clickedMap(event) {
    this.customer.location = {
      latitude: event.coords.lat,
      longitude: event.coords.lng
    };   
  }

  submit() {
    if (!this.setLocation) delete this.customer.location;
    this.formSubmit.emit(null);
  }

}
