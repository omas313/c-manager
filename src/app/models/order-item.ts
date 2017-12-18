
export class OrderItem {

  name: string;
  price: number;
  quantity: number;

  constructor(dbCustomer: any = {}) {
    this.name = dbCustomer.name || "";
    this.price = dbCustomer.price || 0;
    this.quantity = dbCustomer.quantity || 0;
  }

  get dbObject() {
    return {
      name: this.name,
      price: this.price,
      quantity: this.quantity,
      totalPrice: this.totalPrice
    };
  }

  get totalPrice() {
    return this.quantity * this.price;
  }

}
