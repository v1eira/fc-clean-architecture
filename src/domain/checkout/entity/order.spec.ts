import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {

  it("should throw error when id is empty", () => {
    expect(() => {
      let order = new Order("", "123", [])
    }).toThrowError("Id is required");
  });

  it("should throw error when customerId is empty", () => {
    expect(() => {
      let order = new Order("123", "", [])
    }).toThrowError("CustomerId is required");
  });

  it("should throw error when item quantity is zero", () => {
    expect(() => {
      let order = new Order("123", "123", [])
    }).toThrowError("Items are required");
  });

  it("should calculate total", () => {
    const item1 =new OrderItem("1", "Item 1", 100, "p1", 1);
    const order1 = new Order("1", "123", [item1])
    expect(order1.total()).toBe(100);

    const item2 =new OrderItem("2", "Item 2", 200, "p2", 1);
    const order2 = new Order("o2", "123", [item1, item2])
    expect(order2.total()).toBe(300);
  });

  it("should throw error when item quantity is not greater than zero", () => {
    expect(() => {
      const item1 =new OrderItem("1", "Item 1", 100, "p1", 0);
      const order1 = new Order("1", "123", [item1])
    }).toThrowError("ItemQuantity must be greater than zero");
  });

});