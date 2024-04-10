import { Sequelize } from 'sequelize-typescript'
import CustomerModel from '../../../infrastructure/customer/repository/sequelize/customer.model'
import CustomerRepository from '../../../infrastructure/customer/repository/sequelize/customer.repository'
import Customer from '../../../domain/customer/entity/customer'
import Address from '../../../domain/customer/value-object/address'
import FindCustomerUseCase from './find.customer.usecase'

const customer = new Customer('123', 'John')
const address = new Address('Street', 123, 'Zip', 'city')
customer.changeAddress(address)

const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
  }
}

describe('Unit test find customers use case', () => {
  it('should find a customer', async () => {
    const customerRepository = MockRepository()
    const usecase = new FindCustomerUseCase(customerRepository)

    const input = {
      id: '123',
    }
    const output = {
      id: '123',
      name: 'John',
      address: {
        street: 'Street',
        city: 'city',
        number: 123,
        zip: 'Zip',
      },
    }
    const result = await usecase.execute(input)
    expect(result).toEqual(output)
  })

  it('should not find a customer', async () => {
    const customerRepository = MockRepository()
    customerRepository.find.mockImplementation(() => {
      throw new Error('Customer not found')
    })
    const usecase = new FindCustomerUseCase(customerRepository)

    const input = {
      id: '123',
    }

    expect(usecase.execute(input)).rejects.toThrow('Customer not found')
  })
})
