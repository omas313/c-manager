import { OrderItem } from "./order-item";


export class Order {

  key?: string;
  customerId: string;
  customerName: string; 
  date: number;
  items: OrderItem[];

  constructor(dbOrder: any = {}) {
    this.key = dbOrder.key || "";
    this.customerId = dbOrder.customerId || "";
    this.customerName = dbOrder.customerName || "";
    this.date = dbOrder.date || "";
    this.items = dbOrder.items.map(dbItem => new OrderItem(dbItem)) || [];
  }

  get totalPrice(): number {
    return !this.items.length ? 0 :
      this.items.length === 1 ? this.items[0].totalPrice :
        this.items
          .map(i => i.totalPrice)
          .reduce((prev, curr, i, a) => prev + curr);
  }

  get totalQuantity(): number {
    return !this.items.length ? 0 :
      this.items.length === 1 ? this.items[0].quantity :
        this.items
          .map(i => i.quantity)
          .reduce((prev, curr, i, a) => prev + curr);
  }

  get dbObject(): any {
    return {
      customerId: this.customerId,
      customerName: this.customerName,
      date: this.date,
      items: this.items.map(i => i.dbObject),
      totalPrice: this.totalPrice,
      totalQuantity: this.totalQuantity
    };
  }

}
