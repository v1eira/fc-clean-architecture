export default class OrderItem {
  private _id: string;
  private _productID: string;
  private _name: string;
  private _quantity: number;
  private _price: number;

  constructor(id: string, name: string, price: number, productID: string, quantity: number) {
    this._id = id;
    this._productID = productID;
    this._name = name;
    this._quantity = quantity;
    this._price = price;
  }

  get id(): string {
    return this._id;
  }

  get productID(): string {
    return this._productID;
  }

  get name(): string {
    return this._name;
  }

  get quantity(): number {
    return this._quantity;
  }

  get price(): number {
    return this._price;
  }

  orderItemTotal(): number {
    return this._price * this._quantity;
  }
}