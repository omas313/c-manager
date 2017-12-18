import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Customer } from '../../models/customer';
import { CustomerService } from '../../services/customer.service';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {

  customer$: Observable<Customer>;
  orders$: Observable<Order[]>;

  view = "details";
  openOrderId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    if (!id) {
      console.log("No id received @ CustomerDetails page. Value received:", id);
      return;
    }

    this.customer$ = this.customerService.get(id);
    this.orders$ = this.orderService.getOrdersForCustomer(id);

    const orderId = this.route.snapshot.queryParamMap.get("orderId");
    if (!orderId) return;
    this.switchToOrders();
    this.openOrderId = orderId;
  }

  switchToDetails() { this.view = "details"; }
  switchToOrders() { this.view = "orders"; }

  delete(customer: Customer) {
    if (!confirm("Delete " + customer.fullName)) return;

    this.customerService.delete(customer.key);
    this.router.navigateByUrl("/customers");
  }

}
