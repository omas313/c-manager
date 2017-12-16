import 'rxjs/add/operator/take';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer';

@Component({
  selector: 'app-customer-form-page',
  templateUrl: './customer-form-page.component.html',
  styleUrls: ['./customer-form-page.component.css']
})
export class CustomerFormPageComponent implements OnInit {

  id: string;
  customer = new Customer();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService 
  ) { }


  ngOnInit() {
    // check route for id then init customer
    this.id = this.route.snapshot.paramMap.get("id");
    if (this.id) 
      this.customerService.get(this.id)
        .take(1)
        .subscribe(c => this.customer = c);
  }

  submit() {
    if (this.id)
      this.customerService.update(this.customer);
    else
      this.customerService.add(this.customer);

    this.router.navigateByUrl("/customers");
    // console.log("form submit data: ", this.customer);
  }

}
