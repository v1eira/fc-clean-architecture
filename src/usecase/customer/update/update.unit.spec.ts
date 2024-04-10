import CustomerFactory from '../../../domain/customer/factory/customer.factory'
import Address from '../../../domain/customer/value-object/address'
import UpdateCustomerUseCase from './update.customer.usecase'

const customer = CustomerFactory.createWithAddress(
  'John',
  new Address('Street', 123, 'Zip', 'city'),
)

const input = {
  id: customer.id,
  name: 'John Updated',
  address: {
    street: 'Street Updated',
    city: 'City Updated',
    number: 1234,
    zip: 'Zip Updated',
  },
}

const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
  }
}

describe('Unit test update customer use case', () => {
  it('should update a customer', async () => {
    const customerRepository = MockRepository()
    const updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository)
    const output = await updateCustomerUseCase.execute(input)
    expect(output).toEqual({
      id: expect.any(String),
      name: 'John Updated',
      address: {
        street: 'Street Updated',
        city: 'City Updated',
        number: 1234,
        zip: 'Zip Updated',
      },
    })
  })
})
