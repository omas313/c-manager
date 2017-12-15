import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CustomerService } from '../../services/customer.service';
import { customersSeed } from '../../../../data/customers-seed';
import { Customer } from '../../models/customer';
import { Subscription } from 'rxjs/Subscription';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  
  customers: Customer[];
  filteredCustomers: Customer[];
  
  // view change
  view = "table";

  // pagination
  pageLimit = 8;
  currentPage = 1;
  numPages = 1;
  paginatedIndices = [];
  
  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.subscription = this.customerService.getAll()
      .subscribe(cs => {
        this.filteredCustomers = this.customers = cs;
        this.changePage(1);
      });
  }

  switchToTable() { this.view = "table"; }
  switchToCard() { this.view = "card"; }

  filter(search: string) {
    const searchTerm = search.toLowerCase();

    this.filteredCustomers = search ? 
      this.customers
        .filter(c => c.fullName.toLowerCase().indexOf(searchTerm) !== -1) : this.customers;
    this.changePage(1);
  }

  changePage(newPage: number) {
    // update number of total pages since we may have filtered
    this.numPages = Math.ceil(this.filteredCustomers.length / this.pageLimit);
    
    // defensive measures
    if (!this.pageValid(newPage))  
      this.currentPage = 1;
    else
      this.currentPage = newPage;
    
    // calculate start and end indices based on pageLimit & numPages
    const start = this.pageLimit * (this.currentPage - 1);
    // if this is the last page, end at last index, else add in to the limit - 1 since first is included
    const end = this.numPages === this.currentPage ? 
      this.filteredCustomers.length - 1 : start + this.pageLimit - 1;

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


  // TODO: Remove these 
  log(customers) {
    console.log(customers);
  }

  seed() {
    if (confirm("seed database?"))
      customersSeed.forEach(c => this.customerService.add(c));
  }
  removeAll() {
    if (confirm("clear database?"))
      this.customerService.removeAll();
  }

}
