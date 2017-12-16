
export class Customer {
  key?: string;

  firstName: string;
  lastName: string;
  gender: string;
  address: string;
  city: string;
  location?: {
    latitude: string,
    longitude: string
  };

  constructor(dbCustomer: any = {}) {
    this.key = dbCustomer.key || "";
    this.firstName = dbCustomer.firstName || "";
    this.lastName = dbCustomer.lastName || "";
    this.gender = dbCustomer.gender || "";
    this.address = dbCustomer.address || "";
    this.city = dbCustomer.city || "";
    if (dbCustomer.location) {
      this.location = {
        latitude: dbCustomer.location.latitude,
        longitude: dbCustomer.location.longitude
      };
    }
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  get hasLocation() {
    return this.location ? this.location.latitude && this.location.longitude : false;
  }

  get dbObject(): any {
    const object: any = {
      firstName: this.firstName,
      lastName: this.lastName,
      gender: this.gender,
      address: this.address,
      city: this.city
    };
    if (this.location) object.location = this.location;

    return object;
  }

}
