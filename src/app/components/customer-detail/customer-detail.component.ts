import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Customer } from '../../models/customer';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {

  customer$: Observable<Customer>;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    if (!id) {
      console.log("No id received @ CustomerDetails page. Value received:", id);
      return;
    }

    this.customer$ = this.customerService.get(id);
  }

}
