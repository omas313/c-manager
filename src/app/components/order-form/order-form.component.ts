import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Customer } from '../../models/customer';
import { OrderItem } from '../../models/order-item';
import { CustomerService } from '../../services/customer.service';
import { Observable } from 'rxjs/Observable';
import { Order } from '../../models/order';
import { OrderService } from '../../services/order.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit, OnDestroy {

  form: FormGroup;
  customers: Customer[];
  filteredNames: string[];

  customersSub: Subscription;
  inputSub: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private customerService: CustomerService,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.customersSub = this.customerService.getAll()
      .subscribe(c => {
        this.customers = c;
        this.filteredNames = this.customers.map(customer => customer.fullName);
      });

    this.form = this.fb.group({
      customerNameFilter: [''],
      customer: ['', Validators.required],
      items: this.fb.array([], Validators.required)
    });

    this.inputSub = this.customerNameFilter.valueChanges
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe(name => this.filterFor(name));
  }

  filterFor(name: string) {
    console.log("filtering for", name);
    if (!name) return this.customers.map(c => c.fullName);
    
    this.filteredNames = this.customers
      .map(c => c.fullName.toLowerCase())
      .filter(n => n.indexOf(name.toLowerCase()) !== -1);

    if (this.filteredNames.length > 0)
      this.customer.setValue(this.filteredNames[0]);
    else
      this.customer.setValue("Choose a customer");
    console.log("names", this.filteredNames);
  }
  

  addItem() {
    this.items.push(this.itemForm);
  }

  removeItemAt(i) {
    this.items.removeAt(i);
  }

  private get itemForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      quantity: ['', [Validators.required, Validators.min(1)]],
    });
  }

  submit() {
    const data = this.form.value;
    const customer = this.customers
      .find(c => c.fullName.toLowerCase() === data.customer.toLowerCase());

    if (!customer) {
      console.log("Failed to find customer with this name:", data.customer);
      return;
    }

    const order = new Order({
      customerId: customer.key,
      customerName: customer.fullName,
      date: Date.now(),
      items: data.items
    });

    this.orderService.add(order);
    this.router.navigateByUrl("/orders");
  }

  // Helpers

  get customer(): FormControl { return this.form.get("customer") as FormControl; }
  get customerNameFilter(): FormControl { return this.form.get("customerNameFilter") as FormControl; }
  get items(): FormArray { return this.form.get("items") as FormArray; }
  getItemAt(i): FormGroup { return this.items.controls[i] as FormGroup; }
  getItemNameAt(i): FormControl { return this.getItemAt(i).get("name") as FormControl; }
  getItemPriceAt(i): FormControl { return this.getItemAt(i).get("price") as FormControl; }
  getItemQuantityAt(i): FormControl { return this.getItemAt(i).get("quantity") as FormControl; }

  getItemTotalPriceAt(i): number { 
    return this.getItemPriceAt(i).value * this.getItemQuantityAt(i).value; 
  }

  getItemsTotalPrice(): number {
    return this.items.controls.length === 0 ? 0 :
      this.items.controls
        .map(c => this.getItemTotalPriceAt(this.items.controls.indexOf(c)))
        .reduce((prev, curr, i, a) => prev + curr);    
  }

  ngOnDestroy() {
    this.customersSub.unsubscribe();
    this.inputSub.unsubscribe();
  }
}
