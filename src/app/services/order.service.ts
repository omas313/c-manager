import 'rxjs/add/operator/take';

import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Order } from '../models/order';

@Injectable()
export class OrderService {

  private dbId: string;

  constructor(private db: AngularFireDatabase) { }

  private get url(): string {
    return `/databases/${this.dbId}/orders`;
  }

  getAll(): Observable<Order[]> {
    if (!this.canAccessDb()) return Observable.of(null);
    
    return this.db.list(this.url)
      .snapshotChanges()
      .map(orders => {
        return orders.map(c => new Order({ key: c.key, ...c.payload.val() }));
      });
  }

  get(id): Observable<Order> {
    if (!this.canAccessDb()) return Observable.of(null);
    
    return this.db.object(this.url + `/${id}`)
      .snapshotChanges()
      .map(c => new Order({ key: c.key, ...c.payload.val() }));
  }

  getOrdersForCustomer(id): Observable<Order[]> {
    if (!this.canAccessDb()) return Observable.of(null);
    
    return this.db.list(this.url, ref => ref.orderByChild("customerId").equalTo(id))
      .snapshotChanges()
      .map(orders => {
        return orders.map(c => new Order({ key: c.key, ...c.payload.val() }));
      });
  }
  
  add(order: Order) {
    if (!this.canAccessDb()) return Observable.of(null);
    
    return this.db.list(this.url).push(order.dbObject);
  }

  update(order: Order) {
    if (!this.canAccessDb()) return Observable.of(null);
    
    return this.db.object(this.url + `/${order.key}`).set(order.dbObject);
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

    console.log("Error:: add() @ OrderService. local storage has no dbId: value: ", this.dbId);
    return false;
  }

}
