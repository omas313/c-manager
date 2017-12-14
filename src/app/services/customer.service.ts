import 'rxjs/add/operator/take';

import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Customer } from '../models/customer';

@Injectable()
export class CustomerService {

  private dbId: string;

  constructor(private db: AngularFireDatabase) { }

  getAll(): Observable<Customer[]> {
    if (!this.canAccessDb()) return Observable.of(null);
    
    return this.db.list(`/databases/${this.dbId}/customers`)
    .snapshotChanges()
    .map(customers => {
      return customers.map(c => new Customer({ key: c.key, ...c.payload.val() }));
    });
  }

  get(id): Observable<Customer> {
    if (!this.canAccessDb()) return Observable.of(null);
    
    return this.db.object(`/databases/${this.dbId}/customers/${id}`)
      .snapshotChanges()
      .map(c => new Customer({ key: c.key, ...c.payload.val() }));
  }
  
  add(customer: Customer) {
    if (!this.canAccessDb()) return Observable.of(null);
    
    return this.db.list(`/databases/${this.dbId}/customers`).push(customer);
  }
  
  removeAll() {
    if (!this.canAccessDb()) return Observable.of(null);
    
    return this.db.object(`/databases/${this.dbId}/customers`).remove();
  }

  private canAccessDb() {
    if (this.dbId) return true;
    
    this.dbId = localStorage.getItem("dbId");
    if (this.dbId) return true;

    console.log("Error:: add() @ CustomerService. local storage has no dbId: value: ", this.dbId);
    return false;
  }

}
