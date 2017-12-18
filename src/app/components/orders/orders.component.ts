import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { FormControl } from '@angular/forms';
import { Order } from '../../models/order';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  
  orders: Order[];
  filteredOrders: Order[];
  
  // pagination
  pageLimit = 8;
  currentPage = 1;
  numPages = 1;
  paginatedIndices = [];
  
  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.subscription = this.orderService.getAll()
      .subscribe(o => {
        this.filteredOrders = this.orders = o;
        this.changePage(1);
      });
  }

  filter(search: string) {
    const searchTerm = search.toLowerCase();

    this.filteredOrders = search ? 
      this.orders
        .filter(o => o.customerName.toLowerCase().indexOf(searchTerm) !== -1) : this.orders;
    
    this.changePage(1);
  }

  changePage(newPage: number) {
    // update number of total pages since we may have filtered
    this.numPages = Math.ceil(this.filteredOrders.length / this.pageLimit);
    
    // defensive measures
    if (!this.pageValid(newPage))  
      this.currentPage = 1;
    else
      this.currentPage = newPage;
    
    // calculate start and end indices based on pageLimit & numPages
    const start = this.pageLimit * (this.currentPage - 1);
    // if this is the last page, end at last index, else add in to the limit - 1 since first is included
    const end = this.numPages === this.currentPage ? 
      this.filteredOrders.length - 1 : start + this.pageLimit - 1;

    // fill the indices array which we will use to display 
    this.paginatedIndices = [];
    for (let i = start; i <= end; i++) 
      this.paginatedIndices.push(i);
  }

  private pageValid(page) {
    if (page >= 1 && page <= this.numPages) return true;

    if (page < 1)
      console.log("Error: trying to set page < 1. Value obtained: ", page);
    if (page > this.numPages) 
      console.log("Error: trying to set page > total numPages. Value obtained: ", page);
    
    return false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
