import { Sequelize } from "sequelize-typescript";
import CustomerModel from "./customer.model";
import Customer from "../../../../domain/customer/entity/customer";
import CustomerRepository from "./customer.repository";
import Address from "../../../../domain/customer/value-object/address";

describe("Customer repository test", () => {

  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([
      CustomerModel,
    ]);

    await sequelize.sync();
  });

  afterEach(async() => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    customer.changeAddress(new Address("A st.", 1, "60000-000", "Fortaleza"));
    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: "1" } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: "1",
      name: "Customer 1",
      street: "A st.",
      number: 1,
      zipcode: "60000-000",
      city: "Fortaleza",
      active: false,
      rewardPoints: 0,
    });
  });

  it("should update a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    customer.changeAddress(new Address("A st.", 1, "60000-000", "Fortaleza"));
    await customerRepository.create(customer);

    const customerModel1 = await CustomerModel.findOne({ where: { id: "1" } });

    expect(customerModel1.toJSON()).toStrictEqual({
      id: "1",
      name: "Customer 1",
      street: "A st.",
      number: 1,
      zipcode: "60000-000",
      city: "Fortaleza",
      active: false,
      rewardPoints: 0,
    });

    customer.changeName("Customer 2");
    customer.changeAddress(new Address("B st.", 2, "60000-999", "São Paulo"))
    customer.addRewardPoints(10);
    customer.activate();
    await customerRepository.update(customer);

    const customerModel2 = await CustomerModel.findOne({ where: { id: "1" } });

    expect(customerModel2.toJSON()).toStrictEqual({
      id: "1",
      name: "Customer 2",
      street: "B st.",
      number: 2,
      zipcode: "60000-999",
      city: "São Paulo",
      active: true,
      rewardPoints: 10,
    });
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    customer.changeAddress(new Address("A st.", 1, "60000-000", "Fortaleza"));
    customer.activate();
    customer.addRewardPoints(10);
    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: "1" } });

    const foundCustomer = await customerRepository.find("1");

    expect(customerModel.toJSON()).toStrictEqual({
      id: foundCustomer.id,
      name: foundCustomer.name,
      street: foundCustomer.Address.street,
      number: foundCustomer.Address.number,
      zipcode: foundCustomer.Address.zip,
      city: foundCustomer.Address.city,
      active: foundCustomer.isActive(),
      rewardPoints: foundCustomer.rewardPoints,
    });
  });

  it("should throw an error when customer is not found", async () => {
    const customerRepository = new CustomerRepository();

    expect(async () => {
      await customerRepository.find("1");
    }).rejects.toThrow("Customer not found");
  });

  it("should find all customers", async () => {
    const customerRepository = new CustomerRepository();
    const customer1 = new Customer("1", "Customer 1");
    customer1.changeAddress(new Address("A st.", 1, "60000-000", "Fortaleza"));
    customer1.activate();
    customer1.addRewardPoints(10);
    await customerRepository.create(customer1);

    const customer2 = new Customer("2", "Customer 2");
    customer2.changeAddress(new Address("B st.", 2, "60000-999", "São Paulo"));
    await customerRepository.create(customer2);

    const customers = await customerRepository.findAll();

    expect(customers).toHaveLength(2);
    expect(customers).toContainEqual(customer1);
    expect(customers).toContainEqual(customer2);
  });

});