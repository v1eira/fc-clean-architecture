import Address from '../value-object/address'
import Customer from './customer'

describe('Customer unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      new Customer('', 'John')
    }).toThrow('customer: Id is required')
  })

  it('should throw error when name is empty', () => {
    expect(() => {
      new Customer('123', '')
    }).toThrow('customer: Name is required')
  })

  it('should throw error when id and name are empty', () => {
    expect(() => {
      new Customer('', '')
    }).toThrow('customer: Id is required,customer: Name is required')
  })

  it('should change name', () => {
    const customer = new Customer('123', 'John')
    customer.changeName('Jane')
    expect(customer.name).toBe('Jane')
  })

  it('should activate customer', () => {
    const customer = new Customer('123', 'John')
    customer.changeAddress(
      new Address('Street 1', 123, '60000-000', 'Fortaleza'),
    )
    customer.activate()
    expect(customer.isActive()).toBe(true)
  })

  it('should deactivate customer', () => {
    const customer = new Customer('123', 'John')
    customer.deactivate()
    expect(customer.isActive()).toBe(false)
  })

  it('should throw error when address is undefined when activate a customer', () => {
    expect(() => {
      const customer = new Customer('123', 'John')
      customer.activate()
    }).toThrow('Address is mandatory to activate a customer')
  })

  it('should add new points', () => {
    const customer = new Customer('123', 'John')
    expect(customer.rewardPoints).toBe(0)
    customer.addRewardPoints(10)
    expect(customer.rewardPoints).toBe(10)
    customer.addRewardPoints(10)
    expect(customer.rewardPoints).toBe(20)
  })
})
