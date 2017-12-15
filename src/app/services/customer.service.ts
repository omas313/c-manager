import 'rxjs/add/operator/take';

import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Customer } from '../models/customer';

@Injectable()
export class CustomerService {

  private dbId: string;

  constructor(private db: AngularFireDatabase) { }

  private get url(): string {
    return `/databases/${this.dbId}/customers`;
  }

  getAll(): Observable<Customer[]> {
    if (!this.canAccessDb()) return Observable.of(null);
    
    return this.db.list(this.url)
      .snapshotChanges()
      .map(customers => {
        return customers.map(c => new Customer({ key: c.key, ...c.payload.val() }));
      });
  }

  get(id): Observable<Customer> {
    if (!this.canAccessDb()) return Observable.of(null);
    
    return this.db.object(this.url + `/${id}`)
      .snapshotChanges()
      .map(c => new Customer({ key: c.key, ...c.payload.val() }));
  }
  
  add(customer: Customer) {
    if (!this.canAccessDb()) return Observable.of(null);
    
    return this.db.list(this.url).push(customer.dbObject);
  }

  update(customer: Customer) {
    if (!this.canAccessDb()) return Observable.of(null);
    
    return this.db.object(this.url + `/${customer.key}`).update(customer.dbObject);
  }

  delete(id: string) {
    if (!this.canAccessDb()) return Observable.of(null);
    
    return this.db.object(this.url + `/${id}`).remove();
  }
  
  removeAll() {
    if (!this.canAccessDb()) return Observable.of(null);
    
    return this.db.object(this.url).remove();
  }

  private canAccessDb() {
    if (this.dbId) return true;
    
    this.dbId = localStorage.getItem("dbId");
    if (this.dbId) return true;

    console.log("Error:: add() @ CustomerService. local storage has no dbId: value: ", this.dbId);
    return false;
  }

}
