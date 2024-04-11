import { app, sequelize } from '../express'
import request from 'supertest'

describe('E2E test for customer', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it('should create a customer', async () => {
    const response = await request(app)
      .post('/customer')
      .send({
        name: 'Customer 1',
        address: {
          street: 'Street 1',
          city: 'City 1',
          number: 123,
          zip: '12345',
        },
      })

    expect(response.status).toBe(200)
    expect(response.body.name).toBe('Customer 1')
    expect(response.body.address.street).toBe('Street 1')
    expect(response.body.address.city).toBe('City 1')
    expect(response.body.address.number).toBe(123)
    expect(response.body.address.zip).toBe('12345')
  })

  it('should not create a customer', async () => {
    const response = await request(app).post('/customer').send({
      name: 'Customer 1',
    })

    expect(response.status).toBe(500)
  })

  it('should list all customers', async () => {
    const createCustomerResponse1 = await request(app)
      .post('/customer')
      .send({
        name: 'John',
        address: {
          street: 'Street 1',
          city: 'City 1',
          number: 123,
          zip: '12345',
        },
      })

    const createCustomerResponse2 = await request(app)
      .post('/customer')
      .send({
        name: 'Jane',
        address: {
          street: 'Street 2',
          city: 'City 2',
          number: 222,
          zip: '22222',
        },
      })

    const response = await request(app).get('/customer').send()

    expect(response.status).toBe(200)
    expect(response.body.customers.length).toBe(2)

    const customer1 = response.body.customers[0]
    expect(customer1.name).toBe('John')
    expect(customer1.address.street).toBe('Street 1')
    expect(customer1.address.city).toBe('City 1')
    expect(customer1.address.number).toBe(123)
    expect(customer1.address.zip).toBe('12345')

    const customer2 = response.body.customers[1]
    expect(customer2.name).toBe('Jane')
    expect(customer2.address.street).toBe('Street 2')
    expect(customer2.address.city).toBe('City 2')
    expect(customer2.address.number).toBe(222)
    expect(customer2.address.zip).toBe('22222')
  })
})
