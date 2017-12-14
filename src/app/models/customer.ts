
export class Customer {
  key?: string;

  firstName: string;
  lastName: string;
  gender: string;
  address: string;
  city: string;

  constructor(dbCustomer: any) {
    this.key = dbCustomer.key || "";
    this.firstName = dbCustomer.firstName || "";
    this.lastName = dbCustomer.lastName || "";
    this.gender = dbCustomer.gender || "";
    this.address = dbCustomer.address || "";
    this.city = dbCustomer.city || "";
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
